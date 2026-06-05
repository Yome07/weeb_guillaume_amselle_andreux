# Contact

## Page Contact

Formulaire de contact avec 5 champs : nom, prénom, email, téléphone, message.

## Endpoint

```
POST /contact/
```

Pas d'authentification requise.

## Payload

```json
{
  "last_name": "Doe",
  "first_name": "John",
  "email": "john@example.com",
  "phone": "0612345678",
  "message": "Votre message"
}
```

## Particularité

`useContactForm` utilise `publicApi` (instance Axios centralisée de `api.ts`).
Les erreurs de validation sont retournées champ par champ par Django et affichées sous chaque input concerné. Le catch utilise `AxiosError` typé pour distinguer 3 cas : erreur serveur (4xx/5xx), erreur réseau (pas de réponse), erreur de configuration.

Les erreurs peuvent être une chaîne ou un tableau de chaînes — le composant gère les deux cas :

```tsx
{Array.isArray(errors.email) ? errors.email[0] : errors.email}
```
