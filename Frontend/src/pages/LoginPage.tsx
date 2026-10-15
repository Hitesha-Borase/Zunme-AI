import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './AuthPages.css';

export const LoginPage: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('alex.creator@zunme.ai');
  const [password, setPassword] = useState('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
