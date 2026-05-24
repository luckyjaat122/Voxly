import { useEffect, useRef, useState } from 'react';

/* ─── SVG Icons ─── */
const Icons = {
  overview: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width="13" height="13"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  voice: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width="13" height="13"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.57 3.42a2 2 0 0 1 2.01-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9"/></svg>,
  analytics: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width="13" height="13"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  crm: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width="13" height="13"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4"/></svg>,
  automations: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width="13" height="13"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  billing: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width="13" height="13"><rect x="1" y="4" width="22" height="16" rx="1"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  team: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width="13" height="13"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>,
  settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width="13" height="13"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

/* ─── Dashboard Panel Components ─── */
const INITIAL_BARS = [30, 45, 38, 60, 52, 72, 48, 65, 80, 55, 70, 88, 62, 75, 50, 68, 85, 58, 72, 64, 78, 90, 56, 70];

function OverviewPanel() {
  const [bars, setBars] = useState<number[]>(INITIAL_BARS);
  useEffect(() => {
    const interval = setInterval(() => {
      setBars(INITIAL_BARS.map(() => Math.floor(Math.random() * 60 + 25)));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="panel-content">
      <div className="db-grid-4">
        {[
          { label: 'Live Calls', val: '14', change: '+3 now' },
          { label: 'Avg Response', val: '120ms', change: '−18ms' },
          { label: 'Conversion', val: '38.2%', change: '+4.1%' },
          { label: 'Balance', val: '$2.4k', change: '−1.2k/hr' },
        ].map((s, i) => (
          <div className="db-stat" key={i}>
            <div className="db-stat-label">{s.label}</div>
            <div className="db-stat-val">{s.val}</div>
            <div className={`db-stat-change ${i === 3 ? '' : 'up'}`}>{s.change}</div>
          </div>
        ))}
      </div>
      <div className="db-graph">
        {bars.map((h, i) => (
          <div key={i} className={`db-bar ${i === 22 ? 'highlight' : ''}`} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="db-row-2">
        <div className="db-agents">
          <div className="db-section-title">Voice Agents</div>
          {[
            { name: 'Inbound SDR', status: 'Active', color: '#000', badge: 'badge-solid' },
            { name: 'Outbound Caller', status: 'Active', color: '#000', badge: 'badge-solid' },
            { name: 'Receptionist', status: 'Active', color: '#000', badge: 'badge-solid' },
            { name: 'Support Agent', status: 'Idle', color: '#a3a3a3', badge: 'badge-light' },
          ].map((agent, i) => (
            <div className="db-agent-item" key={i}>
              <div className="db-agent-dot" style={{ background: agent.color }} />
              <div className="db-agent-name">{agent.name}</div>
              <span className={`badge ${agent.badge}`} style={{ fontSize: '.58rem', padding: '2px 6px' }}>{agent.status}</span>
            </div>
          ))}
        </div>
        <div className="db-calls-mini">
          <div className="db-section-title">Recent Calls</div>
          {[
            { name: '+1 (555) 012···', badge: 'badge-solid', label: 'Qualified' },
            { name: '+44 20 7946···', badge: 'badge-outline', label: 'Booked' },
            { name: '+1 (412) 891···', badge: 'badge-light', label: 'Follow-Up' },
            { name: '+61 2 9374···', badge: 'badge-light', label: 'Escalated' },
          ].map((call, i) => (
            <div className="db-call-row" key={i}>
              <div className="db-call-name">{call.name}</div>
              <span className={`badge ${call.badge}`} style={{ fontSize: '.55rem', padding: '2px 5px' }}>{call.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgentStatusPanel() {
  const agents = [
    { name: 'Sales Closer', type: 'Inbound', status: 'active', calls: 24 },
    { name: 'Lead Qualifier', type: 'Outbound', status: 'active', calls: 156 },
    { name: 'Appointment Setter', type: 'Inbound', status: 'active', calls: 18 },
    { name: 'Support Agent', type: 'Inbound', status: 'busy', calls: 7 },
    { name: 'Cold Outreach', type: 'Outbound', status: 'active', calls: 312 },
    { name: 'Follow-up Bot', type: 'Outbound', status: 'idle', calls: 0 },
    { name: 'Receptionist', type: 'Inbound', status: 'active', calls: 43 },
    { name: 'Survey Agent', type: 'Outbound', status: 'idle', calls: 0 },
  ];

  return (
    <div className="panel-content">
      <div className="db-section-title" style={{ marginBottom: '10px' }}>Agents Active For You</div>
      <div className="agent-status-list">
        {agents.map((agent, i) => (
          <div className="agent-status-item" key={i}>
            <div className={`agent-status-dot ${agent.status}`} />
            <div className="agent-status-info">
              <div className="agent-status-name">{agent.name}</div>
              <div className="agent-status-type">{agent.type} &middot; {agent.calls} calls today</div>
            </div>
            <span className="badge" style={{
              fontSize: '.55rem', padding: '2px 8px', fontFamily: 'var(--font-mono)',
              background: agent.status === 'active' ? '#000' : agent.status === 'busy' ? '#525252' : '#f5f5f5',
              color: agent.status === 'idle' ? '#737373' : '#fff',
              textTransform: 'uppercase', letterSpacing: '0.04em'
            }}>
              {agent.status === 'active' ? 'Active' : agent.status === 'busy' ? 'Busy' : 'Idle'}
            </span>
          </div>
        ))}
      </div>
      <div className="agent-status-summary">
        5 of 8 agents active &middot; 560 calls handled today
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  const data = [
    { label: 'Total Calls', value: '2,847', change: '+12%', bars: [30, 45, 60, 50, 70, 85, 75, 90, 80, 65, 70, 95] },
    { label: 'Avg Duration', value: '4m 12s', change: '+8%', bars: [40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 60, 85] },
    { label: 'Conversion', value: '38.2%', change: '+4.1%', bars: [20, 30, 45, 40, 55, 60, 50, 65, 70, 75, 80, 85] },
    { label: 'Sentiment', value: '84%', change: '+2.3%', bars: [50, 55, 60, 65, 70, 68, 75, 80, 85, 82, 88, 90] },
  ];

  return (
    <div className="panel-content">
      <div className="db-section-title" style={{ marginBottom: '10px' }}>Live Analytics</div>
      <div className="analytics-grid">
        {data.map((item, i) => (
          <div className="analytics-card" key={i}>
            <div className="analytics-card-title">{item.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: 'var(--font-sans)', color: '#000' }}>{item.value}</span>
              <span style={{ fontSize: '.6rem', color: '#525252', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{item.change}</span>
            </div>
            <div className="analytics-chart">
              {item.bars.map((h, j) => (
                <div key={j} className={`chart-bar ${j === item.bars.length - 1 ? 'accent' : ''}`} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: '#fafafa', border: '1px solid #e5e5e5', padding: '10px', marginTop: '8px' }}>
        <div className="db-section-title">Call Trends</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '36px' }}>
          {[65, 45, 70, 55, 80, 90, 75, 85, 95, 70, 88, 92, 78, 85, 90, 95, 88, 92, 85, 90].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: i > 15 ? '#000' : '#e5e5e5' }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '.55rem', color: '#a3a3a3', fontFamily: 'var(--font-mono)' }}>
          <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span>
        </div>
      </div>
    </div>
  );
}

function CRMPanel() {
  const leads = [
    { name: 'Rahul Sharma', source: 'Website', status: 'Hot', avatar: 'RS' },
    { name: 'Priya Patel', source: 'Outbound', status: 'Warm', avatar: 'PP' },
    { name: 'Amit Kumar', source: 'Referral', status: 'Qualified', avatar: 'AK' },
    { name: 'Sneha Gupta', source: 'Website', status: 'New', avatar: 'SG' },
    { name: 'Vikram Rao', source: 'Campaign', status: 'Hot', avatar: 'VR' },
    { name: 'Neha Singh', source: 'Outbound', status: 'Follow-up', avatar: 'NS' },
  ];

  return (
    <div className="panel-content">
      <div className="db-section-title" style={{ marginBottom: '10px' }}>CRM Leads</div>
      <div className="crm-leads">
        {leads.map((lead, i) => (
          <div className="crm-lead-item" key={i}>
            <div className="crm-avatar">{lead.avatar}</div>
            <div className="crm-lead-info">
              <div className="crm-lead-name">{lead.name}</div>
              <div className="crm-lead-source">{lead.source}</div>
            </div>
            <span className="badge" style={{
              fontSize: '.55rem', fontWeight: 500, fontFamily: 'var(--font-mono)',
              padding: '2px 8px', textTransform: 'uppercase', letterSpacing: '0.04em',
              background: lead.status === 'Hot' ? '#000' : lead.status === 'Warm' ? '#525252' : lead.status === 'Qualified' ? '#262626' : '#f5f5f5',
              color: lead.status === 'New' || lead.status === 'Follow-up' ? '#737373' : '#fff'
            }}>{lead.status}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
        {[{ v: '156', l: 'Total Leads' }, { v: '42', l: 'Qualified' }, { v: '18', l: 'Booked' }].map((s, i) => (
          <div key={i} style={{ background: '#fafafa', border: '1px solid #e5e5e5', padding: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '.85rem', fontWeight: 700, fontFamily: 'var(--font-sans)', color: '#000' }}>{s.v}</div>
            <div style={{ fontSize: '.55rem', color: '#a3a3a3', fontFamily: 'var(--font-mono)' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomationsPanel() {
  const automations = [
    { name: 'Lead Follow-up', trigger: 'After 24h', status: 'Active' },
    { name: 'Appointment Confirm', trigger: '1h before', status: 'Active' },
    { name: 'No-answer Retry', trigger: '3 attempts', status: 'Active' },
    { name: 'CRM Sync', trigger: 'Real-time', status: 'Active' },
    { name: 'Escalation Alert', trigger: 'Negative sentiment', status: 'Paused' },
    { name: 'Weekly Report', trigger: 'Every Monday', status: 'Active' },
  ];

  return (
    <div className="panel-content">
      <div className="db-section-title" style={{ marginBottom: '10px' }}>Automations</div>
      <div className="automation-list">
        {automations.map((auto, i) => (
          <div className="auto-item" key={i}>
            <div className="auto-icon">&#9889;</div>
            <div className="auto-info">
              <div className="auto-name">{auto.name}</div>
              <div className="auto-status">Trigger: {auto.trigger}</div>
            </div>
            <span className="badge" style={{
              fontSize: '.55rem', fontFamily: 'var(--font-mono)', fontWeight: 500, padding: '2px 8px',
              background: auto.status === 'Active' ? '#000' : '#f5f5f5',
              color: auto.status === 'Active' ? '#fff' : '#737373',
              textTransform: 'uppercase', letterSpacing: '0.04em'
            }}>{auto.status}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px', padding: '10px', background: '#000', color: '#fff', textAlign: 'center', fontSize: '.65rem', fontFamily: 'var(--font-mono)' }}>
        5 of 6 workflows active &middot; 1,240 tasks completed today
      </div>
    </div>
  );
}

function TeamPanel() {
  const members = [
    { name: 'Lucky Choudhary', role: 'Admin', status: 'online', avatar: 'LC' },
    { name: 'Aryan Mehta', role: 'Manager', status: 'online', avatar: 'AM' },
    { name: 'Divya Sharma', role: 'Agent', status: 'away', avatar: 'DS' },
    { name: 'Karan Patel', role: 'Agent', status: 'online', avatar: 'KP' },
    { name: 'Riya Singh', role: 'Analyst', status: 'offline', avatar: 'RS' },
  ];

  return (
    <div className="panel-content">
      <div className="db-section-title" style={{ marginBottom: '10px' }}>Team Members</div>
      <div className="team-list">
        {members.map((member, i) => (
          <div className="team-member" key={i}>
            <div className="team-avatar">{member.avatar}</div>
            <div className="team-info">
              <div className="team-name">{member.name}</div>
              <div className="team-role">{member.role}</div>
            </div>
            <div className="team-status" style={{
              background: member.status === 'online' ? '#000' : member.status === 'away' ? '#525252' : '#e5e5e5'
            }} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
        {[{ v: '5', l: 'Members' }, { v: '3', l: 'Online' }, { v: '2', l: 'Roles' }].map((s, i) => (
          <div key={i} style={{ background: '#fafafa', border: '1px solid #e5e5e5', padding: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '.85rem', fontWeight: 700, fontFamily: 'var(--font-sans)', color: '#000' }}>{s.v}</div>
            <div style={{ fontSize: '.55rem', color: '#a3a3a3', fontFamily: 'var(--font-mono)' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main App ─── */
function App() {
  const [activeView, setActiveView] = useState('overview');
  const [demoStatus, setDemoStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');
  const [timer, setTimer] = useState('00:00');
  const [waveBars] = useState(() =>
    Array.from({ length: 28 }, () => ({
      h: Math.floor(Math.random() * 40 + 15),
      delay: Math.random() * 0.8,
      duration: 0.6 + Math.random() * 0.4,
    }))
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const secondsRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = '1';
          (e.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.animate-fade-up').forEach(el => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(30px)';
      (el as HTMLElement).style.transition = 'opacity .8s cubic-bezier(.16, 1, .3, 1), transform .8s cubic-bezier(.16, 1, .3, 1)';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startDemo = () => {
    setDemoStatus('connecting');
    setTimeout(() => {
      setDemoStatus('connected');
      secondsRef.current = 0;
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        secondsRef.current++;
        const m = String(Math.floor(secondsRef.current / 60)).padStart(2, '0');
        const s = String(secondsRef.current % 60).padStart(2, '0');
        setTimer(`${m}:${s}`);
      }, 1000);
    }, 1500);
  };

  const endDemo = () => {
    setDemoStatus('idle');
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    secondsRef.current = 0;
    setTimer('00:00');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Icons.overview },
    { id: 'agents', label: 'Voice Agents', icon: Icons.voice },
    { id: 'analytics', label: 'Analytics', icon: Icons.analytics },
    { id: 'crm', label: 'CRM', icon: Icons.crm },
    { id: 'automations', label: 'Automations', icon: Icons.automations },
  ];

  const accountItems = [
    { id: 'billing', label: 'Billing', icon: Icons.billing },
    { id: 'team', label: 'Team', icon: Icons.team },
    { id: 'settings', label: 'Settings', icon: Icons.settings },
  ];

  const renderPanel = () => {
    switch (activeView) {
      case 'overview': return <OverviewPanel />;
      case 'agents': return <AgentStatusPanel />;
      case 'analytics': return <AnalyticsPanel />;
      case 'crm': return <CRMPanel />;
      case 'automations': return <AutomationsPanel />;
      case 'team': return <TeamPanel />;
      default: return <OverviewPanel />;
    }
  };

  return (
    <div>
      {/* ═══ NAVIGATION ═══ */}
      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-brand">Voxly</a>
          <div className="nav-links">
            <a href="#infrastructure">Platform</a>
            <a href="#features">Features</a>
            <a href="#metrics">Why Voxly</a>
            <a href="#demo">Demo</a>
          </div>
          <div className="nav-actions">
            <a href="#demo" className="btn btn-outline btn-sm">View Demo</a>
            <a href="#cta" className="btn btn-primary btn-sm">Get Started</a>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-badge animate-fade-up">
                <span className="dot" />
                AI Voice Infrastructure
              </div>
              <h1 className="hero-title animate-fade-up delay-1">
                Human-Like AI Voice Agents.<br /><span>Built for Scale.</span>
              </h1>
              <p className="hero-sub animate-fade-up delay-2">
                Deploy inbound and outbound AI voice agents with real-time conversations, interruption handling, multilingual intelligence, and full analytics.
              </p>
              <div className="hero-actions animate-fade-up delay-3">
                <a href="#cta" className="btn btn-primary btn-lg">Start Your Deployment</a>
                <a href="#demo" className="btn btn-outline btn-lg">See Live Demo</a>
              </div>
              <div className="hero-credit animate-fade-up delay-4">
                <span className="hero-credit-text">Made by <strong>Lucky Choudhary</strong></span>
              </div>
            </div>

            {/* DASHBOARD PREVIEW */}
            <div className="hero-dashboard animate-fade-up delay-2">
              <div className="db-topbar">
                <div className="db-topbar-dot" />
                <div className="db-topbar-dot" />
                <div className="db-topbar-dot" />
                <div className="db-url">
                  <svg width="7" height="7" viewBox="0 0 8 8" fill="none"><circle cx="4" cy="4" r="4" fill="#000"/></svg>
                  app.voxly.ai
                </div>
              </div>
              <div className="db-body">
                <div className="db-sidebar">
                  <div className="db-sidebar-section">
                    <div className="db-sidebar-label">Main</div>
                    {navItems.map(item => (
                      <button
                        key={item.id}
                        className={`db-nav-item ${activeView === item.id ? 'active' : ''}`}
                        onClick={() => setActiveView(item.id)}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="db-sidebar-section">
                    <div className="db-sidebar-label">Account</div>
                    {accountItems.map(item => (
                      <button
                        key={item.id}
                        className={`db-nav-item ${activeView === item.id ? 'active' : ''}`}
                        onClick={() => item.id === 'team' ? setActiveView('team') : undefined}
                        style={{ cursor: item.id === 'team' ? 'pointer' : 'default' }}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
                {renderPanel()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST STRIP ═══ */}
      <div id="trust-strip">
        <div className="container">
          <div className="trust-strip-inner">
            <span className="trust-logo">Inbound AI Calls</span>
            <span className="trust-logo">Outbound Campaigns</span>
            <span className="trust-logo">Lead Qualification</span>
            <span className="trust-logo">Auto Appointment Booking</span>
            <span className="trust-logo">42+ Languages</span>
            <span className="trust-logo">Human-Like Voice</span>
          </div>
        </div>
      </div>

      {/* ═══ INFRASTRUCTURE ═══ */}
      <section id="infrastructure">
        <div className="container">
          <div className="infra-grid">
            <div>
              <div className="label animate-fade-up">Platform</div>
              <h2 className="animate-fade-up delay-1">Enterprise-Grade AI Voice Orchestration</h2>
              <p className="animate-fade-up delay-2" style={{ marginTop: '20px', maxWidth: '480px' }}>
                Every call flows through a precision-engineered pipeline. From the moment a customer speaks, Voxly processes, reasons, and responds in under 120 milliseconds — indistinguishable from a real human conversation.
              </p>
              <div className="infra-metrics animate-fade-up delay-3">
                <div className="infra-metric">
                  <div className="infra-metric-val">120ms</div>
                  <div className="infra-metric-label">End-to-end latency</div>
                </div>
                <div className="infra-metric">
                  <div className="infra-metric-val">99.2%</div>
                  <div className="infra-metric-label">Platform uptime</div>
                </div>
                <div className="infra-metric">
                  <div className="infra-metric-val">42+</div>
                  <div className="infra-metric-label">Languages supported</div>
                </div>
                <div className="infra-metric">
                  <div className="infra-metric-val">2M+</div>
                  <div className="infra-metric-label">AI conversations</div>
                </div>
              </div>
            </div>
            <div className="animate-fade-up delay-2">
              <div className="flow-card">
                {[
                  { icon: '\u260E', label: 'Customer Call Received', sub: 'Instant AI-powered call handling', hasBadge: true },
                  { icon: '\uD83C\uDFA4', label: 'Real-time Speech Recognition', sub: 'Sub-50ms transcription latency' },
                  { icon: '\uD83E\uDDE0', label: 'AI Reasoning Engine', sub: 'Context-aware decision making' },
                  { icon: '\uD83D\uDD0A', label: 'Human-Like Voice Generation', sub: 'Natural prosody & interruption handling' },
                  { icon: '\u26A1', label: 'CRM + Automations', sub: 'Sync data, trigger workflows' },
                  { icon: '\uD83D\uDCCA', label: 'Analytics Dashboard', sub: 'Full call intelligence & reporting' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flow-item">
                      <div className="flow-icon">{item.icon}</div>
                      <div>
                        <div className="flow-label">{item.label}</div>
                        <div className="flow-sub">{item.sub}</div>
                      </div>
                      {item.hasBadge && <span className="badge badge-solid" style={{ marginLeft: 'auto', fontSize: '.55rem', padding: '2px 7px' }}>Live</span>}
                    </div>
                    {i < 5 && <div className="flow-connector">&#8595;</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features">
        <div className="container">
          <div className="label animate-fade-up">Capabilities</div>
          <h2 className="animate-fade-up delay-1">Everything you need to deploy AI voice at scale.</h2>
          <p className="animate-fade-up delay-2" style={{ maxWidth: '540px', marginTop: '16px' }}>
            Built for businesses, sales teams, and high-growth operators who need reliable AI voice infrastructure — with no limits and no complexity.
          </p>
          <div className="features-grid">
            {[
              { icon: '\uD83D\uDCAC', title: 'Human-Like Conversations', desc: 'Natural, contextual dialogue with personality tuning. Clients cannot tell the difference from a real agent.' },
              { icon: '\u26A1', title: 'Real-time Interruptions', desc: 'Handles mid-sentence interruptions gracefully. No awkward pauses, no broken flow — just natural back-and-forth.' },
              { icon: '\uD83C\uDF0D', title: 'Multilingual Voice', desc: 'Deploy across 42+ languages with native-quality accents and regional adaptation built in.' },
              { icon: '\uD83C\uDFAF', title: 'AI Lead Qualification', desc: 'Score and route leads automatically. The AI asks the right questions, qualifies in real time, and hands off hot prospects.' },
              { icon: '\uD83D\uDCC5', title: 'Appointment Booking', desc: 'Integrated calendar scheduling. AI confirms availability, books, and sends confirmations — zero human effort required.' },
              { icon: '\uD83D\uDD17', title: 'CRM Integrations', desc: 'Native sync with Salesforce, HubSpot, Pipedrive, and 40+ platforms. Every call auto-logged with full transcript.' },
              { icon: '\uD83C\uDFF7', title: 'Your Brand. Your AI.', desc: 'Deploy under your own brand identity. Custom domains, your logo, your colours — AI-powered, invisibly by Voxly.' },
              { icon: '\uD83D\uDCC8', title: 'Live Analytics', desc: 'Real-time dashboards for every call metric. Conversion rates, sentiment scores, agent performance, and more.' },
              { icon: '\uD83D\uDD10', title: 'Enterprise Security', desc: 'SOC 2 compliant. End-to-end encryption, role-based access, audit logs, and GDPR-ready data controls.' },
              { icon: '\uD83D\uDCB3', title: 'Usage-Based Billing', desc: 'Pay for what you use. Transparent per-minute pricing with auto-recharge, usage caps, and overage protection.' },
              { icon: '\uD83E\uDD1D', title: 'AI Sales Agents', desc: 'Full outbound sales pipelines automated. Prospecting, pitching, objection handling — at scale, 24/7.' },
              { icon: '\uD83D\uDD28', title: 'API Infrastructure', desc: 'Fully documented REST and WebSocket APIs. Deploy, manage, and monitor agents programmatically.' },
            ].map((f, i) => (
              <div className={`feature-card animate-fade-up delay-${(i % 3) + 1}`} key={i}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div>
              <div className="label animate-fade-up">About Voxly</div>
              <h2 className="animate-fade-up delay-1">Built by Lucky Choudhary.<br />For Real Businesses.</h2>
              <p className="animate-fade-up delay-2" style={{ marginTop: '20px', maxWidth: '460px' }}>
                Voxly is an AI voice infrastructure platform designed to help businesses automate inbound and outbound calls with human-like AI agents — with no hidden fees, no lock-in, and no complexity.
              </p>
              <div className="about-features animate-fade-up delay-3">
                {[
                  'Transparent pricing',
                  'Live in under 48 hours',
                  'No contracts or lock-in',
                  '42+ languages supported',
                  'Auto-recharge when low',
                  'Full call analytics & reports',
                ].map((text, i) => (
                  <div className="about-feature" key={i}>
                    <span className="about-feature-icon">&#10003;</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-fade-up delay-2">
              <div className="how-flow">
                <div style={{ fontSize: '.7rem', fontWeight: 500, fontFamily: 'var(--font-mono)', color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '20px' }}>How It Works</div>
                <div className="how-step">
                  <div className="how-step-num">1</div>
                  <div>
                    <div className="how-step-label">Get Your AI Voice Agent</div>
                    <div className="how-step-sub">Inbound or outbound — deployed under your brand</div>
                  </div>
                </div>
                <div className="how-arrow">&#8595;</div>
                <div className="how-step">
                  <div className="how-step-num" style={{ background: '#525252' }}>&#9881;</div>
                  <div>
                    <div className="how-step-label">AI Handles Every Call</div>
                    <div className="how-step-sub">120ms response, natural conversation, zero wait time</div>
                  </div>
                  <span className="badge badge-solid" style={{ marginLeft: 'auto', fontSize: '.55rem', padding: '2px 7px' }}>Live</span>
                </div>
                <div className="how-arrow">&#8595;</div>
                <div className="how-step">
                  <div className="how-step-num" style={{ background: '#262626' }}>&#10003;</div>
                  <div>
                    <div className="how-step-label">Results in Your Dashboard</div>
                    <div className="how-step-sub">Every call logged, transcribed, and analysed</div>
                  </div>
                </div>
                <div style={{ marginTop: '24px', padding: '16px', background: '#000', color: '#fff' }}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '.8rem', fontWeight: 600, marginBottom: '6px' }}>Talk to Lucky directly</div>
                  <div style={{ fontSize: '.78rem', color: '#a3a3a3' }}>Questions about Voxly? WhatsApp Lucky Choudhary at <strong style={{ color: '#fff' }}>+91 80059 53317</strong> — typically responds within the hour.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ METRICS ═══ */}
      <section id="metrics">
        <div className="container">
          <div className="metrics-top">
            <div className="label animate-fade-up" style={{ justifyContent: 'center' }}>Why Voxly</div>
            <h2 className="animate-fade-up delay-1">Everything you need to<br />deploy AI voice agents.</h2>
          </div>
          <div className="metrics-grid">
            {[
              { val: '<120', unit: 'ms', label: 'Sub-120ms response latency' },
              { val: '42', unit: '+', label: 'Languages supported' },
              { val: '48', unit: 'hrs', label: 'Time to go live' },
              { val: '99.2', unit: '%', label: 'Platform uptime SLA' },
            ].map((m, i) => (
              <div className={`metric-card animate-fade-up delay-${i + 1}`} key={i}>
                <div className="metric-val">{m.val}<span>{m.unit}</span></div>
                <div className="metric-label">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="animate-fade-up delay-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#e5e5e5', border: '1px solid #e5e5e5' }}>
            {[
              { icon: '\uD83E\uDD16', title: 'Human-Like AI', sub: 'Indistinguishable from real agents' },
              { icon: '\uD83D\uDCCA', title: 'Live Analytics', sub: 'Full transcripts & sentiment scoring' },
              { icon: '\uD83D\uDD17', title: 'CRM Integration', sub: 'Salesforce, HubSpot & 40+ platforms' },
              { icon: '\uD83D\uDCC5', title: 'Auto Booking', sub: 'AI books appointments automatically' },
              { icon: '\u267B', title: 'Auto Recharge', sub: 'Never miss a call — tops up auto' },
              { icon: '\uD83D\uDD10', title: 'Secure & Compliant', sub: 'End-to-end encrypted, audit logs' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 20px', background: '#fff', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#000'; e.currentTarget.querySelectorAll('*').forEach(c => (c as HTMLElement).style.color = '#fff'); }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.querySelectorAll('.feat-title').forEach(c => (c as HTMLElement).style.color = '#000'); e.currentTarget.querySelectorAll('.feat-sub').forEach(c => (c as HTMLElement).style.color = '#737373'); }}>
                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                <div>
                  <div className="feat-title" style={{ fontWeight: 600, fontSize: '.82rem', color: '#000', transition: 'color .2s' }}>{item.title}</div>
                  <div className="feat-sub" style={{ fontSize: '.72rem', color: '#737373', transition: 'color .2s' }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LIVE DEMO ═══ */}
      <section id="demo">
        <div className="container">
          <div className="demo-grid">
            <div>
              <div className="label animate-fade-up">Live Demo</div>
              <h2 style={{ color: '#fff' }} className="animate-fade-up delay-1">Hear It for Yourself.</h2>
              <p className="animate-fade-up delay-2" style={{ marginTop: '20px', maxWidth: '420px' }}>
                Click "Start AI Demo" and have a real conversation with our AI voice agent. No setup, no form — just talk.
              </p>
              <div className="demo-actions animate-fade-up delay-3">
                <button onClick={startDemo} className="btn btn-light">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
                  Start AI Demo
                </button>
                <button onClick={endDemo} className="btn btn-ghost">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
                  End Call
                </button>
              </div>
              <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }} className="animate-fade-up delay-4">
                {[
                  'Sub-120ms response latency',
                  'Real-time interruption detection',
                  'Natural, context-aware dialogue',
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '.82rem', color: '#737373' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12" /></svg>
                    {text}
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-fade-up delay-2">
              <div className="demo-interface">
                <div className="demo-topbar">
                  <div className="demo-status">
                    <div className={`demo-status-dot ${demoStatus === 'idle' ? 'idle' : ''}`} style={demoStatus === 'connecting' ? { background: '#737373' } : demoStatus === 'connected' ? { background: '#fff' } : {}} />
                    <span>
                      {demoStatus === 'connecting' ? 'Connecting' : demoStatus === 'connected' ? 'Live — AI is listening' : 'Ready to connect'}
                    </span>
                  </div>
                  <div className="demo-timer">{timer}</div>
                </div>
                <div className="demo-waveform">
                  {waveBars.map((bar, i) => (
                    <div key={i} className={`wave-bar ${demoStatus === 'connected' ? 'active' : ''}`} style={{ height: `${bar.h}px`, animationDelay: `${bar.delay}s`, animationDuration: `${bar.duration}s` }} />
                  ))}
                </div>
                <div className="demo-transcript">
                  <div className="transcript-msg">
                    <span className="transcript-role">Client</span>
                    <span className="transcript-text">"Hey, we're looking for AI voice infrastructure for our agency."</span>
                  </div>
                  <div className="transcript-msg">
                    <span className="transcript-role role-ai">AI</span>
                    <span className="transcript-text">"Absolutely — are you mainly focused on outbound qualification, inbound support, or a fully white-labeled deployment?"</span>
                  </div>
                </div>
                <div className="demo-footer-bar">
                  <div className="demo-interrupt">
                    <span className="interrupt-dot" />
                    Interruption detection active
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '.65rem', color: '#525252', fontFamily: 'var(--font-mono)' }}>
                    voxly-api v2.4
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials">
        <div className="container">
          <div className="label animate-fade-up">What clients say</div>
          <h2 className="animate-fade-up delay-1">Operators who run on Voxly.</h2>
          <div className="testimonials-grid">
            {[
              { quote: '"We deployed Voxly for our sales team and the AI books more meetings than our human SDRs did. The 120ms response time makes it feel completely real."', initials: 'AM', name: 'Arjun Mehta', role: 'Director of Sales, Growth Partners' },
              { quote: '"120ms latency is not marketing. Our clients have tested it against their own human SDRs. The AI books more meetings."', initials: 'RK', name: 'Rachel Kim', role: 'VP Operations, ScaleWorks' },
              { quote: '"We switched from two other voice AI platforms. Voxly is the first one our sales team stopped complaining about. That says everything."', initials: 'MS', name: 'Marcus Silva', role: 'Head of Growth, Apex Digital' },
            ].map((t, i) => (
              <div className={`testimonial-card animate-fade-up delay-${i + 1}`} key={i}>
                <div className="testimonial-quote">{t.quote}</div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section id="cta">
        <div className="container">
          <div className="label animate-fade-up" style={{ justifyContent: 'center' }}>
            <span style={{ background: '#fff', width: '20px', height: '1px', display: 'inline-block' }} />
            Get started
          </div>
          <h2 className="animate-fade-up delay-1">Deploy Human-Level<br />AI Voice Infrastructure.</h2>
          <p className="animate-fade-up delay-2">Human-like AI voice agents. Transparent pricing. Live in under 48 hours.</p>
          <div className="cta-actions animate-fade-up delay-3">
            <a href="https://wa.me/918005953317?text=Hey%20Lucky%2C%20I%27m%20looking%20for%20a%20voice%20AI%20agent." target="_blank" rel="noreferrer" className="btn btn-lg btn-light">Start Your Deployment</a>
            <a href="mailto:sales@voxly.ai" className="btn btn-lg btn-ghost">Contact Sales</a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="minimal-footer">
        <div className="container">
          <div className="minimal-footer-inner">
            <span className="minimal-footer-brand">Voxly</span>
            <span style={{ color: '#525252', fontSize: '.75rem', fontFamily: 'var(--font-mono)' }}>&middot;</span>
            <span style={{ color: '#737373', fontSize: '.75rem', fontFamily: 'var(--font-mono)' }}>Made by Lucky Choudhary</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
