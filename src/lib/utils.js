/**
 * Format a date string to a human-readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
 export function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  }
  
  /**
   * Generate a slug from a string
   * @param {string} str - String to slugify
   * @returns {string} Slugified string
   */
  export function slugify(str) {
    return str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
  
  /**
   * Truncate a string to a specified length
   * @param {string} str - String to truncate
   * @param {number} length - Maximum length
   * @returns {string} Truncated string
   */
  export function truncate(str, length = 100) {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
  }
  
  /**
   * Check if should reduce motion based on user preference
   * @returns {boolean} True if motion should be reduced
   */
  export function shouldReduceMotion() {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  
  /**
   * Format a number with commas
   * @param {number} num - Number to format
   * @returns {string} Formatted number
   */
  export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  /**
   * Calculate color shade based on value for choropleth map
   * @param {number} value - Value to calculate shade for
   * @param {number} min - Minimum value in dataset
   * @param {number} max - Maximum value in dataset
   * @returns {string} Hex color code
   */
  export function calculateColorShade(value, min, max) {
    // Normalize value between 0 and 1
    const normalized = (value - min) / (max - min);
    
    // Base color is sky-cyan: #00B6F1
    // We'll darken it based on the normalized value
    // Convert to RGB
    const r = 0;
    const g = 182;
    const b = 241;
    
    // Calculate new RGB values (darker for higher values)
    const newR = Math.round(r * (1 - normalized * 0.7));
    const newG = Math.round(g * (1 - normalized * 0.5));
    const newB = Math.round(b * (1 - normalized * 0.3));
    
    // Convert back to hex
    return `rgb(${newR}, ${newG}, ${newB})`;
  }