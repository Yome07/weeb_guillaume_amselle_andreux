# Articles

## Endpoints

| Méthode | URL | Auth | Description |
|---|---|---|---|
| GET | `/articles/` | Non | Liste tous les articles |
| POST | `/articles/` | Oui (actif) | Créer un article |
| GET | `/articles/:slug/` | Non | Détail d'un article |
| PATCH | `/articles/:slug/` | Oui (propriétaire) | Modifier un article |
| DELETE | `/articles/:slug/` | Oui (propriétaire) | Supprimer un article |

## Modèle Article

```ts
interface Article {
  id: number;
  author: {
    id: string;        // UUID public
    first_name: string;
    last_name: string;
  };
  title: string;
  content: string;
  slug: string;        // identifiant URL unique généré automatiquement
  created_at: string;
  updated_at: string;
}
```

## Pages

### `ArticleList`

Affiche tous les articles sous forme de cartes cliquables. Le bouton "Nouvel article" n'est visible que si `sessionStorage.getItem('access_token')` est présent.

### `ArticleDetail`

Affiche le contenu complet d'un article. Si l'utilisateur connecté est l'auteur (`state.user.id === article.author.id`), les boutons **Modifier** et **Supprimer** apparaissent.

**Mode lecture** → **Mode édition** : clic sur Modifier bascule l'affichage vers `ArticleForm` pré-rempli avec le titre et le contenu actuels.

Après modification réussie, l'article est mis à jour localement via `currentArticle` sans recharger la page (`displayArticle = currentArticle ?? article`).

La suppression passe par une `ConfirmModal` avant d'appeler `DELETE /articles/:slug/`.

### `ArticleCreate`

Formulaire de création utilisant `ArticleForm` + `useArticleForm`. Accessible uniquement via `PrivateRoute`.

## Identification de l'auteur

La comparaison se fait sur l'`id` (UUID).

```ts
const isAuthor = state.user?.id === article?.author.id;
```
