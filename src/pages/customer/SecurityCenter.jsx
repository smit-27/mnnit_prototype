import { Shield, Smartphone, Monitor, MapPin, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { trustedDevices, loginLocations, securityAlerts } from '../../data/mockData';

export default function SecurityCenter() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Security Center</h1>
        <p className="text-sm text-slate-500 mt-1">Manage devices, sessions, and security settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Trusted Devices */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" /> Trusted Devices
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {trustedDevices.map(device => (
                <div key={device.id} className="p-5 flex items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                      {device.type === 'mobile' ? <Smartphone className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 text-sm flex items-center gap-2">
                        {device.name}
                        {device.current && <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Current</span>}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{device.os} • {device.browser}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Last active: {device.lastActive}</p>
                    </div>
                  </div>
                  <button className="text-xs font-medium text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Login Locations */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" /> Recent Logins
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location/IP</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loginLocations.map(loc => (
                    <tr key={loc.id} className="hover:bg-slate-50/50">
                      <td className="p-4">
                        <p className="text-sm font-medium text-slate-800">{loc.city}, {loc.country}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{loc.ip} • {loc.device}</p>
                      </td>
                      <td className="p-4 text-sm text-slate-600">{loc.timestamp}</td>
                      <td className="p-4">
                        {loc.status === 'current' ? (
                          <span className="text-xs text-blue-600 font-medium">Current Session</span>
                        ) : loc.status === 'suspicious' ? (
                          <span className="text-xs text-amber-600 font-medium flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Flagged</span>
                        ) : (
                          <span className="text-xs text-slate-500">Trusted</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Security Status */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm border border-white/30">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold mb-1">Account Secure</h2>
              <p className="text-emerald-100 text-sm mb-6">MultiShield Behavioral Protection is active.</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                  <span className="text-sm font-medium">MFA Configured</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                  <span className="text-sm font-medium">Behavioral Profiling Active</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                  <span className="text-sm font-medium">No active threats</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts List */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Security Alerts</h3>
            <div className="space-y-3">
              {securityAlerts.map(alert => (
                <div key={alert.id} className={`p-3 rounded-xl border ${
                  alert.type === 'warning' ? 'bg-amber-50 border-amber-100' :
                  alert.type === 'success' ? 'bg-emerald-50 border-emerald-100' :
                  'bg-blue-50 border-blue-100'
                }`}>
                  <p className={`text-sm font-medium ${
                    alert.type === 'warning' ? 'text-amber-800' :
                    alert.type === 'success' ? 'text-emerald-800' :
                    'text-blue-800'
                  }`}>{alert.title}</p>
                  <p className={`text-xs mt-0.5 ${
                    alert.type === 'warning' ? 'text-amber-600' :
                    alert.type === 'success' ? 'text-emerald-600' :
                    'text-blue-600'
                  }`}>{alert.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
