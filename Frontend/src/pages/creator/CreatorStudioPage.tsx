import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  UploadCloud,
  ShieldCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  DollarSign,
  Package,
  Layers,
  Send,
  Search,
  Copy,
  Check,
  Download,
  Bookmark,
  BookmarkCheck,
  Star,
  Globe,
  Youtube,
  Github,
  X,
  Eye,
  SlidersHorizontal,
  Share2,
  FileCode,
  FileText,
  Video,
  Hash,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/dashboard.css';
import './CreatorStudioPage.css';

export interface CommunityMarketplaceAsset {
  id: string;
  title: string;
  type: 'Prompt Pack' | 'Template' | 'Workflow' | 'Video Script';
  category: 'Social Media' | 'SEO' | 'Branding' | 'Email' | 'Video';
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  isVerifiedCreator: boolean;
  description: string;
  fullPrompt: string;
  previewOutput?: string;
  tags: string[];
  licensing: 'Commercial Pro' | 'Standard Community' | 'MIT Open Source';
  downloads: number;
  rating: number;
  reviewsCount: number;
  createdAt: string;
  recommendedModel: string;
}

const INITIAL_COMMUNITY_ASSETS: CommunityMarketplaceAsset[] = [
  {
    id: 'asset-1',
    title: 'B2B SaaS Cold Outreach Sequence Engine',
    type: 'Workflow',
    category: 'Email',
    creatorName: 'Alex Johnson',
    creatorHandle: '@alex_ai_creator',
    creatorAvatar: 'AJ',
    isVerifiedCreator: true,
    description: 'A 4-step hyper-personalized email outreach workflow with LinkedIn soft-touch triggers, pain-point hooks, and automated objection handling.',
    fullPrompt: `[ROLE & CONTEXT]
You are an elite B2B enterprise SDR with a 42% reply rate on cold outbound campaigns.

[INPUT VARIABLES]
- Prospect Name: {{prospect_name}}
- Company & Industry: {{company_name}}, {{industry}}
- Recent Company Trigger Event: {{funding_or_hire}}
- Core Pain Point: {{specific_bottleneck}}

[INSTRUCTIONS]
Generate a 3-touch sequence:
Touch 1: Ultra-short observation (<65 words) referencing their recent trigger. Avoid pitch slapping.
Touch 2: Value-add framework (+2 days) offering a 1-page playbook addressing {{specific_bottleneck}}.
Touch 3: Graceful permission opt-out with low-friction ask ("Worth a 4-min chat this Thursday?").`,
    previewOutput: 'Subject: {{company_name}}\'s expansion into {{industry}} — quick observation\n\nHi {{prospect_name}},\n\nSaw your team\'s recent milestone with {{funding_or_hire}}. Most leaders at this stage hit a wall with {{specific_bottleneck}}...',
    tags: ['ColdOutreach', 'B2B', 'SalesEmail', 'LeadGen'],
    licensing: 'Commercial Pro',
    downloads: 4820,
    rating: 4.95,
    reviewsCount: 142,
    createdAt: '2026-09-12',
    recommendedModel: 'Zunme Omni-4'
  },
  {
    id: 'asset-2',
    title: 'Viral YouTube Script & Retention Hook Architecture',
    type: 'Video Script',
    category: 'Video',
    creatorName: 'Elena Rostova',
    creatorHandle: '@elena_visuals',
    creatorAvatar: 'ER',
    isVerifiedCreator: true,
    description: 'Structure high-retention video scripts with 3-second psychological visual hooks, curiosity loops, and high-converting CTA bridges.',
    fullPrompt: `[OBJECTIVE]
Write an 8-minute YouTube video script designed for 65%+ average viewer retention.

[SCRIPT FORMATTING REQUIREMENTS]
- [0:00 - 0:15] The Hook: Visual cue, tension premise, and bold contrast claim.
- [0:15 - 1:30] The Stakes: Why 90% fail and what changes today.
- [1:30 - 5:00] The 3 Core Pillars with micro-re-hooks every 45 seconds.
- [5:00 - 7:30] Proof & Real Case Study.
- [7:30 - 8:00] Seamless End-screen Handshake CTA.`,
    previewOutput: '[VISUAL: Extreme close-up on monitor showing crashing graph]\n\nNARRATOR: "In 2026, standard content strategies are dead. Here is why the top 1% secretly switched..."',
    tags: ['YouTube', 'Storytelling', 'VideoScript', 'Retention'],
    licensing: 'Commercial Pro',
    downloads: 3650,
    rating: 4.92,
    reviewsCount: 98,
    createdAt: '2026-09-28',
    recommendedModel: 'Zunme Creative Pro'
  },
  {
    id: 'asset-3',
    title: 'Deep Semantic SEO Topical Authority Cluster Blueprint',
    type: 'Prompt Pack',
    category: 'SEO',
    creatorName: 'Marcus Vance',
    creatorHandle: '@marcus_seo',
    creatorAvatar: 'MV',
    isVerifiedCreator: true,
    description: 'Transform a single root keyword into a complete 20-article topical authority silo with internal link schema and search intent classifications.',
    fullPrompt: `[SEO EXPERT DIRECTIVE]
Analyze the target pillar entity: {{primary_entity}}

1. Output a master Pillar Page outline targeting high-difficulty commercial search intent.
2. Generate 12 Supporting Cluster Topics categorized into Informational, Commercial, and Transactional.
3. Map exact internal anchor text suggestions connecting child cluster nodes to the parent pillar.`,
    tags: ['TopicalAuthority', 'SemanticSEO', 'ContentStrategy'],
    licensing: 'Commercial Pro',
    downloads: 5120,
    rating: 4.98,
    reviewsCount: 210,
    createdAt: '2026-10-02',
    recommendedModel: 'Zunme Omni-4'
  },
  {
    id: 'asset-4',
    title: 'Omnichannel Social Repurposing Engine (Twitter/X & LinkedIn)',
    type: 'Template',
    category: 'Social Media',
    creatorName: 'Sophia Lin',
    creatorHandle: '@sophialin_ai',
    creatorAvatar: 'SL',
    isVerifiedCreator: true,
    description: 'Ingest any long-form essay, video transcript, or podcast and instantly synthesize 5 high-engagement LinkedIn posts and 2 viral Twitter threads.',
    fullPrompt: `[REPURPOSING SYSTEM]
Input Raw Material: {{source_text_or_notes}}

Generate:
- 1 Contrarian LinkedIn Post (Hook -> Staccato Breakdown -> Lesson -> Question CTA)
- 1 Actionable Cheat-Sheet List Post
- 1 7-Tweet Thread with cliffhanger hooks on tweet 1 & 2
- 1 Personal Reflection Narrative`,
    tags: ['SocialMedia', 'LinkedInHooks', 'Threads', 'ViralGrowth'],
    licensing: 'MIT Open Source',
    downloads: 2940,
    rating: 4.88,
    reviewsCount: 76,
    createdAt: '2026-10-05',
    recommendedModel: 'Zunme Turbo'
  },
  {
    id: 'asset-5',
    title: 'Executive Brand Voice & Tone Identity Guidebook',
    type: 'Template',
    category: 'Branding',
    creatorName: 'Alex Johnson',
    creatorHandle: '@alex_ai_creator',
    creatorAvatar: 'AJ',
    isVerifiedCreator: true,
    description: 'Defines your brand voice guidelines, vocabulary blacklist, positioning pillars, and executive communication rules for consistent AI outputs.',
    fullPrompt: `[BRAND IDENTITY PROTOCOL]
Define the brand voice for {{brand_name}}.

Sections:
1. Brand Persona & Core Archetype
2. Tone Modulations: (Marketing vs Support vs Technical Docs)
3. "We Say This / We Never Say That" Vocabulary Guide
4. Sentence Structure, Cadence & Formatting Standard`,
    tags: ['BrandVoice', 'ExecutiveBranding', 'StyleGuide'],
    licensing: 'Standard Community',
    downloads: 1870,
    rating: 4.85,
    reviewsCount: 52,
    createdAt: '2026-09-18',
    recommendedModel: 'Zunme Omni-4'
  },
  {
    id: 'asset-6',
    title: 'High-Converting Paid Ad Copy Matrix (Meta & Google Ads)',
    type: 'Prompt Pack',
    category: 'Social Media',
    creatorName: 'David Kim',
    creatorHandle: '@davidkim_growth',
    creatorAvatar: 'DK',
    isVerifiedCreator: false,
    description: '30 modular ad copy variations targeting Problem-Agitate-Solve (PAS) and Before-After-Bridge (BAB) frameworks for performance marketers.',
    fullPrompt: `[PERFORMANCE AD CREATIVE]
Product / Offer: {{offer_details}}
Target Avatar: {{target_customer}}

Generate:
- 5 Short-form Facebook Ad primary texts (<125 characters)
- 5 Storytelling long-form copy variations
- 10 High-CTR Headlines with curiosity triggers
- 5 Google Search Responsive Ad Headlines & Descriptions`,
    tags: ['MetaAds', 'PaidSocial', 'Copywriting', 'Conversion'],
    licensing: 'Commercial Pro',
    downloads: 3290,
    rating: 4.91,
    reviewsCount: 84,
    createdAt: '2026-10-08',
    recommendedModel: 'Zunme Creative Pro'
  }
];

export const CreatorStudioPage: React.FC = () => {
  const {
    user,
    creatorSubmissions,
    addCreatorSubmission,
    showToast
  } = useApp();

  // Navigation Tabs with Route Sync
  type CreatorTabType = 'Marketplace & Showcase' | 'Upload Content' | 'My Submissions' | 'Creator Profile' | 'Earnings & Payouts';

  const { section } = useParams<{ section?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const slugToTab: Record<string, CreatorTabType> = {
    'marketplace': 'Marketplace & Showcase',
    'showcase': 'Marketplace & Showcase',
    'dashboard': 'Marketplace & Showcase',
    'upload': 'Upload Content',
    'publish': 'Upload Content',
    'submissions': 'My Submissions',
    'reviews': 'My Submissions',
    'earnings': 'Earnings & Payouts',
    'payouts': 'Earnings & Payouts',
    'monetization': 'Earnings & Payouts',
    'profile': 'Creator Profile'
  };

  const tabToSlug: Record<CreatorTabType, string> = {
    'Marketplace & Showcase': 'marketplace',
    'Upload Content': 'upload',
    'My Submissions': 'submissions',
    'Earnings & Payouts': 'earnings',
    'Creator Profile': 'profile'
  };

  const resolveCurrentTab = (): CreatorTabType => {
    if (section && slugToTab[section.toLowerCase()]) {
      return slugToTab[section.toLowerCase()];
    }
    const tabParam = searchParams.get('tab');
    if (tabParam && ['Marketplace & Showcase', 'Upload Content', 'My Submissions', 'Creator Profile', 'Earnings & Payouts'].includes(tabParam)) {
      return tabParam as CreatorTabType;
    }
    return 'Marketplace & Showcase';
  };

  const [activeTab, setActiveTabState] = useState<CreatorTabType>(resolveCurrentTab);

  useEffect(() => {
    setActiveTabState(resolveCurrentTab());
  }, [section, searchParams]);

  const setActiveTab = (tab: CreatorTabType) => {
    setActiveTabState(tab);
    const slug = tabToSlug[tab];
    navigate(slug === 'marketplace' ? '/creator/marketplace' : `/creator/${slug}`);
  };

  // Community Assets State
  const [communityAssets, setCommunityAssets] = useState<CommunityMarketplaceAsset[]>(INITIAL_COMMUNITY_ASSETS);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSort, setSelectedSort] = useState<'Most Popular' | 'Newest' | 'Top Rated'>('Most Popular');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Asset for Modal
  const [activeModalAsset, setActiveModalAsset] = useState<CommunityMarketplaceAsset | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Creator Profile State
  const [isFollowingCreator, setIsFollowingCreator] = useState(false);
  const [followersCount, setFollowersCount] = useState(2840);

  // Upload Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Prompt Pack' | 'Template' | 'Workflow' | 'Video Script'>('Prompt Pack');
  const [category, setCategory] = useState<'Social Media' | 'SEO' | 'Branding' | 'Email' | 'Video'>('Social Media');
  const [description, setDescription] = useState('');
  const [fullPrompt, setFullPrompt] = useState('');
  const [tagsInput, setTagsInput] = useState('ViralHooks, SocialGrowth, Engagement');
  const [licensing, setLicensing] = useState<'Commercial Pro' | 'Standard Community' | 'MIT Open Source'>('Commercial Pro');
  const [recommendedModel, setRecommendedModel] = useState('Zunme Omni-4');

  // Handle Form Submission
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !fullPrompt.trim()) {
      showToast('Please provide a title, description, and full prompt instructions', 'warning');
      return;
    }

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const newAsset: CommunityMarketplaceAsset = {
      id: `asset-${Date.now()}`,
      title: title.trim(),
      type,
      category,
      creatorName: user?.fullName || 'Alex Johnson',
      creatorHandle: `@${(user?.fullName || 'alex_creator').toLowerCase().replace(/\s+/g, '_')}`,
      creatorAvatar: (user?.fullName || 'AJ').slice(0, 2).toUpperCase(),
      isVerifiedCreator: true,
      description: description.trim(),
      fullPrompt: fullPrompt.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ['AI', category],
      licensing,
      downloads: 1,
      rating: 5.0,
      reviewsCount: 1,
      createdAt: new Date().toISOString().split('T')[0],
      recommendedModel
    };

    // Add to community assets list
    setCommunityAssets([newAsset, ...communityAssets]);

    // Also register in AppContext submissions
    addCreatorSubmission({
      title: title.trim(),
      type,
      category,
      status: 'APPROVED',
      feedback: 'Verified automated editorial validation passed.'
    });

    showToast(`Published "${title.trim()}" to the Creator Showcase!`, 'success');

    // Reset Form
    setTitle('');
    setDescription('');
    setFullPrompt('');
    setActiveTab('Marketplace & Showcase');
  };

  // 1-Click Actions
  const handleCopyPrompt = (asset: CommunityMarketplaceAsset) => {
    navigator.clipboard.writeText(asset.fullPrompt);
    setCopiedPromptId(asset.id);
    showToast('Prompt copied to clipboard!', 'success');
    setTimeout(() => setCopiedPromptId(null), 2500);
  };

  const handleForkToLibrary = (asset: CommunityMarketplaceAsset) => {
    showToast(`Blueprint "${asset.title}" successfully forked to your Personal Library!`, 'success');
  };

  const handleDownloadAsset = (asset: CommunityMarketplaceAsset) => {
    const content = `# ${asset.title}\n\n**Category**: ${asset.category} | **Type**: ${asset.type}\n**Creator**: ${asset.creatorName} (${asset.creatorHandle})\n**License**: ${asset.licensing}\n**Recommended Model**: ${asset.recommendedModel}\n\n## Description\n${asset.description}\n\n## Full Blueprint / Prompt\n\`\`\`\n${asset.fullPrompt}\n\`\`\`\n`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${asset.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_blueprint.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded "${asset.title}" (.md)`, 'success');
  };

  const handleToggleFollow = () => {
    if (isFollowingCreator) {
      setIsFollowingCreator(false);
      setFollowersCount((prev) => prev - 1);
      showToast('Unfollowed creator', 'info');
    } else {
      setIsFollowingCreator(true);
      setFollowersCount((prev) => prev + 1);
      showToast('Following Alex Johnson! You will get notified of new blueprints.', 'success');
    }
  };

  // Filtered & Sorted Showcase Assets
  const filteredAssets = useMemo(() => {
    return communityAssets
      .filter((asset) => {
        const matchesCategory = selectedCategory === 'ALL' || asset.category === selectedCategory;
        const matchesSearch =
          asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (selectedSort === 'Most Popular') return b.downloads - a.downloads;
        if (selectedSort === 'Newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (selectedSort === 'Top Rated') return b.rating - a.rating;
        return 0;
      });
  }, [communityAssets, selectedCategory, selectedSort, searchQuery]);

  const totalMarketplaceDownloads = communityAssets.reduce((sum, a) => sum + a.downloads, 0);

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Sparkles size={26} color="#6E56CF" />
            Creator Studio &amp; Marketplace
          </h1>
          <p className="dashboard-subtitle">
            Discover verified prompt packs, workflow blueprints, and creative frameworks published by the Zunme AI community.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setActiveTab('Upload Content')}
          >
            <UploadCloud size={14} />
            <span>Publish New Blueprint</span>
          </button>
        </div>
      </div>

      {/* Creator Profile Portfolio Banner */}
      <div className="creator-profile-card">
        <div className="creator-profile-header">
          <div className="creator-bio-section">
            <div className="creator-avatar-wrap">
              <div className="creator-avatar-circle">
                {user?.fullName?.charAt(0) || 'A'}
              </div>
              <div className="creator-avatar-badge" title="Verified Creator">
                <CheckCircle2 size={13} />
              </div>
            </div>

            <div className="creator-details">
              <div className="creator-name-row">
                <h2>{user?.fullName || 'Alex Johnson'}</h2>
                <span className="creator-handle">@alex_ai_creator</span>
                <span className="creator-verified-tag">
                  <ShieldCheck size={13} />
                  Verified Prompt Architect
                </span>
              </div>
              <p className="creator-bio-text">
                AI systems architect crafting high-converting B2B cold outbound sequences, semantic SEO blueprints, and autonomous content workflows for high-growth teams.
              </p>
              <div className="creator-specialties-row">
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#8C97B0', marginRight: '4px' }}>
                  Specialties:
                </span>
                <span className="specialty-tag">B2B Outbound</span>
                <span className="specialty-tag">Semantic SEO</span>
                <span className="specialty-tag">Workflow Automation</span>
                <span className="specialty-tag">Copywriting</span>
              </div>
            </div>
          </div>

          <div className="creator-stats-socials">
            <div className="creator-stats-pills">
              <div className="stat-mini-item">
                <span className="stat-mini-num">{communityAssets.length}</span>
                <span className="stat-mini-lbl">Blueprints</span>
              </div>
              <div className="stat-mini-item">
                <span className="stat-mini-num">{totalMarketplaceDownloads.toLocaleString()}</span>
                <span className="stat-mini-lbl">Downloads</span>
              </div>
              <div className="stat-mini-item">
                <span className="stat-mini-num">{followersCount.toLocaleString()}</span>
                <span className="stat-mini-lbl">Followers</span>
              </div>
              <div className="stat-mini-item">
                <span className="stat-mini-num" style={{ color: '#D97706' }}>4.9 ★</span>
                <span className="stat-mini-lbl">Avg Rating</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                className={`btn btn-sm ${isFollowingCreator ? 'btn-outline' : 'btn-primary'}`}
                onClick={handleToggleFollow}
                style={{ borderRadius: 'var(--radius-full)', padding: '6px 16px', fontSize: '12px' }}
              >
                <Users size={13} />
                <span>{isFollowingCreator ? 'Following' : 'Follow Creator'}</span>
              </button>

              <div className="creator-social-links">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn-link"
                  title="Twitter / X"
                >
                  <Share2 size={14} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn-link"
                  title="YouTube"
                >
                  <Youtube size={14} />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn-link"
                  title="GitHub"
                >
                  <Github size={14} />
                </a>
                <a
                  href="https://zunme.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn-link"
                  title="Portfolio Website"
                >
                  <Globe size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Studio Sub-Navigation Tabs */}
      <div className="glass-panel" style={{ padding: '10px 16px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { key: 'Marketplace & Showcase', label: 'Public Asset Showcase' },
            { key: 'Upload Content', label: 'Publish New Blueprint' },
            { key: 'My Submissions', label: 'Submission Reviews' },
            { key: 'Earnings & Payouts', label: 'Monetization Status' }
          ].map((tab) => (
            <button
              key={tab.key}
              className={`filter-pill ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: PUBLIC ASSET SHOWCASE & MARKETPLACE */}
      {activeTab === 'Marketplace & Showcase' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Filtering, Search & Sorting Bar */}
          <div className="marketplace-filter-bar">
            {/* Category Pills */}
            <div className="categories-pill-group">
              {['ALL', 'Social Media', 'SEO', 'Branding', 'Email', 'Video'].map((cat) => (
                <button
                  key={cat}
                  className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'ALL' ? 'All Categories' : cat}
                </button>
              ))}
            </div>

            {/* Search & Sort Controls */}
            <div className="filter-controls-right">
              <div className="marketplace-search">
                <Search size={15} className="marketplace-search-icon" />
                <input
                  type="text"
                  placeholder="Search prompts, blueprints, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="marketplace-search-input"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <SlidersHorizontal size={14} color="#8C97B0" />
                <select
                  className="sort-select-box"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value as any)}
                >
                  <option value="Most Popular">Most Popular</option>
                  <option value="Newest">Newest First</option>
                  <option value="Top Rated">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Asset Grid */}
          <div className="marketplace-grid">
            {filteredAssets.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '64px', color: '#5F6B85', background: '#FFFFFF', borderRadius: 'var(--radius-xl)', border: '1px solid #E8ECF5' }}>
                <Package size={36} color="#8C97B0" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
                  No Blueprints Found
                </h3>
                <p style={{ fontSize: '13px', color: '#5F6B85' }}>
                  Try relaxing your search query or switching to another category.
                </p>
              </div>
            ) : (
              filteredAssets.map((asset) => (
                <div key={asset.id} className="marketplace-asset-card">
                  <div>
                    {/* Top Row: Type & License */}
                    <div className="asset-card-top-row">
                      <span className="asset-type-badge">
                        {asset.type === 'Video Script' ? (
                          <Video size={12} />
                        ) : asset.type === 'Workflow' ? (
                          <Layers size={12} />
                        ) : (
                          <FileText size={12} />
                        )}
                        <span>{asset.type}</span>
                      </span>
                      <span className="asset-license-badge">{asset.licensing}</span>
                    </div>

                    {/* Title */}
                    <h3
                      className="asset-card-title"
                      onClick={() => setActiveModalAsset(asset)}
                    >
                      {asset.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="asset-card-desc">{asset.description}</p>

                    {/* Tags */}
                    <div className="asset-tags-wrap">
                      {asset.tags.map((tag, idx) => (
                        <span key={idx} className="asset-tag-pill">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* Creator & Metrics */}
                    <div className="asset-card-creator-row">
                      <div className="creator-mini-meta">
                        <div className="creator-mini-avatar">{asset.creatorAvatar}</div>
                        <div className="creator-mini-name">
                          <span>{asset.creatorName}</span>
                          {asset.isVerifiedCreator && (
                            <span title="Verified Creator">
                              <ShieldCheck size={12} color="#059669" />
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="asset-metric-indicators">
                        <span className="metric-indicator-item" title="Rating">
                          <Star size={12} color="#D97706" fill="#D97706" />
                          <span>{asset.rating}</span>
                        </span>
                        <span className="metric-indicator-item" title="Downloads">
                          <Download size={12} />
                          <span>{asset.downloads.toLocaleString()}</span>
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="asset-card-actions">
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1 }}
                        onClick={() => setActiveModalAsset(asset)}
                      >
                        <Eye size={13} />
                        <span>Inspect Blueprint</span>
                      </button>

                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleCopyPrompt(asset)}
                        title="Quick Copy Prompt"
                      >
                        {copiedPromptId === asset.id ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                      </button>

                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleForkToLibrary(asset)}
                        title="Fork to My Library"
                      >
                        <Bookmark size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: UPLOAD & PUBLISH WITH LIVE PREVIEW */}
      {activeTab === 'Upload Content' && (
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title">
              <UploadCloud size={18} color="#6E56CF" />
              Publish Community Blueprint &amp; Prompt Pack
            </div>
            <span className="badge badge-primary">Creator Marketplace Submission</span>
          </div>

          <div className="upload-preview-container">
            {/* Form Column */}
            <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Blueprint Title *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., Omnichannel B2B Cold Outreach Engine"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Asset Format Type
                  </label>
                  <select
                    className="input-field"
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                  >
                    <option value="Prompt Pack">Prompt Pack</option>
                    <option value="Template">Template</option>
                    <option value="Workflow">Workflow Blueprint</option>
                    <option value="Video Script">Video Script</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Category
                  </label>
                  <select
                    className="input-field"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                  >
                    <option value="Social Media">Social Media</option>
                    <option value="SEO">SEO &amp; Content</option>
                    <option value="Branding">Branding</option>
                    <option value="Email">Email Marketing</option>
                    <option value="Video">Video Scripts</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Short Summary / Value Proposition *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="What makes this prompt unique and who is it designed for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Full Prompt &amp; Execution Directives *
                </label>
                <textarea
                  className="input-field"
                  rows={6}
                  placeholder="Paste your system prompt, input placeholders like {{topic}}, and step-by-step instructions..."
                  value={fullPrompt}
                  onChange={(e) => setFullPrompt(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Licensing Terms
                  </label>
                  <select
                    className="input-field"
                    value={licensing}
                    onChange={(e) => setLicensing(e.target.value as any)}
                  >
                    <option value="Commercial Pro">Commercial Pro (Community &amp; Commercial)</option>
                    <option value="Standard Community">Standard Community (Attribution)</option>
                    <option value="MIT Open Source">MIT Open Source</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setActiveTab('Marketplace & Showcase')}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  <Send size={14} />
                  <span>Publish to Showcase</span>
                </button>
              </div>
            </form>

            {/* Live Card Preview Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', color: '#6E56CF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Live Marketplace Card Preview
              </div>

              <div className="marketplace-asset-card" style={{ borderColor: '#6E56CF', boxShadow: '0 8px 24px -4px rgba(110, 86, 207, 0.15)' }}>
                <div>
                  <div className="asset-card-top-row">
                    <span className="asset-type-badge">
                      <Sparkles size={12} />
                      <span>{type}</span>
                    </span>
                    <span className="asset-license-badge">{licensing}</span>
                  </div>

                  <h3 className="asset-card-title">
                    {title || 'Untitled Community Blueprint'}
                  </h3>

                  <p className="asset-card-desc">
                    {description || 'Provide a compelling description of what this workflow solves to see it formatted here in real time.'}
                  </p>

                  <div className="asset-tags-wrap">
                    {tagsInput
                      .split(',')
                      .map((t) => t.trim().replace(/^#/, ''))
                      .filter(Boolean)
                      .map((tag, idx) => (
                        <span key={idx} className="asset-tag-pill">
                          #{tag}
                        </span>
                      ))}
                  </div>
                </div>

                <div>
                  <div className="asset-card-creator-row">
                    <div className="creator-mini-meta">
                      <div className="creator-mini-avatar">
                        {(user?.fullName || 'AJ').slice(0, 2).toUpperCase()}
                      </div>
                      <div className="creator-mini-name">
                        <span>{user?.fullName || 'Alex Johnson'}</span>
                        <ShieldCheck size={12} color="#059669" />
                      </div>
                    </div>

                    <div className="asset-metric-indicators">
                      <span className="metric-indicator-item">
                        <Star size={12} color="#D97706" fill="#D97706" />
                        <span>5.0</span>
                      </span>
                      <span className="metric-indicator-item">
                        <Download size={12} />
                        <span>New</span>
                      </span>
                    </div>
                  </div>

                  <div className="asset-card-actions">
                    <button className="btn btn-primary btn-sm" style={{ flex: 1 }} disabled>
                      <Eye size={13} />
                      <span>Inspect Blueprint</span>
                    </button>
                  </div>
                </div>
              </div>

              {fullPrompt && (
                <div style={{ marginTop: '8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#5F6B85', marginBottom: '4px' }}>
                    Prompt Output Preview:
                  </div>
                  <pre className="prompt-code-box" style={{ maxHeight: '180px' }}>
                    {fullPrompt}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUBMISSION REVIEWS & EDITORIAL STATUS */}
      {activeTab === 'My Submissions' && (
        <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="panel-header" style={{ padding: 'var(--space-4) var(--space-5)', margin: 0 }}>
            <div className="panel-title">My Submission Review History</div>
            <span className="badge badge-success">Automated Moderation Active</span>
          </div>

          <div className="table-responsive">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Blueprint Title</th>
                  <th>Type &amp; Category</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                  <th>Editorial Moderation Note</th>
                </tr>
              </thead>
              <tbody>
                {creatorSubmissions.map((sub) => (
                  <tr key={sub.id}>
                    <td style={{ fontWeight: '700', color: '#111625' }}>{sub.title}</td>
                    <td>{sub.type} • {sub.category}</td>
                    <td>{new Date(sub.submittedAt).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`status-chip ${
                          sub.status === 'APPROVED' ? 'success' : sub.status === 'IN_REVIEW' ? 'warning' : 'danger'
                        }`}
                      >
                        {sub.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ color: '#5F6B85', fontSize: '12px' }}>
                      {sub.feedback || 'Passed verified quality standards.'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: EARNINGS & PAYOUTS */}
      {activeTab === 'Earnings & Payouts' && (
        <div className="glass-panel">
          <div className="future-module-banner" style={{ margin: 0 }}>
            <div className="future-module-icon">
              <DollarSign size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>
                Creator Marketplace Monetization &amp; Revenue Sharing — Phase 2 In Progress
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.5' }}>
                All current community uploads are distributed freely with creator attribution under your specified licensing agreement. Direct creator tips, paid prompt subscriptions, and enterprise blueprint licensing payouts will activate in the next release.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ASSET DETAIL MODAL */}
      {activeModalAsset && (
        <div className="modal-overlay" onClick={() => setActiveModalAsset(null)}>
          <div
            className="modal-card"
            style={{ maxWidth: '780px', width: '92%' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-primary">{activeModalAsset.category}</span>
                <span className="badge badge-neutral">{activeModalAsset.type}</span>
                <span className="status-chip info">{activeModalAsset.licensing}</span>
              </div>
              <button
                className="btn-ghost"
                onClick={() => setActiveModalAsset(null)}
                style={{ padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#111625', marginBottom: '6px' }}>
                  {activeModalAsset.title}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12.5px', color: '#5F6B85', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div className="creator-mini-avatar" style={{ width: '20px', height: '20px', fontSize: '9px' }}>
                      {activeModalAsset.creatorAvatar}
                    </div>
                    <span>By <strong>{activeModalAsset.creatorName}</strong></span>
                    {activeModalAsset.isVerifiedCreator && (
                      <ShieldCheck size={13} color="#059669" />
                    )}
                  </div>
                  <span>•</span>
                  <span>Rating: ⭐ {activeModalAsset.rating} ({activeModalAsset.reviewsCount} reviews)</span>
                  <span>•</span>
                  <span>{activeModalAsset.downloads.toLocaleString()} Downloads</span>
                  <span>•</span>
                  <span>Recommended: <strong>{activeModalAsset.recommendedModel}</strong></span>
                </div>
              </div>

              {/* Description */}
              <div style={{ padding: '14px', borderRadius: '10px', background: '#FAFBFD', border: '1px solid #E8ECF5', fontSize: '13.5px', lineHeight: '1.6', color: '#272F3E' }}>
                {activeModalAsset.description}
              </div>

              {/* Prompt Block */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#6E56CF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Full Blueprint Prompt Instructions
                  </div>
                  <button
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '11px', color: '#6E56CF' }}
                    onClick={() => handleCopyPrompt(activeModalAsset)}
                  >
                    {copiedPromptId === activeModalAsset.id ? <Check size={12} color="#059669" /> : <Copy size={12} />}
                    <span>{copiedPromptId === activeModalAsset.id ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre className="prompt-code-box">
                  {activeModalAsset.fullPrompt}
                </pre>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {activeModalAsset.tags.map((tag, idx) => (
                  <span key={idx} className="asset-tag-pill">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer Actions: Copy, Fork, Download */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px', paddingTop: '14px', borderTop: '1px solid #F0F3FA' }}>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => handleCopyPrompt(activeModalAsset)}
                >
                  {copiedPromptId === activeModalAsset.id ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                  <span>{copiedPromptId === activeModalAsset.id ? 'Copied Prompt' : 'Copy Prompt'}</span>
                </button>

                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => handleForkToLibrary(activeModalAsset)}
                >
                  <Bookmark size={14} />
                  <span>Fork to My Library</span>
                </button>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleDownloadAsset(activeModalAsset)}
                >
                  <Download size={14} />
                  <span>Download Blueprint (.md)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
