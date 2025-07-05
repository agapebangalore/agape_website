import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import PastorBiography from './PastorBiography.tsx'
import MinistryPage from './MinistryPage.tsx'
import SermonsPage from './SermonsPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sermons" element={<SermonsPage />} />
        <Route path="/pastor-biography" element={<PastorBiography />} />
        <Route path="/ministry" element={<MinistryPage />} />
      </Routes>
    </Router>
  </StrictMode>,
)
