# Styles et Assets

## Tailwind CSS

Tailwind est importé dans `src/index.css` :

```css
@import "tailwindcss";
```

Le plugin Tailwind est configuré dans `vite.config.ts` :

```ts
plugins: [tailwindcss(), react()]
```

## Thème personnalisé

Les couleurs et polices sont définies dans `src/index.css` via `@theme` :

```css
@theme {
  --color-blue-gray-900: #0f172a;   /* Fond principal */
  --color-blue-gray-600: #475569;
  --color-blue-gray-300: #cbd5e1;
  --color-blue-gray-200: #e2e8f0;

  --color-purple-600: #9333ea;      /* Accent principal */
  --color-purple-light: #c084fc;    /* Accent clair */
  --color-purple-dark: rgb(33,34,63); /* Fond des cartes */

  --color-gray-light: #c4c4c4;

  --font-family-roboto: 'Roboto', sans-serif;
  --font-family-inter: 'Inter', sans-serif;
  --font-family-poppins: 'Poppins', sans-serif;
}
```

Ces variables sont utilisables directement comme classes Tailwind : `bg-blue-gray-900`, `text-purple-light`, `border-purple-dark`, etc.

## Polices

Trois polices chargées depuis Google Fonts dans `index.html` :

- **Roboto** (400, 500, 700, 800) — police par défaut du body
- **Inter** (400, 500, 600) — champs de formulaire, labels
- **Poppins** (400, 500) — textes secondaires

Classes utilitaires disponibles : `.font-roboto`, `.font-inter`, `.font-poppins`.

## Couleurs principales

| Classe | Valeur | Usage |
|---|---|---|
| `bg-blue-gray-900` | `#0f172a` | Fond de page |
| `bg-purple-dark` | `rgb(33,34,63)` | Fond des cartes/formulaires |
| `border-purple-light` | `#c084fc` | Bordures des cartes |
| `text-purple-light` | `#c084fc` | Liens, accents |
| `bg-purple-600` | `#9333ea` | Boutons primaires |

## Assets

Les images sont dans `src/assets/` :

| Fichier | Usage |
|---|---|
| `Desktop.png` | Image mockup (Home) |
| `Shapes.png` | Image géométrique (Home) |
| `ArtVenue.svg` | Logo partenaire |
| `SHELLS.svg` | Logo partenaire |
| `SmartFinder.svg` | Logo partenaire |
| `WAVES.svg` | Logo partenaire |
| `Zoomerr.svg` | Logo partenaire |

Importés directement dans les composants :

```ts
import DesktopImage from '../assets/Desktop.png';
```
