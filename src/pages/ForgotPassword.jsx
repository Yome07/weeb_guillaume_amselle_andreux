import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

/**
 * Page de réinitialisation de mot de passe (Forgot Password)
 * Affiche l'email (récupéré depuis la page Login) en lecture seule
 * Demande le nouveau mot de passe + confirmation
 */
function ForgotPassword() {
  const { t } = useLanguage(); // Hook pour accéder aux traductions
  const [searchParams] = useSearchParams(); // Pour récupérer l'email de l'URL

  // Récupérer l'email depuis l'URL
  const emailFromUrl = searchParams.get('email') || '';

  // États pour les champs du formulaire
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // États pour les erreurs
  const [errors, setErrors] = useState({});

  /**
   * Valide le mot de passe
   * - Minimum 8 caractères
   * - Au moins une majuscule
   * - Au moins une minuscule
   * - Au moins un chiffre
   * - Au moins un caractère spécial
   */
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
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

  /**
   * Gère l’envoi du formulaire
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Réinitialiser les erreurs
    const newErrors = {};

    // Validation du mot de passe
    const passwordValidation = validatePassword(password);
    if (!password) {
      newErrors.password = t.forgotPassword.validation.passwordRequired;
    } else if (!passwordValidation.isValid) {
      newErrors.password = t.forgotPassword.validation.passwordWeak;
    }

    // Validation de la confirmation du mot de passe
    if (!confirmPassword) {
      newErrors.confirmPassword = t.forgotPassword.validation.confirmPasswordRequired;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = t.forgotPassword.validation.passwordMismatch;
    }

    // Si des erreurs existent, les afficher
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Si tout est valide, envoyer le formulaire
    console.log('Réinitialisation réussie pour:', emailFromUrl, 'Nouveau mot de passe:', password);
    
    // Réinitialiser le formulaire
    setPassword('');
    setConfirmPassword('');
    setErrors({});
  };

  // Vérifier la force du mot de passe en temps réel
  const passwordStrength = password ? validatePassword(password) : null;

  return (
    <>
      {/* Titre */}
      <div className="text-center mb-8 lg:mb-12 max-w-4xl mx-auto">
        <h1 className="text-white font-extrabold text-4xl mb-6 lg:text-6xl">
          {t.forgotPassword.title}
        </h1>
        <p className="text-white lg:text-lg mb-4">
          {t.forgotPassword.description}
        </p>
        {/* Affichage de l'email */}
        {emailFromUrl && (
          <p className="text-purple-light font-semibold text-xl lg:text-2xl">
            {emailFromUrl}
          </p>
        )}
      </div>

      {/* Formulaire */}
      <div className="w-full max-w-sm lg:max-w-2xl p-8 lg:p-12 border-2 border-purple-light rounded-3xl bg-purple-dark mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:gap-8">
          
          {/* Nouveau mot de passe */}
          <div>
            <Input
              label={t.forgotPassword.form.password}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
            
            {/* Indicateurs de force du mot de passe */}
            {password && (
              <div className="mt-3 space-y-1">
                <p className="text-white text-sm font-medium mb-2">
                  {t.forgotPassword.passwordCriteria.title}
                </p>
                <div className="space-y-1">
                  <p className={`text-xs ${passwordStrength.minLength ? 'text-green-400' : 'text-gray-400'}`}>
                    {passwordStrength.minLength ? '✓' : '○'} {t.forgotPassword.passwordCriteria.minLength}
                  </p>
                  <p className={`text-xs ${passwordStrength.hasUppercase ? 'text-green-400' : 'text-gray-400'}`}>
                    {passwordStrength.hasUppercase ? '✓' : '○'} {t.forgotPassword.passwordCriteria.hasUppercase}
                  </p>
                  <p className={`text-xs ${passwordStrength.hasLowercase ? 'text-green-400' : 'text-gray-400'}`}>
                    {passwordStrength.hasLowercase ? '✓' : '○'} {t.forgotPassword.passwordCriteria.hasLowercase}
                  </p>
                  <p className={`text-xs ${passwordStrength.hasNumber ? 'text-green-400' : 'text-gray-400'}`}>
                    {passwordStrength.hasNumber ? '✓' : '○'} {t.forgotPassword.passwordCriteria.hasNumber}
                  </p>
                  <p className={`text-xs ${passwordStrength.hasSpecialChar ? 'text-green-400' : 'text-gray-400'}`}>
                    {passwordStrength.hasSpecialChar ? '✓' : '○'} {t.forgotPassword.passwordCriteria.hasSpecialChar}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Confirmation du mot de passe */}
          <div>
            <Input
              label={t.forgotPassword.form.confirmPassword}
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>
            )}
            
            {/* Indicateur de correspondance */}
            {confirmPassword && (
              <p className={`text-xs mt-2 ${password === confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
                {password === confirmPassword 
                  ? `✓ ${t.forgotPassword.passwordCriteria.match}` 
                  : `✗ ${t.forgotPassword.passwordCriteria.noMatch}`}
              </p>
            )}
          </div>

          {/* Bouton d’envoi */}
          <Button type="submit" className="w-full mt-4">
            {t.forgotPassword.form.submit}
          </Button>
        </form>

        {/* Lien retour vers la page de connexion */}
        <div className="text-center mt-6">
          <Link 
            to={`/login${emailFromUrl ? `?email=${encodeURIComponent(emailFromUrl)}` : ''}`}
            className="text-purple-light hover:underline text-sm font-medium"
          >
            {t.forgotPassword.form.backToLogin}
          </Link>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;