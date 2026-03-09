import { useTranslation } from 'react-i18next';
import './i18n';
import { useState, useEffect, useRef } from 'react';
import { 
  Power, 
  Crosshair, 
  Mic, 
  MousePointerClick, 
  Keyboard, 
  Activity,
  Zap,
  Shield,
  Cpu,
  Target,
  Scan,
  Volume2,
  Gamepad2,
  Menu,
  X,
  Sparkles,
  Crown,
  Terminal,
  Lock,
  User,
  CreditCard,
  DollarSign,
  TrendingUp,
  Users,
  LogOut,
  EyeOff,
  Fingerprint,
  Key,
  Wallet,
  Gift,
  BarChart3,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import './App.css';

// ============== TYPES ==============
interface UserProfile {
  snapchat: string;
  Support: string;
  name: string;
  title: string;
}

interface FeatureState {
  enabled: boolean;
  intensity: number;
  sensitivity: number;
}

interface SystemStatus {
  cpu: number;
  memory: number;
  fps: number;
  latency: number;
}

interface UserData {
  id: string;
  username: string;
  subscription: 'free' | 'basic' | 'premium' | 'elite';
  expiryDate: string;
}

interface DeveloperStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  donations: number;
  subscriptions: {
    basic: number;
    premium: number;
    elite: number;
  };
  monthlyRevenue: number[];
}

// ============== CONSTANTS ==============
const DEVELOPER_CREDENTIALS = {
  username: 'AFTH966',
  password: '67657617',
  name: 'عبدالله المضيان',
  title: 'Elite Developer'
};

const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29.99,
    duration: 'شهر',
    features: ['Aim Assist', 'Screen Analysis', 'Voice Assistant'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 79.99,
    duration: '3 أشهر',
    features: ['كل مميزات Basic', 'Auto Actions', 'Stealth Mode', 'Priority Support'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 199.99,
    duration: 'سنة',
    features: ['كل المميزات', 'Anti-Ban Protection', 'Custom Scripts', 'Lifetime Updates'],
    color: 'from-yellow-400 to-orange-500'
  }
];

const BANK_ACCOUNTS = [
  {
    bank: 'بنك الراجحي',
    accountName: 'عبدالله العنزي',
    accountNumber: 'SA6680000026608010167519',
    iban: 'SA66 8000 0026 6080 1016 7519'
  }
];

// ============== MAIN APP ==============
function App() {
const { t } = useTranslation();
  // ========== AUTH STATE ==========
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  // ========== APP STATE ==========
  const [isActive, setIsActive] = useState(false);
  const [selectedGame, setSelectedGame] = useState('FPS Games');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stealthMode, setStealthMode] = useState(true);
  const [antiDetection, setAntiDetection] = useState(true);
  const [hwidLocked, setHwidLocked] = useState(true);
  
  // ========== FEATURE STATES ==========
  const [aimAssist, setAimAssist] = useState<FeatureState>({
    enabled: false,
    intensity: 75,
    sensitivity: 50
  });
  
  const [screenAnalysis, setScreenAnalysis] = useState<FeatureState>({
    enabled: false,
    intensity: 80,
    sensitivity: 60
  });
  
  const [voiceAssistant, setVoiceAssistant] = useState<FeatureState>({
    enabled: false,
    intensity: 70,
    sensitivity: 40
  });
  
  const [automation, setAutomation] = useState<FeatureState>({
    enabled: false,
    intensity: 60,
    sensitivity: 50
  });
  
  // ========== HOTKEYS ==========
  const [hotkeys] = useState({
    toggle: 'F1',
    aimLock: 'F2',
    screenScan: 'F3',
    voiceCmd: 'F4',
    panicKey: 'DELETE'
  });
  
  // ========== SYSTEM STATUS ==========
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    cpu: 15,
    memory: 32,
    fps: 144,
    latency: 12
  });
  
  // ========== ACTIVITY LOG ==========
  const [activityLog, setActivityLog] = useState<string[]>([
    '🔐 System initialized with encryption',
    '🛡️ Anti-detection modules loaded',
    '⏳ Waiting for authentication...'
  ]);
  
  // ========== DEVELOPER STATS ==========
  const [devStats] = useState<DeveloperStats>({
    totalUsers: 1247,
    activeUsers: 892,
    totalRevenue: 45680.50,
    donations: 3250.00,
    subscriptions: {
      basic: 456,
      premium: 312,
      elite: 124
    },
    monthlyRevenue: [3200, 4100, 3800, 5200, 4800, 6100, 5500, 7200, 6800, 8100, 7600, 8900]
  });

  // ========== SUBSCRIPTION DIALOG ==========
  const [showSubscription, setShowSubscription] = useState(false);
  const [showDeveloperPanel, setShowDeveloperPanel] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof SUBSCRIPTION_PLANS[0] | null>(null);

  const logEndRef = useRef<HTMLDivElement>(null);

  // ========== EFFECTS ==========
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activityLog]);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(10, Math.min(90, prev.memory + (Math.random() - 0.5) * 5)),
        fps: Math.max(60, Math.min(240, prev.fps + Math.floor((Math.random() - 0.5) * 10))),
        latency: Math.max(5, Math.min(50, prev.latency + Math.floor((Math.random() - 0.5) * 3)))
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  // ========== HELPERS ==========
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setActivityLog(prev => [...prev.slice(-20), `[${timestamp}] ${message}`]);
  };

  const encryptLog = (message: string) => {
    // Simulate encryption
    return `🔒 ${message}`;
  };

  // ========== AUTH HANDLERS ==========
  const handleLogin = () => {
    // Check developer credentials
    if (loginForm.username === DEVELOPER_CREDENTIALS.username && 
        loginForm.password === DEVELOPER_CREDENTIALS.password) {
      setIsDeveloper(true);
      setIsAuthenticated(true);
      setShowLogin(false);
      setCurrentUser({
        id: 'DEV-001',
        username: DEVELOPER_CREDENTIALS.username,
        subscription: 'elite',
        expiryDate: 'Lifetime'
      });
      addLog('🔐 Developer authentication successful');
      addLog('👑 Developer privileges granted');
      toast.success(`Welcome back, ${DEVELOPER_CREDENTIALS.name}!`);
      return;
    }

    // Check user credentials (demo)
    if (loginForm.username && loginForm.password) {
      setIsAuthenticated(true);
      setShowLogin(false);
      setCurrentUser({
        id: 'USR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        username: loginForm.username,
        subscription: 'premium',
        expiryDate: '2025-12-31'
      });
      addLog('✅ User authentication successful');
      addLog('🔓 Access granted');
      toast.success('Welcome back!');
    } else {
      toast.error('Invalid credentials');
      addLog('❌ Authentication failed');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsDeveloper(false);
    setShowLogin(true);
    setIsActive(false);
    setCurrentUser(null);
    addLog('👋 User logged out');
    toast.info('Logged out successfully');
  };

  // ========== FEATURE HANDLERS ==========
  const toggleMain = () => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      return;
    }
    const newState = !isActive;
    setIsActive(newState);
    addLog(encryptLog(newState ? 'AI Assistant ACTIVATED' : 'AI Assistant DEACTIVATED'));
    toast.success(newState ? 'Game AI Assistant Activated!' : 'Game AI Assistant Deactivated');
  };

  const toggleFeature = (feature: string, currentState: FeatureState, setState: React.Dispatch<React.SetStateAction<FeatureState>>) => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      return;
    }
    const newEnabled = !currentState.enabled;
    setState({ ...currentState, enabled: newEnabled });
    addLog(encryptLog(`${feature} ${newEnabled ? 'ENABLED' : 'DISABLED'}`));
    toast.info(`${feature} ${newEnabled ? 'Enabled' : 'Disabled'}`);
  };

  const games = ['FPS Games', 'Battle Royale', 'MOBA', 'Racing', 'Strategy', 'RPG'];

  // ========== LOGIN SCREEN ==========
  if (showLogin) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-4">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          
          <Card className="w-full max-w-md bg-black/80 border-white/10 backdrop-blur-xl relative z-10">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center neon-glow">
                  <Lock className="w-10 h-10 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gradient">AI-G KSA</CardTitle>
              <p className="text-gray-400 mt-2">Secure Authentication Required</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input 
                    type="text"
                    placeholder="Enter username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                    className="pl-10 bg-white/5 border-white/10 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Password</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input 
                    type="password"
                    placeholder="Enter password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="pl-10 bg-white/5 border-white/10 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <p className="text-xs text-yellow-400">
                  This software is protected by encryption. Unauthorized access is prohibited.
                </p>
              </div>
              
              <Button 
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-6"
              >
                <Fingerprint className="w-5 h-5 mr-2" />
                Authenticate
              </Button>

              <div className="text-center">
                <button 
                  onClick={() => setShowSubscription(true)}
                  className="text-sm text-cyan-400 hover:text-cyan-300 underline"
                >
                  Don't have an account? Subscribe now
                </button>
              </div>

              <div className="pt-4 border-t border-white/10 text-center">
                <p className="text-xs text-gray-500">
                  © 2024 abdullah farhan alanazi • Developed by {DEVELOPER_CREDENTIALS.name}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Dialog */}
          <Dialog open={showSubscription} onOpenChange={setShowSubscription}>
            <DialogContent className="bg-black/95 border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl text-center text-gradient">
                  Choose Your Plan
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <Card key={plan.id} className="bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all">
                    <CardHeader>
                      <div className={`w-full h-2 rounded-full bg-gradient-to-r ${plan.color}`} />
                      <CardTitle className="text-xl text-center mt-4">{plan.name}</CardTitle>
                      <div className="text-center">
                        <span className="text-3xl font-bold text-white">${plan.price}</span>
                        <span className="text-gray-400"> / {plan.duration}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        onClick={() => {
                          setSelectedPlan(plan);
                          setShowSubscription(false);
                          setShowPaymentDialog(true);
                        }}
                        className={`w-full bg-gradient-to-r ${plan.color} text-white`}
                      >
                        Subscribe Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Payment Dialog */}
          <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
            <DialogContent className="bg-black/95 border-white/10 max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-xl text-center text-gradient">
                  Complete Your Payment
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {selectedPlan && (
                  <div className="p-4 bg-white/5 rounded-lg text-center">
                    <p className="text-gray-400">Selected Plan</p>
                    <p className="text-xl font-bold text-white">{selectedPlan.name}</p>
                    <p className="text-2xl font-bold text-cyan-400">${selectedPlan.price}</p>
                  </div>
                )}
                
                <div className="space-y-3">
                  <p className="text-sm text-gray-400">Bank Transfer Options:</p>
                  {BANK_ACCOUNTS.map((account, i) => (
                    <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <p className="font-bold text-white">{account.bank}</p>
                      <p className="text-sm text-gray-400">Account: {account.accountName}</p>
                      <p className="text-sm text-cyan-400 font-mono">{account.iban}</p>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-sm text-yellow-400 text-center">
                    After payment, contact developer with proof of payment
                  </p>
                </div>

                <Button 
                  onClick={() => {
                    setShowPaymentDialog(false);
                    toast.success('Payment instructions sent to your email!');
                  }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600"
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  I've Completed Payment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </TooltipProvider>
    );
  }

  // ========== DEVELOPER PANEL ==========
  if (isDeveloper && showDeveloperPanel) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-[#0a0c10] text-white grid-bg">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          {/* Header */}
          <header className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gradient">Developer Dashboard</h1>
                    <p className="text-xs text-gray-400">{DEVELOPER_CREDENTIALS.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowDeveloperPanel(false)}
                    className="border-white/10"
                  >
                    Back to App
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Developer Content */}
          <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-black/50 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{t('total_users')}</p>
                      <p className="text-3xl font-bold text-white">{devStats.totalUsers.toLocaleString()}</p>
                    </div>
                    <Users className="w-10 h-10 text-cyan-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/50 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Active Users</p>
                      <p className="text-3xl font-bold text-green-400">{devStats.activeUsers.toLocaleString()}</p>
                    </div>
                    <Activity className="w-10 h-10 text-green-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/50 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Revenue</p>
                      <p className="text-3xl font-bold text-cyan-400">${devStats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-10 h-10 text-cyan-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/50 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Donations</p>
                      <p className="text-3xl font-bold text-pink-400">${devStats.donations.toLocaleString()}</p>
                    </div>
                    <Gift className="w-10 h-10 text-pink-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Subscriptions Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="bg-black/50 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-cyan-400" />
                    Subscription Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-blue-400">Basic</span>
                        <span className="text-white">{devStats.subscriptions.basic} users</span>
                      </div>
                      <Progress value={(devStats.subscriptions.basic / devStats.totalUsers) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-purple-400">Premium</span>
                        <span className="text-white">{devStats.subscriptions.premium} users</span>
                      </div>
                      <Progress value={(devStats.subscriptions.premium / devStats.totalUsers) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-yellow-400">Elite</span>
                        <span className="text-white">{devStats.subscriptions.elite} users</span>
                      </div>
                      <Progress value={(devStats.subscriptions.elite / devStats.totalUsers) * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Monthly Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between h-40 gap-2">
                    {devStats.monthlyRevenue.map((revenue, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-cyan-500 to-purple-500 rounded-t"
                          style={{ height: `${(revenue / 10000) * 100}%` }}
                        />
                        <span className="text-xs text-gray-500 mt-1">{i + 1}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-gray-400 mt-4">
                    Total: ${devStats.monthlyRevenue.reduce((a, b) => a + b, 0).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Bank Accounts */}
            <Card className="bg-black/50 border-white/10 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-cyan-400" />
                  Your Bank Accounts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {BANK_ACCOUNTS.map((account, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <p className="font-bold text-white text-lg">{account.bank}</p>
                      <Separator className="my-2" />
                      <p className="text-sm text-gray-400">Account Name</p>
                      <p className="text-white font-medium">{account.accountName}</p>
                      <p className="text-sm text-gray-400 mt-2">IBAN</p>
                      <p className="text-cyan-400 font-mono">{account.iban}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Developer Info */}
            <Card className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">AF</span>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-white">{DEVELOPER_CREDENTIALS.name}</p>
                      <p className="text-cyan-400">@{DEVELOPER_CREDENTIALS.username}</p>
                      <p className="text-gray-400 text-sm">{DEVELOPER_CREDENTIALS.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
                      <Shield className="w-4 h-4 mr-2" />
                      Verified Developer
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </TooltipProvider>
    );
  }

  // ========== MAIN APP ==========
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#0a0c10] text-white grid-bg overflow-x-hidden">
        {/* Animated background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Header */}
        <header className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center neon-glow">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse ${isActive ? 'bg-green-500' : 'bg-yellow-500'}`} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gradient"> AI-G KSA </h1>
                  <p className="text-xs text-gray-400">v2.0.1 • {currentUser?.subscription.toUpperCase()}</p>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <a href="#control" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Control</a>
                <a href="#aim" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Aim Assist</a>
                <a href="#analysis" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Analysis</a>
                <a href="#protection" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Protection</a>
                <a href="#settings" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">Settings</a>
              </nav>
              
              {/* User Actions */}
              <div className="hidden md:flex items-center gap-4">
                {isDeveloper && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowDeveloperPanel(true)}
                    className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Dev Panel
                  </Button>
                )}
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${isActive ? 'text-green-400' : 'text-gray-400'}`}>
                    {isActive ? 'ACTIVE' : 'STANDBY'}
                  </span>
                  <Switch 
                    checked={isActive} 
                    onCheckedChange={toggleMain}
                    className="data-[state=checked]:bg-green-500"
                  />
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl">
              <div className="px-4 py-4 space-y-3">
                <a href="#control" className="block py-2 text-gray-400 hover:text-cyan-400">Control Panel</a>
                <a href="#aim" className="block py-2 text-gray-400 hover:text-cyan-400">Aim Assist</a>
                <a href="#analysis" className="block py-2 text-gray-400 hover:text-cyan-400">Screen Analysis</a>
                <a href="#protection" className="block py-2 text-gray-400 hover:text-cyan-400">Protection</a>
                {isDeveloper && (
                  <button onClick={() => setShowDeveloperPanel(true)} className="block py-2 text-yellow-400">
                    Developer Panel
                  </button>
                )}
                <div className="flex items-center justify-between py-2">
                  <span className={isActive ? 'text-green-400' : 'text-gray-400'}>
                    {isActive ? 'ACTIVE' : 'STANDBY'}
                  </span>
                  <Switch checked={isActive} onCheckedChange={toggleMain} />
                </div>
                <button onClick={handleLogout} className="block py-2 text-red-400">Logout</button>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* User Info Bar */}
          <div className="mb-6 flex flex-wrap items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-gray-400">Welcome,</span>
              <span className="text-sm font-bold text-white">{currentUser?.username}</span>
            </div>
            <Separator orientation="vertical" className="h-6 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-400">Plan:</span>
              <Badge className={`${
                currentUser?.subscription === 'elite' ? 'bg-yellow-500/20 text-yellow-400' :
                currentUser?.subscription === 'premium' ? 'bg-purple-500/20 text-purple-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {currentUser?.subscription.toUpperCase()}
              </Badge>
            </div>
            <Separator orientation="vertical" className="h-6 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Expiry:</span>
              <span className="text-sm text-white">{currentUser?.expiryDate}</span>
            </div>
          </div>
          
          {/* Hero Section - Main Control */}
          <section id="control" className="mb-12">
            <div className="glass-panel rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  {/* Left side - Status */}
                  <div className="text-center lg:text-left">
                    <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI-Powered Gaming Assistant
                    </Badge>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                      <span className={isActive ? 'text-green-400' : 'text-gray-400'}>
                        {isActive ? 'System Active' : 'System Standby'}
                      </span>
                    </h2>
                    <p className="text-gray-400 max-w-md">
                      Advanced AI assistant with military-grade encryption and anti-detection technology.
                    </p>
                    
                    {/* Protection Status */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge className={`${stealthMode ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        <EyeOff className="w-3 h-3 mr-1" />
                        Stealth Mode
                      </Badge>
                      <Badge className={`${antiDetection ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        <Shield className="w-3 h-3 mr-1" />
                        Anti-Detection
                      </Badge>
                      <Badge className={`${hwidLocked ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        <Lock className="w-3 h-3 mr-1" />
                        HWID Locked
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Center - Big Toggle */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={toggleMain}
                      className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 neon-glow-green scale-110' 
                          : 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600'
                      }`}
                    >
                      <Power className={`w-16 h-16 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    </button>
                    <p className="mt-4 text-sm text-gray-400">
                      Press <kbd className="px-2 py-1 bg-gray-800 rounded text-cyan-400">{hotkeys.toggle}</kbd> to toggle
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      Panic Key: <kbd className="px-2 py-1 bg-red-900/50 rounded text-red-400">{hotkeys.panicKey}</kbd>
                    </p>
                  </div>
                  
                  {/* Right side - System Stats */}
                  <div className="w-full lg:w-80 space-y-4">
                    <Card className="bg-black/50 border-white/10">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400 flex items-center gap-2">
                            <Cpu className="w-4 h-4" /> CPU
                          </span>
                          <span className="text-sm font-mono">{systemStatus.cpu.toFixed(0)}%</span>
                        </div>
                        <Progress value={systemStatus.cpu} className="h-2" />
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400 flex items-center gap-2">
                            <Activity className="w-4 h-4" /> Memory
                          </span>
                          <span className="text-sm font-mono">{systemStatus.memory.toFixed(0)}%</span>
                        </div>
                        <Progress value={systemStatus.memory} className="h-2" />
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400 flex items-center gap-2">
                            <Zap className="w-4 h-4" /> FPS
                          </span>
                          <span className="text-sm font-mono text-green-400">{systemStatus.fps}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400 flex items-center gap-2">
                            <Target className="w-4 h-4" /> Latency
                          </span>
                          <span className={`text-sm font-mono ${systemStatus.latency < 20 ? 'text-green-400' : 'text-yellow-400'}`}>
                            {systemStatus.latency}ms
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Game Selector */}
          <section className="mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-gray-400">Game Profile:</span>
              {games.map((game) => (
                <button
                  key={game}
                  onClick={() => {
                    setSelectedGame(game);
                    addLog(`Game profile changed to: ${game}`);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedGame === game
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {game}
                </button>
              ))}
            </div>
          </section>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            
            {/* Aim Assist */}
            <section id="aim">
              <Card className={`bg-black/50 border-white/10 transition-all duration-300 ${aimAssist.enabled ? 'neon-glow' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                        aimAssist.enabled ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-800 text-gray-400'
                      }`}>
                        <Crosshair className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Aim Assist</CardTitle>
                        <p className="text-xs text-gray-400">Precision targeting assistance</p>
                      </div>
                    </div>
                    <Switch 
                      checked={aimAssist.enabled} 
                      onCheckedChange={() => toggleFeature('Aim Assist', aimAssist, setAimAssist)}
                      disabled={!isActive}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Assist Strength</span>
                      <span className="text-sm font-mono">{aimAssist.intensity}%</span>
                    </div>
                    <Slider 
                      value={[aimAssist.intensity]} 
                      onValueChange={([v]) => setAimAssist({...aimAssist, intensity: v})}
                      max={100} 
                      step={1}
                      disabled={!aimAssist.enabled || !isActive}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Smoothness</span>
                      <span className="text-sm font-mono">{aimAssist.sensitivity}%</span>
                    </div>
                    <Slider 
                      value={[aimAssist.sensitivity]} 
                      onValueChange={([v]) => setAimAssist({...aimAssist, sensitivity: v})}
                      max={100} 
                      step={1}
                      disabled={!aimAssist.enabled || !isActive}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Badge variant="outline" className="text-xs">
                      <kbd className="mr-1">{hotkeys.aimLock}</kbd> Aim Lock
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Screen Analysis */}
            <section id="analysis">
              <Card className={`bg-black/50 border-white/10 transition-all duration-300 ${screenAnalysis.enabled ? 'neon-glow-purple' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                        screenAnalysis.enabled ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-800 text-gray-400'
                      }`}>
                        <Scan className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Screen Analysis</CardTitle>
                        <p className="text-xs text-gray-400">Real-time object detection</p>
                      </div>
                    </div>
                    <Switch 
                      checked={screenAnalysis.enabled} 
                      onCheckedChange={() => toggleFeature('Screen Analysis', screenAnalysis, setScreenAnalysis)}
                      disabled={!isActive}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Detection Range</span>
                      <span className="text-sm font-mono">{screenAnalysis.intensity}%</span>
                    </div>
                    <Slider 
                      value={[screenAnalysis.intensity]} 
                      onValueChange={([v]) => setScreenAnalysis({...screenAnalysis, intensity: v})}
                      max={100} 
                      step={1}
                      disabled={!screenAnalysis.enabled || !isActive}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Scan Frequency</span>
                      <span className="text-sm font-mono">{screenAnalysis.sensitivity}Hz</span>
                    </div>
                    <Slider 
                      value={[screenAnalysis.sensitivity]} 
                      onValueChange={([v]) => setScreenAnalysis({...screenAnalysis, sensitivity: v})}
                      max={144} 
                      step={1}
                      disabled={!screenAnalysis.enabled || !isActive}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <Badge variant="outline" className="text-xs justify-center">Enemies</Badge>
                    <Badge variant="outline" className="text-xs justify-center">Items</Badge>
                    <Badge variant="outline" className="text-xs justify-center">Objectives</Badge>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Voice Assistant */}
            <section id="voice">
              <Card className={`bg-black/50 border-white/10 transition-all duration-300 ${voiceAssistant.enabled ? 'neon-glow-green' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                        voiceAssistant.enabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-400'
                      }`}>
                        <Volume2 className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Voice Assistant</CardTitle>
                        <p className="text-xs text-gray-400">Audio alerts & commands</p>
                      </div>
                    </div>
                    <Switch 
                      checked={voiceAssistant.enabled} 
                      onCheckedChange={() => toggleFeature('Voice Assistant', voiceAssistant, setVoiceAssistant)}
                      disabled={!isActive}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Volume</span>
                      <span className="text-sm font-mono">{voiceAssistant.intensity}%</span>
                    </div>
                    <Slider 
                      value={[voiceAssistant.intensity]} 
                      onValueChange={([v]) => setVoiceAssistant({...voiceAssistant, intensity: v})}
                      max={100} 
                      step={1}
                      disabled={!voiceAssistant.enabled || !isActive}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Alert Frequency</span>
                      <span className="text-sm font-mono">{voiceAssistant.sensitivity}%</span>
                    </div>
                    <Slider 
                      value={[voiceAssistant.sensitivity]} 
                      onValueChange={([v]) => setVoiceAssistant({...voiceAssistant, sensitivity: v})}
                      max={100} 
                      step={1}
                      disabled={!voiceAssistant.enabled || !isActive}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Badge variant="outline" className="text-xs">
                      <Mic className="w-3 h-3 mr-1" /> Voice Commands
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Automation */}
            <section id="automation">
              <Card className={`bg-black/50 border-white/10 transition-all duration-300 ${automation.enabled ? 'neon-glow' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                        automation.enabled ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-800 text-gray-400'
                      }`}>
                        <MousePointerClick className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Auto Actions</CardTitle>
                        <p className="text-xs text-gray-400">Smart automation & macros</p>
                      </div>
                    </div>
                    <Switch 
                      checked={automation.enabled} 
                      onCheckedChange={() => toggleFeature('Auto Actions', automation, setAutomation)}
                      disabled={!isActive}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Reaction Speed</span>
                      <span className="text-sm font-mono">{automation.intensity}ms</span>
                    </div>
                    <Slider 
                      value={[automation.intensity]} 
                      onValueChange={([v]) => setAutomation({...automation, intensity: v})}
                      max={200} 
                      step={5}
                      disabled={!automation.enabled || !isActive}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Precision</span>
                      <span className="text-sm font-mono">{automation.sensitivity}%</span>
                    </div>
                    <Slider 
                      value={[automation.sensitivity]} 
                      onValueChange={([v]) => setAutomation({...automation, sensitivity: v})}
                      max={100} 
                      step={1}
                      disabled={!automation.enabled || !isActive}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Badge variant="outline" className="text-xs justify-center">Auto-Reload</Badge>
                    <Badge variant="outline" className="text-xs justify-center">Quick-Switch</Badge>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Protection Settings */}
          <section id="protection" className="mb-12">
            <Card className="bg-black/50 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-400" />
                  <CardTitle>Protection Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Stealth Mode</p>
                      <p className="text-sm text-gray-400">Hide from anti-cheat systems</p>
                    </div>
                    <Switch 
                      checked={stealthMode} 
                      onCheckedChange={setStealthMode}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Anti-Detection</p>
                      <p className="text-sm text-gray-400">Advanced bypass techniques</p>
                    </div>
                    <Switch 
                      checked={antiDetection} 
                      onCheckedChange={setAntiDetection}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="font-medium text-white">HWID Lock</p>
                      <p className="text-sm text-gray-400">Device binding protection</p>
                    </div>
                    <Switch 
                      checked={hwidLocked} 
                      onCheckedChange={setHwidLocked}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Hotkeys & Activity Log */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            
            {/* Hotkeys */}
            <section id="settings" className="lg:col-span-1">
              <Card className="bg-black/50 border-white/10 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Keyboard className="w-5 h-5 text-cyan-400" />
                    <CardTitle className="text-lg">Hotkey Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(hotkeys).map(([action, key]) => (
                    <div key={action} className="flex items-center justify-between">
                      <span className="text-sm text-gray-400 capitalize">{action.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="px-3 py-1 bg-gray-800 rounded text-cyan-400 font-mono text-sm hover:bg-gray-700 transition-colors">
                            {key}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Locked by developer</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  ))}
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-400">Anti-Detection Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <EyeOff className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-400">Stealth Mode</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-400">Encrypted Connection</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Activity Log */}
            <section className="lg:col-span-2">
              <Card className="bg-black/50 border-white/10 h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Terminal className="w-5 h-5 text-purple-400" />
                      <CardTitle className="text-lg">Encrypted Activity Log</CardTitle>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setActivityLog(['Log cleared'])}
                      className="text-gray-400 hover:text-white"
                    >
                      Clear
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-black/70 rounded-lg p-4 h-48 overflow-y-auto font-mono text-sm space-y-1">
                    {activityLog.map((log, i) => (
                      <div key={i} className={`${
                        log.includes('ACTIVATED') || log.includes('ENABLED') ? 'text-green-400' :
                        log.includes('DEACTIVATED') || log.includes('DISABLED') ? 'text-red-400' :
                        log.includes('changed') ? 'text-yellow-400' :
                        log.includes('🔐') || log.includes('🔒') ? 'text-cyan-400' :
                        'text-gray-400'
                      }`}>
                        {log}
                      </div>
                    ))}
                    <div ref={logEndRef} />
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Premium Features Banner */}
          <section className="mb-12">
            <div className="glass-panel rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gradient">Elite Edition</h3>
                    <p className="text-gray-400">All premium features unlocked</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
                    <Gamepad2 className="w-4 h-4 mr-2" />
                    Compatible with All Games
                  </Badge>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Cpu className="w-6 h-6 text-cyan-400" />
                <span className="font-bold text-gradient">AI-G KSA</span>
              </div>
              <p className="text-sm text-gray-500">
                Advanced Gaming Assistant • Version 2.0.1
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Developed by</span>
                <span className="text-cyan-400 font-medium">{DEVELOPER_CREDENTIALS.name}</span>
                <span className="text-gray-400">(@{DEVELOPER_CREDENTIALS.username})</span>
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 text-center">
              <p className="text-xs text-gray-600">
                © 2024 AI-G KSA . All rights reserved. Protected by military-grade encryption.
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Unauthorized modification or distribution is strictly prohibited.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}

export default App;
