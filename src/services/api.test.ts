import {
    AxiosError,
    AxiosHeaders,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from 'axios';
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
} from 'vitest';

import api, { publicApi } from './api';

const OLD_TOKEN = 'expired-access-token';
const NEW_TOKEN = 'new-access-token';

// On garde les adaptateurs d'origine pour restaurer Axios après le test.
const originalApiAdapter = api.defaults.adapter;
const originalPublicApiAdapter = publicApi.defaults.adapter;

function makeResponse(
    config: InternalAxiosRequestConfig,
    status: number,
    data: unknown,
): AxiosResponse {
    return {
        data,
        status,
        statusText: status === 200 ? 'OK' : 'Unauthorized',
        headers: new AxiosHeaders(),
        config,
    };
}

describe('api : renouvellement du token', () => {
    beforeEach(() => {
        sessionStorage.clear();
        sessionStorage.setItem('access_token', OLD_TOKEN);
    });

    afterEach(() => {
        // Évite que ce test affecte d'autres tests utilisant ces clients.
        api.defaults.adapter = originalApiAdapter;
        publicApi.defaults.adapter = originalPublicApiAdapter;
        sessionStorage.clear();
    });

    it('partage un seul refresh entre deux requêtes protégées simultanées', async () => {
        let refreshCalls = 0;
        let initialUnauthorizedResponses = 0;
        const requestAttempts = new Map<string, number>();
        const retryAuthorizationHeaders: string[] = [];

        // On retient la réponse du refresh jusqu'à ce que les deux requêtes
        // initiales aient reçu leur 401. Cela rend le scénario simultané prévisible.
        let releaseRefresh!: () => void;
        const refreshGate = new Promise<void>((resolve) => {
            releaseRefresh = resolve;
        });

        let notifyBothRequestsFailed!: () => void;
        const bothRequestsFailed = new Promise<void>((resolve) => {
            notifyBothRequestsFailed = resolve;
        });

        api.defaults.adapter = async (config) => {
            const path = config.url ?? '';
            const attempts = (requestAttempts.get(path) ?? 0) + 1;
            requestAttempts.set(path, attempts);

            const authorization = config.headers.get('Authorization');

            if (authorization !== `Bearer ${NEW_TOKEN}`) {
                initialUnauthorizedResponses += 1;

                if (initialUnauthorizedResponses === 2) {
                    notifyBothRequestsFailed();
                }

                const response = makeResponse(config, 401, {
                    detail: 'Access token expired',
                });

                throw new AxiosError(
                    'Request failed with status code 401',
                    AxiosError.ERR_BAD_REQUEST,
                    config,
                    undefined,
                    response,
                );
            }

            // Ces valeurs correspondent aux requêtes rejouées après le refresh.
            retryAuthorizationHeaders.push(String(authorization));

            return makeResponse(config, 200, { path });
        };

        publicApi.defaults.adapter = async (config) => {
            refreshCalls += 1;

            // Le test garde le refresh en attente pour laisser les deux
            // réponses 401 atteindre l'intercepteur.
            await refreshGate;

            return makeResponse(config, 200, { access: NEW_TOKEN });
        };

        // Les deux appels partent avant qu'on ne libère la réponse du refresh.
        const pendingRequests = Promise.all([
            api.get('/protected/one/'),
            api.get('/protected/two/'),
        ]);

        await bothRequestsFailed;
        releaseRefresh();

        const [firstResponse, secondResponse] = await pendingRequests;

        expect(firstResponse.status).toBe(200);
        expect(secondResponse.status).toBe(200);

        // Les deux requêtes ont d'abord échoué, puis ont été rejouées.
        expect(requestAttempts.get('/protected/one/')).toBe(2);
        expect(requestAttempts.get('/protected/two/')).toBe(2);

        // Malgré les deux 401, l'intercepteur n'a appelé le refresh qu'une fois.
        expect(refreshCalls).toBe(1);

        // Les reprises utilisent toutes les deux le nouvel access token.
        expect(retryAuthorizationHeaders).toEqual([
            `Bearer ${NEW_TOKEN}`,
            `Bearer ${NEW_TOKEN}`,
        ]);

        // Le token renouvelé a également été enregistré pour les prochains appels.
        expect(sessionStorage.getItem('access_token')).toBe(NEW_TOKEN);
    });

    it.each([401, 403] as const)(
        'supprime le token si le refresh est refusé avec %i',
        async (refreshStatus) => {
            api.defaults.adapter = async (config) => {
                // La requête protégée reçoit d'abord un 401.
                const response = makeResponse(config, 401, {
                    detail: 'Access token expired',
                });

                throw new AxiosError(
                    'Request failed with status code 401',
                    AxiosError.ERR_BAD_REQUEST,
                    config,
                    undefined,
                    response,
                );
            };

            publicApi.defaults.adapter = async (config) => {
                // Le refresh est refusé avec le statut testé : 401 ou 403.
                const response = makeResponse(config, refreshStatus, {
                    detail: 'Refresh token refused',
                });

                throw new AxiosError(
                    `Request failed with status code ${refreshStatus}`,
                    AxiosError.ERR_BAD_REQUEST,
                    config,
                    undefined,
                    response,
                );
            };

            await expect(api.get('/protected/private/')).rejects.toMatchObject({
                response: { status: refreshStatus },
            });

            expect(sessionStorage.getItem('access_token')).toBeNull();
        },
    );

    it.each(['network', '500'] as const)(
        'conserve access_token si le refresh échoue avec une erreur %s',
        async (failureKind) => {
            // La requête protégée reçoit d'abord un 401.
            api.defaults.adapter = async (config) => {
                const response = makeResponse(config, 401, {
                    detail: 'Access token expired',
                });

                throw new AxiosError(
                    'Request failed status code 401',
                    AxiosError.ERR_BAD_REQUEST,
                    config,
                    undefined,
                    response,
                );
            };

            // Le refresh échoue ensuite, soit sans réponse serveur,
            // soit avec une réponse serveur 500.
            publicApi.defaults.adapter = async (config) => {
                if (failureKind === 'network') {
                    throw new AxiosError(
                        'Network Error',
                        AxiosError.ERR_NETWORK,
                        config,
                    );
                }

                const response = makeResponse(config, 500, {
                    detail: 'Internal server error',
                });

                throw new AxiosError(
                    'Request failed with status code 500',
                    AxiosError.ERR_BAD_RESPONSE,
                    config,
                    undefined,
                    response,
                );
            };

            await expect(api.get('/protected/private/')).rejects.toBeInstanceOf(
                AxiosError,
            );

            // Une panne temporaire ne doit pas effacer le token local.
            expect(sessionStorage.getItem('access_token')).toBe(OLD_TOKEN);
        },
    );

    it('ne relance pas le refresh si la requête rejouée reçoit encore un 401', async () => {
        let protectedRequestCount = 0;
        let refreshRequestCount = 0;
        const authorizationHeaders: string[] = [];

        api.defaults.adapter = async (config) => {
            protectedRequestCount += 1;

            authorizationHeaders.push(
                String(config.headers.get('Authorization') ?? ''),
            );

            // Le serveur refuse la requête initiale et sa reprise.
            const response = makeResponse(config, 401, {
                detail: 'Unauthorized',
            });

            throw new AxiosError(
                'Request failed with status code 401',
                AxiosError.ERR_BAD_REQUEST,
                config,
                undefined,
                response,
            );
        };

        publicApi.defaults.adapter = async (config) => {
            refreshRequestCount += 1;

            // Le refresh fonctionne et fournit un nouveau token.
            return makeResponse(config, 200, {
                access: NEW_TOKEN,
            });
        };

        await expect(api.get('/protected/private/')).rejects.toMatchObject({
            response: { status: 401 },
        });

        // La requête initiale puis sa reprise : deux appels.
        expect(protectedRequestCount).toBe(2);

        // Le second 401 ne déclenche pas un deuxième refresh.
        expect(refreshRequestCount).toBe(1);

        expect(authorizationHeaders).toEqual([
            `Bearer ${OLD_TOKEN}`,
            `Bearer ${NEW_TOKEN}`,
        ]);

        // Le refresh a réussi : le nouveau token reste dans le stockage.
        expect(sessionStorage.getItem('access_token')).toBe(NEW_TOKEN);
    });
});