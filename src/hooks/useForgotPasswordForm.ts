import { useState, FormEvent } from 'react';
import { requestPasswordReset } from '../services/authService';

interface UseForgotPasswordFormReturn {
    email: string;
    isLoading: boolean;
    successMessage: string | null;
    apiError: string | null;
    setEmail: (value: string) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>, t: any) => Promise<void>;
}

/**
 * Hook pour gérer la logique du formulaire de demande de reset password
 * Envoie l'email et affiche un message générique (sécurité : ne révèle pas si l'email existe)
 */
export function useForgotPasswordForm(): UseForgotPasswordFormReturn {
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, t: any): Promise<void> => {
        e.preventDefault();
        setApiError(null);
        setSuccessMessage(null);

        if (!email.trim()) {
            setApiError(t.forgotPassword.validation?.emailRequired ?? 'L\'email est requis.');
            return;
        }

        setIsLoading(true);
        try {
            await requestPasswordReset(email);
            setSuccessMessage(
                t.forgotPassword.successMessage ??
                'Si un compte est associé à cet email, vous recevrez un lien de réinitialisation.'
            );
            setEmail('');
        } catch {
            setApiError(
                t.forgotPassword.errors?.default ??
                'Une erreur est survenue. Veuillez réessayer.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        isLoading,
        successMessage,
        apiError,
        setEmail,
        handleSubmit,
    };
}