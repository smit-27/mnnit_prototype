import { motion } from 'framer-motion';
import { Shield, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';

export default function TrustScoreBadge({ score, size = 'md' }) {
  const getColor = () => {
    if (score >= 70) return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: ShieldCheck };
    if (score >= 50) return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: ShieldAlert };
    if (score >= 30) return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: ShieldAlert };
    return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: ShieldX };
  };

  const { bg, text, border, icon: Icon } = getColor();
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs gap-1' : 'px-3 py-1.5 text-sm gap-1.5';
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <motion.div
      key={score}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      className={`flex items-center ${sizeClasses} rounded-full ${bg} ${text} ${border} border font-semibold`}
    >
      <Icon className={iconSize} />
      <span>{score}</span>
    </motion.div>
  );
}
