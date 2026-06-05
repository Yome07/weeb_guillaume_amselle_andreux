import { Link } from 'react-router-dom';
import { FormEvent } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { useForgotPasswordForm } from '../hooks/useForgotPasswordForm';

/**
 * Page de demande de réinitialisation de mot de passe
 * Affiche un champ email et envoie le lien de reset par email
 */
function ForgotPassword() {
    const { t } = useLanguage();
    const {
        email,
        isLoading,
        successMessage,
        apiError,
        setEmail,
        handleSubmit: submitForm,
    } = useForgotPasswordForm();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        submitForm(e, t);
    };

    return (
        <>
            {/* Titre */}
            <div className="text-center mb-8 lg:mb-12 max-w-4xl mx-auto">
                <h1 className="text-white font-extrabold text-4xl mb-6 lg:text-6xl">
                    {t.forgotPassword.title}
                </h1>
                <p className="text-white lg:text-lg">
                    {t.forgotPassword.description}
                </p>
            </div>

            {/* Carte */}
            <div className="w-full max-w-sm lg:max-w-2xl p-8 lg:p-12 border-2 border-purple-light rounded-3xl bg-purple-dark mx-auto">

                {successMessage ? (
                    <div className="text-center">
                        <p className="text-green-400 text-lg font-medium mb-6">✓ {successMessage}</p>
                        <Link to="/login" className="text-purple-light hover:underline text-sm">
                            {t.forgotPassword.form?.backToLogin ?? 'Retour à la connexion'}
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:gap-8">

                        {/* Email */}
                        <Input
                            label={t.forgotPassword.form?.email ?? 'Email'}
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {/* Erreur API */}
                        {apiError && (
                            <p className="text-red-400 text-sm text-center">{apiError}</p>
                        )}

                        {/* Bouton */}
                        <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                            {isLoading
                                ? (t.forgotPassword.form?.submitting ?? 'Envoi…')
                                : (t.forgotPassword.form?.submit ?? 'Envoyer le lien')}
                        </Button>
                    </form>
                )}

                {/* Lien retour */}
                {!successMessage && (
                    <div className="text-center mt-6">
                        <Link
                            to="/login"
                            className="text-purple-light hover:underline text-sm font-medium"
                        >
                            {t.forgotPassword.form?.backToLogin ?? 'Retour à la connexion'}
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

export default ForgotPassword;