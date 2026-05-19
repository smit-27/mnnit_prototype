import React, { useState } from 'react';
import DashboardHomeTab from './tabs/DashboardHomeTab';
import UPITab from './tabs/UPITab';
import MobileBankingTab from './tabs/MobileBankingTab';
import BeneficiariesTab from './tabs/BeneficiariesTab';
import TransactionsTab from './tabs/TransactionsTab';
import SecurityCenterTab from './tabs/SecurityCenterTab';
import { Shield, LayoutDashboard, Zap, Smartphone, Users, Clock, Lock, LogOut, Bell } from 'lucide-react';

export default function DashboardScreen({ onLogout, trustScore, onInitiateUPI, onShowRiskDemo }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const roundedScore = Math.round(trustScore);

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'upi': return 'UPI Transfer';
      case 'mobile': return 'Mobile Banking';
      case 'beneficiaries': return 'Beneficiaries';
      case 'transactions': return 'Transactions';
      case 'security': return 'Security Center';
      default: return 'Dashboard';
    }
  };

  return (
    <div id="screen-dashboard" className="screen active" style={{ flexDirection: 'row' }}>
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <div className="sidebar-brand-name">MultiShield Bank</div>
            <div className="sidebar-brand-sub">Secure Banking</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">Main</div>
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <span className="nav-icon"><LayoutDashboard size={16} /></span> Dashboard
          </div>
          <div className={`nav-item ${activeTab === 'upi' ? 'active' : ''}`} onClick={() => setActiveTab('upi')}>
            <span className="nav-icon"><Zap size={16} /></span> UPI Transfer
          </div>
          <div className={`nav-item ${activeTab === 'mobile' ? 'active' : ''}`} onClick={() => setActiveTab('mobile')}>
            <span className="nav-icon"><Smartphone size={16} /></span> Mobile Banking
          </div>
          <div className={`nav-item ${activeTab === 'beneficiaries' ? 'active' : ''}`} onClick={() => setActiveTab('beneficiaries')}>
            <span className="nav-icon"><Users size={16} /></span> Beneficiaries
          </div>
          <div className={`nav-item ${activeTab === 'transactions' ? 'active' : ''}`} onClick={() => setActiveTab('transactions')}>
            <span className="nav-icon"><Clock size={16} /></span> Transactions
          </div>

          <div className="nav-section" style={{ marginTop: '12px' }}>Security</div>
          <div className={`nav-item ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
            <span className="nav-icon"><Lock size={16} /></span> Security Center
            <span className="nav-badge">1</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="trust-pill">
            <div className="trust-dot"></div>
            <div>
              <div className="trust-label">Behavioral Auth</div>
              <div className="trust-val">Trust: {roundedScore}</div>
            </div>
          </div>
          <div className="user-row">
            <div className="user-av">RS</div>
            <div>
              <div className="user-name">Rahul Sharma</div>
              <div className="user-acct">9876543210</div>
            </div>
            <div className="logout-btn" onClick={onLogout} title="Logout">
              <LogOut size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* TOPBAR */}
        <div className="topbar">
          <div className="topbar-title">{getTitle()}</div>
          <div className="topbar-score">
            <span className="text-green-500 mr-2">●</span> Trust Score: <strong>{roundedScore}</strong>
          </div>
          <div className="notif-btn" onClick={onShowRiskDemo}>
            <Bell size={18} />
            <div className="notif-dot"></div>
          </div>
        </div>

        {/* TABS */}
        <div style={{ padding: '28px 32px' }}>
          {activeTab === 'dashboard' && <DashboardHomeTab trustScore={trustScore} />}
          {activeTab === 'upi' && <UPITab onInitiateUPI={onInitiateUPI} />}
          {activeTab === 'mobile' && <MobileBankingTab />}
          {activeTab === 'beneficiaries' && <BeneficiariesTab />}
          {activeTab === 'transactions' && <TransactionsTab />}
          {activeTab === 'security' && <SecurityCenterTab />}
        </div>
      </div>
    </div>
  );
}
