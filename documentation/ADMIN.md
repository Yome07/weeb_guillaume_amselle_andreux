# Dashboard Administration

## Accès

La route `/admin` est protégée par `PrivateAdminRoute` — seuls les utilisateurs avec `is_staff = true` y ont accès. Un utilisateur non connecté est redirigé vers `/login`, un utilisateur connecté non admin vers `/`.

Un lien "Admin" apparaît dans le Header uniquement si `state.user?.is_staff === true`.

## Endpoints

| Méthode | URL | Description |
|---|---|---|
| GET | `/api/admin/users/` | Liste tous les utilisateurs |
| PATCH | `/api/admin/users/:id/` | Modifier un utilisateur |

Les articles sont chargés via le même endpoint public `GET /articles/`.

## Fonctionnalités

### Statistiques

Trois compteurs en haut de page : nombre total d'articles, nombre total d'utilisateurs, nombre d'utilisateurs en attente de validation (badge jaune sur l'onglet).

### Onglet Articles

- Liste tous les articles avec titre, auteur, date et extrait
- Lien "Voir" vers la page détail
- Bouton "Supprimer" avec `ConfirmModal` de confirmation
- Mise à jour du state local après suppression (pas de rechargement)

### Onglet Utilisateurs

- Liste tous les utilisateurs avec nom, email, date d'inscription
- Badge "Validé" (vert) ou "En attente" (jaune)
- Badge "Admin" (violet) si `is_staff`
- Bouton **Valider/Désactiver** — toggle `is_active`
- Bouton **Promouvoir/Rétrograder** — toggle `is_staff`
- Les boutons sont désactivés pour le compte de l'admin connecté

## Service admin

```ts
// Mettre à jour un utilisateur
updateAdminUser(userId: string, payload: Partial<Pick<AdminUser, 'is_active' | 'is_staff'>>)
```

`Partial<Pick<...>>` permet d'envoyer uniquement `is_active` ou uniquement `is_staff` sans être obligé de fournir les deux.
