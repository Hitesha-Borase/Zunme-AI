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
  Eye
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
    id: 'msg-1',
    sender: 'Zunme AI Support',
    email: 'system@zunme.ai',
    subject: 'Welcome to your zBox Unified Inbox & Communications Hub',
    snippet: 'Your zBox internal client is now initialized. Send emails, manage communications, and dispatch content across platforms...',
    body: `Hello Creator,\n\nWelcome to zBox, the internal communications and cross-platform distribution suite built directly into Zunme AI.\n\nWith zBox, you can:\n- Compose and manage rich emails directly from your workspace\n- Attach generated assets from the AI Warehouse with one click\n- Cross-post and syndicate to Google, Facebook, Instagram, YouTube, TikTok, LinkedIn, Amazon, X, and CRM nErgy.\n\nEnjoy seamless creation and distribution!\n\nThe Zunme Team`,
    timestamp: '10:45 AM',
    folder: 'inbox',
    unread: true,
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

  type ModeType = 'webmail' | 'sharing';
  type FolderType = 'inbox' | 'sent' | 'scheduled' | 'drafts' | 'shared';

  const [activeMode, setActiveMode] = useState<ModeType>('webmail');
  const [activeFolder, setActiveFolder] = useState<FolderType>('inbox');
  const [messages, setMessages] = useState<ZBoxMessage[]>(INITIAL_MESSAGES);
  const [selectedMessage, setSelectedMessage] = useState<ZBoxMessage | null>(INITIAL_MESSAGES[0]);
  const [searchMailQuery, setSearchMailQuery] = useState('');

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
    showToast(`Email dispatched to ${composeTo} via zBox (Demo Client).`, 'success');
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
              Internal webmail communication client and one-click cross-platform content sharing workspace.
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
        </div>
      </div>

      {/* MODE 1: GMAIL-LIKE WEBMAIL CLIENT */}
      {activeMode === 'webmail' && (
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

      {/* Compose Message Modal */}
      {isComposeOpen && (
        <div className="store-modal-backdrop" onClick={() => setIsComposeOpen(false)}>
          <div className="store-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="store-modal-header">
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
                Compose New zBox Message
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
                  placeholder="Campaign review / Content delivery"
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="attachAsset"
                  checked={composeAttachAsset}
                  onChange={(e) => setComposeAttachAsset(e.target.checked)}
                />
                <label htmlFor="attachAsset" style={{ fontSize: '13px', color: 'var(--color-text-primary)', cursor: 'pointer' }}>
                  Attach current active asset from AI Warehouse
                </label>
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
    </div>
  );
};
