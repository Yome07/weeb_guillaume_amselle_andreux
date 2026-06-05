# Gestion des erreurs

## Erreurs API

Le backend retourne des erreurs structurées avec un `error_code` et un `message` :

```json
{
  "error_code": "ACCOUNT_PENDING_APPROVAL",
  "message": "Votre compte est en attente de validation par un administrateur"
}
```

Côté React, le message backend est affiché directement :

```ts
const errorMessage = err?.response?.data?.message;
setError(errorMessage || 'Identifiants incorrects.');
```

## Codes d'erreur connus

| `error_code` | Contexte | Message |
|---|---|---|
| `ACCOUNT_PENDING_APPROVAL` | Login | Compte en attente de validation |
| `INVALID_CREDENTIALS` | Login | Email ou mot de passe incorrect |
| `EMAIL_ALREADY_EXISTS` | Register | Email déjà utilisé |
| `PASSWORD_MISMATCH` | Register | Mots de passe différents |
| `WEAK_PASSWORD` | Register / Reset | Mot de passe trop faible |
| `INVALID_TOKEN` | Reset password | Lien expiré ou invalide |
| `CANNOT_DEACTIVATE_SELF` | Admin | Auto-désactivation interdite |
| `CANNOT_REMOVE_OWN_ADMIN_ACCESS` | Admin | Auto-rétrogradation interdite |

## Expiration du token

Gérée automatiquement par l'intercepteur de réponse dans `api.ts`. L'utilisateur ne voit rien — la requête est rejouée après refresh silencieux. Si le refresh token est lui-même expiré, l'utilisateur est redirigé vers `/login`.

## Erreurs de chargement

Les hooks `useArticleList` et `useArticleDetail` exposent un état `error` affiché dans les composants de page.

## Erreurs de validation formulaire

Validées côté client avant l'appel API, affichées sous chaque champ concerné. Les erreurs API éventuelles s'affichent en bas du formulaire.

## Pattern `cancelled` (race conditions)

Tous les hooks de chargement utilisent une variable `cancelled` pour éviter les mises à jour de state sur des composants démontés :

```ts
useEffect(() => {
  let cancelled = false;
  fetchData().then((data) => {
    if (!cancelled) setState(data);
  });
  return () => { cancelled = true; };
}, []);
```
