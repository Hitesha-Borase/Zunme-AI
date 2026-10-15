import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Search,
  PenTool,
  Bookmark,
  Settings,
  ShieldCheck,
  Plus,
  Menu,
  X,
  LogOut,
  Trash2,
  Sparkles
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
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/app/chat')) return 'AI Assistant';
    if (path.includes('/app/search')) return 'Live Web Search';
    if (path.includes('/app/studio')) return 'Content Studio';
    if (path.includes('/app/library')) return 'My Saved Library';
    if (path.includes('/app/settings')) return 'Account Settings';
    if (path.includes('/admin')) return 'Admin Operational Console';
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

        {/* Core Navigation Links */}
        <nav className="sidebar-nav-list" aria-label="Main Navigation">
          <NavLink
            to="/app/chat"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <MessageSquare size={17} />
            <span>AI Assistant</span>
          </NavLink>

          <NavLink
            to="/app/search"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Search size={17} />
            <span>Live Web Search</span>
          </NavLink>

          <NavLink
            to="/app/studio"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <PenTool size={17} />
            <span>Content Studio</span>
          </NavLink>

          <NavLink
            to="/app/library"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Bookmark size={17} />
            <span>My Library</span>
          </NavLink>
        </nav>

        {/* Recent Chats Section */}
        <div className="sidebar-section-divider">
          <span>Recent Conversations</span>
          <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
            {conversations.length}
          </span>
        </div>

        <div className="sidebar-history-scroll">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`history-item ${activeConversationId === conv.id && location.pathname.includes('/app/chat') ? 'active' : ''}`}
              onClick={() => handleSelectConv(conv.id)}
              title={conv.title}
            >
              <span className="history-item-title">{conv.title}</span>
              <button
                className="history-delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conv.id);
                }}
                title="Delete conversation"
                aria-label={`Delete conversation ${conv.title}`}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>

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

          {user?.role === 'ADMIN' && (
            <NavLink
              to="/admin"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShieldCheck size={17} color="var(--color-primary)" />
              <span>Admin Console</span>
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
                <div className="user-email-label">{user.email}</div>
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
            {/* Prototype Demo Switcher Badge */}
            <div
              className="badge badge-primary hide-on-mobile"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <Sparkles size={12} />
              <span>Phase 1 MVP UI</span>
            </div>

            {/* Quick Role Toggle button for demo verification */}
            <button
              className="btn btn-outline btn-sm hide-on-mobile"
              onClick={toggleRole}
              title="Click to toggle between USER and ADMIN view for demo verification"
            >
              Role: <strong>{user?.role || 'GUEST'}</strong>
            </button>

            {user?.role === 'ADMIN' && !location.pathname.includes('/admin') && (
              <NavLink to="/admin" className="btn btn-secondary btn-sm">
                <ShieldCheck size={14} />
                <span>Admin View</span>
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
