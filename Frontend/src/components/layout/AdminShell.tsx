import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Wand2,
  Package,
  Sparkles,
  SearchCheck,
  BarChart3,
  LifeBuoy,
  Cpu,
  LogOut,
  Menu,
  X,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './AdminShell.css';

export const AdminShell: React.FC = () => {
  const { user, logout, toggleRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/?login=true');
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/admin/users')) return 'User Directory & Moderation';
    if (path.includes('/admin/tools')) return 'AI Tools & Content Workflows';
    if (path.includes('/admin/warehouse')) return 'AI Warehouse Moderation & Assets';
    if (path.includes('/admin/creators')) return 'Creator Management & Verification';
    if (path.includes('/admin/seo-marketing')) return 'SEO & Marketing Operational Hub';
    if (path.includes('/admin/reports')) return 'Platform Usage & Telemetry Reports';
    if (path.includes('/admin/support')) return 'Support Requests & Content Review';
    if (path.includes('/admin/integrations')) return 'Supported Engine & API Integrations';
    return 'Operations Command Dashboard';
  };

  return (
    <div className="admin-shell">
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="admin-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Admin Sidebar with the exact approved 9 Operational Items + Logout */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="admin-brand-section">
          <NavLink to="/" className="admin-brand-link">
            <div className="admin-badge-icon">
              <ShieldCheck size={18} />
            </div>
            <div className="admin-brand-text">
              <span className="brand-title">ZUNME AI</span>
              <span className="brand-tier-badge">OPERATIONS HUB</span>
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

        {/* Navigation Items */}
        <nav className="admin-nav" aria-label="Admin Operational Navigation">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Users size={17} />
            <span>User Management</span>
          </NavLink>

          <NavLink
            to="/admin/tools"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Wand2 size={17} />
            <span>AI Tools & Content</span>
          </NavLink>

          <NavLink
            to="/admin/warehouse"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Package size={17} />
            <span>AI Warehouse</span>
          </NavLink>

          <NavLink
            to="/admin/creators"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Sparkles size={17} />
            <span>Creator Management</span>
          </NavLink>

          <NavLink
            to="/admin/seo-marketing"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <SearchCheck size={17} />
            <span>SEO & Marketing</span>
          </NavLink>

          <NavLink
            to="/admin/reports"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <BarChart3 size={17} />
            <span>Reports & Analytics</span>
          </NavLink>

          <NavLink
            to="/admin/support"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <LifeBuoy size={17} />
            <span>Support & Moderation</span>
          </NavLink>

          <NavLink
            to="/admin/integrations"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Cpu size={17} />
            <span>Integrations</span>
          </NavLink>
        </nav>

        {/* Admin Footer & Logout */}
        <div className="admin-footer">
          <button className="admin-logout-btn" onClick={handleLogout} title="Sign out">
            <LogOut size={16} />
            <span>Logout</span>
          </button>

          <div className="admin-user-card">
            <div className="admin-avatar">{user?.fullName?.charAt(0) || 'A'}</div>
            <div className="admin-user-info">
              <span className="user-name">{user?.fullName || 'Operations Manager'}</span>
              <span className="user-role-label">Staff Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Operational View */}
      <div className="admin-main">
        {/* Top Header */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button
              className="btn-ghost hide-on-desktop"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div>
              <div className="admin-breadcrumb">Operations / Administration</div>
              <h1 className="admin-page-heading">{getPageTitle()}</h1>
            </div>
          </div>

          <div className="topbar-right">
            <span
              className="btn btn-outline btn-sm hide-on-mobile"
              style={{ cursor: 'default' }}
            >
              Role: <strong>{user?.role || 'ADMIN'}</strong>
            </span>

            {/* Commented out as requested:
            {user?.role === 'SUPER_ADMIN' && (
              <NavLink to="/super-admin" className="btn btn-secondary btn-sm hide-on-mobile">
                <span>Super Admin</span>
              </NavLink>
            )}

            <NavLink to="/app" className="btn btn-primary btn-sm">
              <ArrowLeft size={14} />
              <span>Workspace</span>
            </NavLink>
            */}
          </div>
        </header>

        {/* Content Outlet */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
