import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dashboard } from './components/Dashboard';
import { AdminPanel } from './components/AdminPanel';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastContainer } from './components/ui/toast';
import { useToast } from './hooks/useToast';
import { Button } from './components/ui/button';

const queryClient = new QueryClient();

type View = 'dashboard' | 'admin' | 'login' | 'register';

const AppContent = () => {
  const { user, logout, isAdmin } = useAuth();
  const { toasts, showToast, removeToast } = useToast();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleLoginSuccess = () => {
    setShowAuth(false);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    logout();
    setCurrentView('dashboard');
    showToast('Logged out successfully', 'info');
  };

  return (
    <div className="min-h-screen">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <header className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 shadow-2xl">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-5xl">🍭</span>
                <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                  Sweet Shop
                </h1>
              </div>
              <p className="text-purple-100 mt-2 text-lg">Your one-stop shop for delicious treats!</p>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <span className="text-white font-medium">👤 {user.email}</span>
                  {isAdmin && (
                    <Button
                      onClick={() => setCurrentView(currentView === 'admin' ? 'dashboard' : 'admin')}
                      variant="outline"
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                    >
                      {currentView === 'admin' ? '🏠 Dashboard' : '🛠️ Admin Panel'}
                    </Button>
                  )}
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setShowAuth(true);
                    setAuthMode('login');
                  }}
                  variant="outline"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                >
                  Login / Register
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 px-4">
        {showAuth ? (
          <div className="flex items-center justify-center min-h-[500px]">
            {authMode === 'login' ? (
              <LoginForm
                onSwitchToRegister={() => setAuthMode('register')}
                onSuccess={handleLoginSuccess}
              />
            ) : (
              <RegisterForm
                onSwitchToLogin={() => setAuthMode('login')}
                onSuccess={handleLoginSuccess}
              />
            )}
          </div>
        ) : currentView === 'admin' && isAdmin ? (
          <AdminPanel />
        ) : (
          <Dashboard />
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

