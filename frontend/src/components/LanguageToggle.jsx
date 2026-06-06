import React from 'react';
import useTranslation from '../i18n/useTranslation';

/**
 * LanguageToggle
 * A compact, pill-shaped toggle for switching between EN and मराठी.
 * Uses smooth CSS transitions and matches the existing design system.
 */
export default function LanguageToggle({ className = '' }) {
  const { language, setLanguage } = useTranslation();

  return (
    <div
      className={`inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-0.5 border border-white/10 ${className}`}
      role="radiogroup"
      aria-label="Language selection"
    >
      <button
        role="radio"
        aria-checked={language === 'en'}
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
          language === 'en'
            ? 'bg-[#1DB887] text-white shadow-lg shadow-[#1DB887]/25'
            : 'text-current opacity-60 hover:opacity-100'
        }`}
      >
        EN
      </button>
      <button
        role="radio"
        aria-checked={language === 'mr'}
        onClick={() => setLanguage('mr')}
        className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
          language === 'mr'
            ? 'bg-[#1DB887] text-white shadow-lg shadow-[#1DB887]/25'
            : 'text-current opacity-60 hover:opacity-100'
        }`}
      >
        मराठी
      </button>
    </div>
  );
}
