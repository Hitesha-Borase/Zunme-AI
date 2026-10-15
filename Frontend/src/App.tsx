import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ChatPage } from './pages/ChatPage';
import { SearchPage } from './pages/SearchPage';
import { StudioPage } from './pages/StudioPage';
import { LibraryPage } from './pages/LibraryPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPage } from './pages/AdminPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Authenticated Workspace Routes */}
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Navigate to="/app/chat" replace />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="studio" element={<StudioPage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Admin Operational Console */}
          <Route path="/admin" element={<AppShell />}>
            <Route index element={<AdminPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
