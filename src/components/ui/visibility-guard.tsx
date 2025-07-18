import React, { useEffect } from 'react';

interface VisibilityGuardProps {
  children: React.ReactNode;
}

export const VisibilityGuard: React.FC<VisibilityGuardProps> = ({ children }) => {
  useEffect(() => {
    // Prevent dark mode from being accidentally activated
    const preventDarkMode = () => {
      const html = document.documentElement;
      const body = document.body;
      
      // Remove any dark mode classes that might be added
      html.classList.remove('dark');
      body.classList.remove('dark');
      
      // Force light mode
      html.classList.add('light');
      body.classList.add('light');
      
      // Set explicit styles to ensure visibility
      html.style.backgroundColor = 'white';
      body.style.backgroundColor = 'white';
      body.style.color = 'rgb(31, 41, 55)'; // text-gray-800 equivalent
    };

    // Fix white text on white backgrounds
    const fixWhiteTextIssues = () => {
      const whiteTextElements = document.querySelectorAll('.text-white');
      
      whiteTextElements.forEach((element) => {
        const parent = element.parentElement;
        if (parent) {
          const parentStyles = window.getComputedStyle(parent);
          const parentBg = parentStyles.backgroundColor;
          
          // Check if parent has light background
          if (parentBg === 'rgb(255, 255, 255)' || 
              parentBg === 'rgba(255, 255, 255, 1)' ||
              parentBg === 'transparent' ||
              parentBg === 'rgba(0, 0, 0, 0)') {
            
            // Only apply dark text if not on intentionally dark background
            const hasBlackBg = parent.classList.contains('bg-black') ||
                              parent.classList.contains('bg-gray-900') ||
                              parent.classList.contains('bg-primary');
            
            if (!hasBlackBg) {
              (element as HTMLElement).style.color = 'rgb(31, 41, 55)';
              element.classList.add('text-visibility-fixed');
            }
          }
        }
      });
    };

    // Monitor for dynamic changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
          preventDarkMode();
          setTimeout(fixWhiteTextIssues, 10);
        }
      });
    });

    // Initial fixes
    preventDarkMode();
    fixWhiteTextIssues();

    // Start observing
    observer.observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['class', 'style']
    });

    // Periodic check every 5 seconds
    const intervalId = setInterval(() => {
      preventDarkMode();
      fixWhiteTextIssues();
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, []);

  return <>{children}</>;
};

// Hook for components to ensure visibility
export const useVisibilityGuard = () => {
  useEffect(() => {
    const ensureVisibility = (element: HTMLElement) => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Check for white text on white/light backgrounds
      if (color === 'rgb(255, 255, 255)' && 
          (backgroundColor === 'rgb(255, 255, 255)' || 
           backgroundColor === 'rgba(255, 255, 255, 1)' ||
           backgroundColor === 'transparent')) {
        element.style.color = 'rgb(31, 41, 55)';
        element.classList.add('visibility-guard-applied');
      }
    };

    // Check all text elements
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, a, button');
    textElements.forEach((el) => ensureVisibility(el as HTMLElement));
  }, []);
};

export default VisibilityGuard; 