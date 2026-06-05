# Environnement et Configuration

## Variables d'environnement

Le projet utilise une variable d'environnement dans un fichier `.env` à la racine :
VITE_API_URL=http://localhost:8000

Elle est lue dans `api.ts` :

```ts
const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:8000').replace(/\/+$/, '');
```

Si `VITE_API_URL` n'est pas définie, le fallback `http://localhost:8000` s'applique automatiquement. En production, il suffit de changer cette variable sans toucher au code.

## CORS

Le CORS est configuré côté Django pour autoriser les requêtes depuis le frontend. Le proxy Vite n'est plus nécessaire — les instances Axios utilisent directement `API_URL` comme `baseURL`.

## TypeScript

Configuration stricte dans `tsconfig.json` :

- `"strict": true` — active toutes les vérifications TypeScript
- `"noUnusedLocals": true` — erreur si variable locale non utilisée
- `"noUnusedParameters": true` — erreur si paramètre non utilisé
- `"target": "ES2020"` — compilation vers ES2020
- `"jsx": "react-jsx"` — transform JSX automatique (pas besoin d'importer React)

## Internationalisation

Deux fichiers de traduction dans `src/locales/` :
- `fr.json` — français (langue par défaut)
- `en.json` — anglais

La langue est persistée dans `localStorage` (clé `language`) via `LanguageContext`. Elle survit aux rechargements et fermetures de navigateur contrairement au token d'auth stocké en `sessionStorage`.

### État des traductions

L'internationalisation est partiellement implémentée. Les sections suivantes utilisent
des clés de traduction depuis `fr.json` et `en.json` : header, footer, home, contact,
login, register, forgot-password.

Les pages suivantes ont du texte en dur en français et nécessitent d'être traduites :

- Pages blog (ArticleList, ArticleDetail, ArticleCreate)
- Dashboard administration (AdminDashboard)
- Pages 404 (NotFound)
- Messages d'erreur API

Pour ajouter une traduction, il faut :
1. Ajouter la clé dans `fr.json` et `en.json`
2. Remplacer le texte en dur par `{t.section.cle}` dans le composant
