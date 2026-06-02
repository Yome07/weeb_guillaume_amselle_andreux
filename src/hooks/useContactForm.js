import { useState } from 'react';
import axios from 'axios';

/**
 * Hook personnalisé pour gérer la logique du formulaire de contact
 * Gère l'état des champs, les erreurs, et l'envoi du formulaire
 *
 * @returns {Object} - État et fonctions pour gérer le formulaire
 */
export function useContactForm() {
  // États pour gérer les valeurs des champs du formulaire
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // États pour la gestion des erreurs et du succès
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Gère la soumission du formulaire
   * @param {Event} e - L'événement de soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    console.log('Lastname:', lastname);
    console.log('Firstname:', firstname);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Message:', message);

    try {
      // axios.post prend l'URL et l'objet de données en 2ème argument.
      // axios s'occupe de :
      // 1. Transformer l'objet en chaîne JSON.
      // 2. Définir automatiquement l'en-tête 'Content-Type': 'application/json'.
      await axios.post('http://localhost:8000/contact/', {
        last_name: lastname,
        first_name: firstname,
        email: email,
        phone: phone,
        message: message,
      });

      setSuccess(true);
      // Réinitialiser le formulaire
      setLastname('');
      setFirstname('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      // Gère les erreurs réseau ET les erreurs HTTP (4xx/5xx)
      if (error.response) {
        // Erreur HTTP 4xx/5xx - les données d'erreur viennent du serveur
        setErrors(error.response.data);
      } else if (error.request) {
        // Erreur réseau - pas de réponse du serveur
        setErrors({ global: 'Erreur réseau' });
      } else {
        // Erreur de configuration/autre
        setErrors({ global: 'Erreur réseau' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // États
    lastname,
    firstname,
    email,
    phone,
    message,
    errors,
    success,
    isLoading,

    // Setters
    setLastname,
    setFirstname,
    setEmail,
    setPhone,
    setMessage,

    // Fonctions
    handleSubmit,
  };
}

