import { useLanguage } from '../../context/LanguageContext';

/**
 * Composant LanguageToggle
 * Bouton pour basculer entre français et anglais
 * Affiche le code de langue
 */
function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  // Noms des langues
  const languageNames = {
    fr: 'FR',
    en: 'EN',
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 text-white font-medium"
      aria-label={` ${language === 'fr' ? 'Switch to English' : 'Basculer vers le français'}`}
      title={`${language === 'fr' ? 'Switch to English' : 'Basculer vers le français'}`}
    >
      <span className="text-sm font-semibold">
        {languageNames[language]}
      </span>
    </button>
  );
}

export default LanguageToggle;