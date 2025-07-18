/**
 * Critical theme initialization to prevent white text on white background bugs
 * This ensures text visibility is maintained during CSS loading and theme transitions
 */

export const initializeTheme = () => {
  // Immediately set safe fallback colors before CSS loads
  document.documentElement.style.setProperty('--background', '0 0% 100%'); // White
  document.documentElement.style.setProperty('--foreground', '222.2 84% 4.9%'); // Dark navy
  document.documentElement.style.setProperty('--primary', '221.2 83.2% 53.3%'); // Navy blue
  document.documentElement.style.setProperty('--primary-foreground', '0 0% 98%'); // White
  
  // Set data attribute to indicate theme is initialized
  document.documentElement.setAttribute('data-theme', 'initialized');
  
  // Apply emergency styles to prevent invisible text
  const emergencyStyles = document.createElement('style');
  emergencyStyles.id = 'emergency-visibility-styles';
  emergencyStyles.textContent = `
    /* Emergency text visibility protection */
    body:not([data-css-loaded]) {
      background: white !important;
      color: #1a1a1a !important;
    }
    
    /* Ensure all text is visible during loading */
    *:not([data-css-loaded]) {
      color: #1a1a1a !important;
    }
    
    /* Critical button visibility */
    button:not([data-css-loaded]) {
      background: #4f46e5 !important;
      color: white !important;
      border: 1px solid #4f46e5 !important;
    }
  `;
  
  document.head.insertBefore(emergencyStyles, document.head.firstChild);
};

export const markCSSLoaded = () => {
  // Remove emergency styles once CSS is fully loaded
  document.body.setAttribute('data-css-loaded', 'true');
  const emergencyStyles = document.getElementById('emergency-visibility-styles');
  if (emergencyStyles) {
    // Delay removal to ensure CSS transitions are smooth
    setTimeout(() => {
      emergencyStyles.remove();
    }, 100);
  }
};

// CSS loading detection
export const detectCSSLoading = () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Give CSS a moment to load
      setTimeout(markCSSLoaded, 50);
    });
  } else {
    // DOM already loaded
    setTimeout(markCSSLoaded, 50);
  }
};