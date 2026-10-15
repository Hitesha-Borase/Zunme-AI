import React, { useState } from 'react';
import {
  PenTool,
  Sparkles,
  Copy,
  Bookmark,
  Check,
  FileText,
  Layers,
  Send,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ContentCategory, ContentFormat, ContentTone, ContentLength } from '../types';
import './StudioPage.css';

const TONES: ContentTone[] = [
  'Professional',
  'Conversational',
  'Persuasive',
  'Bold & Direct',
  'Creative'
];

const LENGTHS: ContentLength[] = [
  'Short (~150 words)',
  'Medium (~500 words)',
  'Detailed (~1,000 words)'
];

export const StudioPage: React.FC = () => {
  const {
    generatedContent,
    isGeneratingContent,
    generateContent,
    saveToLibrary,
    showToast
  } = useApp();

  const [category, setCategory] = useState<ContentCategory>('MARKETING');
  const [format, setFormat] = useState<ContentFormat>('EMAIL_NEWSLETTER');
  const [instructions, setInstructions] = useState(
    'Announcing our new eco-friendly water bottle brand launch for early creators with a 20% discount hook.'
  );
  const [tone, setTone] = useState<ContentTone>('Persuasive');
  const [length, setLength] = useState<ContentLength>('Medium (~500 words)');
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instructions.trim() || isGeneratingContent) return;
    generateContent({
      category,
      format,
      instructions: instructions.trim(),
      tone,
      length
    });
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent.content);
    setCopied(true);
    showToast('Generated content copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToLibrary = () => {
    if (!generatedContent) return;
    saveToLibrary({
      title: generatedContent.title,
      contentType: generatedContent.category,
      previewText: generatedContent.content.slice(0, 140) + '...',
      content: generatedContent.content,
      tags: [generatedContent.category, generatedContent.format.replace('_', ' ')]
    });
  };

  return (
    <div className="studio-page">
      <div className="studio-header-area">
        <h1 className="studio-title">Content Studio</h1>
        <p className="studio-desc">
          Generate structured, high-converting text content for articles, newsletters, ad campaigns, and social media.
        </p>
      </div>

      <div className="studio-layout-grid">
        {/* Form Card */}
        <div className="studio-form-card">
          {/* Category Tabs */}
          <div className="category-toggle-tabs">
            <button
              type="button"
              className={`category-tab-btn ${category === 'TEXT' ? 'active' : ''}`}
              onClick={() => {
                setCategory('TEXT');
                setFormat('BLOG_OUTLINE');
              }}
            >
              Text & Articles
            </button>
            <button
              type="button"
              className={`category-tab-btn ${category === 'MARKETING' ? 'active' : ''}`}
              onClick={() => {
                setCategory('MARKETING');
                setFormat('EMAIL_NEWSLETTER');
              }}
            >
              Marketing & Social Copy
            </button>
          </div>

          <form onSubmit={handleGenerate}>
            {/* Format Selection */}
            <div className="form-group">
              <label className="form-label" htmlFor="format-select">
                Content Format
              </label>
              <select
                id="format-select"
                className="input-field"
                value={format}
                onChange={(e) => setFormat(e.target.value as ContentFormat)}
                disabled={isGeneratingContent}
              >
                {category === 'TEXT' ? (
                  <>
                    <option value="BLOG_OUTLINE">Blog Post Outline</option>
                    <option value="ARTICLE_SECTION">Deep-Dive Article Section</option>
                    <option value="VIDEO_SCRIPT">Video Script Outline</option>
                  </>
                ) : (
                  <>
                    <option value="EMAIL_NEWSLETTER">Email Newsletter Sequence</option>
                    <option value="SOCIAL_CAPTION">Viral Social Media Post (X / LinkedIn)</option>
                    <option value="PRODUCT_AD">Product Ad & Sales Copy</option>
                  </>
                )}
              </select>
            </div>

            {/* Topic & Instructions */}
            <div className="form-group">
              <label className="form-label" htmlFor="instructions-text">
                Topic & Specific Instructions
              </label>
              <textarea
                id="instructions-text"
                className="input-field"
                rows={3}
                placeholder="Describe your subject, key selling points, target audience, and any required call to action..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                disabled={isGeneratingContent}
                required
              />
            </div>

            {/* Tone & Length Row */}
            <div className="form-grid-row">
              <div className="form-group">
                <label className="form-label">Tone of Voice</label>
                <div className="pill-selector-group">
                  {TONES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`pill-option-btn ${tone === t ? 'selected' : ''}`}
                      onClick={() => setTone(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Target Length</label>
                <div className="pill-selector-group">
                  {LENGTHS.map((l) => (
                    <button
                      key={l}
                      type="button"
                      className={`pill-option-btn ${length === l ? 'selected' : ''}`}
                      onClick={() => setLength(l)}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={!instructions.trim() || isGeneratingContent}
              style={{ padding: '12px', fontSize: '14.5px' }}
            >
              {isGeneratingContent ? (
                <span>Drafting Content...</span>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Generate Content</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Preview Card */}
        {generatedContent && (
          <div className="studio-output-card">
            <div className="output-header-bar">
              <div className="output-title-area">
                <FileText size={18} color="var(--color-primary)" />
                <h3 style={{ fontSize: '16px', fontWeight: '700' }}>
                  {generatedContent.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="badge badge-primary">{generatedContent.tone}</span>
                <span className="badge badge-neutral">~{generatedContent.wordCount} words</span>
              </div>
            </div>

            <div className="output-text-content">
              {generatedContent.content}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <button className="btn btn-outline btn-sm" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check size={14} color="var(--color-success)" />
                      <span style={{ color: 'var(--color-success)' }}>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy to Clipboard</span>
                    </>
                  )}
                </button>

                <button className="btn btn-primary btn-sm" onClick={handleSaveToLibrary}>
                  <Bookmark size={14} />
                  <span>Save to Library</span>
                </button>
              </div>

              <button
                className="btn btn-ghost btn-sm"
                onClick={handleGenerate}
                disabled={isGeneratingContent}
              >
                <RefreshCw size={14} />
                <span>Regenerate Variant</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
