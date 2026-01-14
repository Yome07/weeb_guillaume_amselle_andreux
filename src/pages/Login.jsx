import { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

/**
 * Page de connexion (Login)
 * Contient un formulaire avec email et password
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
    <>
      {/* Section principale du formulaire */}
      <main className="px-20 py-12">
        
        {/* Container du formulaire */}
        <div className="mx-auto flex flex-col items-center gap-8 w-full max-w-3xs">
          
          {/* Titre principal */}
          <h2 className="text-white font-extrabold text-4xl text-center">
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
            <Button type="submit" className="cursor-pointer w-3/5 mx-auto">
              Se connecter
            </Button>
          </form>

          {/* Lien mot de passe oublié */}
          <a 
            href="#" 
            className="text-white font-inter font-semibold text-sm text-center hover:text-purple-light transition"
          >
            Mot de passe oublié ?
          </a>

          {/* Texte inscription */}
          <p className="text-gray-light font-poppins font-medium text-xs leading-5 text-center max-w-3/5">
            Vous n'avez pas de compte ? Vous pouvez en <a href="#" className='text-white underline'>créer un</a>
          </p>
        </div>
      </main>
    </>
  );
}

export default Login;