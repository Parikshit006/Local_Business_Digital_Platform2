import { useContext, useCallback } from 'react';
import LanguageContext from './LanguageContext';

/**
 * useTranslation hook
 * 
 * Usage:
 *   const { t, language, setLanguage } = useTranslation();
 *   t("navbar.home")          → "Home" or "मुख्यपृष्ठ"
 *   t("hero.greeting", { name: "Arjun" }) → "Good morning, Arjun"
 * 
 * - Resolves dot-notation keys against current language translations
 * - Supports {{variable}} interpolation
 * - Returns the key itself if translation is missing (dev-friendly fallback)
 */
export default function useTranslation() {
  const { language, setLanguage, translations } = useContext(LanguageContext);

  const t = useCallback((key, params = {}) => {
    // Resolve dot-notation key: "navbar.home" → translations.navbar.home
    const keys = key.split('.');
    let value = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Key not found — return the key itself as fallback
        return key;
      }
    }

    // If the resolved value isn't a string, return the key
    if (typeof value !== 'string') {
      return key;
    }

    // Interpolate {{variable}} placeholders
    if (params && Object.keys(params).length > 0) {
      return value.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : `{{${paramKey}}}`;
      });
    }

    return value;
  }, [translations]);

  return { t, language, setLanguage };
}
