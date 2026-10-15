import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout Shells
import { AppShell } from './components/layout/AppShell';
import { AdminShell } from './components/layout/AdminShell';
import { SuperAdminShell } from './components/layout/SuperAdminShell';

// Public & Auth Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

// General User Pages
import { UserHomePage } from './pages/user/UserHomePage';
import { ChatPage } from './pages/ChatPage';
import { SearchPage } from './pages/SearchPage';
import { UserContentBuildersPage } from './pages/user/UserContentBuildersPage';
import { LibraryPage } from './pages/LibraryPage';
import { UserHistoryPage } from './pages/user/UserHistoryPage';
import { UserUsagePlanPage } from './pages/user/UserUsagePlanPage';
import { SettingsPage } from './pages/SettingsPage';
import { UserHelpSupportPage } from './pages/user/UserHelpSupportPage';

// Specialist Workspaces
import { AIWarehousePage } from './pages/warehouse/AIWarehousePage';
import { CreatorStudioPage } from './pages/creator/CreatorStudioPage';
import { SEOWorkspacePage } from './pages/seo/SEOWorkspacePage';
import { BusinessWorkspacePage } from './pages/business/BusinessWorkspacePage';
import { ZunmeAdsPage } from './pages/ads/ZunmeAdsPage';
import { SocialSchedulerPage } from './pages/social/SocialSchedulerPage';

// Admin Operations Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUserManagementPage } from './pages/admin/AdminUserManagementPage';
import { AdminAIToolsPage } from './pages/admin/AdminAIToolsPage';
import { AdminAIWarehousePage } from './pages/admin/AdminAIWarehousePage';
import { AdminCreatorManagementPage } from './pages/admin/AdminCreatorManagementPage';
import { AdminSEOMarketingPage } from './pages/admin/AdminSEOMarketingPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminSupportModerationPage } from './pages/admin/AdminSupportModerationPage';
import { AdminIntegrationsPage } from './pages/admin/AdminIntegrationsPage';

// Super Admin Governance Pages
import { SuperAdminDashboardPage } from './pages/super-admin/SuperAdminDashboardPage';
import { SuperAdminUsersPage } from './pages/super-admin/SuperAdminUsersPage';
import { SuperAdminSettingsPage } from './pages/super-admin/SuperAdminSettingsPage';
import { SuperAdminPlansPage } from './pages/super-admin/SuperAdminPlansPage';
import { SuperAdminAuditLogsPage } from './pages/super-admin/SuperAdminAuditLogsPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page (PROTECTED) */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication Suite */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* General User Workspace */}
          <Route path="/app" element={<AppShell />}>
            <Route index element={<UserHomePage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="builders" element={<UserContentBuildersPage />} />
            <Route path="studio" element={<Navigate to="/app/builders" replace />} />
            <Route path="warehouse" element={<Navigate to="/warehouse" replace />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="history" element={<UserHistoryPage />} />
            <Route path="usage" element={<UserUsagePlanPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="support" element={<UserHelpSupportPage />} />
          </Route>

          {/* Specialist Workspaces (Under AppShell) */}
          <Route path="/warehouse" element={<AppShell />}>
            <Route index element={<AIWarehousePage />} />
          </Route>

          <Route path="/creator" element={<AppShell />}>
            <Route index element={<CreatorStudioPage />} />
          </Route>

          <Route path="/seo" element={<AppShell />}>
            <Route index element={<SEOWorkspacePage />} />
          </Route>

          <Route path="/business" element={<AppShell />}>
            <Route index element={<BusinessWorkspacePage />} />
          </Route>

          <Route path="/ads" element={<AppShell />}>
            <Route index element={<ZunmeAdsPage />} />
          </Route>

          <Route path="/social" element={<AppShell />}>
            <Route index element={<SocialSchedulerPage />} />
          </Route>

          {/* Admin Operations Console */}
          <Route path="/admin" element={<AdminShell />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="users" element={<AdminUserManagementPage />} />
            <Route path="tools" element={<AdminAIToolsPage />} />
            <Route path="warehouse" element={<AdminAIWarehousePage />} />
            <Route path="creators" element={<AdminCreatorManagementPage />} />
            <Route path="seo-marketing" element={<AdminSEOMarketingPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="support" element={<AdminSupportModerationPage />} />
            <Route path="integrations" element={<AdminIntegrationsPage />} />
          </Route>

          {/* Super Admin Executive Hub (Strict 5 Menu Items + Logout) */}
          <Route path="/super-admin" element={<SuperAdminShell />}>
            <Route index element={<SuperAdminDashboardPage />} />
            <Route path="users" element={<SuperAdminUsersPage />} />
            <Route path="settings" element={<SuperAdminSettingsPage />} />
            <Route path="plans" element={<SuperAdminPlansPage />} />
            <Route path="audit-logs" element={<SuperAdminAuditLogsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
