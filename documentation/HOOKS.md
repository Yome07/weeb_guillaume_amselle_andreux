# Hooks personnalisés

## `useLoginForm`

Gère la logique du formulaire de connexion.

- Récupère l'email depuis l'URL (`?email=XX`) pour pré-remplir le champ —
  utile quand l'utilisateur arrive depuis la page "Mot de passe oublié" qui
  passe l'email en paramètre via le lien "Retour à la connexion"
- Au succès : stocke le token en `sessionStorage`, décode le payload JWT,
  dispatch `LOGIN` dans `AuthContext`, redirige vers `/`
- En cas d'erreur : affiche le message retourné par le backend (`message`)
  — permet d'afficher des messages précis comme "Compte en attente de validation"

**Retourne** : `{ email, password, error, isLoading, setEmail, setPassword, handleSubmit }`

---

## `useRegisterForm`

Gère la logique du formulaire d'inscription avec validation complète.

Validations :
- Nom et prénom requis
- Format email
- Mot de passe : 12 caractères min, majuscule, minuscule, chiffre, caractère spécial
- Confirmation du mot de passe

Au succès : affiche un message informant que la validation admin est requise (pas de connexion automatique car `is_active = false` par défaut).

**Retourne** : `{ lastname, firstname, email, password, confirmPassword, errors, apiError, successMessage, isLoading, passwordStrength, passwordsMatch, setters..., handleSubmit }`

---

## `useContactForm`

Gère la logique du formulaire de contact. Utilise `publicApi` depuis `api.ts`
pour appeler `POST /contact/`. Gère les erreurs de validation champ par champ
retournées par Django via `AxiosError` typé — les erreurs peuvent être une
chaîne ou un tableau de chaînes.

**Retourne** : `{ lastname, firstname, email, phone, message, errors, success, isLoading, setters..., handleSubmit }`

---

## `useArticleForm`

Gère la logique du formulaire de création d'article.

- Validation : titre (5 caractères min) et contenu (20 caractères min) requis
- Au succès : redirige vers la page détail de l'article créé (`/blog/:slug`)

**Retourne** : `{ title, content, errors, apiError, isLoading, setTitle, setContent, handleSubmit }`

---

## `useArticleList`

Charge la liste de tous les articles via `GET /articles/`.

Utilise le pattern `cancelled` pour éviter les race conditions lors de la navigation.

**Retourne** : `{ articles, isLoading, error }`

---

## `useArticleDetail`

Charge le détail d'un article par son slug via `GET /articles/:slug/`.

Se déclenche à chaque changement du slug (dépendance `useEffect`). Utilise également le pattern `cancelled`.

**Retourne** : `{ article, isLoading, error }`
