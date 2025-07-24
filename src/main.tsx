import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import PastorBiography from './PastorBiography.tsx'
import MinistryPage from './MinistryPage.tsx'
import SermonsPage from './SermonsPage.tsx'
import PrayerPage from './PrayerPage.tsx'
import { RouteTransition } from './components/ui/page-transition'
import { initializeTheme, detectCSSLoading } from './utils/theme-init'
import { initializeTextVisibilityProtection } from './utils/text-visibility-fix'

// Initialize theme immediately to prevent text visibility issues
initializeTheme();
detectCSSLoading();

// Initialize text visibility protection
initializeTextVisibilityProtection();

// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      });
      
      console.log('Service Worker registered successfully:', registration);
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, prompt user to refresh
              if (confirm('New version available! Refresh to update?')) {
                window.location.reload();
              }
            }
          });
        }
      });
      
    } catch (error) {
      console.log('Service Worker registration failed:', error);
    }
  });
}

// Register for push notifications (if supported)
async function requestNotificationPermission() {
  if ('Notification' in window && 'serviceWorker' in navigator) {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted');
    }
  }
}

// Request notification permission after user interaction
document.addEventListener('click', requestNotificationPermission, { once: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <RouteTransition>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/sermons" element={<SermonsPage />} />
          <Route path="/pastor-biography" element={<PastorBiography />} />
          <Route path="/ministry" element={<MinistryPage />} />
          <Route path="/prayer" element={<PrayerPage />} />
        </Routes>
      </RouteTransition>
    </Router>
  </StrictMode>,
)
