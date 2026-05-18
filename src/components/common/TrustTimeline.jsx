import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { useBehavior } from '../../context/BehaviorContext';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const score = data.score;
    const color = score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : score >= 30 ? '#f97316' : '#ef4444';
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-3 min-w-[160px]">
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        <p className="text-lg font-bold" style={{ color }}>{score}</p>
        {data.event && (
          <p className="text-xs text-slate-500 mt-1 border-t border-slate-100 pt-1">{data.event}</p>
        )}
      </div>
    );
  }
  return null;
};

export default function TrustTimeline({ data: externalData }) {
  const behavior = useBehavior();
  const data = externalData || behavior.trustHistory;

  const gradientId = useMemo(() => `trustGradient-${Math.random().toString(36).slice(2)}`, []);

  if (!data || data.length < 2) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Trust Score Timeline</h3>
        <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
          Monitoring session behavior...
        </div>
      </div>
    );
  }

  const lastScore = data[data.length - 1]?.score || 95;
  const strokeColor = lastScore >= 70 ? '#10b981' : lastScore >= 50 ? '#f59e0b' : lastScore >= 30 ? '#f97316' : '#ef4444';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Trust Score Timeline</h3>
          <p className="text-xs text-slate-400 mt-0.5">Real-time behavioral trust tracking</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Safe</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Warning</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" /> Critical</span>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.15} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={70} stroke="#10b981" strokeDasharray="4 4" strokeOpacity={0.4} />
            <ReferenceLine y={30} stroke="#ef4444" strokeDasharray="4 4" strokeOpacity={0.4} />
            <Area type="monotone" dataKey="score" stroke={strokeColor} strokeWidth={2.5}
              fill={`url(#${gradientId})`} dot={{ r: 4, fill: strokeColor, stroke: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: strokeColor, stroke: '#fff', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
