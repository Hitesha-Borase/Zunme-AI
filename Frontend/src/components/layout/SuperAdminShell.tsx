import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Settings,
  CreditCard,
  FileText,
  LogOut,
  Menu,
  X,
  ShieldAlert,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './SuperAdminShell.css';

export const SuperAdminShell: React.FC = () => {
  const { user, logout, toggleRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/super-admin/users')) return 'Platform Users & Roles';
    if (path.includes('/super-admin/settings')) return 'Global Platform Configuration';
    if (path.includes('/super-admin/plans')) return 'Plans & Subscription Pricing';
    if (path.includes('/super-admin/audit-logs')) return 'Administrative Audit Logs';
    return 'Super Admin Executive Dashboard';
  };

  return (
    <div className="superadmin-shell">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="superadmin-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar: STRICTLY 5 Menu Items + Logout */}
      <aside className={`superadmin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="superadmin-brand-section">
          <NavLink to="/" className="superadmin-brand-link">
            <div className="superadmin-badge-icon">
              <ShieldAlert size={18} />
            </div>
            <div className="superadmin-brand-text">
              <span className="brand-title">ZUNME AI</span>
              <span className="brand-tier-badge">SUPER ADMIN</span>
            </div>
          </NavLink>
          <button
            className="btn-ghost hide-on-desktop"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="superadmin-status-box">
          <div className="status-indicator-dot" />
          <div className="status-meta">
            <span className="status-title">Root Governance</span>
            <span className="status-desc">Strict Platform Scope</span>
          </div>
        </div>

        {/* The 5 Required Menu Items */}
        <nav className="superadmin-nav" aria-label="Super Admin Navigation">
          <NavLink
            to="/super-admin"
            end
            className={({ isActive }) => `superadmin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/super-admin/users"
            className={({ isActive }) => `superadmin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Users size={18} />
            <span>Users</span>
          </NavLink>

          <NavLink
            to="/super-admin/settings"
            className={({ isActive }) => `superadmin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>

          <NavLink
            to="/super-admin/plans"
            className={({ isActive }) => `superadmin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <CreditCard size={18} />
            <span>Plans & Pricing</span>
          </NavLink>

          <NavLink
            to="/super-admin/audit-logs"
            className={({ isActive }) => `superadmin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <FileText size={18} />
            <span>Audit Logs</span>
          </NavLink>
        </nav>

        {/* Sidebar Footer with Logout */}
        <div className="superadmin-footer">
          <button
            className="superadmin-logout-btn"
            onClick={handleLogout}
            title="Sign out of Super Admin"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>

          <div className="superadmin-user-card">
            <div className="superadmin-avatar">
              {user?.fullName?.charAt(0) || 'S'}
            </div>
            <div className="superadmin-user-info">
              <span className="user-name">{user?.fullName || 'Super Administrator'}</span>
              <span className="user-role-label">Platform Root Owner</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main View Canvas */}
      <div className="superadmin-main">
        {/* Top Header */}
        <header className="superadmin-topbar">
          <div className="topbar-left">
            <button
              className="btn-ghost hide-on-desktop"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div>
              <div className="superadmin-breadcrumb">Super Admin / Platform Governance</div>
              <h1 className="superadmin-page-heading">{getPageTitle()}</h1>
            </div>
          </div>

          <div className="topbar-right">
            {/* Quick switcher to User Workspace & Admin */}
            <button
              className="btn btn-outline btn-sm hide-on-mobile"
              onClick={toggleRole}
              title="Toggle current user role"
            >
              Role: <strong>{user?.role || 'SUPER_ADMIN'}</strong>
            </button>

            <NavLink to="/admin" className="btn btn-secondary btn-sm hide-on-mobile">
              <span>Admin Operations</span>
            </NavLink>

            <NavLink to="/app" className="btn btn-primary btn-sm">
              <ArrowLeft size={14} />
              <span>Workspace</span>
            </NavLink>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="superadmin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
