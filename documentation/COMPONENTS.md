# Composants

## Composants UI (`src/components/ui/`)

### `Button`

Bouton réutilisable avec deux variantes.

```tsx
<Button variant="primary" onClick={handleClick} disabled={isLoading}>
  Envoyer
</Button>
```

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Style du bouton |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Type HTML |
| `disabled` | `boolean` | `false` | Désactive le bouton |
| `className` | `string` | `''` | Classes CSS supplémentaires |

### `Input`

Champ de saisie avec label flottant animé. Le label monte quand le champ est focalisé ou contient du texte.

```tsx
<Input label="Email" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
```

### `Textarea`

Zone de texte multi-lignes avec le même comportement de label flottant qu'`Input`.

```tsx
<Textarea label="Message" id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} />
```

| Prop | Type | Défaut |
|---|---|---|
| `rows` | `number` | `6` |

### `ArticleForm`

Formulaire réutilisable pour la création et la modification d'article. Utilisé dans `ArticleCreate` et `ArticleDetail` (mode édition).

```tsx
<ArticleForm
  title={title}
  content={content}
  errors={errors}
  apiError={apiError}
  isLoading={isLoading}
  submitLabel="Publier"
  onTitleChange={setTitle}
  onContentChange={setContent}
  onSubmit={handleSubmit}
  onCancel={handleCancel}  // optionnel
/>
```

### `ConfirmModal`

Modale de confirmation avec overlay. Utilisée avant suppression d'un article.

```tsx
<ConfirmModal
  isOpen={isModalOpen}
  title="Supprimer l'article"
  message="Cette action est irréversible."
  confirmLabel="Supprimer"
  cancelLabel="Annuler"
  onConfirm={handleDelete}
  onCancel={() => setIsModalOpen(false)}
/>
```

---

## Composants Layout (`src/components/layout/`)

### `Layout`

Enveloppe toutes les pages. Contient `LanguageProvider`, `Header`, `<main>` avec `<Outlet />`, et `Footer`.

### `Header`

En-tête responsive avec :
- Logo + navigation desktop (Contact, Blog, Admin si `is_staff`)
- Boutons Login/Register ou Prénom/Déconnexion selon l'état d'auth
- Menu burger animé sur mobile (slide depuis la droite)
- Overlay de fermeture au clic

### `Footer`

Pied de page avec 4 sections de liens (Produit, Solutions, Ressources, Entreprise) et icônes réseaux sociaux générés dynamiquement depuis des tableaux de données.

### `LanguageToggle`

Bouton qui alterne entre `FR` et `EN` via `useLanguage().toggleLanguage()`.

---

## Composants Animation (`src/components/animation/`)

### `FadeInOnScroll`

Anime ses enfants au scroll avec Framer Motion. Déclenche l'animation quand 33% de l'élément est visible dans le viewport.

```tsx
<FadeInOnScroll delay={0.2} direction="up">
  <h1>Titre animé</h1>
</FadeInOnScroll>
```

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `delay` | `number` | `0` | Délai en secondes |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Direction de l'animation |
| `className` | `string` | `''` | Classes CSS |
