import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function TOTPScreen({ onVerify, onBack }) {
  const [timer, setTimer] = useState(30);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          setOtp(['', '', '', '', '', '']);
          inputsRef.current[0]?.focus();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    } else if (newOtp.join('').length === 6) {
      setTimeout(() => {
        onVerify(newOtp.join(''));
      }, 400);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 6) return;
    onVerify(code);
  };

  const pct = (timer / 30) * 100;

  return (
    <div id="screen-totp" className="screen active" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-card fade-in">
        <div className="modal-icon" style={{ background: 'var(--green)' }}>
          <CheckCircle2 size={28} />
        </div>
        <div className="modal-title">Verify Your Identity</div>
        <div className="modal-sub">Enter the 6-digit code from your authenticator app to complete login.</div>

        <div className="totp-timer">
          <div className="timer-bar">
            <div 
              className="timer-fill" 
              style={{ width: `${pct}%`, background: timer > 10 ? 'var(--green)' : 'var(--red)' }}
            />
          </div>
          <span style={{ fontWeight: 600, color: 'var(--ink3)' }}>{timer}s</span> remaining
        </div>

        <div className="otp-inputs">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => inputsRef.current[i] = el}
              className={`otp-input ${digit ? 'filled' : ''}`}
              maxLength="1"
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              value={digit}
              onChange={e => handleChange(e, i)}
              onKeyDown={e => handleKeyDown(e, i)}
            />
          ))}
        </div>

        <div id="totp-hint" style={{ textAlign: 'center', fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>
          For demo: enter <strong>123456</strong> or any 6 digits
        </div>

        <button className="btn-primary" onClick={handleVerify}>
          Verify & Login <span>→</span>
        </button>
        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <span style={{ fontSize: '13px', color: 'var(--accent)', cursor: 'pointer' }}>Resend code</span>
          &nbsp;·&nbsp;
          <span style={{ fontSize: '13px', color: 'var(--muted)', cursor: 'pointer' }} onClick={onBack}>Back</span>
        </div>
      </div>
    </div>
  );
}
