import React, { useState } from 'react';
import { Shield, User, Lock, Bot, ShieldCheck, HelpCircle, PhoneCall, Globe, CheckCircle } from 'lucide-react';
import secureIllustration from '../assets/secure_banking_illustration.png';

export default function LoginScreen({ onLogin, onDemoLogin }) {
  const [userId, setUserId] = useState('rahul.sharma');
  const [password, setPassword] = useState('demo1234');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    onLogin(userId, password);
  };

  return (
    <div id="screen-login" className="screen active">
      {/* PROFESSIONAL PORTAL TOP HEADER (Like SBI/Kotak) */}
      <header className="portal-header">
        <div className="portal-header-top">
          <div className="header-links-left">
            <span className="active">Personal</span>
            <span>Business</span>
            <span>Corporate</span>
            <span>NRI</span>
            <span>Private Banking</span>
          </div>
          <div className="header-links-right">
            <span>Careers</span>
            <span>Locate Us</span>
            <span className="flex items-center gap-1"><PhoneCall size={12} /> Helpline: <strong className="hotline">1800 266 2666</strong></span>
          </div>
        </div>
        <div className="portal-header-main">
          <div className="brand-logo" style={{ marginBottom: 0 }}>
            <div className="brand-icon">
              <Shield className="text-white" size={22} />
            </div>
            <div>
              <div className="brand-name" style={{ color: 'var(--navy)' }}>MultiShield Bank</div>
              <div className="brand-sub">Secure Digital Portal</div>
            </div>
          </div>
          <div className="portal-nav-items">
            <span className="portal-nav-item active">NetBanking</span>
            <span className="portal-nav-item">Products</span>
            <span className="portal-nav-item">Support</span>
            <span className="portal-nav-item">Security Center</span>
          </div>
        </div>
      </header>

      {/* PORTAL LOGIN CONTAINER */}
      <div className="portal-container">
        {/* Left Side: Modern Login Form */}
        <div className="login-left">
          <div className="login-title">Secure NetBanking Login</div>
          <div className="login-sub">Enter your credentials to access your secure accounts.</div>

          <div className="field-group">
            <label className="field-label">User ID / Customer ID</label>
            <div className="field-row">
              <span className="field-icon"><User size={16} /></span>
              <input 
                type="text" 
                placeholder="e.g. 98765432" 
                value={userId}
                onChange={e => setUserId(e.target.value)}
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label" style={{display: 'flex', justifyContent: 'space-between'}}>
              <span>Password / PIN</span>
              <span style={{color: 'var(--accent)', fontWeight: 600, cursor: 'pointer', fontSize: '11px'}}>Forgot Password?</span>
            </label>
            <div className="field-row">
              <span className="field-icon"><Lock size={16} /></span>
              <input 
                type={showPass ? 'text' : 'password'} 
                placeholder="Enter password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <span className="field-action" onClick={() => setShowPass(!showPass)}>
                {showPass ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>

          <button className="btn-primary" onClick={handleLogin}>
            Login Securely <span>→</span>
          </button>

          <div className="divider">Demo Portal Access</div>

          <button className="demo-btn" onClick={onDemoLogin}>
            <div className="demo-avatar">RS</div>
            Sign in as Rahul Sharma (Simulated Account)
          </button>
        </div>

        {/* Right Side: Professional Banking Banner with 3D Illustration */}
        <div className="login-right">
          <div>
            <div className="right-badge">
              <span></span> Zero-Trust Behavioral Protection
            </div>
            <h2 className="right-title" style={{ marginTop: '16px' }}>Your safety is our gold standard.</h2>
            <p className="right-desc" style={{ marginTop: '10px' }}>
              MultiShield AI constantly learns your unique interaction signatures—protecting you from phishing, call-based coercion, and device hijacking invisibly.
            </p>
          </div>

          {/* 3D Security Shield Illustration */}
          <img 
            className="login-banner-img" 
            src={secureIllustration} 
            alt="MultiShield Security illustration" 
          />

          {/* Institutional Compliance Footer */}
          <div className="login-footer-badges">
            <div className="badge-item">
              <CheckCircle size={14} /> RBI Regulated
            </div>
            <div className="badge-item">
              <ShieldCheck size={14} /> PCI-DSS Compliant
            </div>
            <div className="badge-item">
              <Globe size={14} /> 256-bit SSL Secure
            </div>
          </div>
        </div>
      </div>

      {/* PORTAL BOTTOM FOOTER */}
      <footer className="portal-footer">
        <p>© 2026 MultiShield Bank Ltd. All rights reserved. Regulated by Reserve Bank of India.</p>
        <p style={{ marginTop: '4px', fontSize: '10px', opacity: 0.7 }}>
          Security notice: MultiShield Bank will never ask for your card CVV, OTP, or NetBanking password over phone, SMS, or email. Do not share credentials.
        </p>
      </footer>
    </div>
  );
}
