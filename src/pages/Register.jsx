import { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

/**
 * Page d'inscription (Register)
 * Formulaire avec validation complète :
 * - Format email
 * - Mot de passe fort (8 caractères, majuscule, mininuscule, chiffre, spécial)
 * - Vérification de correspondance des mots de passe
 */
function Register() {
  const { t } = useLanguage(); // Hook pour accéder aux traductions

  // États pour les champs du formulaire
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // États pour les erreurs
  const [errors, setErrors] = useState({});

  /**
   * Valide le format de l'email
   */
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

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
   * Gère la soumission du formulaire
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Réinitialiser les erreurs
    const newErrors = {};

    // Validation du nom
    if (!lastname.trim()) {
      newErrors.lastname = t.register.validation.lastnameRequired;
    }

    // Validation du prénom
    if (!firstname.trim()) {
      newErrors.firstname = t.register.validation.firstnameRequired;
    }

    // Validation de l'email
    if (!email.trim()) {
      newErrors.email = t.register.validation.emailRequired;
    } else if (!validateEmail(email)) {
      newErrors.email = t.register.validation.emailInvalid;
    }

    // Validation du mot de passe
    const passwordValidation = validatePassword(password);
    if (!password) {
      newErrors.password = t.register.validation.passwordRequired;
    } else if (!passwordValidation.isValid) {
      newErrors.password = t.register.validation.passwordWeak;
    }

    // Validation de la confirmation du mot de passe
    if (!confirmPassword) {
      newErrors.confirmPassword = t.register.validation.confirmPasswordRequired;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = t.register.validation.passwordMismatch;
    }

    // Si des erreurs existent, les afficher
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Si tout est valide, soumettre le formulaire
    console.log('Inscription réussie !', { lastname, firstname, email, password });
    // TODO: Appel API pour créer le compte
    
    // Réinitialiser le formulaire
    setLastname('');
    setFirstname('');
    setEmail('');
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
          {t.register.title}
        </h1>
        <p className="text-white lg:text-lg">
          {t.register.description}
        </p>
      </div>

      {/* Formulaire */}
      <div className="w-full max-w-sm lg:max-w-2xl p-8 lg:p-12 border-2 border-purple-light rounded-3xl bg-purple-dark mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:gap-8">
          
          {/* Nom et Prénom */}
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
            <div className="flex-1">
              <Input
                label={t.register.form.lastname}
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm mt-2">{errors.lastname}</p>
              )}
            </div>

            <div className="flex-1">
              <Input
                label={t.register.form.firstname}
                type="text"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm mt-2">{errors.firstname}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <Input
              label={t.register.form.email}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          {/* Mot de passe */}
          <div>
            <Input
              label={t.register.form.password}
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
                  {t.register.passwordCriteria.title}
                </p>
                <div className="space-y-1">
                  <p className={`text-xs ${passwordStrength.minLength ? 'text-green-400' : 'text-gray-400'}`}>
                    {passwordStrength.minLength ? '✓' : '○'} {t.register.passwordCriteria.minLength}
                  </p>
                  <p className={`text-xs ${passwordStrength.hasUppercase ? 'text-green-400' : 'text-gray-400'}`}>
                    {passwordStrength.hasUppercase ? '✓' : '○'} {t.register.passwordCriteria.hasUppercase}
                  </p>
                  <p className={`text-xs ${passwordStrength.hasLowercase ? 'text-green-400' : 'text-gray-400'}`}>
                    {passwordStrength.hasLowercase ? '✓' : '○'} {t.register.passwordCriteria.hasLowercase}
                  </p>
                  <p className={`text-xs ${passwordStrength.hasNumber ? 'text-green-400' : 'text-gray-400'}`}>
                    {passwordStrength.hasNumber ? '✓' : '○'} {t.register.passwordCriteria.hasNumber}
                  </p>
                  <p className={`text-xs ${passwordStrength.hasSpecialChar ? 'text-green-400' : 'text-gray-400'}`}>
                    {passwordStrength.hasSpecialChar ? '✓' : '○'} {t.register.passwordCriteria.hasSpecialChar}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Confirmation du mot de passe */}
          <div>
            <Input
              label={t.register.form.confirmPassword}
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
                  ? `✓ ${t.register.passwordCriteria.match}` 
                  : `✗ ${t.register.passwordCriteria.noMatch}`}
              </p>
            )}
          </div>

          {/* Bouton de soumission */}
          <Button type="submit" className="w-full mt-4">
            {t.register.form.submit}
          </Button>
        </form>

        {/* Lien vers la page de connexion */}
        <p className="text-white text-center text-sm mt-6">
          {t.register.form.hasAccount}{' '}
          <a href="/login" className="text-purple-light hover:underline">
            {t.register.form.loginLink}
          </a>
        </p>
      </div>
    </>
  );
}

export default Register;