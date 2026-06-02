import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Hook personnalisé pour gérer la logique du formulaire de connexion
 * Gère l'état des champs email et password
 * Récupère l'email depuis l'URL si présent
 *
 * @returns {Object} - État et fonctions pour gérer le formulaire
 */
export function useLoginForm() {
  const [searchParams] = useSearchParams(); // Pour récupérer l'email de l'URL

  // Récupérer l'email depuis l'URL
  const emailFromUrl = searchParams.get('email') || '';

  // États pour gérer les valeurs des champs du formulaire
  const [email, setEmail] = useState(emailFromUrl);
  const [password, setPassword] = useState('');

  /**
   * Gère l'envoi du formulaire
   * @param {Event} e - événement d'envoi du formulaire
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log('Email:', email);
    console.log('Password:', password);

    // TODO: Ajouter l'appel API pour la connexion
  };

  return {
    // États
    email,
    password,

    // Setters
    setEmail,
    setPassword,

    // Fonctions
    handleSubmit,
  };
}

