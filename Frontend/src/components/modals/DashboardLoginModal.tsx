import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crown,
  ShieldCheck,
  Sparkles,
  Database,
  Wand2,
  TrendingUp,
  Briefcase,
  Megaphone,
  ArrowRight,
  X,
  Search,
  Lock,
  Layers,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import './DashboardLoginModal.css';

interface DashboardCard {
  id: string;
  name: string;
  path: string;
  role: UserRole;
  roleTitle: string;
  category: 'GOVERNANCE' | 'CREATOR' | 'SPECIALIST';
  badge: string;
  accentColor: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  features: string[];
}

interface DashboardLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardLoginModal: React.FC<DashboardLoginModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { loginWithRole } = useApp();
  const [activeTab, setActiveTab] = useState<'ALL' | 'GOVERNANCE' | 'CREATOR' | 'SPECIALIST'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const dashboards: DashboardCard[] = [
    {
      id: 'super-admin',
      name: 'Super Admin Hub',
      path: '/super-admin',
      role: 'SUPER_ADMIN',
      roleTitle: 'Super Admin',
      category: 'GOVERNANCE',
      badge: 'Executive Governance',
      accentColor: '#8B5CF6',
      icon: <Crown size={22} />,
      tagline: 'Platform Governance, Audit Logs & Plan Pricing',
      description: 'Master control panel with 5 strictly scoped governance modules: overview analytics, user role administration, platform settings, tier pricing management, and security audit logs.',
      features: ['5 Governance Modules', 'System Audit Trail', 'Plan Pricing Editor', 'Platform Controls']
    },
    {
      id: 'admin',
      name: 'Admin Operations Hub',
      path: '/admin',
      role: 'ADMIN',
      roleTitle: 'Operations Admin',
      category: 'GOVERNANCE',
      badge: 'Operations Console',
      accentColor: '#635BFF',
      icon: <ShieldCheck size={22} />,
      tagline: 'Operations, Moderation & Integrations',
      description: 'Central operations console featuring 9 operational hubs: creator asset approvals, SEO marketing tools, user management, system reports, moderation queues, and real-time API integrations.',
      features: ['9 Operational Hubs', 'Creator Asset Review', 'SEO Marketing Tools', 'API Status & Latency']
    },
    {
      id: 'app',
      name: 'General User Workspace',
      path: '/app',
      role: 'USER',
      roleTitle: 'Creator / Pro User',
      category: 'CREATOR',
      badge: 'Core Workspace',
      accentColor: '#0EA5E9',
      icon: <Sparkles size={22} />,
      tagline: 'AI Chat, Live Web Search & Content Studio',
      description: 'Unified creative workspace combining multi-turn conversational AI, real-time web search with verified citations, structured drafting builders, and a persistent personal library.',
      features: ['Contextual AI Chat', 'Live Grounded Web Search', 'Content Studio Presets', 'Saved Library Storage']
    },
    {
      id: 'warehouse',
      name: 'AI Warehouse',
      path: '/warehouse',
      role: 'USER',
      roleTitle: 'Creator / Pro User',
      category: 'SPECIALIST',
      badge: 'Prompt & Model Vault',
      accentColor: '#10B981',
      icon: <Database size={22} />,
      tagline: 'Prompt Archives, Workflows & Verified Assets',
      description: 'Curated repository for saving and discovering prompt packs, viral marketing workflows, editorial SOPs, and community assets submitted by verified creators.',
      features: ['Prompt Engineering Packs', 'Marketing Workflows', 'Verified Creator Badges', '1-Click Library Bookmark']
    },
    {
      id: 'creator',
      name: 'Creator Studio',
      path: '/creator',
      role: 'USER',
      roleTitle: 'Creator / Pro User',
      category: 'CREATOR',
      badge: 'Social & Media Velocity',
      accentColor: '#F43F5E',
      icon: <Wand2 size={22} />,
      tagline: 'Viral Hook Generator & Script Formatter',
      description: 'Specialized suite for digital creators: generate high-converting video hooks, multi-slide carousels, sponsor pitch scripts, and submit winning prompts to the AI Warehouse.',
      features: ['Viral Hook Engine', 'Carousel Scribe', 'Asset Submission Portal', 'Platform Calibration']
    },
    {
      id: 'seo',
      name: 'SEO Intelligence Workspace',
      path: '/seo',
      role: 'USER',
      roleTitle: 'Creator / Pro User',
      category: 'SPECIALIST',
      badge: 'Search & Rankings',
      accentColor: '#F59E0B',
      icon: <TrendingUp size={22} />,
      tagline: 'Keyword Tracking & SERP Metadata',
      description: 'High-intent keyword discovery, difficulty scoring, SERP intent categorization, and automated SEO title & meta description generator for digital marketing growth.',
      features: ['Live Keyword Tracker', 'Search Intent Classification', 'SERP Difficulty Metrics', 'Meta Tag Generator']
    },
    {
      id: 'business',
      name: 'Business & Brand Hub',
      path: '/business',
      role: 'USER',
      roleTitle: 'Creator / Pro User',
      category: 'SPECIALIST',
      badge: 'Agencies & Brand Teams',
      accentColor: '#14B8A6',
      icon: <Briefcase size={22} />,
      tagline: 'Brand Voice Kit, Schedule & CRM Sync',
      description: 'Manage consistent brand persona guidelines, organize scheduled multi-platform editorial campaigns, construct investor pitch blueprints, and sync with nErgy CRM.',
      features: ['Brand Persona Kit', 'Publishing Calendar', 'Pitch Deck Blueprints', 'nErgy CRM Status']
    },
    {
      id: 'ads',
      name: 'Zunme Ads Engine',
      path: '/ads',
      role: 'USER',
      roleTitle: 'Creator / Pro User',
      category: 'SPECIALIST',
      badge: 'Upcoming Monetization',
      accentColor: '#A855F7',
      icon: <Megaphone size={22} />,
      tagline: 'Self-Serve Ad Engine & Sponsor Placements',
      description: 'Architectural preview of the future self-serve advertising engine: sponsored query formats, publisher revenue-sharing rules, and core technical dependencies checklist.',
      features: ['Sponsored Query Specs', 'Ad Placement Formats', 'Dependency Checklist', 'Ecosystem Architecture']
    }
  ];

  const filteredDashboards = dashboards.filter((d) => {
    const matchesTab = activeTab === 'ALL' || d.category === activeTab;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      d.name.toLowerCase().includes(query) ||
      d.tagline.toLowerCase().includes(query) ||
      d.description.toLowerCase().includes(query) ||
      d.roleTitle.toLowerCase().includes(query) ||
      d.features.some((f) => f.toLowerCase().includes(query));
    return matchesTab && matchesQuery;
  });

  const handleSelectDashboard = (d: DashboardCard) => {
    // 1. Initialize user state with corresponding role
    loginWithRole(d.role, d.name);
    // 2. Close modal
    onClose();
    // 3. Immediately route into the selected dashboard
    navigate(d.path);
  };

  return (
    <div className="dashboard-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-heading">
      <div className="dashboard-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Glow Effects */}
        <div className="modal-glow-top" aria-hidden="true" />
        <div className="modal-glow-bottom" aria-hidden="true" />

        {/* Modal Header */}
        <div className="dashboard-modal-header">
          <div className="modal-header-left">
            <div className="modal-header-pill">
              <Layers size={13} />
              <span>Instant Workspace Login</span>
            </div>
            <h2 id="modal-heading" className="modal-title">
              Select Your <span className="modal-title-gradient">Dashboard &amp; Workspace</span>
            </h2>
            <p className="modal-subtitle">
              Choose any dashboard below to log in directly. Your session and demo role will be initialized automatically.
            </p>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="modal-toolbar">
          <div className="modal-category-tabs">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveTab('ALL')}
            >
              All Dashboards ({dashboards.length})
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'GOVERNANCE' ? 'active' : ''}`}
              onClick={() => setActiveTab('GOVERNANCE')}
            >
              Admin &amp; Governance (2)
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'CREATOR' ? 'active' : ''}`}
              onClick={() => setActiveTab('CREATOR')}
            >
              Creator &amp; Core (2)
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'SPECIALIST' ? 'active' : ''}`}
              onClick={() => setActiveTab('SPECIALIST')}
            >
              Specialist Workspaces (4)
            </button>
          </div>

          <div className="modal-search-box">
            <Search size={15} className="search-icon" />
            <input
              type="text"
              placeholder="Search dashboards, tools, or roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="modal-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="modal-cards-grid">
          {filteredDashboards.length === 0 ? (
            <div className="no-results-box">
              <Search size={32} />
              <p>No dashboards found matching "{searchQuery}"</p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('ALL');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredDashboards.map((card) => (
              <div
                key={card.id}
                className="dashboard-selection-card"
                onClick={() => handleSelectDashboard(card)}
                style={{ '--card-accent': card.accentColor } as React.CSSProperties}
              >
                <div className="card-top-row">
                  <div className="card-icon-wrapper" style={{ backgroundColor: `${card.accentColor}18`, color: card.accentColor }}>
                    {card.icon}
                  </div>

                  <div className="card-badge-group">
                    <span className="card-route-pill">{card.path}</span>
                    <span className="card-tier-pill" style={{ borderColor: `${card.accentColor}40`, color: card.accentColor }}>
                      {card.badge}
                    </span>
                  </div>
                </div>

                <div className="card-body">
                  <div className="card-title-wrap">
                    <h3 className="card-title">{card.name}</h3>
                    <div className="card-role-chip">
                      <Lock size={11} />
                      <span>Logs in as: <strong>{card.roleTitle}</strong></span>
                    </div>
                  </div>

                  <p className="card-tagline">{card.tagline}</p>
                  <p className="card-description">{card.description}</p>

                  <div className="card-features-list">
                    {card.features.map((feat, idx) => (
                      <span key={idx} className="card-feat-tag">
                        <CheckCircle2 size={11} style={{ color: card.accentColor }} />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="card-footer-action">
                  <span className="action-text">Launch &amp; Sign In</span>
                  <div className="action-arrow-circle" style={{ backgroundColor: card.accentColor }}>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="dashboard-modal-footer">
          <div className="footer-tip">
            <span className="tip-dot" />
            <span>Clicking any dashboard card will instantly log you in with mock permissions and open that workspace.</span>
          </div>

          <div className="footer-links">
            <button
              type="button"
              className="traditional-login-btn"
              onClick={() => {
                onClose();
                navigate('/login');
              }}
            >
              <span>Or use standard Email &amp; Password</span>
              <ExternalLink size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardLoginModal;
