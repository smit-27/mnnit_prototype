import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Fingerprint, ArrowRight, Eye, UserCircle2 } from 'lucide-react';
import { currentUser } from '../../data/mockData';

export default function LoginPage({ onLogin }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex rounded-3xl overflow-hidden shadow-2xl bg-white min-h-[600px]">
        {/* Left side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 leading-tight">MultiShield</h1>
              <p className="text-xs text-blue-500 font-medium">Digital Banking</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
            <p className="text-slate-500 text-sm">Sign in to your secure banking account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">User ID / Account Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircle2 className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white"
                  placeholder="Enter User ID"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Fingerprint className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white"
                  placeholder="Enter Password"
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed group mt-4"
            >
              {loading ? (
                <span className="flex items-center gap-2">Authenticating... <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /></span>
              ) : (
                <span className="flex items-center gap-2">Secure Login <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              )}
            </button>
          </form>

          {/* Quick Login for Demo */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-500 mb-3 text-center">Quick Demo Login</p>
            <button
              onClick={() => { setUserId(currentUser.userId); setPassword('password123'); }}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                {currentUser.avatar}
              </div>
              Login as {currentUser.name}
            </button>
          </div>
        </div>

        {/* Right side - Informational Panel */}
        <div className="hidden lg:flex w-1/2 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
          {/* Abstract background elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Zero Trust Architecture
            </div>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Next-generation<br />behavioral security.
            </h2>
            <p className="text-slate-400 text-lg max-w-md">
              Our AI continuously monitors sessions to protect against fraud, takeovers, and social engineering in real-time.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Adaptive Authentication</h3>
                <p className="text-slate-400 text-sm mt-1">Frictionless access for normal behavior, dynamic challenges for high-risk actions.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Fingerprint className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Continuous Identity Verification</h3>
                <p className="text-slate-400 text-sm mt-1">We verify it's you throughout the entire session, not just at login.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
