import React from 'react';
import { Bot, Zap, Download, FileText, CreditCard, Landmark, Lock, Banknote, ShoppingBag, Car, AlertCircle, AlertTriangle } from 'lucide-react';

export default function DashboardHomeTab({ trustScore }) {
  const roundedScore = Math.round(trustScore);
  const offset = 283 - (283 * roundedScore / 100);
  const circleColor = roundedScore > 70 ? 'var(--green)' : roundedScore > 50 ? 'var(--amber)' : 'var(--red)';

  return (
    <div className="tab-panel active">
      <div className="grid2">
        {/* Account card */}
        <div className="account-card">
          <div>
            <div className="card-label">Savings Account</div>
            <div className="card-balance">₹1,85,342.50</div>
            <div className="card-balance-sub">Available Balance</div>
          </div>
          <div className="card-footer">
            <div className="card-acct">•••• •••• 4321</div>
            <div className="card-type">ACTIVE</div>
          </div>
        </div>

        {/* Trust score */}
        <div className="trust-card">
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink3)', marginBottom: '12px', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--red)', fontSize: '10px' }}>●</span> LIVE &nbsp; Session Trust Score
          </div>
          <div className="trust-ring-wrap">
            <svg className="trust-ring" width="110" height="110" viewBox="0 0 110 110">
              <circle className="trust-circle-bg" cx="55" cy="55" r="45"/>
              <circle 
                className="trust-circle-fg" 
                cx="55" cy="55" r="45" 
                style={{ strokeDashoffset: offset, stroke: circleColor }}
              />
            </svg>
            <div className="trust-center">
              <div className="trust-num">{roundedScore}</div>
              <div className="trust-status">{roundedScore > 70 ? 'Trusted' : roundedScore > 50 ? 'Warning' : 'Danger'}</div>
            </div>
          </div>
          <div className="trust-sub">Score updates dynamically<br/>based on your interaction behavior.</div>
          <div className="ai-risk-panel">
            <div className="ai-risk-title flex items-center gap-1.5"><Bot size={14} /> AI Risk Analysis — Explainable</div>
            <div className="ai-risk-status flex items-center gap-1.5">✓ No Risk Factors Detected — Session normal</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid4">
        <div className="stat-card">
          <div className="stat-label">This Month Spend</div>
          <div className="stat-val">₹12,450</div>
          <div className="stat-change stat-down">↑ 8% vs last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">UPI Transactions</div>
          <div className="stat-val">34</div>
          <div className="stat-change stat-up">↑ 5 this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Blocked Attempts</div>
          <div className="stat-val">2</div>
          <div className="stat-change" style={{ color: 'var(--amber)' }}>⚠ This month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Auth Method</div>
          <div className="stat-val" style={{ fontSize: '18px' }}>TOTP + AI</div>
          <div className="stat-change stat-up">✓ MFA Active</div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="quick-actions">
        <div className="section-title">Quick Actions</div>
        <div className="action-grid">
          <div className="action-btn">
            <div className="action-icon"><Zap size={22} className="text-blue-600" /></div>
            <div className="action-label">Send UPI</div>
          </div>
          <div className="action-btn">
            <div className="action-icon"><Download size={22} className="text-blue-600" /></div>
            <div className="action-label">Request</div>
          </div>
          <div className="action-btn">
            <div className="action-icon"><FileText size={22} className="text-blue-600" /></div>
            <div className="action-label">Statement</div>
          </div>
          <div className="action-btn">
            <div className="action-icon"><CreditCard size={22} className="text-blue-600" /></div>
            <div className="action-label">Cards</div>
          </div>
          <div className="action-btn">
            <div className="action-icon"><Landmark size={22} className="text-blue-600" /></div>
            <div className="action-label">NEFT/RTGS</div>
          </div>
          <div className="action-btn">
            <div className="action-icon"><Lock size={22} className="text-blue-600" /></div>
            <div className="action-label">Security</div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="txn-list">
        <div className="txn-header">
          <div className="section-title" style={{ margin: 0 }}>Recent Transactions</div>
          <div style={{ marginLeft: 'auto', fontSize: '13px', color: 'var(--accent)', cursor: 'pointer' }}>View All →</div>
        </div>
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
