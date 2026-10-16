import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  AlertCircle,
  Crown,
  ShieldCheck,
  Sparkles,
  Briefcase,
  Share2,
  Megaphone,
  ArrowRight,
  Shield,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import './AuthPages.css';

interface PersonaRole {
  id: string;
  name: string;
  subtitle: string;
  path: string;
  role: UserRole;
  roleBadge: string;
  email: string;
  icon: React.ReactNode;
  accentColor: string;
}

export const LoginPage: React.FC = () => {
  const { loginWithRole } = useApp();
  const navigate = useNavigate();

  // Exactly the 6 dashboards from the original modal shown in Image 2
  const personas: PersonaRole[] = [
    {
      id: 'super-admin',
      name: 'Super Admin Governance',
      subtitle: '/super-admin',
      path: '/super-admin',
      role: 'SUPER_ADMIN',
      roleBadge: 'Super Admin',
      email: 'superadmin@zunme.ai',
      icon: <Crown size={18} />,
      accentColor: '#8B5CF6'
    },
    {
      id: 'admin',
      name: 'Admin Operations Hub',
      subtitle: '/admin',
      path: '/admin',
      role: 'ADMIN',
      roleBadge: 'Admin',
      email: 'admin@zunme.ai',
      icon: <ShieldCheck size={18} />,
      accentColor: '#635BFF'
    },
    {
      id: 'app',
      name: 'User AI Workspace',
      subtitle: '/app',
      path: '/app',
      role: 'USER',
      roleBadge: 'Core User',
      email: 'alex.creator@zunme.ai',
      icon: <Sparkles size={18} />,
      accentColor: '#0EA5E9'
    },
    {
      id: 'business',
      name: 'Business & CRM Hub',
      subtitle: '/business',
      path: '/business',
      role: 'USER',
      roleBadge: 'Business',
      email: 'business@zunme.ai',
      icon: <Briefcase size={18} />,
      accentColor: '#10B981'
    },
    {
      id: 'social',
      name: 'Social & Content Scheduler',
      subtitle: '/social',
      path: '/social',
      role: 'USER',
      roleBadge: 'Social',
      email: 'social@zunme.ai',
      icon: <Share2 size={18} />,
      accentColor: '#6E56CF'
    },
    {
      id: 'ads',
      name: 'Zunme Ads Platform',
      subtitle: '/ads',
      path: '/ads',
      role: 'USER',
      roleBadge: 'Ads Platform',
      email: 'ads@zunme.ai',
      icon: <Megaphone size={18} />,
      accentColor: '#A855F7'
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
                  <span className="energy-ctx-muted">Target Dashboard</span>
                  <span className="energy-ctx-org">{selectedPersona.name}</span>
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

              {/* Social Login Options */}
              <div className="login-social-divider">
                <span>Or Continue With</span>
              </div>

              <div className="login-social-row">
                <button
                  type="button"
                  className="login-social-btn"
                  onClick={() => {
                    loginWithRole('USER', 'Google Account');
                    navigate('/app/chat');
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.8s.7 5.1 1.9 7.5l3.7-2.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 17C3.7 20.8 7.5 23.5 12 23.5z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  className="login-social-btn"
                  onClick={() => {
                    loginWithRole('USER', 'GitHub Account');
                    navigate('/app/chat');
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>
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
              <h2 className="energy-panel-title">Choose Dashboard</h2>
              <p className="energy-panel-subtitle">Click any dashboard button to sign in directly.</p>
            </div>

            <div className="energy-personas-grid personas-grid-6">
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
                        backgroundColor: isSelected ? 'var(--color-primary, #6E56CF)' : `${persona.accentColor}18`,
                        color: isSelected ? '#FFFFFF' : persona.accentColor
                      }}
                    >
                      {persona.icon}
                    </div>

                    <div className="persona-text-col">
                      <span className="persona-name">{persona.name}</span>
                      <span className="persona-sub">{persona.subtitle}</span>
                    </div>

                    <span className="persona-badge-tag">{persona.roleBadge}</span>

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
                <span>6 Dashboards Configured • Instant 1-Click Access</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
