import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ExternalLink,
  Copy,
  Bookmark,
  Check,
  Globe,
  Clock,
  ShieldCheck,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import './SearchPage.css';

export const SearchPage: React.FC = () => {
  const {
    searchResult,
    isSearching,
    executeSearch,
    clearSearch,
    saveToLibrary,
    showToast
  } = useApp();

  const [queryInput, setQueryInput] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim() || isSearching) return;
    executeSearch(queryInput.trim());
  };

  const handleSelectChip = (chip: string) => {
    setQueryInput(chip);
    executeSearch(chip);
  };

  const handleCopySummary = () => {
    if (!searchResult) return;
    navigator.clipboard.writeText(searchResult.summary);
    setCopiedSummary(true);
    showToast('Research summary copied to clipboard', 'info');
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleSaveToLibrary = () => {
    if (!searchResult) return;
    saveToLibrary({
      title: `Research: ${searchResult.query}`,
      contentType: 'RESEARCH',
      previewText: searchResult.summary.slice(0, 150) + '...',
      content: `### Web Research Brief: ${searchResult.query}\n\n**Synthesized Findings:**\n${searchResult.summary}\n\n**Sources:**\n` +
        searchResult.sources.map((s, i) => `${i + 1}. [${s.title}](${s.url}) — ${s.domain}`).join('\n'),
      sourceMetadata: searchResult.sources,
      tags: ['Web Search', 'Research']
    });
  };

  return (
    <div className="search-page">
      <div className="search-header-area">
        <h1 className="search-page-title">Live Web Search & Research</h1>
        <p className="search-page-desc">
          Query live web indices for current 2026 data. Receive an AI synthesized brief with verified, clickable source links.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearchSubmit} className="search-form-box">
        <Search size={20} color="var(--color-primary)" />
        <input
          type="text"
          className="search-input-field"
          placeholder="Ask a research question or search latest news..."
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          disabled={isSearching}
        />

        {queryInput && (
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setQueryInput('');
              clearSearch();
            }}
            style={{ padding: '4px' }}
            aria-label="Clear query"
          >
            <X size={16} />
          </button>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!queryInput.trim() || isSearching}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Suggested Query Chips */}
      <div className="query-chips-row">
        <span className="chips-label">Try:</span>
        <button
          type="button"
          className="query-chip"
          onClick={() => handleSelectChip('Solid state battery commercialization 2026')}
        >
          🔋 Solid State Battery 2026
        </button>
        <button
          type="button"
          className="query-chip"
          onClick={() => handleSelectChip('AI copyright regulation and enterprise standards')}
        >
          ⚖️ AI Copyright Standards
        </button>
        <button
          type="button"
          className="query-chip"
          onClick={() => handleSelectChip('Creator economy revenue sharing models')}
        >
          📈 Creator Monetization Trends
        </button>
        <button
          type="button"
          className="query-chip"
          onClick={() => handleSelectChip('Next-generation silicon photonics in computing')}
        >
          🔬 Silicon Photonics
        </button>
      </div>

      {/* Searching Progress State */}
      {isSearching && (
        <div className="search-loading-card">
          <div className="search-spinner"></div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>
            Retrieving Live Web Sources...
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Parsing verified web domains and formulating an objective executive brief.
          </p>
        </div>
      )}

      {/* Results View */}
      {searchResult && !isSearching && (
        <div className="research-results-container">
          {/* Summary Card */}
          <div className="summary-card">
            <div className="summary-top">
              <div className="summary-title">
                <Sparkles size={18} color="var(--color-primary)" />
                <span>AI Research Synthesis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-success">Grounding Verified</span>
                <span className="badge badge-neutral" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={11} />
                  <span>{searchResult.timestamp}</span>
                </span>
              </div>
            </div>

            <p className="summary-body">{searchResult.summary}</p>

            <div className="flex items-center gap-2">
              <button className="btn btn-outline btn-sm" onClick={handleCopySummary}>
                {copiedSummary ? (
                  <>
                    <Check size={14} color="var(--color-success)" />
                    <span style={{ color: 'var(--color-success)' }}>Copied Summary</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Summary</span>
                  </>
                )}
              </button>

              <button className="btn btn-primary btn-sm" onClick={handleSaveToLibrary}>
                <Bookmark size={14} />
                <span>Save Research to Library</span>
              </button>
            </div>
          </div>

          {/* Sources Section */}
          <div>
            <div className="sources-header">
              <div className="sources-title flex items-center gap-2">
                <ShieldCheck size={16} color="var(--color-primary)" />
                <span>Verified Sources ({searchResult.sources.length})</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
                Real external references
              </span>
            </div>

            <div className="sources-grid">
              {searchResult.sources.map((source) => (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-card"
                >
                  <div className="source-meta-row">
                    <span className="source-domain flex items-center gap-1">
                      <Globe size={12} />
                      <span>{source.domain}</span>
                    </span>
                    {source.publishedDate && (
                      <span className="source-date">{source.publishedDate}</span>
                    )}
                  </div>

                  <h4 className="source-headline">
                    <span>{source.title}</span>
                    <ExternalLink size={13} style={{ opacity: 0.6 }} />
                  </h4>

                  <p className="source-snippet">"{source.snippet}"</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State when no search executed yet */}
      {!searchResult && !isSearching && (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <Search size={26} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
            Live Grounded Web Intelligence
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', maxWidth: '480px', margin: '0 auto' }}>
            Zunme AI queries current internet data and grounds every summary with authentic URLs so you can verify the facts yourself.
          </p>
        </div>
      )}
    </div>
  );
};
