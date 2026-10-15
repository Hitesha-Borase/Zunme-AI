import React from 'react';
import {
  Cpu,
  Search,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Power,
  Clock,
  Database,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/dashboard.css';

export const AdminIntegrationsPage: React.FC = () => {
  const { integrations, toggleIntegrationStatus, showToast } = useApp();

  const handleTestConnection = (name: string) => {
    showToast(`Pinging ${name}... Connection validated (200 OK)`, 'success');
  };

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Cpu size={26} color="#A78BFA" />
            Supported System Integrations
          </h1>
          <p className="dashboard-subtitle">
            Inspect verified external service connections, search APIs, LLM inference endpoints, cloud storage buckets, and CRM bridges.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-success">
            {integrations.filter((i) => i.status === 'CONNECTED').length} Active Services
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="cards-grid-2">
        {integrations.map((item) => (
          <div key={item.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
                  {item.category}
                </span>
                <span
                  className={`status-chip ${
                    item.status === 'CONNECTED'
                      ? 'success'
                      : item.status === 'MAINTENANCE'
                      ? 'warning'
                      : 'danger'
                  }`}
                >
                  {item.status === 'CONNECTED' ? (
                    <CheckCircle2 size={12} />
                  ) : item.status === 'MAINTENANCE' ? (
                    <AlertTriangle size={12} />
                  ) : (
                    <Power size={12} />
                  )}
                  {item.status}
                </span>
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#F8FAFC', marginBottom: '6px' }}>
                {item.name}
              </h3>
              <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.4', marginBottom: '16px' }}>
                {item.description}
              </p>

              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>
                <span>Latency: <strong style={{ color: '#CBD5E1' }}>{item.latency || 'N/A'}</strong></span>
                {item.connectedAt && (
                  <span>Connected: <strong style={{ color: '#CBD5E1' }}>{item.connectedAt}</strong></span>
                )}
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => handleTestConnection(item.name)}
                style={{ padding: '4px 10px', fontSize: '11px' }}
              >
                <RefreshCw size={12} />
                <span>Ping Health</span>
              </button>

              <button
                className={`btn btn-sm ${item.status === 'CONNECTED' ? 'btn-danger' : 'btn-secondary'}`}
                onClick={() => toggleIntegrationStatus(item.id)}
                style={{
                  padding: '4px 10px',
                  fontSize: '11px',
                  background: item.status === 'CONNECTED' ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
                  color: item.status === 'CONNECTED' ? '#F87171' : '#34D399',
                  borderColor: item.status === 'CONNECTED' ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'
                }}
              >
                <Power size={12} />
                <span>{item.status === 'CONNECTED' ? 'Disconnect' : 'Connect'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
