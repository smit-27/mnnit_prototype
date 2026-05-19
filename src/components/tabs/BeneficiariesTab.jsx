import React from 'react';
import { User, ShieldCheck, Search, Plus, Trash2 } from 'lucide-react';

export default function BeneficiariesTab() {
  return (
    <div className="tab-panel active">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>Saved Beneficiaries</div>
          <div style={{ fontSize: '13px', color: 'var(--muted)' }}>Manage accounts you frequently send money to</div>
        </div>
        <button className="btn-primary" style={{ padding: '8px 16px', margin: 0 }}>
          <Plus size={16} /> Add New
        </button>
      </div>

      <div style={{ background: 'white', border: '1px solid #eaecf4', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #eaecf4', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Search by name or account..." style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
        </div>

        <div className="txn-item">
          <div className="txn-icon" style={{ background: 'var(--accent)', color: 'white' }}><User size={18} /></div>
          <div className="txn-info">
            <div className="txn-name">Priya Sharma</div>
            <div className="txn-meta">HDFC Bank · XXXX 8901</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div className="txn-risk risk-low flex items-center gap-1"><ShieldCheck size={12} /> Trusted</div>
            <Trash2 size={16} className="text-slate-300 hover:text-red-500 cursor-pointer transition-colors" />
          </div>
        </div>
        
        <div className="txn-item">
          <div className="txn-icon" style={{ background: '#e0e7ff', color: 'var(--accent)' }}><User size={18} /></div>
          <div className="txn-info">
            <div className="txn-name">Arun Kumar</div>
            <div className="txn-meta">ICICI Bank · XXXX 3456</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div className="txn-risk risk-low flex items-center gap-1"><ShieldCheck size={12} /> Trusted</div>
            <Trash2 size={16} className="text-slate-300 hover:text-red-500 cursor-pointer transition-colors" />
          </div>
        </div>

        <div className="txn-item">
          <div className="txn-icon" style={{ background: '#fce4ec', color: 'var(--red)' }}><User size={18} /></div>
          <div className="txn-info">
            <div className="txn-name">Unknown Vendor</div>
            <div className="txn-meta">Paytm Bank · XXXX 1122</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div className="txn-risk risk-high">Unverified</div>
            <Trash2 size={16} className="text-slate-300 hover:text-red-500 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}
