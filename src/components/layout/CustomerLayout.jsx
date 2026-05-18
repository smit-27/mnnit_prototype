import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, ArrowRightLeft, Users, History, Shield,
  LogOut, Menu, X, ChevronRight, Fingerprint, Bell
} from 'lucide-react';
import { useBehavior } from '../../context/BehaviorContext';
import TrustScoreBadge from '../common/TrustScoreBadge';
import MFAModal from '../modals/MFAModal';
import SessionFrozenOverlay from '../modals/SessionFrozenOverlay';
import ScamAlert from '../common/ScamAlert';
import { currentUser } from '../../data/mockData';

const navItems = [
  { path: '/banking/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/banking/transfer', icon: ArrowRightLeft, label: 'UPI Transfer' },
  { path: '/banking/beneficiaries', icon: Users, label: 'Beneficiaries' },
  { path: '/banking/transactions', icon: History, label: 'Transactions' },
  { path: '/banking/security', icon: Shield, label: 'Security Center' },
];

export default function CustomerLayout({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { trustScore, mfaRequired, sessionFrozen, scamCoachingDetected, getTrustLevel, detectRapidNavigation } = useBehavior();
  const navigate = useNavigate();
  const trustLevel = getTrustLevel();

  const handleNavClick = () => {
    detectRapidNavigation();
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ width: 260 }}
        animate={{ width: sidebarOpen ? 260 : 72 }}
        className="hidden lg:flex flex-col bg-white border-r border-slate-200 fixed h-screen z-40 shadow-sm"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-slate-100">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">
                  <h1 className="text-base font-bold text-slate-800 leading-tight">MultiShield</h1>
                  <p className="text-[10px] text-blue-500 font-medium">Secure Banking</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto text-slate-400 hover:text-slate-600 transition-colors">
            {sidebarOpen ? <ChevronRight className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-sm whitespace-nowrap">{item.label}</motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {/* Behavioral Auth Indicator */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mx-3 mb-3 p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-blue-800">Behavioral Auth Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-blue-600">Monitoring session</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Profile */}
        <div className="border-t border-slate-100 p-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 text-white text-sm font-semibold">
              {currentUser.avatar}
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{currentUser.name}</p>
                  <p className="text-xs text-slate-400 truncate">{currentUser.accountNumber}</p>
                </motion.div>
              )}
            </AnimatePresence>
            {sidebarOpen && (
              <button onClick={onLogout} className="text-slate-400 hover:text-red-500 transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-slate-200 flex items-center px-4 z-50 shadow-sm">
        <button onClick={() => setMobileMenuOpen(true)} className="text-slate-600">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 ml-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-800 text-sm">MultiShield</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <TrustScoreBadge score={trustScore} size="sm" />
          <Bell className="w-5 h-5 text-slate-400" />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black z-50" onClick={() => setMobileMenuOpen(false)} />
            <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-white z-50 shadow-xl">
              <div className="h-14 flex items-center px-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-slate-800">MultiShield</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="ml-auto text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-3 space-y-1">
                {navItems.map(item => (
                  <NavLink key={item.path} to={item.path} onClick={handleNavClick}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-500 hover:bg-slate-50'
                      }`
                    }>
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-[260px]' : 'lg:ml-[72px]'}`}>
        {/* Top Bar */}
        <header className="hidden lg:flex h-16 bg-white border-b border-slate-200 items-center px-6 sticky top-0 z-30 shadow-sm">
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <TrustScoreBadge score={trustScore} size="md" />
            <div className="w-px h-8 bg-slate-200" />
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                {currentUser.avatar}
              </div>
              <span className="text-sm font-medium text-slate-700">{currentUser.name}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6 mt-14 lg:mt-0">
          <Outlet />
        </main>
      </div>

      {/* MFA Modal */}
      <MFAModal />

      {/* Session Frozen Overlay */}
      <SessionFrozenOverlay />

      {/* Scam Coaching Alert */}
      <ScamAlert />
    </div>
  );
}
