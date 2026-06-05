# Client API

## Fichier `src/services/api.ts`

Deux instances Axios sont exportées :

### `publicApi`

Instance sans token, utilisée pour les routes publiques : login, register, reset password, lecture des articles.

```ts
export const publicApi = axios.create({
  baseURL: '/',
  withCredentials: true,  // envoie le cookie refresh_token
});
```

### `api` (défaut)

Instance privée avec intercepteurs, utilisée pour toutes les routes protégées.

```ts
const api = axios.create({
  baseURL: '/',
  withCredentials: true,
});
```

## Intercepteur de requête

Ajoute automatiquement le `Bearer token` à chaque requête sortante :

```ts
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

## Intercepteur de réponse

Gère le rafraîchissement silencieux du token en cas d'erreur 401 :

1. Une requête protégée reçoit un 401
2. L'intercepteur appelle `POST /users/token/refresh/` — le cookie HttpOnly est envoyé automatiquement
3. Le nouveau token est stocké en `sessionStorage`
4. La requête originale est rejouée avec le nouveau token
5. Si le refresh échoue, `sessionStorage` est vidé et l'utilisateur est redirigé vers `/login`

La vérification `originalRequest?.url?.includes('users/token/refresh/')` évite une boucle infinie si la requête de refresh elle-même échoue.

## Proxy Vite

Les requêtes sont proxiées vers `http://localhost:8000` en développement :

```ts
proxy: {
  '/api': { target: 'http://localhost:8000' },
  '/users': { target: 'http://localhost:8000' },
  '/articles': { target: 'http://localhost:8000' },
  '/contact': { target: 'http://localhost:8000' },
}
```

## `withCredentials: true`

Option nécessaire pour que le navigateur envoie les cookies cross-origin (frontend `localhost:5173` → backend `localhost:8000`). Sans cette option, le cookie `refresh_token` ne serait pas transmis lors des appels au endpoint `/users/token/refresh/`.
