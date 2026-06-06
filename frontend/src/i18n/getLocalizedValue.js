/**
 * getLocalizedValue
 * 
 * Helper for future backend content that stores translations as:
 * {
 *   title: { en: "Website Builder", mr: "वेबसाइट बिल्डर" }
 * }
 * 
 * Usage:
 *   getLocalizedValue(service.title, 'mr')  → "वेबसाइट बिल्डर"
 *   getLocalizedValue(service.title, 'mr')  → falls back to 'en' if 'mr' missing
 *   getLocalizedValue("plain string", 'mr') → "plain string" (pass-through)
 * 
 * @param {string|object} value - Either a plain string or { en: '...', mr: '...' }
 * @param {string} language - Current language code ('en' or 'mr')
 * @returns {string} The localized string
 */
export default function getLocalizedValue(value, language = 'en') {
  // If it's a plain string, return as-is
  if (typeof value === 'string') {
    return value;
  }

  // If it's null/undefined, return empty string
  if (!value) {
    return '';
  }

  // If it's an object with language keys, resolve
  if (typeof value === 'object') {
    // Try requested language first
    if (value[language]) {
      return value[language];
    }
    // Fall back to English
    if (value.en) {
      return value.en;
    }
    // Last resort: return first available value
    const firstKey = Object.keys(value)[0];
    return firstKey ? value[firstKey] : '';
  }

  return String(value);
}
