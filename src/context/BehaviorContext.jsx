import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const BehaviorContext = createContext(null);

export function BehaviorProvider({ children }) {
  const [trustScore, setTrustScore] = useState(95);
  const [riskScore, setRiskScore] = useState(5);
  const [riskEvents, setRiskEvents] = useState([]);
  const [trustHistory, setTrustHistory] = useState([
    { time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }), score: 95, event: 'Session Start' }
  ]);
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaType, setMfaType] = useState(null);
  const [sessionFrozen, setSessionFrozen] = useState(false);
  const [scamCoachingDetected, setScamCoachingDetected] = useState(false);
  const [behaviorFlags, setBehaviorFlags] = useState({
    clipboardUsed: false,
    rapidNavigation: false,
    focusSwitches: 0,
    hesitationDetected: false,
    directTransferNav: false,
    rapidTransferAttempt: false,
    newBeneficiaryRisk: false,
    socialEngineeringPattern: false,
  });

  const loginTimeRef = useRef(Date.now());
  const focusSwitchCountRef = useRef(0);
  const lastNavigationRef = useRef(Date.now());
  const pauseTimerRef = useRef(null);
  const longPauseCountRef = useRef(0);

  // Track focus switches
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        focusSwitchCountRef.current += 1;
        setBehaviorFlags(prev => ({ ...prev, focusSwitches: focusSwitchCountRef.current }));

        if (focusSwitchCountRef.current > 5) {
          addRiskEvent('Excessive Focus Switching', 25, 'focus');
        }

        // Track long pauses for social engineering
        pauseTimerRef.current = Date.now();
      } else {
        if (pauseTimerRef.current) {
          const pauseDuration = Date.now() - pauseTimerRef.current;
          if (pauseDuration > 10000) {
            longPauseCountRef.current += 1;
          }
          // Check for social engineering pattern
          if (focusSwitchCountRef.current > 3 && longPauseCountRef.current > 2) {
            setScamCoachingDetected(true);
            addRiskEvent('Social Engineering Pattern Detected', 35, 'social');
            setBehaviorFlags(prev => ({ ...prev, socialEngineeringPattern: true }));
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const addRiskEvent = useCallback((description, points, category) => {
    setRiskEvents(prev => {
      // Prevent duplicate events of same category
      if (prev.some(e => e.category === category)) return prev;
      const newEvents = [...prev, {
        id: `EVT-${Date.now()}`,
        description,
        points,
        category,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      }];
      return newEvents;
    });

    setRiskScore(prev => {
      const newRisk = Math.min(100, prev + points);
      const newTrust = Math.max(0, 100 - newRisk);
      setTrustScore(newTrust);

      // Add to trust history
      setTrustHistory(prev => [...prev, {
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        score: newTrust,
        event: description,
      }]);

      // Determine response based on risk level
      if (newRisk >= 86) {
        setSessionFrozen(true);
      } else if (newRisk >= 61) {
        setMfaRequired(true);
        setMfaType('adaptive');
      } else if (newRisk >= 31) {
        setMfaRequired(true);
        setMfaType('otp');
      }

      return newRisk;
    });
  }, []);

  const detectClipboardPaste = useCallback(() => {
    if (!behaviorFlags.clipboardUsed) {
      setBehaviorFlags(prev => ({ ...prev, clipboardUsed: true }));
      addRiskEvent('Clipboard Paste Detected', 15, 'clipboard');
    }
  }, [behaviorFlags.clipboardUsed, addRiskEvent]);

  const detectRapidNavigation = useCallback(() => {
    const now = Date.now();
    const timeSinceLastNav = now - lastNavigationRef.current;
    lastNavigationRef.current = now;

    if (timeSinceLastNav < 2000 && !behaviorFlags.rapidNavigation) {
      setBehaviorFlags(prev => ({ ...prev, rapidNavigation: true }));
      addRiskEvent('Rapid Navigation Detected', 20, 'velocity');
    }
  }, [behaviorFlags.rapidNavigation, addRiskEvent]);

  const detectRapidTransfer = useCallback(() => {
    const timeSinceLogin = Date.now() - loginTimeRef.current;
    if (timeSinceLogin < 15000 && !behaviorFlags.rapidTransferAttempt) {
      setBehaviorFlags(prev => ({ ...prev, rapidTransferAttempt: true }));
      addRiskEvent('Rapid Transfer After Login', 20, 'rapidTransfer');
    }
  }, [behaviorFlags.rapidTransferAttempt, addRiskEvent]);

  const detectDirectTransferNav = useCallback(() => {
    const timeSinceLogin = Date.now() - loginTimeRef.current;
    if (timeSinceLogin < 10000 && !behaviorFlags.directTransferNav) {
      setBehaviorFlags(prev => ({ ...prev, directTransferNav: true }));
      addRiskEvent('Direct Transfer Page Navigation', 20, 'navigation');
    }
  }, [behaviorFlags.directTransferNav, addRiskEvent]);

  const detectNewBeneficiaryRisk = useCallback((amount) => {
    if (amount > 50000 && !behaviorFlags.newBeneficiaryRisk) {
      setBehaviorFlags(prev => ({ ...prev, newBeneficiaryRisk: true }));
      addRiskEvent('High-Value New Beneficiary Transfer', 30, 'beneficiary');
    }
  }, [behaviorFlags.newBeneficiaryRisk, addRiskEvent]);

  const completeMFA = useCallback(() => {
    setMfaRequired(false);
    setMfaType(null);
    // Slightly recover trust after MFA
    setTrustScore(prev => Math.min(100, prev + 8));
    setRiskScore(prev => Math.max(0, prev - 8));
    setTrustHistory(prev => [...prev, {
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      score: Math.min(100, trustScore + 8),
      event: 'MFA Verified ✓',
    }]);
  }, [trustScore]);

  const resetSession = useCallback(() => {
    setTrustScore(95);
    setRiskScore(5);
    setRiskEvents([]);
    setTrustHistory([{
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      score: 95,
      event: 'Session Start',
    }]);
    setMfaRequired(false);
    setMfaType(null);
    setSessionFrozen(false);
    setScamCoachingDetected(false);
    setBehaviorFlags({
      clipboardUsed: false,
      rapidNavigation: false,
      focusSwitches: 0,
      hesitationDetected: false,
      directTransferNav: false,
      rapidTransferAttempt: false,
      newBeneficiaryRisk: false,
      socialEngineeringPattern: false,
    });
    loginTimeRef.current = Date.now();
    focusSwitchCountRef.current = 0;
    longPauseCountRef.current = 0;
  }, []);

  const getTrustLevel = useCallback(() => {
    if (trustScore >= 70) return { level: 'Trusted', color: 'trust-safe', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
    if (trustScore >= 50) return { level: 'Suspicious', color: 'trust-warning', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
    if (trustScore >= 30) return { level: 'High Risk', color: 'trust-danger', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' };
    return { level: 'Critical', color: 'trust-critical', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
  }, [trustScore]);

  return (
    <BehaviorContext.Provider value={{
      trustScore, riskScore, riskEvents, trustHistory,
      mfaRequired, mfaType, sessionFrozen, scamCoachingDetected,
      behaviorFlags, getTrustLevel,
      detectClipboardPaste, detectRapidNavigation, detectRapidTransfer,
      detectDirectTransferNav, detectNewBeneficiaryRisk,
      addRiskEvent, completeMFA, resetSession,
    }}>
      {children}
    </BehaviorContext.Provider>
  );
}

export function useBehavior() {
  const context = useContext(BehaviorContext);
  if (!context) throw new Error('useBehavior must be used within BehaviorProvider');
  return context;
}
