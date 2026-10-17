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
  ShieldCheck,
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
  ArrowUpRight,
  Megaphone,
  Mail,
  Server,
  Briefcase,
  Landmark,
  Activity,
  Award,
  Film,
  ShoppingBag,
  Store,
  Smile,
  Image as ImageIcon,
  Video,
  Bot,
  Download,
  Eye,
  Scale
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DashboardLoginModal } from '../components/modals/DashboardLoginModal';
import { EcosystemAppsLauncher } from '../components/layout/EcosystemAppsLauncher';
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

export interface EcosystemProduct {
  id: string;
  name: string;
  tagline: string;
  category: 'AI & Intelligence' | 'Communication & Cloud' | 'Commerce & Capital' | 'Media & Creative';
  badge: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
  iconBg: string;
  accentColor: string;
  linkTo: string;
  linkText: string;
}

export const ZUNME_ECOSYSTEM_PRODUCTS: EcosystemProduct[] = [
  {
    id: 'zunme-ai',
    name: 'Zunme AI',
    tagline: 'Voice Agent & Multimodal Assistant',
    category: 'AI & Intelligence',
    badge: 'Flagship Assistant',
    description: 'Conversational voice intelligence and autonomous reasoning engine tailored for personal and business inquiries.',
    highlights: ['Voice & conversational dialogue', 'Real-time grounding', 'Multimodal analysis'],
    icon: <Sparkles size={22} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    accentColor: '#8B5CF6',
    linkTo: '/user/chat',
    linkText: 'Launch AI Assistant'
  },
  {
    id: 'zbox',
    name: 'zBox',
    tagline: 'Communication & MVP Content Sharing',
    category: 'Communication & Cloud',
    badge: 'Universal Inbox (Gmail-Style)',
    description: 'Gmail-style internal mail suite with eBOX cross-platform sharing to Google, Facebook, Instagram, YouTube, TikTok, LinkedIn, Amazon & X.',
    highlights: ['eBOX cross-platform dispatch', 'Integrated mailbox & drafts', 'One-click AI asset attachments'],
    icon: <Mail size={22} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
    accentColor: '#0284C7',
    linkTo: '/zbox',
    linkText: 'Open zBox Hub'
  },
  {
    id: 'content-studio',
    name: 'AI Content Studio',
    tagline: 'CRM nErgy Integrated Copy Engine',
    category: 'AI & Intelligence',
    badge: 'Enterprise Drafting',
    description: 'High-velocity marketing copy, email outreach funnels, and executive content drafting linked directly with CRM nErgy pipelines.',
    highlights: ['Deep CRM nErgy sync', '30+ marketing formats', 'Tone & persona calibration'],
    icon: <PenTool size={22} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #C084FC 0%, #9333EA 100%)',
    accentColor: '#C084FC',
    linkTo: '/user/builders',
    linkText: 'Launch Content Studio'
  },
  {
    id: 'zunme-content',
    name: 'Zunme Content',
    tagline: 'AI Content, Images, Photos & Videos',
    category: 'Media & Creative',
    badge: 'Creative Media Suite',
    description: 'All-in-one AI visual generation and licensing hub covering 3D animations, cartoons, photorealistic images, and cinematic video reels.',
    highlights: ['Animation & cartoon engines', 'Ultra-HD photo synthesis', 'Cinematic video creator'],
    icon: <Film size={22} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
    accentColor: '#EC4899',
    linkTo: '/store',
    linkText: 'Explore Creative Store'
  },
  {
    id: 'zunme-cloud',
    name: 'Zunme Cloud',
    tagline: 'Hosting, Storage & Server Management',
    category: 'Communication & Cloud',
    badge: 'Cloud Infrastructure',
    description: 'High-performance cloud hosting, edge-cached prompt warehouses, and distributed server architecture powering all Zunme microservices.',
    highlights: ['10 GB base cloud quota', 'Encrypted asset repository', 'Edge compute delivery'],
    icon: <Server size={22} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)',
    accentColor: '#6366F1',
    linkTo: '/warehouse',
    linkText: 'Manage Cloud Warehouse'
  },
  {
    id: 'crm-nergy',
    name: 'CRM nErgy',
    tagline: 'CRM & ERP AI Business Platform',
    category: 'Commerce & Capital',
    badge: 'Business Automation',
    description: 'Intelligent business operating system synchronizing customer management, pipeline stages, and enterprise resource planning.',
    highlights: ['Omnichannel lead capture', 'AI sales forecasting', 'Automated follow-up workflows'],
    icon: <Briefcase size={22} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    accentColor: '#10B981',
    linkTo: '/business',
    linkText: 'Launch CRM nErgy'
  },
  {
    id: 'oal-marketplace',
    name: 'OAL Marketplace',
    tagline: 'Online Money & Financing Marketplace',
    category: 'Commerce & Capital',
    badge: 'Funding & Loans',
    description: 'Premier capital marketplace connecting small business owners, startup founders, and real estate investors with institutional funding and credit lines.',
    highlights: ['SBA & commercial loans', 'Real estate project financing', 'Direct lending syndication'],
    icon: <Landmark size={22} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)',
    accentColor: '#F59E0B',
    linkTo: '/business/overview',
    linkText: 'Explore Financing'
  },
  {
    id: 'oal-money-club',
    name: 'OAL Money Club [INV IQ]',
    tagline: 'AI Investor Scoring & Credit Tool',
    category: 'Commerce & Capital',
    badge: 'INV IQ AI Engine',
    description: 'Proprietary AI scoring algorithm analyzing financial metrics to identify and certify credit-worthy investors and low-risk project deals.',
    highlights: ['Proprietary INV IQ score', 'Automated underwriting check', 'Verified investor network'],
    icon: <Award size={22} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
    accentColor: '#EF4444',
    linkTo: '/business/overview',
    linkText: 'Check INV IQ Matrix'
  },
  {
    id: 'omp-deals',
    name: 'OMP Deals',
    tagline: 'Online Commercial Marketplace',
    category: 'Commerce & Capital',
    badge: 'Sellers & Buyers Hub',
    description: 'Integrated commercial trade hub directly connecting suppliers, e-commerce brands, and wholesale buyers with verified transaction escrow.',
    highlights: ['Verified merchant directory', 'Escrow deal settlement', 'Direct buyer-seller RFQs'],
    icon: <ShoppingBag size={22} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)',
    accentColor: '#14B8A6',
    linkTo: '/merchant-zone',
    linkText: 'Visit OMP Deals'
  },
  {
    id: 'swmtp',
    name: 'SWMTP',
    tagline: 'Super Web Mastering & Tracking Platform',
    category: 'AI & Intelligence',
    badge: 'Telemetry & Analytics',
    description: 'Comprehensive website telemetry platform for real-time tracking, conversion funnels, SERP rank analytics, and comprehensive site health reporting.',
    highlights: ['Real-time traffic telemetry', 'Conversion attribution audit', 'Automated SEO rank tracking'],
    icon: <Activity size={22} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    accentColor: '#3B82F6',
    linkTo: '/seo',
    linkText: 'Open SWMTP Platform'
  }
];

export interface StoreShowcaseCategory {
  id: string;
  name: string;
  tag: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  stats: string;
  thumbnail: string;
  linkTo: string;
}

export const ZUNME_STORE_SHOWCASE_CATEGORIES: StoreShowcaseCategory[] = [
  {
    id: 'ai-content',
    name: 'AI Content',
    tag: 'Prompts & Frameworks',
    description: 'High-converting marketing frameworks, viral hook sequences, and executive prompt engineering libraries.',
    icon: <Sparkles size={18} />,
    accentColor: '#8B5CF6',
    stats: '3,400+ Downloads • 4.9★',
    thumbnail: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=600&q=80',
    linkTo: '/store/ai-content'
  },
  {
    id: 'animation',
    name: 'Animation',
    tag: 'Motion Graphics',
    description: 'Cyberpunk HUD overlays, kinetic typography sequences, and seamless 60fps loopable motion graphics.',
    icon: <Film size={18} />,
    accentColor: '#EC4899',
    stats: '1,420+ Downloads • 4.9★',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    linkTo: '/store/animation'
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    tag: '3D Character Design',
    description: 'Rigged 3D Pixar-style character kits, expressive avatars, and comic asset packs ready for animation.',
    icon: <Smile size={18} />,
    accentColor: '#F59E0B',
    stats: '860+ Downloads • 4.9★',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    linkTo: '/store/cartoon'
  },
  {
    id: 'images-photos',
    name: 'Images / Photos',
    tag: '8K Photorealistic',
    description: 'Pristine 8K photorealistic studio environments, commercial editorial scenes, and e-commerce podium mockups.',
    icon: <ImageIcon size={18} />,
    accentColor: '#06B6D4',
    stats: '5,120+ Downloads • 5.0★',
    thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    linkTo: '/store/images'
  },
  {
    id: 'videos-ai-videos',
    name: 'Videos / AI Videos',
    tag: 'Spatial 4K B-Roll',
    description: 'Breathtaking 4K spatial AI drone footage, futuristic metropolis reels, and commercial advertising b-roll.',
    icon: <Video size={18} />,
    accentColor: '#3B82F6',
    stats: '3,200+ Downloads • 4.9★',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    linkTo: '/store/videos'
  },
  {
    id: 'ai-builder',
    name: 'AI Builder',
    tag: 'Autonomous Agents',
    description: 'Pre-trained retrieval agents, CRM automation pipelines, and custom persona bot architectures.',
    icon: <Bot size={18} />,
    accentColor: '#10B981',
    stats: '2,950+ Downloads • 4.9★',
    thumbnail: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=600&q=80',
    linkTo: '/store/ai-builder'
  }
];

export type LandingSection = 'all' | 'agent' | 'features' | 'how-it-works' | 'showcase' | 'pricing' | 'faq' | 'ecosystem' | 'store';

export const LandingPage: React.FC = () => {
  const { user } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showTrademarkModal, setShowTrademarkModal] = useState<boolean>(false);
  const [copiedTrademarkDossier, setCopiedTrademarkDossier] = useState<boolean>(false);
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'chat' | 'search' | 'studio' | 'library'>('chat');
  const navigate = useNavigate();
  const [askZunmeQuery, setAskZunmeQuery] = useState('');
  const [isSubmittingQuery, setIsSubmittingQuery] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeSection, setActiveSection] = useState<LandingSection>('all');
  const [activeEcosystemCategory, setActiveEcosystemCategory] = useState<string>('All');

  const handleCopyTrademarkDossier = () => {
    const dossierText = `--- ZUNME — MY AI AGENT™ TRADEMARK FILING SPECIFICATION ---
Mark Name: Zunme — My AI Agent™
Legal Status: 100% Original Neural Artwork • Free from Third-Party IP & Copyright Encumbrances
USPTO & Global Classes: International Class 009 (Autonomous AI Agents & Software) & Class 042 (Cloud AI SaaS)
Applicant / Owner: Johnny Baum / Zunme AI Holdings
Master Graphic Asset: /zunme_ai_agent_original.jpg (1536 x 1536 px, RGB Lossless)
Hex Palette:
- Electric Violet: #7C3AED
- Cyber Cyan: #06B6D4
- Neural Emerald: #10B981
- Deep Obsidian: #0B0F19
Ready for Formal Attorney Trademark Registration.`;
    navigator.clipboard.writeText(dossierText);
    setCopiedTrademarkDossier(true);
    setTimeout(() => setCopiedTrademarkDossier(false), 2500);
  };

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

  const heroQuickLaunchers = [
    { id: 'chat', label: 'AI Chat', to: '/user/chat', icon: <MessageSquare size={13} />, accent: '#8B5CF6' },
    { id: 'search', label: 'Web Search', to: '/user/search', icon: <Search size={13} />, accent: '#0284C7' },
    { id: 'builders', label: 'AI Content Builders', to: '/user/builders', icon: <PenTool size={13} />, accent: '#9333EA' },
    { id: 'warehouse', label: 'AI Warehouse', to: '/warehouse', icon: <Database size={13} />, accent: '#6366F1' },
    { id: 'creator', label: 'Creator Tools', to: '/creator', icon: <Wand2 size={13} />, accent: '#EC4899' },
    { id: 'seo', label: 'SEO Workspace', to: '/seo', icon: <TrendingUp size={13} />, accent: '#10B981' }
  ];

  const workflowSteps: StepItem[] = [
    {
      number: '01',
      title: 'Discover',
      action: 'Query & Verify (Zunme nTel™)',
      description: 'Zunme nTel crawlers (Smartphones & Desktop) browse live web nodes to gather verified facts, live citations, and zero-hallucination data.',
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
      <div className="landing-atmosphere-wrap" aria-hidden="true">
        <div className="cosmic-grid-overlay" />
        <div className="ambient-aurora-top" />
        <div className="ambient-aurora-accent" />
      </div>

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
              <img src="/zunme_logo.png" alt="Zunme AI" style={{ height: '33px', width: 'auto', display: 'block' }} />
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="landing-nav-links" aria-label="Main Navigation">
              <button
                type="button"
                className={activeSection === 'agent' ? 'active' : ''}
                onClick={() => handleNavClick('agent')}
              >
                AI Agent™
              </button>
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
                className={activeSection === 'ecosystem' ? 'active' : ''}
                onClick={() => handleNavClick('ecosystem')}
              >
                Ecosystem
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
              <button
                type="button"
                className={activeSection === 'store' ? 'active' : ''}
                onClick={() => handleNavClick('store')}
              >
                Store
              </button>
            </nav>

            {/* Header Right Actions */}
            <div className="header-actions">
              <EcosystemAppsLauncher variant="dark" />
              <NavLink
                to="/ads"
                className="btn btn-primary btn-sm btn-glow"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: '700'
                }}
              >
                <Megaphone size={13} color="#FFFFFF" />
                <span>Advertise</span>
              </NavLink>
              <NavLink to="/login" className="btn btn-primary btn-sm btn-glow">
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
                className={activeSection === 'agent' ? 'active' : ''}
                onClick={() => handleNavClick('agent')}
              >
                Zunme — My AI Agent™
              </button>
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
                className={activeSection === 'ecosystem' ? 'active' : ''}
                onClick={() => handleNavClick('ecosystem')}
              >
                Zunme Ecosystem (10 Platforms)
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
              <button
                type="button"
                className={activeSection === 'store' ? 'active' : ''}
                onClick={() => handleNavClick('store')}
              >
                Store (Zunme Shop)
              </button>
            </nav>
            <div className="mobile-drawer-actions">
              <NavLink
                to="/ads"
                className="btn btn-primary btn-block btn-glow"
                style={{
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontWeight: '800'
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Megaphone size={15} color="#FFFFFF" />
                <span>Advertise on Zunme (PPC / PPV)</span>
              </NavLink>
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
                className="btn btn-primary btn-block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </NavLink>
            </div>
          </div>
        )}
      </header>

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

          {/* Client Signature Branding: "Make AI Your Best Friend" & 6 Quick Workspace Launchers */}
          <div className="hero-best-friend-block">
            <div className="hero-best-friend-header">
              <Sparkles size={14} className="hero-best-friend-sparkle" />
              <span className="hero-best-friend-tagline">Make AI Your Best Friend</span>
              <span className="hero-best-friend-dot">•</span>
              <span className="hero-best-friend-subtag">Direct Workspace Launchers</span>
            </div>

            <div className="hero-launcher-pills-row">
              {heroQuickLaunchers.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  className="hero-launcher-pill"
                  style={{ '--pill-accent': item.accent } as React.CSSProperties}
                  title={`Open ${item.label}`}
                >
                  <span className="launcher-pill-icon-wrap">{item.icon}</span>
                  <span className="launcher-pill-name">{item.label}</span>
                  <ArrowUpRight size={13} className="launcher-pill-arrow" />
                </NavLink>
              ))}
            </div>

            <p className="hero-launcher-caption">
              Dedicated AI capabilities organized into one seamless workspace. No tab hopping, no disconnected tools.
            </p>
          </div>

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

          {/* Hero CTAs & Gap 3: Fast-Track Advertiser Onboarding Button */}
          <div
            className="hero-cta-group"
            style={{
              display: 'flex',
              gap: '14px',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              margin: '22px 0 26px 0'
            }}
          >
            <NavLink
              to="/register"
              className="btn btn-primary btn-glow"
              style={{ padding: '12px 28px', fontSize: '15px', fontWeight: '800' }}
            >
              <span>Get Started Free</span>
              <ArrowRight size={15} />
            </NavLink>
            <NavLink
              to="/ads/create-campaign"
              className="hero-ads-ppc-btn"
            >
              <Megaphone size={16} color="#7C3AED" />
              <span>Advertise on Zunme (From $10/day)</span>
              <span className="hero-ads-ppc-badge">PPC / PPV</span>
            </NavLink>
          </div>

          {/* Universal SSO Protected Signal (Client Doc Lines 226-230) */}
          <div className="hero-sso-trust-strip">
            <ShieldCheck size={14} className="text-emerald" />
            <span>Single Sign-On (SSO): Users have the option to use one password to access all Zunme platforms</span>
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

                <div className="bento-crawler-pill">
                  <span className="zntel-pulse-dot" />
                  <span>Powered by Zunme nTel™ Crawler Engine</span>
                </div>

                <div className="bento-card-footer">
                  <button
                    type="button"
                    className="bento-action-link"
                    onClick={() => {
                      setActiveShowcaseTab('search');
                      handleNavClick('showcase');
                    }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <span>View Zunme nTel Crawler Telemetry</span>
                    <ArrowRight size={13} />
                  </button>
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

      {/* Zunme — My AI Agent™ Original Trademark Visual & Showcase (Zip 24 Client Task) */}
      {(activeSection === 'all' || activeSection === 'agent') && (
        <section id="ai-agent" className="ai-agent-section">
          <div className="landing-container">
            <div className="ai-agent-grid">
              {/* Left Column: Original Master Asset Visual Card */}
              <div className="ai-agent-visual-card">
                <div className="ai-agent-media-frame">
                  <img
                    src="/zunme_ai_agent_original.jpg"
                    alt="Zunme — My AI Agent™ Original Trademark Asset"
                    className="ai-agent-img"
                  />
                  <div className="ai-agent-media-overlay" />
                  <div className="ai-agent-badge-top">
                    <span className="ai-agent-pulse-dot" />
                    <span>USPTO TRADEMARK SPEC READY</span>
                  </div>
                  <div className="ai-agent-badge-bottom-info">
                    <span>100% Original Neural Artwork</span>
                    <span className="ai-agent-resolution-pill">1536 × 1536 MASTER</span>
                  </div>
                </div>

                <div className="ai-agent-card-controls">
                  <button
                    type="button"
                    className="btn-inspect-trademark"
                    onClick={() => setShowTrademarkModal(true)}
                  >
                    <Eye size={15} />
                    <span>Inspect Trademark Asset &amp; Dossier</span>
                  </button>

                  <NavLink
                    to="/user/chat"
                    className="btn btn-primary btn-block btn-glow"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '11px',
                      fontWeight: 700,
                      borderRadius: '12px'
                    }}
                  >
                    <Bot size={16} />
                    <span>Launch Zunme AI Agent Chat</span>
                    <ArrowRight size={14} />
                  </NavLink>
                </div>
              </div>

              {/* Right Column: Architectural & Legal Specifications */}
              <div className="ai-agent-info-col">
                <div className="ai-agent-kicker">
                  <Sparkles size={13} />
                  <span>ORIGINAL INTELLECTUAL PROPERTY • TRADEMARK READY</span>
                </div>

                <h2 className="ai-agent-headline">
                  Meet <span className="ai-agent-headline-gradient">Zunme — My AI Agent™</span>
                </h2>

                <p className="ai-agent-lead-text">
                  Bespoke, copyright-clear cybernetic neural identity designed specifically for client trademark registration with the USPTO and international trademark authorities. Free from third-party intellectual property encumbrances, engineered for autonomous multi-platform execution.
                </p>

                <div className="ai-agent-spec-cards-grid">
                  <div className="ai-agent-spec-card" style={{ '--card-accent': '#7C3AED' } as React.CSSProperties}>
                    <div className="ai-agent-spec-header">
                      <div className="ai-agent-spec-icon-box" style={{ background: '#7C3AED' }}>
                        <Scale size={16} />
                      </div>
                      <h4 className="ai-agent-spec-title">100% Original Trademark IP</h4>
                    </div>
                    <p className="ai-agent-spec-desc">
                      Custom-crafted neural visual identity designed without infringing stock or competitor assets, enabling direct trademark filing by legal counsel.
                    </p>
                  </div>

                  <div className="ai-agent-spec-card" style={{ '--card-accent': '#06B6D4' } as React.CSSProperties}>
                    <div className="ai-agent-spec-header">
                      <div className="ai-agent-spec-icon-box" style={{ background: '#06B6D4' }}>
                        <Bot size={16} />
                      </div>
                      <h4 className="ai-agent-spec-title">Multi-Platform Autonomy</h4>
                    </div>
                    <p className="ai-agent-spec-desc">
                      Autonomous execution coordinating workflows across all 10 Zunme connected platforms including zBox, CRM nErgy, and Content Studio.
                    </p>
                  </div>

                  <div className="ai-agent-spec-card" style={{ '--card-accent': '#10B981' } as React.CSSProperties}>
                    <div className="ai-agent-spec-header">
                      <div className="ai-agent-spec-icon-box" style={{ background: '#10B981' }}>
                        <Zap size={16} />
                      </div>
                      <h4 className="ai-agent-spec-title">Multimodal Neural Perception</h4>
                    </div>
                    <p className="ai-agent-spec-desc">
                      Integrated voice commands, visual comprehension, real-time web grounding via Zunme nTel™, and instant sub-second response times.
                    </p>
                  </div>

                  <div className="ai-agent-spec-card" style={{ '--card-accent': '#F59E0B' } as React.CSSProperties}>
                    <div className="ai-agent-spec-header">
                      <div className="ai-agent-spec-icon-box" style={{ background: '#F59E0B' }}>
                        <ShieldCheck size={16} />
                      </div>
                      <h4 className="ai-agent-spec-title">Universal SSO &amp; Privacy</h4>
                    </div>
                    <p className="ai-agent-spec-desc">
                      End-to-end encrypted sessions with zero training on confidential user communications, accessible instantly with your Zunme Single Sign-On account.
                    </p>
                  </div>
                </div>

                <div className="ai-agent-bottom-trust">
                  <div className="ai-agent-trust-item">
                    <ShieldCheck size={15} color="#34D399" />
                    <span>USPTO Class 009 &amp; 042 Registration Dossier</span>
                  </div>
                  <span className="ai-agent-trust-divider" />
                  <div className="ai-agent-trust-item">
                    <Cpu size={15} color="#38BDF8" />
                    <span>1536×1536 Master Resolution Asset</span>
                  </div>
                  <span className="ai-agent-trust-divider" />
                  <div className="ai-agent-trust-item">
                    <Award size={15} color="#A78BFA" />
                    <span>Attorney Filing Clearance Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Zunme Ecosystem & Connected Platforms Showcase (Google Products Style) */}
      {(activeSection === 'all' || activeSection === 'ecosystem') && (
        <section id="ecosystem" className="ecosystem-section">
          <div className="landing-container">
            <div className="section-header">
              <div className="section-badge">ZUNME ECOSYSTEM • 10 CONNECTED PLATFORMS</div>
              <h2 className="section-title">One Unified Ecosystem. Infinite Capability.</h2>
              <p className="section-description">
                Explore Zunme's family of interconnected platforms, specialized AI tools, and enterprise engines — all accessible with your single Zunme Universal Account.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="ecosystem-filter-bar">
              {['All', 'AI & Intelligence', 'Communication & Cloud', 'Commerce & Capital', 'Media & Creative'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`ecosystem-filter-btn ${activeEcosystemCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveEcosystemCategory(cat)}
                >
                  {cat === 'All' ? '⚡ All 10 Platforms' : cat}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="ecosystem-grid">
              {ZUNME_ECOSYSTEM_PRODUCTS
                .filter((p) => activeEcosystemCategory === 'All' || p.category === activeEcosystemCategory)
                .map((product) => (
                  <div
                    key={product.id}
                    className="ecosystem-card"
                    style={{ '--card-accent': product.accentColor } as React.CSSProperties}
                  >
                    <div className="ecosystem-card-top">
                      <div className="ecosystem-icon-box" style={{ background: product.iconBg }}>
                        {product.icon}
                      </div>
                      <span className="ecosystem-badge">{product.badge}</span>
                    </div>

                    <h3 className="ecosystem-name">{product.name}</h3>
                    <p className="ecosystem-tagline">{product.tagline}</p>
                    <p className="ecosystem-desc">{product.description}</p>

                    <ul className="ecosystem-highlights">
                      {product.highlights.map((h, i) => (
                        <li key={i} className="ecosystem-highlight-item">
                          <span className="ecosystem-highlight-dot" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="ecosystem-card-footer">
                      <span className="ecosystem-sso-badge">✓ Single Sign-On</span>
                      <NavLink to={product.linkTo} className="ecosystem-action-link">
                        <span>{product.linkText}</span>
                        <ArrowRight size={13} />
                      </NavLink>
                    </div>
                  </div>
                ))}
            </div>

            {/* Universal SSO Callout Banner */}
            <div className="ecosystem-sso-callout-banner">
              <div className="ecosystem-sso-content">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ background: '#7C3AED', color: '#FFFFFF', fontSize: '11px', fontWeight: 800, padding: '3px 9px', borderRadius: '12px', letterSpacing: '0.04em' }}>
                    UNIVERSAL SSO
                  </span>
                  <span style={{ color: '#DDD6FE', fontSize: '12.5px', fontWeight: 600 }}>One Login For Everything</span>
                </div>
                <h3 className="ecosystem-sso-title">One Universal Account Across All 10 Zunme Platforms</h3>
                <p className="ecosystem-sso-desc">
                  Switch effortlessly between AI Voice Assistant, zBox Communication, CRM nErgy, OAL Marketplace, and Cloud Storage without multiple logins or data silos.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <NavLink to="/register" className="btn btn-primary" style={{ background: '#7C3AED', borderColor: '#8B5CF6', padding: '10px 22px', fontWeight: 700 }}>
                  <span>Create Universal Account</span>
                  <ArrowRight size={15} />
                </NavLink>
                <NavLink to="/login" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.25)', color: '#FFFFFF', padding: '10px 20px', fontWeight: 600 }}>
                  Sign In to Ecosystem
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Zunme Store & Creative Asset Shop Showcase */}
      {(activeSection === 'all' || activeSection === 'store') && (
        <section id="store-showcase" className="store-showcase-section">
          <div className="landing-container">
            <div className="section-header">
              <div className="section-badge">
                <Store size={13} />
                <span>ZUNME SHOP • CREATIVE DIGITAL ASSET STORE</span>
              </div>
              <h2 className="section-title">Production-Ready AI Assets &amp; Creative Media</h2>
              <p className="section-description">
                Explore thousands of verified prompts, 4K spatial videos, 3D animations, cartoon characters, and pre-trained AI builders in the Zunme Shop.
              </p>
            </div>

            {/* 6 Store Category Cards Grid */}
            <div className="store-showcase-grid">
              {ZUNME_STORE_SHOWCASE_CATEGORIES.map((cat) => (
                <NavLink
                  key={cat.id}
                  to={cat.linkTo}
                  className="store-showcase-card"
                  style={{ '--card-accent': cat.accentColor } as React.CSSProperties}
                >
                  <div className="store-card-img-wrap">
                    <img src={cat.thumbnail} alt={cat.name} className="store-card-img" loading="lazy" />
                    <div className="store-card-overlay" />
                    <span className="store-card-tag">{cat.tag}</span>
                    <div className="store-card-icon-badge" style={{ background: cat.accentColor }}>
                      {cat.icon}
                    </div>
                  </div>

                  <div className="store-card-body">
                    <div className="store-card-meta">
                      <h3 className="store-card-name">{cat.name}</h3>
                      <span className="store-card-stats">{cat.stats}</span>
                    </div>
                    <p className="store-card-desc">{cat.description}</p>
                    <div className="store-card-action">
                      <span>Explore {cat.name}</span>
                      <ArrowRight size={13} className="store-card-arrow" />
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>

            {/* Bottom Callout Banner */}
            <div className="store-showcase-bottom-strip">
              <div className="store-bottom-info">
                <div className="store-bottom-badge">
                  <ShoppingBag size={14} />
                  <span>COMMERCIAL CLEARANCE INCLUDED</span>
                </div>
                <h3 className="store-bottom-title">All Zunme Shop Assets Ready for Enterprise &amp; Creator Monetization</h3>
                <p className="store-bottom-desc">
                  Every asset is commercially cleared for YouTube, advertising campaigns, client deliverables, and e-commerce product placements.
                </p>
              </div>
              <div className="store-bottom-actions">
                <NavLink to="/store" className="btn btn-primary btn-glow" style={{ padding: '12px 24px', fontWeight: 800 }}>
                  <Store size={16} />
                  <span>Open Full Zunme Shop</span>
                  <ArrowRight size={15} />
                </NavLink>
                <NavLink to="/creator" className="btn btn-outline" style={{ borderColor: '#CBD5E1', color: '#1E293B', fontWeight: 700, padding: '12px 20px', background: '#FFFFFF' }}>
                  <span>Sell as Creator</span>
                </NavLink>
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
                        ? '/user/chat'
                        : cap.id === 'search'
                        ? '/user/search'
                        : cap.id === 'builders'
                        ? '/user/builders'
                        : '/user/library'
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

                  {/* Zunme nTel Web Crawler & SEO Grounding Transparency Card (Doc Lines 147-202) */}
                  <div className="zntel-crawler-transparency-card">
                    <div className="zntel-card-header">
                      <div className="zntel-badge-row">
                        <div className="zntel-status-pill">
                          <span className="zntel-pulse-dot" />
                          <span>ZUNME nTel™ CRAWLER TELEMETRY</span>
                        </div>
                        <span className="zntel-engine-tag">Mobile-First &amp; DOM Indexer</span>
                      </div>
                      <h4 className="zntel-card-title">
                        Powered by Zunme nTel™ Intelligent Web Crawler Architecture
                      </h4>
                      <p className="zntel-card-subtitle">
                        Zunme discovers, analyzes, and grounds live web intelligence through four specialized crawler bots with full DOM rendering and alt-text extraction.
                      </p>
                    </div>

                    {/* 4 Crawler Bots Grid */}
                    <div className="zntel-bots-grid">
                      <div className="zntel-bot-item">
                        <div className="zntel-bot-top">
                          <span className="zntel-bot-icon">📱</span>
                          <span className="zntel-bot-type">Mobile-First Indexer</span>
                        </div>
                        <h5 className="zntel-bot-name">Zunme nTel for Smartphones</h5>
                        <p className="zntel-bot-desc">
                          Simulates mobile user-agents to crawl responsive layouts and dynamic viewport assets, reflecting modern mobile-first search indexing standards.
                        </p>
                        <span className="zntel-bot-stat">Primary Crawl Volume: 78%</span>
                      </div>

                      <div className="zntel-bot-item">
                        <div className="zntel-bot-top">
                          <span className="zntel-bot-icon">🖥️</span>
                          <span className="zntel-bot-type">Full DOM &amp; Script Renderer</span>
                        </div>
                        <h5 className="zntel-bot-name">Zunme nTel for Desktop</h5>
                        <p className="zntel-bot-desc">
                          Executes dynamic JavaScript and renders complex multi-frame desktop applications to discover deep backlinks and verify source citations.
                        </p>
                        <span className="zntel-bot-stat">Full Headless Chromium</span>
                      </div>

                      <div className="zntel-bot-item">
                        <div className="zntel-bot-top">
                          <span className="zntel-bot-icon">🎯</span>
                          <span className="zntel-bot-type">Focused Topic Crawler</span>
                        </div>
                        <h5 className="zntel-bot-name">Zunme Types</h5>
                        <p className="zntel-bot-desc">
                          Targeted crawler engineered to scan specific topics, academic papers, technical documentation, and real-time news based on predefined criteria.
                        </p>
                        <span className="zntel-bot-stat">Vertical Domain Scanners</span>
                      </div>

                      <div className="zntel-bot-item">
                        <div className="zntel-bot-top">
                          <span className="zntel-bot-icon">🏢</span>
                          <span className="zntel-bot-type">Enterprise &amp; B2B Crawler</span>
                        </div>
                        <h5 className="zntel-bot-name">Zunme Eco (Economic)</h5>
                        <p className="zntel-bot-desc">
                          Enterprise crawler designed to index internal business intranets, private data feeds, and commercial product catalogs for secure AI synthesis.
                        </p>
                        <span className="zntel-bot-stat">Internal Enterprise Indexing</span>
                      </div>
                    </div>

                    {/* Image & Metadata Extraction Process (Doc Lines 153-168) */}
                    <div className="zntel-extraction-process">
                      <div className="zntel-process-header">
                        <Sparkles size={14} className="text-cyan" />
                        <strong>Automated Image &amp; Metadata Extraction Pipeline</strong>
                      </div>
                      <div className="zntel-pipeline-steps">
                        <div className="zntel-pipeline-step">
                          <span className="pipeline-num">01</span>
                          <div>
                            <strong>Scan &lt;img&gt; Tags</strong>
                            <p>Scans web pages to detect image URLs and visual assets.</p>
                          </div>
                        </div>
                        <div className="zntel-pipeline-step">
                          <span className="pipeline-num">02</span>
                          <div>
                            <strong>Alt-Text &amp; File Names</strong>
                            <p>Extracts descriptive alt tags, surrounding context &amp; file metadata.</p>
                          </div>
                        </div>
                        <div className="zntel-pipeline-step">
                          <span className="pipeline-num">03</span>
                          <div>
                            <strong>Computer Vision AI</strong>
                            <p>Evaluates visual features for zero-hallucination factual grounding.</p>
                          </div>
                        </div>
                        <div className="zntel-pipeline-step">
                          <span className="pipeline-num">04</span>
                          <div>
                            <strong>Live Source Links</strong>
                            <p>Indexes source URLs with publisher verification for 100% transparency.</p>
                          </div>
                        </div>
                      </div>
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
                <img src="/zunme_logo.png" alt="Zunme AI" style={{ height: '34px', width: 'auto', display: 'block' }} />
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
                  <li>
                    <NavLink to="/ads" style={{ color: '#C084FC', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Megaphone size={12} color="#C084FC" />
                      <span>Zunme Ads Platform (PPC/PPV)</span>
                    </NavLink>
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
                    <a href="#ecosystem" onClick={(e) => { e.preventDefault(); handleNavClick('ecosystem'); }}>Zunme Ecosystem (10 Platforms)</a>
                  </li>
                  <li>
                    <NavLink to="/store">Zunme Shop &amp; Store</NavLink>
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

      {/* Attorney Trademark Specification & Inspection Modal (Zip 24) */}
      {showTrademarkModal && (
        <div
          className="trademark-modal-backdrop"
          onClick={() => setShowTrademarkModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="trademark-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="trademark-modal-header">
              <div className="trademark-modal-header-left">
                <Scale size={20} color="#A78BFA" />
                <h3 className="trademark-modal-title">Zunme — My AI Agent™ Trademark Specification</h3>
                <span className="trademark-modal-badge">LEGAL CLEARANCE READY</span>
              </div>
              <button
                type="button"
                className="trademark-modal-close-btn"
                onClick={() => setShowTrademarkModal(false)}
                aria-label="Close Modal"
              >
                <X size={16} />
              </button>
            </div>

            <div className="trademark-modal-body">
              <div className="trademark-modal-preview-box">
                <img
                  src="/zunme_ai_agent_original.jpg"
                  alt="Zunme — My AI Agent Master Asset"
                  className="trademark-modal-img"
                />
                <div className="trademark-modal-img-meta">
                  <div><strong>Resolution:</strong> 1536 × 1536 px (Ultra-HD Master)</div>
                  <div><strong>Color Space:</strong> sRGB 24-bit Lossless</div>
                  <div><strong>Artwork Type:</strong> Original Bespoke Generation</div>
                </div>
              </div>

              <div className="trademark-modal-dossier">
                <div className="trademark-dossier-callout">
                  <strong>Attorney Filing Guidance:</strong> This graphic asset has been custom synthesized to establish an original, uncontested visual trademark for client Johnny Baum. It contains no copyrighted characters, logos, or commercial stock iconography.
                </div>

                <table className="trademark-table">
                  <tbody>
                    <tr>
                      <td className="label-col">Mark Name</td>
                      <td className="val-col"><strong>Zunme — My AI Agent™</strong></td>
                    </tr>
                    <tr>
                      <td className="label-col">USPTO Classes</td>
                      <td className="val-col">
                        International Class 009 (Computer software for artificial intelligence) &amp; Class 042 (Cloud software SaaS)
                      </td>
                    </tr>
                    <tr>
                      <td className="label-col">Applicant</td>
                      <td className="val-col">Johnny Baum / Zunme AI Platform Holdings</td>
                    </tr>
                    <tr>
                      <td className="label-col">IP Non-Infringement</td>
                      <td className="val-col">
                        <span style={{ color: '#34D399', fontWeight: 700 }}>✓ 100% Original Intellectual Property</span> (Zero Third-Party Trademark Conflicts)
                      </td>
                    </tr>
                    <tr>
                      <td className="label-col">Signature Palette</td>
                      <td className="val-col">
                        <div className="trademark-palettes">
                          <span className="trademark-swatch">
                            <span className="trademark-swatch-dot" style={{ background: '#7C3AED' }} />
                            #7C3AED (Violet)
                          </span>
                          <span className="trademark-swatch">
                            <span className="trademark-swatch-dot" style={{ background: '#06B6D4' }} />
                            #06B6D4 (Cyan)
                          </span>
                          <span className="trademark-swatch">
                            <span className="trademark-swatch-dot" style={{ background: '#10B981' }} />
                            #10B981 (Emerald)
                          </span>
                          <span className="trademark-swatch">
                            <span className="trademark-swatch-dot" style={{ background: '#0B0F19' }} />
                            #0B0F19 (Obsidian)
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="trademark-modal-footer">
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleCopyTrademarkDossier}
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {copiedTrademarkDossier ? <Check size={14} color="#34D399" /> : <Copy size={14} />}
                <span>{copiedTrademarkDossier ? 'Dossier Copied!' : 'Copy Filing Spec'}</span>
              </button>

              <a
                href="/zunme_ai_agent_original.jpg"
                download="Zunme_My_AI_Agent_Master_Trademark_Asset.jpg"
                className="btn btn-primary btn-glow"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', fontWeight: 700 }}
              >
                <Download size={15} />
                <span>Download Master Graphic</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
