import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, History, AlertCircle, ChevronRight, ShieldCheck, Copy } from 'lucide-react';
import { beneficiaries } from '../../data/mockData';
import { useBehavior } from '../../context/BehaviorContext';

export default function UPITransfer() {
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [selectedBen, setSelectedBen] = useState(null);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferComplete, setTransferComplete] = useState(false);

  const { detectClipboardPaste, detectDirectTransferNav, detectNewBeneficiaryRisk, addRiskEvent, mfaRequired, sessionFrozen } = useBehavior();

  const amountRef = useRef('');
  const lastAmountChangeTimeRef = useRef(0);
  const amountChangeCountRef = useRef(0);

  // Check if they navigated here too fast after login
  useEffect(() => {
    detectDirectTransferNav();
  }, [detectDirectTransferNav]);

  const handlePaste = (e) => {
    detectClipboardPaste();
  };

  const handleAmountChange = (e) => {
    const val = e.target.value;
    setAmount(val);

    // Track rapid amount changes (hesitation/confusion)
    const now = Date.now();
    if (now - lastAmountChangeTimeRef.current < 1000) {
      amountChangeCountRef.current += 1;
      if (amountChangeCountRef.current > 4) {
        addRiskEvent('Transaction Hesitation / Rapid Amount Changes', 12, 'hesitation');
        amountChangeCountRef.current = 0;
      }
    } else {
      amountChangeCountRef.current = 0;
    }
    lastAmountChangeTimeRef.current = now;
    amountRef.current = val;
  };

  const handleBeneficiarySelect = (ben) => {
    setSelectedBen(ben);
    setUpiId(ben.upiId);
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    if (!upiId || !amount) return;

    // Check if new beneficiary + high amount
    const isNew = !beneficiaries.some(b => b.upiId === upiId && b.trusted);
    const numAmount = parseFloat(amount);

    if (isNew) {
      detectNewBeneficiaryRisk(numAmount);
    }

    // Process transfer
    setIsTransferring(true);
    setTimeout(() => {
      // If risk caused MFA or freeze, don't complete
      if (mfaRequired || sessionFrozen) {
        setIsTransferring(false);
        return;
      }
      setIsTransferring(false);
      setTransferComplete(true);
      setTimeout(() => {
        setUpiId('');
        setAmount('');
        setRemarks('');
        setSelectedBen(null);
        setTransferComplete(false);
      }, 3000);
    }, 1500);
  };

  if (transferComplete) {
    return (
      <div className="max-w-xl mx-auto mt-10">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Transfer Successful</h2>
          <p className="text-slate-500 mb-8">₹{amount} has been sent securely to {selectedBen ? selectedBen.name : upiId}</p>
          <button onClick={() => setTransferComplete(false)} className="px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors">
            Make Another Transfer
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">UPI Transfer</h1>
        <p className="text-sm text-slate-500 mt-1">Send money securely via UPI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Transfer Form */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8">
          <form onSubmit={handleTransfer} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center justify-between">
                <span>Beneficiary UPI ID</span>
                {selectedBen && selectedBen.trusted && (
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Trusted Payee
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={upiId}
                  onChange={(e) => { setUpiId(e.target.value); setSelectedBen(null); }}
                  onPaste={handlePaste}
                  placeholder="e.g. name@bank"
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white text-slate-800 font-medium"
                />
                {!upiId && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Copy className="h-5 w-5 text-slate-300" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Amount (₹)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-500 font-semibold text-lg">₹</span>
                </div>
                <input
                  type="number"
                  required
                  min="1"
                  value={amount}
                  onChange={handleAmountChange}
                  onPaste={handlePaste}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white text-slate-800 font-bold text-lg"
                />
              </div>
              <div className="flex gap-2 mt-3">
                {[1000, 5000, 10000, 50000].map(val => (
                  <button key={val} type="button" onClick={() => setAmount(val.toString())}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-medium transition-colors">
                    +₹{val}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Remarks (Optional)</label>
              <input
                type="text"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="What is this for?"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white text-slate-800 text-sm"
              />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isTransferring || !upiId || !amount || sessionFrozen}
                className="w-full flex justify-center items-center gap-2 py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isTransferring ? (
                  <>Processing Security Checks... <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin ml-2" /></>
                ) : (
                  <>Secure Transfer <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
              <p className="text-xs text-center text-slate-400 mt-4 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secured by MultiShield Behavioral Analytics
              </p>
            </div>
          </form>
        </div>

        {/* Quick Select & Security Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" /> Quick Select
              </h3>
              <button className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center">
                All Payees <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3">
              {beneficiaries.slice(0, 4).map(ben => (
                <button
                  key={ben.id}
                  onClick={() => handleBeneficiarySelect(ben)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors text-left ${
                    selectedBen?.id === ben.id ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      selectedBen?.id === ben.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {ben.name.charAt(0)}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${selectedBen?.id === ben.id ? 'text-blue-900' : 'text-slate-800'}`}>{ben.name}</p>
                      <p className={`text-xs mt-0.5 ${selectedBen?.id === ben.id ? 'text-blue-600' : 'text-slate-500'}`}>{ben.upiId}</p>
                    </div>
                  </div>
                  {ben.trusted && <ShieldCheck className={`w-4 h-4 ${selectedBen?.id === ben.id ? 'text-blue-500' : 'text-emerald-500'}`} />}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-indigo-900 mb-1">Hackathon Demo Tip</h4>
                <p className="text-xs text-indigo-700 leading-relaxed">
                  Try these behaviors to trigger the security engine:
                  <br className="mb-1"/>
                  • <b>Paste</b> a UPI ID or Amount
                  <br/>
                  • Enter a <b>large amount</b> for a non-trusted payee
                  <br/>
                  • Switch browser tabs rapidly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
