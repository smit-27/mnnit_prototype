import React, { useState } from 'react';
import { Zap, CircleCheck, Smartphone, Landmark, CheckCircle2, ShieldCheck, Bot } from 'lucide-react';

export default function UPITab({ onInitiateUPI }) {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSend = () => {
    onInitiateUPI(to, parseFloat(amount), note);
  };

  return (
    <div className="tab-panel active">
      <div className="grid2">
        <div className="upi-card">
          <div className="upi-title-row">
            <div className="upi-badge">UPI</div>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>Send Money</div>
          </div>

          <div className="upi-id-row">
            <div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '2px' }}>Your UPI ID</div>
              <div className="upi-id">rahul.sharma@multishield</div>
            </div>
            <div className="upi-copy" onClick={() => navigator.clipboard.writeText('rahul.sharma@multishield')}>Copy</div>
          </div>

          <div className="send-form">
            <div className="field-group">
              <label className="field-label">Recipient UPI ID / Number</label>
              <input 
                type="text" 
                placeholder="phone@upi or 9876XXXXXX" 
                value={to}
                onChange={e => setTo(e.target.value)}
              />
            </div>
            <div className="field-group">
              <div className="amount-currency">₹</div>
              <input 
                className="amount-big" 
                type="number" 
                placeholder="0"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>
            <div className="field-group">
              <label className="field-label">Remark (optional)</label>
              <input 
                type="text" 
                placeholder="e.g. Rent, Food, Gift" 
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </div>
            <button className="btn-primary" onClick={handleSend} style={{ marginTop: '8px' }}>
              <Zap size={16} /> Send via UPI
            </button>
          </div>
        </div>

        <div>
          {/* UPI Apps */}
          <div className="upi-card" style={{ marginBottom: '16px' }}>
            <div className="section-title">Linked UPI Apps</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--surface)', borderRadius: '10px' }}>
                <CheckCircle2 size={24} className="text-green-500" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>PhonePe</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Default · rahul@ybl</div>
                </div>
                <div style={{ fontSize: '11px', background: 'var(--green-soft)', color: 'var(--green)', padding: '3px 9px', borderRadius: '8px', fontWeight: 600 }}>Active</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--surface)', borderRadius: '10px' }}>
                <Smartphone size={24} className="text-blue-500" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>Google Pay</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>rahul.sharma@oksbi</div>
                </div>
                <div style={{ fontSize: '11px', background: 'var(--accent-soft)', color: 'var(--accent)', padding: '3px 9px', borderRadius: '8px', fontWeight: 600 }}>Linked</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--surface)', borderRadius: '10px' }}>
                <Landmark size={24} className="text-blue-400" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>Paytm</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)' }}>9876543210@paytm</div>
                </div>
                <div style={{ fontSize: '11px', background: 'var(--accent-soft)', color: 'var(--accent)', padding: '3px 9px', borderRadius: '8px', fontWeight: 600 }}>Linked</div>
              </div>
            </div>
          </div>

          {/* UPI behavior note */}
          <div style={{ background: 'linear-gradient(135deg,#f0f4ff,#e8f0fe)', border: '1px solid #c7d7fb', borderRadius: '12px', padding: '16px 18px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Bot size={16} /> UPI Rhythm Profiling Active
            </div>
            <div style={{ fontSize: '12px', color: 'var(--slate)', lineHeight: 1.7 }}>
              AI monitors your UPI patterns — usual recipients, amounts, timing, and tap speed. Deviations trigger adaptive MFA before funds leave.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
