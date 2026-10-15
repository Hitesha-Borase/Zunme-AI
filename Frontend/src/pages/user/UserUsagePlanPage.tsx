import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  CreditCard,
  Zap,
  CheckCircle2,
  Database,
  Search,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/dashboard.css';

export const UserUsagePlanPage: React.FC = () => {
  const { conversations, libraryItems, pricingPlans, showToast } = useApp();

  const activePlan = pricingPlans.find((p) => p.isCurrent) || pricingPlans[1];

  const handleUpgrade = (planName: string) => {
    showToast(`Redirecting to verified billing portal for ${planName}...`, 'info');
  };

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <CreditCard size={26} color="#A78BFA" />
            Account Usage & Subscription Plan
          </h1>
          <p className="dashboard-subtitle">
            Monitor real-time compute tokens, citation searches executed, library cloud storage, and active plan entitlements.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} />
            <span>Active Tier: {activePlan.name}</span>
          </div>
        </div>
      </div>

      {/* Quota Progress Cards */}
      <div className="cards-grid-3">
        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#A78BFA', textTransform: 'uppercase' }}>
              Conversations
            </span>
            <MessageSquare size={16} color="#A78BFA" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#F8FAFC', marginBottom: '4px' }}>
            {conversations.length} / Unlimited
          </div>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '16px' }}>
            Multi-turn LLM reasoning queries executed this billing period.
          </div>
          <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)' }}>
            <div style={{ width: '12%', height: '100%', background: '#7C3AED', borderRadius: '3px' }} />
          </div>
        </div>

        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#38BDF8', textTransform: 'uppercase' }}>
              Live Web Searches
            </span>
            <Search size={16} color="#38BDF8" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#F8FAFC', marginBottom: '4px' }}>
            14 / Unlimited
          </div>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '16px' }}>
            Real-time research briefs grounded with verified citations.
          </div>
          <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)' }}>
            <div style={{ width: '8%', height: '100%', background: '#38BDF8', borderRadius: '3px' }} />
          </div>
        </div>

        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#34D399', textTransform: 'uppercase' }}>
              Library Storage
            </span>
            <Database size={16} color="#34D399" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#F8FAFC', marginBottom: '4px' }}>
            {libraryItems.length * 24} KB / 10 GB
          </div>
          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '16px' }}>
            Saved research briefs, marketing copy, and knowledge notes.
          </div>
          <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)' }}>
            <div style={{ width: '2%', height: '100%', background: '#10B981', borderRadius: '3px' }} />
          </div>
        </div>
      </div>

      {/* Current Plan Overview & Tiers */}
      <div className="glass-panel">
        <div className="panel-header">
          <div>
            <div className="panel-title">
              <Sparkles size={18} color="#A78BFA" />
              Verified Subscription Plans
            </div>
            <div className="panel-subtitle">Transparent pricing without hidden add-ons or billing lock-in</div>
          </div>
          <span className="badge badge-primary">Monthly Billing</span>
        </div>

        <div className="cards-grid-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              style={{
                padding: '20px',
                borderRadius: '14px',
                background: plan.isCurrent ? 'rgba(124, 58, 237, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                border: plan.isCurrent ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '800', color: '#F8FAFC' }}>{plan.name}</span>
                  {plan.isCurrent && <span className="badge badge-success">Current Plan</span>}
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '28px', fontWeight: '900', color: '#F8FAFC' }}>{plan.price}</span>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>/ {plan.billingPeriod}</span>
                </div>

                <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.4', marginBottom: '16px' }}>
                  {plan.description}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {plan.features.slice(0, 4).map((f, i) => (
                    <li key={i} style={{ fontSize: '12px', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={13} color="#34D399" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`btn btn-sm ${plan.isCurrent ? 'btn-outline' : 'btn-primary'}`}
                onClick={() => handleUpgrade(plan.name)}
                disabled={plan.isCurrent}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {plan.isCurrent ? 'Active Plan' : `Upgrade to ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
