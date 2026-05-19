import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import MFASetupScreen from './components/MFASetupScreen';
import TOTPScreen from './components/TOTPScreen';
import DashboardScreen from './components/DashboardScreen';
import RiskAlertModal from './components/RiskAlertModal';
import Toast from './components/Toast';
import './index.css';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // login, mfa-setup, totp, dashboard
  const [toast, setToast] = useState({ message: '', visible: false });
  const [trustScore, setTrustScore] = useState(95);
  const [alertData, setAlertData] = useState(null);

  // Trust score simulation
  useEffect(() => {
    if (currentScreen === 'dashboard') {
      const interval = setInterval(() => {
        setTrustScore(prev => {
          const delta = (Math.random() - 0.48) * 1.5;
          return Math.max(72, Math.min(99, prev + delta));
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  const showToast = (message) => {
    setToast({ message, visible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  const handleLogin = (user, pass) => {
    if (!user || !pass) {
      showToast('Please fill in credentials');
      return;
    }
    setCurrentScreen('mfa-setup');
  };

  const handleDemoLogin = () => {
    setCurrentScreen('mfa-setup');
  };

  const handleMfaVerify = () => {
    setCurrentScreen('totp');
  };

  const handleMfaSkip = () => {
    setCurrentScreen('totp');
  };

  const handleTotpVerify = (code) => {
    setCurrentScreen('dashboard');
    showToast('Verified — Welcome, Rahul!');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
    showToast('Logged out securely');
  };

  const calculateRisk = (to, amount) => {
    let risk = 10;
    if (amount > 10000) risk += 25;
    if (amount > 50000) risk += 30;
    const knownRecipients = ['priya', 'amazon', 'swiggy', 'rapido', 'msedcl'];
    const isKnown = knownRecipients.some(k => to.toLowerCase().includes(k));
    if (!isKnown) risk += 20;
    if (to === 'amit.kumar@icici' || to.includes('urgent')) risk += 40;
    return Math.min(risk, 100);
  };

  const handleInitiateUPI = (to, amount, note) => {
    if (!to) { showToast('Enter recipient UPI ID'); return; }
    if (!amount || amount <= 0) { showToast('Enter a valid amount'); return; }

    const riskScore = calculateRisk(to, amount);

    if (riskScore >= 61) {
      setAlertData({
        isHighRisk: riskScore >= 86,
        title: riskScore >= 86 ? 'High Risk Transaction Blocked' : 'Unusual Transaction Detected',
        body: `Transaction of ₹${amount.toLocaleString('en-IN')} to ${to}. AI Risk Score: ${riskScore}/100. ${riskScore >= 86 ? 'Account will be temporarily frozen pending review.' : 'Behavioral anomaly detected — step-up verification required.'}`
      });
    } else if (riskScore >= 31) {
      showToast(`Monitoring active — Transaction proceeding with OTP limit`);
      setTimeout(() => showToast(`₹${amount.toLocaleString('en-IN')} sent to ${to}`), 1500);
    } else {
      showToast(`₹${amount.toLocaleString('en-IN')} sent to ${to} — Seamless access`);
    }
  };

  const handleDismissAlert = () => {
    setAlertData(null);
    showToast('Transaction cancelled — Smart decision!');
  };

  const handleProceedMfa = () => {
    setAlertData(null);
    setCurrentScreen('totp');
  };

  const handleShowRiskDemo = () => {
    setAlertData({
      isHighRisk: false,
      title: 'Behavioral Anomaly Detected',
      body: 'Your session behavior has deviated from your normal pattern. Risk Score: 74/100. Please verify your identity to continue.'
    });
  };

  return (
    <>
      {currentScreen === 'login' && (
        <LoginScreen onLogin={handleLogin} onDemoLogin={handleDemoLogin} />
      )}
      {currentScreen === 'mfa-setup' && (
        <MFASetupScreen onVerify={handleMfaVerify} onSkip={handleMfaSkip} />
      )}
      {currentScreen === 'totp' && (
        <TOTPScreen onVerify={handleTotpVerify} onBack={() => setCurrentScreen('mfa-setup')} />
      )}
      {currentScreen === 'dashboard' && (
        <DashboardScreen 
          trustScore={trustScore} 
          onLogout={handleLogout} 
          onInitiateUPI={handleInitiateUPI}
          onShowRiskDemo={handleShowRiskDemo}
        />
      )}

      <RiskAlertModal 
        visible={!!alertData} 
        alertData={alertData}
        onDismiss={handleDismissAlert}
        onProceed={handleProceedMfa}
      />
      <Toast 
        message={toast.message} 
        visible={toast.visible} 
        onHide={hideToast} 
      />
    </>
  );
}
