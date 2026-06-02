import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { useRegisterForm } from '../hooks/useRegisterForm';
import { FormEvent } from 'react';

/**
 * Page d'inscription (Register)
 * Formulaire avec validation complète :
 * - Format email
 * - Mot de passe fort (8 caractères, majuscule, mininuscule, chiffre, spécial)
 * - Vérification de correspondance des mots de passe
 */
function Register() {
  const { t } = useLanguage(); // Hook pour accéder aux traductions

  // Logique du formulaire extraite dans un hook personnalisé
  const {
    lastname,
    firstname,
    email,
    password,
    confirmPassword,
    errors,
    passwordStrength,
    passwordsMatch,
    setLastname,
    setFirstname,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSubmit: submitForm,
  } = useRegisterForm();

  // Wrapper pour passer le contexte de traduction au hook
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    submitForm(e, t);
  };

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
            {password && passwordStrength && (
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
              <p className={`text-xs mt-2 ${passwordsMatch ? 'text-green-400' : 'text-red-400'}`}>
                {passwordsMatch
                  ? `✓ ${t.register.passwordCriteria.match}`
                  : `✗ ${t.register.passwordCriteria.noMatch}`}
              </p>
            )}
          </div>

          {/* Bouton d'envoi */}
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

