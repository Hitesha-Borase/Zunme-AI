import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  Crown,
  ShieldCheck,
  Briefcase,
  Share2,
  Megaphone,
  ArrowRight,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import './AuthPages.css';

interface QuickDashboard {
  id: string;
  name: string;
  path: string;
  role: UserRole;
  roleLabel: string;
  icon: React.ReactNode;
  accentColor: string;
}

export const LoginPage: React.FC = () => {
  const { login, loginWithRole } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('alex.creator@zunme.ai');
  const [password, setPassword] = useState('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const quickDashboards: QuickDashboard[] = [
    {
      id: 'super-admin',
      name: 'Super Admin Governance',
      path: '/super-admin',
      role: 'SUPER_ADMIN',
      roleLabel: 'Super Admin',
      icon: <Crown size={16} />,
      accentColor: '#8B5CF6'
    },
    {
      id: 'admin',
      name: 'Admin Operations Hub',
      path: '/admin',
      role: 'ADMIN',
      roleLabel: 'Admin',
      icon: <ShieldCheck size={16} />,
      accentColor: '#635BFF'
    },
    {
      id: 'app',
      name: 'User AI Workspace',
      path: '/app',
      role: 'USER',
      roleLabel: 'Core User',
      icon: <Sparkles size={16} />,
      accentColor: '#0EA5E9'
    },
    {
      id: 'business',
      name: 'Business & CRM Hub',
      path: '/business',
      role: 'USER',
      roleLabel: 'Business',
      icon: <Briefcase size={16} />,
      accentColor: '#10B981'
    },
    {
      id: 'social',
      name: 'Social & Content Scheduler',
      path: '/social',
      role: 'USER',
      roleLabel: 'Social',
      icon: <Share2 size={16} />,
      accentColor: '#6E56CF'
    },
    {
      id: 'ads',
      name: 'Zunme Ads Platform',
      path: '/ads',
      role: 'USER',
      roleLabel: 'Ads Platform',
      icon: <Megaphone size={16} />,
      accentColor: '#A855F7'
    }
  ];

  const handleQuickLogin = (dash: QuickDashboard) => {
    loginWithRole(dash.role, dash.name);
    navigate(dash.path);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      try {
        await login(email, password);
        setIsLoading(false);
        navigate('/app/chat');
      } catch (err) {
        setIsLoading(false);
        setError('Invalid credentials. Please try again.');
      }
    }, 600);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <NavLink to="/" className="auth-brand-logo">
            <div className="brand-icon-box">Z</div>
            <span>Zunme AI</span>
          </NavLink>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your AI workspace to continue</p>
        </div>

        {error && (
          <div className="auth-alert-error" role="alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="auth-options-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <NavLink to="/forgot-password" className="auth-link">
              Forgot password?
            </NavLink>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
            {isLoading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In to Workspace</span>
                <Sparkles size={15} />
              </>
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>Or Choose Dashboard to Sign In Directly</span>
        </div>

        <div className="login-quick-dashboards-grid">
          {quickDashboards.map((dash) => (
            <button
              key={dash.id}
              type="button"
              className="login-quick-btn"
              onClick={() => handleQuickLogin(dash)}
              style={{ '--btn-accent': dash.accentColor } as React.CSSProperties}
            >
              <div
                className="login-quick-btn-icon"
                style={{ color: dash.accentColor, backgroundColor: `${dash.accentColor}15` }}
              >
                {dash.icon}
              </div>
              <div className="login-quick-btn-info">
                <span className="login-quick-btn-name">{dash.name}</span>
                <span className="login-quick-btn-path">{dash.path}</span>
              </div>
              <span className="login-quick-badge">{dash.roleLabel}</span>
              <ArrowRight size={14} className="login-quick-arrow" />
            </button>
          ))}
        </div>

        <div className="auth-footer-prompt">
          Don't have an account yet?{' '}
          <NavLink to="/register" className="auth-link">
            Create an account
          </NavLink>
        </div>
      </div>
    </div>
  );
};
