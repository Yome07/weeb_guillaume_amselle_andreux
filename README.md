# Weeb — Blog sur le Web

## Description

Projet de Blog développé dans le cadre d'un projet de formation. Permet aux utilisateurs de lire des articles, de s'inscrire, de publier et gérer leurs propres articles. Un dashboard d'administration permet de gérer les utilisateurs et les publications.

Le backend est développé avec Django REST Framework (projet d'équipe). Ce dépôt contient uniquement le frontend.

## Technologies utilisées

- **React 19** avec TypeScript
- **Vite 7** — bundler et serveur de développement
- **Tailwind CSS 4** — styles utilitaires
- **React Router DOM 7** — routing
- **Axios** — client HTTP avec intercepteurs JWT
- **Framer Motion** — animations au scroll

## Librairies installées

- `react-router-dom` — routing entre les pages
- `tailwindcss` — framework CSS utility-first pour le styling
- `axios` — requêtes HTTP et gestion automatique des tokens JWT
- `react-icons` — bibliothèque d'icônes pour le footer et l'UI
- `framer-motion` — bibliothèque pour les animations au scroll

## Architecture du projet

```
src/
├── assets/              # Images et SVG (Desktop.png, logos partenaires...)
├── components/
│   ├── animation/       # FadeInOnScroll (Framer Motion)
│   ├── layout/          # Header, Footer, Layout, LanguageToggle
│   └── ui/              # Button, Input, Textarea, ArticleForm, ConfirmModal
├── context/
│   ├── AuthContext.tsx      # État global auth (useReducer + JWT)
│   └── LanguageContext.tsx  # État global langue (FR/EN)
├── hooks/               # Logique métier extraite des composants
├── locales/             # Traductions fr.json et en.json
├── pages/               # Pages de l'application
├── services/            # Appels API (api.ts, authService, blogService, adminService)
├── App.tsx              # Configuration des routes
├── main.tsx             # Point d'entrée React
├── PrivateRoute.tsx     # Protection routes (connecté)
└── PrivateAdminRoute.tsx    # Protection routes (admin is_staff)
```

## Installation

```bash
npm install
npm run dev
```

L'application démarre sur `http://localhost:5173`. Le backend Django est sur `http://localhost:8000`.

## Authentification

Stratégie hybride JWT :
- `access_token` stocké en `sessionStorage`
- `refresh_token` en cookie HttpOnly géré par Django

Le rafraîchissement du token est automatique et silencieux via les intercepteurs Axios.

## Routes principales

| Path | Description | Protection |
|---|---|---|
| `/` | Page d'accueil | Publique |
| `/blog` | Liste des articles | Publique |
| `/blog/:slug` | Détail d'un article | Publique |
| `/blog/new` | Créer un article | Connecté |
| `/admin` | Dashboard admin | is_staff |
| `/login` | Connexion | Publique |
| `/register` | Inscription | Publique |
| `/forgot-password` | Demande reset mot de passe | Publique |
| `/reset-password` | Confirmation reset mot de passe | Publique |

## Conventions Git

Utilisation de Conventional Commits :

- `feat:` nouvelle fonctionnalité
- `fix:` correction de bug
- `refactor:` refactoring de code
- `docs:` documentation
- `style:` formatage, CSS

## Documentation

Une documentation détaillée est disponible dans le dossier `documentation/` :

- `ARCHITECTURE.md` — structure des fichiers
- `AUTH.md` — authentification JWT
- `API_CLIENT.md` — client Axios et intercepteurs
- `COMPONENTS.md` — composants réutilisables
- `HOOKS.md` — hooks personnalisés
- `ARTICLES.md` — gestion des articles
- `ADMIN.md` — dashboard administration
- `ROUTING.md` — routes et navigation
- `STYLES_ASSETS.md` — thème et assets
- `ERROR_HANDLING.md` — gestion des erreurs