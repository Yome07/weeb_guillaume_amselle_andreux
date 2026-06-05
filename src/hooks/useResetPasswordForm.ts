import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmPasswordReset } from '../services/authService';

interface PasswordStrength {
    isValid: boolean;
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
}

interface UseResetPasswordFormReturn {
    password: string;
    confirmPassword: string;
    errors: Record<string, string>;
    apiError: string | null;
    isLoading: boolean;
    passwordStrength: PasswordStrength | null;
    passwordsMatch: boolean;
    setPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>, t: any, uidb64: string, token: string) => Promise<void>;
}

/**
 * Hook pour gérer la logique du formulaire de confirmation de reset password
 * Valide le mot de passe et envoie la requête à l'API
 */
export function useResetPasswordForm(): UseResetPasswordFormReturn {
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validatePassword = (password: string): PasswordStrength => {
        const minLength = password.length >= 12;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return {
            isValid: minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar,
            minLength,
            hasUppercase,
            hasLowercase,
            hasNumber,
            hasSpecialChar,
        };
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>,
        t: any,
        uidb64: string,
        token: string
    ): Promise<void> => {
        e.preventDefault();
        setApiError(null);

        const newErrors: Record<string, string> = {};
        const passwordValidation = validatePassword(password);

        if (!password) {
            newErrors.password = t.forgotPassword.validation?.passwordRequired ?? 'Le mot de passe est requis.';
        } else if (!passwordValidation.isValid) {
            newErrors.password = t.forgotPassword.validation?.passwordWeak ?? 'Le mot de passe est trop faible.';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = t.forgotPassword.validation?.confirmPasswordRequired ?? 'La confirmation est requise.';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = t.forgotPassword.validation?.passwordMismatch ?? 'Les mots de passe ne correspondent pas.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Vérifier que le lien contient bien uidb64 et token
        if (!uidb64 || !token) {
            setApiError('Le lien de réinitialisation est invalide ou a expiré.');
            return;
        }

        setIsLoading(true);
        try {
            await confirmPasswordReset({ uidb64, token, password });
            navigate('/login');
        } catch (err: any) {
            const errorCode = err?.response?.data?.error_code;
            if (errorCode === 'INVALID_TOKEN') {
                setApiError('Le lien de réinitialisation est invalide ou a expiré.');
            } else {
                setApiError('Une erreur est survenue. Veuillez réessayer.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const passwordStrength = password ? validatePassword(password) : null;
    const passwordsMatch = password === confirmPassword;

    return {
        password,
        confirmPassword,
        errors,
        apiError,
        isLoading,
        passwordStrength,
        passwordsMatch,
        setPassword,
        setConfirmPassword,
        handleSubmit,
    };
}