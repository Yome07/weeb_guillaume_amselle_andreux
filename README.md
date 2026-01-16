# Weeb - Blog sur le Web

## Description
Site vitrine de l'entreprise Weeb.

## Technologies utilisées
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Framer Motion

## Librairies installées
- `react-router-dom` : Gestion du routing entre les pages
- `tailwindcss` : Framework CSS utility-first pour le styling
- `react-icons` : Bibliothèque d'icônes pour le footer et UI
- `framer-motion` : Bibliothèque pour l’animation

## Architecture du projet
```
src/
├── components/     # Composants réutilisables
│   ├── layout/     # Header, Footer, Layout, LanguageToggle
    ├── animation/  # FadeInScroll
│   └── ui/         # Button, Input
├── pages/          # Pages de l'application
├── assets/         # Images et ressources
├── context/        # LanguageContext
├── locales/        # Traductions fr et en
```

## Installation
```bash
npm install
npm run dev
```

## onventions Git
Utilisation de Conventional Commits :
- `feat:` nouvelle fonctionnalité
- `fix:` correction de bug
- `refactor:` refactoring de code
