import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BusinessProject, CalendarEvent } from '../../types';
import '../../styles/dashboard.css';

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

  const [activeTab, setActiveTab] = useState<
    'Overview' | 'Brand Profile' | 'Projects' | 'Content Calendar' | 'Marketing Content' | 'Team & Access' | 'Settings'
  >('Overview');

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

      {/* Sub-Navigation */}
      <div className="glass-panel" style={{ padding: '12px 18px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            'Overview',
            'Brand Profile',
            'Projects',
            'Content Calendar',
            'Marketing Content',
            'Team & Access',
            'Settings'
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
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#CBD5E1', marginBottom: '6px' }}>
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
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#CBD5E1', marginBottom: '6px' }}>
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
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#CBD5E1', marginBottom: '6px' }}>
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
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#CBD5E1', marginBottom: '6px' }}>
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
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#CBD5E1', marginBottom: '6px' }}>
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
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#CBD5E1', marginBottom: '6px' }}>
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
    </div>
  );
};
