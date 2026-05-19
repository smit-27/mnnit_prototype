import React from 'react';
import { Landmark, Smartphone, Zap, Globe, Plus } from 'lucide-react';

export default function MobileBankingTab() {
  return (
    <div className="tab-panel active">
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>Connected Banking Channels</div>
        <div style={{ fontSize: '13px', color: 'var(--muted)' }}>All channels protected by behavioral authentication and ZTA</div>
      </div>

      <div className="mobile-channels">
        <div className="channel-card">
          <div className="channel-status status-active">● Active</div>
          <div className="channel-head">
            <div className="channel-icon"><Landmark size={24} className="text-blue-600" /></div>
            <div>
              <div className="channel-name">SBI Internet Banking</div>
              <div className="channel-provider">State Bank of India</div>
            </div>
          </div>
          <div className="channel-balance">₹1,85,342</div>
          <div className="channel-acct">XXXX XXXX 4321 · Savings</div>
        </div>

        <div className="channel-card">
          <div className="channel-status status-active">● Active</div>
          <div className="channel-head">
            <div className="channel-icon"><Smartphone size={24} className="text-purple-600" /></div>
            <div>
              <div className="channel-name">HDFC MobileBanking</div>
              <div className="channel-provider">HDFC Bank</div>
            </div>
          </div>
          <div className="channel-balance">₹32,100</div>
          <div className="channel-acct">XXXX XXXX 7892 · Current</div>
        </div>

        <div className="channel-card">
          <div className="channel-status status-linked">Linked</div>
          <div className="channel-head">
            <div className="channel-icon"><Zap size={24} className="text-green-500" /></div>
            <div>
              <div className="channel-name">PhonePe</div>
              <div className="channel-provider">UPI Platform</div>
            </div>
          </div>
          <div className="channel-balance">₹5,000</div>
          <div className="channel-acct">Wallet · rahul@ybl</div>
        </div>

        <div className="channel-card">
          <div className="channel-status status-linked">Linked</div>
          <div className="channel-head">
            <div className="channel-icon"><Landmark size={24} className="text-blue-400" /></div>
            <div>
              <div className="channel-name">Paytm Payments Bank</div>
              <div className="channel-provider">Paytm</div>
            </div>
          </div>
          <div className="channel-balance">₹2,340</div>
          <div className="channel-acct">Wallet · 9876543210@paytm</div>
        </div>

        <div className="channel-card">
          <div className="channel-status status-linked">Linked</div>
          <div className="channel-head">
            <div className="channel-icon"><Globe size={24} className="text-orange-500" /></div>
            <div>
              <div className="channel-name">BHIM UPI</div>
              <div className="channel-provider">NPCI</div>
            </div>
          </div>
          <div className="channel-balance" style={{ fontSize: '16px' }}>Government App</div>
          <div className="channel-acct">Direct bank link · rahul@sbi</div>
        </div>

        <div className="channel-card" style={{ borderStyle: 'dashed', cursor: 'pointer' }} onClick={() => alert('Channel linking coming soon!')}>
          <div className="channel-head" style={{ justifyContent: 'center', padding: '20px 0' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="flex justify-center mb-2"><Plus size={32} className="text-slate-400" /></div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent)' }}>Add Banking Channel</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Connect another bank or wallet</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: 'white', border: '1px solid #eaecf4', borderRadius: 'var(--radius)', padding: '20px' }}>
        <div className="section-title">Cross-Channel Behavioral Profile</div>
        <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>Your unified behavioral identity across all channels. ZTA enforces per-channel trust gates.</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
          <div style={{ textAlign: 'center', padding: '16px', background: 'var(--surface)', borderRadius: '10px' }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--accent)' }}>5</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Channels linked</div>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', background: 'var(--surface)', borderRadius: '10px' }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--green)' }}>98.2%</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Behavior consistency</div>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', background: 'var(--surface)', borderRadius: '10px' }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--ink)' }}>0</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Anomalies (7 days)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
