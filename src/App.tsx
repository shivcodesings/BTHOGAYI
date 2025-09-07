import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './lib/store';
import { AuthGuard } from './components/auth/auth-guard';

// Pages
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import CommunitiesPage from './pages/CommunitiesPage';
import SmartMatchPage from './pages/SmartMatchPage';
import MessagesPage from './pages/MessagesPage';
import IntroductionsPage from './pages/IntroductionsPage';
import DiscoverPage from './pages/DiscoverPage';
import SettingsPage from './pages/SettingsPage';
import AuthCallbackPage from './pages/AuthCallbackPage';

function App() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          
          {/* Protected routes */}
          <Route path="/onboarding" element={
            <AuthGuard>
              <OnboardingPage />
            </AuthGuard>
          } />
          <Route path="/dashboard" element={
            <AuthGuard>
              <DashboardPage />
            </AuthGuard>
          } />
          <Route path="/profile" element={
            <AuthGuard>
              <ProfilePage />
            </AuthGuard>
          } />
          <Route path="/communities" element={
            <AuthGuard>
              <CommunitiesPage />
            </AuthGuard>
          } />
          <Route path="/match" element={
            <AuthGuard>
              <SmartMatchPage />
            </AuthGuard>
          } />
          <Route path="/messages" element={
            <AuthGuard>
              <MessagesPage />
            </AuthGuard>
          } />
          <Route path="/introductions" element={
            <AuthGuard>
              <IntroductionsPage />
            </AuthGuard>
          } />
          <Route path="/discover" element={
            <AuthGuard>
              <DiscoverPage />
            </AuthGuard>
          } />
          <Route path="/settings" element={
            <AuthGuard>
              <SettingsPage />
            </AuthGuard>
          } />
          
          {/* Legacy route redirects */}
          <Route path="/connect" element={<Navigate to="/communities" replace />} />
          <Route path="/dating" element={<Navigate to="/match" replace />} />
          <Route path="/shipping" element={<Navigate to="/introductions" replace />} />
          <Route path="/daily-match" element={<Navigate to="/discover" replace />} />
          
          {/* Redirect authenticated users from auth page */}
          <Route path="/auth" element={
            user ? <Navigate to="/dashboard" replace /> : <AuthPage />
          } />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;