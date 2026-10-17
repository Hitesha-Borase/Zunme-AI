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
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ContactPage } from './pages/ContactPage';
import { PublicCreatorProfilePage } from './pages/creator/PublicCreatorProfilePage';

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
import { ZunmeStorePage } from './pages/store/ZunmeStorePage';
import { MerchantZonePage } from './pages/merchant/MerchantZonePage';
import { ZBoxPage } from './pages/zbox/ZBoxPage';
import { AdOnboardingWizard } from './pages/ads/AdOnboardingWizard';
import { AdFormatBuildersPage } from './pages/ads/AdFormatBuildersPage';
import { MVPPlatformsWorkspacePage } from './pages/mvp/MVPPlatformsWorkspacePage';

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

          {/* Legal & Contact Suite */}
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* General User Workspace (Canonical /user Routing) */}
          <Route path="/user" element={<AppShell />}>
            <Route index element={<UserHomePage />} />
            <Route path="home" element={<UserHomePage />} />
            <Route path="dashboard" element={<UserHomePage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="builders" element={<UserContentBuildersPage />} />
            <Route path="studio" element={<Navigate to="/user/builders" replace />} />
            <Route path="warehouse" element={<Navigate to="/warehouse/dashboard" replace />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="history" element={<UserHistoryPage />} />
            <Route path="usage" element={<UserUsagePlanPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="support" element={<UserHelpSupportPage />} />
          </Route>

          {/* Backward Compatibility: Redirect /app/* to /user/* */}
          <Route path="/app" element={<Navigate to="/user/dashboard" replace />} />
          <Route path="/app/home" element={<Navigate to="/user/home" replace />} />
          <Route path="/app/dashboard" element={<Navigate to="/user/dashboard" replace />} />
          <Route path="/app/chat" element={<Navigate to="/user/chat" replace />} />
          <Route path="/app/search" element={<Navigate to="/user/search" replace />} />
          <Route path="/app/builders" element={<Navigate to="/user/builders" replace />} />
          <Route path="/app/studio" element={<Navigate to="/user/builders" replace />} />
          <Route path="/app/warehouse" element={<Navigate to="/warehouse/dashboard" replace />} />
          <Route path="/app/library" element={<Navigate to="/user/library" replace />} />
          <Route path="/app/history" element={<Navigate to="/user/history" replace />} />
          <Route path="/app/usage" element={<Navigate to="/user/usage" replace />} />
          <Route path="/app/settings" element={<Navigate to="/user/settings" replace />} />
          <Route path="/app/support" element={<Navigate to="/user/support" replace />} />

          {/* Specialist Workspaces (Under AppShell) */}
          <Route path="/warehouse" element={<AppShell />}>
            <Route index element={<AIWarehousePage />} />
            <Route path="dashboard" element={<AIWarehousePage />} />
            <Route path=":section" element={<AIWarehousePage />} />
          </Route>

          <Route path="/creator" element={<AppShell />}>
            <Route index element={<CreatorStudioPage />} />
            <Route path="dashboard" element={<CreatorStudioPage />} />
            <Route path="marketplace" element={<CreatorStudioPage />} />
            <Route path="showcase" element={<CreatorStudioPage />} />
            <Route path="upload" element={<CreatorStudioPage />} />
            <Route path="publish" element={<CreatorStudioPage />} />
            <Route path="submissions" element={<CreatorStudioPage />} />
            <Route path="earnings" element={<CreatorStudioPage />} />
            <Route path="payouts" element={<CreatorStudioPage />} />
            <Route path="profile" element={<CreatorStudioPage />} />
            <Route path=":section" element={<CreatorStudioPage />} />
          </Route>

          {/* Public Creator Profile */}
          <Route path="/creator/:creatorId" element={<PublicCreatorProfilePage />} />
          <Route path="/creator/view/:creatorId" element={<PublicCreatorProfilePage />} />

          <Route path="/seo" element={<AppShell />}>
            <Route index element={<SEOWorkspacePage />} />
            <Route path="dashboard" element={<SEOWorkspacePage />} />
            <Route path=":section" element={<SEOWorkspacePage />} />
          </Route>

          <Route path="/business" element={<AppShell />}>
            <Route index element={<BusinessWorkspacePage />} />
            <Route path="dashboard" element={<BusinessWorkspacePage />} />
            <Route path="overview" element={<BusinessWorkspacePage />} />
            <Route path=":section" element={<BusinessWorkspacePage />} />
          </Route>

          {/* Zunme Store & Shop Suite */}
          <Route path="/store" element={<AppShell />}>
            <Route index element={<ZunmeStorePage />} />
            <Route path=":category" element={<ZunmeStorePage />} />
          </Route>
          <Route path="/shop" element={<Navigate to="/store" replace />} />

          {/* Zunme Merchant Zone Suite */}
          <Route path="/merchant-zone" element={<AppShell />}>
            <Route index element={<MerchantZonePage />} />
            <Route path=":section" element={<MerchantZonePage />} />
          </Route>
          <Route path="/merchant" element={<Navigate to="/merchant-zone" replace />} />

          {/* zBox Unified Webmail & Cross-Platform Sharing */}
          <Route path="/zbox" element={<AppShell />}>
            <Route index element={<ZBoxPage />} />
            <Route path=":folder" element={<ZBoxPage />} />
          </Route>

          <Route path="/ads" element={<AppShell />}>
            <Route index element={<ZunmeAdsPage />} />
            <Route path="dashboard" element={<ZunmeAdsPage />} />
            <Route path="overview" element={<ZunmeAdsPage />} />
            <Route path="onboarding" element={<AdOnboardingWizard />} />
            <Route path="formats" element={<AdFormatBuildersPage />} />
            <Route path="format-builders" element={<AdFormatBuildersPage />} />
            <Route path=":section" element={<ZunmeAdsPage />} />
          </Route>

          <Route path="/social" element={<AppShell />}>
            <Route index element={<SocialSchedulerPage />} />
            <Route path="dashboard" element={<SocialSchedulerPage />} />
            <Route path=":section" element={<SocialSchedulerPage />} />
          </Route>

          {/* MVP Platforms Workspace (Tasks 1 to 8: Most Visited Platforms Suite) */}
          <Route path="/user/mvp" element={<AppShell />}>
            <Route index element={<MVPPlatformsWorkspacePage />} />
            <Route path=":platform" element={<MVPPlatformsWorkspacePage />} />
          </Route>
          <Route path="/mvp" element={<Navigate to="/user/mvp" replace />} />
          <Route path="/mvp-tools" element={<Navigate to="/user/mvp" replace />} />

          {/* Admin Operations Console */}
          <Route path="/admin" element={<AdminShell />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
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
            <Route path="dashboard" element={<SuperAdminDashboardPage />} />
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
