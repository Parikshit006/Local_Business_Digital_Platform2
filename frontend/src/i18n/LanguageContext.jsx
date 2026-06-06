import { createContext } from 'react';

/**
 * LanguageContext
 * Provides the current language and a setter function to all consuming components.
 * 
 * Shape:
 * {
 *   language: 'en' | 'mr',
 *   setLanguage: (lang: string) => void,
 *   translations: object
 * }
 */
const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  translations: {},
});

export default LanguageContext;
