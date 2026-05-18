import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Phone, ShieldAlert } from 'lucide-react';
import { useBehavior } from '../../context/BehaviorContext';

export default function ScamAlert() {
  const { scamCoachingDetected } = useBehavior();
  const [dismissed, setDismissed] = useState(false);

  if (!scamCoachingDetected || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-6 right-6 z-[90] w-[380px] max-w-[calc(100vw-2rem)]"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-orange-200 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ShieldAlert className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-sm">Scam Coaching Detected</h3>
                  <p className="text-orange-100 text-xs mt-0.5">Possible social engineering activity</p>
                </div>
              </div>
              <button onClick={() => setDismissed(true)} className="text-white/60 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-slate-600 mb-3">
              We detected patterns suggesting someone may be guiding you through this transaction.
              Common indicators include frequent app switching and long pauses.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3">
              <p className="text-xs text-amber-800 font-medium flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Never share OTP or banking details with anyone on a call
              </p>
            </div>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors">
              <Phone className="w-4 h-4" /> Report to Cyber Helpline (1930)
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
