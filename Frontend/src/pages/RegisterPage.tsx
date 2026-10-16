import React, { useState, useId } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  User,
  Mail,
  Lock,
  ShieldCheck,
  Check,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Wand2,
  Image as ImageIcon,
  Shield,
  Zap,
  Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import './RegisterPage.css';

type WorkspaceIntent = 'creator' | 'business' | 'developer';

export const RegisterPage: React.FC = () => {
  const { register } = useApp();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [intent, setIntent] = useState<WorkspaceIntent>('creator');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fullNameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const termsId = useId();

  // Dynamic Password Strength Calculation
  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', colorClass: '', hint: '' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', colorClass: 'weak', hint: 'Add capital letters & numbers' };
      case 2:
        return { score: 2, label: 'Fair', colorClass: 'fair', hint: 'Add a number & special symbol' };
      case 3:
        return { score: 3, label: 'Good', colorClass: 'good', hint: 'Add a special character like !@#' };
      case 4:
        return { score: 4, label: 'Enterprise Grade', colorClass: 'strong', hint: 'Strong, high-entropy password' };
      default:
        return { score: 0, label: '', colorClass: '', hint: '' };
    }
  };

  const strength = calculatePasswordStrength(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please recheck.');
      return;
    }
    if (!agreeTerms) {
      setError('You must accept the Terms of Service to create an account.');
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      try {
        await register(fullName, email, password);
        setIsLoading(false);
        navigate('/app');
      } catch (err) {
        setIsLoading(false);
        setError('Registration failed. Please try again or sign in.');
      }
    }, 750);
  };

  // 1-Click Fast Social Auth Handler
  const handleSocialSignUp = (provider: 'Google' | 'GitHub') => {
    setIsLoading(true);
    setTimeout(async () => {
      const mockName = provider === 'Google' ? 'Alex Taylor' : 'Dev_Jordan';
      const mockEmail = provider === 'Google' ? 'alex.taylor@gmail.com' : 'jordan.dev@github.com';
      await register(mockName, mockEmail, 'AuthSecurePass123!');
      setIsLoading(false);
      navigate('/app');
    }, 600);
  };

  return (
    <div className="register-viewport">
      {/* Ambient Aurora Orbs */}
      <div className="register-bg-decorations" aria-hidden="true">
        <div className="ambient-orb orb-primary" />
        <div className="ambient-orb orb-sunset" />
        <div className="ambient-orb orb-emerald" />
        <div className="ambient-grid-mesh" />
      </div>

      <div className="register-split-container">
        {/* ============================================================ */}
        {/* LEFT COLUMN: BRAND EXPERIENCE & ECOSYSTEM SHOWCASE           */}
        {/* ============================================================ */}
        <section className="register-showcase">
          <div className="showcase-badge-pill">
            <span className="badge-pulse-dot" />
            <span>Zunme AI 2.0 • Autonomous Workspace</span>
          </div>

          <h1 className="showcase-heading">
            Build, Create & Scale with{' '}
            <span className="gradient-text">Autonomous Intelligence</span>
          </h1>

          <p className="showcase-description">
            Join over 14,000+ creators, marketers, engineers, and businesses crafting high-impact content, live web research, and multi-modal media in one unified studio.
          </p>

          {/* Interactive Feature Capability Cards */}
          <div className="showcase-features-stack">
            <div className="showcase-feature-card">
              <div className="feature-card-icon violet">
                <MessageSquare size={20} />
              </div>
              <div className="feature-card-content">
                <h3>
                  Ask Zunme & Real-Time Web Search
                  <span className="feature-mini-pill">Verified Sources</span>
                </h3>
                <p>Multi-turn LLM reasoning with real-time web citations, fresh URL crawling, and verified factual accuracy.</p>
              </div>
            </div>

            <div className="showcase-feature-card">
              <div className="feature-card-icon emerald">
                <Wand2 size={20} />
              </div>
              <div className="feature-card-content">
                <h3>
                  1,000+ Blueprints & AI Warehouse
                  <span className="feature-mini-pill">Instant Output</span>
                </h3>
                <p>Ready-to-deploy blueprints for viral social content, technical SEO docs, ad copywriting, and CRM workflows.</p>
              </div>
            </div>

            <div className="showcase-feature-card">
              <div className="feature-card-icon sunset">
                <ImageIcon size={20} />
              </div>
              <div className="feature-card-content">
                <h3>
                  Multi-Modal Studio & Creator Hub
                  <span className="feature-mini-pill">Monetization</span>
                </h3>
                <p>Synthesize 4K photorealistic imagery, generate cinematic video scripts, and earn royalties on community assets.</p>
              </div>
            </div>
          </div>

          {/* Social Proof & Security Guarantee */}
          <div className="showcase-social-proof">
            <div className="avatar-stack-group">
              <div className="avatar-stack">
                <div className="stack-avatar" style={{ background: '#6E56CF' }}>A</div>
                <div className="stack-avatar" style={{ background: '#EC4899' }}>M</div>
                <div className="stack-avatar" style={{ background: '#10B981' }}>J</div>
                <div className="stack-avatar" style={{ background: '#3B82F6' }}>S</div>
              </div>
              <div className="avatar-stack-meta">
                <div className="avatar-stack-count">14,200+ Creators & Teams</div>
                <div className="avatar-stack-label">Rated 4.9/5 Across 120+ Countries</div>
              </div>
            </div>

            <div className="security-guarantee-pill">
              <Shield size={15} />
              <span>256-Bit AES Encrypted</span>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: LUXURY REGISTRATION CARD                      */}
        {/* ============================================================ */}
        <section className="register-form-card" aria-labelledby="register-heading">
          <div className="register-card-header">
            <div className="register-brand-row">
              <NavLink to="/" className="register-brand-link">
                <div className="register-logo-icon">Z</div>
                <span className="register-brand-title">Zunme AI</span>
              </NavLink>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#10B981', fontWeight: 700 }}>
                <Zap size={14} />
                <span>Instant Access</span>
              </div>
            </div>

            <h2 id="register-heading" className="register-card-title">
              Create Your Free Account
            </h2>
            <p className="register-card-subtitle">
              Get full access to all verified models, live web search, and content builders in 15 seconds.
            </p>
          </div>

          {/* Workspace Intent Selector */}
          <div className="register-intent-section">
            <span className="intent-label">Select Your Primary Workspace Focus</span>
            <div className="intent-chips-grid">
              <button
                type="button"
                className={`intent-chip ${intent === 'creator' ? 'active' : ''}`}
                onClick={() => setIntent('creator')}
              >
                <span>🎨</span>
                <span>Creator & Media</span>
              </button>
              <button
                type="button"
                className={`intent-chip ${intent === 'business' ? 'active' : ''}`}
                onClick={() => setIntent('business')}
              >
                <span>💼</span>
                <span>Business & Team</span>
              </button>
              <button
                type="button"
                className={`intent-chip ${intent === 'developer' ? 'active' : ''}`}
                onClick={() => setIntent('developer')}
              >
                <span>⚡</span>
                <span>Developer & Pro</span>
              </button>
            </div>
          </div>

          {/* Fast 1-Click Social Sign-Up */}
          <div className="social-signup-grid">
            <button
              type="button"
              className="btn-social-signup"
              onClick={() => handleSocialSignUp('Google')}
              disabled={isLoading}
            >
              <svg className="social-icon-svg" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              className="btn-social-signup"
              onClick={() => handleSocialSignUp('GitHub')}
              disabled={isLoading}
            >
              <svg className="social-icon-svg" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          <div className="register-divider">
            <span>or register with email</span>
          </div>

          {error && (
            <div className="auth-alert-error" role="alert" style={{ marginBottom: '16px' }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="register-input-group">
              <label className="register-label" htmlFor={fullNameId}>
                <span>Full Name</span>
              </label>
              <div className="input-icon-wrapper">
                <span className="input-leading-icon">
                  <User size={16} />
                </span>
                <input
                  id={fullNameId}
                  type="text"
                  className="register-input-field"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Jordan Miller"
                  required
                  disabled={isLoading}
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="register-input-group">
              <label className="register-label" htmlFor={emailId}>
                <span>Work / Personal Email</span>
              </label>
              <div className="input-icon-wrapper">
                <span className="input-leading-icon">
                  <Mail size={16} />
                </span>
                <input
                  id={emailId}
                  type="email"
                  className="register-input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan@company.com"
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="register-input-group">
              <label className="register-label" htmlFor={passwordId}>
                <span>Password</span>
                <span style={{ fontSize: '11px', color: '#8C97B0', fontWeight: 500 }}>Min. 8 characters</span>
              </label>
              <div className="input-icon-wrapper">
                <span className="input-leading-icon">
                  <Lock size={16} />
                </span>
                <input
                  id={passwordId}
                  type={showPassword ? 'text' : 'password'}
                  className="register-input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle-action"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Dynamic Password Strength Progress Bar */}
              {password.length > 0 && (
                <div className="password-strength-container">
                  <div className="strength-bars-track">
                    <div className={`strength-bar-segment ${strength.score >= 1 ? `active-${strength.colorClass}` : ''}`} />
                    <div className={`strength-bar-segment ${strength.score >= 2 ? `active-${strength.colorClass}` : ''}`} />
                    <div className={`strength-bar-segment ${strength.score >= 3 ? `active-${strength.colorClass}` : ''}`} />
                    <div className={`strength-bar-segment ${strength.score >= 4 ? `active-${strength.colorClass}` : ''}`} />
                  </div>
                  <div className="strength-meta-row">
                    <span className={`strength-label-text ${strength.colorClass}`}>
                      Strength: {strength.label}
                    </span>
                    <span className="strength-hint-text">{strength.hint}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="register-input-group">
              <div className="register-label">
                <label htmlFor={confirmPasswordId}>Confirm Password</label>
                {passwordsMatch && (
                  <span className="password-match-badge matched">
                    <Check size={12} />
                    <span>Passwords match</span>
                  </span>
                )}
                {passwordsMismatch && (
                  <span className="password-match-badge mismatched">
                    <span>Passwords do not match</span>
                  </span>
                )}
              </div>
              <div className="input-icon-wrapper">
                <span className="input-leading-icon">
                  <ShieldCheck size={16} />
                </span>
                <input
                  id={confirmPasswordId}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`register-input-field ${passwordsMatch ? 'input-valid' : ''} ${passwordsMismatch ? 'input-invalid' : ''}`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password to verify"
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle-action"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Terms of Service Checkbox */}
            <div className="register-terms-row">
              <input
                id={termsId}
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <label htmlFor={termsId} className="register-terms-text">
                I agree to the <NavLink to="/terms">Terms of Service</NavLink> and{' '}
                <NavLink to="/privacy">Privacy Policy</NavLink>. I understand Zunme AI provides encrypted workspaces.
              </label>
            </div>

            {/* Submit Button with Shimmer & Loading State */}
            <button
              type="submit"
              className="btn-register-submit"
              disabled={isLoading}
              id="btn-create-account"
            >
              {isLoading ? (
                <>
                  <div className="spinner-register" />
                  <span>Configuring your AI workspace...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Create Free Account</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Trust Guarantees */}
          <div className="register-trust-row">
            <div className="trust-item">
              <CheckCircle2 size={13} />
              <span>Free forever tier</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={13} />
              <span>No credit card</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={13} />
              <span>Instant setup</span>
            </div>
          </div>

          {/* Footer prompt */}
          <div className="register-card-footer">
            Already have an account?{' '}
            <NavLink to="/login">
              <span>Sign in</span>
              <ArrowRight size={13} />
            </NavLink>
          </div>
        </section>
      </div>
    </div>
  );
};
