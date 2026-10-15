import React, { useState } from 'react';
import {
  Megaphone,
  AlertTriangle,
  Clock,
  Layers,
  CheckCircle2,
  DollarSign,
  BarChart,
  Target,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import '../../styles/dashboard.css';

export const ZunmeAdsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'Overview' | 'Campaigns' | 'Create Campaign' | 'Ad Placements' | 'Keyword Bidding' | 'Performance Reports' | 'Billing & Budget'
  >('Overview');

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Megaphone size={26} color="#A78BFA" />
            Zunme Ads Platform
          </h1>
          <p className="dashboard-subtitle">
            Targeted native advertising and sponsored discovery across the Zunme AI ecosystem.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-warning" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={13} />
            <span>Future Ecosystem Module</span>
          </div>
        </div>
      </div>

      {/* Prominent Architectural Dependency Banner */}
      <div className="future-module-banner">
        <div className="future-module-icon">
          <AlertTriangle size={24} color="#FBBF24" />
        </div>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>
            Ad Platform Infrastructure Dependency Status
          </h3>
          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.5' }}>
            In accordance with architectural guidelines, simulated or fake transaction data is strictly prohibited. The Zunme Ads subsystem is scheduled for Phase 5 of the ecosystem roadmap. Below is the approved interface architecture with active dependency indicators.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="glass-panel" style={{ padding: '12px 18px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            'Overview',
            'Campaigns',
            'Create Campaign',
            'Ad Placements',
            'Keyword Bidding',
            'Performance Reports',
            'Billing & Budget'
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

      {/* Backend Infrastructure Readiness Checklist */}
      <div className="glass-panel">
        <div className="panel-header">
          <div className="panel-title">Subsystem Infrastructure Checklist</div>
          <span className="badge badge-neutral">Pre-Release Assessment</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { name: 'Ad Serving Engine & Impression Tracking Pipeline', status: 'Awaiting Backend API (Phase 5)', ready: false },
            { name: 'Real-time Auction & Keyword Bidding Engine', status: 'Awaiting Backend API (Phase 5)', ready: false },
            { name: 'PCI-Compliant Payment Gateway & Ad Credit Wallet', status: 'Awaiting Merchant Gateway Integration', ready: false },
            { name: 'Publisher Distribution & Native Placement Injection', status: 'Scheduled Future Milestone', ready: false },
            { name: 'Approved Dashboard UI & Navigation Layout', status: 'Fully Implemented & Verified in Frontend', ready: true }
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                borderRadius: '10px',
                background: '#FAFBFD',
                border: '1px solid #E8ECF5',
                fontSize: '13px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {item.ready ? (
                  <CheckCircle2 size={16} color="#059669" />
                ) : (
                  <Clock size={16} color="#D97706" />
                )}
                <span style={{ fontWeight: '600', color: item.ready ? '#111625' : '#5F6B85' }}>
                  {item.name}
                </span>
              </div>
              <span className={`status-chip ${item.ready ? 'success' : 'warning'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Planned Wireframe Structure (Disabled Mode) */}
      <div className="glass-panel" style={{ opacity: 0.7, pointerEvents: 'none' }}>
        <div className="panel-header">
          <div className="panel-title">Planned Campaign Management Canvas (Disabled Preview)</div>
          <span className="badge badge-neutral">Read Only</span>
        </div>

        <div className="cards-grid-3">
          <div style={{ padding: '16px', borderRadius: '10px', background: '#FAFBFD', border: '1px solid #E8ECF5' }}>
            <div style={{ fontSize: '12px', color: '#5F6B85' }}>Impressions Delivered</div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#111625', marginTop: '4px' }}>--</div>
          </div>
          <div style={{ padding: '16px', borderRadius: '10px', background: '#FAFBFD', border: '1px solid #E8ECF5' }}>
            <div style={{ fontSize: '12px', color: '#5F6B85' }}>Average CTR</div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#111625', marginTop: '4px' }}>--</div>
          </div>
          <div style={{ padding: '16px', borderRadius: '10px', background: '#FAFBFD', border: '1px solid #E8ECF5' }}>
            <div style={{ fontSize: '12px', color: '#5F6B85' }}>Active Ad Spend</div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#111625', marginTop: '4px' }}>$0.00</div>
          </div>
        </div>
      </div>
    </div>
  );
};
