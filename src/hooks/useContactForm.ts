import { useState, FormEvent } from 'react';
import { publicApi } from '../services/api';
import {AxiosError} from "axios";


interface UseContactFormReturn {
  lastname: string;
  firstname: string;
  email: string;
  subject: string;
  message: string;
  errors: Record<string, string | string[]>;
  success: boolean;
  isLoading: boolean;
  setLastname: (value: string) => void;
  setFirstname: (value: string) => void;
  setEmail: (value: string) => void;
  setSubject: (value: string) => void;
  setMessage: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

/**
 * Hook personnalisé pour gérer la logique du formulaire de contact
 * Gère l'état des champs, les erreurs, et l'envoi du formulaire
 *
 * @returns {UseContactFormReturn} - État et fonctions pour gérer le formulaire
 */
export function useContactForm(): UseContactFormReturn {
  // États pour gérer les valeurs des champs du formulaire
  const [lastname, setLastname] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // États pour la gestion des erreurs et du succès
  const [errors, setErrors] = useState<Record<string, string | string[]>>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Gère la soumission du formulaire
   * @param {FormEvent} e - L'événement de soumission du formulaire
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      await publicApi.post('/contact/', {
        last_name: lastname,
        first_name: firstname,
        email: email,
        subject: subject,
        message: message,
      });

      setSuccess(true);
      // Réinitialiser le formulaire
      setLastname('');
      setFirstname('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      // Gère les erreurs réseau ET les erreurs HTTP (4xx/5xx)
      const axiosError = error as AxiosError<Record<string, string | string[]>>;
      if (axiosError.response) {
        // Erreur HTTP 4xx/5xx - les données d'erreur viennent du serveur
        setErrors(axiosError.response.data);
      } else if (axiosError.request) {
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
    subject,
    message,
    errors,
    success,
    isLoading,

    // Setters
    setLastname,
    setFirstname,
    setEmail,
    setSubject,
    setMessage,

    // Fonctions
    handleSubmit,
  };
}

