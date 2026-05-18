import { History, Search, Filter, Download, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { recentTransactions } from '../../data/mockData';

export default function TransactionHistory() {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Transaction History</h1>
          <p className="text-sm text-slate-500 mt-1">View and download your account statements</p>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
          <Download className="w-4 h-4" /> Download Statement
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, category, or UPI ID..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors bg-white text-sm"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="px-3 py-2 border border-slate-200 bg-white text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2 flex-1 sm:flex-none justify-center">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 flex-1 sm:flex-none">
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {recentTransactions.map((txn) => (
            <div key={txn.id} className="p-4 sm:p-6 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border ${
                  txn.type === 'credit' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-white border-slate-100 text-slate-600'
                }`}>
                  {txn.type === 'credit' ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm sm:text-base">{txn.description}</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm text-slate-500">
                    <span>{new Date(txn.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="px-2 py-0.5 bg-slate-100 rounded-md text-slate-600 text-[10px] uppercase font-semibold">{txn.category}</span>
                    {txn.upiId && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="truncate max-w-[100px] sm:max-w-none">Ref: {txn.upiId}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className={`font-bold text-lg whitespace-nowrap self-end sm:self-auto ${
                txn.type === 'credit' ? 'text-emerald-600' : 'text-slate-800'
              }`}>
                {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
