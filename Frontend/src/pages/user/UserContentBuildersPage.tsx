import React, { useState } from 'react';
import {
  PenTool,
  Search,
  Filter,
  Sparkles,
  Copy,
  Bookmark,
  Check,
  RefreshCw,
  FileText,
  Share2,
  Briefcase,
  SearchCheck,
  Palette,
  ArrowRight,
  Video
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  ContentCategory,
  ContentFormat,
  ContentTone,
  ContentLength
} from '../../types';
import '../../styles/dashboard.css';
import { ImageStudio } from '../../components/studio/ImageStudio';
import { VideoScriptStudio } from '../../components/studio/VideoScriptStudio';
import { DocumentCanvas } from '../../components/studio/DocumentCanvas';
import '../../components/studio/StudioStyles.css';

interface ToolTemplate {
  id: string;
  name: string;
  category: ContentCategory;
  format: ContentFormat;
  icon: string;
  badge?: string;
  description: string;
  promptPlaceholder: string;
}

const TEMPLATES_CATALOG: ToolTemplate[] = [
  {
    id: 'tpl_1',
    name: 'Long-Form Blog Post Outline',
    category: 'TEXT',
    format: 'BLOG_OUTLINE',
    icon: '📝',
    badge: 'Popular',
    description: 'Structured comprehensive 4-phase article outline with high-retention hooks and key takeaways.',
    promptPlaceholder: 'e.g., Breakthroughs in battery technology and clean energy storage in 2026...'
  },
  {
    id: 'tpl_2',
    name: 'High-Converting Email Newsletter',
    category: 'MARKETING',
    format: 'EMAIL_NEWSLETTER',
    icon: '📬',
    badge: 'High Impact',
    description: 'Persuasive product announcement or community newsletter with curiosity-driven subject lines.',
    promptPlaceholder: 'e.g., Announcing the beta launch of our modular titanium water bottle...'
  },
  {
    id: 'tpl_3',
    name: 'Viral Social Media Hooks & Captions',
    category: 'MARKETING',
    format: 'SOCIAL_CAPTION',
    icon: '🚀',
    badge: 'Trending',
    description: 'Attention-grabbing short-form hooks, formatted body paragraphs, and hashtag tags for X and LinkedIn.',
    promptPlaceholder: 'e.g., Why solopreneurs are replacing 5 separate research tools with one AI workspace...'
  },
  {
    id: 'tpl_4',
    name: 'Direct-Response Product Ad Copy',
    category: 'MARKETING',
    format: 'PRODUCT_AD',
    icon: '🎯',
    description: 'Multi-angle ad copy targeting core audience pain points, primary benefits, and clear CTA.',
    promptPlaceholder: 'e.g., AI productivity tool saving 10 hours a week on research and drafting...'
  },
  {
    id: 'tpl_5',
    name: 'YouTube Retention Script Outline',
    category: 'TEXT',
    format: 'VIDEO_SCRIPT',
    icon: '🎬',
    description: 'Hook-Story-Offer video blueprint with timestamp pacing, b-roll prompts, and call to action.',
    promptPlaceholder: 'e.g., Top 5 mistakes new creators make when building their content engine...'
  },
  {
    id: 'tpl_6',
    name: 'SEO In-Depth Pillar Section',
    category: 'TEXT',
    format: 'ARTICLE_SECTION',
    icon: '🔍',
    description: 'Semantically rich article section designed for search engine answer boxes and topical authority.',
    promptPlaceholder: 'e.g., How does real-time citation verification prevent LLM hallucinations?'
  }
];

export const UserContentBuildersPage: React.FC = () => {
  const {
    generatedContent,
    isGeneratingContent,
    generateContent,
    saveToLibrary,
    showToast
  } = useApp();

  const [activeStudioTab, setActiveStudioTab] = useState<'templates' | 'images' | 'video' | 'canvas'>('templates');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'TEXT' | 'MARKETING'>('ALL');
  const [selectedTemplate, setSelectedTemplate] = useState<ToolTemplate>(TEMPLATES_CATALOG[0]);

  // Form State
  const [instructions, setInstructions] = useState('');
  const [tone, setTone] = useState<ContentTone>('Professional');
  const [length, setLength] = useState<ContentLength>('Medium (~500 words)');
  const [copied, setCopied] = useState(false);

  const filteredTemplates = TEMPLATES_CATALOG.filter((t) => {
    const matchesCat = activeCategory === 'ALL' || t.category === activeCategory;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelectTemplate = (tpl: ToolTemplate) => {
    setSelectedTemplate(tpl);
    if (!instructions) {
      setInstructions('');
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instructions.trim()) {
      showToast('Please enter your topic or instructions first', 'warning');
      return;
    }

    generateContent({
      category: selectedTemplate.category,
      format: selectedTemplate.format,
      instructions: instructions.trim(),
      tone,
      length
    });
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent.content);
    setCopied(true);
    showToast('Copied content to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!generatedContent) return;
    saveToLibrary({
      title: generatedContent.title,
      contentType: generatedContent.category,
      content: generatedContent.content,
      previewText: generatedContent.content.slice(0, 140) + '...',
      tags: [selectedTemplate.format.replace('_', ' '), tone]
    });
  };

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <PenTool size={26} color="#A78BFA" />
            AI Content Builders
          </h1>
          <p className="dashboard-subtitle">
            Catalog of 1,000+ structured generation blueprints for long-form writing, viral social hooks, email campaigns, and SEO briefs.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-primary">
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
            Consistent Input & Output Architecture
          </div>
        </div>
      </div>

      {/* Studio Mode Navigation */}
      <div className="studio-tab-bar">
        <button
          className={`studio-nav-pill ${activeStudioTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveStudioTab('templates')}
        >
          <PenTool size={15} />
          <span>Templates Catalog (1,000+)</span>
        </button>

        <button
          className={`studio-nav-pill ${activeStudioTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveStudioTab('images')}
        >
          <Sparkles size={15} />
          <span>AI Image Studio</span>
        </button>

        <button
          className={`studio-nav-pill ${activeStudioTab === 'video' ? 'active' : ''}`}
          onClick={() => setActiveStudioTab('video')}
        >
          <Video size={15} />
          <span>Video Script Engine</span>
        </button>

        <button
          className={`studio-nav-pill ${activeStudioTab === 'canvas' ? 'active' : ''}`}
          onClick={() => setActiveStudioTab('canvas')}
        >
          <FileText size={15} />
          <span>Rich Document Canvas</span>
        </button>
      </div>

      {activeStudioTab === 'images' && <ImageStudio />}
      {activeStudioTab === 'video' && <VideoScriptStudio />}
      {activeStudioTab === 'canvas' && <DocumentCanvas />}

      {activeStudioTab === 'templates' && (
        <>
          {/* Catalog Search & Category Filters */}
          <div className="glass-panel" style={{ padding: 'var(--space-4)' }}>
        <div className="filter-toolbar" style={{ margin: 0 }}>
          <div className="search-box-wrap">
            <Search size={16} />
            <input
              type="text"
              className="input-field"
              placeholder="Search 1,000+ templates & blueprints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-pills-row">
            {(['ALL', 'TEXT', 'MARKETING'] as const).map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'ALL' ? 'All Builders (1,000+)' : cat === 'TEXT' ? 'Articles & Writing' : 'Marketing & Social'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Template Selector Grid */}
      <div className="cards-grid-3">
        {filteredTemplates.map((tpl) => (
          <div
            key={tpl.id}
            onClick={() => handleSelectTemplate(tpl)}
            className="glass-panel"
            style={{
              cursor: 'pointer',
              borderColor: selectedTemplate.id === tpl.id ? '#6E56CF' : undefined,
              background: selectedTemplate.id === tpl.id ? '#F5EFFF' : '#FFFFFF',
              boxShadow: selectedTemplate.id === tpl.id ? '0 8px 24px rgba(110, 86, 207, 0.15)' : undefined,
              transition: 'all 0.18s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '24px' }}>{tpl.icon}</span>
              {tpl.badge && <span className="badge badge-primary">{tpl.badge}</span>}
            </div>

            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
              {tpl.name}
            </h3>
            <p style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.4' }}>
              {tpl.description}
            </p>
          </div>
        ))}
      </div>

      {/* Consistent Input & Output Workspace Pane */}
      <div className="cards-grid-2">
        {/* Input Configuration Card */}
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title">
              <Sparkles size={18} color="#6E56CF" />
              Generator: {selectedTemplate.name}
            </div>
            <span className="badge badge-neutral">{selectedTemplate.category}</span>
          </div>

          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                Topic & Specific Instructions
              </label>
              <textarea
                className="input-field"
                rows={5}
                placeholder={selectedTemplate.promptPlaceholder}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Tone of Voice
                </label>
                <select
                  className="input-field"
                  value={tone}
                  onChange={(e) => setTone(e.target.value as ContentTone)}
                >
                  <option value="Professional">Professional</option>
                  <option value="Conversational">Conversational</option>
                  <option value="Persuasive">Persuasive</option>
                  <option value="Bold & Direct">Bold & Direct</option>
                  <option value="Creative">Creative</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Target Length
                </label>
                <select
                  className="input-field"
                  value={length}
                  onChange={(e) => setLength(e.target.value as ContentLength)}
                >
                  <option value="Short (~150 words)">Short (~150 words)</option>
                  <option value="Medium (~500 words)">Medium (~500 words)</option>
                  <option value="Detailed (~1,000 words)">Detailed (~1,000 words)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isGeneratingContent}
              style={{ marginTop: '8px' }}
            >
              {isGeneratingContent ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Generating Structured Copy...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Generate Content &rarr;</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Canvas */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="panel-header">
            <div className="panel-title">
              <FileText size={18} color="#059669" />
              Generated Output Canvas
            </div>
            {generatedContent && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-outline btn-sm" onClick={handleCopy}>
                  {copied ? <Check size={13} color="#059669" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button className="btn btn-secondary btn-sm" onClick={handleSave}>
                  <Bookmark size={13} />
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>

          {generatedContent ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#5F6B85', borderBottom: '1px solid #E8ECF5', paddingBottom: '8px' }}>
                <span>Format: <strong>{generatedContent.format}</strong></span>
                <span>Word Count: <strong>{generatedContent.wordCount} words</strong></span>
              </div>

              <div
                style={{
                  flex: 1,
                  padding: '16px',
                  borderRadius: '10px',
                  background: '#FAFBFD',
                  border: '1px solid #E8ECF5',
                  overflowY: 'auto',
                  maxHeight: '380px',
                  whiteSpace: 'pre-wrap',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: '#272F3E'
                }}
              >
                {generatedContent.content}
              </div>
            </div>
          ) : (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: '#5F6B85',
                padding: '48px 24px'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#EFEBFC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}
              >
                <Sparkles size={22} color="#6E56CF" />
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                Ready to Draft
              </h4>
              <p style={{ fontSize: '13px', maxWidth: '320px' }}>
                Select a builder above, enter your topic or target context, and click Generate Content.
              </p>
            </div>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  );
};
