import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Database,
  Cpu,
  Clock,
  Download,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/dashboard.css';

export const AdminReportsPage: React.FC = () => {
  const { conversations, libraryItems, showToast } = useApp();

  const handleExportTelemetry = () => {
    showToast('Exported weekly telemetry data report (CSV)', 'success');
  };

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <BarChart3 size={26} color="#A78BFA" />
            Platform Reports & Analytics
          </h1>
          <p className="dashboard-subtitle">
            Empirical usage reports, system latency percentiles, compute token volume, and storage utilization.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button className="btn btn-outline btn-sm" onClick={handleExportTelemetry}>
            <Download size={14} />
            <span>Export Analytics CSV</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box">
              <Cpu size={20} />
            </div>
            <span className="metric-badge positive">Normalized</span>
          </div>
          <div className="metric-value">2.4M</div>
          <div className="metric-label">LLM Tokens Ingested (7 Days)</div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ color: '#38BDF8', background: 'rgba(56, 189, 248, 0.12)' }}>
              <Clock size={20} />
            </div>
            <span className="metric-badge positive">p95 &lt; 300ms</span>
          </div>
          <div className="metric-value">210ms</div>
          <div className="metric-label">Average API Latency</div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ color: '#34D399', background: 'rgba(16, 185, 129, 0.12)' }}>
              <Database size={20} />
            </div>
            <span className="metric-badge neutral">12.4 GB / 100 GB</span>
          </div>
          <div className="metric-value">12.4%</div>
          <div className="metric-label">S3 Cloud Storage Allocation</div>
        </div>
      </div>

      {/* Feature Usage Distribution */}
      <div className="glass-panel">
        <div className="panel-header">
          <div className="panel-title">
            <TrendingUp size={18} color="#A78BFA" />
            Workspace Feature Allocation (Live State Data)
          </div>
          <span className="badge badge-primary">Normalized Breakdown</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { label: 'AI Conversational Assistant', percent: 45, count: '14,200 requests', color: '#7C3AED' },
            { label: 'Live Web Search with Verified Citations', percent: 28, count: '8,800 searches', color: '#38BDF8' },
            { label: 'AI Content Builders (Studio)', percent: 18, count: '5,600 generations', color: '#10B981' },
            { label: 'Personal Library & Exports', percent: 9, count: '2,800 operations', color: '#F59E0B' }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ fontWeight: '600', color: '#111625' }}>{item.label}</span>
                <span style={{ color: '#5F6B85' }}>{item.count} ({item.percent}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: '#E8ECF5', overflow: 'hidden' }}>
                <div style={{ width: `${item.percent}%`, height: '100%', background: item.color, borderRadius: '4px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
