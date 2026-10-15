import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sparkles,
  MessageSquare,
  Search,
  PenTool,
  Bookmark,
  ArrowRight,
  CheckCircle2,
  Shield,
  Zap,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import './LandingPage.css';

export const LandingPage: React.FC = () => {
  const { user } = useApp();

  return (
    <div className="landing-page">
      {/* Navigation Header */}
      <header className="landing-header">
        <div className="landing-container">
          <div className="header-content">
            <NavLink to="/" className="brand-link">
              <div className="brand-icon-box">Z</div>
              <span>Zunme AI</span>
            </NavLink>

            <nav className="landing-nav-links" aria-label="Landing Navigation">
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#pricing">Pricing</a>
              <NavLink to="/app/chat">Workspace</NavLink>
            </nav>

            <div className="flex items-center gap-3">
              {user ? (
                <NavLink to="/app/chat" className="btn btn-primary">
                  <span>Open Workspace</span>
                  <ArrowRight size={15} />
                </NavLink>
              ) : (
                <>
                  <NavLink to="/login" className="btn btn-outline btn-sm">
                    Sign In
                  </NavLink>
                  <NavLink to="/register" className="btn btn-primary btn-sm">
                    Get Started
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-ambient-spotlight" aria-hidden="true" />
        <div className="landing-container">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Introducing Zunme AI v1.0 Workspace</span>
          </div>

          <h1 className="hero-title">
            Your Unified AI Workspace for <span className="hero-title-highlight">Ideas, Research & Creation</span>
          </h1>

          <p className="hero-description">
            Discover verified information, converse with an intelligent assistant, draft high-converting content, and save your work into a centralized personal library.
          </p>

          <div className="hero-cta-group">
            <NavLink to="/register" className="btn btn-primary btn-lg">
              <span>Start Creating Free</span>
              <ArrowRight size={17} />
            </NavLink>
            <a href="#features" className="btn btn-secondary btn-lg">
              Explore Features
            </a>
          </div>

          {/* Interactive Showcase Preview */}
          <div className="showcase-wrapper">
            <div className="showcase-topbar">
              <div className="window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="badge badge-neutral" style={{ margin: '0 auto', fontSize: '11px' }}>
                zunme.ai/app/workspace
              </span>
            </div>

            <div className="showcase-content">
              <div className="grid" style={{ gridTemplateColumns: '220px 1fr', gap: '20px', textAlign: 'left' }}>
                {/* Mock Mini Sidebar */}
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(16px)' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#A78BFA', marginBottom: '14px', letterSpacing: '0.04em' }}>
                    ZUNME AI
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                    <div style={{ padding: '7px 10px', borderRadius: '8px', backgroundColor: 'rgba(124, 58, 237, 0.25)', color: '#DDD6FE', fontWeight: '600', border: '1px solid rgba(139, 92, 246, 0.35)' }}>
                      💬 AI Assistant
                    </div>
                    <div style={{ padding: '7px 10px', color: '#94A3B8' }}>🔍 Web Search</div>
                    <div style={{ padding: '7px 10px', color: '#94A3B8' }}>✍️ Content Studio</div>
                    <div style={{ padding: '7px 10px', color: '#94A3B8' }}>📚 My Library</div>
                  </div>
                </div>

                {/* Mock Mini Canvas */}
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(16px)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                    <div className="badge badge-success">Live Engine Connected</div>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>Verified Sources: 3 Active</span>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '12px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <strong style={{ color: '#DDD6FE' }}>User:</strong> How do top creators streamline content ideation and live research?
                  </div>
                  <div style={{ backgroundColor: 'rgba(17, 21, 33, 0.75)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px', borderRadius: '10px', fontSize: '13px', lineHeight: '1.6', color: '#E2E8F0', boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)' }}>
                    <strong style={{ color: '#A78BFA' }}>Zunme AI:</strong> Top creators use unified workflows: grounding topics with real-time web citations, generating structured drafts, and archiving proven hooks into their personal library...
                    <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span className="badge badge-primary">Citation [1] Cleantech Review</span>
                      <span className="badge badge-neutral">Save to Library</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars Section */}
      <section id="features" className="pillars-section">
        <div className="landing-container">
          <div className="section-header">
            <div className="section-label">Core Capabilities</div>
            <h2 className="section-title">Four Pillars. One Seamless Workflow.</h2>
            <p className="section-description">
              Engineered to replace fragmented tabs and disjointed subscriptions with a single cohesive workspace.
            </p>
          </div>

          <div className="pillars-grid">
            {/* Pillar 1 */}
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <MessageSquare size={22} />
              </div>
              <h3 className="pillar-title">AI Assistant</h3>
              <p className="pillar-desc">
                Context-aware multi-turn conversations with code syntax highlighting, rich markdown, and instant ideation.
              </p>
              <NavLink to="/app/chat" className="btn btn-outline btn-sm" style={{ marginTop: '16px' }}>
                Open Chat →
              </NavLink>
            </div>

            {/* Pillar 2 */}
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Search size={22} />
              </div>
              <h3 className="pillar-title">Live Web Search</h3>
              <p className="pillar-desc">
                Retrieve verified 2026 facts, industry news, and data with explicit clickable source URLs and citations.
              </p>
              <NavLink to="/app/search" className="btn btn-outline btn-sm" style={{ marginTop: '16px' }}>
                Search Web →
              </NavLink>
            </div>

            {/* Pillar 3 */}
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <PenTool size={22} />
              </div>
              <h3 className="pillar-title">Content Studio</h3>
              <p className="pillar-desc">
                Draft high-converting newsletters, blog outlines, social captions, and ads with tailored tone and length parameters.
              </p>
              <NavLink to="/app/studio" className="btn btn-outline btn-sm" style={{ marginTop: '16px' }}>
                Create Copy →
              </NavLink>
            </div>

            {/* Pillar 4 */}
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Bookmark size={22} />
              </div>
              <h3 className="pillar-title">Personal Library</h3>
              <p className="pillar-desc">
                Centralized knowledge repository. Star and store your best prompts, research summaries, and generated drafts.
              </p>
              <NavLink to="/app/library" className="btn btn-outline btn-sm" style={{ marginTop: '16px' }}>
                View Library →
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="workflow-section">
        <div className="landing-container">
          <div className="section-header">
            <div className="section-label">Workflow</div>
            <h2 className="section-title">From Question to Published Asset in 3 Steps</h2>
            <p className="section-description">
              No complex setup. Start immediately and streamline your creative output.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3 className="step-title">Inquire or Research</h3>
              <p className="step-desc">
                Ask the AI workspace anything or submit a query to live web search to gather verified data points and competitive intelligence.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h3 className="step-title">Generate & Refine</h3>
              <p className="step-desc">
                Select your format in Content Studio, adjust your desired tone and length, and generate ready-to-use copy in seconds.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h3 className="step-title">Save to Your Library</h3>
              <p className="step-desc">
                Save high-value research and finished drafts to your searchable library for future reference or direct team handoff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="final-cta-section">
        <div className="landing-container">
          <div className="cta-box">
            <h2 className="cta-title">Ready to Elevate Your AI Workflow?</h2>
            <p className="cta-desc">
              Join creators, researchers, and entrepreneurs building smarter with Zunme AI.
            </p>
            <div className="flex justify-center gap-3">
              <NavLink to="/register" className="btn btn-secondary btn-lg" style={{ backgroundColor: '#FFFFFF', color: '#635BFF', fontWeight: '700' }}>
                Create Free Account
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Public Footer */}
      <footer className="landing-footer">
        <div className="landing-container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="brand-link">
                <div className="brand-icon-box">Z</div>
                <span>Zunme AI</span>
              </div>
              <p>
                The unified AI workspace for ideas, research, and high-impact content creation.
              </p>
            </div>

            <div className="footer-links-group">
              <div className="footer-col">
                <h4>Product</h4>
                <ul>
                  <li><NavLink to="/app/chat">AI Assistant</NavLink></li>
                  <li><NavLink to="/app/search">Web Search</NavLink></li>
                  <li><NavLink to="/app/studio">Content Studio</NavLink></li>
                  <li><NavLink to="/app/library">Personal Library</NavLink></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Company</h4>
                <ul>
                  <li><a href="#about">About Zunme</a></li>
                  <li><a href="#careers">Careers</a></li>
                  <li><a href="#privacy">Privacy Policy</a></li>
                  <li><a href="#terms">Terms of Service</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Connect</h4>
                <ul>
                  <li><a href="#twitter">X / Twitter</a></li>
                  <li><a href="#linkedin">LinkedIn</a></li>
                  <li><a href="#support">Support & Help</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} Zunme AI. All rights reserved.</span>
            <span>Phase 1 Core MVP Specification</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
