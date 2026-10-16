import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Search,
  PenTool,
  Bookmark,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Send,
  Zap,
  Package,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/dashboard.css';

export const UserHomePage: React.FC = () => {
  const {
    user,
    conversations,
    libraryItems,
    createNewChat,
    sendMessage,
    selectConversation
  } = useApp();

  const [promptInput, setPromptInput] = useState('');
  const navigate = useNavigate();

  const handleStartPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    createNewChat();
    sendMessage(promptInput.trim());
    navigate('/user/chat');
  };

  const handleQuickPromptClick = (text: string) => {
    createNewChat();
    sendMessage(text);
    navigate('/user/chat');
  };

  return (
    <div className="dashboard-page-container">
      {/* Welcome Banner with Ambient Glow */}
      <div
        className="glass-panel"
        style={{
          background: 'linear-gradient(135deg, rgba(253, 238, 233, 0.9) 0%, rgba(245, 235, 249, 0.9) 50%, #FFFFFF 100%)',
          borderColor: '#E8ECF5',
          padding: 'var(--space-6) var(--space-8)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 20px -2px rgba(30, 20, 60, 0.04)'
        }}
      >
        <div style={{ maxWidth: '720px', position: 'relative', zIndex: 2 }}>
          <div className="badge badge-primary" style={{ marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={12} />
            <span>Unified AI Workspace</span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-0.02em', color: '#111625', marginBottom: '8px' }}>
            Welcome back, {user?.fullName || 'Creator'} 👋
          </h1>
          <p style={{ fontSize: '15px', color: '#5F6B85', lineHeight: '1.5', marginBottom: '24px' }}>
            What would you like to explore or create today? Start a conversation, verify real-time facts with web search, or generate marketing copy in seconds.
          </p>

          {/* Quick AI Input Composer */}
          <form onSubmit={handleStartPrompt} style={{ display: 'flex', gap: '10px', position: 'relative' }}>
            <input
              type="text"
              className="input-field home-ask-input"
              placeholder="Ask Zunme anything, brainstorm a topic, or generate copy..."
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              style={{
                height: '52px',
                fontSize: '15px',
                paddingRight: '120px',
                background: '#FFFFFF',
                borderColor: '#E2E6F2',
                color: '#111625',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 2px 8px rgba(30, 20, 60, 0.04)'
              }}
            />
            <button
              type="submit"
              className="btn btn-primary home-ask-btn"
              style={{
                position: 'absolute',
                right: '6px',
                top: '6px',
                bottom: '6px',
                borderRadius: 'var(--radius-full)',
                padding: '0 20px',
                fontWeight: '700'
              }}
            >
              <Send size={15} />
              <span>Ask AI</span>
            </button>
          </form>

          {/* Prompt Starter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '14px' }}>
            {[
              'Compare 2026 clean energy innovations',
              'Draft a launch email for my product',
              'Outline an SEO pillar article'
            ].map((pill, i) => (
              <button
                key={i}
                type="button"
                className="filter-pill"
                onClick={() => handleQuickPromptClick(pill)}
                style={{ fontSize: '11px', padding: '4px 10px' }}
              >
                ✨ {pill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Launch Cards */}
      <div className="cards-grid-4">
        <NavLink to="/user/chat" className="metric-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ background: '#EFEBFC', color: '#6E56CF' }}>
              <MessageSquare size={20} />
            </div>
            <ArrowRight size={14} color="#6E56CF" />
          </div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#111625' }}>Ask Zunme</div>
          <div style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.4' }}>
            Multi-turn conversation with memory, code analysis, and smart suggestions.
          </div>
        </NavLink>

        <NavLink to="/user/search" className="metric-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ background: '#E0F2FE', color: '#0284C7' }}>
              <Search size={20} />
            </div>
            <ArrowRight size={14} color="#0284C7" />
          </div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#111625' }}>Live Web Search</div>
          <div style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.4' }}>
            Ground answers with real-time web citations and verifiable source links.
          </div>
        </NavLink>

        <NavLink to="/user/builders" className="metric-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ background: '#E8F8F0', color: '#059669' }}>
              <PenTool size={20} />
            </div>
            <ArrowRight size={14} color="#059669" />
          </div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#111625' }}>Content Builders</div>
          <div style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.4' }}>
            1,000+ templates for blogs, newsletters, ads, and social media hooks.
          </div>
        </NavLink>

        <NavLink to="/warehouse/dashboard" className="metric-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ background: '#FEF3E2', color: '#D97706' }}>
              <Package size={20} />
            </div>
            <ArrowRight size={14} color="#D97706" />
          </div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#111625' }}>AI Warehouse</div>
          <div style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.4' }}>
            Explore verified prompts, workflows, and creator assets in the repository.
          </div>
        </NavLink>
      </div>

      {/* Grid: Recent Work & Saved Library Highlights */}
      <div className="cards-grid-2">
        {/* Recent Work */}
        <div className="glass-panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">
                <Clock size={18} color="#6E56CF" />
                Recent Conversations
              </div>
              <div className="panel-subtitle">Pick up right where you left off</div>
            </div>
            <NavLink to="/user/history" className="btn btn-ghost btn-sm" style={{ padding: '4px 8px', fontSize: '11px' }}>
              View All History <ChevronRight size={12} />
            </NavLink>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {conversations.slice(0, 3).map((conv) => (
              <div
                key={conv.id}
                onClick={() => {
                  selectConversation(conv.id);
                  navigate('/user/chat');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: '#FAFBFD',
                  border: '1px solid #E8ECF5',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                className="hover-highlight"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                  <MessageSquare size={16} color="#6E56CF" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#111625', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {conv.title}
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: '#8C97B0', whiteSpace: 'nowrap' }}>
                  {new Date(conv.updatedAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Content in Library */}
        <div className="glass-panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">
                <Bookmark size={18} color="#0284C7" />
                Saved to My Library
              </div>
              <div className="panel-subtitle">Archived knowledge, extracts, and drafts</div>
            </div>
            <NavLink to="/user/library" className="btn btn-ghost btn-sm" style={{ padding: '4px 8px', fontSize: '11px' }}>
              Open Library <ChevronRight size={12} />
            </NavLink>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {libraryItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: '#FAFBFD',
                  border: '1px solid #E8ECF5'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#111625', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: '11px', color: '#5F6B85' }}>
                    Category: {item.contentType} • {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <NavLink to="/user/library" className="btn btn-outline btn-sm" style={{ padding: '3px 8px', fontSize: '11px' }}>
                  View
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
