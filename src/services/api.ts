import axios, { type InternalAxiosRequestConfig } from 'axios';
const API_URL = (import.meta.env.VITE_API_URL ??
    "http://localhost:8000").replace(/\/+$/, "");
// Instance publique — sans token (register, login, forgot password...)
export const publicApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
// Instance privée — avec token (routes protégées)
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
interface RetryRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}
interface RefreshResponse {
    access: string;
}
// Une seule requête de refresh peut être active à la fois.
// Les requêtes protégées ayant expiré simultanément attendent toutes
// cette même promesse afin de respecter la rotation du refresh token.
let refreshPromise: Promise<string> | null = null;
export function refreshAccessToken(): Promise<string> {
    if (!refreshPromise) {
        refreshPromise = publicApi
            .post<RefreshResponse>('/users/token/refresh/', {})
            .then((response) => {
                const accessToken = response.data?.access;
                if (!accessToken) {
                    throw new Error("Le backend n'a pas renvoyé de nouvel access token.");
                }
                sessionStorage.setItem('access_token', accessToken);
                return accessToken;
            })
            .finally(() => {
                refreshPromise = null;
            });
    }
    return refreshPromise;
}
// =================== INTERCEPTEUR DE REQUÊTE =======================
// Attache l'access_token à chaque requête sortante
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// =================== INTERCEPTEUR DE RÉPONSE =======================
// Gère automatiquement l'expiration de l'access token
api.interceptors.response.use(
// Chemin heureux : laisser passer les réponses 2xx
    (response) => response,
    async (error) => {
        const originalRequest = error.config as RetryRequestConfig | undefined;
// Pas de réponse du serveur (erreur réseau)
        if (!error.response) {
            return Promise.reject(error);
        }
// Si on reçoit un 401 et qu'on n'a pas encore tenté le refresh
        if (error.response.status === 401 && originalRequest &&
            !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshAccessToken();
// Rejouer la requête originale avec le nouveau token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
// Refresh token expiré ou invalide : déconnexion forcée
                sessionStorage.removeItem('access_token');
                window.location.assign('/login');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
export default api;