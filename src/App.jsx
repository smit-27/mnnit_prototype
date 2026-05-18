import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { BehaviorProvider } from './context/BehaviorContext';
import LoginPage from './pages/customer/LoginPage';
import CustomerLayout from './components/layout/CustomerLayout';
import Dashboard from './pages/customer/Dashboard';
import UPITransfer from './pages/customer/UPITransfer';
import BeneficiaryManagement from './pages/customer/BeneficiaryManagement';
import TransactionHistory from './pages/customer/TransactionHistory';
import SecurityCenter from './pages/customer/SecurityCenter';
import AnalystLayout from './components/layout/AnalystLayout';
import AnalystDashboard from './pages/analyst/AnalystDashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BehaviorProvider>
      <Routes>
        <Route path="/" element={
          isLoggedIn ? <Navigate to="/banking/dashboard" /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />
        } />
        <Route path="/banking" element={
          isLoggedIn ? <CustomerLayout onLogout={() => setIsLoggedIn(false)} /> : <Navigate to="/" />
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transfer" element={<UPITransfer />} />
          <Route path="beneficiaries" element={<BeneficiaryManagement />} />
          <Route path="transactions" element={<TransactionHistory />} />
          <Route path="security" element={<SecurityCenter />} />
        </Route>
        <Route path="/analyst" element={<AnalystLayout />}>
          <Route index element={<AnalystDashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BehaviorProvider>
  );
}
