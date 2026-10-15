import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Package,
  Search,
  Filter,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Download,
  ThumbsUp,
  Tag,
  ShieldCheck,
  X,
  ExternalLink,
  Layers,
  ArrowRight,
  UploadCloud
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WarehouseAsset } from '../../types';
import '../../styles/dashboard.css';

export const AIWarehousePage: React.FC = () => {
  const { warehouseAssets, toggleAssetSaved, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'Discover' | 'Categories' | 'Featured' | 'My Saved'>('Discover');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<WarehouseAsset | null>(null);

  const filteredAssets = warehouseAssets.filter((a) => {
    const matchesTab =
      activeTab === 'Discover'
        ? true
        : activeTab === 'Featured'
        ? a.rating >= 4.9
        : activeTab === 'My Saved'
        ? a.isSaved
        : true;

    const matchesCategory = selectedCategory === 'ALL' || a.category === selectedCategory;

    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesCategory && matchesSearch;
  });

  const handleDownload = (asset: WarehouseAsset) => {
    // Verified export without fake commerce
    const blob = new Blob([`# ${asset.title}\n\nCreator: ${asset.creatorName}\nLicense: ${asset.licensing}\nCategory: ${asset.category}\n\n${asset.description}`], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${asset.title.toLowerCase().replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded asset "${asset.title}" under ${asset.licensing} entitlement`, 'success');
  };

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Package size={26} color="#A78BFA" />
            AI Warehouse
          </h1>
          <p className="dashboard-subtitle">
            Discover, bookmark, and download verified AI blueprints, production prompt chains, video scripts, and marketing templates from trusted creators.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <NavLink to="/creator" className="btn btn-primary btn-sm">
            <UploadCloud size={14} />
            <span>Creator Studio Upload</span>
          </NavLink>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="glass-panel" style={{ padding: '12px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(['Discover', 'Categories', 'Featured', 'My Saved'] as const).map((tab) => (
              <button
                key={tab}
                className={`filter-pill ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'My Saved' ? `My Saved Library (${warehouseAssets.filter((a) => a.isSaved).length})` : tab}
              </button>
            ))}
          </div>

          <div className="search-box-wrap" style={{ maxWidth: '340px' }}>
            <Search size={15} />
            <input
              type="text"
              className="input-field"
              placeholder="Search prompts, templates, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ height: '36px', fontSize: '12px' }}
            />
          </div>
        </div>

        {activeTab === 'Categories' && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {['ALL', 'Templates', 'Prompts', 'Scripts', 'Copy Packs', 'Workflows'].map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
                style={{ fontSize: '11px', padding: '4px 10px' }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Warehouse Asset Grid */}
      <div className="cards-grid-3">
        {filteredAssets.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '64px', color: '#94A3B8' }}>
            No assets found in this view. Try adjusting your search query or category filter.
          </div>
        ) : (
          filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="glass-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
                    {asset.category}
                  </span>
                  <span className="status-chip info" style={{ fontSize: '10px', padding: '2px 8px' }}>
                    {asset.licensing}
                  </span>
                </div>

                <h3
                  style={{ fontSize: '16px', fontWeight: '800', color: '#F8FAFC', marginBottom: '8px', cursor: 'pointer' }}
                  onClick={() => setSelectedAsset(asset)}
                >
                  {asset.title}
                </h3>
                <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.4', marginBottom: '14px' }}>
                  {asset.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {asset.tags.map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        color: '#CBD5E1'
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Creator & Actions Footer */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#E2E8F0', fontWeight: '600' }}>{asset.creatorName}</span>
                  {asset.isVerifiedCreator && (
                    <span title="Verified Creator" style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <ShieldCheck size={13} color="#34D399" />
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    className="btn-ghost"
                    onClick={() => toggleAssetSaved(asset.id)}
                    title={asset.isSaved ? 'Remove from Saved' : 'Save to Library'}
                    style={{ padding: '6px', color: asset.isSaved ? '#A78BFA' : '#94A3B8' }}
                  >
                    {asset.isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  </button>

                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setSelectedAsset(asset)}
                    style={{ padding: '4px 8px', fontSize: '11px' }}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <div className="modal-overlay" onClick={() => setSelectedAsset(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-primary">{selectedAsset.category}</span>
                <span className="badge badge-neutral">{selectedAsset.licensing}</span>
              </div>
              <button className="btn-ghost" onClick={() => setSelectedAsset(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#F8FAFC', marginBottom: '6px' }}>
                  {selectedAsset.title}
                </h2>
                <div style={{ fontSize: '12px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>Created by <strong>{selectedAsset.creatorName}</strong></span>
                  <span>•</span>
                  <span>Rating: ⭐ {selectedAsset.rating}</span>
                  <span>•</span>
                  <span>{selectedAsset.downloads.toLocaleString()} Downloads</span>
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', fontSize: '13px', lineHeight: '1.6', color: '#E2E8F0' }}>
                {selectedAsset.description}
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#A78BFA', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Licensing & Entitlement Rights
                </div>
                <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.4' }}>
                  This asset is provided under <strong>{selectedAsset.licensing}</strong> terms. You have full rights to inspect, adapt, and run this blueprint within your personal and commercial Zunme AI workspaces.
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => toggleAssetSaved(selectedAsset.id)}
                >
                  {selectedAsset.isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                  <span>{selectedAsset.isSaved ? 'In My Library' : 'Save Asset'}</span>
                </button>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleDownload(selectedAsset)}
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
