import React, { useEffect } from 'react';

interface VisibilityGuardProps {
  children: React.ReactNode;
}

export const VisibilityGuard: React.FC<VisibilityGuardProps> = ({ children }) => {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    // Simple visibility protection without complex DOM manipulation
    const ensureVisibility = () => {
      try {
        // Prevent dark mode from being accidentally activated
        const html = document.documentElement;
        const body = document.body;
        
        // Remove dark mode classes if they exist
        if (html.classList.contains('dark')) {
          html.classList.remove('dark');
        }
        if (body.classList.contains('dark')) {
          body.classList.remove('dark');
        }
        
        // Ensure light mode
        html.classList.add('light');
        
        // Set basic visibility styles
        body.style.backgroundColor = 'white';
        body.style.color = 'rgb(31, 41, 55)';
        
        // Fix any white text on white backgrounds (simple approach)
        const whiteTextElements = document.querySelectorAll('.text-white');
        whiteTextElements.forEach((element) => {
          const parent = element.parentElement;
          if (parent) {
            const hasBlackBg = parent.classList.contains('bg-black') ||
                              parent.classList.contains('bg-gray-900') ||
                              parent.classList.contains('bg-primary');
            
            if (!hasBlackBg) {
              (element as HTMLElement).style.color = 'rgb(31, 41, 55)';
            }
          }
        });
      } catch (error) {
        // Silently handle any errors to prevent breaking the app
        console.warn('VisibilityGuard error:', error);
      }
    };

    // Run once on mount
    ensureVisibility();
    
    // Run periodically but less frequently
    const intervalId = setInterval(ensureVisibility, 10000); // Every 10 seconds
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <>{children}</>;
};

// Simplified hook for components
export const useVisibilityGuard = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      // Simple visibility check
      const body = document.body;
      if (body.style.backgroundColor !== 'white') {
        body.style.backgroundColor = 'white';
        body.style.color = 'rgb(31, 41, 55)';
      }
    } catch (error) {
      // Silently handle errors
      console.warn('useVisibilityGuard error:', error);
    }
  }, []);
};

export default VisibilityGuard; 