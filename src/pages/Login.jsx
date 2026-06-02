import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { useLoginForm } from '../hooks/useLoginForm';


/**
 * Page de connexion (Login)
 * Contient un formulaire avec email et password
 */
function Login() {
  const { t } = useLanguage(); // Hook pour accéder aux traductions

  // Logique du formulaire extraite dans un hook personnalisé
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLoginForm();

  return (
    <>
      {/* Container du formulaire */}
      <div className="mx-auto flex flex-col items-center gap-8 w-full max-w-3xs">
        
        {/* Titre principal */}
        <h2 className="text-white font-extrabold text-4xl text-center">
          {t.login.title}
        </h2>

        {/* Formulaire de connexion */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
          
          {/* Champ Email */}
          <Input
            label={t.login.form.email}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Champ Password */}
          <Input
            label={t.login.form.password}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Bouton de soumission */}
          <Button type="submit" className="w-3/5 mx-auto">
            {t.login.form.submit}
          </Button>
        </form>

        {/* Lien mot de passe oublié */}
        <Link 
          to={`/forgot-password${email ? `?email=${encodeURIComponent(email)}` : ''}`}
          className="text-white font-inter font-semibold text-sm text-center hover:text-purple-light transition"
        >
          {t.login.form.forgotPassword}
        </Link>

        {/* Texte inscription */}
        <p className="text-gray-light font-poppins font-medium text-xs leading-5 text-center max-w-3/5">
          {t.login.form.noAccount}{' '}<a href="/register" className='text-white underline'>{t.login.form.createAccount}</a>
        </p>
      </div>
    </>
  );
}

export default Login;