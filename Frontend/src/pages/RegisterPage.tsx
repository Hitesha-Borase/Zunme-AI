import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './AuthPages.css';

export const RegisterPage: React.FC = () => {
  const { register } = useApp();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service to create an account.');
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      try {
        await register(fullName, email, password);
        setIsLoading(false);
        navigate('/app/chat');
      } catch (err) {
        setIsLoading(false);
        setError('Registration failed. Please try again.');
      }
    }, 700);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <NavLink to="/" className="auth-brand-logo">
            <div className="brand-icon-box">Z</div>
            <span>Zunme AI</span>
          </NavLink>
          <h1 className="auth-title">Create Your Account</h1>
          <p className="auth-subtitle">Get started with your free Zunme AI workspace</p>
        </div>

        {error && (
          <div className="auth-alert-error" role="alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="register-name">
              Full Name
            </label>
            <input
              id="register-name"
              type="text"
              className="input-field"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Jordan Miller"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-email">
              Email Address
            </label>
            <input
              id="register-email"
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jordan@example.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-password">
              Password (min. 8 characters)
            </label>
            <div className="password-input-wrapper">
              <input
                id="register-password"
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

          <div className="form-group">
            <label className="form-label" htmlFor="register-confirm-password">
              Confirm Password
            </label>
            <input
              id="register-confirm-password"
              type="password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="checkbox-label" style={{ fontSize: '12.5px' }}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
            {isLoading ? (
              <span>Creating your account...</span>
            ) : (
              <>
                <span>Create Free Account</span>
                <Sparkles size={15} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer-prompt">
          Already have an account?{' '}
          <NavLink to="/login" className="auth-link">
            Sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
};
