import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { useContactForm } from '../hooks/useContactForm';
import Textarea from '../components/ui/Textarea';

/**
 * Page de contact (Contact)
 * Contient un formulaire avec nom, prénom, email et message
 */
function Contact() {
    const { t } = useLanguage(); // Hook pour accéder aux traductions

    // Logique du formulaire extraite dans un hook personnalisé
    const {
        lastname,
        firstname,
        email,
        subject,
        message,
        errors,
        success,
        setLastname,
        setFirstname,
        setEmail,
        setSubject,
        setMessage,
        handleSubmit,
    } = useContactForm();


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

                {/* Message de succès */}
                {success && (
                    <p className="text-green-400 text-center mb-6">
                        {t.contact.form.success}
                    </p>
                )}

                {/* Erreur réseau globale */}
                {errors.global && (
                    <p className="text-red-400 text-center mb-6">{errors.global}</p>
                )}

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
                            {errors.last_name && (
                                <p className="text-red-400 text-sm mt-1">
                                  {Array.isArray(errors.last_name) ? errors.last_name[0] : errors.last_name}
                                </p>
                            )}
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
                            {errors.first_name && (
                                <p className="text-red-400 text-sm mt-1">
                                  {Array.isArray(errors.first_name) ? errors.first_name[0] : errors.first_name}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
                        {/* Champ Sujet */}
                        <div className="flex-1">
                            <Input
                                label={t.contact.form.subject}
                                type="text"
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                            {errors.subject && (
                                <p className="text-red-400 text-sm mt-1">
                                  {Array.isArray(errors.subject) ? errors.subject[0] : errors.subject}
                                </p>
                            )}
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
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1">
                                  {Array.isArray(errors.email) ? errors.email[0] : errors.email}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* Champ Message (textarea) */}
                    <div className="flex flex-col gap-2">
                        <Textarea
                            label={t.contact.form.message}
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={5}
                        />
                    </div>

                    {/* Bouton d'envoi */}
                    <Button type="submit" className="w-39 mx-auto mt-4">
                        {t.contact.form.submit}
                    </Button>
                </form>
            </div>
        </>
    );
}

export default Contact;

