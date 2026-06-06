/**
 * Formats a price value to a standard currency string using the native Intl API.
 * 
 * @param {number} value - The numerical price to format
 * @param {string} currencyCode - ISO 4217 Currency Code (e.g. 'USD', 'INR', 'EUR')
 * @returns {string} Formatted currency string
 */
export default function formatCurrency(value, currencyCode = 'INR') {
  if (value === undefined || value === null) return '';

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  } catch (error) {
    // Fallback if the currency code is somehow invalid
    console.warn(`Invalid currency code: ${currencyCode}`, error);
    return `${currencyCode} ${value}`;
  }
}
