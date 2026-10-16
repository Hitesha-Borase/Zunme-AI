import React, { useState, useEffect } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import {
  Briefcase,
  Users,
  Calendar,
  Layers,
  Sparkles,
  Save,
  Plus,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
  AlertCircle,
  Database,
  RefreshCw,
  DollarSign,
  Activity,
  PhoneCall,
  Mail,
  ShieldCheck,
  ExternalLink,
  LifeBuoy,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BusinessProject, CalendarEvent } from '../../types';
import '../../styles/dashboard.css';

interface CrmLead {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  score: number;
  channel: string;
  dealStage: 'NEW_LEAD' | 'DEMO_SCHEDULED' | 'PROPOSAL_SENT' | 'CLOSED_WON';
  dealValue: number;
  syncedAt: string;
}

export const BusinessWorkspacePage: React.FC = () => {
  const {
    brandProfile,
    updateBrandProfile,
    businessProjects,
    addBusinessProject,
    calendarEvents,
    addCalendarEvent,
    showToast
  } = useApp();

  const [searchParams, setSearchParams] = useSearchParams();

  type BusinessTabType = 'Overview' | 'Brand Profile' | 'Projects' | 'Content Calendar' | 'Marketing Content' | 'nErgy CRM Deep Sync' | 'Team & Access' | 'Settings' | 'Help & Support';

  const [activeTab, setActiveTabState] = useState<BusinessTabType>(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['Overview', 'Brand Profile', 'Projects', 'Content Calendar', 'Marketing Content', 'nErgy CRM Deep Sync', 'Team & Access', 'Settings', 'Help & Support'].includes(tabParam)) {
      return tabParam as BusinessTabType;
    }
    return 'Overview';
  });

  const setActiveTab = (tab: BusinessTabType) => {
    setActiveTabState(tab);
    setSearchParams({ tab });
  };

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['Overview', 'Brand Profile', 'Projects', 'Content Calendar', 'Marketing Content', 'nErgy CRM Deep Sync', 'Team & Access', 'Settings', 'Help & Support'].includes(tabParam)) {
      setActiveTabState(tabParam as BusinessTabType);
    } else {
      setActiveTabState('Overview');
    }
  }, [searchParams]);

  // Brand Profile State
  const [bName, setBName] = useState(brandProfile.brandName);
  const [bTagline, setBTagline] = useState(brandProfile.tagline);
  const [bVoice, setBVoice] = useState(brandProfile.voiceTone);
  const [bAudience, setBAudience] = useState(brandProfile.targetAudience);
  const [bValues, setBValues] = useState(brandProfile.coreValues);
  const [bMission, setBMission] = useState(brandProfile.missionStatement);

  // New Project State
  const [pName, setPName] = useState('');
  const [pCategory, setPCategory] = useState<'Marketing Campaign' | 'Product Launch' | 'Brand Rebrand' | 'SEO Revamp'>('Marketing Campaign');
  const [pDueDate, setPDueDate] = useState('2026-11-20');
  const [pDesc, setPDesc] = useState('');

  // Calendar Event State
  const [cTitle, setCTitle] = useState('');
  const [cPlatform, setCPlatform] = useState<'Blog' | 'LinkedIn' | 'Twitter / X' | 'Newsletter' | 'Instagram'>('LinkedIn');
  const [cDate, setCDate] = useState('2026-10-25');

  // nErgy CRM State
  const [isSyncingCrm, setIsSyncingCrm] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadCompany, setNewLeadCompany] = useState('');
  const [newLeadRole, setNewLeadRole] = useState('VP Growth');
  const [newLeadValue, setNewLeadValue] = useState(24000);

  const [crmLeads, setCrmLeads] = useState<CrmLead[]>([
    {
      id: 'lead-1',
      name: 'John Davis',
      email: 'john.davis@acmecorp.com',
      company: 'Acme Corp',
      role: 'VP Growth & Marketing',
      score: 94,
      channel: 'Web Search AI Ingest',
      dealStage: 'PROPOSAL_SENT',
      dealValue: 36000,
      syncedAt: '2 mins ago'
    },
    {
      id: 'lead-2',
      name: 'Sarah Jenkins',
      email: 's.jenkins@fintechscale.io',
      company: 'FintechScale',
      role: 'Chief Marketing Officer',
      score: 98,
      channel: 'Content Studio Lead Form',
      dealStage: 'DEMO_SCHEDULED',
      dealValue: 48000,
      syncedAt: '15 mins ago'
    },
    {
      id: 'lead-3',
      name: 'Michael Brown',
      email: 'mbrown@apexdigital.com',
      company: 'Apex Digital Agency',
      role: 'Founder & CEO',
      score: 82,
      channel: 'Sponsored Native Ad',
      dealStage: 'NEW_LEAD',
      dealValue: 24000,
      syncedAt: '1 hour ago'
    },
    {
      id: 'lead-4',
      name: 'Priya Patel',
      email: 'p.patel@globalretail.co',
      company: 'Global Retail Hub',
      role: 'VP Omnichannel Operations',
      score: 99,
      channel: 'Direct Executive Ingest',
      dealStage: 'CLOSED_WON',
      dealValue: 76500,
      syncedAt: '4 hours ago'
    }
  ]);

  const [crmInteractions] = useState([
    { id: 'int-1', lead: 'Sarah Jenkins', action: 'Executive Brief Synced', detail: 'Generated 5-pillar GTM strategy outline automatically synced to nErgy deal notes', time: '15 mins ago' },
    { id: 'int-2', lead: 'John Davis', action: 'Lead Score Escalated', detail: 'High intent: 4 consecutive competitor search queries logged via Tavily search grounding', time: '45 mins ago' },
    { id: 'int-3', lead: 'Priya Patel', action: 'Deal Stage Updated', detail: 'Contract signed ($76,500 ACV). Automated onboarding webhook dispatched to nErgy CRM', time: '4 hours ago' }
  ]);

  const handleRunCrmSync = () => {
    setIsSyncingCrm(true);
    setTimeout(() => {
      setIsSyncingCrm(false);
      showToast('nErgy CRM Deep Sync executed: 4 deals & 12 interaction logs updated', 'success');
    }, 850);
  };

  const handleCaptureLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadEmail.trim()) {
      showToast('Contact name and email are required', 'error');
      return;
    }

    const createdLead: CrmLead = {
      id: `lead-${Date.now()}`,
      name: newLeadName.trim(),
      email: newLeadEmail.trim(),
      company: newLeadCompany.trim() || 'Enterprise Client',
      role: newLeadRole,
      score: 90,
      channel: 'Manual Executive Capture',
      dealStage: 'NEW_LEAD',
      dealValue: Number(newLeadValue) || 15000,
      syncedAt: 'Just now'
    };

    setCrmLeads([createdLead, ...crmLeads]);
    setIsLeadModalOpen(false);
    setNewLeadName('');
    setNewLeadEmail('');
    setNewLeadCompany('');
    showToast(`Lead "${createdLead.name}" pushed to nErgy CRM pipeline!`, 'success');
  };

  const handleSaveBrandProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandProfile({
      brandName: bName,
      tagline: bTagline,
      voiceTone: bVoice,
      targetAudience: bAudience,
      coreValues: bValues,
      missionStatement: bMission
    });
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName.trim()) return;
    addBusinessProject({
      name: pName.trim(),
      category: pCategory,
      status: 'IN_PROGRESS',
      dueDate: pDueDate,
      progress: 10,
      description: pDesc.trim() || 'Active strategic campaign initiatives.',
      tasksCount: 6
    });
    setPName('');
    setPDesc('');
    setActiveTab('Projects');
  };

  const handleAddCalendarPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cTitle.trim()) return;
    addCalendarEvent({
      title: cTitle.trim(),
      platform: cPlatform,
      date: cDate,
      status: 'Scheduled',
      format: 'Social / Post'
    });
    setCTitle('');
    showToast('Post added to Content Calendar', 'success');
  };

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Briefcase size={26} color="#A78BFA" />
            Small Business & Team Workspace
          </h1>
          <p className="dashboard-subtitle">
            Unify your brand identity, campaign projects, editorial content calendar, and marketing assets into one collaborative dashboard.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-primary">
            {businessProjects.length} Active Business Projects
          </div>
        </div>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'Overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-card-top">
                <div className="metric-icon-box">
                  <Briefcase size={20} />
                </div>
                <span className="metric-badge positive">Active</span>
              </div>
              <div className="metric-value">{businessProjects.length}</div>
              <div className="metric-label">Ongoing Business Campaigns</div>
            </div>

            <div className="metric-card">
              <div className="metric-card-top">
                <div className="metric-icon-box" style={{ color: '#38BDF8', background: 'rgba(56, 189, 248, 0.12)' }}>
                  <Calendar size={20} />
                </div>
                <span className="metric-badge neutral">Scheduled</span>
              </div>
              <div className="metric-value">{calendarEvents.length}</div>
              <div className="metric-label">Editorial Calendar Items</div>
            </div>

            <div className="metric-card">
              <div className="metric-card-top">
                <div className="metric-icon-box" style={{ color: '#34D399', background: 'rgba(16, 185, 129, 0.12)' }}>
                  <Sparkles size={20} />
                </div>
                <span className="metric-badge positive">Synced</span>
              </div>
              <div className="metric-value">{brandProfile.brandName}</div>
              <div className="metric-label">Active Brand Identity Profile</div>
            </div>
          </div>

          <div className="cards-grid-2">
            {/* Active Projects Preview */}
            <div className="glass-panel">
              <div className="panel-header">
                <div className="panel-title">Active Projects & Deadlines</div>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setActiveTab('Projects')}
                  style={{ fontSize: '11px' }}
                >
                  All Projects
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {businessProjects.map((proj) => (
                  <div
                    key={proj.id}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      background: '#FAFBFD',
                      border: '1px solid #E8ECF5',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '700', color: '#111625', fontSize: '13px' }}>{proj.name}</span>
                      <span className="badge badge-neutral" style={{ fontSize: '10px' }}>{proj.category}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#5F6B85' }}>
                      <span>Due: {proj.dueDate}</span>
                      <span>Progress: {proj.progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: '#E8ECF5' }}>
                      <div style={{ width: `${proj.progress}%`, height: '100%', background: '#6E56CF', borderRadius: '2px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Calendar Preview */}
            <div className="glass-panel">
              <div className="panel-header">
                <div className="panel-title">Upcoming Content Schedule</div>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setActiveTab('Content Calendar')}
                  style={{ fontSize: '11px' }}
                >
                  Open Calendar
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {calendarEvents.map((ev) => (
                  <div
                    key={ev.id}
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
                      <div style={{ fontWeight: '700', color: '#111625', fontSize: '13px' }}>{ev.title}</div>
                      <div style={{ fontSize: '11px', color: '#5F6B85', marginTop: '2px' }}>
                        Channel: <strong>{ev.platform}</strong> • Date: {ev.date}
                      </div>
                    </div>
                    <span className="badge badge-primary">{ev.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Brand Profile */}
      {activeTab === 'Brand Profile' && (
        <div className="glass-panel" style={{ maxWidth: '780px', margin: '0 auto', width: '100%' }}>
          <div className="panel-header">
            <div className="panel-title">Brand Voice & Persona Configuration</div>
            <span className="badge badge-success">Active Grounding Persona</span>
          </div>

          <form onSubmit={handleSaveBrandProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Brand / Organization Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={bName}
                  onChange={(e) => setBName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Brand Tagline
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={bTagline}
                  onChange={(e) => setBTagline(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                Tone of Voice & Personality
              </label>
              <input
                type="text"
                className="input-field"
                value={bVoice}
                onChange={(e) => setBVoice(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                Primary Target Audience
              </label>
              <textarea
                className="input-field"
                rows={2}
                value={bAudience}
                onChange={(e) => setBAudience(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                Core Values & Positioning Pillars
              </label>
              <textarea
                className="input-field"
                rows={2}
                value={bValues}
                onChange={(e) => setBValues(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                Mission Statement
              </label>
              <textarea
                className="input-field"
                rows={2}
                value={bMission}
                onChange={(e) => setBMission(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button type="submit" className="btn btn-primary">
                <Save size={14} />
                <span>Save Brand Profile</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab: Projects */}
      {activeTab === 'Projects' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="glass-panel" style={{ padding: 'var(--space-4)' }}>
            <form onSubmit={handleCreateProject} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="text"
                className="input-field"
                placeholder="New project title..."
                value={pName}
                onChange={(e) => setPName(e.target.value)}
                style={{ flex: 1, minWidth: '240px' }}
                required
              />
              <select
                className="input-field"
                style={{ width: '180px' }}
                value={pCategory}
                onChange={(e) => setPCategory(e.target.value as any)}
              >
                <option value="Marketing Campaign">Marketing Campaign</option>
                <option value="Product Launch">Product Launch</option>
                <option value="Brand Rebrand">Brand Rebrand</option>
                <option value="SEO Revamp">SEO Revamp</option>
              </select>
              <input
                type="date"
                className="input-field"
                style={{ width: '160px' }}
                value={pDueDate}
                onChange={(e) => setPDueDate(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <Plus size={14} /> Add Project
              </button>
            </form>
          </div>

          <div className="cards-grid-3">
            {businessProjects.map((proj) => (
              <div key={proj.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="badge badge-neutral" style={{ fontSize: '10px' }}>{proj.category}</span>
                    <span className="status-chip success">{proj.status}</span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>{proj.name}</h3>
                  <p style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.4', marginBottom: '14px' }}>{proj.description}</p>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B', marginBottom: '6px' }}>
                    <span>Target: {proj.dueDate}</span>
                    <span>{proj.progress}% Done</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: '#E8ECF5' }}>
                    <div style={{ width: `${proj.progress}%`, height: '100%', background: '#6E56CF', borderRadius: '3px' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Content Calendar */}
      {activeTab === 'Content Calendar' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="glass-panel" style={{ padding: 'var(--space-4)' }}>
            <form onSubmit={handleAddCalendarPost} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="text"
                className="input-field"
                placeholder="Scheduled post title / hook..."
                value={cTitle}
                onChange={(e) => setCTitle(e.target.value)}
                style={{ flex: 1, minWidth: '240px' }}
                required
              />
              <select
                className="input-field"
                style={{ width: '180px' }}
                value={cPlatform}
                onChange={(e) => setCPlatform(e.target.value as any)}
              >
                <option value="LinkedIn">LinkedIn</option>
                <option value="Twitter / X">Twitter / X</option>
                <option value="Newsletter">Newsletter</option>
                <option value="Blog">Blog</option>
                <option value="Instagram">Instagram</option>
              </select>
              <input
                type="date"
                className="input-field"
                style={{ width: '160px' }}
                value={cDate}
                onChange={(e) => setCDate(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <Plus size={14} /> Schedule Post
              </button>
            </form>
          </div>

          <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Scheduled Asset Title</th>
                    <th>Platform Channel</th>
                    <th>Target Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {calendarEvents.map((ev) => (
                    <tr key={ev.id}>
                      <td style={{ fontWeight: '700', color: '#111625' }}>{ev.title}</td>
                      <td><span className="badge badge-neutral">{ev.platform}</span></td>
                      <td>{ev.date}</td>
                      <td><span className="status-chip success">{ev.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Marketing Content */}
      {activeTab === 'Marketing Content' && (
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title">Marketing Copy Generator</div>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '16px' }}>
            Generate brand-grounded marketing copy directly using your active brand persona ({brandProfile.brandName}).
          </p>
          <NavLink to="/app/builders" className="btn btn-primary btn-sm">
            <span>Open Content Builders &rarr;</span>
          </NavLink>
        </div>
      )}

      {/* Tab: nErgy CRM Deep Sync */}
      {activeTab === 'nErgy CRM Deep Sync' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* CRM Connection Banner */}
          <div className="glass-panel" style={{ borderLeft: '4px solid #059669', padding: '18px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#E8F8F0',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Database size={22} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', margin: 0 }}>
                      nErgy CRM Enterprise Bridge: Synchronized
                    </h3>
                    <span className="badge badge-success">Webhook Live</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#5F6B85', margin: '3px 0 0 0' }}>
                    Real-time bidirectional synchronization between Zunme AI conversations, search inquiries, and client CRM records.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={handleRunCrmSync}
                  disabled={isSyncingCrm}
                >
                  <RefreshCw size={14} className={isSyncingCrm ? 'spin' : ''} />
                  <span>{isSyncingCrm ? 'Syncing...' : 'Run Deep Sync'}</span>
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setIsLeadModalOpen(true)}
                >
                  <Plus size={14} />
                  <span>Capture New Lead</span>
                </button>
              </div>
            </div>
          </div>

          {/* CRM Pipeline Metrics */}
          <div className="cards-grid-4">
            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>
                Total Pipeline Value
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                ${crmLeads.reduce((acc, l) => acc + l.dealValue, 0).toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <TrendingUp size={13} />
                <span>+32% QoQ lead acceleration</span>
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#6E56CF', textTransform: 'uppercase' }}>
                Active Deals in Flight
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                {crmLeads.length} Organizations
              </div>
              <div style={{ fontSize: '12px', color: '#5F6B85', marginTop: '4px' }}>
                Across 4 synchronized deal stages
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#0284C7', textTransform: 'uppercase' }}>
                Average AI Lead Score
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                93.2 / 100
              </div>
              <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>
                Calculated from workflow intent
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#D97706', textTransform: 'uppercase' }}>
                Avg Cycle Velocity
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                14.2 Days
              </div>
              <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>
                2.8x faster with automated summaries
              </div>
            </div>
          </div>

          {/* CRM Leads Table */}
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Users size={18} color="#6E56CF" />
                Synchronized Lead Pipeline &amp; Customer Interactions
              </div>
              <span className="badge badge-primary">{crmLeads.length} Synced Records</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E8ECF5', color: '#5F6B85' }}>
                    <th style={{ padding: '12px 14px' }}>Contact &amp; Organization</th>
                    <th style={{ padding: '12px 14px' }}>AI Lead Score</th>
                    <th style={{ padding: '12px 14px' }}>Attribution Source</th>
                    <th style={{ padding: '12px 14px' }}>Deal Stage</th>
                    <th style={{ padding: '12px 14px' }}>Pipeline Value</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>CRM Sync</th>
                  </tr>
                </thead>
                <tbody>
                  {crmLeads.map((lead) => (
                    <tr key={lead.id} style={{ borderBottom: '1px solid #F0F3F9' }}>
                      <td style={{ padding: '14px' }}>
                        <div style={{ fontWeight: '800', color: '#111625' }}>{lead.name}</div>
                        <span style={{ fontSize: '11.5px', color: '#5F6B85' }}>
                          {lead.role} • <strong>{lead.company}</strong>
                        </span>
                        <div style={{ fontSize: '11px', color: '#8C97B0' }}>{lead.email}</div>
                      </td>
                      <td style={{ padding: '14px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '900', color: lead.score >= 90 ? '#059669' : '#D97706' }}>
                          {lead.score}/100
                        </span>
                      </td>
                      <td style={{ padding: '14px', color: '#5F6B85' }}>
                        <span style={{ background: '#FAFBFD', border: '1px solid #E8ECF5', padding: '3px 8px', borderRadius: '6px', fontSize: '11px' }}>
                          {lead.channel}
                        </span>
                      </td>
                      <td style={{ padding: '14px' }}>
                        <span className={`badge ${lead.dealStage === 'CLOSED_WON' ? 'badge-success' : lead.dealStage === 'PROPOSAL_SENT' ? 'badge-primary' : 'badge-neutral'}`}>
                          {lead.dealStage.replace('_', ' ')}
                        </span>
                      </td>
                      <td style={{ padding: '14px', fontWeight: '800', color: '#111625' }}>
                        ${lead.dealValue.toLocaleString()}
                      </td>
                      <td style={{ padding: '14px', textAlign: 'right' }}>
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => showToast(`Lead notes synced to nErgy CRM for ${lead.company}`, 'success')}
                          style={{ fontSize: '11px', padding: '4px 10px' }}
                        >
                          Push to nErgy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Interaction Timeline */}
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Activity size={18} color="#0284C7" />
                Recent AI-Customer Interaction Activity Logs
              </div>
              <span className="badge badge-neutral">Auto-Audited</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {crmInteractions.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: '#FAFBFD',
                    border: '1px solid #E8ECF5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12.5px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6E56CF' }} />
                    <div>
                      <strong style={{ color: '#111625' }}>{item.lead}</strong> — <span style={{ color: '#6E56CF', fontWeight: '600' }}>{item.action}</span>
                      <p style={{ margin: '2px 0 0 0', color: '#5F6B85', fontSize: '12px' }}>
                        {item.detail}
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', color: '#8C97B0' }}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LEAD INGEST MODAL */}
      {isLeadModalOpen && (
        <div className="dashboard-modal-backdrop" onClick={() => setIsLeadModalOpen(false)}>
          <div className="dashboard-modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div className="panel-header" style={{ padding: '16px 20px', borderBottom: '1px solid #E8ECF5', margin: 0, background: '#FAFAFC', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
              <div className="panel-title" style={{ fontSize: '16px', color: '#111625', fontWeight: '800' }}>
                <Users size={18} color="#059669" />
                <span>Capture Lead to nErgy CRM</span>
              </div>
              <button className="btn-ghost" onClick={() => setIsLeadModalOpen(false)} style={{ padding: '6px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCaptureLead} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Jordan Miller"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Corporate Email
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="jordan@enterpriseco.com"
                  value={newLeadEmail}
                  onChange={(e) => setNewLeadEmail(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. TechCorp Solutions"
                    value={newLeadCompany}
                    onChange={(e) => setNewLeadCompany(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Target Role
                  </label>
                  <select
                    className="input-field"
                    value={newLeadRole}
                    onChange={(e) => setNewLeadRole(e.target.value)}
                  >
                    <option value="VP Growth">VP Growth</option>
                    <option value="Chief Marketing Officer">Chief Marketing Officer</option>
                    <option value="Head of Product">Head of Product</option>
                    <option value="Procurement Director">Procurement Director</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Estimated Deal Value ($)
                </label>
                <input
                  type="number"
                  className="input-field"
                  value={newLeadValue}
                  onChange={(e) => setNewLeadValue(Number(e.target.value))}
                  min={1000}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsLeadModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  <Database size={14} />
                  <span>Ingest to nErgy CRM</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab: Team & Access (supported status clearly stated) */}
      {activeTab === 'Team & Access' && (
        <div className="glass-panel">
          <div className="future-module-banner" style={{ margin: 0 }}>
            <div className="future-module-icon">
              <Users size={24} color="#A78BFA" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>
                Multi-User Team Collaboration & Access Controls
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.5' }}>
                You are currently in Single-Owner Workspace mode. Multi-seat team invites and role-based permissions (RBAC) are included with the Business & Agency plan ($99/mo) and will activate upon team member invitation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === 'Settings' && (
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title">Business Workspace Settings</div>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '13px' }}>
            Manage organization defaults, currency preferences, and notification webhooks.
          </p>
        </div>
      )}

      {/* Tab: Help & Support */}
      {activeTab === 'Help & Support' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div className="glass-panel">
            <div className="panel-header">
              <div>
                <div className="panel-title">
                  <LifeBuoy size={20} color="#10B981" />
                  <span>Business &amp; Team Support Center</span>
                </div>
                <div className="panel-subtitle">
                  Dedicated operations assistance, CRM webhook integration guides, and high-priority business SLA support.
                </div>
              </div>
              <span className="badge badge-success">
                Average Response: &lt; 1hr
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '12px' }}>
              <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Users size={18} color="#10B981" />
                  <strong style={{ fontSize: '14px', color: '#111625' }}>CRM Integration &amp; Webhooks</strong>
                </div>
                <p style={{ fontSize: '12.5px', color: '#5F6B85', lineHeight: '1.5' }}>
                  Connect nErgy CRM, synchronize real-time lead updates, and configure automatic opportunity ingestion pipelines.
                </p>
              </div>

              <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Calendar size={18} color="#10B981" />
                  <strong style={{ fontSize: '14px', color: '#111625' }}>Content Calendar Automation</strong>
                </div>
                <p style={{ fontSize: '12.5px', color: '#5F6B85', lineHeight: '1.5' }}>
                  Schedule multi-channel marketing campaigns, track publication status, and automate cross-platform social broadcasting.
                </p>
              </div>

              <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Briefcase size={18} color="#10B981" />
                  <strong style={{ fontSize: '14px', color: '#111625' }}>Brand Profile Guidelines</strong>
                </div>
                <p style={{ fontSize: '12.5px', color: '#5F6B85', lineHeight: '1.5' }}>
                  Configure company mission, target audience, and brand voice so all generated marketing content matches your executive identity.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Mail size={18} color="#10B981" />
                <span>Submit Business Priority Ticket</span>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast('Priority business support ticket submitted! Our operations team will respond within 1 hour.', 'success');
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '640px' }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Subject
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Inquiring about custom CRM webhook endpoint mapping"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Description &amp; Details
                </label>
                <textarea
                  className="input-field"
                  rows={4}
                  placeholder="Provide context on your workflow or question..."
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', background: '#059669', borderColor: '#059669' }}>
                <Mail size={14} />
                <span>Send Priority Ticket</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
