import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Mail,
  Send,
  Inbox,
  Clock,
  FileText,
  Archive,
  Trash2,
  Share2,
  Plus,
  Search,
  Star,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  X,
  Sparkles,
  ArrowRight,
  Globe,
  Youtube,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  ShoppingBag,
  Users,
  MessageSquare,
  Check,
  RefreshCw,
  Eye,
  ShieldCheck,
  Lock,
  Shield,
  HardDrive,
  Building2,
  DollarSign,
  SlidersHorizontal,
  Zap,
  Award,
  Copy
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './ZBoxPage.css';

interface ZBoxMessage {
  id: string;
  sender: string;
  email: string;
  subject: string;
  snippet: string;
  body: string;
  timestamp: string;
  folder: 'inbox' | 'sent' | 'scheduled' | 'drafts' | 'shared';
  unread: boolean;
  starred: boolean;
  hasAttachment: boolean;
  attachmentName?: string;
}

const INITIAL_MESSAGES: ZBoxMessage[] = [
  {
    id: 'msg-sec',
    sender: 'ZBox Privacy & Security Shield',
    email: 'security@zbox.zunme.ai',
    subject: '🛡️ Zero-Knowledge Privacy Active: Your Communications are Protected',
    snippet: 'Unlike Google ($22/mo) and Microsoft ($19.90/mo), ZBox never scans your emails or monitors metadata for advertising...',
    body: `Dear Small Business Owner,\n\nWelcome to ZBox Secured Business Email (Zunme LetsWork).\n\nAs businesses seek reliable, trustworthy alternatives to Google Workspace and Microsoft 365, ZBox was built specifically to protect your privacy and eliminate surveillance.\n\nKey Protections Active on your Account:\n- Zero-Knowledge mailbox encryption\n- No third-party data broker sharing or advertising telemetry\n- Secure sharing for heavy 4K videos, creative assets, and client agreements\n- Complimentary starter tier for small businesses under 3 employees\n- Official onboarding and training support powered by B4B America\n\nStay private,\nThe ZBox Security Architecture Team`,
    timestamp: '9:15 AM',
    folder: 'inbox',
    unread: true,
    starred: true,
    hasAttachment: false
  },
  {
    id: 'msg-1',
    sender: 'Zunme AI Support',
    email: 'system@zunme.ai',
    subject: 'Welcome to your zBox Unified Inbox & Communications Hub',
    snippet: 'Your zBox internal client is now initialized. Send emails, manage communications, and dispatch content across platforms...',
    body: `Hello Creator,\n\nWelcome to zBox, the internal communications and cross-platform distribution suite built directly into Zunme AI.\n\nWith zBox, you can:\n- Compose and manage rich emails directly from your workspace\n- Attach generated assets from the AI Warehouse with one click\n- Cross-post and syndicate to Google, Facebook, Instagram, YouTube, TikTok, LinkedIn, Amazon, X, and CRM nErgy.\n\nEnjoy seamless creation and distribution!\n\nThe Zunme Team`,
    timestamp: '10:45 AM',
    folder: 'inbox',
    unread: false,
    starred: true,
    hasAttachment: false
  },
  {
    id: 'msg-2',
    sender: 'Sarah Lin (Creative Director)',
    email: 'sarah.lin@digitalreach.io',
    subject: 'Feedback on Q4 Ad Creative Generation & Video Hooks',
    snippet: 'The retention hooks generated via the Studio builder performed exceptionally well on our TikTok tests...',
    body: `Hi team,\n\nJust reviewed the video script and b-roll assets generated in the Zunme Creator Studio. The 3-second hook structure produced a 34% increase in completion rate across our initial test audience.\n\nCan you schedule the second batch for syndication to Instagram Reels and YouTube Shorts via zBox?\n\nBest regards,\nSarah Lin`,
    timestamp: 'Yesterday',
    folder: 'inbox',
    unread: false,
    starred: true,
    hasAttachment: true,
    attachmentName: 'TikTok_Performance_Summary.pdf'
  },
  {
    id: 'msg-3',
    sender: 'CRM nErgy Sync Agent',
    email: 'sync@nergy-crm.net',
    subject: 'Automated Lead Ingestion: 18 New Inquiries Synced',
    snippet: '18 new enterprise prospective leads were captured from your Zunme Search ad campaign and routed to sales pipeline...',
    body: `Automated Sync Alert from CRM nErgy:\n\n18 new verified leads have been captured from your sponsored search campaign and added to your qualified outbound queue.\n\n- Channel: Zunme PPC Search\n- Campaign: Enterprise B2B Marketing Suite\n- Conversion Cost: $4.18 / lead\n\nPlease review lead notes in the Business Workspace.`,
    timestamp: 'Oct 14',
    folder: 'inbox',
    unread: false,
    starred: false,
    hasAttachment: false
  },
  {
    id: 'msg-4',
    sender: 'Me (Outbound)',
    email: 'you@zunme.ai',
    subject: 'Re: Enterprise Digital Licensing Inquiry',
    snippet: 'Attached is the commercial license agreement for the 3D Character Avatar rig pack...',
    body: `Hi Alex,\n\nFollowing up on your inquiry on the Zunme Store. The extended commercial license for the Neo-Tokyo avatar pack covers unlimited broadcast and app distribution.\n\nLet me know if you need customized modifications.\n\nBest,\nYour Studio`,
    timestamp: 'Oct 12',
    folder: 'sent',
    unread: false,
    starred: false,
    hasAttachment: true,
    attachmentName: 'Commercial_License_v2.pdf'
  }
];

export const ZBoxPage: React.FC = () => {
  const { showToast } = useApp();

  type ModeType = 'webmail' | 'sharing' | 'secured-plans';
  type FolderType = 'inbox' | 'sent' | 'scheduled' | 'drafts' | 'shared';

  const [activeMode, setActiveMode] = useState<ModeType>('webmail');
  const [activeFolder, setActiveFolder] = useState<FolderType>('inbox');
  const [messages, setMessages] = useState<ZBoxMessage[]>(INITIAL_MESSAGES);
  const [selectedMessage, setSelectedMessage] = useState<ZBoxMessage | null>(INITIAL_MESSAGES[0]);
  const [searchMailQuery, setSearchMailQuery] = useState('');

  // Secured Business Email Configurator State (From ZBox – secured business email.docx)
  const [selectedAccountsTier, setSelectedAccountsTier] = useState<string>('1 (Solo)');
  const [selectedStorageTier, setSelectedStorageTier] = useState<string>('5 GB');
  const [isMediaHeavy, setIsMediaHeavy] = useState<boolean>(false);
  const [isEncryptedCompose, setIsEncryptedCompose] = useState<boolean>(true);

  const calculateConfigCost = () => {
    if (selectedAccountsTier === '1 (Solo)' && selectedStorageTier === '5 GB') {
      return { cost: 0, isFree: true, note: 'Eligible for 100% Free Small Business Starter Plan (< 3 Employees)' };
    }
    if (selectedAccountsTier === '1 (Solo)') {
      return { cost: 9.99, isFree: false, note: 'Solopreneur Secure Package (No Employees • 78-82% of Businesses)' };
    }
    let base = 18.0;
    if (selectedStorageTier === '500 GB' || selectedStorageTier === '5 TB') base += 6.0;
    if (isMediaHeavy) base += 4.0;
    return { cost: base, isFree: false, note: 'Zunme LetsWork Secured Business Tier (Positioned alongside Google & Microsoft)' };
  };

  // 1. Custom Business Domain Connection State (Doc Lines 24, 34, 43)
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);
  const [customDomainInput, setCustomDomainInput] = useState('');
  const [activeCustomDomain, setActiveCustomDomain] = useState<string | null>(null);
  const [isVerifyingDomain, setIsVerifyingDomain] = useState(false);
  const [domainVerified, setDomainVerified] = useState(false);

  // 2. Free Starter Tier (< 3 Employees) Dedicated Claim State (Doc Line 6)
  const [isFreeClaimModalOpen, setIsFreeClaimModalOpen] = useState(false);
  const [freeBusinessName, setFreeBusinessName] = useState('');
  const [freeEmployeeCount, setFreeEmployeeCount] = useState<'solo' | '1' | '2'>('solo');
  const [freeAdminName, setFreeAdminName] = useState('');
  const [freeEmailPrefix, setFreeEmailPrefix] = useState('');
  const [isActivatingFree, setIsActivatingFree] = useState(false);
  const [freeClaimSuccess, setFreeClaimSuccess] = useState(false);

  const handleCopyText = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`Copied ${label} to clipboard.`, 'success');
    }
  };

  const handleVerifyDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDomainInput.trim()) {
      showToast('Please enter your business domain name.', 'error');
      return;
    }
    const cleanDomain = customDomainInput.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    setIsVerifyingDomain(true);
    setTimeout(() => {
      setIsVerifyingDomain(false);
      setDomainVerified(true);
      setActiveCustomDomain(cleanDomain);
      showToast(`✓ Domain ${cleanDomain} verified! MX & SPF records active.`, 'success');
    }, 1200);
  };

  const handleActivateFreeTier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!freeBusinessName.trim() || !freeEmailPrefix.trim()) {
      showToast('Please fill in your business name and desired email prefix.', 'error');
      return;
    }
    setIsActivatingFree(true);
    setTimeout(() => {
      setIsActivatingFree(false);
      setFreeClaimSuccess(true);
      const emailDomain = activeCustomDomain ? `@${activeCustomDomain}` : '@zunme.ai';
      const fullEmail = `${freeEmailPrefix.trim().toLowerCase()}${emailDomain}`;

      const freeWelcomeMsg: ZBoxMessage = {
        id: `msg-free-${Date.now()}`,
        sender: 'ZBox Provisioning Gateway',
        email: 'accounts@zbox.zunme.ai',
        subject: `🎉 100% Free Business Email Activated: ${fullEmail}`,
        snippet: `Welcome ${freeBusinessName}! Your complimentary starter mailbox (< 3 employees) is now operational...`,
        body: `Dear ${freeAdminName || 'Business Owner'},\n\nCongratulations! Your 100% Free Business Email account for "${freeBusinessName}" is officially live and ready for use.\n\nActivated Package Details (Doc Line 6 Specification):\n- Email Address: ${fullEmail}\n- Team Size: ${freeEmployeeCount === 'solo' ? 'Solopreneur (No Employees)' : freeEmployeeCount + ' Employee(s)'}\n- Tier: Small Business Starter (Free Forever • < 3 Employees)\n- Storage: 5 GB High-Security Cloud Mailbox\n- Encryption: Zero-Knowledge End-to-End Vault Enabled\n- Zero Ads, Zero Surveillance, Zero Data Scrutiny\n\nWhen your business grows beyond 3 employees or requires additional high-definition media vault storage (up to 5 TB), you can upgrade your plan at any time through the Secured Business Email dashboard.\n\nBest regards,\nZBox Business Provisioning & B4B America`,
        timestamp: 'Just now',
        folder: 'inbox',
        unread: true,
        starred: true,
        hasAttachment: false
      };
      setMessages(prev => [freeWelcomeMsg, ...prev]);
      showToast('🎉 Free Business Email successfully activated!', 'success');
    }, 1000);
  };

  // Compose Modal State
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [composeAttachAsset, setComposeAttachAsset] = useState(false);

  // Cross-Platform Sharing State
  const [selectedPlatform, setSelectedPlatform] = useState<string>('LinkedIn');
  const [shareTitle, setShareTitle] = useState('New AI-Generated Campaign Milestone');
  const [shareContent, setShareContent] = useState('Excited to unveil our latest multimodal campaign generated entirely on Zunme AI! Verified 40% reduction in production turnaround. #AIInnovation #Zunme');
  const [shareMediaUrl, setShareMediaUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSharingLoading, setIsSharingLoading] = useState(false);

  const platforms = [
    { name: 'Google', icon: <Globe size={20} color="#EA4335" />, desc: 'Google Business Profile & Discover' },
    { name: 'Facebook', icon: <Facebook size={20} color="#1877F2" />, desc: 'Page In-Feed & Stories' },
    { name: 'Instagram', icon: <Instagram size={20} color="#E4405F" />, desc: 'Grid Post, Reel & Story' },
    { name: 'YouTube', icon: <Youtube size={20} color="#FF0000" />, desc: 'Shorts & Community Feed' },
    { name: 'TikTok', icon: <Share2 size={20} color="#000000" />, desc: 'Short Video Feed' },
    { name: 'LinkedIn', icon: <Linkedin size={20} color="#0A66C2" />, desc: 'Company Page & Article' },
    { name: 'Amazon', icon: <ShoppingBag size={20} color="#FF9900" />, desc: 'Amazon Brand Post & Store' },
    { name: 'X', icon: <Twitter size={20} color="#1DA1F2" />, desc: 'Thread & Visual Tweet' },
    { name: 'CRM nErgy', icon: <Users size={20} color="#10B981" />, desc: 'Enterprise Lead Engagement' },
    { name: 'Other Channels', icon: <MessageSquare size={20} color="#8B5CF6" />, desc: 'Webhook & Custom API' }
  ];

  const filteredMessages = messages.filter(m => {
    if (m.folder !== activeFolder) return false;
    if (searchMailQuery.trim()) {
      const q = searchMailQuery.toLowerCase();
      return m.subject.toLowerCase().includes(q) || m.sender.toLowerCase().includes(q) || m.snippet.toLowerCase().includes(q);
    }
    return true;
  });

  const handleSelectMessage = (msg: ZBoxMessage) => {
    setSelectedMessage(msg);
    if (msg.unread) {
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, unread: false } : m));
    }
  };

  const handleSendCompose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo.trim() || !composeSubject.trim()) {
      showToast('Recipient and subject are required.', 'error');
      return;
    }

    const newMsg: ZBoxMessage = {
      id: `msg-${Date.now()}`,
      sender: 'Me (Outbound)',
      email: composeTo,
      subject: composeSubject,
      snippet: composeBody.slice(0, 80) + '...',
      body: composeBody,
      timestamp: 'Just now',
      folder: 'sent',
      unread: false,
      starred: false,
      hasAttachment: composeAttachAsset,
      attachmentName: composeAttachAsset ? 'Zunme_AI_Asset_Export.zip' : undefined
    };

    setMessages(prev => [newMsg, ...prev]);
    if (isEncryptedCompose) {
      showToast(`🔒 Encrypted email dispatched securely to ${composeTo} via ZBox Zero-Knowledge Vault.`, 'success');
    } else {
      showToast(`Email dispatched to ${composeTo} via zBox (Demo Client).`, 'success');
    }
    setIsComposeOpen(false);
    setComposeTo('');
    setComposeSubject('');
    setComposeBody('');
    setComposeAttachAsset(false);
  };

  const handleInitiateShare = () => {
    if (!shareTitle.trim() || !shareContent.trim()) {
      showToast('Please provide a title and post content.', 'error');
      return;
    }
    setIsSharingLoading(true);
    setTimeout(() => {
      setIsSharingLoading(false);
      setIsShareModalOpen(true);
    }, 900);
  };

  return (
    <div className="zbox-container">
      {/* Top Banner */}
      <div className="zbox-header">
        <div className="zbox-header-left">
          <div className="zbox-header-icon">
            <Mail size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: 'var(--color-text-primary)' }}>
                zBox
              </h1>
              <span className="badge badge-primary">Unified Communications &amp; Syndication</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '4px 0 0 0' }}>
              Private webmail client, zero-knowledge security vault, and cross-platform syndication hub.
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="zbox-mode-tabs">
          <button
            type="button"
            className={`zbox-mode-btn ${activeMode === 'webmail' ? 'active' : ''}`}
            onClick={() => setActiveMode('webmail')}
          >
            <Mail size={15} />
            <span>zBox Webmail</span>
          </button>
          <button
            type="button"
            className={`zbox-mode-btn ${activeMode === 'sharing' ? 'active' : ''}`}
            onClick={() => setActiveMode('sharing')}
          >
            <Share2 size={15} />
            <span>Cross-Platform Sharing</span>
          </button>
          <button
            type="button"
            className={`zbox-mode-btn ${activeMode === 'secured-plans' ? 'active' : ''}`}
            onClick={() => setActiveMode('secured-plans')}
          >
            <ShieldCheck size={15} color="#10B981" />
            <span>Secured Business Email (Plans &amp; Privacy)</span>
          </button>
        </div>
      </div>

      {/* MODE 1: GMAIL-LIKE WEBMAIL CLIENT */}
      {activeMode === 'webmail' && (
        <>
          <div className="zbox-privacy-strip" style={{ borderRadius: '12px', border: '1px solid #BBF7D0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} color="#16A34A" />
              <span>
                <strong>ZBox Zero-Knowledge Privacy Active:</strong> Unlike Google ($22/mo) and Microsoft ($19.90/mo), your emails and attachments are private and never monetized or scanned for ads.
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setIsDomainModalOpen(true)}
                style={{ padding: '4px 10px', fontSize: '11px', background: '#FFFFFF', borderColor: '#C7D2FE', color: '#4338CA', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Globe size={13} color="#4338CA" />
                <span>{activeCustomDomain ? `Domain: @${activeCustomDomain}` : 'Connect Custom Domain'}</span>
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setActiveMode('secured-plans')}
                style={{ padding: '4px 10px', fontSize: '11px', background: '#FFFFFF', borderColor: '#86EFAC', color: '#166534', fontWeight: 700 }}
              >
                Explore Business Email Plans
              </button>
            </div>
          </div>

          <div className="zbox-mail-layout">
          {/* Folder Sidebar */}
          <div className="zbox-mail-sidebar">
            <button
              type="button"
              className="zbox-compose-btn"
              onClick={() => setIsComposeOpen(true)}
            >
              <Plus size={16} />
              <span>Compose Message</span>
            </button>

            <div className="zbox-folder-list">
              <button
                type="button"
                className={`zbox-folder-item ${activeFolder === 'inbox' ? 'active' : ''}`}
                onClick={() => setActiveFolder('inbox')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Inbox size={16} />
                  <span>Inbox</span>
                </div>
                <span className="zbox-unread-count">
                  {messages.filter(m => m.folder === 'inbox' && m.unread).length}
                </span>
              </button>

              <button
                type="button"
                className={`zbox-folder-item ${activeFolder === 'sent' ? 'active' : ''}`}
                onClick={() => setActiveFolder('sent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Send size={16} />
                  <span>Sent</span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  {messages.filter(m => m.folder === 'sent').length}
                </span>
              </button>

              <button
                type="button"
                className={`zbox-folder-item ${activeFolder === 'scheduled' ? 'active' : ''}`}
                onClick={() => setActiveFolder('scheduled')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} />
                  <span>Scheduled</span>
                </div>
              </button>

              <button
                type="button"
                className={`zbox-folder-item ${activeFolder === 'drafts' ? 'active' : ''}`}
                onClick={() => setActiveFolder('drafts')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={16} />
                  <span>Drafts</span>
                </div>
              </button>
            </div>

            {/* Custom Domain Connection Card in Sidebar (Doc Lines 24, 34, 43) */}
            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
              <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Active Mailbox Domain
                  </span>
                  <span className={`badge ${activeCustomDomain ? 'badge-success' : 'badge-primary'}`} style={{ fontSize: '10px', padding: '1px 6px' }}>
                    {activeCustomDomain ? 'Custom' : 'Default'}
                  </span>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <Globe size={13} color="#6E56CF" />
                  <span>{activeCustomDomain ? `@${activeCustomDomain}` : '@zunme.ai'}</span>
                </div>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '11px', padding: '4px 8px', width: '100%', justifyContent: 'center', marginTop: '2px', background: '#FFFFFF' }}
                  onClick={() => setIsDomainModalOpen(true)}
                >
                  {activeCustomDomain ? 'Manage DNS / Aliases' : '+ Connect Custom Domain'}
                </button>
              </div>
            </div>
          </div>

          {/* Mail Content (List + Detail Pane) */}
          <div className="zbox-mail-content">
            {/* List Pane */}
            <div className="zbox-mail-list-pane">
              <div className="zbox-mail-search-box">
                <div className="store-search-box" style={{ width: '100%', maxWidth: '100%' }}>
                  <Search size={14} color="var(--color-text-muted)" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchMailQuery}
                    onChange={(e) => setSearchMailQuery(e.target.value)}
                  />
                </div>
              </div>

              {filteredMessages.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  <Mail size={32} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
                  <p style={{ fontSize: '13px' }}>No messages in {activeFolder}</p>
                </div>
              ) : (
                filteredMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`zbox-mail-item ${selectedMessage?.id === msg.id ? 'selected' : ''} ${msg.unread ? 'unread' : ''}`}
                    onClick={() => handleSelectMessage(msg)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '13px', color: msg.unread ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', fontWeight: msg.unread ? 800 : 600 }}>
                        {msg.sender}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                        {msg.timestamp}
                      </span>
                    </div>

                    <div style={{ fontSize: '13px', fontWeight: msg.unread ? 700 : 500, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                      {msg.subject}
                    </div>

                    <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {msg.snippet}
                    </p>

                    {msg.hasAttachment && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '11px', color: 'var(--color-primary)', background: 'var(--color-primary-light)', padding: '2px 6px', borderRadius: '4px' }}>
                        <Paperclip size={11} />
                        <span>Attachment</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Detail Pane */}
            <div className="zbox-mail-detail-pane">
              {selectedMessage ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--color-border)', paddingBottom: '14px' }}>
                    <div>
                      <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                        {selectedMessage.subject}
                      </h2>
                      <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                        From: <strong>{selectedMessage.sender}</strong> &lt;{selectedMessage.email}&gt;
                      </div>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      {selectedMessage.timestamp}
                    </span>
                  </div>

                  <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-text-primary)', whiteSpace: 'pre-wrap', flex: 1 }}>
                    {selectedMessage.body}
                  </div>

                  {selectedMessage.hasAttachment && selectedMessage.attachmentName && (
                    <div style={{ padding: '12px 16px', background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Paperclip size={16} color="var(--color-primary)" />
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>{selectedMessage.attachmentName}</span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => showToast(`Attachment downloaded (Demo).`, 'info')}
                      >
                        Download
                      </button>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px', paddingTop: '14px', borderTop: '1px solid var(--color-border)' }}>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        setComposeTo(selectedMessage.email);
                        setComposeSubject(`Re: ${selectedMessage.subject}`);
                        setIsComposeOpen(true);
                      }}
                    >
                      Reply
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => showToast('Message forwarded (Demo).', 'info')}
                    >
                      Forward
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)', fontSize: '14px' }}>
                  Select a message to view its contents.
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )}

      {/* MODE 2: CROSS-PLATFORM CONTENT SHARING WORKSPACE */}
      {activeMode === 'sharing' && (
        <div className="zbox-sharing-grid">
          {/* Left Column: Platform & Content Configuration */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="panel-header">
              <div className="panel-title">
                <Share2 size={18} color="var(--color-primary)" />
                Select Destination Platform
              </div>
              <span className="badge badge-primary">10 Supported Channels</span>
            </div>

            <div className="zbox-platform-grid">
              {platforms.map(p => (
                <div
                  key={p.name}
                  className={`zbox-platform-card ${selectedPlatform === p.name ? 'selected' : ''}`}
                  onClick={() => setSelectedPlatform(p.name)}
                >
                  {p.icon}
                  <span>{p.name}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Post Headline / Subject
              </label>
              <input
                type="text"
                className="input-field"
                value={shareTitle}
                onChange={(e) => setShareTitle(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Content Body &amp; Tags
              </label>
              <textarea
                className="input-field"
                style={{ minHeight: '90px' }}
                value={shareContent}
                onChange={(e) => setShareContent(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Featured Media URL (AI Image / Video Reel)
              </label>
              <input
                type="url"
                className="input-field"
                value={shareMediaUrl}
                onChange={(e) => setShareMediaUrl(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleInitiateShare}
              disabled={isSharingLoading}
              style={{ justifyContent: 'center', marginTop: '8px' }}
            >
              {isSharingLoading ? <RefreshCw size={15} className="spin" /> : <Send size={15} />}
              <span>{isSharingLoading ? 'Dispatching to API Gateway...' : `Share Directly to ${selectedPlatform}`}</span>
            </button>
          </div>

          {/* Right Column: Live Channel Preview */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="panel-header">
                <div className="panel-title">
                  <Eye size={18} color="#0284C7" />
                  {selectedPlatform} Real-Time Channel Preview
                </div>
                <span className="badge badge-success">Simulated Post</span>
              </div>

              {/* Mock Social Card */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                {/* Author Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6E56CF 0%, #10B981 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>
                    Z
                  </div>
                  <div>
                    <strong style={{ fontSize: '13px', display: 'block', color: 'var(--color-text-primary)' }}>
                      Zunme Verified Creator
                    </strong>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      Published via zBox • Just now
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div style={{ padding: '0 14px 12px', fontSize: '13px', color: 'var(--color-text-primary)', lineHeight: 1.5 }}>
                  <p style={{ fontWeight: 700, marginBottom: '4px' }}>{shareTitle}</p>
                  <p style={{ margin: 0 }}>{shareContent}</p>
                </div>

                {/* Image Media Preview */}
                {shareMediaUrl && (
                  <div style={{ width: '100%', height: '220px', background: '#F1F5F9', overflow: 'hidden' }}>
                    <img
                      src={shareMediaUrl}
                      alt="Shared Asset"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}

                {/* Interaction Footer */}
                <div style={{ padding: '10px 14px', background: '#FAFBFD', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  <span>Target Network: <strong>{selectedPlatform}</strong></span>
                  <span style={{ color: '#059669', fontWeight: 600 }}>API Ready</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px 16px', background: '#FEF3E2', border: '1px solid rgba(217, 119, 6, 0.25)', borderRadius: 'var(--radius-md)', fontSize: '12px', color: '#B45309' }}>
              <strong>Notice:</strong> Cross-platform syndication operates in client prototype mode. In production, official OAuth authentication and developer tokens will publish live to the external network.
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: SECURED BUSINESS EMAIL & STORAGE TIERS (ZUNME LETSWORK) */}
      {activeMode === 'secured-plans' && (
        <div className="zbox-secure-plans-container">
          {/* Hero Banner */}
          <div className="zbox-secure-hero">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', color: '#34D399', fontWeight: 700, marginBottom: '14px' }}>
              <ShieldCheck size={14} />
              <span>Zunme LetsWork — Private &amp; Secured Business Email</span>
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 10px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              The Trustworthy, Surveillance-Free Alternative to Google &amp; Microsoft
            </h2>
            <p style={{ fontSize: '14px', color: '#94A3B8', maxWidth: '780px', lineHeight: '1.6', margin: '0 0 20px' }}>
              Built for small businesses, solopreneurs, and growing teams looking for communication privacy. While Google and Microsoft face scrutiny for third-party email data sharing, ZBox provides reliable, zero-knowledge encrypted email without feeling monitored.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#E2E8F0' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span>Zero Third-Party Data Tracking</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#E2E8F0' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span>Complimentary Starter Tier (&lt; 3 Employees)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#E2E8F0' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span>B4B America Dedicated Onboarding Support</span>
              </div>
            </div>
          </div>

          {/* Market Comparison Table / Cards (Johnny's Direct Comparison) */}
          <div>
            <div style={{ marginBottom: '14px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-primary)', margin: 0 }}>
                Competitive Market Positioning
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '4px 0 0' }}>
                ZBox is engineered as the 3rd most trusted business email provider alongside Microsoft and Google.
              </p>
            </div>

            <div className="zbox-comparison-grid">
              {/* Google Workspace */}
              <div className="zbox-plan-card" style={{ opacity: 0.9 }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                    Google Workspace
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginTop: '2px' }}>
                    Business Plus
                  </div>
                  <div className="zbox-plan-price">
                    $22.00 <small>/user/mo</small>
                  </div>
                  <div style={{ fontSize: '11px', color: '#DC2626', fontWeight: 600, background: '#FEF2F2', padding: '4px 8px', borderRadius: '6px', marginTop: '6px' }}>
                    ⚠️ Scrutinized for 3rd-Party Data Sharing &amp; Telemetry
                  </div>
                  <ul className="zbox-plan-features">
                    <li><Check size={14} color="#64748B" /> <span>5 TB pooled cloud storage</span></li>
                    <li><Check size={14} color="#64748B" /> <span>Google Meet 500 participants</span></li>
                    <li><Check size={14} color="#64748B" /> <span>Bundled productivity lock-in</span></li>
                    <li><X size={14} color="#DC2626" /> <span>High per-user scaling cost</span></li>
                  </ul>
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', textAlign: 'center', marginTop: '10px' }}>
                  Industry's most expensive tier
                </div>
              </div>

              {/* Microsoft 365 */}
              <div className="zbox-plan-card" style={{ opacity: 0.9 }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                    Microsoft 365
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginTop: '2px' }}>
                    Business Standard
                  </div>
                  <div className="zbox-plan-price">
                    $19.90 <small>/user/mo</small>
                  </div>
                  <div style={{ fontSize: '11px', color: '#D97706', fontWeight: 600, background: '#FFFBEB', padding: '4px 8px', borderRadius: '6px', marginTop: '6px' }}>
                    ⚠️ Complex Desktop Licensing &amp; Monitored Apps
                  </div>
                  <ul className="zbox-plan-features">
                    <li><Check size={14} color="#64748B" /> <span>1 TB OneDrive storage</span></li>
                    <li><Check size={14} color="#64748B" /> <span>Office Desktop Applications</span></li>
                    <li><Check size={14} color="#64748B" /> <span>Data loss prevention policies</span></li>
                    <li><X size={14} color="#DC2626" /> <span>No built-in creative AI warehouse</span></li>
                  </ul>
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', textAlign: 'center', marginTop: '10px' }}>
                  Second most expensive provider
                </div>
              </div>

              {/* Zunme LetsWork / ZBox Secure (Featured) */}
              <div className="zbox-plan-card featured">
                <span className="zbox-plan-badge">Top Recommendation</span>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#6E56CF', textTransform: 'uppercase' }}>
                    Zunme LetsWork
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#111625', marginTop: '2px' }}>
                    Secured Business Email
                  </div>
                  <div className="zbox-plan-price" style={{ color: '#6E56CF' }}>
                    $18.00 <small>/user/mo</small>
                  </div>
                  <div
                    style={{ fontSize: '11px', color: '#059669', fontWeight: 700, background: '#ECFDF5', padding: '4px 8px', borderRadius: '6px', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                    onClick={() => {
                      setFreeClaimSuccess(false);
                      setIsFreeClaimModalOpen(true);
                    }}
                    title="Click to claim free email account"
                  >
                    <span>✓ 100% Free for Businesses with &lt; 3 Employees</span>
                    <span style={{ textDecoration: 'underline', fontWeight: 800 }}>Claim Free &rarr;</span>
                  </div>
                  <ul className="zbox-plan-features">
                    <li><Check size={14} color="#10B981" /> <span><strong>Zero Third-Party Monitoring:</strong> True confidentiality</span></li>
                    <li><Check size={14} color="#10B981" /> <span><strong>5 TB Cloud Vault:</strong> Heavy video &amp; raw media attachments</span></li>
                    <li><Check size={14} color="#10B981" /> <span><strong>Integrated AI Warehouse:</strong> One-click asset dispatch</span></li>
                    <li><Check size={14} color="#10B981" /> <span><strong>Meetings for 1,000 Participants:</strong> High-definition video</span></li>
                    <li><Check size={14} color="#10B981" /> <span><strong>B4B America Support:</strong> Free onboarding &amp; staff training</span></li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '14px', padding: '10px' }}
                  onClick={() => showToast('Claimed ZBox Business Account trial. B4B America advisor assigned.', 'success')}
                >
                  Get Started with ZBox
                </button>
              </div>

              {/* Proton Mail (From Doc Line 38-40) */}
              <div className="zbox-plan-card" style={{ opacity: 0.9 }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                    Proton Mail
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginTop: '2px' }}>
                    Mail Professional
                  </div>
                  <div className="zbox-plan-price">
                    $7.99 <small>/user/mo</small>
                  </div>
                  <div style={{ fontSize: '11px', color: '#6D28D9', fontWeight: 600, background: '#F5F3FF', padding: '4px 8px', borderRadius: '6px', marginTop: '6px' }}>
                    🔒 Encrypted Email &amp; Custom Domains
                  </div>
                  <ul className="zbox-plan-features">
                    <li><Check size={14} color="#64748B" /> <span>End-to-end encrypted email</span></li>
                    <li><Check size={14} color="#64748B" /> <span>Custom domain support</span></li>
                    <li><Check size={14} color="#64748B" /> <span>15 GB storage capacity</span></li>
                    <li><X size={14} color="#DC2626" /> <span>Limited 15 GB storage (No 5 TB video vault)</span></li>
                    <li><X size={14} color="#DC2626" /> <span>No integrated creative AI studio</span></li>
                  </ul>
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', textAlign: 'center', marginTop: '10px' }}>
                  Privacy-first with storage limits
                </div>
              </div>

              {/* Zoho Mail (From Doc Line 41-43) */}
              <div className="zbox-plan-card" style={{ opacity: 0.9 }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                    Zoho Mail
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginTop: '2px' }}>
                    Workplace Standard
                  </div>
                  <div className="zbox-plan-price">
                    $1.00 – $3.00 <small>/user/mo</small>
                  </div>
                  <div style={{ fontSize: '11px', color: '#0369A1', fontWeight: 600, background: '#F0F9FF', padding: '4px 8px', borderRadius: '6px', marginTop: '6px' }}>
                    💼 Budget Custom Domain Suite
                  </div>
                  <ul className="zbox-plan-features">
                    <li><Check size={14} color="#64748B" /> <span>Custom domain email hosting</span></li>
                    <li><Check size={14} color="#64748B" /> <span>Varying storage options (5 GB – 30 GB)</span></li>
                    <li><Check size={14} color="#64748B" /> <span>Affordable entry pricing</span></li>
                    <li><X size={14} color="#DC2626" /> <span>No zero-knowledge encryption architecture</span></li>
                    <li><X size={14} color="#DC2626" /> <span>No high-throughput video CDN sharing</span></li>
                  </ul>
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', textAlign: 'center', marginTop: '10px' }}>
                  Budget tier with basic feature set
                </div>
              </div>
            </div>
          </div>

          {/* Small Business Size Breakdown Infographic (Doc Lines 12-21) */}
          <div className="zbox-breakdown-card">
            <div className="zbox-breakdown-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-primary">Market Research Breakdown</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#6E56CF' }}>Doc Lines 12–21 Spec</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111625', margin: '6px 0 2px' }}>
                Small Businesses with Employees — Breakdown by Size
              </h3>
              <p style={{ fontSize: '13px', color: '#5F6B85', margin: 0 }}>
                Why ZBox is specifically targeted at the underserved 98%+ of small businesses that don't need expensive corporate bundles.
              </p>
            </div>

            <div className="zbox-breakdown-grid">
              {/* Tier 1: No Employees (78-82%) */}
              <div className="zbox-breakdown-item primary">
                <div className="breakdown-stat-header">
                  <span className="breakdown-tag-badge">Primary Target</span>
                  <span className="breakdown-percentage">78% – 82%</span>
                </div>
                <div className="breakdown-progress-track">
                  <div className="breakdown-progress-fill" style={{ width: '80%', background: 'linear-gradient(90deg, #6E56CF 0%, #8B5CF6 100%)' }} />
                </div>
                <div className="breakdown-meta">
                  <h4 className="breakdown-title">No Employees (Solopreneurs)</h4>
                  <p className="breakdown-desc">
                    Solo creators, consultants, and independent founders. ZBox provides the Solopreneur Secure Package ($9.99/mo) for private client communication and heavy document/video transfer.
                  </p>
                </div>
                <div className="breakdown-feature-pill">
                  ✓ Protected against Google/Microsoft surveillance
                </div>
              </div>

              {/* Tier 2: 1-19 Employees (18-22%) */}
              <div className="zbox-breakdown-item success">
                <div className="breakdown-stat-header">
                  <span className="breakdown-tag-badge success">Micro-Teams</span>
                  <span className="breakdown-percentage success">18% – 22%</span>
                </div>
                <div className="breakdown-progress-track">
                  <div className="breakdown-progress-fill" style={{ width: '20%', background: 'linear-gradient(90deg, #059669 0%, #10B981 100%)' }} />
                </div>
                <div className="breakdown-meta">
                  <h4 className="breakdown-title">1 – 19 Employees (Micro-Teams)</h4>
                  <p className="breakdown-desc">
                    Small agencies, boutique firms, and startups. Eligible for 100% Free starter accounts (&lt; 3 employees) with zero tracking, scaling up to 20 seats as team grows.
                  </p>
                </div>
                <div className="breakdown-feature-pill success">
                  ✓ 100% Free for &lt; 3 Employees starter tier
                </div>
              </div>

              {/* Tier 3: 20+ Employees (< 2%) */}
              <div className="zbox-breakdown-item muted">
                <div className="breakdown-stat-header">
                  <span className="breakdown-tag-badge muted">Large Scale</span>
                  <span className="breakdown-percentage muted">&lt; 2%</span>
                </div>
                <div className="breakdown-progress-track">
                  <div className="breakdown-progress-fill" style={{ width: '2%', background: '#94A3B8' }} />
                </div>
                <div className="breakdown-meta">
                  <h4 className="breakdown-title">20+ Employees (Large Scale)</h4>
                  <p className="breakdown-desc">
                    Mid-to-large enterprises typically locked into expensive $22/user Google Workspace contracts. ZBox provides custom 20 to 200+ seat packages with volume savings.
                  </p>
                </div>
                <div className="breakdown-feature-pill muted">
                  ✓ Custom 20–200+ seat deployment
                </div>
              </div>
            </div>

            {/* Bottom Strategic Market Insight */}
            <div className="zbox-breakdown-insight">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1E293B', fontWeight: 700, fontSize: '13px' }}>
                <Users size={16} color="#6E56CF" />
                <span>Strategic Market Insight:</span>
              </div>
              <p style={{ margin: 0, fontSize: '12.5px', color: '#475569', lineHeight: 1.5 }}>
                Over <strong>98% of all small businesses have fewer than 20 employees</strong> (with 80%+ being solo operations). While Google ($22/mo) and Microsoft ($19.90/mo) enforce high per-user models with bundled bloatware, ZBox delivers pure confidential email, large file security, and free access for micro-teams.
              </p>
            </div>
          </div>

          {/* Small Business Segmented Offers (From Johnny's spec lines 6-7, 12-21) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #10B981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge badge-success">Free Tier</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669' }}>Fewer Than 3 Employees</span>
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#111625', margin: 0 }}>
                Free Small Business Starter Account
              </h4>
              <p style={{ fontSize: '13px', color: '#5F6B85', margin: '6px 0 14px', lineHeight: '1.5' }}>
                We believe privacy is a fundamental right, not an enterprise luxury. Businesses with 1 to 2 team members receive complimentary business email with full privacy shield. Upgrade only when your storage needs expand.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 900, color: '#10B981' }}>$0.00 / month</span>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{ borderColor: '#10B981', color: '#047857', fontWeight: 700 }}
                  onClick={() => {
                    setFreeClaimSuccess(false);
                    setIsFreeClaimModalOpen(true);
                  }}
                >
                  Claim Free Account
                </button>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #6E56CF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge badge-primary">78% - 82% of Businesses</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#6E56CF' }}>No Employees (Solopreneurs)</span>
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#111625', margin: 0 }}>
                Solopreneur Secure Document &amp; Video Package
              </h4>
              <p style={{ fontSize: '13px', color: '#5F6B85', margin: '6px 0 14px', lineHeight: '1.5' }}>
                Engineered for solo creators, consultants, and founders. Safely send contracts, client videos, and IP assets without risk of intercept or corporate monitoring. Sold in a unified high-security bundle.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 900, color: '#6E56CF' }}>$9.99 / month</span>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => showToast('Activated Solopreneur Secure Package.', 'success')}
                >
                  Activate Solopreneur Vault
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Storage & User Accounts Configurator (Johnny's exact numbers) */}
          <div className="zbox-configurator-box">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111625', margin: 0 }}>
                  Interactive Storage &amp; Team Configurator
                </h3>
                <p style={{ fontSize: '13px', color: '#5F6B85', margin: '4px 0 0' }}>
                  Customize your business email deployment based on account count and media attachment workloads.
                </p>
              </div>
              <span className="badge badge-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                <SlidersHorizontal size={13} style={{ display: 'inline', marginRight: '6px' }} />
                Johnny's Enterprise Spec
              </span>
            </div>

            {/* Row 1: Number of Email Accounts */}
            <div className="zbox-config-section">
              <div className="zbox-config-label">
                <Users size={15} color="#6E56CF" />
                <span>1. Number of Email Accounts per Business:</span>
              </div>
              <div className="zbox-pills-row">
                {['1 (Solo)', '2 - 5', '5 - 10', '10 - 20', '20 - 50', '51 - 100', '100 - 200', '200+'].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    className={`zbox-pill-btn ${selectedAccountsTier === tier ? 'active' : ''}`}
                    onClick={() => setSelectedAccountsTier(tier)}
                  >
                    {tier} Accounts
                  </button>
                ))}
              </div>
            </div>

            {/* Row 2: Storage Allocation */}
            <div className="zbox-config-section">
              <div className="zbox-config-label">
                <HardDrive size={15} color="#059669" />
                <span>2. Storage Capacity per Mailbox:</span>
              </div>
              <div className="zbox-pills-row">
                {['5 GB', '10 GB', '20 GB', '30 GB', '50 GB', '100 GB', '200 GB', '500 GB', '5 TB'].map((storage) => (
                  <button
                    key={storage}
                    type="button"
                    className={`zbox-pill-btn ${selectedStorageTier === storage ? 'active' : ''}`}
                    onClick={() => setSelectedStorageTier(storage)}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 3: Heavy Video Attachment Configuration (Johnny's spec line 11) */}
            <div className="zbox-config-section" style={{ padding: '14px 18px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', margin: 0 }}>
                <input
                  type="checkbox"
                  checked={isMediaHeavy}
                  onChange={(e) => setIsMediaHeavy(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#6E56CF' }}
                />
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1E293B' }}>
                    Configure for Frequent Video, Image &amp; Creative Media Attachments
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    Optimizes upload buffers and CDN streaming pipelines for fast dispatch of 4K b-roll and AI studio renders.
                  </div>
                </div>
              </label>
            </div>

            {/* Config Summary & Pricing Banner */}
            {(() => {
              const pricing = calculateConfigCost();
              return (
                <div style={{ marginTop: '24px', padding: '18px 22px', background: pricing.isFree ? '#F0FDF4' : '#F5F3FF', border: `1px solid ${pricing.isFree ? '#BBF7D0' : '#DDD6FE'}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: pricing.isFree ? '#166534' : '#5B21B6', textTransform: 'uppercase' }}>
                      Configuration Summary
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#111625', marginTop: '2px' }}>
                      {selectedAccountsTier} Accounts • {selectedStorageTier} Storage {isMediaHeavy ? '• Video Attachment Optimized' : ''}
                    </div>
                    <div style={{ fontSize: '12.5px', color: pricing.isFree ? '#15803D' : '#6E56CF', marginTop: '4px', fontWeight: 600 }}>
                      {pricing.note}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '24px', fontWeight: 900, color: '#111625' }}>
                        {pricing.isFree ? 'FREE' : `$${pricing.cost.toFixed(2)}`}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>
                        {pricing.isFree ? 'No credit card required' : 'per user / month'}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        if (pricing.isFree) {
                          setFreeClaimSuccess(false);
                          setIsFreeClaimModalOpen(true);
                        } else {
                          showToast(`Configured ${selectedAccountsTier} with ${selectedStorageTier}. Ready to provision!`, 'success');
                        }
                      }}
                      style={{ padding: '10px 18px', fontSize: '13px', fontWeight: 800 }}
                    >
                      {pricing.isFree ? 'Claim Free Mailbox' : 'Deploy Secure Mailbox'}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* B4B America Partner Integration Banner */}
          <div className="zbox-b4b-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#2563EB', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={22} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#1E3A8A' }}>
                  B4B America Small Business Onboarding &amp; Training Partnership
                </div>
                <div style={{ fontSize: '12.5px', color: '#3B82F6', marginTop: '2px' }}>
                  B4B America acts as your dedicated sales and account advisor, guiding team migrations from Google and Microsoft with zero downtime.
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              style={{ background: '#FFFFFF', borderColor: '#93C5FD', color: '#1E40AF', fontWeight: 700 }}
              onClick={() => showToast('B4B America Advisor Request submitted. An onboarding specialist will contact you.', 'success')}
            >
              Contact B4B America Advisor
            </button>
          </div>
        </div>
      )}

      {/* Compose Message Modal */}
      {isComposeOpen && (
        <div className="store-modal-backdrop" onClick={() => setIsComposeOpen(false)}>
          <div className="store-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="store-modal-header">
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={16} color="#10B981" />
                <span>Compose New Secure zBox Message</span>
              </h3>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setIsComposeOpen(false)}
                style={{ padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSendCompose} className="store-modal-body">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>From Address:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Globe size={13} />
                  <span>you{activeCustomDomain ? `@${activeCustomDomain}` : '@zunme.ai'}</span>
                  {activeCustomDomain && <span className="badge badge-success" style={{ fontSize: '9.5px', padding: '1px 5px' }}>Custom Domain</span>}
                </span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  To (Recipient Email or Team Member) *
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="collaborator@company.com"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Subject *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Campaign review / Confidential document delivery"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Message Body
                </label>
                <textarea
                  className="input-field"
                  style={{ minHeight: '120px' }}
                  placeholder="Write your email here..."
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                />
              </div>

              {/* Security & Attachment Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="encryptVault"
                    checked={isEncryptedCompose}
                    onChange={(e) => setIsEncryptedCompose(e.target.checked)}
                    style={{ accentColor: '#10B981', width: '15px', height: '15px' }}
                  />
                  <label htmlFor="encryptVault" style={{ fontSize: '12.5px', fontWeight: 700, color: '#166534', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                    <ShieldCheck size={14} color="#16A34A" />
                    <span>Send with Zero-Knowledge Encryption (Private Vault Mode)</span>
                  </label>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="attachAsset"
                    checked={composeAttachAsset}
                    onChange={(e) => setComposeAttachAsset(e.target.checked)}
                    style={{ width: '15px', height: '15px' }}
                  />
                  <label htmlFor="attachAsset" style={{ fontSize: '12.5px', color: 'var(--color-text-primary)', cursor: 'pointer', margin: 0 }}>
                    Attach active asset from AI Warehouse (Supports heavy 4K videos &amp; docs up to 500GB)
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsComposeOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Send size={15} />
                  <span>Send Email (Demo)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sharing Confirmation Modal */}
      {isShareModalOpen && (
        <div className="store-modal-backdrop" onClick={() => setIsShareModalOpen(false)}>
          <div className="store-modal-container" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="store-modal-header">
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--color-primary)' }}>
                Demo Sharing Confirmation
              </h3>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setIsShareModalOpen(false)}
                style={{ padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="store-modal-body" style={{ textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                Content Dispatched to {selectedPlatform} (Demo)
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                Your post <strong>"{shareTitle}"</strong> was processed through the zBox syndication validator and dispatched to the prototype channel queue.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setIsShareModalOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: CUSTOM BUSINESS DOMAIN CONNECTION (Doc Lines 24, 34, 43) */}
      {isDomainModalOpen && (
        <div className="store-modal-backdrop" onClick={() => setIsDomainModalOpen(false)}>
          <div className="store-modal-container" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="store-modal-header">
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#111625' }}>
                  <Globe size={18} color="#6E56CF" />
                  <span>Connect Custom Business Domain</span>
                </h3>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '3px 0 0' }}>
                  Send &amp; receive confidential emails as <strong style={{ color: '#1E293B' }}>name@{customDomainInput.trim() || 'yourbusiness.com'}</strong> (Doc Lines 24, 34, 43)
                </p>
              </div>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setIsDomainModalOpen(false)}
                style={{ padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="store-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* If already active and verified */}
              {activeCustomDomain && domainVerified && (
                <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={22} color="#059669" />
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#065F46' }}>
                        Custom Domain Active: @{activeCustomDomain}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#047857' }}>
                        Zero-Knowledge MX, SPF, &amp; DKIM routing authenticated. Outbound mail sends as @{activeCustomDomain}.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    style={{ background: '#FFFFFF', borderColor: '#FCA5A5', color: '#DC2626', fontSize: '11px', padding: '3px 8px' }}
                    onClick={() => {
                      setActiveCustomDomain(null);
                      setDomainVerified(false);
                      showToast('Custom domain disconnected. Defaulting to @zunme.ai', 'info');
                    }}
                  >
                    Disconnect
                  </button>
                </div>
              )}

              {/* Domain Input Form */}
              <form onSubmit={handleVerifyDomain} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#1E293B' }}>
                    1. Enter Your Registered Business Domain
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. acmecorp.com or yourbusiness.org"
                      value={customDomainInput}
                      onChange={(e) => {
                        setCustomDomainInput(e.target.value);
                        if (domainVerified) setDomainVerified(false);
                      }}
                      style={{ flex: 1 }}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isVerifyingDomain || !customDomainInput.trim()}
                      style={{ minWidth: '130px', justifyContent: 'center' }}
                    >
                      {isVerifyingDomain ? (
                        <>
                          <RefreshCw size={14} className="spin" />
                          <span>Checking DNS...</span>
                        </>
                      ) : (
                        <>
                          <Check size={14} />
                          <span>Verify DNS</span>
                        </>
                      )}
                    </button>
                  </div>
                  <span style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px', display: 'block' }}>
                    Compatible with GoDaddy, Namecheap, Cloudflare, Google Domains, AWS Route 53, or any registrar.
                  </span>
                </div>

                {/* DNS Configuration Table */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B', margin: 0 }}>
                      2. Add Required DNS Records to Your Domain Host
                    </label>
                    <span style={{ fontSize: '11px', color: '#6E56CF', fontWeight: 600 }}>
                      Doc Lines 24, 34, 43
                    </span>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table className="zbox-dns-table">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Host / Name</th>
                          <th>Target Value</th>
                          <th>Priority</th>
                          <th style={{ textAlign: 'center' }}>Copy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* MX Record */}
                        <tr>
                          <td>
                            <span className="badge badge-primary" style={{ fontSize: '10.5px' }}>MX</span>
                          </td>
                          <td><code>@</code></td>
                          <td>
                            <span className="zbox-code-badge">mail.zbox.zunme.ai</span>
                          </td>
                          <td>10</td>
                          <td style={{ textAlign: 'center' }}>
                            <button
                              type="button"
                              className="btn-ghost"
                              style={{ padding: '3px 6px', fontSize: '11px', color: '#6E56CF' }}
                              onClick={() => handleCopyText('mail.zbox.zunme.ai', 'MX Record')}
                              title="Copy MX value"
                            >
                              <Copy size={13} />
                            </button>
                          </td>
                        </tr>

                        {/* TXT SPF Record */}
                        <tr>
                          <td>
                            <span className="badge badge-success" style={{ fontSize: '10.5px' }}>TXT (SPF)</span>
                          </td>
                          <td><code>@</code></td>
                          <td>
                            <span className="zbox-code-badge">v=spf1 include:spf.zbox.zunme.ai ~all</span>
                          </td>
                          <td>—</td>
                          <td style={{ textAlign: 'center' }}>
                            <button
                              type="button"
                              className="btn-ghost"
                              style={{ padding: '3px 6px', fontSize: '11px', color: '#6E56CF' }}
                              onClick={() => handleCopyText('v=spf1 include:spf.zbox.zunme.ai ~all', 'SPF Record')}
                              title="Copy SPF value"
                            >
                              <Copy size={13} />
                            </button>
                          </td>
                        </tr>

                        {/* CNAME DKIM Record */}
                        <tr>
                          <td>
                            <span className="badge" style={{ fontSize: '10.5px', background: '#F3E8FF', color: '#7E22CE' }}>CNAME (DKIM)</span>
                          </td>
                          <td><code>zunme._domainkey</code></td>
                          <td>
                            <span className="zbox-code-badge">dkim.zbox.zunme.ai</span>
                          </td>
                          <td>—</td>
                          <td style={{ textAlign: 'center' }}>
                            <button
                              type="button"
                              className="btn-ghost"
                              style={{ padding: '3px 6px', fontSize: '11px', color: '#6E56CF' }}
                              onClick={() => handleCopyText('dkim.zbox.zunme.ai', 'DKIM Record')}
                              title="Copy DKIM value"
                            >
                              <Copy size={13} />
                            </button>
                          </td>
                        </tr>

                        {/* TXT DMARC Record */}
                        <tr>
                          <td>
                            <span className="badge badge-outline" style={{ fontSize: '10.5px' }}>TXT (DMARC)</span>
                          </td>
                          <td><code>_dmarc</code></td>
                          <td>
                            <span className="zbox-code-badge">v=DMARC1; p=quarantine;</span>
                          </td>
                          <td>—</td>
                          <td style={{ textAlign: 'center' }}>
                            <button
                              type="button"
                              className="btn-ghost"
                              style={{ padding: '3px 6px', fontSize: '11px', color: '#6E56CF' }}
                              onClick={() => handleCopyText('v=DMARC1; p=quarantine;', 'DMARC Record')}
                              title="Copy DMARC value"
                            >
                              <Copy size={13} />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '12px 14px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#475569' }}>
                  <Lock size={16} color="#10B981" />
                  <span>
                    Zero-Knowledge encryption certificates are automatically provisioned upon DNS validation.
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px', borderTop: '1px solid #E2E8F0' }}>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setIsDomainModalOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      if (!activeCustomDomain && customDomainInput.trim()) {
                        const clean = customDomainInput.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
                        setActiveCustomDomain(clean);
                        setDomainVerified(true);
                        showToast(`Domain @${clean} activated for your ZBox mailbox!`, 'success');
                      }
                      setIsDomainModalOpen(false);
                    }}
                  >
                    Save &amp; Use Domain
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: FREE STARTER TIER (< 3 EMPLOYEES) DEDICATED CLAIM FLOW (Doc Line 6) */}
      {isFreeClaimModalOpen && (
        <div className="store-modal-backdrop" onClick={() => setIsFreeClaimModalOpen(false)}>
          <div className="store-modal-container" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
            <div className="store-modal-header">
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#111625' }}>
                  <Sparkles size={18} color="#059669" />
                  <span>Claim 100% Free Business Email</span>
                </h3>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '3px 0 0' }}>
                  Complimentary email for small businesses with &lt; 3 employees (Doc Line 6)
                </p>
              </div>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setIsFreeClaimModalOpen(false)}
                style={{ padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="store-modal-body">
              {freeClaimSuccess ? (
                <div style={{ textAlign: 'center', padding: '10px 0 6px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#111625', margin: '0 0 6px' }}>
                    Free Business Email Activated!
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#475569', margin: '0 0 16px' }}>
                    Your small business mailbox is now live with zero surveillance and 5 GB encrypted vault.
                  </p>

                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', textAlign: 'left', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>Business:</span>
                      <strong style={{ fontSize: '13px', color: '#1E293B' }}>{freeBusinessName}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>Mailbox Address:</span>
                      <strong style={{ fontSize: '13px', color: '#059669' }}>
                        {freeEmailPrefix.trim().toLowerCase()}{activeCustomDomain ? `@${activeCustomDomain}` : '@zunme.ai'}
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>Team Tier:</span>
                      <strong style={{ fontSize: '13px', color: '#1E293B' }}>
                        {freeEmployeeCount === 'solo' ? 'Solopreneur (0 Employees)' : freeEmployeeCount + ' Employee(s)'} (&lt; 3 Cap)
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>Monthly Cost:</span>
                      <strong style={{ fontSize: '14px', color: '#059669' }}>$0.00 / month (Free Forever)</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ flex: 1, justifyContent: 'center' }}
                      onClick={() => {
                        setIsFreeClaimModalOpen(false);
                        setActiveMode('webmail');
                      }}
                    >
                      <Inbox size={15} />
                      <span>Open My Free Webmail Inbox</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleActivateFreeTier} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Doc Line 6 Policy Guarantee Banner */}
                  <div className="zbox-free-guarantee-card">
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <ShieldCheck size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#065F46' }}>
                          Doc Line 6 Guarantee: 100% Free Forever for &lt; 3 Employees
                        </div>
                        <div style={{ fontSize: '12px', color: '#047857', marginTop: '2px', lineHeight: 1.4 }}>
                          Zero credit card required. Includes 5 GB secure mailbox, B4B America training, and instant option to upgrade as your business expands.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#1E293B' }}>
                      Business / Studio Name *
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. Apex Design Agency or Studio Bloom"
                      value={freeBusinessName}
                      onChange={(e) => setFreeBusinessName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Team Size Selection (< 3 employees) */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#1E293B' }}>
                      Team Size / Employee Count (Select to Qualify) *
                    </label>
                    <div className="zbox-employee-radio-group">
                      <div
                        className={`zbox-employee-radio-btn ${freeEmployeeCount === 'solo' ? 'selected' : ''}`}
                        onClick={() => setFreeEmployeeCount('solo')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: '#111625' }}>Solo Founder</span>
                          <span className="badge badge-primary" style={{ fontSize: '10px' }}>78-82%</span>
                        </div>
                        <span style={{ fontSize: '11.5px', color: '#64748B' }}>0 Employees • Independent</span>
                      </div>

                      <div
                        className={`zbox-employee-radio-btn ${freeEmployeeCount === '1' ? 'selected' : ''}`}
                        onClick={() => setFreeEmployeeCount('1')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: '#111625' }}>1 Employee</span>
                          <span className="badge badge-success" style={{ fontSize: '10px' }}>Eligible</span>
                        </div>
                        <span style={{ fontSize: '11.5px', color: '#64748B' }}>2 Members Total</span>
                      </div>

                      <div
                        className={`zbox-employee-radio-btn ${freeEmployeeCount === '2' ? 'selected' : ''}`}
                        onClick={() => setFreeEmployeeCount('2')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: '#111625' }}>2 Employees</span>
                          <span className="badge badge-success" style={{ fontSize: '10px' }}>Max Free Cap</span>
                        </div>
                        <span style={{ fontSize: '11.5px', color: '#64748B' }}>3 Members Total (&lt; 3)</span>
                      </div>
                    </div>
                  </div>

                  {/* Primary Admin Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#1E293B' }}>
                      Account Owner / Admin Name
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. Alex Morgan"
                      value={freeAdminName}
                      onChange={(e) => setFreeAdminName(e.target.value)}
                    />
                  </div>

                  {/* Desired Business Email Address */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#1E293B' }}>
                      Desired Business Email Address *
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="e.g. contact, hello, or alex"
                        value={freeEmailPrefix}
                        onChange={(e) => setFreeEmailPrefix(e.target.value)}
                        required
                        style={{ flex: 1 }}
                      />
                      <div style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 800, color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Globe size={14} color="#6E56CF" />
                        <span>{activeCustomDomain ? `@${activeCustomDomain}` : '@zunme.ai'}</span>
                      </div>
                    </div>
                    {activeCustomDomain ? (
                      <span style={{ fontSize: '11.5px', color: '#059669', marginTop: '4px', display: 'block', fontWeight: 600 }}>
                        ✓ Using your connected custom domain (@{activeCustomDomain})
                      </span>
                    ) : (
                      <span style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px', display: 'block' }}>
                        Defaulting to @zunme.ai. You can connect a custom domain (e.g. name@yourbusiness.com) anytime.
                      </span>
                    )}
                  </div>

                  {/* Features included */}
                  <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '12px 14px', border: '1px solid #E2E8F0', fontSize: '12px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={14} color="#10B981" />
                      <span><strong>Zero Surveillance:</strong> 0 third-party scanning or telemetry</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={14} color="#10B981" />
                      <span><strong>5 GB Secure Mailbox:</strong> Encrypted storage for attachments</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={14} color="#10B981" />
                      <span><strong>B4B America Support:</strong> Free onboarding guidance</span>
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px', borderTop: '1px solid #E2E8F0' }}>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setIsFreeClaimModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isActivatingFree}
                      style={{ minWidth: '180px', justifyContent: 'center' }}
                    >
                      {isActivatingFree ? (
                        <>
                          <RefreshCw size={14} className="spin" />
                          <span>Activating Mailbox...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={15} />
                          <span>Activate 100% Free Email</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
