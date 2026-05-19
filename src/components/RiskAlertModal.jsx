import React from 'react';
import { AlertCircle, AlertTriangle, Bot } from 'lucide-react';

export default function RiskAlertModal({ visible, alertData, onDismiss, onProceed }) {
  if (!visible) return null;

  return (
    <div id="screen-risk-alert" className="screen active" style={{ position: 'fixed', inset: 0, background: 'rgba(10,15,30,0.5)', zIndex: 1000, alignItems: 'center', justifyContent: 'center' }}>
      <div className="alert-card fade-in">
        <div className="alert-icon-wrap" style={alertData?.isHighRisk ? { background: 'var(--red-soft)', color: 'var(--red)' } : {}}>
          {alertData?.isHighRisk ? <AlertCircle size={32} /> : <AlertTriangle size={32} />}
        </div>
        <div className="alert-title">
          {alertData?.title || 'Unusual Transaction Detected'}
        </div>
        <div className="alert-body">
          {alertData?.body || 'This transaction is outside your normal behavior pattern.'}
        </div>
        <div style={{ background: 'var(--amber-soft)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', textAlign: 'left' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#92400e', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Bot size={14} /> AI Risk Analysis
          </div>
          <div style={{ fontSize: '12px', color: '#78350f', lineHeight: 1.6 }}>
            • New beneficiary (first transaction)<br/>
            • Amount 12× your UPI average<br/>
            • Unusual time: 2:34 AM<br/>
            • Clipboard paste detected (phishing risk)
          </div>
        </div>
        <div className="alert-actions">
          <button className="btn-ghost" onClick={onDismiss}>Cancel</button>
          {!alertData?.isHighRisk && (
            <button className="btn-success" onClick={onProceed}>Verify & Proceed</button>
          )}
        </div>
      </div>
    </div>
  );
}
