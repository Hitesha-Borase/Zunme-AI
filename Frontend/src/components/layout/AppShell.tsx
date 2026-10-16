import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
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
  Sparkles,
  SearchCheck,
  Briefcase,
  Megaphone,
  Share2,
  Plus,
  Menu,
  X,
  LogOut,
  Trash2,
  ChevronDown,
  ArrowLeft,
  BarChart2,
  Target,
  DollarSign,
  Eye,
  Award,
  Users,
  Calendar,
  LayoutDashboard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './AppShell.css';
import './SuperAdminShell.css';

export const AppShell: React.FC = () => {
  const {
    user,
    logout,
    conversations,
    activeConversationId,
    selectConversation,
    createNewChat,
    deleteConversation
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
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
    if (path.includes('/social')) return 'Social Integrations & Content Scheduler';
    if (path.includes('/ads')) return 'Zunme Ads Platform & Creator Monetization';
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

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const displayName = (user?.fullName || 'User').replace(/\s*\([^)]*\)/g, '').trim();

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
        {location.pathname.startsWith('/ads') ? (
          /* ============================================================ */
          /* ZUNME ADS PLATFORM DEDICATED SIDEBAR                         */
          /* ============================================================ */
          <>
            <div className="sidebar-brand-section">
              <NavLink to="/ads" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
                <div className="brand-icon-box" style={{ background: 'linear-gradient(135deg, #A855F7 0%, #6E56CF 100%)' }}>
                  <Megaphone size={16} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF', lineHeight: '1.2' }}>Zunme Ads</div>
                  <div style={{ fontSize: '9px', fontWeight: '800', color: '#C4B5FD', letterSpacing: '0.06em' }}>ADS PLATFORM</div>
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

            <div className="sidebar-new-chat-box">
              <NavLink
                to="/ads?tab=Create Campaign"
                className="btn-new-chat"
                style={{ background: '#6E56CF', color: '#FFFFFF', textDecoration: 'none' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Plus size={16} />
                <span>New Campaign</span>
              </NavLink>
            </div>

            <nav className="sidebar-nav-list" aria-label="Ads Navigation">
              <NavLink
                to="/ads"
                end
                className={() => `sidebar-nav-item ${location.pathname === '/ads' && (!location.search || location.search.includes('Overview')) ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard size={17} />
                <span>Ads Overview</span>
              </NavLink>

              <NavLink
                to="/ads?tab=Campaigns"
                className={() => `sidebar-nav-item ${location.search.includes('Campaigns') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Target size={17} />
                <span>All Campaigns</span>
              </NavLink>

              <NavLink
                to="/ads?tab=Create Campaign"
                className={() => `sidebar-nav-item ${location.search.includes('Create') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Plus size={17} />
                <span>Create Campaign</span>
              </NavLink>

              <NavLink
                to="/ads?tab=Keyword Bidding"
                className={() => `sidebar-nav-item ${location.search.includes('Bidding') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <DollarSign size={17} />
                <span>Keyword Bidding</span>
              </NavLink>

              <NavLink
                to="/ads?tab=Ad Placements"
                className={() => `sidebar-nav-item ${location.search.includes('Placements') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Eye size={17} />
                <span>Ad Placements</span>
              </NavLink>

              <NavLink
                to="/ads?tab=Creator Monetization"
                className={() => `sidebar-nav-item ${location.search.includes('Monetization') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Award size={17} />
                <span>Creator Monetization</span>
              </NavLink>

              <NavLink
                to="/ads?tab=Billing & Budget"
                className={() => `sidebar-nav-item ${location.search.includes('Billing') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <CreditCard size={17} />
                <span>Billing & Wallet</span>
              </NavLink>
            </nav>

            <div className="sidebar-section-divider">
              <span>RETURN TO WORKSPACE</span>
            </div>
            <div style={{ padding: '0 var(--space-3)' }}>
              <NavLink
                to="/app"
                className="sidebar-nav-item"
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: '#6E56CF', fontWeight: '700' }}
              >
                <ArrowLeft size={16} />
                <span>Exit to AI Workspace</span>
              </NavLink>
            </div>
          </>
        ) : location.pathname.startsWith('/business') ? (
          /* ============================================================ */
          /* BUSINESS & CRM WORKSPACE DEDICATED SIDEBAR                   */
          /* ============================================================ */
          <>
            <div className="sidebar-brand-section">
              <NavLink to="/business" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
                <div className="brand-icon-box" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
                  <Briefcase size={16} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF', lineHeight: '1.2' }}>Zunme Business</div>
                  <div style={{ fontSize: '9px', fontWeight: '800', color: '#34D399', letterSpacing: '0.06em' }}>BUSINESS & CRM</div>
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

            <div className="sidebar-new-chat-box">
              <NavLink
                to="/business?tab=nErgy CRM Deep Sync"
                className="btn-new-chat"
                style={{ background: '#059669', color: '#FFFFFF', textDecoration: 'none' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users size={16} />
                <span>Deep CRM Sync</span>
              </NavLink>
            </div>

            <nav className="sidebar-nav-list" aria-label="Business Navigation">
              <NavLink
                to="/business"
                end
                className={() => `sidebar-nav-item ${location.pathname === '/business' && (!location.search || location.search.includes('Overview')) ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard size={17} />
                <span>Business Overview</span>
              </NavLink>

              <NavLink
                to="/business?tab=Brand Profile"
                className={() => `sidebar-nav-item ${location.search.includes('Brand') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Award size={17} />
                <span>Brand Profile</span>
              </NavLink>

              <NavLink
                to="/business?tab=Projects"
                className={() => `sidebar-nav-item ${location.search.includes('Projects') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Briefcase size={17} />
                <span>Projects & Goals</span>
              </NavLink>

              <NavLink
                to="/business?tab=Content Calendar"
                className={() => `sidebar-nav-item ${location.search.includes('Calendar') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Calendar size={17} />
                <span>Content Calendar</span>
              </NavLink>

              <NavLink
                to="/business?tab=Marketing Content"
                className={() => `sidebar-nav-item ${location.search.includes('Marketing') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <PenTool size={17} />
                <span>Marketing Content</span>
              </NavLink>

              <NavLink
                to="/business?tab=nErgy CRM Deep Sync"
                className={() => `sidebar-nav-item ${location.search.includes('CRM') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users size={17} />
                <span>nErgy CRM Deep Sync</span>
              </NavLink>

              <NavLink
                to="/business?tab=Team & Access"
                className={() => `sidebar-nav-item ${location.search.includes('Team') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users size={17} />
                <span>Team & Access</span>
              </NavLink>
            </nav>

            <div className="sidebar-section-divider">
              <span>RETURN TO WORKSPACE</span>
            </div>
            <div style={{ padding: '0 var(--space-3)' }}>
              <NavLink
                to="/app"
                className="sidebar-nav-item"
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: '#059669', fontWeight: '700' }}
              >
                <ArrowLeft size={16} />
                <span>Exit to AI Workspace</span>
              </NavLink>
            </div>
          </>
        ) : location.pathname.startsWith('/social') ? (
          /* ============================================================ */
          /* SOCIAL INTEGRATIONS & CONTENT SCHEDULER SIDEBAR              */
          /* ============================================================ */
          <>
            <div className="sidebar-brand-section">
              <NavLink to="/social" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
                <div className="brand-icon-box" style={{ background: 'linear-gradient(135deg, #6E56CF 0%, #4338CA 100%)' }}>
                  <Share2 size={16} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF', lineHeight: '1.2' }}>Zunme Social</div>
                  <div style={{ fontSize: '9px', fontWeight: '800', color: '#C4B5FD', letterSpacing: '0.06em' }}>CONTENT SCHEDULER</div>
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

            <div className="sidebar-new-chat-box">
              <NavLink
                to="/social"
                className="btn-new-chat"
                style={{ background: '#6E56CF', color: '#FFFFFF', textDecoration: 'none' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Plus size={16} />
                <span>Schedule Post</span>
              </NavLink>
            </div>

            <nav className="sidebar-nav-list" aria-label="Social Navigation">
              <NavLink
                to="/social"
                end
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Calendar size={17} />
                <span>Calendar & Scheduler</span>
              </NavLink>

              <NavLink
                to="/social"
                className="sidebar-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Clock size={17} />
                <span>Publishing Queue</span>
              </NavLink>

              <NavLink
                to="/social"
                className="sidebar-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Share2 size={17} />
                <span>Connected Channels</span>
              </NavLink>
            </nav>

            <div className="sidebar-section-divider">
              <span>RETURN TO WORKSPACE</span>
            </div>
            <div style={{ padding: '0 var(--space-3)' }}>
              <NavLink
                to="/app"
                className="sidebar-nav-item"
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: '#6E56CF', fontWeight: '700' }}
              >
                <ArrowLeft size={16} />
                <span>Exit to AI Workspace</span>
              </NavLink>
            </div>
          </>
        ) : (
          /* ============================================================ */
          /* GENERAL USER AI WORKSPACE SIDEBAR                            */
          /* ============================================================ */
          <>
            <div className="sidebar-brand-section">
<<<<<<< HEAD
              <NavLink to="/" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
                <div className="brand-icon-box">
                  <span className="brand-glyph">Z</span>
                </div>
                <span>Zunme AI</span>
=======
              <NavLink to="/app" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
                <div className="brand-icon-box">Z</div>
                <span className="brand-title-text" style={{ color: '#FFFFFF', fontWeight: '800', fontSize: '16px' }}>Zunme AI</span>
>>>>>>> 091f76ae678a697972f13e1a3db47f742ae22f45
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
          </>
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

          {/* Dedicated Logout Button at the Very Bottom */}
          {user ? (
            <button
              className="superadmin-logout-btn"
              onClick={handleLogout}
              title="Sign Out"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '13px',
                fontWeight: '600',
                color: '#F87171',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                cursor: 'pointer',
                width: '100%',
                transition: 'all 0.2s ease',
                marginTop: '4px'
              }}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
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
            {user ? (
              <div className="superadmin-profile-menu-wrap" style={{ position: 'relative' }}>
                <button
                  type="button"
                  className="superadmin-topbar-profile-btn"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  aria-expanded={profileDropdownOpen}
                  aria-haspopup="true"
                  title="Account Menu"
                >
                  <div className="superadmin-topbar-avatar" style={{ background: 'linear-gradient(135deg, #10B981 0%, #6E56CF 100%)' }}>
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={14} className={`dropdown-chevron ${profileDropdownOpen ? 'rotated' : ''}`} />
                </button>

                {profileDropdownOpen && (
                  <>
                    <div
                      className="superadmin-dropdown-backdrop"
                      onClick={() => setProfileDropdownOpen(false)}
                      style={{ position: 'fixed', inset: 0, zIndex: 90 }}
                    />
                    <div className="superadmin-profile-dropdown" style={{ zIndex: 100 }}>
                      <div className="dropdown-user-header">
                        <div className="dropdown-avatar" style={{ background: 'linear-gradient(135deg, #10B981 0%, #6E56CF 100%)' }}>
                          {displayName.charAt(0).toUpperCase()}
                        </div>
                        <div className="dropdown-user-details">
                          <span className="dropdown-name">{displayName}</span>
                          <span className="dropdown-email">{user.email || 'user@zunme.ai'}</span>
                          <span className="dropdown-role-tag" style={{ color: '#059669', background: '#ECFDF5' }}>
                            {user.role === 'SUPER_ADMIN' ? 'Super Administrator' : user.role === 'ADMIN' ? 'Platform Administrator' : 'Verified Member'}
                          </span>
                        </div>
                      </div>
                      <div className="dropdown-divider" />
                      <button
                        type="button"
                        className="dropdown-item dropdown-logout-btn"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleLogout();
                        }}
                      >
                        <LogOut size={15} />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <NavLink to="/login" className="btn btn-primary btn-sm">
                Sign In
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
