import { motion } from 'framer-motion';
import {
  Wallet, TrendingUp, TrendingDown, ArrowRight,
  Send, Plus, Download, History, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import TrustScoreMeter from '../../components/common/TrustScoreMeter';
import ExplainableAIPanel from '../../components/common/ExplainableAIPanel';
import { accountData, recentTransactions } from '../../data/mockData';

export default function Dashboard() {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Section - Balances and Trust Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Balance Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-6 lg:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 rounded-full bg-blue-400/20 blur-2xl"></div>

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 text-blue-100">
                <Wallet className="w-5 h-5" />
                <span className="font-medium">Total Available Balance</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                {formatCurrency(accountData.balance)}
              </h2>
              <div className="flex items-center gap-6 mt-6">
                <div>
                  <p className="text-xs text-blue-200 mb-1 uppercase tracking-wider font-semibold">Savings</p>
                  <p className="font-medium">{formatCurrency(accountData.savingsBalance)}</p>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div>
                  <p className="text-xs text-blue-200 mb-1 uppercase tracking-wider font-semibold">Current</p>
                  <p className="font-medium">{formatCurrency(accountData.currentBalance)}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              <Link to="/banking/transfer" className="flex items-center justify-center gap-2 py-3 px-4 bg-white/15 hover:bg-white/25 rounded-xl transition-colors backdrop-blur-sm text-sm font-medium">
                <Send className="w-4 h-4" /> Send
              </Link>
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white/15 hover:bg-white/25 rounded-xl transition-colors backdrop-blur-sm text-sm font-medium">
                <Plus className="w-4 h-4" /> Add
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white/15 hover:bg-white/25 rounded-xl transition-colors backdrop-blur-sm text-sm font-medium">
                <Download className="w-4 h-4" /> Receive
              </button>
              <Link to="/banking/transactions" className="flex items-center justify-center gap-2 py-3 px-4 bg-white/15 hover:bg-white/25 rounded-xl transition-colors backdrop-blur-sm text-sm font-medium">
                <History className="w-4 h-4" /> History
              </Link>
            </div>
          </div>
        </div>

        {/* Live Trust Score Widget */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Live
          </div>
          <h3 className="text-sm font-semibold text-slate-800 mb-6">Session Trust Score</h3>
          <TrustScoreMeter score={95} size={180} />
          <p className="text-xs text-center text-slate-400 mt-4 max-w-[200px]">
            Score updates dynamically based on your interaction behavior.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 text-lg">Recent Transactions</h3>
            <Link to="/banking/transactions" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentTransactions.slice(0, 5).map(txn => (
              <div key={txn.id} className="p-4 sm:px-6 hover:bg-slate-50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    txn.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {txn.type === 'credit' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{txn.description}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{new Date(txn.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} • {txn.category}</p>
                  </div>
                </div>
                <div className={`font-semibold ${txn.type === 'credit' ? 'text-emerald-600' : 'text-slate-800'}`}>
                  {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explainable AI Panel */}
        <div className="lg:col-span-1 h-full">
          <ExplainableAIPanel />
        </div>
      </div>
    </div>
  );
}
