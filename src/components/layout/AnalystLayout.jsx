import { Outlet, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldAlert, Activity, AlertTriangle, BarChart3, Users, Settings, Eye, Link as LinkIcon
} from 'lucide-react';

const navItems = [
  { path: '/analyst', icon: Activity, label: 'Live Monitor' },
];

export default function AnalystLayout() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] bg-white border-r border-slate-200 fixed h-screen z-40 shadow-sm">
        <div className="h-16 flex items-center px-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center shadow-md">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800 leading-tight">MultiShield</h1>
              <p className="text-[10px] text-indigo-500 font-medium">Security Analyst Console</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map(item => (
            <NavLink key={item.path} to={item.path} end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive ? 'bg-indigo-50 text-indigo-700 font-medium shadow-sm' : 'text-slate-500 hover:bg-slate-50'
                }`
              }>
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-100 p-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700">Security Analyst</p>
              <p className="text-xs text-slate-400">SOC Team Lead</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-slate-200 flex items-center px-4 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-800 text-sm">Security Analyst</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <NavLink to="/" className="text-xs text-indigo-600 font-medium flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg">
            <LinkIcon className="w-3 h-3" /> Banking Portal
          </NavLink>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[260px]">
        <header className="hidden lg:flex h-16 bg-white border-b border-slate-200 items-center px-6 sticky top-0 z-30 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-500" />
            Fraud Monitoring Console
          </h2>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-500">Live Monitoring Active</span>
            </div>
            <NavLink to="/" className="text-sm text-indigo-600 font-medium flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
              <LinkIcon className="w-3 h-3" /> Banking Portal
            </NavLink>
          </div>
        </header>

        <main className="p-4 lg:p-6 mt-14 lg:mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
