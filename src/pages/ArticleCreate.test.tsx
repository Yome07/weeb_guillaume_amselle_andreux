import {
    AxiosError,
    AxiosHeaders,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from 'axios';
import { fireEvent, render, screen } from '@testing-library/react';
import {
    MemoryRouter,
    Route,
    Routes,
    useParams,
} from 'react-router-dom';
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
} from 'vitest';

import api, { publicApi } from '../services/api';
import ArticleCreate from './ArticleCreate';

const OLD_TOKEN = 'expired-access-token';
const NEW_TOKEN = 'new-access-token';

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
        statusText: status >= 200 && status < 300
            ? 'OK'
            : status === 401
                ? 'Unauthorized'
                : 'Internal Server Error',
        headers: new AxiosHeaders(),
        config,
    };
}

// Cette route permet de vérifier que le formulaire a bien navigué
// vers l’article créé.
function CreatedArticlePage() {
    const { slug } = useParams();

    return <p>Article créé : {slug}</p>;
}

describe('création d’article après renouvellement du token', () => {
    beforeEach(() => {
        sessionStorage.clear();
        sessionStorage.setItem('access_token', OLD_TOKEN);
    });

    afterEach(() => {
        api.defaults.adapter = originalApiAdapter;
        publicApi.defaults.adapter = originalPublicApiAdapter;
        sessionStorage.clear();
    });

    it('rejoue le POST après le refresh et ouvre le nouvel article', async () => {
        let articlePostCount = 0;
        let refreshRequestCount = 0;
        const postAuthorizationHeaders: string[] = [];
        let submittedPayload: unknown;

        api.defaults.adapter = async (config) => {
            if (config.url !== '/articles/') {
                throw new Error(`Requête inattendue : ${config.url}`);
            }

            articlePostCount += 1;

            const authorization = String(
                config.headers.get('Authorization') ?? '',
            );
            postAuthorizationHeaders.push(authorization);

            if (articlePostCount === 1) {
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

            submittedPayload =
                typeof config.data === 'string'
                    ? JSON.parse(config.data)
                    : config.data;

            return makeResponse(config, 201, {
                author: {
                    id: 'user-123',
                    first_name: 'Ada',
                    last_name: 'Lovelace',
                },
                title: 'Mon article de test',
                content: 'Voici le contenu de mon article de test.',
                slug: 'mon-article-de-test',
                favorites_count: 0,
                is_favorite: false,
                created_at: '2026-11-22T10:00:00Z',
                updated_at: '2026-11-22T10:00:00Z',
            });
        };

        publicApi.defaults.adapter = async (config) => {
            refreshRequestCount += 1;

            return makeResponse(config, 200, {
                access: NEW_TOKEN,
            });
        };

        render(
            <MemoryRouter initialEntries={['/blog/new']}>
                <Routes>
                    <Route path="/blog/new" element={<ArticleCreate />} />
                    <Route
                        path="/blog/:slug"
                        element={<CreatedArticlePage />}
                    />
                </Routes>
            </MemoryRouter>,
        );

        fireEvent.change(screen.getByLabelText('Titre'), {
            target: { value: 'Mon article de test' },
        });

        fireEvent.change(screen.getByLabelText('Contenu'), {
            target: { value: 'Voici le contenu de mon article de test.' },
        });

        fireEvent.click(
            screen.getByRole('button', { name: "Publier l'article" }),
        );

        expect(
            await screen.findByText('Article créé : mon-article-de-test'),
        ).toBeTruthy();

        expect(refreshRequestCount).toBe(1);
        expect(articlePostCount).toBe(2);
        expect(postAuthorizationHeaders).toEqual([
            `Bearer ${OLD_TOKEN}`,
            `Bearer ${NEW_TOKEN}`,
        ]);
        expect(submittedPayload).toEqual({
            title: 'Mon article de test',
            content: 'Voici le contenu de mon article de test.',
        });
        expect(sessionStorage.getItem('access_token')).toBe(NEW_TOKEN);
    });
});