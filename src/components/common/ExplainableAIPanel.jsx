import { motion, AnimatePresence } from 'framer-motion';
import { Brain, AlertTriangle, TrendingDown, ChevronRight } from 'lucide-react';
import { useBehavior } from '../../context/BehaviorContext';

export default function ExplainableAIPanel() {
  const { riskEvents, riskScore, trustScore, getTrustLevel } = useBehavior();
  const trustLevel = getTrustLevel();

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'velocity': return '⚡';
      case 'clipboard': return '📋';
      case 'focus': return '👁️';
      case 'beneficiary': return '👤';
      case 'navigation': return '🧭';
      case 'social': return '🎭';
      case 'hesitation': return '⏱️';
      case 'rapidTransfer': return '💸';
      default: return '⚠️';
    }
  };

  if (riskEvents.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Brain className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">AI Risk Analysis</h3>
            <p className="text-xs text-slate-400">Explainable behavioral intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
          <div className="text-2xl">✅</div>
          <div>
            <p className="text-sm font-medium text-emerald-700">No Risk Factors Detected</p>
            <p className="text-xs text-emerald-500 mt-0.5">Your session behavior appears normal</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Brain className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">AI Risk Analysis</h3>
            <p className="text-xs text-slate-400">Why your trust score changed</p>
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${trustLevel.bg} ${trustLevel.text} ${trustLevel.border} border`}>
          Risk: {riskScore}%
        </div>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {riskEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100"
            >
              <span className="text-lg">{getCategoryIcon(event.category)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-red-800">{event.description}</p>
                <p className="text-xs text-red-400 mt-0.5">{event.timestamp}</p>
              </div>
              <div className="flex items-center gap-1 text-red-600 font-bold text-sm bg-red-100 px-2 py-1 rounded-lg">
                <TrendingDown className="w-3 h-3" />
                +{event.points}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {riskScore >= 30 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2"
        >
          <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-amber-800">Enhanced Security Active</p>
            <p className="text-xs text-amber-600 mt-0.5">
              {riskScore >= 86 ? 'Session frozen. Analyst approval required.' :
               riskScore >= 61 ? 'Adaptive multi-factor authentication required.' :
               'Additional verification may be requested.'}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
