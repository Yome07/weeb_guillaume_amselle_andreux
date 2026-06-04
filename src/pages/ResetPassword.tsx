import { useState, FormEvent } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { confirmPasswordReset } from '../services/authService';

interface PasswordStrength {
    isValid: boolean;
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
}

/**
 * Page de confirmation de réinitialisation de mot de passe
 * Récupère uidb64 et token depuis l'URL
 * Envoie le nouveau mot de passe à l'API
 */
function ResetPassword() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Récupérer uidb64 et token depuis l'URL
    const uidb64 = searchParams.get('uidb64') || '';
    const token = searchParams.get('token') || '';

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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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

    return (
        <>
            {/* Titre */}
            <div className="text-center mb-8 lg:mb-12 max-w-4xl mx-auto">
                <h1 className="text-white font-extrabold text-4xl mb-6 lg:text-6xl">
                    {t.forgotPassword.resetTitle ?? 'Nouveau mot de passe'}
                </h1>
                <p className="text-white lg:text-lg">
                    {t.forgotPassword.resetDescription ?? 'Choisissez un nouveau mot de passe.'}
                </p>
            </div>

            {/* Formulaire */}
            <div className="w-full max-w-sm lg:max-w-2xl p-8 lg:p-12 border-2 border-purple-light rounded-3xl bg-purple-dark mx-auto">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:gap-8">

                    {/* Nouveau mot de passe */}
                    <div>
                        <Input
                            label={t.forgotPassword.form?.password ?? 'Nouveau mot de passe'}
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-2">{errors.password}</p>
                        )}

                        {/* Indicateurs de force */}
                        {password && passwordStrength && (
                            <div className="mt-3 space-y-1">
                                <p className="text-white text-sm font-medium mb-2">
                                    {t.forgotPassword.passwordCriteria?.title ?? 'Critères du mot de passe'}
                                </p>
                                <div className="space-y-1">
                                    <p className={`text-xs ${passwordStrength.minLength ? 'text-green-400' : 'text-gray-400'}`}>
                                        {passwordStrength.minLength ? '✓' : '○'} {t.forgotPassword.passwordCriteria?.minLength ?? '12 caractères minimum'}
                                    </p>
                                    <p className={`text-xs ${passwordStrength.hasUppercase ? 'text-green-400' : 'text-gray-400'}`}>
                                        {passwordStrength.hasUppercase ? '✓' : '○'} {t.forgotPassword.passwordCriteria?.hasUppercase ?? 'Une majuscule'}
                                    </p>
                                    <p className={`text-xs ${passwordStrength.hasLowercase ? 'text-green-400' : 'text-gray-400'}`}>
                                        {passwordStrength.hasLowercase ? '✓' : '○'} {t.forgotPassword.passwordCriteria?.hasLowercase ?? 'Une minuscule'}
                                    </p>
                                    <p className={`text-xs ${passwordStrength.hasNumber ? 'text-green-400' : 'text-gray-400'}`}>
                                        {passwordStrength.hasNumber ? '✓' : '○'} {t.forgotPassword.passwordCriteria?.hasNumber ?? 'Un chiffre'}
                                    </p>
                                    <p className={`text-xs ${passwordStrength.hasSpecialChar ? 'text-green-400' : 'text-gray-400'}`}>
                                        {passwordStrength.hasSpecialChar ? '✓' : '○'} {t.forgotPassword.passwordCriteria?.hasSpecialChar ?? 'Un caractère spécial'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Confirmation */}
                    <div>
                        <Input
                            label={t.forgotPassword.form?.confirmPassword ?? 'Confirmer le mot de passe'}
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>
                        )}
                        {confirmPassword && (
                            <p className={`text-xs mt-2 ${password === confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
                                {password === confirmPassword
                                    ? `✓ ${t.forgotPassword.passwordCriteria?.match ?? 'Les mots de passe correspondent'}`
                                    : `✗ ${t.forgotPassword.passwordCriteria?.noMatch ?? 'Les mots de passe ne correspondent pas'}`}
                            </p>
                        )}
                    </div>

                    {/* Erreur API */}
                    {apiError && (
                        <p className="text-red-400 text-sm text-center">{apiError}</p>
                    )}

                    {/* Bouton */}
                    <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                        {isLoading
                            ? 'Réinitialisation...'
                            : (t.forgotPassword.form?.resetSubmit ?? 'Réinitialiser le mot de passe')}
                    </Button>
                </form>

                <div className="text-center mt-6">
                    <Link to="/login" className="text-purple-light hover:underline text-sm font-medium">
                        {t.forgotPassword.form?.backToLogin ?? 'Retour à la connexion'}
                    </Link>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;