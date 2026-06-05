# Architecture

## Structure des fichiers

```
src/
├── assets/              # Images et SVG (Desktop.png, Shapes.png, logos...)
├── components/
│   ├── animation/
│   │   └── FadeInOnScroll.tsx   # Animation au scroll (Framer Motion)
│   ├── layout/
│   │   ├── Header.tsx           # En-tête responsive avec menu burger
│   │   ├── Footer.tsx           # Pied de page avec sections et réseaux sociaux
│   │   ├── Layout.tsx           # Layout principal (Header + Outlet + Footer)
│   │   └── LanguageToggle.tsx   # Bouton FR/EN
│   └── ui/
│       ├── Button.tsx           # Bouton réutilisable (primary/secondary)
│       ├── Input.tsx            # Champ de saisie avec label flottant
│       ├── Textarea.tsx         # Zone de texte avec label flottant
│       ├── ArticleForm.tsx      # Formulaire article réutilisable (create/edit)
│       └── ConfirmModal.tsx     # Modale de confirmation
├── context/
│   ├── AuthContext.tsx          # État global d'authentification (useReducer)
│   └── LanguageContext.tsx      # État global de langue (useState)
├── hooks/
│   ├── useLoginForm.ts          # Logique formulaire connexion
│   ├── useRegisterForm.ts       # Logique formulaire inscription
│   ├── useContactForm.ts        # Logique formulaire contact
│   ├── useArticleForm.ts        # Logique formulaire création article
│   ├── useArticleList.ts        # Chargement liste articles
│   └── useArticleDetail.ts      # Chargement détail article
├── locales/
│   ├── fr.json                  # Traductions françaises
│   └── en.json                  # Traductions anglaises
├── pages/
│   ├── Home.tsx                 # Page d'accueil
│   ├── Contact.tsx              # Page contact
│   ├── Login.tsx                # Page connexion
│   ├── Register.tsx             # Page inscription
│   ├── ForgotPassword.tsx       # Demande reset mot de passe
│   ├── ResetPassword.tsx        # Confirmation reset mot de passe
│   ├── ArticleList.tsx          # Liste des articles
│   ├── ArticleDetail.tsx        # Détail + édition + suppression article
│   ├── ArticleCreate.tsx        # Création d'un article
│   ├── AdminDashboard.tsx       # Dashboard administration
│   └── NotFound.tsx             # Page 404
├── services/
│   ├── api.ts                   # Instances Axios + intercepteurs
│   ├── authService.ts           # Appels API auth (login, register, reset)
│   ├── blogService.ts           # Appels API articles
│   └── adminService.ts          # Appels API administration
├── App.tsx                      # Définition des routes
├── main.tsx                     # Point d'entrée React
├── PrivateRoute.tsx             # Route protégée (connecté)
└── PrivateAdminRoute.tsx        # Route protégée (is_staff)
```

## Principes d'architecture

La logique métier est extraite dans des **hooks personnalisés** — les composants de page ne gèrent que l'affichage. Les appels API sont centralisés dans les **services**. L'état global est géré via le **Context API** avec `useReducer` pour l'auth et `useState` pour la langue.
