import { useState, FormEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import {useAuth} from "../context/AuthContext";

interface UseLoginFormReturn {
  email: string;
  password: string;
  error: string | null;
  isLoading: boolean;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

/**
 * Hook personnalisé pour gérer la logique du formulaire de connexion
 * Gère l'état des champs email et password
 * Récupère l'email depuis l'URL si présent
 *
 * @returns {UseLoginFormReturn} - État et fonctions pour gérer le formulaire
 */
export function useLoginForm(): UseLoginFormReturn {
  const { dispatch } = useAuth();
  const [searchParams] = useSearchParams(); // Pour récupérer l'email de l'URL
  const navigate = useNavigate();

  // Récupérer l'email depuis l'URL
  const emailFromUrl = searchParams.get('email') || '';

  // États pour gérer les valeurs des champs du formulaire
  const [email, setEmail] = useState<string>(emailFromUrl);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Gère l'envoi du formulaire
   * @param {FormEvent} e - événement d'envoi du formulaire
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError(null);
    setIsLoading(true);

    try {
      const data = await login({ email, password });

      // Stocker les tokens JWT
      sessionStorage.setItem('access_token', data.access);

      const payload = JSON.parse(atob(data.access.split('.')[1]));
      dispatch({
        type: 'LOGIN',
        payload: {
          first_name: payload.first_name,
          last_name: payload.last_name,
          email: payload.email,
          is_staff: payload.is_staff,
          is_active: payload.is_active,
        }
      });

      // Rediriger vers la page d'accueil après connexion
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Identifiants incorrects.');
    } finally {
      setIsLoading(false);
    }

  };

  return {
    // États
    email,
    password,
    error,
    isLoading,

    // Setters
    setEmail,
    setPassword,

    // Fonctions
    handleSubmit,
  };
}

