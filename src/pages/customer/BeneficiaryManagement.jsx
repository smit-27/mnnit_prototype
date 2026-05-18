import { Users, Search, Plus, MoreVertical, ShieldCheck, ShieldAlert } from 'lucide-react';
import { beneficiaries } from '../../data/mockData';

export default function BeneficiaryManagement() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Beneficiaries</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your payees and trust settings</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Payee
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
              placeholder="Search beneficiaries..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors bg-white text-sm"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 w-full sm:w-auto">
              <option>All Payees</option>
              <option>Trusted</option>
              <option>Recent</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Payee Details</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Bank Info</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">History</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Trust Status</th>
                <th className="p-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {beneficiaries.map((ben) => (
                <tr key={ben.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                        {ben.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{ben.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{ben.upiId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <p className="text-sm text-slate-700">{ben.bank}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 uppercase">Added: {new Date(ben.addedDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <p className="text-sm text-slate-700">{ben.totalTransfers} Transfers</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Last: {ben.lastTransfer ? new Date(ben.lastTransfer).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : 'Never'}</p>
                  </td>
                  <td className="p-4 text-center">
                    {ben.trusted ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
                        <ShieldCheck className="w-3 h-3" /> Trusted
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-600 uppercase tracking-wide">
                        <ShieldAlert className="w-3 h-3 text-slate-400" /> Standard
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
