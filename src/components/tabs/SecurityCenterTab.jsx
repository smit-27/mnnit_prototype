import React from 'react';
import { ShieldCheck, Fingerprint, RefreshCw, Key, ShieldAlert } from 'lucide-react';

export default function SecurityCenterTab() {
  return (
    <div className="tab-panel active">
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '20px', fontWeight: 600, fontFamily: "'DM Serif Display', serif", marginBottom: '6px' }}>Behavioral Profile & ZTA</div>
        <div style={{ fontSize: '13px', color: 'var(--muted)' }}>Real-time transparency into what our AI knows about your interaction habits.</div>
      </div>

      <div className="security-grid">
        <div className="sec-card">
          <div className="sec-card-title text-accent">
            <Fingerprint size={18} /> Keystroke Dynamics
          </div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Your unique typing rhythm acts as a continuous password.</div>
          <div className="behavior-signals">
            <div className="signal-row">
              <div className="signal-name">Flight time (key-to-key)</div>
              <div className="signal-bar-wrap"><div className="signal-bar" style={{ width: '85%' }}></div></div>
              <div className="signal-val">85%</div>
            </div>
            <div className="signal-row">
              <div className="signal-name">Dwell time (key hold)</div>
              <div className="signal-bar-wrap"><div className="signal-bar" style={{ width: '92%' }}></div></div>
              <div className="signal-val">92%</div>
            </div>
            <div className="signal-row">
              <div className="signal-name">Typing speed (WPM)</div>
              <div className="signal-bar-wrap"><div className="signal-bar" style={{ width: '78%' }}></div></div>
              <div className="signal-val">78%</div>
            </div>
            <div className="signal-row">
              <div className="signal-name">Error rate pattern</div>
              <div className="signal-bar-wrap"><div className="signal-bar" style={{ width: '96%' }}></div></div>
              <div className="signal-val">96%</div>
            </div>
          </div>
          <div style={{ background: 'var(--surface)', padding: '10px 12px', borderRadius: '8px', marginTop: '16px', fontSize: '11px', color: 'var(--slate)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={12} className="text-accent" /> Profile updated continuously during session
          </div>
        </div>

        <div className="sec-card">
          <div className="sec-card-title text-accent">
            <ShieldCheck size={18} /> Zero Trust Assessment
          </div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Current context evaluation before granting transaction access.</div>
          <div className="zta-checks">
            <div className="zta-row">
              <ShieldCheck size={16} className="text-green-500" />
              <div className="zta-label">Device Authenticity</div>
              <div className="zta-score" style={{ background: 'var(--green-soft)', color: 'var(--green)' }}>Verified</div>
            </div>
            <div className="zta-row">
              <ShieldCheck size={16} className="text-green-500" />
              <div className="zta-label">Network Location (IP)</div>
              <div className="zta-score" style={{ background: 'var(--green-soft)', color: 'var(--green)' }}>Verified</div>
            </div>
            <div className="zta-row">
              <ShieldAlert size={16} className="text-amber-500" />
              <div className="zta-label">Time of Access</div>
              <div className="zta-score" style={{ background: 'var(--amber-soft)', color: 'var(--amber)' }}>Anomaly</div>
            </div>
            <div className="zta-row">
              <ShieldCheck size={16} className="text-green-500" />
              <div className="zta-label">Behavioral Biometrics</div>
              <div className="zta-score" style={{ background: 'var(--green-soft)', color: 'var(--green)' }}>Verified</div>
            </div>
          </div>
          <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--muted)' }}>
            <strong>Policy:</strong> If anomalies &gt; 1, trigger step-up MFA challenge.
          </div>
        </div>

        <div className="sec-card" style={{ gridColumn: '1 / -1' }}>
          <div className="sec-card-title text-accent">
            <Key size={18} /> Authentication Methods
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ border: '1px solid #eaecf4', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>Password</div>
                <div style={{ fontSize: '11px', background: 'var(--green-soft)', color: 'var(--green)', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>Active</div>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Last changed 45 days ago</div>
              <button className="btn-ghost" style={{ width: '100%', marginTop: '12px', padding: '8px', fontSize: '12px' }}>Update Password</button>
            </div>
            <div style={{ border: '1px solid #eaecf4', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>TOTP Authenticator</div>
                <div style={{ fontSize: '11px', background: 'var(--green-soft)', color: 'var(--green)', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>Active</div>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Primary MFA method for high-risk actions</div>
              <button className="btn-ghost" style={{ width: '100%', marginTop: '12px', padding: '8px', fontSize: '12px' }}>Manage Device</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
