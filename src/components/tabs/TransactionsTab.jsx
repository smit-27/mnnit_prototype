import React from 'react';
import { Download, Filter, Banknote, ShoppingBag, Zap, Car, AlertTriangle } from 'lucide-react';

export default function TransactionsTab() {
  return (
    <div className="tab-panel active">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>Transaction History</div>
          <div style={{ fontSize: '13px', color: 'var(--muted)' }}>View all your past activities and risk scores</div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-ghost flex items-center gap-1.5" style={{ padding: '8px 16px', margin: 0, fontSize: '13px', background: 'white' }}>
            <Filter size={14} /> Filter
          </button>
          <button className="btn-ghost flex items-center gap-1.5" style={{ padding: '8px 16px', margin: 0, fontSize: '13px', background: 'white' }}>
            <Download size={14} /> Download
          </button>
        </div>
      </div>

      <div className="txn-list">
        <div className="txn-item">
          <div className="txn-icon" style={{ background: '#e8f5e9', color: 'var(--green)' }}><Banknote size={18} /></div>
          <div className="txn-info">
            <div className="txn-name">Salary Credit — Tech Corp</div>
            <div className="txn-meta">18 May 2026 · NEFT · Ref: TXN8821</div>
          </div>
          <div>
            <div className="txn-amount txn-credit">+₹1,85,000</div>
            <div className="txn-risk risk-low" style={{ textAlign: 'right' }}>Low risk</div>
          </div>
        </div>
        <div className="txn-item">
          <div className="txn-icon" style={{ background: '#fff3e0', color: '#f59e0b' }}><ShoppingBag size={18} /></div>
          <div className="txn-info">
            <div className="txn-name">Amazon Pay</div>
            <div className="txn-meta">17 May 2026 · UPI · amazon@icici</div>
          </div>
          <div>
            <div className="txn-amount txn-debit">−₹4,299</div>
            <div className="txn-risk risk-low" style={{ textAlign: 'right' }}>Low risk</div>
          </div>
        </div>
        <div className="txn-item">
          <div className="txn-icon" style={{ background: '#e3f2fd', color: 'var(--accent)' }}><Zap size={18} /></div>
          <div className="txn-info">
            <div className="txn-name">Electricity Bill — MSEDCL</div>
            <div className="txn-meta">16 May 2026 · UPI · msedcl@sbi</div>
          </div>
          <div>
            <div className="txn-amount txn-debit">−₹567</div>
            <div className="txn-risk risk-low" style={{ textAlign: 'right' }}>Low risk</div>
          </div>
        </div>
        <div className="txn-item">
          <div className="txn-icon" style={{ background: '#fff8e1', color: '#d97706' }}><Car size={18} /></div>
          <div className="txn-info">
            <div className="txn-name">Rapido Cab</div>
            <div className="txn-meta">16 May 2026 · UPI · rapido@yesbank</div>
          </div>
          <div>
            <div className="txn-amount txn-debit">−₹2,340</div>
            <div className="txn-risk risk-med" style={{ textAlign: 'right' }}>Med risk</div>
          </div>
        </div>
        <div className="txn-item">
          <div className="txn-icon" style={{ background: '#fce4ec', color: 'var(--red)' }}><AlertTriangle size={18} /></div>
          <div className="txn-info">
            <div className="txn-name">Unknown UPI — Blocked</div>
            <div className="txn-meta">15 May 2026 · UPI · amit.kumar@icici — AI blocked</div>
          </div>
          <div>
            <div className="txn-amount" style={{ color: 'var(--red)' }}>₹48,500</div>
            <div className="txn-risk risk-high" style={{ textAlign: 'right' }}>Blocked</div>
          </div>
        </div>
      </div>
    </div>
  );
}
