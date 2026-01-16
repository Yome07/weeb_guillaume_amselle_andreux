import { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

/**
 * Page de contact (Contact)
 * Contient un formulaire avec nom, prénom, email et message
 */
function Contact() {
  const { t } = useLanguage(); // Hook pour accéder aux traductions

  // États pour gérer les valeurs des champs du formulaire
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
    console.log('Phone:', phone);
    console.log('Message:', message);
  };

  return (
    <>
        {/* Titre et description */}
        <div className="text-center mb-8 lg:mb-12 max-w-4xl mx-auto">
          <h1 className="text-white font-extrabold text-4xl mb-6 lg:text-6xl">
            {t.contact.title}
          </h1>
          <p className="text-white lg:text-lg">
            {t.contact.description}
          </p>
        </div>

        {/* Container du formulaire avec bordure violette */}
        <div className="w-full max-w-sm lg:max-w-2xl p-8 lg:p-12 border-2 border-purple-light rounded-3xl bg-purple-dark mx-auto">
          
          {/* Formulaire de contact */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:gap-8">
            
            {/* Nom et Prénom - côte à côte sur desktop */}
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
              {/* Champ Nom */}
              <div className="flex-1">
                <Input
                  label={t.contact.form.lastname}
                  type="text"
                  id="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>

              {/* Champ Prénom */}
              <div className="flex-1">
                <Input
                  label={t.contact.form.firstname}
                  type="text"
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
                {/* Champ Téléphone */}
                <div className="flex-1">
                    <Input
                    label={t.contact.form.phone}
                    type="tel"
                    id="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                
                {/* Champ Email */}
                <div className="flex-1">
                    <Input
                    label={t.contact.form.email}
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            {/* Champ Message (textarea) */}
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="message" 
                className="text-purple-light font-inter font-medium text-2xl text-center"
              >
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                className="border-b border-purple-light text-white text-lg p-2 font-inter focus:outline-none focus:border-purple-600 resize-none text-center"
              />
            </div>

            {/* Bouton d’envoi */}
            <Button type="submit" className="w-39 mx-auto mt-4">
              {t.contact.form.submit}
            </Button>
          </form>
        </div>
    </>
  );
}

export default Contact;