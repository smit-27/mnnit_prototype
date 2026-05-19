import React, { useEffect, useRef } from 'react';
import { LockKeyhole, Copy } from 'lucide-react';

export default function MFASetupScreen({ onVerify, onSkip }) {
  const qrRef = useRef(null);
  const secret = 'JBSWY3DPEHPK3PXP';

  useEffect(() => {
    if (window.QRCode && qrRef.current && !qrRef.current.hasChildNodes()) {
      const totpUrl = `otpauth://totp/MultiShield:rahul.sharma@multishield?secret=${secret}&issuer=MultiShield&algorithm=SHA1&digits=6&period=30`;
      new window.QRCode(qrRef.current, {
        text: totpUrl,
        width: 180,
        height: 180,
        colorDark: '#0a0f1e',
        colorLight: '#ffffff',
        correctLevel: window.QRCode.CorrectLevel.M
      });
    }
  }, []);

  const copySecret = () => {
    navigator.clipboard.writeText(secret).catch(() => {});
  };

  return (
    <div id="screen-mfa-setup" className="screen active" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-card fade-in">
        <div className="modal-icon">
          <LockKeyhole size={28} />
        </div>
        <div className="modal-title">Set Up Two-Factor Authentication</div>
        <div className="modal-sub">Scan this QR code with Google Authenticator, Authy, or any TOTP app to enable MFA on your account.</div>

        <div id="qr-container">
          <div id="qrcode" ref={qrRef} style={{ display: 'inline-block' }}>
            {!window.QRCode && (
              <div style={{ padding: '20px', fontSize: '13px', color: '#666' }}>
                QR code generation requires QRCode.js<br/>
                <code>JBSWY3DPEHPK3PXP</code>
              </div>
            )}
          </div>
        </div>

        <div className="secret-hint">Or enter this key manually in your authenticator app</div>
        <div className="secret-box" id="secret-display" title="Click to copy" onClick={copySecret}>
          {secret}
        </div>
        <div className="secret-hint flex items-center justify-center gap-1" style={{ marginTop: '-14px' }}>
          <Copy size={12} /> Click to copy the key
        </div>

        <button className="btn-primary" onClick={onVerify}>
          I've scanned the QR code <span>→</span>
        </button>
        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <span style={{ fontSize: '13px', color: 'var(--muted)', cursor: 'pointer' }} onClick={onSkip}>
            Skip for now (demo)
          </span>
        </div>
      </div>
    </div>
  );
}
