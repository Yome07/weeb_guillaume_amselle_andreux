# Routing

## Configuration

Le routing utilise React Router v7 avec `BrowserRouter` dans `main.tsx` et `Routes`/`Route` dans `App.tsx`. Toutes les routes partagent le même `Layout` (Header + Footer).

## Routes

| Path | Composant | Protection |
|---|---|---|
| `/` | `Home` | Publique |
| `/contact` | `Contact` | Publique |
| `/login` | `Login` | Publique |
| `/register` | `Register` | Publique |
| `/forgot-password` | `ForgotPassword` | Publique |
| `/reset-password` | `ResetPassword` | Publique |
| `/blog` | `ArticleList` | Publique |
| `/blog/:slug` | `ArticleDetail` | Publique |
| `/blog/new` | `ArticleCreate` | `PrivateRoute` |
| `/admin` | `AdminDashboard` | `PrivateAdminRoute` |
| `*` | `NotFound` | Publique |

## Routes protégées

**`PrivateRoute`** — vérifie la présence du token dans `sessionStorage`. Redirige vers `/login` si absent.

**`PrivateAdminRoute`** — vérifie que `state.user.is_staff === true` dans `AuthContext`. Redirige vers `/login` si non connecté, vers `/` si connecté mais non admin.

## Paramètres d'URL

`/blog/:slug` — le slug de l'article est récupéré avec `useParams` dans `ArticleDetail`.

`/reset-password?uidb64=XX&token=XX` — les paramètres de réinitialisation sont récupérés avec `useSearchParams` dans `ResetPassword`.

`/forgot-password?email=XX` — l'email est pré-rempli depuis la page Login via `useSearchParams`.
