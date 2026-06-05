import { useSearchParams, Link } from 'react-router-dom';
import { FormEvent } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { useResetPasswordForm } from '../hooks/useResetPasswordForm';

/**
 * Page de confirmation de réinitialisation de mot de passe
 * Récupère uidb64 et token depuis l'URL, affiche un formulaire de nouveau mot de passe et envoie la requête à l'API
 */
function ResetPassword() {
    const { t } = useLanguage();
    const [searchParams] = useSearchParams();
    const uidb64 = searchParams.get('uidb64') || '';
    const token = searchParams.get('token') || '';

    const {
        password,
        confirmPassword,
        errors,
        apiError,
        isLoading,
        passwordStrength,
        passwordsMatch,
        setPassword,
        setConfirmPassword,
        handleSubmit: submitForm,
    } = useResetPasswordForm();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        submitForm(e, t, uidb64, token);
    };

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
                            <p className={`text-xs mt-2 ${passwordsMatch ? 'text-green-400' : 'text-red-400'}`}>
                                {passwordsMatch
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