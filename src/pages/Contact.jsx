import { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

/**
 * Page de contact (Contact)
 * Contient un formulaire avec nom, prénom, email et message
 */
function Contact() {
  // États pour gérer les valeurs des champs du formulaire
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  /**
   * Gère la soumission du formulaire
   * @param {Event} e - L'événement de soumission du formulaire
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    console.log('Lastname:', lastname);
    console.log('Firstname:', firstname);
    console.log('Email:', email);
    console.log('Message:', message);
    // TODO: Ajouter la logique d'envoi du message
  };

  return (
    <>
      {/* Section principale du formulaire */}
      <main className="flex-1 flex flex-col items-center px-5 py-12 md:px-10 lg:px-20 lg:py-20">
        
        {/* Titre et description */}
        <div className="text-center mb-8 lg:mb-12 max-w-[900px]">
          <h1 className="text-white font-roboto font-extrabold text-[40px] leading-[110%] mb-6 lg:text-[56px]">
            Votre avis compte !
          </h1>
          <p className="text-white font-roboto font-normal text-base leading-[140%] lg:text-lg">
            Votre retour est essentiel pour nous améliorer ! Partagez votre expérience, dites-nous ce que vous aimez et ce que nous pourrions améliorer. Vos suggestions nous aident à faire de ce blog une ressource toujours plus utile et enrichissante.
          </p>
        </div>

        {/* Container du formulaire avec bordure violette */}
        <div className="w-full max-w-[350px] lg:max-w-[600px] p-8 lg:p-12 border-2 border-purple-light rounded-[20px] bg-purple-dark">
          
          {/* Formulaire de contact */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:gap-8">
            
            {/* Nom et Prénom - côte à côte sur desktop */}
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
              {/* Champ Nom */}
              <div className="flex-1">
                <Input
                  label="Nom"
                  type="text"
                  id="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder=""
                />
              </div>

              {/* Champ Prénom */}
              <div className="flex-1">
                <Input
                  label="Prénom"
                  type="text"
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder=""
                />
              </div>
            </div>

            {/* Champ Email */}
            <Input
              label="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
            />

            {/* Champ Message (textarea) */}
            <div className="flex flex-col gap-2 w-full">
              <label 
                htmlFor="message" 
                className="text-purple-light font-inter font-medium text-[23px] text-center"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                className="w-full bg-transparent border-b border-purple-light text-white font-inter text-lg px-2 py-2 focus:outline-none focus:border-purple-600 transition resize-none"
              />
            </div>

            {/* Bouton de soumission */}
            <Button type="submit" className="cursor-pointer w-[156px] mx-auto mt-4">
              Contact
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Contact;