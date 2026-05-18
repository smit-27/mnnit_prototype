import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert, Activity, AlertTriangle, Users, Monitor, MapPin, 
  CheckCircle2, XCircle, Search, Filter, Shield, AlertOctagon,
  Clock, ArrowUpRight, ShieldCheck
} from 'lucide-react';
import { suspiciousSessions, analystAlerts } from '../../data/mockData';
import TrustTimeline from '../../components/common/TrustTimeline';

export default function AnalystDashboard() {
  const [selectedSession, setSelectedSession] = useState(suspiciousSessions[0]);
  const [liveSessions, setLiveSessions] = useState(suspiciousSessions);

  const getRiskColor = (level) => {
    switch (level) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'frozen': 
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-[10px] font-bold uppercase tracking-wider"><ShieldAlert className="w-3 h-3"/> Frozen</span>;
      case 'blocked': 
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-[10px] font-bold uppercase tracking-wider"><XCircle className="w-3 h-3"/> Blocked</span>;
      case 'mfa_required': 
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider"><Shield className="w-3 h-3"/> MFA Requested</span>;
      case 'monitoring': 
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider"><Activity className="w-3 h-3"/> Monitoring</span>;
      default: 
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider"><CheckCircle2 className="w-3 h-3"/> Active</span>;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-600">Active Sessions</h3>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800">1,248</p>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span className="text-emerald-600 font-medium flex items-center"><ArrowUpRight className="w-3 h-3"/> +12%</span>
            <span className="text-slate-400">vs last hour</span>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-600">High Risk Detected</h3>
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800">24</p>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span className="text-orange-600 font-medium flex items-center"><ArrowUpRight className="w-3 h-3"/> +3</span>
            <span className="text-slate-400">in last 15 mins</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-600">Sessions Frozen</h3>
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800">8</p>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span className="text-red-600 font-medium">Requires Review</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-600">Fraud Prevented</h3>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800">₹1.8Cr</p>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span className="text-slate-400">Estimated value saved today</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Live Monitoring */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[800px]">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-500" /> Live Suspicious Sessions
              </h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="Search user ID..." 
                    className="pl-9 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 w-48" />
                </div>
                <button className="p-1.5 text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-auto flex-1 p-2">
              <div className="space-y-2">
                {liveSessions.map((session) => (
                  <div 
                    key={session.id} 
                    onClick={() => setSelectedSession(session)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedSession?.id === session.id 
                        ? 'border-indigo-500 bg-indigo-50/50 shadow-md ring-1 ring-indigo-500/20' 
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 shrink-0">
                          {session.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{session.userName}</p>
                          <p className="text-xs text-slate-500">{session.userId}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(session.status)}
                        <div className={`px-2 py-1 rounded text-xs font-bold border ${getRiskColor(session.riskLevel)}`}>
                          Trust: {session.trustScore}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mb-3">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Monitor className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {session.device}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {session.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {session.startTime}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                        Amount: {formatCurrency(session.amount)}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {session.flags.map((flag, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] border border-slate-200">
                          {flag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Deep Dive & Alerts */}
        <div className="space-y-6">
          {/* Selected Session Deep Dive */}
          {selectedSession && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Search className="w-4 h-4 text-indigo-500" /> Session Analysis
                </h3>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg text-slate-800">{selectedSession.userName}</h4>
                  <div className={`px-3 py-1 rounded-lg text-sm font-bold border ${getRiskColor(selectedSession.riskLevel)}`}>
                    Score: {selectedSession.trustScore}
                  </div>
                </div>

                <div className="mb-6">
                  <TrustTimeline data={null} /> {/* Passing null uses demo context data, in real app pass selected user data */}
                </div>

                <div className="space-y-4">
                  <h5 className="text-sm font-semibold text-slate-800 border-b pb-2">Analyst Actions</h5>
                  <div className="flex flex-col gap-2">
                    {selectedSession.status === 'frozen' || selectedSession.status === 'blocked' ? (
                      <>
                        <button className="w-full py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> Unfreeze & Mark Safe
                        </button>
                        <button className="w-full py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                          <AlertOctagon className="w-4 h-4" /> Terminate Session & Lock Account
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="w-full py-2.5 bg-orange-50 text-orange-700 border border-orange-200 rounded-xl text-sm font-medium hover:bg-orange-100 transition-colors flex items-center justify-center gap-2">
                          <Shield className="w-4 h-4" /> Force Step-up Authentication
                        </button>
                        <button className="w-full py-2.5 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                          <ShieldAlert className="w-4 h-4" /> Freeze Session Instantly
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Real-time Alert Feed */}
          <div className="bg-slate-900 rounded-2xl shadow-sm overflow-hidden flex flex-col max-h-[400px]">
            <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-orange-500" /> Live Threat Feed
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Live</span>
              </div>
            </div>
            <div className="overflow-auto p-3 space-y-2">
              <AnimatePresence>
                {analystAlerts.map((alert, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={alert.id}
                    className={`p-3 rounded-lg border border-slate-800 bg-slate-800/50 text-sm flex gap-3 ${
                      alert.type === 'critical' ? 'border-l-4 border-l-red-500' :
                      alert.type === 'high' ? 'border-l-4 border-l-orange-500' :
                      alert.type === 'medium' ? 'border-l-4 border-l-amber-500' :
                      'border-l-4 border-l-blue-500'
                    }`}
                  >
                    <span className="text-slate-400 font-mono text-xs shrink-0">{alert.time}</span>
                    <div className="flex-1">
                      <p className="text-slate-200">{alert.message}</p>
                      <p className="text-slate-500 text-xs mt-1">User: {alert.userId}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
