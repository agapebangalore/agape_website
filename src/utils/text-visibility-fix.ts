// Text Visibility Protection Utility
// Prevents white text on white background issues

export function initializeTextVisibilityProtection() {
  // Add CSS loaded class when styles are fully loaded
  function markCSSAsLoaded() {
    document.body.classList.add('css-loaded');
  }

  // Check if all stylesheets are loaded
  function checkStylesheetsLoaded() {
    const stylesheets = Array.from(document.styleSheets);
    
    try {
      // Check if we can access CSS rules (indicates stylesheets are loaded)
      stylesheets.forEach(sheet => {
        if (sheet.cssRules || sheet.rules) {
          // Stylesheet is accessible
        }
      });
      markCSSAsLoaded();
    } catch (e) {
      // Stylesheets still loading, try again
      setTimeout(checkStylesheetsLoaded, 100);
    }
  }

  // Emergency text fix for elements that become invisible
  function emergencyTextFix() {
    const whiteTextElements = document.querySelectorAll('.text-white, [class*="text-white"]');
    
    whiteTextElements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      const backgroundColor = computedStyle.backgroundColor;
      const parentBackground = window.getComputedStyle(element.parentElement || element).backgroundColor;
      
      // Check if background is very light/white
      if (
        backgroundColor.includes('rgb(255, 255, 255)') || 
        backgroundColor.includes('rgba(255, 255, 255') ||
        backgroundColor === 'transparent' && parentBackground.includes('rgb(255, 255, 255)')
      ) {
        // Force dark text color
        (element as HTMLElement).style.color = '#1a1a1a';
        (element as HTMLElement).style.textShadow = 'none';
      }
    });
  }

  // Monitor for dynamic content changes
  function observeContentChanges() {
    const observer = new MutationObserver((mutations) => {
      let needsCheck = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          needsCheck = true;
        }
      });
      
      if (needsCheck) {
        // Debounce the check
        setTimeout(emergencyTextFix, 50);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
  }

  // Initialize protection
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      checkStylesheetsLoaded();
      observeContentChanges();
      emergencyTextFix();
    });
  } else {
    checkStylesheetsLoaded();
    observeContentChanges();
    emergencyTextFix();
  }

  // Additional safety check after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      markCSSAsLoaded();
      emergencyTextFix();
    }, 100);
  });
}

// Export for use in main app
export default initializeTextVisibilityProtection;