# Authentification

## Stratégie de stockage

L'application utilise la **stratégie hybride** recommandée pour la sécurité JWT :

- `access_token` → `sessionStorage` (clé `access_token`) — perdu à la fermeture de l'onglet
- `refresh_token` → cookie HttpOnly géré par Django — inaccessible au JavaScript

Cette approche protège le refresh token des attaques XSS tout en maintenant une session fonctionnelle.

## Flux de connexion

1. `POST /users/login/` avec email + password
2. Django retourne `access` dans le JSON et `refresh_token` dans un cookie HttpOnly
3. `useLoginForm` stocke l'access token en `sessionStorage`
4. Le payload JWT est décodé avec `atob()` pour extraire `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `user_id`
5. `dispatch({ type: 'LOGIN', payload: {...} })` met à jour `AuthContext`
6. Redirection vers `/`

## Flux de déconnexion

1. `sessionStorage.removeItem('access_token')`
2. `dispatch({ type: 'LOGOUT' })` vide `AuthContext`
3. Redirection vers `/`

Le cookie `refresh_token` est supprimé côté Django via `POST /users/logout/`.

## AuthContext

Contexte global qui expose `state.user` (ou `null`) et `dispatch`. Initialisé au démarrage depuis le token existant en `sessionStorage` via `getUserFromToken()` — l'utilisateur reste connecté après rechargement de page.

```ts
state.user = {
  id: string;          // UUID public
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
}
```

Le reducer gère deux actions : `LOGIN` et `LOGOUT`.

## Inscription

Un compte créé est inactif par défaut (`is_active = false`). Un administrateur doit valider le compte avant que l'utilisateur puisse se connecter. Un message de confirmation est affiché après l'inscription.

## Reset de mot de passe

**Étape 1** — `ForgotPassword.tsx` : l'utilisateur saisit son email → `POST /users/password-reset/request/`. La réponse est toujours générique pour éviter l'énumération d'utilisateurs.

**Étape 2** — `ResetPassword.tsx` : l'utilisateur arrive depuis le lien email (`/reset-password?uidb64=XX&token=XX`) → `POST /users/password-reset/confirm/`. Redirection vers `/login` en cas de succès.
