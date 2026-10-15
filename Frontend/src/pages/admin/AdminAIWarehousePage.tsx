import React, { useState } from 'react';
import {
  Package,
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  Filter,
  Download,
  ThumbsUp,
  Tag,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WarehouseAsset } from '../../types';
import '../../styles/dashboard.css';

export const AdminAIWarehousePage: React.FC = () => {
  const { warehouseAssets, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedAsset, setSelectedAsset] = useState<WarehouseAsset | null>(null);

  const filtered = warehouseAssets.filter((a) => {
    const matchesCat = categoryFilter === 'ALL' || a.category === categoryFilter;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleModerateAction = (title: string, action: 'approve' | 'flag') => {
    showToast(
      action === 'approve'
        ? `Asset "${title}" approved for global discovery`
        : `Asset "${title}" flagged for copyright/safety review`,
      action === 'approve' ? 'success' : 'warning'
    );
  };

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Package size={26} color="#A78BFA" />
            AI Warehouse Moderation
          </h1>
          <p className="dashboard-subtitle">
            Community and verified marketplace assets directory, safety categorization, copyright licensing reviews, and catalog status.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-primary">
            {warehouseAssets.length} Active Public Assets
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="glass-panel" style={{ padding: 'var(--space-4)' }}>
        <div className="filter-toolbar" style={{ margin: 0 }}>
          <div className="search-box-wrap">
            <Search size={16} />
            <input
              type="text"
              className="input-field"
              placeholder="Search assets by title, creator or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-pills-row">
            {['ALL', 'Templates', 'Prompts', 'Scripts', 'Copy Packs', 'Workflows'].map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${categoryFilter === cat ? 'active' : ''}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Asset Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Asset Title & Details</th>
                <th>Category</th>
                <th>Creator & Verification</th>
                <th>License Tier</th>
                <th>Engagement</th>
                <th style={{ textAlign: 'right' }}>Moderation Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((asset) => (
                <tr key={asset.id}>
                  <td>
                    <div>
                      <div style={{ fontWeight: '700', color: '#F8FAFC' }}>{asset.title}</div>
                      <div style={{ fontSize: '11px', color: '#64748B', maxWidth: '320px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {asset.description}
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                      {asset.category}
                    </span>
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#E2E8F0', fontWeight: '600' }}>{asset.creatorName}</span>
                      {asset.isVerifiedCreator && (
                        <span title="Verified Creator" style={{ display: 'inline-flex', alignItems: 'center' }}>
                          <ShieldCheck size={14} color="#34D399" />
                        </span>
                      )}
                    </div>
                  </td>

                  <td>
                    <span className="status-chip info" style={{ fontSize: '10px' }}>
                      {asset.licensing}
                    </span>
                  </td>

                  <td>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                      <strong>{asset.downloads.toLocaleString()}</strong> dl • <strong>{asset.likes}</strong> likes
                    </div>
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => setSelectedAsset(asset)}
                        title="Inspect full asset"
                        style={{ padding: '4px 8px' }}
                      >
                        <Eye size={12} />
                      </button>

                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleModerateAction(asset.title, 'approve')}
                        style={{ padding: '4px 8px', color: '#34D399' }}
                        title="Approve Asset"
                      >
                        <CheckCircle2 size={12} />
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleModerateAction(asset.title, 'flag')}
                        style={{ padding: '4px 8px', color: '#F87171', background: 'rgba(239, 68, 68, 0.15)' }}
                        title="Flag for Review"
                      >
                        <AlertTriangle size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
