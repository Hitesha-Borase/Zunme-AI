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
    navigate('/app/chat');
  };

  const handleQuickPromptClick = (text: string) => {
    createNewChat();
    sendMessage(text);
    navigate('/app/chat');
  };

  return (
    <div className="dashboard-page-container">
      {/* Welcome Banner with Ambient Glow */}
      <div
        className="glass-panel"
        style={{
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.18) 0%, rgba(99, 91, 255, 0.08) 50%, rgba(14, 18, 30, 0.8) 100%)',
          borderColor: 'rgba(139, 92, 246, 0.3)',
          padding: 'var(--space-6) var(--space-8)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '720px', position: 'relative', zIndex: 2 }}>
          <div className="badge badge-primary" style={{ marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={12} />
            <span>Unified AI Workspace</span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-0.02em', color: '#F8FAFC', marginBottom: '8px' }}>
            Welcome back, {user?.fullName || 'Creator'} 👋
          </h1>
          <p style={{ fontSize: '15px', color: '#CBD5E1', lineHeight: '1.5', marginBottom: '24px' }}>
            What would you like to explore or create today? Start a conversation, verify real-time facts with web search, or generate marketing copy in seconds.
          </p>

          {/* Quick AI Input Composer */}
          <form onSubmit={handleStartPrompt} style={{ display: 'flex', gap: '10px', position: 'relative' }}>
            <input
              type="text"
              className="input-field"
              placeholder="Ask Zunme anything, brainstorm a topic, or generate copy..."
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              style={{
                height: '52px',
                fontSize: '15px',
                paddingRight: '120px',
                background: 'rgba(11, 14, 24, 0.85)',
                borderColor: 'rgba(139, 92, 246, 0.4)'
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                position: 'absolute',
                right: '6px',
                top: '6px',
                bottom: '6px',
                borderRadius: '8px',
                padding: '0 18px',
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
        <NavLink to="/app/chat" className="metric-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ background: 'rgba(124, 58, 237, 0.15)', color: '#A78BFA' }}>
              <MessageSquare size={20} />
            </div>
            <ArrowRight size={14} color="#A78BFA" />
          </div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#F8FAFC' }}>Ask Zunme</div>
          <div style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.4' }}>
            Multi-turn conversation with memory, code analysis, and smart suggestions.
          </div>
        </NavLink>

        <NavLink to="/app/search" className="metric-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' }}>
              <Search size={20} />
            </div>
            <ArrowRight size={14} color="#38BDF8" />
          </div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#F8FAFC' }}>Live Web Search</div>
          <div style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.4' }}>
            Ground answers with real-time web citations and verifiable source links.
          </div>
        </NavLink>

        <NavLink to="/app/builders" className="metric-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399' }}>
              <PenTool size={20} />
            </div>
            <ArrowRight size={14} color="#34D399" />
          </div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#F8FAFC' }}>Content Builders</div>
          <div style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.4' }}>
            1,000+ templates for blogs, newsletters, ads, and social media hooks.
          </div>
        </NavLink>

        <NavLink to="/app/warehouse" className="metric-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24' }}>
              <Package size={20} />
            </div>
            <ArrowRight size={14} color="#FBBF24" />
          </div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#F8FAFC' }}>AI Warehouse</div>
          <div style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.4' }}>
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
                <Clock size={18} color="#A78BFA" />
                Recent Conversations
              </div>
              <div className="panel-subtitle">Pick up right where you left off</div>
            </div>
            <NavLink to="/app/history" className="btn btn-ghost btn-sm" style={{ padding: '4px 8px', fontSize: '11px' }}>
              View All History <ChevronRight size={12} />
            </NavLink>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {conversations.slice(0, 3).map((conv) => (
              <div
                key={conv.id}
                onClick={() => {
                  selectConversation(conv.id);
                  navigate('/app/chat');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                className="hover-highlight"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                  <MessageSquare size={16} color="#A78BFA" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#F1F5F9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {conv.title}
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: '#64748B', whiteSpace: 'nowrap' }}>
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
                <Bookmark size={18} color="#38BDF8" />
                Saved to My Library
              </div>
              <div className="panel-subtitle">Archived knowledge, extracts, and drafts</div>
            </div>
            <NavLink to="/app/library" className="btn btn-ghost btn-sm" style={{ padding: '4px 8px', fontSize: '11px' }}>
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
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.04)'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                    Category: {item.contentType} • {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <NavLink to="/app/library" className="btn btn-outline btn-sm" style={{ padding: '3px 8px', fontSize: '11px' }}>
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
