import React, { useState, useMemo, useEffect } from 'react';
import LanguageContext from './LanguageContext';
import en from './translations/en.json';
import mr from './translations/mr.json';

const translationMap = { en, mr };
const SUPPORTED_LANGUAGES = ['en', 'mr'];
const DEFAULT_LANGUAGE = 'en';
const STORAGE_KEY = 'language';

/**
 * LanguageProvider
 * Wraps the entire application to provide language context.
 * - Reads saved language from localStorage on mount
 * - Falls back to 'en' if no saved preference or invalid value
 * - Persists language changes to localStorage
 * - Sets document lang attribute for accessibility/SEO
 */
export default function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
        return saved;
      }
    } catch {
      // localStorage unavailable (SSR, privacy mode, etc.)
    }
    return DEFAULT_LANGUAGE;
  });

  // Persist to localStorage and update document lang
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Silently fail if localStorage is unavailable
    }
    document.documentElement.lang = language === 'mr' ? 'mr' : 'en';
  }, [language]);

  const setLanguage = (lang) => {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      setLanguageState(lang);
    }
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    translations: translationMap[language] || translationMap[DEFAULT_LANGUAGE],
  }), [language]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
