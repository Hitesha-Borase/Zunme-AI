import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  MessageSquare,
  Search,
  PenTool,
  Package,
  Bookmark,
  Clock,
  CreditCard,
  Settings,
  LifeBuoy,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  SearchCheck,
  Briefcase,
  Megaphone,
  Plus,
  Menu,
  X,
  LogOut,
  Trash2,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './AppShell.css';

export const AppShell: React.FC = () => {
  const {
    user,
    logout,
    toggleRole,
    conversations,
    activeConversationId,
    selectConversation,
    createNewChat,
    deleteConversation
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [specializedOpen, setSpecializedOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/app' || path === '/app/') return 'Workspace Home';
    if (path.includes('/app/chat')) return 'Ask Zunme — AI Assistant';
    if (path.includes('/app/search')) return 'Live Web Search';
    if (path.includes('/app/builders') || path.includes('/app/studio')) return 'AI Content Builders (1,000+ Blueprints)';
    if (path.includes('/app/library')) return 'My Saved Library';
    if (path.includes('/app/history')) return 'Conversation History';
    if (path.includes('/app/usage')) return 'Account Usage & Plans';
    if (path.includes('/app/settings')) return 'Account Settings';
    if (path.includes('/app/support')) return 'Help & Documentation';
    if (path.includes('/warehouse')) return 'AI Warehouse';
    if (path.includes('/creator')) return 'Creator Studio';
    if (path.includes('/seo')) return 'SEO Professional Workspace';
    if (path.includes('/business')) return 'Small Business & Team Workspace';
    if (path.includes('/ads')) return 'Zunme Ads Platform (Future Module)';
    return 'Zunme AI Workspace';
  };

  const handleNewChatClick = () => {
    createNewChat();
    navigate('/app/chat');
    setMobileMenuOpen(false);
  };

  const handleSelectConv = (id: string) => {
    selectConversation(id);
    navigate('/app/chat');
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-shell">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`app-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-brand-section">
          <NavLink to="/" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
            <div className="brand-icon-box">Z</div>
            <span>Zunme AI</span>
          </NavLink>
          <button
            className="btn-ghost hide-on-desktop"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* New Chat Primary Button */}
        <div className="sidebar-new-chat-box">
          <button className="btn-new-chat" onClick={handleNewChatClick}>
            <Plus size={16} />
            <span>New Chat</span>
          </button>
        </div>

        {/* Core Navigation Links: Exactly following General User Spec */}
        <nav className="sidebar-nav-list" aria-label="Main Navigation">
          <NavLink
            to="/app"
            end
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Home size={17} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/app/chat"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <MessageSquare size={17} />
            <span>Ask Zunme</span>
          </NavLink>

          <NavLink
            to="/app/search"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Search size={17} />
            <span>Web Search</span>
          </NavLink>

          <NavLink
            to="/app/builders"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <PenTool size={17} />
            <span>AI Content Builders</span>
          </NavLink>

          <NavLink
            to="/warehouse"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Package size={17} />
            <span>AI Warehouse</span>
          </NavLink>

          <NavLink
            to="/app/library"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Bookmark size={17} />
            <span>My Library</span>
          </NavLink>

          <NavLink
            to="/app/history"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Clock size={17} />
            <span>History</span>
          </NavLink>

          <NavLink
            to="/app/usage"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <CreditCard size={17} />
            <span>Usage & Plan</span>
          </NavLink>
        </nav>

        {/* Capability-Based Specialist Workspaces (Shown when available) */}
        <div className="sidebar-section-divider" style={{ cursor: 'pointer' }} onClick={() => setSpecializedOpen(!specializedOpen)}>
          <span>Specialized Workspaces</span>
          <ChevronDown size={14} style={{ transform: specializedOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </div>

        {specializedOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', paddingLeft: '4px' }}>
            <NavLink
              to="/creator"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '12px', padding: '7px 10px' }}
            >
              <Sparkles size={15} color="#A78BFA" />
              <span>Creator Studio</span>
            </NavLink>

            <NavLink
              to="/seo"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '12px', padding: '7px 10px' }}
            >
              <SearchCheck size={15} color="#38BDF8" />
              <span>SEO Workspace</span>
            </NavLink>

            <NavLink
              to="/business"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '12px', padding: '7px 10px' }}
            >
              <Briefcase size={15} color="#34D399" />
              <span>Business Workspace</span>
            </NavLink>

            <NavLink
              to="/ads"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '12px', padding: '7px 10px' }}
            >
              <Megaphone size={15} color="#FBBF24" />
              <span>Zunme Ads</span>
              <span className="badge badge-warning" style={{ fontSize: '9px', padding: '1px 4px', marginLeft: 'auto' }}>Soon</span>
            </NavLink>
          </div>
        )}

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <NavLink
            to="/app/settings"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Settings size={17} />
            <span>Settings</span>
          </NavLink>

          <NavLink
            to="/app/support"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <LifeBuoy size={17} />
            <span>Help & Support</span>
          </NavLink>

          {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
            <NavLink
              to="/admin"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShieldCheck size={17} color="#A78BFA" />
              <span>Admin Hub</span>
            </NavLink>
          )}

          {user?.role === 'SUPER_ADMIN' && (
            <NavLink
              to="/super-admin"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShieldAlert size={17} color="#EF4444" />
              <span>Super Admin</span>
            </NavLink>
          )}

          {/* User mini card */}
          {user ? (
            <div className="user-mini-card">
              <div className="user-avatar-circle">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="user-meta-info">
                <div className="user-name-label">{user.fullName}</div>
                <div className="user-email-label">{user.role} Account</div>
              </div>
              <button
                className="btn-ghost"
                onClick={logout}
                title="Sign Out"
                aria-label="Sign out"
                style={{ padding: '6px' }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-primary btn-sm w-full">
              Sign In
            </NavLink>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="app-main">
        {/* Top Header Bar */}
        <header className="app-topbar">
          <div className="topbar-left">
            <button
              className="btn-ghost hide-on-desktop"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              style={{ padding: '6px' }}
            >
              <Menu size={20} />
            </button>
            <h1 className="topbar-title">{getPageTitle()}</h1>
          </div>

          <div className="topbar-right">
            {/* Role Switcher button for verification */}
            <button
              className="btn btn-outline btn-sm hide-on-mobile"
              onClick={toggleRole}
              title="Click to cycle role between USER, ADMIN, and SUPER_ADMIN for testing"
            >
              Active Role: <strong>{user?.role || 'USER'}</strong>
            </button>

            {/* Quick Link to Admin / Super Admin if authorized */}
            {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
              <NavLink to="/admin" className="btn btn-secondary btn-sm hide-on-mobile">
                <ShieldCheck size={14} />
                <span>Admin</span>
              </NavLink>
            )}

            {user?.role === 'SUPER_ADMIN' && (
              <NavLink to="/super-admin" className="btn btn-sm" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#F87171', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                <ShieldAlert size={14} />
                <span>Super Admin</span>
              </NavLink>
            )}
          </div>
        </header>

        {/* Canvas Body for Routed Screens */}
        <main className="app-canvas-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
