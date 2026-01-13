import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

/**
 * Page de connexion (Login)
 * Contient un formulaire avec email et password
 * Version Mobile First
 */
function Login() {
  // États pour gérer les valeurs des champs du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Gère la soumission du formulaire
   * @param {Event} e - L'événement de soumission du formulaire
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log('Email:', email);
    console.log('Password:', password);
    // TODO: Ajouter la logique de connexion ici
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-gray-900">
      {/* En-tête avec logo et menu */}
      <Header />

      {/* Section principale du formulaire */}
      <main className="flex-1 flex flex-col items-center px-20 py-[50px] gap-20">
        
        {/* Container du formulaire */}
        <div className="flex flex-col items-center gap-8 w-full max-w-[250px]">
          
          {/* Titre principal */}
          <h2 className="text-white font-roboto font-extrabold text-[40px] leading-[110%] text-center">
            Se connecter
          </h2>

          {/* Formulaire de connexion */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
            
            {/* Champ Email */}
            <Input
              label="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
            />

            {/* Champ Password */}
            <Input
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />

            {/* Bouton de soumission */}
            <Button type="submit" className="w-[156px] mx-auto">
              Se connecter
            </Button>
          </form>

          {/* Lien mot de passe oublié */}
          <a 
            href="#" 
            className="text-white font-inter font-semibold text-[13px] leading-4 text-center hover:text-purple-light transition"
          >
            Mot de passe oublié ?
          </a>

          {/* Texte inscription */}
          <p className="text-gray-light font-poppins font-medium text-xs leading-[18px] text-center max-w-[121px]">
            Vous n'avez pas de compte ? Vous pouvez en créer un
          </p>
        </div>
      </main>

      {/* Pied de page */}
      <Footer />
    </div>
  );
}

export default Login;