import React, { useState, useEffect } from 'react';
import { NavLink, useSearchParams, useNavigate } from 'react-router-dom';
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
  Layers,
  Database,
  Wand2,
  TrendingUp,
  Globe,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  ExternalLink,
  Copy,
  Check,
  Cpu,
  FileText,
  Star,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DashboardLoginModal } from '../components/modals/DashboardLoginModal';
import './LandingPage.css';

interface CapabilityItem {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  icon: React.ReactNode;
  highlights: string[];
  accentColor: string;
}

interface StepItem {
  number: string;
  title: string;
  action: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

export type LandingSection = 'all' | 'features' | 'how-it-works' | 'showcase' | 'pricing' | 'faq';

export const LandingPage: React.FC = () => {
  const { user } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'chat' | 'search' | 'studio' | 'library'>('chat');
  const navigate = useNavigate();
  const [askZunmeQuery, setAskZunmeQuery] = useState('');
  const [isSubmittingQuery, setIsSubmittingQuery] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeSection, setActiveSection] = useState<LandingSection>('all');

  const handleNavClick = (section: LandingSection) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleAskZunmeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askZunmeQuery.trim()) return;
    setIsSubmittingQuery(true);
    setTimeout(() => {
      setIsSubmittingQuery(false);
      navigate(`/login?prompt=${encodeURIComponent(askZunmeQuery.trim())}`);
    }, 300);
  };

  useEffect(() => {
    if (searchParams.get('login') === 'true') {
      setShowLoginModal(true);
      searchParams.delete('login');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleCopyMock = () => {
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const capabilities: CapabilityItem[] = [
    {
      id: 'chat',
      name: 'AI Chat',
      badge: 'Reasoning & Dialogue',
      tagline: 'Get assistance with questions, ideas, and everyday tasks.',
      icon: <MessageSquare size={22} />,
      accentColor: '#A78BFA',
      highlights: [
        'Multi-turn contextual reasoning',
        'Rich markdown & code syntax support',
        'Instant brainstorming & ideation'
      ]
    },
    {
      id: 'search',
      name: 'Web Search',
      badge: 'Real-time Grounding',
      tagline: 'Explore information from web sources where supported.',
      icon: <Search size={22} />,
      accentColor: '#38BDF8',
      highlights: [
        'Verified source URLs & citations',
        'Current 2026 data synthesis',
        'Direct publisher click-through'
      ]
    },
    {
      id: 'builders',
      name: 'AI Content Builders',
      badge: 'Structured Drafting',
      tagline: 'Create and refine different types of content.',
      icon: <PenTool size={22} />,
      accentColor: '#C084FC',
      highlights: [
        'Format presets (Newsletters, Outlines, Ads)',
        'Tone calibration & target audience dials',
        'Predictable length and word count control'
      ]
    },
    {
      id: 'warehouse',
      name: 'AI Warehouse',
      badge: 'Resource Repository',
      tagline: 'Discover and organize creative resources.',
      icon: <Database size={22} />,
      accentColor: '#818CF8',
      highlights: [
        'Reusable prompt engineering archives',
        'Pre-built marketing & research workflows',
        'Categorized asset tagging'
      ]
    },
    {
      id: 'creator',
      name: 'Creator Tools',
      badge: 'Workflow Velocity',
      tagline: 'Support content creation and creator workflows.',
      icon: <Wand2 size={22} />,
      accentColor: '#F472B6',
      highlights: [
        'High-converting hook generation',
        'Cross-platform framing & captioning',
        'Rapid drafting and multi-angle iteration'
      ]
    },
    {
      id: 'seo',
      name: 'SEO Workspace',
      badge: 'Search Visibility',
      tagline: 'Help plan and prepare SEO-focused content.',
      icon: <TrendingUp size={22} />,
      accentColor: '#34D399',
      highlights: [
        'Search intent architecture',
        'Topic cluster and outline planning',
        'Keyword density and readability guidance'
      ]
    }
  ];

  const workflowSteps: StepItem[] = [
    {
      number: '01',
      title: 'Discover',
      action: 'Query & Verify',
      description: 'Search the web or converse with AI to gather verified facts, live citations, and competitive data points.',
      icon: <Search size={20} />,
      accent: '#38BDF8'
    },
    {
      number: '02',
      title: 'Create',
      action: 'Draft & Refine',
      description: 'Transform discovered research into polished copy, structured outlines, or scripts with custom tone and length.',
      icon: <PenTool size={20} />,
      accent: '#A78BFA'
    },
    {
      number: '03',
      title: 'Save',
      action: 'Archive to Library',
      description: 'Preserve high-performing drafts, prompts, and source citations directly in your searchable personal library.',
      icon: <Bookmark size={20} />,
      accent: '#818CF8'
    },
    {
      number: '04',
      title: 'Use',
      action: 'Deploy & Publish',
      description: 'Retrieve, copy, or export your saved assets seamlessly to deploy across your channels, newsletters, and projects.',
      icon: <Sparkles size={20} />,
      accent: '#34D399'
    }
  ];

  const faqs: FaqItem[] = [
    {
      question: 'What is Zunme AI?',
      answer:
        'Zunme AI is a unified productivity workspace that brings together AI chat assistance, real-time web search with verified citations, structured content generation tools, and a centralized personal library into a single, cohesive dark interface.'
    },
    {
      question: 'What can I do with the platform?',
      answer:
        'You can brainstorm complex ideas, ask technical or creative questions, ground your research in live web citations, generate high-converting newsletters and articles, and organize your winning prompts and drafts into an accessible personal library.'
    },
    {
      question: 'How does web search work?',
      answer:
        'When you submit an inquiry to Web Search, Zunme AI retrieves fresh, relevant web data from authoritative domains, synthesizes a concise factual overview, and provides clickable source links with publisher details for transparent verification.'
    },
    {
      question: 'How can I access available tools?',
      answer:
        'All core workspace tools—AI Chat, Web Search, Content Studio, and Personal Library—are directly available once you create a free account or sign in. You can switch between tools seamlessly without leaving the workspace.'
    },
    {
      question: 'Where can I get help?',
      answer:
        'You can access our in-app documentation, explore step-by-step guides inside the workspace, or contact our support team directly via email at support@zunme.ai.'
    }
  ];

  return (
    <div className="landing-page" id="top">
      {/* Background Atmosphere Layers */}
      <div className="cosmic-grid-overlay" aria-hidden="true" />
      <div className="ambient-aurora-top" aria-hidden="true" />
      <div className="ambient-aurora-accent" aria-hidden="true" />

      {/* Navigation Header */}
      <header className="landing-header">
        <div className="landing-container">
          <div className="header-content">
            <NavLink
              to="/"
              className="brand-link"
              aria-label="Zunme AI Home"
              onClick={() => handleNavClick('all')}
            >
              <div className="brand-icon-box">
                <span className="brand-glyph">Z</span>
                <span className="brand-glow-ring" />
              </div>
              <div className="brand-text-wrap">
                <span className="brand-name">Zunme AI</span>
                <span className="brand-version-pill">Workspace</span>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="landing-nav-links" aria-label="Main Navigation">
              <button
                type="button"
                className={activeSection === 'features' ? 'active' : ''}
                onClick={() => handleNavClick('features')}
              >
                Features
              </button>
              <button
                type="button"
                className={activeSection === 'how-it-works' ? 'active' : ''}
                onClick={() => handleNavClick('how-it-works')}
              >
                How It Works
              </button>
              <button
                type="button"
                className={activeSection === 'showcase' ? 'active' : ''}
                onClick={() => handleNavClick('showcase')}
              >
                Product
              </button>
              <button
                type="button"
                className={activeSection === 'pricing' ? 'active' : ''}
                onClick={() => handleNavClick('pricing')}
              >
                Pricing
              </button>
              <button
                type="button"
                className={activeSection === 'faq' ? 'active' : ''}
                onClick={() => handleNavClick('faq')}
              >
                FAQ
              </button>
            </nav>

            {/* Header Right Actions */}
            <div className="header-actions">
              <NavLink to="/login" className="btn btn-ghost btn-sm">
                Log In
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn-primary btn-sm btn-glow"
                aria-label="Create Account"
              >
                <span>Create Account</span>
                <ArrowRight size={14} />
              </NavLink>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                className="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer" role="dialog" aria-modal="true">
            <nav className="mobile-nav-links">
              <button
                type="button"
                className={activeSection === 'features' ? 'active' : ''}
                onClick={() => handleNavClick('features')}
              >
                Features
              </button>
              <button
                type="button"
                className={activeSection === 'how-it-works' ? 'active' : ''}
                onClick={() => handleNavClick('how-it-works')}
              >
                How It Works
              </button>
              <button
                type="button"
                className={activeSection === 'showcase' ? 'active' : ''}
                onClick={() => handleNavClick('showcase')}
              >
                Product Showcase
              </button>
              <button
                type="button"
                className={activeSection === 'pricing' ? 'active' : ''}
                onClick={() => handleNavClick('pricing')}
              >
                Pricing
              </button>
              <button
                type="button"
                className={activeSection === 'faq' ? 'active' : ''}
                onClick={() => handleNavClick('faq')}
              >
                FAQ
              </button>
            </nav>
            <div className="mobile-drawer-actions">
              <NavLink
                to="/register"
                className="btn btn-primary btn-block"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Create Account</span>
                <ArrowRight size={15} />
              </NavLink>
              <NavLink
                to="/login"
                className="btn btn-outline btn-block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </NavLink>
            </div>
          </div>
        )}
      </header>

      {/* Focused Section Indicator Banner when section is directly opened */}
      {activeSection !== 'all' && (
        <div className="section-active-banner">
          <div
            className="landing-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                className="badge badge-primary"
                style={{ textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.04em' }}
              >
                {activeSection === 'showcase' ? 'Product' : activeSection.replace('-', ' ')}
              </span>
              <span style={{ fontSize: '13px', color: '#5F6B85' }}>
                Section view active • Direct access
              </span>
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => handleNavClick('all')}
              style={{ fontSize: '12.5px', fontWeight: 700, color: '#6E56CF' }}
            >
              <span>← Show Full Page Overview</span>
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      {activeSection === 'all' && (
      <section className="hero-section" id="hero">
        <div className="hero-ambient-spotlight" aria-hidden="true" />
        <div className="hero-cyan-spotlight" aria-hidden="true" />

        <div className="landing-container">
          {/* Hero Top Pill */}
          <div className="hero-badge">
            <span className="badge-sparkle-dot">
              <Sparkles size={13} />
            </span>
            <span>Next-Generation Unified AI Platform</span>
            <span className="badge-pill-light">2026</span>
          </div>

          {/* Headline (exact required text) */}
          <h1 className="hero-title">
            Your AI Workspace for{' '}
            <span className="hero-title-highlight">Ideas, Content &amp; Discovery.</span>
          </h1>

          {/* Supporting Text (exact required text) */}
          <p className="hero-description">
            Search the web, create compelling content, and organize your work with AI-powered tools in one connected workspace.
          </p>

          {/* Micro trust indicators */}
          <div className="hero-micro-signals">
            <div className="signal-item">
              <CheckCircle2 size={14} className="signal-icon text-success" />
              <span>Real-time web citations</span>
            </div>
            <span className="signal-divider">•</span>
            <div className="signal-item">
              <CheckCircle2 size={14} className="signal-icon text-success" />
              <span>Contextual multi-turn chat</span>
            </div>
            <span className="signal-divider">•</span>
            <div className="signal-item">
              <CheckCircle2 size={14} className="signal-icon text-success" />
              <span>Personal library repository</span>
            </div>
          </div>

          {/* Ask Zunme Interactive Search Bar directly in Hero */}
          <div className="hero-ask-zunme-wrap">
            <form onSubmit={handleAskZunmeSubmit} className="hero-ask-form">
              <div className="hero-ask-icon">
                <Sparkles size={18} />
              </div>
              <input
                type="text"
                className="hero-ask-input"
                placeholder="Ask Zunme anything... (e.g., 'Research 2026 SaaS trends and draft an executive brief')"
                value={askZunmeQuery}
                onChange={(e) => setAskZunmeQuery(e.target.value)}
                disabled={isSubmittingQuery}
              />
              <button
                type="submit"
                className="hero-ask-btn"
                disabled={isSubmittingQuery || !askZunmeQuery.trim()}
              >
                <span>{isSubmittingQuery ? 'Grounding...' : 'Ask Zunme'}</span>
                <ArrowRight size={14} />
              </button>
            </form>

            <div className="hero-prompt-chips">
              <span className="chips-label">Popular Prompts:</span>
              <button
                type="button"
                className="prompt-chip"
                onClick={() => setAskZunmeQuery('Synthesize top 2026 AI content creator monetization models')}
              >
                "Top 2026 Creator Monetization Models"
              </button>
              <button
                type="button"
                className="prompt-chip"
                onClick={() => setAskZunmeQuery('Draft a high-converting B2B LinkedIn carousel hook sequence')}
              >
                "B2B LinkedIn Carousel Hooks"
              </button>
              <button
                type="button"
                className="prompt-chip"
                onClick={() => setAskZunmeQuery('Explain SEO topical cluster architecture with internal link hierarchy')}
              >
                "SEO Topical Cluster Blueprint"
              </button>
            </div>
          </div>

          {/* Modern Interactive Bento Grid Showcase */}
          <div className="hero-bento-stage">
            <div className="hero-stage-glow" aria-hidden="true" />

            <div className="hero-bento-grid">
              {/* Bento Card 1: Multimodal AI & Prompt Intelligence */}
              <div className="bento-card bento-card-primary">
                <div className="bento-card-badge">
                  <Sparkles size={13} />
                  <span>Multimodal Reasoning</span>
                </div>
                <h3 className="bento-card-title">Next-Gen Contextual Intelligence</h3>
                <p className="bento-card-desc">
                  Generate comprehensive multi-stage strategies, executive briefings, and creative copy with sub-second execution speeds.
                </p>

                <div className="bento-mock-chat-bubble">
                  <div className="bento-chat-header">
                    <span className="bento-dot-green" />
                    <span className="bento-chat-sender">Zunme AI Engine • GPT-4.5</span>
                    <span className="bento-latency">⚡ 1.2s</span>
                  </div>
                  <div className="bento-chat-preview">
                    "Synthesized 12 topical clusters with automatic internal link taxonomy and verified hook angles."
                  </div>
                </div>

                <div className="bento-card-footer">
                  <NavLink to="/register" className="bento-action-link">
                    <span>Try Multimodal AI</span>
                    <ArrowRight size={13} />
                  </NavLink>
                </div>
              </div>

              {/* Bento Card 2: Live Web Search & Grounded Citations */}
              <div className="bento-card bento-card-cyan">
                <div className="bento-card-badge badge-cyan">
                  <Globe size={13} />
                  <span>Live Web Grounding</span>
                </div>
                <h3 className="bento-card-title">Zero-Hallucination Live Citations</h3>
                <p className="bento-card-desc">
                  Every generative response is bench-checked against real-time indexed search nodes with transparent source links.
                </p>

                <div className="bento-citations-preview">
                  <div className="bento-citation-item">
                    <span className="bento-cite-num">[1]</span>
                    <span className="bento-cite-url">techinsights-journal.com</span>
                    <span className="bento-cite-verified">✓ 99.4%</span>
                  </div>
                  <div className="bento-citation-item">
                    <span className="bento-cite-num">[2]</span>
                    <span className="bento-cite-url">clean-creator-index.org</span>
                    <span className="bento-cite-verified">✓ Verified</span>
                  </div>
                  <div className="bento-citation-item">
                    <span className="bento-cite-num">[3]</span>
                    <span className="bento-cite-url">saas-architecture-review.io</span>
                    <span className="bento-cite-verified">✓ Live</span>
                  </div>
                </div>

                <div className="bento-card-footer">
                  <NavLink to="/register" className="bento-action-link">
                    <span>Explore Live Search</span>
                    <ArrowRight size={13} />
                  </NavLink>
                </div>
              </div>

              {/* Bento Card 3: Creator Asset Warehouse & Monetization */}
              <div className="bento-card bento-card-pink">
                <div className="bento-card-badge badge-pink">
                  <Layers size={13} />
                  <span>Asset Warehouse</span>
                </div>
                <h3 className="bento-card-title">Curated Blueprints &amp; Tools</h3>
                <p className="bento-card-desc">
                  Access 1,000+ verified creator templates, prompt sequences, and video scripts ready for instant deployment.
                </p>

                <div className="bento-assets-preview">
                  <div className="bento-asset-row">
                    <span className="bento-asset-tag">Workflow</span>
                    <span className="bento-asset-name">Omnichannel B2B Cold Outreach</span>
                    <span className="bento-pro-pill">PRO</span>
                  </div>
                  <div className="bento-asset-row">
                    <span className="bento-asset-tag">Prompt Pack</span>
                    <span className="bento-asset-name">Viral YouTube 3-Sec Hooks</span>
                    <span className="bento-pro-pill free">FREE</span>
                  </div>
                  <div className="bento-asset-row">
                    <span className="bento-asset-tag">Template</span>
                    <span className="bento-asset-name">Topical Authority 12-Cluster</span>
                    <span className="bento-pro-pill">PRO</span>
                  </div>
                </div>

                <div className="bento-card-footer">
                  <NavLink to="/register" className="bento-action-link">
                    <span>Browse Warehouse</span>
                    <ArrowRight size={13} />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Core Capabilities Section */}
      {activeSection === 'features' && (
      <section id="features" className="capabilities-section">
        <div className="landing-container">
          <div className="section-header">
            <div className="section-badge">CORE CAPABILITIES</div>
            <h2 className="section-title">Engineered for Complete Creative Momentum</h2>
            <p className="section-description">
              Six dedicated AI capabilities organized into one seamless workspace. No tab hopping, no disconnected tools.
            </p>
          </div>

          <div className="capabilities-grid">
            {capabilities.map((cap) => (
              <div key={cap.id} className="capability-card" style={{ '--card-accent': cap.accentColor } as React.CSSProperties}>
                <div className="capability-card-top">
                  <div className="capability-icon-box">{cap.icon}</div>
                  <span className="capability-badge">{cap.badge}</span>
                </div>

                <h3 className="capability-name">{cap.name}</h3>
                <p className="capability-tagline">{cap.tagline}</p>

                <ul className="capability-highlights">
                  {cap.highlights.map((h, i) => (
                    <li key={i} className="highlight-item">
                      <Check size={14} className="highlight-check" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="capability-card-footer">
                  <NavLink
                    to={
                      cap.id === 'chat'
                        ? '/app/chat'
                        : cap.id === 'search'
                        ? '/app/search'
                        : cap.id === 'builders'
                        ? '/app/studio'
                        : '/app/library'
                    }
                    className="capability-link"
                  >
                    <span>Launch in Workspace</span>
                    <ArrowRight size={13} />
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* How It Works Section */}
      {activeSection === 'how-it-works' && (
      <section id="how-it-works" className="how-it-works-section">
        <div className="landing-container">
          <div className="section-header">
            <div className="section-badge">THE WORKFLOW</div>
            <h2 className="section-title">Discover → Create → Save → Use</h2>
            <p className="section-description">
              A frictionless four-stage cycle engineered to turn initial curiosities into high-impact published assets.
            </p>
          </div>

          <div className="steps-container">
            <div className="steps-progress-line" aria-hidden="true" />
            <div className="steps-grid">
              {workflowSteps.map((step, idx) => (
                <div key={step.number} className="step-card" style={{ '--step-accent': step.accent } as React.CSSProperties}>
                  <div className="step-header">
                    <span className="step-number-tag">{step.number}</span>
                    <div className="step-icon-wrap">{step.icon}</div>
                  </div>

                  <div className="step-content">
                    <div className="step-action-tag">{step.action}</div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                  </div>

                  {idx < workflowSteps.length - 1 && (
                    <div className="step-connector-arrow" aria-hidden="true">
                      <ArrowRight size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Product Preview / Platform Showcase Section */}
      {activeSection === 'showcase' && (
      <section id="showcase" className="showcase-section">
        <div className="landing-container">
          <div className="section-header">
            <div className="section-badge">PLATFORM SHOWCASE</div>
            <h2 className="section-title">One Workspace. Unlimited Creative Velocity.</h2>
            <p className="section-description">
              Switch effortlessly between live web research, conversational reasoning, copy drafting, and knowledge archiving.
            </p>
          </div>

          {/* Interactive Module Tabs */}
          <div className="showcase-tabs-nav" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeShowcaseTab === 'chat'}
              className={`showcase-tab-btn ${activeShowcaseTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveShowcaseTab('chat')}
            >
              <MessageSquare size={16} />
              <span>AI Conversation</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeShowcaseTab === 'search'}
              className={`showcase-tab-btn ${activeShowcaseTab === 'search' ? 'active' : ''}`}
              onClick={() => setActiveShowcaseTab('search')}
            >
              <Search size={16} />
              <span>Search Results</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeShowcaseTab === 'studio'}
              className={`showcase-tab-btn ${activeShowcaseTab === 'studio' ? 'active' : ''}`}
              onClick={() => setActiveShowcaseTab('studio')}
            >
              <PenTool size={16} />
              <span>Content Generation</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeShowcaseTab === 'library'}
              className={`showcase-tab-btn ${activeShowcaseTab === 'library' ? 'active' : ''}`}
              onClick={() => setActiveShowcaseTab('library')}
            >
              <Bookmark size={16} />
              <span>Saved Library</span>
            </button>
          </div>

          {/* Tab Showcase Viewport Card */}
          <div className="showcase-viewport-card">
            {activeShowcaseTab === 'chat' && (
              <div className="viewport-panel chat-panel-preview">
                <div className="panel-mock-header">
                  <div className="flex items-center gap-2">
                    <span className="pulse-indicator" />
                    <strong>AI Assistant Conversation</strong>
                    <span className="badge badge-neutral">Model: Claude 3.5 Sonnet / GPT-4o</span>
                  </div>
                  <button type="button" className="copy-action-btn" onClick={handleCopyMock}>
                    {copiedSnippet ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedSnippet ? 'Copied' : 'Copy Dialogue'}</span>
                  </button>
                </div>

                <div className="preview-chat-body">
                  <div className="preview-message user">
                    <div className="msg-author">You</div>
                    <div className="msg-content">
                      Explain the architectural advantages of headless content platforms and provide a markdown table comparing monolithic vs. headless CMS.
                    </div>
                  </div>

                  <div className="preview-message assistant">
                    <div className="msg-author flex items-center gap-1.5">
                      <Sparkles size={14} className="text-violet" />
                      <span>Zunme AI Assistant</span>
                    </div>
                    <div className="msg-content">
                      <p>
                        Headless architectures decouple the presentation layer from the content repository, allowing teams to deliver omnichannel experiences via APIs with significantly reduced latency and enhanced security.
                      </p>
                      <div className="mock-table-wrap">
                        <table className="mock-table">
                          <thead>
                            <tr>
                              <th>Feature</th>
                              <th>Traditional Monolith</th>
                              <th>Decoupled / Headless</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Frontend Agility</td>
                              <td>Coupled to server templates</td>
                              <td>Framework agnostic (React/Next/Vite)</td>
                            </tr>
                            <tr>
                              <td>Global CDN Delivery</td>
                              <td>Server-side page rendering</td>
                              <td>Edge caching &amp; instant API response</td>
                            </tr>
                            <tr>
                              <td>Developer Experience</td>
                              <td>Monolithic repository lock-in</td>
                              <td>Composable services &amp; modern tooling</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeShowcaseTab === 'search' && (
              <div className="viewport-panel search-panel-preview">
                <div className="panel-mock-header">
                  <div className="mock-search-bar">
                    <Search size={15} className="text-muted" />
                    <span className="mock-search-query">
                      Solid-state battery commercialization 2026 benchmarks &amp; energy density
                    </span>
                  </div>
                  <span className="badge badge-success">3 Verified Sources</span>
                </div>

                <div className="preview-search-body">
                  <div className="search-synthesis-box">
                    <div className="synthesis-badge">
                      <Sparkles size={13} />
                      <span>Synthesized Intelligence Overview</span>
                    </div>
                    <p className="synthesis-text">
                      Recent October 2026 field trials confirm commercial solid-electrolyte cells have reached 480 Wh/kg at ambient pressure with atomic-layer anti-dendrite barriers. Global automaker consortiums report 11-minute ultra-fast charging to 80% capacity with negligible degradation over 1,400 cycles.
                    </p>
                  </div>

                  <div className="search-sources-grid">
                    <div className="source-card-preview">
                      <div className="source-meta">
                        <span className="source-pill">1</span>
                        <span className="source-domain-name">energystorage-review.org</span>
                      </div>
                      <h4 className="source-title">Global Energy Storage Review 2026: Commercial Milestones</h4>
                      <p className="source-snippet">
                        Validation trials across 12 international laboratories demonstrate continuous operation past 1,400 cycles with under 8% capacity decay.
                      </p>
                    </div>

                    <div className="source-card-preview">
                      <div className="source-meta">
                        <span className="source-pill">2</span>
                        <span className="source-domain-name">cleantech-index.com</span>
                      </div>
                      <h4 className="source-title">Silicon-Composite Cathodes &amp; Thermal Runaway Safety</h4>
                      <p className="source-snippet">
                        Safety inspections reveal zero thermal runaway triggers under mechanical puncture, clearing key regulatory hurdles for aerospace deployment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeShowcaseTab === 'studio' && (
              <div className="viewport-panel studio-panel-preview">
                <div className="panel-mock-header">
                  <div className="flex items-center gap-2">
                    <PenTool size={15} className="text-violet" />
                    <strong>Content Studio · Product Launch Email Sequence</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-primary">Tone: Conversational</span>
                    <span className="badge badge-neutral">Length: Medium (~480 words)</span>
                  </div>
                </div>

                <div className="preview-studio-body">
                  <div className="studio-output-paper">
                    <div className="paper-header">
                      <span className="paper-subject">Subject: Say Goodbye to Single-Use Plastic Forever 🌿</span>
                      <span className="paper-timestamp">Draft generated in 1.4s</span>
                    </div>
                    <div className="paper-content">
                      <p>Hey [First Name],</p>
                      <p>
                        Every year, billions of disposable bottles end up in landfills. We thought it was time someone engineered a permanent solution.
                      </p>
                      <p>
                        Introducing <strong>AeroFlask</strong> — the world&apos;s first modular hydration system forged from 100% aerospace titanium:
                      </p>
                      <ul>
                        <li>⚡ Keeps drinks sub-zero cold for 36 continuous hours</li>
                        <li>🔒 Magnetic rapid-lock lid with zero mechanical gaskets</li>
                        <li>🌱 Lifetime warranty with 100% recyclable components</li>
                      </ul>
                      <p>
                        For the next 48 hours, use code <strong>EARLYCREATOR</strong> to unlock 20% off your founding batch order.
                      </p>
                    </div>
                    <div className="paper-footer">
                      <button type="button" className="btn btn-primary btn-sm">
                        <Bookmark size={13} />
                        <span>Save to Library</span>
                      </button>
                      <button type="button" className="btn btn-outline btn-sm">
                        <Copy size={13} />
                        <span>Copy Draft</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeShowcaseTab === 'library' && (
              <div className="viewport-panel library-panel-preview">
                <div className="panel-mock-header">
                  <div className="flex items-center gap-2">
                    <Bookmark size={15} className="text-violet" />
                    <strong>Personal Knowledge Library</strong>
                    <span className="badge badge-neutral">3 Saved Assets</span>
                  </div>
                  <div className="library-filters-mini">
                    <span className="filter-pill active">All</span>
                    <span className="filter-pill">Research</span>
                    <span className="filter-pill">Marketing</span>
                    <span className="filter-pill">Text</span>
                  </div>
                </div>

                <div className="preview-library-grid">
                  <div className="lib-item-card">
                    <div className="lib-item-header">
                      <span className="badge badge-primary">RESEARCH</span>
                      <span className="lib-date">Oct 14, 2026</span>
                    </div>
                    <h4 className="lib-item-title">Solid-State Battery Breakthroughs (2026 Research Brief)</h4>
                    <p className="lib-item-snippet">
                      Commercial production for silicon-composite cathode cells shows a 35% density jump over conventional lithium-ion cells...
                    </p>
                    <div className="lib-item-tags">
                      <span className="tag">#CleanTech</span>
                      <span className="tag">#Batteries</span>
                      <span className="tag">#Hardware</span>
                    </div>
                  </div>

                  <div className="lib-item-card">
                    <div className="lib-item-header">
                      <span className="badge badge-success">MARKETING</span>
                      <span className="lib-date">Oct 13, 2026</span>
                    </div>
                    <h4 className="lib-item-title">Eco-Bottle Product Launch Newsletter Copy</h4>
                    <p className="lib-item-snippet">
                      Subject: Say Goodbye to Single-Use Plastic. Introducing AeroFlask, forged from aerospace titanium...
                    </p>
                    <div className="lib-item-tags">
                      <span className="tag">#EmailCopy</span>
                      <span className="tag">#Launch</span>
                    </div>
                  </div>

                  <div className="lib-item-card">
                    <div className="lib-item-header">
                      <span className="badge badge-neutral">TEXT</span>
                      <span className="lib-date">Oct 12, 2026</span>
                    </div>
                    <h4 className="lib-item-title">4-Step Go-to-Market Framework for Creators</h4>
                    <p className="lib-item-snippet">
                      Strategic blueprint detailing niche positioning, build-in-public distribution, and 60-second time-to-value onboarding...
                    </p>
                    <div className="lib-item-tags">
                      <span className="tag">#Strategy</span>
                      <span className="tag">#GTM</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* Plans & Pricing Section */}
      {activeSection === 'pricing' && (
      <section id="pricing" className="pricing-section">
        <div className="landing-container">
          <div className="section-header">
            <div className="section-badge">PLANS &amp; PRICING</div>
            <h2 className="section-title">Transparent Access. Scale at Your Own Pace.</h2>
            <p className="section-description">
              Get started with essential AI capabilities, or unlock unlimited workflows with our professional plans.
            </p>
          </div>

          <div className="pricing-grid">
            {/* Starter Plan */}
            <div className="pricing-card">
              <div className="pricing-card-header">
                <h3 className="plan-name">Starter</h3>
                <p className="plan-description">
                  Essential AI capabilities for individual exploration and everyday productivity.
                </p>
                <div className="plan-price-wrap">
                  <span className="plan-price">$0</span>
                  <span className="plan-period">Free forever</span>
                </div>
              </div>

              <ul className="plan-features-list">
                <li>
                  <Check size={16} className="feature-check" />
                  <span>Conversational AI Chat assistance</span>
                </li>
                <li>
                  <Check size={16} className="feature-check" />
                  <span>Real-time Web Search queries</span>
                </li>
                <li>
                  <Check size={16} className="feature-check" />
                  <span>Standard Content Studio format drafts</span>
                </li>
                <li>
                  <Check size={16} className="feature-check" />
                  <span>Personal Library storage (up to 50 items)</span>
                </li>
                <li>
                  <Check size={16} className="feature-check" />
                  <span>Standard response processing speed</span>
                </li>
              </ul>

              <div className="pricing-card-footer">
                <NavLink to="/register" className="btn btn-outline btn-block">
                  Create Account
                </NavLink>
              </div>
            </div>

            {/* Pro Creator Plan (Featured) */}
            <div className="pricing-card featured">
              <div className="popular-badge">RECOMMENDED</div>
              <div className="pricing-card-header">
                <h3 className="plan-name">Pro Creator</h3>
                <p className="plan-description">
                  Advanced workspace capabilities for active creators, writers, and power researchers.
                </p>
                <div className="plan-price-wrap">
                  <span className="plan-price">$24</span>
                  <span className="plan-period">/ month</span>
                </div>
              </div>

              <ul className="plan-features-list">
                <li>
                  <Check size={16} className="feature-check" />
                  <span>
                    <strong>Unlimited</strong> AI Chat multi-turn conversations
                  </span>
                </li>
                <li>
                  <Check size={16} className="feature-check" />
                  <span>
                    <strong>Live Web Search</strong> with verified source citations
                  </span>
                </li>
                <li>
                  <Check size={16} className="feature-check" />
                  <span>
                    <strong>Full Content Studio</strong> with custom tones &amp; lengths
                  </span>
                </li>
                <li>
                  <Check size={16} className="feature-check" />
                  <span>
                    <strong>Unlimited</strong> Saved Library storage &amp; tags
                  </span>
                </li>
                <li>
                  <Check size={16} className="feature-check" />
                  <span>Priority engine latency &amp; queue processing</span>
                </li>
                <li>
                  <Check size={16} className="feature-check" />
                  <span>1-Click Markdown &amp; structured copy export</span>
                </li>
              </ul>

              <div className="pricing-card-footer">
                <NavLink to="/register" className="btn btn-primary btn-block btn-glow">
                  <span>Start Pro Trial</span>
                  <ArrowRight size={15} />
                </NavLink>
              </div>
            </div>

            {/* Team & Studio Plan */}
            <div className="pricing-card">
              <div className="pricing-card-header">
                <h3 className="plan-name">Team &amp; Studio</h3>
                <p className="plan-description">
                  Comprehensive workspace for agencies, marketing teams, and growing creative brands.
                </p>
                <div className="plan-price-wrap">
                  <span className="plan-price">$69</span>
                  <span className="plan-period">/ month</span>
                </div>
              </div>

              <ul className="plan-features-list">
                <li>
                  <Check size={16} className="feature-check" />
                  <span>Everything included in Pro Creator</span>
                </li>
                <li>
                  <Check size={16} className="feature-check" />
                  <span>Collaborative shared team library</span>
                </li>
                <li>
                  <Check size={16} className="feature-check" />
                  <span>Advanced SEO planning &amp; topic clustering</span>
                </li>
                <li>
                  <Check size={16} className="feature-check" />
                  <span>Brand voice &amp; custom persona presets</span>
                </li>
                <li>
                  <Check size={16} className="feature-check" />
                  <span>Dedicated priority support &amp; onboarding</span>
                </li>
              </ul>

              <div className="pricing-card-footer">
                <NavLink to="/register" className="btn btn-outline btn-block">
                  Create Account
                </NavLink>
              </div>
            </div>
          </div>

          <div className="pricing-guarantee-note">
            <Shield size={16} className="text-violet" />
            <span>Encrypted &amp; private workspace. Cancel or upgrade your plan anytime from Settings.</span>
          </div>
        </div>
      </section>
      )}

      {/* FAQ Section (Shown on Home and FAQ nav) */}
      {(activeSection === 'all' || activeSection === 'faq') && (
      <section id="faq" className="faq-section">
        <div className="landing-container">
          <div className="section-header">
            <div className="section-badge">FREQUENTLY ASKED QUESTIONS</div>
            <h2 className="section-title">Clear Answers to Common Questions</h2>
            <p className="section-description">
              Find out how Zunme AI unifies research, drafting, and knowledge archiving.
            </p>
          </div>

          <div className="faq-accordion-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <span className="faq-chevron-box">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div id={`faq-answer-${index}`} className="faq-answer-content">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* Public Footer */}
      <footer className="landing-footer">
        <div className="landing-container">
          <div className="footer-top">
            <div className="footer-brand">
              <NavLink to="/" className="brand-link">
                <div className="brand-icon-box">
                  <span className="brand-glyph">Z</span>
                </div>
                <span className="brand-name">Zunme AI</span>
              </NavLink>
              <p className="footer-brand-desc">
                Your unified AI workspace for ideas, content &amp; discovery. Search the web, create compelling copy, and organize your work in one connected platform.
              </p>
              <div className="footer-status-pill">
                <span className="status-dot-active" />
                <span>All Workspace Systems Operational</span>
              </div>
            </div>

            <div className="footer-links-grid">
              {/* Product Links */}
              <div className="footer-col">
                <h4>Product</h4>
                <ul>
                  <li>
                    <a
                      href="#showcase"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveShowcaseTab('chat');
                        handleNavClick('showcase');
                      }}
                    >
                      AI Assistant
                    </a>
                  </li>
                  <li>
                    <a
                      href="#showcase"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveShowcaseTab('search');
                        handleNavClick('showcase');
                      }}
                    >
                      Live Web Search
                    </a>
                  </li>
                  <li>
                    <a
                      href="#showcase"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveShowcaseTab('studio');
                        handleNavClick('showcase');
                      }}
                    >
                      Content Studio
                    </a>
                  </li>
                  <li>
                    <a
                      href="#showcase"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveShowcaseTab('library');
                        handleNavClick('showcase');
                      }}
                    >
                      Personal Library
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('pricing');
                      }}
                    >
                      Plans &amp; Pricing
                    </a>
                  </li>
                </ul>
              </div>

              {/* Capabilities Links */}
              <div className="footer-col">
                <h4>Capabilities</h4>
                <ul>
                  <li>
                    <a href="#features" onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}>AI Chat</a>
                  </li>
                  <li>
                    <a href="#features" onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}>Web Search</a>
                  </li>
                  <li>
                    <a href="#features" onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}>AI Content Builders</a>
                  </li>
                  <li>
                    <a href="#features" onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}>AI Warehouse</a>
                  </li>
                  <li>
                    <a href="#features" onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}>Creator Tools</a>
                  </li>
                  <li>
                    <a href="#features" onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}>SEO Workspace</a>
                  </li>
                </ul>
              </div>

              {/* Platform & Company */}
              <div className="footer-col">
                <h4>Company</h4>
                <ul>
                  <li>
                    <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('all'); }}>About Zunme AI</a>
                  </li>
                  <li>
                    <a href="#how-it-works" onClick={(e) => { e.preventDefault(); handleNavClick('how-it-works'); }}>How It Works</a>
                  </li>
                  <li>
                    <a href="#faq" onClick={(e) => { e.preventDefault(); handleNavClick('faq'); }}>FAQ</a>
                  </li>
                  <li>
                    <NavLink to="/login" className="footer-modal-trigger-btn">
                      Sign In / Workspaces
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Create Account</NavLink>
                  </li>
                </ul>
              </div>

              {/* Legal & Support */}
              <div className="footer-col">
                <h4>Trust &amp; Support</h4>
                <ul>
                  <li>
                    <NavLink to="/contact">Contact Support</NavLink>
                  </li>
                  <li>
                    <NavLink to="/privacy">Privacy Policy</NavLink>
                  </li>
                  <li>
                    <NavLink to="/terms">Terms of Service</NavLink>
                  </li>
                  <li>
                    <a href="#faq">FAQ &amp; Architecture</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <span>&copy; {new Date().getFullYear()} Zunme AI. All rights reserved.</span>
            </div>
            <div className="footer-footnote">
              <span>Engineered for creators, researchers, and modern knowledge workers.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Dashboard Selection & Instant Access Modal */}
      <DashboardLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};
