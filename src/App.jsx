import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import PaymentForm from './components/PaymentForm';
import PhaseTransition from './components/PhaseTransition';
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/CancelPage';

function AppContent() {
  const [showTransition, setShowTransition] = useState(false);

  const handleCTAClick = () => {
    setShowTransition(true);
    // Ensure transition overlay fades out after navigation
    setTimeout(() => {
      setShowTransition(false);
    }, 1200);
  };

  const handleBackToLanding = () => {
    setShowTransition(true);
    setTimeout(() => {
      setShowTransition(false);
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-noel overflow-x-hidden">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage onCTAClick={handleCTAClick} />} />
          <Route
            path="/checkout"
            element={
              <PaymentForm
                onBackToLanding={handleBackToLanding}
              />
            }
          />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
        </Routes>
      </AnimatePresence>

      <PhaseTransition active={showTransition} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
