import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import translationsFr from '../locales/fr.json';
import translationsEn from '../locales/en.json';

// Types
type Language = 'fr' | 'en';

type Translations = typeof translationsFr;

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: Translations;
}

// Créer le contexte de langue
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traductions disponibles
const translations: Record<Language, Translations> = {
    fr: translationsFr,
    en: translationsEn,
};

/**
 * Provider de langue qui enveloppe l'application
 * Gère la langue actuelle et fournit les traductions
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
    // Récupérer la langue sauvegardée ou utiliser 'fr' par défaut
    const [language, setLanguage] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem('language');
        return (savedLanguage as Language) || 'fr';
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
    const value: LanguageContextType = {
        language,
        toggleLanguage,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

/**
 * Hook personnalisé pour accéder au contexte de langue
 * @returns {LanguageContextType} { language, toggleLanguage, t }
 */
export function useLanguage(): LanguageContextType {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used with a LanguageProvider');
    }
    return context;
}