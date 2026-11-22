import {
    AxiosError,
    AxiosHeaders,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from 'axios';
import { render, screen } from '@testing-library/react';
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
} from 'vitest';

import { AuthProvider, useAuth } from './AuthContext';
import api, { publicApi } from '../services/api';

const OLD_TOKEN = 'expired-access-token';
const NEW_TOKEN = 'new-access-token';

const user = {
    id: 'user-123',
    first_name: 'Ada',
    last_name: 'Lovelace',
    email: 'ada@example.com',
    is_staff: false,
    is_active: true,
};

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

// Ce composant affiche l’état du contexte pour que le test puisse le vérifier.
function AuthStateProbe() {
    const { state } = useAuth();

    if (state.isLoading) {
        return <p role="status">Chargement...</p>;
    }

    return <p>{state.user?.email ?? 'Aucun utilisateur connecté'}</p>;
}

describe('AuthProvider : restauration de session', () => {
    beforeEach(() => {
        sessionStorage.clear();
        sessionStorage.setItem('access_token', OLD_TOKEN);
    });

    afterEach(() => {
        api.defaults.adapter = originalApiAdapter;
        publicApi.defaults.adapter = originalPublicApiAdapter;
        sessionStorage.clear();
    });

    it('renouvelle un access token refusé et restaure le profil utilisateur', async () => {
        let profileRequestCount = 0;
        let refreshRequestCount = 0;
        const profileAuthorizationHeaders: string[] = [];

        api.defaults.adapter = async (config) => {
            profileRequestCount += 1;

            const authorization = String(
                config.headers.get('Authorization') ?? '',
            );
            profileAuthorizationHeaders.push(authorization);

            if (authorization !== `Bearer ${NEW_TOKEN}`) {
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

            return makeResponse(config, 200, user);
        };

        publicApi.defaults.adapter = async (config) => {
            refreshRequestCount += 1;

            return makeResponse(config, 200, {
                access: NEW_TOKEN,
            });
        };

        render(
            <AuthProvider>
                <AuthStateProbe />
            </AuthProvider>,
        );

        // Au montage, le contexte commence par restaurer la session.
        expect(screen.getByRole('status').textContent).toBe('Chargement...');


        // Le profil finit par être restauré après le refresh.
        expect(await screen.findByText(user.email)).toBeTruthy();

        expect(refreshRequestCount).toBe(1);
        expect(profileRequestCount).toBe(2);
        expect(profileAuthorizationHeaders).toEqual([
            `Bearer ${OLD_TOKEN}`,
            `Bearer ${NEW_TOKEN}`,
        ]);
        expect(sessionStorage.getItem('access_token')).toBe(NEW_TOKEN);
    });

    it('restaure la session sans access token en renouvelant depuis le cookie', async () => {
        // Le beforeEach existant installe OLD_TOKEN.
        // On le retire pour tester le démarrage sans access token.
        sessionStorage.removeItem('access_token');

        let refreshRequestCount = 0;
        let profileRequestCount = 0;
        const profileAuthorizationHeaders: string[] = [];

        publicApi.defaults.adapter = async (config) => {
            refreshRequestCount += 1;

            return makeResponse(config, 200, {
                access: NEW_TOKEN,
            });
        };

        api.defaults.adapter = async (config) => {
            profileRequestCount += 1;

            profileAuthorizationHeaders.push(
                String(config.headers.get('Authorization') ?? ''),
            );

            return makeResponse(config, 200, user);
        };

        render(
            <AuthProvider>
                <AuthStateProbe />
            </AuthProvider>,
        );

        // AuthProvider attend que la restauration soit terminée.
        expect(screen.getByRole('status').textContent).toBe('Chargement...');

        // Le profil finit par apparaître après le refresh.
        expect(await screen.findByText(user.email)).toBeTruthy();

        expect(refreshRequestCount).toBe(1);
        expect(profileRequestCount).toBe(1);
        expect(profileAuthorizationHeaders).toEqual([
            `Bearer ${NEW_TOKEN}`,
        ]);
        expect(sessionStorage.getItem('access_token')).toBe(NEW_TOKEN);
    });

    it.each(['network', '500'] as const)(
        'termine la restauration sans utilisateur après une erreur %s du refresh',
        async (failureKind) => {
            let profileRequestCount = 0;
            let refreshRequestCount = 0;

            api.defaults.adapter = async (config) => {
                profileRequestCount += 1;

                // Le token présent au démarrage est refusé.
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
                refreshRequestCount += 1;

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

            render(
                <AuthProvider>
                    <AuthStateProbe />
                </AuthProvider>,
            );

            // Le contexte termine son initialisation sans restaurer de profil.
            expect(
                await screen.findByText('Aucun utilisateur connecté'),
            ).toBeTruthy();

            // L'état de chargement ne reste pas bloqué.
            expect(screen.queryByRole('status')).toBeNull();

            expect(profileRequestCount).toBe(1);
            expect(refreshRequestCount).toBe(1);

            // Une erreur temporaire ne doit pas effacer le token local.
            expect(sessionStorage.getItem('access_token')).toBe(OLD_TOKEN);
        },
    );
});