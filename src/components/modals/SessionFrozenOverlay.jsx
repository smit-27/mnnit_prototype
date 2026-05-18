import { motion, AnimatePresence } from 'framer-motion';
import { ShieldX, Lock, Phone, AlertOctagon } from 'lucide-react';
import { useBehavior } from '../../context/BehaviorContext';

export default function SessionFrozenOverlay() {
  const { sessionFrozen, resetSession } = useBehavior();

  if (!sessionFrozen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white/95 backdrop-blur-md z-[200] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-lg"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-24 h-24 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center mx-auto mb-6"
          >
            <ShieldX className="w-12 h-12 text-red-500" />
          </motion.div>

          <h1 className="text-2xl font-bold text-slate-800 mb-2">Session Frozen</h1>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">
            Your session has been frozen due to critical risk level detection.
            A security analyst will review your session.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6 text-left">
            <div className="flex items-center gap-2 mb-3">
              <AlertOctagon className="w-5 h-5 text-red-500" />
              <h3 className="text-sm font-semibold text-red-800">Security Hold Active</h3>
            </div>
            <ul className="space-y-2 text-sm text-red-700">
              <li className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" /> All transactions are temporarily suspended
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" /> Our security team has been notified
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-5 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors">
              Contact Support
            </button>
            <button onClick={resetSession}
              className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors">
              Reset Demo Session
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
