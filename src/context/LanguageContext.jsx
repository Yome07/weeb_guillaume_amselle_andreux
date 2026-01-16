import { createContext, useContext, useState, useEffect } from 'react';
import translationsFr from '../locales/fr.json';
import translationsEn from '../locales/en.json';

// Créer le contexte de langue
const LanguageContext = createContext();

// Traductions disponibles
const translations = {
  fr: translationsFr,
  en: translationsEn,
};

/**
 * Provider de langue qui enveloppe l'application
 * Gère la langue actuelle et fournit les traductions
 */
export function LanguageProvider({ children }) {
  // Récupérer la langue sauvegardée ou utiliser 'fr' par défaut
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'fr';
  });

  // Sauvegarder la langue dans le localStorage quand elle change
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  /**
   * Basculer entre français et anglais
   */
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  // Valeur du contexte
  const value = {
    language,
    changeLanguage,
    toggleLanguage,
    t: translations[language], // Traductions actuelles
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook personnalisé pour accéder au contexte de langue
 * @returns {Object} { language, toggleLanguage, t }
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used with a LanguageProvider');
  }
  return context;
}