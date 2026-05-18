import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function TrustScoreMeter({ score, size = 200 }) {
  const [displayScore, setDisplayScore] = useState(score);
  const prevScoreRef = useRef(score);

  useEffect(() => {
    const start = prevScoreRef.current;
    const end = score;
    const duration = 800;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    prevScoreRef.current = score;
  }, [score]);

  const getColor = () => {
    if (displayScore >= 70) return { stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.3)', label: 'Trusted', bg: '#ecfdf5' };
    if (displayScore >= 50) return { stroke: '#f59e0b', glow: 'rgba(245, 158, 11, 0.3)', label: 'Suspicious', bg: '#fffbeb' };
    if (displayScore >= 30) return { stroke: '#f97316', glow: 'rgba(249, 115, 22, 0.3)', label: 'High Risk', bg: '#fff7ed' };
    return { stroke: '#ef4444', glow: 'rgba(239, 68, 68, 0.3)', label: 'Critical', bg: '#fef2f2' };
  };

  const { stroke, glow, label, bg } = getColor();
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;
  const center = size / 2;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle cx={center} cy={center} r={radius} fill="none"
            stroke="#e2e8f0" strokeWidth="10" />
          {/* Progress circle */}
          <motion.circle
            cx={center} cy={center} r={radius} fill="none"
            stroke={stroke} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px ${glow})` }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={displayScore}
            className="text-4xl font-bold"
            style={{ color: stroke }}
          >
            {displayScore}
          </motion.span>
          <span className="text-xs text-slate-400 font-medium mt-0.5">Trust Score</span>
          <motion.span
            key={label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold mt-1 px-2.5 py-0.5 rounded-full"
            style={{ color: stroke, backgroundColor: bg }}
          >
            {label}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
