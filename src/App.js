import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelfConfidenceTest from './SelfConfidenceTest';
import LeadershipQualityTest from './LeadershipQualityTest';
import EmotionalIntelligenceTest from './EmotionalIntelligenceTest';
import Results from './1Results';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import HamburgerMenu from './components/HamburgerMenu';
import ScrollToTop from "./ScrollToTop";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  const styles = {
    menuContainer: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
    }
  };

  return (
    <Router>
      <div style={styles.menuContainer}>
        <HamburgerMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
      <ScrollToTop />
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<SelfConfidenceTest />} />
            <Route path="/leadership-test" element={<LeadershipQualityTest />} />
            <Route path="/emotional-intelligence-test" element={<EmotionalIntelligenceTest />} />
            <Route path="/results" element={<Results />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </>
        ) : (
          <Route path="/" element={<AdminPanel />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;