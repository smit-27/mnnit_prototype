// Mock user data
export const currentUser = {
  name: 'Rahul Sharma',
  accountNumber: '9876543210',
  userId: 'RAHUL.SHARMA',
  email: 'rahul.sharma@email.com',
  phone: '+91 98765 43210',
  branch: 'Mumbai - Andheri West',
  ifsc: 'MSHD0001234',
  accountType: 'Savings Account',
  joinDate: '2021-03-15',
  avatar: 'RS',
};

// Account data
export const accountData = {
  balance: 2847563.42,
  currency: '₹',
  savingsBalance: 2847563.42,
  currentBalance: 1250000.00,
  fdBalance: 500000.00,
  monthlyIncome: 185000,
  monthlyExpense: 72450,
};

// Recent transactions
export const recentTransactions = [
  { id: 'TXN001', type: 'credit', description: 'Salary - TechCorp India', amount: 185000, date: '2026-05-15', category: 'Income', upiId: null, status: 'completed' },
  { id: 'TXN002', type: 'debit', description: 'Amazon.in Purchase', amount: 4299, date: '2026-05-14', category: 'Shopping', upiId: null, status: 'completed' },
  { id: 'TXN003', type: 'debit', description: 'UPI - Swiggy', amount: 567, date: '2026-05-14', category: 'Food', upiId: 'swiggy@paytm', status: 'completed' },
  { id: 'TXN004', type: 'debit', description: 'Electricity Bill - MSEB', amount: 2340, date: '2026-05-13', category: 'Bills', upiId: null, status: 'completed' },
  { id: 'TXN005', type: 'credit', description: 'UPI - From Amit K.', amount: 15000, date: '2026-05-12', category: 'Transfer', upiId: 'amit.k@upi', status: 'completed' },
  { id: 'TXN006', type: 'debit', description: 'UPI - BigBasket', amount: 1890, date: '2026-05-11', category: 'Groceries', upiId: 'bigbasket@ybl', status: 'completed' },
  { id: 'TXN007', type: 'debit', description: 'Netflix Subscription', amount: 649, date: '2026-05-10', category: 'Entertainment', upiId: null, status: 'completed' },
  { id: 'TXN008', type: 'debit', description: 'Petrol - HP', amount: 3200, date: '2026-05-09', category: 'Transport', upiId: 'hp.petrol@upi', status: 'completed' },
  { id: 'TXN009', type: 'credit', description: 'Freelance Payment', amount: 45000, date: '2026-05-08', category: 'Income', upiId: null, status: 'completed' },
  { id: 'TXN010', type: 'debit', description: 'UPI - Zomato', amount: 432, date: '2026-05-07', category: 'Food', upiId: 'zomato@paytm', status: 'completed' },
  { id: 'TXN011', type: 'debit', description: 'Mobile Recharge - Jio', amount: 399, date: '2026-05-06', category: 'Bills', upiId: null, status: 'completed' },
  { id: 'TXN012', type: 'debit', description: 'UPI - PharmEasy', amount: 1250, date: '2026-05-05', category: 'Health', upiId: 'pharmeasy@upi', status: 'completed' },
];

// Beneficiaries
export const beneficiaries = [
  { id: 'BEN001', name: 'Priya Sharma', upiId: 'priya.sharma@upi', bank: 'HDFC Bank', trusted: true, addedDate: '2024-06-10', lastTransfer: '2026-05-10', totalTransfers: 24 },
  { id: 'BEN002', name: 'Amit Kumar', upiId: 'amit.kumar@ybl', bank: 'SBI', trusted: true, addedDate: '2023-11-20', lastTransfer: '2026-05-12', totalTransfers: 45 },
  { id: 'BEN003', name: 'Neha Gupta', upiId: 'neha.g@paytm', bank: 'ICICI Bank', trusted: true, addedDate: '2025-01-15', lastTransfer: '2026-04-28', totalTransfers: 12 },
  { id: 'BEN004', name: 'Raj Patel', upiId: 'raj.patel@upi', bank: 'Kotak Bank', trusted: false, addedDate: '2026-05-01', lastTransfer: null, totalTransfers: 0 },
  { id: 'BEN005', name: 'Sunita Devi', upiId: 'sunita.d@ybl', bank: 'PNB', trusted: true, addedDate: '2024-08-05', lastTransfer: '2026-05-05', totalTransfers: 18 },
];

// Trusted devices
export const trustedDevices = [
  { id: 'DEV001', name: 'iPhone 15 Pro', type: 'mobile', os: 'iOS 19.4', browser: 'Safari', lastActive: '2026-05-18 14:22', location: 'Mumbai, India', trusted: true, current: true },
  { id: 'DEV002', name: 'MacBook Pro M4', type: 'desktop', os: 'macOS 16.1', browser: 'Chrome 130', lastActive: '2026-05-17 09:15', location: 'Mumbai, India', trusted: true, current: false },
  { id: 'DEV003', name: 'Samsung Galaxy S25', type: 'mobile', os: 'Android 17', browser: 'Chrome Mobile', lastActive: '2026-05-10 18:30', location: 'Pune, India', trusted: false, current: false },
];

// Login locations
export const loginLocations = [
  { id: 'LOC001', city: 'Mumbai', country: 'India', ip: '203.192.xxx.xxx', timestamp: '2026-05-18 14:22', device: 'iPhone 15 Pro', status: 'current' },
  { id: 'LOC002', city: 'Mumbai', country: 'India', ip: '203.192.xxx.xxx', timestamp: '2026-05-17 09:15', device: 'MacBook Pro M4', status: 'trusted' },
  { id: 'LOC003', city: 'Pune', country: 'India', ip: '106.215.xxx.xxx', timestamp: '2026-05-10 18:30', device: 'Samsung Galaxy S25', status: 'suspicious' },
  { id: 'LOC004', city: 'Mumbai', country: 'India', ip: '203.192.xxx.xxx', timestamp: '2026-05-08 11:45', device: 'MacBook Pro M4', status: 'trusted' },
];

// Security alerts
export const securityAlerts = [
  { id: 'ALR001', type: 'warning', title: 'New device login attempt', description: 'Login attempt from Samsung Galaxy S25 in Pune', timestamp: '2026-05-10 18:30', resolved: true },
  { id: 'ALR002', type: 'info', title: 'Password changed successfully', description: 'Your account password was updated', timestamp: '2026-05-05 14:20', resolved: true },
  { id: 'ALR003', type: 'success', title: 'Trusted device added', description: 'MacBook Pro M4 was added as trusted device', timestamp: '2026-04-20 10:15', resolved: true },
];

// Analyst dashboard - suspicious sessions
export const suspiciousSessions = [
  {
    id: 'SES001', userId: 'RAHUL.SHARMA', userName: 'Rahul Sharma', trustScore: 42,
    riskLevel: 'high', status: 'monitoring', device: 'Unknown Android',
    location: 'Pune, India', startTime: '2026-05-18 14:15',
    flags: ['Rapid navigation', 'Clipboard paste detected', 'New beneficiary transfer'],
    amount: 250000,
  },
  {
    id: 'SES002', userId: 'PRIYA.MEHRA', userName: 'Priya Mehra', trustScore: 28,
    riskLevel: 'critical', status: 'blocked', device: 'Chrome Desktop',
    location: 'Delhi, India', startTime: '2026-05-18 13:45',
    flags: ['Social engineering pattern', 'Multiple focus switches', 'Guided interaction detected', 'High-value transfer'],
    amount: 500000,
  },
  {
    id: 'SES003', userId: 'AMIT.VERMA', userName: 'Amit Verma', trustScore: 65,
    riskLevel: 'medium', status: 'mfa_required', device: 'iPhone Safari',
    location: 'Bangalore, India', startTime: '2026-05-18 14:00',
    flags: ['Fast transfer attempt', 'First-time beneficiary'],
    amount: 75000,
  },
  {
    id: 'SES004', userId: 'DEEPIKA.RAO', userName: 'Deepika Rao', trustScore: 88,
    riskLevel: 'low', status: 'active', device: 'Trusted MacBook',
    location: 'Mumbai, India', startTime: '2026-05-18 12:30',
    flags: [],
    amount: 0,
  },
  {
    id: 'SES005', userId: 'VIKRAM.SINGH', userName: 'Vikram Singh', trustScore: 15,
    riskLevel: 'critical', status: 'frozen', device: 'Unknown Windows',
    location: 'Unknown VPN', startTime: '2026-05-18 13:10',
    flags: ['VPN detected', 'Rapid high-value transfers', 'Bot-like behavior', 'Multiple account access'],
    amount: 1500000,
  },
];

// Analyst alerts feed
export const analystAlerts = [
  { id: 'AA001', time: '14:22:15', type: 'critical', message: 'Session SES005 frozen - Bot-like behavior detected for Vikram Singh', userId: 'VIKRAM.SINGH' },
  { id: 'AA002', time: '14:18:30', type: 'high', message: 'Trust score dropped to 28 for Priya Mehra - Social engineering pattern', userId: 'PRIYA.MEHRA' },
  { id: 'AA003', time: '14:15:45', type: 'high', message: 'Clipboard paste detected during UPI transfer - Rahul Sharma', userId: 'RAHUL.SHARMA' },
  { id: 'AA004', time: '14:12:00', type: 'medium', message: 'MFA triggered for Amit Verma - First-time beneficiary transfer', userId: 'AMIT.VERMA' },
  { id: 'AA005', time: '14:05:22', type: 'low', message: 'New device login verified for Deepika Rao', userId: 'DEEPIKA.RAO' },
  { id: 'AA006', time: '13:58:10', type: 'critical', message: 'Multiple high-value transfers attempted from VPN - Vikram Singh', userId: 'VIKRAM.SINGH' },
  { id: 'AA007', time: '13:50:00', type: 'medium', message: 'Unusual login time detected for Priya Mehra', userId: 'PRIYA.MEHRA' },
  { id: 'AA008', time: '13:45:30', type: 'high', message: 'Focus switching pattern indicates possible coaching - Priya Mehra', userId: 'PRIYA.MEHRA' },
];

// Trust timeline data for graphs
export const trustTimelineData = [
  { time: '14:00', score: 95, event: 'Session Start' },
  { time: '14:02', score: 95, event: null },
  { time: '14:05', score: 88, event: 'Rapid Navigation' },
  { time: '14:08', score: 82, event: null },
  { time: '14:10', score: 74, event: 'Clipboard Paste' },
  { time: '14:12', score: 68, event: null },
  { time: '14:14', score: 52, event: 'Focus Switching' },
  { time: '14:16', score: 48, event: 'MFA Triggered' },
  { time: '14:18', score: 55, event: 'MFA Verified' },
  { time: '14:20', score: 58, event: null },
];

// Risk rules
export const riskRules = [
  { id: 'R001', name: 'Rapid Transfer After Login', description: 'Transfer initiated within 15 seconds of login', riskPoints: 20, category: 'velocity' },
  { id: 'R002', name: 'Clipboard Paste Detection', description: 'UPI ID or amount pasted from clipboard', riskPoints: 15, category: 'clipboard' },
  { id: 'R003', name: 'Excessive Focus Switching', description: 'Focus switched more than 5 times during session', riskPoints: 25, category: 'focus' },
  { id: 'R004', name: 'High-Value New Beneficiary', description: 'Large amount sent to newly added beneficiary', riskPoints: 30, category: 'beneficiary' },
  { id: 'R005', name: 'Direct Transfer Navigation', description: 'User navigated directly to transfer page after login', riskPoints: 20, category: 'navigation' },
  { id: 'R006', name: 'Social Engineering Pattern', description: 'Frequent focus switching + long pauses + guided interaction', riskPoints: 35, category: 'social' },
  { id: 'R007', name: 'Transaction Hesitation', description: 'Unusual hesitation patterns before confirming transfer', riskPoints: 10, category: 'hesitation' },
  { id: 'R008', name: 'Rapid Amount Changes', description: 'Amount field modified multiple times rapidly', riskPoints: 12, category: 'velocity' },
];
