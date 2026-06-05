import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:8000").replace(/\/+$/, "");

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
      const originalRequest = error.config;

      // Pas de réponse du serveur (erreur réseau)
      if (!error.response) {
        return Promise.reject(error);
      }

      // Si c'est la requête de refresh elle-même qui échoue,
      // on coupe tout pour éviter une boucle infinie
      if (originalRequest?.url?.includes('users/token/refresh/')) {
        sessionStorage.removeItem('access_token');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // Si on reçoit un 401 et qu'on n'a pas encore tenté le refresh
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Le refresh_token est dans le cookie HttpOnly, envoyé automatiquement
          const res = await publicApi.post(
              '/users/token/refresh/',
              {},
              { withCredentials: true }
          );

          const newAccessToken = res.data.access;
          sessionStorage.setItem('access_token', newAccessToken);

          // Rejouer la requête originale avec le nouveau token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);

        } catch (refreshError) {
          // Refresh token expiré ou invalide : déconnexion forcée
          sessionStorage.removeItem('access_token');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
);

export default api;