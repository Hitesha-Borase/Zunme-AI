import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  AlertCircle,
  Crown,
  Shield,
  Briefcase,
  Share2,
  Megaphone,
  ArrowRight,
  Globe,
  PenTool,
  TrendingUp,
  UserCheck,
  Building,
  Sliders,
  CheckCircle2,
  ShieldCheck,
  Video
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import './AuthPages.css';

interface PersonaRole {
  id: string;
  name: string;
  subtitle: string;
  email: string;
  role: UserRole;
  roleBadge: string;
  path: string;
  icon: React.ReactNode;
  accentColor: string;
}

export const LoginPage: React.FC = () => {
  const { loginWithRole } = useApp();
  const navigate = useNavigate();

  const personas: PersonaRole[] = [
    {
      id: 'business',
      name: 'Business Owners',
      subtitle: 'Secure Access',
      email: 'business.owner@zunme.ai',
      role: 'USER',
      roleBadge: 'Business Owner',
      path: '/business',
      icon: <Building size={18} />,
      accentColor: '#6E56CF'
    },
    {
      id: 'customer',
      name: 'Customer Workspace',
      subtitle: 'Secure Access',
      email: 'customer@zunme.ai',
      role: 'USER',
      roleBadge: 'Customer',
      path: '/app',
      icon: <Globe size={18} />,
      accentColor: '#38BDF8'
    },
    {
      id: 'creator',
      name: 'Content Creators',
      subtitle: 'Secure Access',
      email: 'alex.creator@zunme.ai',
      role: 'USER',
      roleBadge: 'Content Creator',
      path: '/creator',
      icon: <Video size={18} />,
      accentColor: '#F472B6'
    },
    {
      id: 'builder',
      name: 'Content Builders',
      subtitle: 'Secure Access',
      email: 'builder@zunme.ai',
      role: 'USER',
      roleBadge: 'Content Builder',
      path: '/app/builders',
      icon: <PenTool size={18} />,
      accentColor: '#C084FC'
    },
    {
      id: 'influencer',
      name: 'Influencer & Social',
      subtitle: 'Secure Access',
      email: 'influencer@zunme.ai',
      role: 'USER',
      roleBadge: 'Influencer',
      path: '/social',
      icon: <Share2 size={18} />,
      accentColor: '#8B5CF6'
    },
    {
      id: 'affiliate',
      name: 'Affiliate Partners',
      subtitle: 'Secure Access',
      email: 'affiliate@zunme.ai',
      role: 'USER',
      roleBadge: 'Affiliate Partner',
      path: '/warehouse',
      icon: <TrendingUp size={18} />,
      accentColor: '#34D399'
    },
    {
      id: 'marketing',
      name: 'AI Marketing & Ads',
      subtitle: 'Secure Access',
      email: 'marketing.pro@zunme.ai',
      role: 'USER',
      roleBadge: 'AI Marketer',
      path: '/ads',
      icon: <Megaphone size={18} />,
      accentColor: '#EC4899'
    },
    {
      id: 'hr',
      name: 'HR & Talent',
      subtitle: 'Secure Access',
      email: 'hr.lead@zunme.ai',
      role: 'USER',
      roleBadge: 'HR Ops',
      path: '/app',
      icon: <UserCheck size={18} />,
      accentColor: '#F59E0B'
    },
    {
      id: 'admin',
      name: 'Admin I (Operations)',
      subtitle: 'Secure Access',
      email: 'admin@zunme.ai',
      role: 'ADMIN',
      roleBadge: 'Admin I',
      path: '/admin',
      icon: <ShieldCheck size={18} />,
      accentColor: '#6366F1'
    },
    {
      id: 'admin2',
      name: 'Admin II (Tools & Models)',
      subtitle: 'Secure Access',
      email: 'admin.tools@zunme.ai',
      role: 'ADMIN',
      roleBadge: 'Admin II',
      path: '/admin/tools',
      icon: <Sliders size={18} />,
      accentColor: '#7C3AED'
    },
    {
      id: 'crm',
      name: 'CRM Specialists',
      subtitle: 'Secure Access',
      email: 'crm.pro@zunme.ai',
      role: 'USER',
      roleBadge: 'CRM Specialist',
      path: '/business',
      icon: <Briefcase size={18} />,
      accentColor: '#10B981'
    },
    {
      id: 'super-admin',
      name: 'Super Admin Governance',
      subtitle: 'Secure Access',
      email: 'superadmin@zunme.ai',
      role: 'SUPER_ADMIN',
      roleBadge: 'Super Admin',
      path: '/super-admin',
      icon: <Crown size={18} />,
      accentColor: '#D946EF'
    }
  ];

  const [selectedPersona, setSelectedPersona] = useState<PersonaRole>(personas[0]);
  const [email, setEmail] = useState<string>(personas[0].email);
  const [password, setPassword] = useState<string>('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [error] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectPersona = (persona: PersonaRole) => {
    setSelectedPersona(persona);
    setEmail(persona.email);
  };

  const handleSignInWithRole = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      loginWithRole(selectedPersona.role, selectedPersona.name);
      setIsLoading(false);
      navigate(selectedPersona.path);
    }, 400);
  };

  return (
    <div className="energy-auth-page landing-theme-login">
      {/* Background Atmosphere Layers from Home Page */}
      <div className="cosmic-grid-overlay" aria-hidden="true" />
      <div className="ambient-aurora-top" aria-hidden="true" />
      <div className="ambient-aurora-accent" aria-hidden="true" />

      {/* Top Global Bar matching Home Page */}
      <header className="energy-auth-topbar">
        <NavLink to="/" className="brand-link" aria-label="Zunme AI Home">
          <div className="brand-icon-box">
            <span className="brand-glyph">Z</span>
            <span className="brand-glow-ring" />
          </div>
          <div className="brand-text-wrap">
            <span className="brand-name">Zunme AI</span>
            <span className="brand-version-pill">Workspace</span>
          </div>
        </NavLink>

        <div className="energy-topbar-meta">
          <div className="energy-status-tag">
            <Eye size={14} />
            <span>Super Admin: VISIBLE</span>
          </div>
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="energy-auth-main">
        <div className="energy-auth-grid">
          {/* Left Column: Login Card with Home Page Luxury Card Styling */}
          <div className="energy-login-card">
            <div className="energy-login-header">
              <div className="brand-icon-box energy-card-logo-box">
                <span className="brand-glyph">Z</span>
                <span className="brand-glow-ring" />
              </div>

              <div className="energy-card-title-row">
                <h1 className="energy-card-title">Zunme AI</h1>
                <span className="brand-version-pill">Workspace</span>
              </div>
              <p className="energy-card-meta">Next-Gen Unified AI Platform</p>
              <p className="energy-card-desc">Sign in to continue to your workspace.</p>
            </div>

            {error && (
              <div className="energy-alert-error" role="alert">
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSignInWithRole} className="energy-form">
              <div className="energy-form-group">
                <label className="energy-label" htmlFor="business-email">
                  Business Email
                </label>
                <div className="energy-input-wrap">
                  <span className="energy-input-icon">✉</span>
                  <input
                    id="business-email"
                    type="email"
                    className="energy-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="energy-form-group">
                <label className="energy-label" htmlFor="business-password">
                  Password
                </label>
                <div className="energy-input-wrap">
                  <span className="energy-input-icon">🔒</span>
                  <input
                    id="business-password"
                    type={showPassword ? 'text' : 'password'}
                    className="energy-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="energy-pw-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Persona Context Card */}
              <div className="energy-context-box">
                <div className="energy-context-row">
                  <span className="energy-ctx-muted">Authenticated as</span>
                  <span className="energy-ctx-highlight">{selectedPersona.roleBadge}</span>
                </div>
                <div className="energy-context-row">
                  <span className="energy-ctx-muted">Organization</span>
                  <span className="energy-ctx-org">Zunme AI Workspace Hub</span>
                </div>
              </div>

              <button
                type="submit"
                className="energy-submit-btn"
                disabled={isLoading}
              >
                <span>
                  {isLoading
                    ? 'Authenticating...'
                    : `Sign in with Selected Role: ${selectedPersona.name}`}
                </span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="energy-card-footer">
              <div className="energy-footer-badge">
                <CheckCircle2 size={13} className="text-emerald" />
                <span>Secure enterprise session • Tenant-isolated workspace</span>
              </div>
            </div>
          </div>

          {/* Right Column: Persona Grid */}
          <div className="energy-personas-panel">
            <div className="energy-personas-header">
              <h2 className="energy-panel-title">Select Your Business Role &amp; Persona</h2>
              <p className="energy-panel-subtitle">Quick One-Click Demo Access</p>
            </div>

            <div className="energy-personas-grid">
              {personas.map((persona) => {
                const isSelected = selectedPersona.id === persona.id;
                return (
                  <button
                    key={persona.id}
                    type="button"
                    className={`energy-persona-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleSelectPersona(persona)}
                  >
                    <div
                      className="persona-icon-box"
                      style={{
                        backgroundColor: isSelected ? 'var(--color-primary, #6E56CF)' : 'rgba(110, 86, 207, 0.08)',
                        color: isSelected ? '#FFFFFF' : persona.accentColor
                      }}
                    >
                      {persona.icon}
                    </div>

                    <div className="persona-text-col">
                      <span className="persona-name">{persona.name}</span>
                      <span className="persona-sub">{persona.subtitle}</span>
                    </div>

                    <ArrowRight size={15} className="persona-arrow" />
                  </button>
                );
              })}
            </div>

            <div className="energy-personas-bottom">
              <div className="energy-security-note">
                <Shield size={14} className="text-emerald" />
                <span>Encrypted RBAC Security Layer Active</span>
              </div>
              <div className="energy-roles-counter">
                <span>12 Roles Configured • Click to switch persona</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
