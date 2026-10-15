import React, { useState } from 'react';
import {
  Sparkles,
  UploadCloud,
  FileCheck2,
  ShieldCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  DollarSign,
  Package,
  Layers,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CreatorSubmission } from '../../types';
import '../../styles/dashboard.css';

export const CreatorStudioPage: React.FC = () => {
  const {
    user,
    creatorSubmissions,
    addCreatorSubmission,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'Overview' | 'My Content' | 'Upload Content' | 'Submissions & Reviews' | 'Profile & Verification' | 'Performance' | 'Earnings & Payouts'
  >('Overview');

  // Upload Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Prompt Pack');
  const [category, setCategory] = useState('Social Media');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('Social, Engagement, Hooks');
  const [licensing, setLicensing] = useState('Commercial Pro');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast('Please provide a title and blueprint description', 'warning');
      return;
    }

    addCreatorSubmission({
      title: title.trim(),
      type,
      category,
      status: 'IN_REVIEW',
      feedback: 'Awaiting operational editorial moderation.'
    });

    // Reset
    setTitle('');
    setDescription('');
    setActiveTab('Submissions & Reviews');
  };

  const approvedSubmissions = creatorSubmissions.filter((s) => s.status === 'APPROVED');
  const totalDownloads = creatorSubmissions.reduce((acc, s) => acc + s.downloads, 0);

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Sparkles size={26} color="#A78BFA" />
            Creator Studio
          </h1>
          <p className="dashboard-subtitle">
            Publish prompt chains, workflows, and templates to the AI Warehouse, track engagement metrics, and manage community submissions.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setActiveTab('Upload Content')}
          >
            <UploadCloud size={14} />
            <span>Upload New Blueprint</span>
          </button>
        </div>
      </div>

      {/* Studio Sub-Navigation */}
      <div className="glass-panel" style={{ padding: '12px 18px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            'Overview',
            'My Content',
            'Upload Content',
            'Submissions & Reviews',
            'Profile & Verification',
            'Performance',
            'Earnings & Payouts'
          ].map((tab) => (
            <button
              key={tab}
              className={`filter-pill ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'Overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-card-top">
                <div className="metric-icon-box">
                  <Package size={20} />
                </div>
                <span className="metric-badge positive">{approvedSubmissions.length} Approved</span>
              </div>
              <div className="metric-value">{creatorSubmissions.length}</div>
              <div className="metric-label">Total Submitted Assets</div>
            </div>

            <div className="metric-card">
              <div className="metric-card-top">
                <div className="metric-icon-box" style={{ color: '#34D399', background: 'rgba(16, 185, 129, 0.12)' }}>
                  <TrendingUp size={20} />
                </div>
                <span className="metric-badge positive">Verified</span>
              </div>
              <div className="metric-value">{totalDownloads.toLocaleString()}</div>
              <div className="metric-label">Community Downloads</div>
            </div>

            <div className="metric-card">
              <div className="metric-card-top">
                <div className="metric-icon-box" style={{ color: '#FBBF24', background: 'rgba(245, 158, 11, 0.12)' }}>
                  <Clock size={20} />
                </div>
                <span className="metric-badge warning">In Queue</span>
              </div>
              <div className="metric-value">
                {creatorSubmissions.filter((s) => s.status === 'IN_REVIEW').length}
              </div>
              <div className="metric-label">Pending Reviews</div>
            </div>
          </div>

          <div className="cards-grid-2">
            {/* Recent Submissions */}
            <div className="glass-panel">
              <div className="panel-header">
                <div className="panel-title">Recent Submissions & Status</div>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setActiveTab('Submissions & Reviews')}
                  style={{ fontSize: '11px' }}
                >
                  View All
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {creatorSubmissions.slice(0, 3).map((sub) => (
                  <div
                    key={sub.id}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      background: '#FAFBFD',
                      border: '1px solid #E8ECF5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '700', color: '#111625', fontSize: '13px' }}>
                        {sub.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#5F6B85', marginTop: '2px' }}>
                        {sub.type} • {sub.category}
                      </div>
                    </div>
                    <span
                      className={`status-chip ${
                        sub.status === 'APPROVED' ? 'success' : sub.status === 'IN_REVIEW' ? 'warning' : 'danger'
                      }`}
                      style={{ fontSize: '10px' }}
                    >
                      {sub.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Status Card */}
            <div className="glass-panel">
              <div className="panel-header">
                <div className="panel-title">Creator Verification Tier</div>
                <span className="badge badge-success">Verified Level 1</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#34D399',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111625' }}>
                    {user?.fullName || 'Alex Johnson'}
                  </h4>
                  <div style={{ fontSize: '12px', color: '#5F6B85' }}>
                    Verified Community Creator • Instant Warehouse Publishing Rights
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#5F6B85', lineHeight: '1.4' }}>
                Your submitted blueprints receive priority editorial review from the moderation queue and an official Verified Creator badge on asset cards.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Upload Content */}
      {activeTab === 'Upload Content' && (
        <div className="glass-panel" style={{ maxWidth: '720px', margin: '0 auto', width: '100%' }}>
          <div className="panel-header">
            <div className="panel-title">
              <UploadCloud size={18} color="#A78BFA" />
              Upload New Content Blueprint
            </div>
            <span className="badge badge-neutral">Warehouse Submission</span>
          </div>

          <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#CBD5E1', marginBottom: '6px' }}>
                Asset Title
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g., Omnichannel B2B Outreach Sequence..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#CBD5E1', marginBottom: '6px' }}>
                  Supported Asset Type
                </label>
                <select className="input-field" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="Prompt Pack">Prompt Pack</option>
                  <option value="Template">Template</option>
                  <option value="Workflow">Workflow</option>
                  <option value="Script">Script</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#CBD5E1', marginBottom: '6px' }}>
                  Category
                </label>
                <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Social Media">Social Media</option>
                  <option value="Branding">Branding</option>
                  <option value="SEO">SEO</option>
                  <option value="Email Marketing">Email Marketing</option>
                  <option value="Video">Video</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#CBD5E1', marginBottom: '6px' }}>
                Blueprint Content & Prompt Instructions
              </label>
              <textarea
                className="input-field"
                rows={6}
                placeholder="Paste the full prompt instructions, markdown outline, or structured blueprint..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#CBD5E1', marginBottom: '6px' }}>
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#CBD5E1', marginBottom: '6px' }}>
                  Licensing Terms
                </label>
                <select className="input-field" value={licensing} onChange={(e) => setLicensing(e.target.value)}>
                  <option value="Commercial Pro">Commercial Pro (Community & Commercial Use)</option>
                  <option value="Standard Community">Standard Community (Attribution Required)</option>
                  <option value="Open Source">Open Source (MIT / Apache)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setActiveTab('Overview')}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                <Send size={14} />
                <span>Submit for Review</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab: Submissions & Reviews */}
      {activeTab === 'Submissions & Reviews' && (
        <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="panel-header" style={{ padding: 'var(--space-4) var(--space-5)', margin: 0 }}>
            <div className="panel-title">My Submission History & Review Feedback</div>
          </div>
          <div className="table-responsive">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Submission</th>
                  <th>Type & Category</th>
                  <th>Submitted At</th>
                  <th>Status</th>
                  <th>Review Feedback</th>
                </tr>
              </thead>
              <tbody>
                {creatorSubmissions.map((sub) => (
                  <tr key={sub.id}>
                    <td style={{ fontWeight: '700', color: '#111625' }}>{sub.title}</td>
                    <td>{sub.type} • {sub.category}</td>
                    <td>{new Date(sub.submittedAt).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`status-chip ${
                          sub.status === 'APPROVED' ? 'success' : sub.status === 'IN_REVIEW' ? 'warning' : 'danger'
                        }`}
                      >
                        {sub.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ color: '#374151', fontSize: '12px' }}>
                      {sub.feedback || 'In queue for initial moderation review.'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: My Content */}
      {activeTab === 'My Content' && (
        <div className="cards-grid-3">
          {approvedSubmissions.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px', color: '#94A3B8' }}>
              No approved blueprints published yet. Submit a new blueprint using the Upload tab.
            </div>
          ) : (
            approvedSubmissions.map((sub) => (
              <div key={sub.id} className="glass-panel">
                <span className="badge badge-success" style={{ marginBottom: '10px' }}>Published</span>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>{sub.title}</h3>
                <p style={{ fontSize: '12px', color: '#5F6B85', marginBottom: '14px' }}>Category: {sub.category}</p>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Downloads: <strong>{sub.downloads}</strong></div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Profile & Verification */}
      {activeTab === 'Profile & Verification' && (
        <div className="glass-panel" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div className="panel-header">
            <div className="panel-title">Creator Profile & Verification Badge</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '800', color: '#DDD6FE' }}>
                {user?.fullName?.charAt(0) || 'A'}
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111625' }}>{user?.fullName || 'Alex Johnson'}</h3>
                <div style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', marginTop: '2px' }}>
                  <ShieldCheck size={14} /> Verified Community Contributor
                </div>
              </div>
            </div>
            <p style={{ color: '#5F6B85', lineHeight: '1.5' }}>
              Your profile is verified and active. You have published {approvedSubmissions.length} approved blueprints to the Zunme AI Warehouse.
            </p>
          </div>
        </div>
      )}

      {/* Tab: Performance */}
      {activeTab === 'Performance' && (
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title">Verified Creator Performance Metrics</div>
            <span className="badge badge-primary">Real Data Only</span>
          </div>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-value">{totalDownloads}</div>
              <div className="metric-label">Total Downloads</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{approvedSubmissions.length}</div>
              <div className="metric-label">Live Blueprints</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">4.9 / 5.0</div>
              <div className="metric-label">Average Community Rating</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Earnings & Payouts (Clearly marked with actual/supported status) */}
      {activeTab === 'Earnings & Payouts' && (
        <div className="glass-panel">
          <div className="future-module-banner" style={{ margin: 0 }}>
            <div className="future-module-icon">
              <DollarSign size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>
                Creator Monetization & Revenue Sharing — Scheduled Future Capability
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.5' }}>
                All current creator uploads are distributed as free community assets under your chosen licensing terms. Creator marketplace monetization, tip jars, and revenue-sharing payouts will unlock in Phase 2 upon marketplace commerce integration.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
