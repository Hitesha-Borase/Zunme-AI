import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate, NavLink } from 'react-router-dom';
import {
  Megaphone,
  TrendingUp,
  DollarSign,
  Target,
  BarChart2,
  Plus,
  Play,
  Pause,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Search,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Layers,
  Sliders,
  Award,
  Wallet,
  Users,
  Eye,
  MousePointer,
  Percent,
  RefreshCw,
  LifeBuoy,
  Settings as SettingsIcon,
  X,
  Smartphone,
  Laptop,
  Globe,
  Rocket
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/dashboard.css';

interface AdCampaign {
  id: string;
  name: string;
  type: 'PPC_SEARCH' | 'NATIVE_STUDIO' | 'PROMOTED_PACK';
  typeLabel: string;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  dailyBudget: number;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number;
  bid: number;
  targetKeywords: string[];
  headline: string;
  destinationUrl: string;
}

interface KeywordAuction {
  keyword: string;
  monthlyVolume: string;
  avgCpc: number;
  competition: 'LOW' | 'MEDIUM' | 'HIGH';
  myBid: number;
  status: 'WINNING' | 'OUTBID';
}

interface CreatorPayout {
  id: string;
  creatorName: string;
  assetTitle: string;
  impressions: number;
  clicks: number;
  grossRevenue: number;
  creatorShare: number;
  status: 'PAID' | 'PENDING';
}

export const ZunmeAdsPage: React.FC = () => {
  const { showToast } = useApp();
  const { section } = useParams<{ section?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  type TabType = 'Overview' | 'Campaigns' | 'Create Campaign' | 'Keyword Bidding' | 'Ad Placements' | 'Creator Monetization' | 'Billing & Budget' | 'Settings' | 'Help & Support';

  const slugToTab: Record<string, TabType> = {
    'overview': 'Overview',
    'dashboard': 'Overview',
    'campaigns': 'Campaigns',
    'create-campaign': 'Create Campaign',
    'create': 'Create Campaign',
    'keyword-bidding': 'Keyword Bidding',
    'bidding': 'Keyword Bidding',
    'ad-placements': 'Ad Placements',
    'placements': 'Ad Placements',
    'creator-monetization': 'Creator Monetization',
    'monetization': 'Creator Monetization',
    'billing': 'Billing & Budget',
    'wallet': 'Billing & Budget',
    'billing-budget': 'Billing & Budget',
    'settings': 'Settings',
    'support': 'Help & Support',
    'help-support': 'Help & Support'
  };

  const tabToSlug: Record<TabType, string> = {
    'Overview': 'overview',
    'Campaigns': 'campaigns',
    'Create Campaign': 'create-campaign',
    'Keyword Bidding': 'keyword-bidding',
    'Ad Placements': 'ad-placements',
    'Creator Monetization': 'creator-monetization',
    'Billing & Budget': 'billing',
    'Settings': 'settings',
    'Help & Support': 'support'
  };

  const resolveCurrentTab = (): TabType => {
    if (section && slugToTab[section.toLowerCase()]) {
      return slugToTab[section.toLowerCase()];
    }
    const tabParam = searchParams.get('tab');
    if (tabParam && ['Overview', 'Campaigns', 'Create Campaign', 'Keyword Bidding', 'Ad Placements', 'Creator Monetization', 'Billing & Budget', 'Settings', 'Help & Support'].includes(tabParam)) {
      return tabParam as TabType;
    }
    return 'Overview';
  };

  const [activeTab, setActiveTabState] = useState<TabType>(resolveCurrentTab);

  useEffect(() => {
    setActiveTabState(resolveCurrentTab());
  }, [section, searchParams]);

  const setActiveTab = (tab: TabType) => {
    setActiveTabState(tab);
    const slug = tabToSlug[tab];
    navigate(slug === 'overview' ? '/ads/overview' : `/ads/${slug}`);
  };

  // Ad Wallet Balance
  const [walletBalance, setWalletBalance] = useState<number>(450.0);
  const [autoRecharge, setAutoRecharge] = useState<boolean>(true);

  // Campaigns State
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([
    {
      id: 'camp-1',
      name: 'B2B Growth Prompt Suite Sponsored Search',
      type: 'PPC_SEARCH',
      typeLabel: 'Sponsored Search Suggestion',
      status: 'ACTIVE',
      dailyBudget: 45.0,
      spent: 312.4,
      impressions: 64200,
      clicks: 2840,
      ctr: 4.42,
      bid: 0.48,
      targetKeywords: ['prompt engineering', 'b2b marketing', 'sales workflows'],
      headline: 'Scale Executive Writing with Verified B2B Prompts',
      destinationUrl: 'https://zunme.ai/warehouse'
    },
    {
      id: 'camp-2',
      name: 'Content Studio Native In-Feed Promotion',
      type: 'NATIVE_STUDIO',
      typeLabel: 'Native Studio Placement',
      status: 'ACTIVE',
      dailyBudget: 30.0,
      spent: 184.2,
      impressions: 48900,
      clicks: 1420,
      ctr: 2.9,
      bid: 0.35,
      targetKeywords: ['copy generator', 'newsletter template', 'blog outline'],
      headline: 'Try 1-Click AI Newsletter Architecture Today',
      destinationUrl: 'https://zunme.ai/app/builders'
    },
    {
      id: 'camp-3',
      name: 'Creator Marketplace Sponsored Template Pack',
      type: 'PROMOTED_PACK',
      typeLabel: 'Featured Partner Asset',
      status: 'PAUSED',
      dailyBudget: 20.0,
      spent: 98.0,
      impressions: 21400,
      clicks: 680,
      ctr: 3.17,
      bid: 0.28,
      targetKeywords: ['social templates', 'reels scripts', 'hook generator'],
      headline: 'Omnichannel B2B Outreach Sequence v2',
      destinationUrl: 'https://zunme.ai/creator'
    }
  ]);

  // Form State for "Create Campaign"
  const [cName, setCName] = useState('');
  const [cType, setCType] = useState<'PPC_SEARCH' | 'NATIVE_STUDIO' | 'PROMOTED_PACK'>('PPC_SEARCH');
  const [cDailyBudget, setCDailyBudget] = useState(25);
  const [cBid, setCBid] = useState(0.4);
  const [cKeywords, setCKeywords] = useState('ai productivity, marketing copy, content calendar');
  const [cHeadline, setCHeadline] = useState('');
  const [cDescription, setCDescription] = useState('Scale your enterprise writing velocity with verified workflows and model routing in Zunme AI.');
  const [cCallToAction, setCCallToAction] = useState('Learn More');
  const [cPathSlug, setCPathSlug] = useState('solutions/ai-studio');
  const [adPreviewMode, setAdPreviewMode] = useState<'SERP' | 'MOBILE' | 'NATIVE'>('SERP');
  const [cDestination, setCDestination] = useState('https://zunme.ai');

  // Pay For Demand Demographic, Geo & Device Targeting State
  const [cAgeMin, setCAgeMin] = useState<number>(21);
  const [cAgeMax, setCAgeMax] = useState<number>(55);
  const [cGender, setCGender] = useState<'ALL' | 'MALE' | 'FEMALE'>('ALL');
  const [cGeoLocation, setCGeoLocation] = useState('United States, United Kingdom, Canada');
  const [cGeoRadius, setCGeoRadius] = useState('Nationwide');
  const [cTargetDevices, setCTargetDevices] = useState<string[]>(['Desktop', 'Mobile']);
  const [cAudienceInterests, setCAudienceInterests] = useState('AI & SaaS, Growth Marketing, E-commerce');

  // Keyword Auctions
  const [auctions, setAuctions] = useState<KeywordAuction[]>([
    { keyword: 'ai productivity workspace', monthlyVolume: '48.5K', avgCpc: 0.52, competition: 'HIGH', myBid: 0.58, status: 'WINNING' },
    { keyword: 'verified web search citations', monthlyVolume: '28.2K', avgCpc: 0.38, competition: 'MEDIUM', myBid: 0.45, status: 'WINNING' },
    { keyword: 'content studio templates', monthlyVolume: '62.0K', avgCpc: 0.65, competition: 'HIGH', myBid: 0.55, status: 'OUTBID' },
    { keyword: 'social media scheduler ai', monthlyVolume: '34.8K', avgCpc: 0.42, competition: 'MEDIUM', myBid: 0.48, status: 'WINNING' },
    { keyword: 'seo keyword cluster builder', monthlyVolume: '19.4K', avgCpc: 0.32, competition: 'LOW', myBid: 0.35, status: 'WINNING' }
  ]);

  // Creator Monetization Payouts
  const [payouts] = useState<CreatorPayout[]>([
    { id: 'pay-1', creatorName: 'Alex Rivera', assetTitle: 'High-Converting SaaS Hooks', impressions: 42100, clicks: 1820, grossRevenue: 873.6, creatorShare: 611.52, status: 'PAID' },
    { id: 'pay-2', creatorName: 'Elena Rostova', assetTitle: 'Technical Prompt Architecture', impressions: 31200, clicks: 1240, grossRevenue: 595.2, creatorShare: 416.64, status: 'PAID' },
    { id: 'pay-3', creatorName: 'Marcus Chen', assetTitle: 'Omnichannel B2B Campaign', impressions: 18900, clicks: 760, grossRevenue: 364.8, creatorShare: 255.36, status: 'PENDING' }
  ]);

  // Toggle Campaign Status
  const handleToggleStatus = (id: string) => {
    setCampaigns(
      campaigns.map((camp) => {
        if (camp.id === id) {
          const next = camp.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
          showToast(`Campaign "${camp.name}" is now ${next}`, 'info');
          return { ...camp, status: next };
        }
        return camp;
      })
    );
  };

  // Delete Campaign
  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
    showToast('Campaign successfully deleted', 'info');
  };

  // Create Campaign Submit
  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName.trim() || !cHeadline.trim()) {
      showToast('Campaign name and headline are required', 'error');
      return;
    }

    const typeLabelMap = {
      PPC_SEARCH: 'Sponsored Search Suggestion',
      NATIVE_STUDIO: 'Native Studio Placement',
      PROMOTED_PACK: 'Featured Partner Asset'
    };

    const newCamp: AdCampaign = {
      id: `camp-${Date.now()}`,
      name: cName.trim(),
      type: cType,
      typeLabel: typeLabelMap[cType],
      status: 'ACTIVE',
      dailyBudget: Number(cDailyBudget),
      spent: 0,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      bid: Number(cBid),
      targetKeywords: cKeywords.split(',').map((k) => k.trim()).filter(Boolean),
      headline: cHeadline.trim(),
      destinationUrl: cDestination.trim()
    };

    setCampaigns([newCamp, ...campaigns]);
    setActiveTab('Campaigns');
    setCName('');
    setCHeadline('');
    showToast(`Campaign "${newCamp.name}" launched live into ad auction pipeline!`, 'success');
  };

  // Update Bid on Keyword Auction
  const handleUpdateBid = (kw: string) => {
    setAuctions(
      auctions.map((a) => {
        if (a.keyword === kw) {
          const newBid = Number((a.myBid + 0.1).toFixed(2));
          return { ...a, myBid: newBid, status: 'WINNING' };
        }
        return a;
      })
    );
    showToast(`Increased bid for "${kw}". Status: Winning Auction!`, 'success');
  };

  // Add Funds to Wallet
  const handleAddFunds = (amount: number) => {
    setWalletBalance((prev) => Number((prev + amount).toFixed(2)));
    showToast(`$${amount.toFixed(2)} added to your Ad Credit balance successfully`, 'success');
  };

  // Aggregates
  const totalSpend = campaigns.reduce((acc, c) => acc + c.spent, 0);
  const totalImpressions = campaigns.reduce((acc, c) => acc + c.impressions, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';

  return (
    <div className="dashboard-page-container">
      {/* Page Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Megaphone size={26} color="#6E56CF" />
            Zunme Ads Platform &amp; Monetization Hub
          </h1>
          <p className="dashboard-subtitle">
            Self-serve native sponsored discovery, PPC search bidding engine, audience targeting, and creator revenue-sharing ecosystem.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <NavLink
            to="/ads/onboarding"
            className="btn btn-outline btn-sm"
            style={{ textDecoration: 'none' }}
          >
            <ShieldCheck size={14} />
            <span>7-Step Setup Wizard</span>
          </NavLink>

          <NavLink
            to="/ads/formats"
            className="btn btn-outline btn-sm"
            style={{ textDecoration: 'none' }}
          >
            <Layers size={14} />
            <span>Format Builders</span>
          </NavLink>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: '#EFEBFC', borderRadius: '10px', border: '1px solid rgba(110,86,207,0.25)' }}>
            <Wallet size={16} color="#6E56CF" />
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#6E56CF' }}>
              Ad Credit: ${walletBalance.toFixed(2)}
            </span>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => setActiveTab('Create Campaign')}
          >
            <Plus size={14} />
            <span>New Ad Campaign</span>
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'Overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Top KPI Cards */}
          <div className="cards-grid-4">
            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#6E56CF', textTransform: 'uppercase' }}>
                Active Ad Spend
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                ${totalSpend.toFixed(2)}
              </div>
              <div style={{ fontSize: '12px', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <TrendingUp size={13} />
                <span>3.8x ROAS across current campaigns</span>
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#0284C7', textTransform: 'uppercase' }}>
                Total Impressions
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                {totalImpressions.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#5F6B85', marginTop: '4px' }}>
                High-intent creator and business eyes
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>
                Clicks Generated
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                {totalClicks.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>
                Avg CTR: <strong>{avgCtr}%</strong>
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#D97706', textTransform: 'uppercase' }}>
                Avg Cost Per Click (CPC)
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                $0.42
              </div>
              <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>
                -18% lower than standard Google Ads
              </div>
            </div>
          </div>

          {/* Quick Auction Status & Active Campaigns */}
          <div className="cards-grid-2">
            <div className="glass-panel">
              <div className="panel-header">
                <div className="panel-title">
                  <Target size={18} color="#6E56CF" />
                  Active High-Performing Campaigns
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => setActiveTab('Campaigns')}>
                  View All ({campaigns.length})
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {campaigns.slice(0, 2).map((camp) => (
                  <div
                    key={camp.id}
                    style={{
                      padding: '14px',
                      background: '#FAFBFD',
                      border: '1px solid #E8ECF5',
                      borderRadius: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span className={`badge ${camp.status === 'ACTIVE' ? 'badge-success' : 'badge-neutral'}`}>
                          {camp.status}
                        </span>
                        <span style={{ fontSize: '11px', color: '#8C97B0' }}>{camp.typeLabel}</span>
                      </div>
                      <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#111625', margin: 0 }}>
                        {camp.name}
                      </h4>
                      <span style={{ fontSize: '11px', color: '#5F6B85' }}>
                        {camp.impressions.toLocaleString()} imp • {camp.clicks.toLocaleString()} clicks • {camp.ctr}% CTR
                      </span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '16px', fontWeight: '900', color: '#111625' }}>
                        ${camp.spent.toFixed(2)}
                      </span>
                      <span style={{ fontSize: '11px', color: '#8C97B0', display: 'block' }}>
                        ${camp.dailyBudget}/day
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keyword Auction Preview */}
            <div className="glass-panel">
              <div className="panel-header">
                <div className="panel-title">
                  <DollarSign size={18} color="#059669" />
                  Live Keyword Auction Positions
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => setActiveTab('Keyword Bidding')}>
                  Open Bidding Matrix
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {auctions.slice(0, 3).map((a) => (
                  <div
                    key={a.keyword}
                    style={{
                      padding: '12px 14px',
                      background: '#FAFBFD',
                      border: '1px solid #E8ECF5',
                      borderRadius: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '800', color: '#111625' }}>
                        "{a.keyword}"
                      </div>
                      <span style={{ fontSize: '11px', color: '#5F6B85' }}>
                        Monthly Search Volume: {a.monthlyVolume} • Avg CPC: ${a.avgCpc}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={`badge ${a.status === 'WINNING' ? 'badge-success' : 'badge-danger'}`}>
                        {a.status === 'WINNING' ? 'Winning ($' + a.myBid + ')' : 'Outbid ($' + a.myBid + ')'}
                      </span>
                      {a.status === 'OUTBID' && (
                        <button className="btn btn-primary btn-sm" style={{ padding: '3px 8px', fontSize: '11px' }} onClick={() => handleUpdateBid(a.keyword)}>
                          Bid +$0.10
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CAMPAIGNS LIST */}
      {activeTab === 'Campaigns' && (
        <div className="glass-panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">
                <Target size={18} color="#6E56CF" />
                Self-Serve Campaigns Management
              </div>
              <div className="panel-subtitle">Manage ad delivery, pause campaigns, track ROI, and optimize click-through conversions</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('Create Campaign')}>
              <Plus size={14} /> New Campaign
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                style={{
                  padding: '18px 20px',
                  background: '#FAFBFD',
                  border: '1px solid #E8ECF5',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className={`badge ${camp.status === 'ACTIVE' ? 'badge-success' : 'badge-neutral'}`}>
                      {camp.status}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#6E56CF', background: '#EFEBFC', padding: '2px 8px', borderRadius: '6px' }}>
                      {camp.typeLabel}
                    </span>
                    <span style={{ fontSize: '11px', color: '#5F6B85' }}>
                      Max CPC: ${camp.bid.toFixed(2)}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#111625', margin: '0 0 4px 0' }}>
                    {camp.name}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#5F6B85', margin: 0 }}>
                    "{camp.headline}" &rarr; <span style={{ color: '#0284C7' }}>{camp.destinationUrl}</span>
                  </p>

                  <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                    {camp.targetKeywords.map((kw, i) => (
                      <span key={i} style={{ fontSize: '10px', background: '#FFFFFF', border: '1px solid #E8ECF5', padding: '2px 6px', borderRadius: '4px', color: '#5F6B85' }}>
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Performance Numbers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))', gap: '12px', textAlign: 'center', width: '100%', maxWidth: '420px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#8C97B0', display: 'block' }}>Daily Budget</span>
                    <strong style={{ fontSize: '14px', color: '#111625' }}>${camp.dailyBudget}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#8C97B0', display: 'block' }}>Spent</span>
                    <strong style={{ fontSize: '14px', color: '#111625' }}>${camp.spent.toFixed(1)}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#8C97B0', display: 'block' }}>Impressions</span>
                    <strong style={{ fontSize: '14px', color: '#111625' }}>{camp.impressions.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#8C97B0', display: 'block' }}>CTR (Clicks)</span>
                    <strong style={{ fontSize: '14px', color: '#059669' }}>{camp.ctr}% ({camp.clicks})</strong>
                  </div>
                </div>

                {/* Action Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    className={`btn btn-sm ${camp.status === 'ACTIVE' ? 'btn-outline' : 'btn-primary'}`}
                    onClick={() => handleToggleStatus(camp.id)}
                    title={camp.status === 'ACTIVE' ? 'Pause Campaign' : 'Resume Campaign'}
                  >
                    {camp.status === 'ACTIVE' ? <Pause size={14} /> : <Play size={14} />}
                    <span>{camp.status === 'ACTIVE' ? 'Pause' : 'Activate'}</span>
                  </button>

                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => showToast('Campaign analytics drill-down opened', 'info')}
                    title="View metrics"
                  >
                    <BarChart2 size={14} />
                  </button>

                  <button
                    className="btn btn-sm btn-outline"
                    style={{ color: '#E11D48', borderColor: '#FEECEB' }}
                    onClick={() => handleDeleteCampaign(camp.id)}
                    title="Delete campaign"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CREATE CAMPAIGN BUILDER */}
      {activeTab === 'Create Campaign' && (
        <div className="cards-grid-2">
          {/* Form */}
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Plus size={18} color="#6E56CF" />
                Launch Native Ad Campaign
              </div>
              <span className="badge badge-primary">Self-Serve Setup</span>
            </div>

            <form onSubmit={handleCreateCampaign} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Campaign Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Q4 Executive Marketing Suite Promotion"
                  value={cName}
                  onChange={(e) => setCName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Native Placement Format
                </label>
                <select
                  className="input-field"
                  value={cType}
                  onChange={(e) => setCType(e.target.value as any)}
                >
                  <option value="PPC_SEARCH">Sponsored Search Result (PPC Keyword Grounded)</option>
                  <option value="NATIVE_STUDIO">Content Studio In-Feed Recommendation</option>
                  <option value="PROMOTED_PACK">AI Warehouse Featured Partner Asset</option>
                </select>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#111625' }}>
                    Ad Headline
                  </label>
                  <span style={{ fontSize: '11px', color: cHeadline.length > 35 ? '#E11D48' : '#8C97B0', fontWeight: '600' }}>
                    {cHeadline.length}/35 chars {cHeadline.length > 35 && '(Exceeds optimal limit)'}
                  </span>
                </div>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Scale Executive Writing with Verified Prompts"
                  value={cHeadline}
                  onChange={(e) => setCHeadline(e.target.value)}
                  maxLength={50}
                  required
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#111625' }}>
                    Ad Description &amp; Pitch
                  </label>
                  <span style={{ fontSize: '11px', color: cDescription.length > 90 ? '#E11D48' : '#8C97B0', fontWeight: '600' }}>
                    {cDescription.length}/90 chars {cDescription.length > 90 && '(Trim for mobile CTR)'}
                  </span>
                </div>
                <textarea
                  className="input-field"
                  style={{ minHeight: '68px', resize: 'vertical' }}
                  placeholder="e.g. Accelerate daily executive output with verified workflows and enterprise-grade models inside Zunme AI."
                  value={cDescription}
                  onChange={(e) => setCDescription(e.target.value)}
                  maxLength={120}
                  required
                />
              </div>

              <div className="form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Display Path Slug
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={cPathSlug}
                    onChange={(e) => setCPathSlug(e.target.value)}
                    placeholder="solutions/ai-studio"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Call To Action Button
                  </label>
                  <select
                    className="input-field"
                    value={cCallToAction}
                    onChange={(e) => setCCallToAction(e.target.value)}
                  >
                    <option value="Learn More">Learn More</option>
                    <option value="Get Started">Get Started</option>
                    <option value="Book Demo">Book Demo</option>
                    <option value="Try Free">Try Free</option>
                    <option value="Visit Website">Visit Website</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Destination Click-Through URL
                </label>
                <input
                  type="url"
                  className="input-field"
                  value={cDestination}
                  onChange={(e) => setCDestination(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Target Audience Keywords (Comma Separated)
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={cKeywords}
                  onChange={(e) => setCKeywords(e.target.value)}
                  placeholder="ai search, copywriting, b2b tools"
                />
              </div>

              {/* Pay For Demand Audience & Demographic Targeting Section */}
              <div style={{ padding: '14px', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#111625', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Pay For Demand Audience Targeting Controls
                  </span>
                  <span className="badge badge-primary">Audience Match</span>
                </div>

                <div className="form-grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                      Demographics (Age: {cAgeMin} - {cAgeMax} yrs)
                    </label>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <input
                        type="number"
                        min={18}
                        max={65}
                        className="input-field"
                        style={{ padding: '6px 8px', fontSize: '12px' }}
                        value={cAgeMin}
                        onChange={(e) => setCAgeMin(Number(e.target.value))}
                      />
                      <span style={{ fontSize: '12px', color: '#64748B' }}>to</span>
                      <input
                        type="number"
                        min={18}
                        max={65}
                        className="input-field"
                        style={{ padding: '6px 8px', fontSize: '12px' }}
                        value={cAgeMax}
                        onChange={(e) => setCAgeMax(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                      Gender Segmentation
                    </label>
                    <select
                      className="input-field"
                      style={{ padding: '6px 8px', fontSize: '12px' }}
                      value={cGender}
                      onChange={(e) => setCGender(e.target.value as any)}
                    >
                      <option value="ALL">All Genders</option>
                      <option value="MALE">Male Only</option>
                      <option value="FEMALE">Female Only</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                      Geographic Territories
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      style={{ padding: '6px 8px', fontSize: '12px' }}
                      value={cGeoLocation}
                      onChange={(e) => setCGeoLocation(e.target.value)}
                      placeholder="e.g. US, UK, Germany"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                      Geographic Radius
                    </label>
                    <select
                      className="input-field"
                      style={{ padding: '6px 8px', fontSize: '12px' }}
                      value={cGeoRadius}
                      onChange={(e) => setCGeoRadius(e.target.value)}
                    >
                      <option value="Nationwide">Nationwide (Full Territory)</option>
                      <option value="15km Local">15km Local Radius</option>
                      <option value="50km Metro">50km Metro Area</option>
                      <option value="Worldwide">Global / Worldwide</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                    Target Device Environments
                  </label>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    {['Desktop', 'Mobile', 'Tablet'].map((dev) => (
                      <label key={dev} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={cTargetDevices.includes(dev)}
                          onChange={() => {
                            setCTargetDevices((prev) =>
                              prev.includes(dev) ? prev.filter((d) => d !== dev) : [...prev, dev]
                            );
                          }}
                        />
                        <span>{dev}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                    Audience Behavioral Interests
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    style={{ padding: '6px 8px', fontSize: '12px' }}
                    value={cAudienceInterests}
                    onChange={(e) => setCAudienceInterests(e.target.value)}
                    placeholder="e.g. AI Technology, B2B SaaS, Content Marketing"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Daily Budget Limit ($)
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={cDailyBudget}
                    onChange={(e) => setCDailyBudget(Number(e.target.value))}
                    min={5}
                    max={500}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Max CPC Bid ($)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    className="input-field"
                    value={cBid}
                    onChange={(e) => setCBid(Number(e.target.value))}
                    min={0.1}
                    max={10.0}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', marginTop: '6px' }}>
                <Rocket size={16} />
                <span>Submit &amp; Launch Campaign to Auction</span>
              </button>
            </form>
          </div>

          {/* Interactive Live Advertisement Preview */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="panel-header" style={{ marginBottom: '12px' }}>
                <div>
                  <div className="panel-title">
                    <Eye size={18} color="#0284C7" />
                    Interactive Placement Simulator
                  </div>
                  <span style={{ fontSize: '11px', color: '#5F6B85' }}>
                    Real-time visual rendering as you edit
                  </span>
                </div>

                {/* Viewport & Channel Mode Switcher */}
                <div style={{ display: 'flex', gap: '4px', background: '#F1F5F9', padding: '3px', borderRadius: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setAdPreviewMode('SERP')}
                    style={{
                      border: 'none',
                      background: adPreviewMode === 'SERP' ? '#FFFFFF' : 'transparent',
                      color: adPreviewMode === 'SERP' ? '#6E56CF' : '#64748B',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: adPreviewMode === 'SERP' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
                    }}
                  >
                    <Laptop size={12} />
                    <span>SERP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdPreviewMode('MOBILE')}
                    style={{
                      border: 'none',
                      background: adPreviewMode === 'MOBILE' ? '#FFFFFF' : 'transparent',
                      color: adPreviewMode === 'MOBILE' ? '#6E56CF' : '#64748B',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: adPreviewMode === 'MOBILE' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
                    }}
                  >
                    <Smartphone size={12} />
                    <span>Mobile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdPreviewMode('NATIVE')}
                    style={{
                      border: 'none',
                      background: adPreviewMode === 'NATIVE' ? '#FFFFFF' : 'transparent',
                      color: adPreviewMode === 'NATIVE' ? '#6E56CF' : '#64748B',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: adPreviewMode === 'NATIVE' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
                    }}
                  >
                    <Globe size={12} />
                    <span>In-Feed</span>
                  </button>
                </div>
              </div>

              {/* SERP Search Engine Result Mode */}
              {adPreviewMode === 'SERP' && (
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#6E56CF', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '900' }}>
                      Z
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: '#202124' }}>
                          Zunme AI Sponsored
                        </span>
                        <span style={{ fontSize: '11px', color: '#70757A' }}>•</span>
                        <span style={{ fontSize: '11px', color: '#202124' }}>
                          {cDestination.replace(/^https?:\/\//, '')}{cPathSlug ? ` › ${cPathSlug.replace(/^\//, '')}` : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#1A0DAB',
                      margin: '4px 0 6px 0',
                      lineHeight: '1.3',
                      cursor: 'pointer'
                    }}
                  >
                    {cHeadline || <span style={{ color: '#94A3B8', fontStyle: 'italic' }}>Headline will appear here (e.g. Scale Executive Writing)</span>}
                  </h3>

                  <p style={{ fontSize: '13px', color: '#4D5156', lineHeight: '1.5', margin: '0 0 10px 0' }}>
                    {cDescription || <span style={{ color: '#94A3B8', fontStyle: 'italic' }}>Ad description will appear here. Highlight your offer and verified value proposition.</span>}
                  </p>

                  {/* Sitelinks Extension Simulation */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingTop: '8px', borderTop: '1px solid #F1F5F9' }}>
                    <div>
                      <span style={{ fontSize: '12px', color: '#1A0DAB', fontWeight: '600', display: 'block' }}>
                        {cCallToAction}: Free Trial
                      </span>
                      <span style={{ fontSize: '11px', color: '#70757A' }}>Instant 1-click workspace access</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#1A0DAB', fontWeight: '600', display: 'block' }}>
                        Creator Marketplace
                      </span>
                      <span style={{ fontSize: '11px', color: '#70757A' }}>Verified templates &amp; blueprints</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Smartphone Card Mode */}
              {adPreviewMode === 'MOBILE' && (
                <div
                  style={{
                    maxWidth: '340px',
                    margin: '0 auto',
                    padding: '16px',
                    borderRadius: '24px',
                    background: '#FAFBFD',
                    border: '3px solid #1E293B',
                    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748B', marginBottom: '10px', fontWeight: '700' }}>
                    <span>9:41</span>
                    <span>5G • 100%</span>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '800', color: '#059669', background: '#E8F8F0', padding: '1px 6px', borderRadius: '4px' }}>
                        Sponsored
                      </span>
                      <span style={{ fontSize: '10px', color: '#64748B' }}>
                        {cDestination.replace(/^https?:\/\//, '')}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#1A0DAB', margin: '4px 0' }}>
                      {cHeadline || 'Your Mobile Ad Headline'}
                    </h4>

                    <p style={{ fontSize: '11.5px', color: '#475569', lineHeight: '1.4', margin: '0 0 8px 0' }}>
                      {cDescription || 'Mobile description text optimized for compact screens.'}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <span style={{ fontSize: '10.5px', fontWeight: '700', color: '#6E56CF', background: '#EFEBFC', padding: '3px 8px', borderRadius: '6px' }}>
                        {cCallToAction} &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Native In-Feed Placement Mode */}
              {adPreviewMode === 'NATIVE' && (
                <div
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: '#FAFBFD',
                    border: '2px dashed #6E56CF',
                    boxShadow: '0 8px 24px rgba(110,86,207,0.08)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '10px', fontWeight: '900', color: '#6E56CF', background: '#EFEBFC', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Sponsored • Partner Feature
                    </span>
                    <span style={{ fontSize: '11px', color: '#8C97B0' }}>Target: #{cKeywords.split(',')[0]}</span>
                  </div>

                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111625', margin: '0 0 6px 0' }}>
                    {cHeadline || 'Your Compelling Headline Will Render Here'}
                  </h4>

                  <p style={{ fontSize: '12.5px', color: '#5F6B85', lineHeight: '1.45', marginBottom: '12px' }}>
                    {cDescription || 'Accelerate daily executive output with verified workflows and enterprise-grade models inside Zunme AI.'}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11.5px', color: '#0284C7', textDecoration: 'underline' }}>
                      {cDestination}
                    </span>
                    <span className="btn btn-sm btn-primary" style={{ pointerEvents: 'none', padding: '4px 10px', fontSize: '11px' }}>
                      <span>{cCallToAction}</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Pay For Demand Targeting Summary Card */}
            <div style={{ marginTop: '16px', padding: '12px 14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Targeting Specification
                </span>
                <span className="badge badge-primary" style={{ fontSize: '10px' }}>Active Matrix</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11.5px', color: '#475569' }}>
                <div><strong>Demographics:</strong> {cAgeMin}-{cAgeMax} yrs • {cGender}</div>
                <div><strong>Geography:</strong> {cGeoLocation} ({cGeoRadius})</div>
                <div><strong>Devices:</strong> {cTargetDevices.join(', ')}</div>
                <div><strong>Bidding:</strong> Max CPC ${cBid.toFixed(2)} • Daily ${cDailyBudget}</div>
              </div>
            </div>

            {/* Quality Score & Honest Simulator Notice */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
              <div style={{ padding: '12px 14px', background: '#E8F8F0', borderRadius: '10px', border: '1px solid rgba(5,150,105,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={15} />
                  <span>Auction Verification: High Ad Quality Score ({cHeadline.length > 0 && cDescription.length > 0 ? '9.6/10' : '6.0/10'})</span>
                </span>
                <span style={{ fontSize: '11px', color: '#059669', fontWeight: '600' }}>
                  Expected CTR: ~4.2%
                </span>
              </div>

              <div style={{ padding: '8px 12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '11px', color: '#64748B' }}>
                <strong>Simulator Notice:</strong> This interactive preview simulates placement layout across desktop SERP, mobile devices, and in-feed positions. Ad activation operates in frontend simulation mode.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: KEYWORD BIDDING ENGINE */}
      {activeTab === 'Keyword Bidding' && (
        <div className="glass-panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">
                <DollarSign size={18} color="#059669" />
                Real-Time Keyword Auction &amp; Bidding Matrix
              </div>
              <div className="panel-subtitle">Bid against other advertisers for high-intent search queries inside Zunme Web Search</div>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => showToast('AI automatically re-indexed keyword bid recommendations', 'success')}
            >
              <Sparkles size={14} /> AI Auto-Optimize Bids
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E8ECF5', color: '#5F6B85' }}>
                  <th style={{ padding: '12px 14px' }}>Target Keyword</th>
                  <th style={{ padding: '12px 14px' }}>Monthly Volume</th>
                  <th style={{ padding: '12px 14px' }}>Average Market CPC</th>
                  <th style={{ padding: '12px 14px' }}>Competition</th>
                  <th style={{ padding: '12px 14px' }}>Your Max Bid</th>
                  <th style={{ padding: '12px 14px' }}>Auction Status</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {auctions.map((a) => (
                  <tr key={a.keyword} style={{ borderBottom: '1px solid #F0F3F9' }}>
                    <td style={{ padding: '14px', fontWeight: '700', color: '#111625' }}>
                      "{a.keyword}"
                    </td>
                    <td style={{ padding: '14px', color: '#5F6B85' }}>
                      {a.monthlyVolume} queries
                    </td>
                    <td style={{ padding: '14px', color: '#111625', fontWeight: '600' }}>
                      ${a.avgCpc.toFixed(2)}
                    </td>
                    <td style={{ padding: '14px' }}>
                      <span className={`status-chip ${a.competition === 'HIGH' ? 'danger' : a.competition === 'MEDIUM' ? 'warning' : 'success'}`}>
                        {a.competition}
                      </span>
                    </td>
                    <td style={{ padding: '14px', fontWeight: '800', color: '#6E56CF' }}>
                      ${a.myBid.toFixed(2)}
                    </td>
                    <td style={{ padding: '14px' }}>
                      <span className={`badge ${a.status === 'WINNING' ? 'badge-success' : 'badge-danger'}`}>
                        {a.status === 'WINNING' ? 'Position #1' : 'Outbid (#2)'}
                      </span>
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right' }}>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleUpdateBid(a.keyword)}
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                      >
                        + $0.10 Raise
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: AD PLACEMENTS PREVIEW */}
      {activeTab === 'Ad Placements' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Eye size={18} color="#6E56CF" />
                Available Native Distribution Placements
              </div>
              <span className="badge badge-primary">Ecosystem Inventory</span>
            </div>

            <div className="cards-grid-3">
              <div style={{ padding: '20px', borderRadius: '14px', background: '#FAFBFD', border: '1px solid #E8ECF5' }}>
                <span className="badge badge-primary" style={{ marginBottom: '10px' }}>Placement 01</span>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
                  Live Web Search Top Pin
                </h4>
                <p style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.5' }}>
                  Injects a verified sponsored citation tile directly atop search briefs for high-intent research keywords.
                </p>
                <div style={{ marginTop: '12px', fontSize: '12px', color: '#059669', fontWeight: '700' }}>
                  Avg CTR: 4.8% • High Conversion
                </div>
              </div>

              <div style={{ padding: '20px', borderRadius: '14px', background: '#FAFBFD', border: '1px solid #E8ECF5' }}>
                <span className="badge badge-success" style={{ marginBottom: '10px' }}>Placement 02</span>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
                  AI Content Studio Native Card
                </h4>
                <p style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.5' }}>
                  Displays recommended templates, API services, or B2B tools alongside generated marketing copy.
                </p>
                <div style={{ marginTop: '12px', fontSize: '12px', color: '#059669', fontWeight: '700' }}>
                  Avg CTR: 3.2% • Contextual Intent
                </div>
              </div>

              <div style={{ padding: '20px', borderRadius: '14px', background: '#FAFBFD', border: '1px solid #E8ECF5' }}>
                <span className="badge badge-warning" style={{ marginBottom: '10px' }}>Placement 03</span>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
                  Warehouse Promoted Asset
                </h4>
                <p style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.5' }}>
                  Showcases promoted prompt packs or creator assets atop the AI Warehouse browse directory.
                </p>
                <div style={{ marginTop: '12px', fontSize: '12px', color: '#059669', fontWeight: '700' }}>
                  Avg CTR: 3.9% • High Download Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CREATOR MONETIZATION */}
      {activeTab === 'Creator Monetization' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Revenue Split Overview Banner */}
          <div className="future-module-banner" style={{ margin: 0 }}>
            <div className="future-module-icon">
              <Award size={24} color="#FBBF24" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>
                Zunme Creator Revenue-Sharing Program (70/30 Split)
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.5' }}>
                Creators earn 70% of gross advertising and subscription revenue generated by their shared prompt packs, templates, and workflows. Automatic payouts execute on the 1st of every month.
              </p>
            </div>
          </div>

          {/* Monetization Metrics */}
          <div className="cards-grid-3">
            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>
                Total Creator Payouts
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                $12,480.00
              </div>
              <div style={{ fontSize: '12px', color: '#5F6B85', marginTop: '4px' }}>
                Disbursed to 48 verified creators
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#6E56CF', textTransform: 'uppercase' }}>
                Next Payout Cycle
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                Nov 1, 2026
              </div>
              <div style={{ fontSize: '12px', color: '#5F6B85', marginTop: '4px' }}>
                Pending batch: <strong>$1,840.50</strong>
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#D97706', textTransform: 'uppercase' }}>
                Active Paywall Tiers
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                3 Tiers Enabled
              </div>
              <div style={{ fontSize: '12px', color: '#5F6B85', marginTop: '4px' }}>
                Free, Pro ($9/mo), Enterprise ($49/mo)
              </div>
            </div>
          </div>

          {/* Creator Payouts Ledger Table */}
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">Creator Revenue Distribution Ledger</div>
              <span className="badge badge-primary">Audited Ledger</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E8ECF5', color: '#5F6B85' }}>
                    <th style={{ padding: '12px 14px' }}>Creator</th>
                    <th style={{ padding: '12px 14px' }}>Monetized Asset</th>
                    <th style={{ padding: '12px 14px' }}>Impressions / Clicks</th>
                    <th style={{ padding: '12px 14px' }}>Gross Revenue</th>
                    <th style={{ padding: '12px 14px' }}>Creator Share (70%)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #F0F3F9' }}>
                      <td style={{ padding: '14px', fontWeight: '800', color: '#111625' }}>
                        {p.creatorName}
                      </td>
                      <td style={{ padding: '14px', color: '#5F6B85' }}>
                        {p.assetTitle}
                      </td>
                      <td style={{ padding: '14px', color: '#111625' }}>
                        {p.impressions.toLocaleString()} / {p.clicks}
                      </td>
                      <td style={{ padding: '14px', fontWeight: '600', color: '#111625' }}>
                        ${p.grossRevenue.toFixed(2)}
                      </td>
                      <td style={{ padding: '14px', fontWeight: '800', color: '#059669' }}>
                        ${p.creatorShare.toFixed(2)}
                      </td>
                      <td style={{ padding: '14px', textAlign: 'right' }}>
                        <span className={`badge ${p.status === 'PAID' ? 'badge-success' : 'badge-warning'}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: BILLING & BUDGET */}
      {activeTab === 'Billing & Budget' && (
        <div className="cards-grid-2">
          {/* Ad Credit Wallet */}
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Wallet size={18} color="#6E56CF" />
                Ad Credit Wallet Balance
              </div>
              <span className="badge badge-success">Active Account</span>
            </div>

            <div style={{ textAlign: 'center', padding: '24px 0', borderBottom: '1px solid #E8ECF5' }}>
              <span style={{ fontSize: '13px', color: '#5F6B85', display: 'block', marginBottom: '6px' }}>Available Ad Spend Balance</span>
              <div style={{ fontSize: '42px', fontWeight: '900', color: '#111625' }}>
                ${walletBalance.toFixed(2)}
              </div>
              <span style={{ fontSize: '12px', color: '#059669' }}>
                Estimated ~1,070 clicks remaining
              </span>
            </div>

            <div style={{ marginTop: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '10px' }}>
                Quick Top-Up Ad Credits:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(65px, 1fr))', gap: '10px' }}>
                {[50, 100, 250, 500].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className="btn btn-outline"
                    onClick={() => handleAddFunds(amt)}
                    style={{ fontWeight: '800', justifyContent: 'center' }}
                  >
                    + ${amt}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: '#FAFBFD', borderRadius: '10px', border: '1px solid #E8ECF5' }}>
              <div>
                <strong style={{ fontSize: '13px', color: '#111625', display: 'block' }}>Auto-Recharge Safeguard</strong>
                <span style={{ fontSize: '12px', color: '#5F6B85' }}>Automatically add $100 when balance falls below $25</span>
              </div>
              <input
                type="checkbox"
                checked={autoRecharge}
                onChange={(e) => {
                  setAutoRecharge(e.target.checked);
                  showToast(`Auto-recharge ${!autoRecharge ? 'Enabled' : 'Disabled'}`, 'info');
                }}
                style={{ width: '18px', height: '18px', accentColor: '#6E56CF' }}
              />
            </div>
          </div>

          {/* Invoices */}
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <CreditCard size={18} color="#0284C7" />
                Recent Payment Receipts
              </div>
              <span className="badge badge-neutral">PCI Compliant</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { id: 'INV-9041', date: 'Oct 12, 2026', amount: '$250.00', status: 'PAID' },
                { id: 'INV-8820', date: 'Sep 28, 2026', amount: '$100.00', status: 'PAID' },
                { id: 'INV-8419', date: 'Sep 15, 2026', amount: '$100.00', status: 'PAID' }
              ].map((inv) => (
                <div
                  key={inv.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#FAFBFD',
                    border: '1px solid #E8ECF5',
                    fontSize: '12.5px'
                  }}
                >
                  <div>
                    <strong style={{ color: '#111625' }}>{inv.id}</strong>
                    <span style={{ color: '#5F6B85', display: 'block', fontSize: '11px' }}>{inv.date} • Visa ending 4242</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: '800', color: '#111625' }}>{inv.amount}</span>
                    <button
                      className="btn-ghost"
                      onClick={() => showToast(`Receipt ${inv.id} downloaded`, 'info')}
                      style={{ fontSize: '11px', color: '#6E56CF', padding: '4px' }}
                    >
                      PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Tab: Settings */}
      {activeTab === 'Settings' && (
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title">
              <SettingsIcon size={18} color="#6E56CF" />
              <span>Ads Account &amp; Delivery Settings</span>
            </div>
          </div>
          <p style={{ color: '#5F6B85', fontSize: '13px', marginBottom: '16px' }}>
            Configure default bidding strategies, geographic targeting defaults, and advertiser compliance parameters.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
              <strong style={{ fontSize: '14px', color: '#111625', display: 'block', marginBottom: '6px' }}>Auto-Recharge Threshold</strong>
              <p style={{ fontSize: '12px', color: '#5F6B85', margin: 0 }}>Automatically maintain $150 minimum balance when ad impressions spike.</p>
            </div>
            <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
              <strong style={{ fontSize: '14px', color: '#111625', display: 'block', marginBottom: '6px' }}>Attribution Window</strong>
              <p style={{ fontSize: '12px', color: '#5F6B85', margin: 0 }}>7-day click / 1-day view conversion tracking enabled.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Help & Support */}
      {activeTab === 'Help & Support' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div className="glass-panel">
            <div className="panel-header">
              <div>
                <div className="panel-title">
                  <LifeBuoy size={20} color="#6E56CF" />
                  <span>Advertiser Help &amp; Policy Center</span>
                </div>
                <div className="panel-subtitle">
                  Guidelines for search keyword auctions, native promoted blueprints, and publisher revenue share.
                </div>
              </div>
              <span className="badge badge-primary">
                Dedicated Ads Support
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '12px' }}>
              <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
                <strong style={{ fontSize: '14px', color: '#111625', display: 'block', marginBottom: '6px' }}>Search Auction Guidelines</strong>
                <p style={{ fontSize: '12px', color: '#5F6B85', margin: 0 }}>CPC bidding rules, semantic query relevance score thresholds, and second-price auction mechanics.</p>
              </div>
              <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
                <strong style={{ fontSize: '14px', color: '#111625', display: 'block', marginBottom: '6px' }}>Billing &amp; Invoices</strong>
                <p style={{ fontSize: '12px', color: '#5F6B85', margin: 0 }}>Download monthly VAT/GST tax invoices and update primary payment methods seamlessly.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple rocket icon helper
const RocketIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

export default ZunmeAdsPage;
