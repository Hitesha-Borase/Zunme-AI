import React, { createContext, useContext, useState } from 'react';
import {
  User,
  UserRole,
  Conversation,
  ChatMessage,
  SearchResult,
  GeneratedContent,
  SavedLibraryItem,
  ToastMessage,
  AdminUser,
  ContentCategory,
  ContentFormat,
  ContentTone,
  ContentLength,
  AuditLogEntry,
  PricingPlan,
  WarehouseAsset,
  CreatorSubmission,
  SEOKeyword,
  BusinessProject,
  BrandProfileData,
  CalendarEvent,
  PlatformIntegration
} from '../types';

interface AppContextType {
  // Auth
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (fullName: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (fullName: string) => void;
  toggleRole: () => void;
  setRole: (role: UserRole) => void;

  // Conversations & Chat
  conversations: Conversation[];
  activeConversationId: string;
  activeMessages: ChatMessage[];
  isAiResponding: boolean;
  createNewChat: () => void;
  selectConversation: (id: string) => void;
  sendMessage: (content: string) => void;
  deleteConversation: (id: string) => void;

  // Web Search
  searchResult: SearchResult | null;
  isSearching: boolean;
  executeSearch: (query: string) => void;
  clearSearch: () => void;

  // Content Studio
  generatedContent: GeneratedContent | null;
  isGeneratingContent: boolean;
  generateContent: (params: {
    category: ContentCategory;
    format: ContentFormat;
    instructions: string;
    tone: ContentTone;
    length: ContentLength;
  }) => void;

  // My Library
  libraryItems: SavedLibraryItem[];
  saveToLibrary: (item: Omit<SavedLibraryItem, 'id' | 'createdAt'>) => void;
  deleteFromLibrary: (id: string) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (text: string, type?: ToastMessage['type']) => void;

  // Admin & Super Admin
  adminUsers: AdminUser[];
  toggleUserStatus: (id: string) => void;
  auditLogs: AuditLogEntry[];
  addAuditLog: (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => void;
  pricingPlans: PricingPlan[];
  updatePricingPlan: (id: string, updates: Partial<PricingPlan>) => void;

  // AI Warehouse
  warehouseAssets: WarehouseAsset[];
  toggleAssetSaved: (id: string) => void;

  // Creator Studio
  creatorSubmissions: CreatorSubmission[];
  addCreatorSubmission: (sub: Omit<CreatorSubmission, 'id' | 'submittedAt' | 'downloads'>) => void;
  updateCreatorSubmissionStatus: (id: string, status: CreatorSubmission['status']) => void;

  // SEO Workspace
  seoKeywords: SEOKeyword[];
  addSeoKeyword: (kw: Omit<SEOKeyword, 'id'>) => void;
  deleteSeoKeyword: (id: string) => void;

  // Business Workspace
  businessProjects: BusinessProject[];
  addBusinessProject: (proj: Omit<BusinessProject, 'id'>) => void;
  brandProfile: BrandProfileData;
  updateBrandProfile: (data: Partial<BrandProfileData>) => void;
  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;

  // Integrations
  integrations: PlatformIntegration[];
  toggleIntegrationStatus: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Seed Data
const DEFAULT_USER: User = {
  id: 'usr_demo_101',
  email: 'alex.creator@zunme.ai',
  fullName: 'Alex Johnson',
  role: 'USER',
  createdAt: '2026-10-01T08:00:00Z'
};

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_1',
    title: 'Q3 Creator Growth & GTM Strategy',
    createdAt: '2026-10-14T10:30:00Z',
    updatedAt: '2026-10-15T09:15:00Z'
  },
  {
    id: 'conv_2',
    title: 'TypeScript & React Architecture Notes',
    createdAt: '2026-10-13T14:20:00Z',
    updatedAt: '2026-10-14T11:00:00Z'
  },
  {
    id: 'conv_3',
    title: 'Product Launch Email Sequence',
    createdAt: '2026-10-12T16:00:00Z',
    updatedAt: '2026-10-13T18:30:00Z'
  }
];

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  conv_1: [
    {
      id: 'm_1_1',
      conversationId: 'conv_1',
      role: 'user',
      content: 'Can you propose a 4-step go-to-market plan for an AI productivity tool designed for creators and solopreneurs?',
      createdAt: '2026-10-15T09:10:00Z'
    },
    {
      id: 'm_1_2',
      conversationId: 'conv_1',
      role: 'assistant',
      content: `Here is a structured 4-step Go-To-Market framework tailored specifically for creative professionals:\n\n### 1. Niche Positioning & Early Adopter Cohorts\nFocus first on a hyper-specific segment (e.g., YouTube educators or newsletter writers) rather than generic "everyone". Highlight how Zunme AI saves 6+ hours weekly by unifying live research with instant copy drafting.\n\n### 2. High-Value "Build in Public" Content\nShare workflow breakdowns, before/after prompt demonstrations, and real time-saving metrics on X, LinkedIn, and YouTube.\n\n### 3. Frictionless Freemium & "Aha!" Micro-Moments\nEnsure users experience value within 60 seconds of sign-up—such as instant web search with verified sources or a 1-click blog outline generator.\n\n### 4. Viral Sharing & Personal Library Portability\nEnable creators to publish or share snippets from their saved library directly to their teams with a single link.\n\nWould you like me to draft an initial announcement thread or email sequence for this launch?`,
      createdAt: '2026-10-15T09:12:00Z'
    }
  ],
  conv_2: [
    {
      id: 'm_2_1',
      conversationId: 'conv_2',
      role: 'user',
      content: 'What are the main best practices for organizing shared design tokens in a React + TypeScript project?',
      createdAt: '2026-10-14T10:45:00Z'
    },
    {
      id: 'm_2_2',
      conversationId: 'conv_2',
      role: 'assistant',
      content: `Here are the foundational guidelines for a robust token architecture:\n\n1. **CSS Custom Properties as Single Source of Truth:** Declare tokens in a root stylesheet (\`--color-primary\`, \`--radius-md\`, \`--space-4\`). This ensures both CSS and JavaScript can read themes without rebuilding.\n2. **Type-Safe Token Enums:** Export TypeScript types for design variants (\`'primary' | 'secondary' | 'ghost'\`) to prevent invalid class combinations at compile time.\n3. **Modular Component Primitives:** Build layout primitives (\`Button\`, \`Card\`, \`Input\`) that consume token classes directly rather than applying raw arbitrary hex values in component files.`,
      createdAt: '2026-10-14T10:48:00Z'
    }
  ],
  conv_3: [
    {
      id: 'm_3_1',
      conversationId: 'conv_3',
      role: 'user',
      content: 'Draft a short, engaging welcome email for new Zunme AI subscribers.',
      createdAt: '2026-10-13T18:20:00Z'
    },
    {
      id: 'm_3_2',
      conversationId: 'conv_3',
      role: 'assistant',
      content: `**Subject:** Welcome to Zunme AI — Your new creative super-assistant ⚡\n\nHey {{FirstName}},\n\nWelcome to Zunme AI! We built this workspace because jumping between five different tabs for research, notes, and AI drafting was killing our focus.\n\nHere are 3 quick things you can try in your first 5 minutes:\n- 💬 **Ask the AI Workspace** to outline your next project or brainstorm angles.\n- 🔍 **Run a Live Web Search** to retrieve current 2026 facts backed by verified citations.\n- ✍️ **Open Content Studio** to generate high-converting social copy or email newsletters.\n\nWhenever you find something great, hit **Save to Library** to keep your best ideas safe and organized.\n\n[Open Your Workspace ->](https://zunme.ai/app/chat)\n\nHappy creating,\n**The Zunme Team**`,
      createdAt: '2026-10-13T18:25:00Z'
    }
  ]
};

const INITIAL_LIBRARY_ITEMS: SavedLibraryItem[] = [
  {
    id: 'lib_1',
    title: 'Solid-State Battery Breakthroughs (2026 Research Brief)',
    contentType: 'RESEARCH',
    previewText: 'Commercial production for silicon-composite cathode cells shows a 35% density jump over conventional lithium-ion cells.',
    content: `### Executive Research Brief: Solid-State Battery Commercialization (2026)\n\n**Overview:** Recent field validation trials across North American and European labs demonstrate that solid-electrolyte cells have overcome dendrite penetration issues through atomic-layer coating.\n\n**Key Metrics:**\n- Energy Density: 480 Wh/kg achieved at ambient pressure.\n- Fast Charge Rate: 10% to 80% capacity within 11 minutes.\n- Cycle Life: Exceeds 1,400 continuous cycles with <8% capacity degradation.`,
    sourceMetadata: [
      {
        id: 'src_1',
        title: 'Global Energy Storage Review 2026',
        url: 'https://energystorage-review.org/solid-state-trials',
        domain: 'energystorage-review.org',
        snippet: 'Automakers announce standardized testing protocol for 480 Wh/kg solid-state cells starting Q4 2026.',
        publishedDate: 'Oct 08, 2026'
      },
      {
        id: 'src_2',
        title: 'CleanTech Innovation Index',
        url: 'https://cleantech-index.com/battery-advancements',
        domain: 'cleantech-index.com',
        snippet: 'Silicon-composite cathodes solve historic thermal runaway risks under extreme mechanical stress tests.',
        publishedDate: 'Sep 29, 2026'
      }
    ],
    tags: ['Batteries', 'CleanTech', 'Hardware'],
    createdAt: '2026-10-14T11:20:00Z'
  },
  {
    id: 'lib_2',
    title: 'Eco-Bottle Product Launch Newsletter Copy',
    contentType: 'MARKETING',
    previewText: 'Subject: Say Goodbye to Single-Use Plastic. Hey [Name], Meet the modular bottle built to last a lifetime...',
    content: `**Subject:** Say Goodbye to Single-Use Plastic Forever 🌿\n\nHey [First Name],\n\nEvery year, billions of disposable bottles end up in landfills. We decided to do something about it.\n\nIntroducing **AeroFlask** — the world's first vacuum-insulated, modular water bottle forged from 100% recycled aerospace titanium.\n\n- Keeps liquids ice-cold for 36 hours\n- 100% leak-proof magnetic lid\n- Zero plastic, lifetime guarantee\n\nFor the next 48 hours, use code **EARLYCREATOR** for 20% off your first bottle.\n\n[Claim Your AeroFlask Today ->]`,
    tags: ['Email Copy', 'Product Launch', 'Eco'],
    createdAt: '2026-10-13T14:40:00Z'
  },
  {
    id: 'lib_3',
    title: '4-Step Go-to-Market Framework for Creators',
    contentType: 'TEXT',
    previewText: 'Strategic guide outlining Niche Positioning, Build in Public distribution, and viral personal library sharing...',
    content: `### 4-Step Go-To-Market Framework for Solopreneurs & Creators\n\n1. **Niche Positioning:** Solve a single urgent bottleneck for a tight demographic before broadening scope.\n2. **Transparent Demonstration:** Showcase daily productivity gains openly on social platforms.\n3. **60-Second Time-to-Value:** Keep onboarding immediate with zero friction.\n4. **Sharable Artifacts:** Enable users to export or share outputs with peers.`,
    tags: ['Strategy', 'GTM', 'Guides'],
    createdAt: '2026-10-12T17:05:00Z'
  }
];

const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr_1',
    fullName: 'Alex Johnson',
    email: 'alex.creator@zunme.ai',
    role: 'USER',
    status: 'ACTIVE',
    joinedDate: 'Oct 01, 2026',
    conversationsCount: 14,
    savedItemsCount: 8
  },
  {
    id: 'usr_2',
    fullName: 'Sarah Connor',
    email: 'sarah.c@cyberdyne.org',
    role: 'USER',
    status: 'ACTIVE',
    joinedDate: 'Oct 05, 2026',
    conversationsCount: 29,
    savedItemsCount: 19
  },
  {
    id: 'usr_3',
    fullName: 'Marcus Vance',
    email: 'marcus@soloventure.io',
    role: 'USER',
    status: 'SUSPENDED',
    joinedDate: 'Sep 24, 2026',
    conversationsCount: 6,
    savedItemsCount: 2
  },
  {
    id: 'usr_4',
    fullName: 'Elena Rostova',
    email: 'elena@creatornetwork.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    joinedDate: 'Sep 15, 2026',
    conversationsCount: 64,
    savedItemsCount: 42
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv_1');
  const [messagesRecord, setMessagesRecord] = useState<Record<string, ChatMessage[]>>(INITIAL_MESSAGES);
  const [isAiResponding, setIsAiResponding] = useState<boolean>(false);

  // Search State
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Studio State
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGeneratingContent, setIsGeneratingContent] = useState<boolean>(false);

  // Library State
  const [libraryItems, setLibraryItems] = useState<SavedLibraryItem[]>(INITIAL_LIBRARY_ITEMS);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Admin Users
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);

  const showToast = (text: string, type: ToastMessage['type'] = 'success') => {
    const id = 'toast_' + Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // Auth Functions
  const login = async (email: string, _pass: string): Promise<boolean> => {
    setUser({
      id: 'usr_' + Date.now(),
      email,
      fullName: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      role: 'USER',
      createdAt: new Date().toISOString()
    });
    showToast('Signed in successfully!', 'success');
    return true;
  };

  const register = async (fullName: string, email: string, _pass: string): Promise<boolean> => {
    setUser({
      id: 'usr_' + Date.now(),
      email,
      fullName,
      role: 'USER',
      createdAt: new Date().toISOString()
    });
    showToast('Account created! Welcome to Zunme AI.', 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out of workspace', 'info');
  };

  const updateProfile = (fullName: string) => {
    if (user) {
      setUser({ ...user, fullName });
      showToast('Profile information saved', 'success');
    }
  };

  const toggleRole = () => {
    if (user) {
      const nextRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
      setUser({ ...user, role: nextRole });
      showToast(`Switched user role to ${nextRole} for testing`, 'info');
    }
  };

  const setRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
      showToast(`Role updated to ${role}`, 'info');
    }
  };

  // Audit Logs & Pricing
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const addAuditLog = (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => {
    setAuditLogs((prev) => [
      {
        ...entry,
        id: 'log_' + Date.now(),
        timestamp: new Date().toISOString()
      },
      ...prev
    ]);
  };

  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([
    {
      id: 'plan_starter',
      name: 'Starter',
      price: '$0',
      billingPeriod: 'Free forever',
      description: 'Essential AI capabilities for individual exploration and everyday productivity.',
      features: [
        'Conversational AI Chat',
        'Real-time Web Search queries',
        'Standard Content Studio access',
        'Personal Library storage (up to 50 items)'
      ],
      activeSubscribers: 120
    },
    {
      id: 'plan_pro',
      name: 'Pro Creator',
      price: '$24',
      billingPeriod: '/month',
      description: 'Advanced capabilities for content creators, writers, and power researchers.',
      features: [
        'Unlimited AI Chat conversations',
        'Real-time Web Search with verified source citations',
        'Full Content Studio formats & custom tones',
        'Unlimited Saved Library storage',
        'Priority response processing'
      ],
      badge: 'Popular',
      activeSubscribers: 840
    },
    {
      id: 'plan_enterprise',
      name: 'Team & Studio',
      price: '$69',
      billingPeriod: '/month',
      description: 'Comprehensive workspace for agencies, marketing teams, and growing brands.',
      features: [
        'Everything in Pro Creator',
        'Multi-user collaborative workspace',
        'Advanced SEO & content intelligence',
        'Brand voice & persona templates',
        'Dedicated support & API access'
      ],
      activeSubscribers: 210
    }
  ]);

  const updatePricingPlan = (id: string, updates: Partial<PricingPlan>) => {
    setPricingPlans((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  // AI Warehouse & Creator Studio
  const [warehouseAssets, setWarehouseAssets] = useState<WarehouseAsset[]>([]);
  const toggleAssetSaved = (id: string) => {
    setWarehouseAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isSaved: !a.isSaved } : a))
    );
  };

  const [creatorSubmissions, setCreatorSubmissions] = useState<CreatorSubmission[]>([]);
  const addCreatorSubmission = (sub: Omit<CreatorSubmission, 'id' | 'submittedAt' | 'downloads'>) => {
    setCreatorSubmissions((prev) => [
      {
        ...sub,
        id: 'sub_' + Date.now(),
        submittedAt: new Date().toISOString(),
        downloads: 0
      },
      ...prev
    ]);
  };
  const updateCreatorSubmissionStatus = (id: string, status: CreatorSubmission['status']) => {
    setCreatorSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  // SEO Workspace
  const [seoKeywords, setSeoKeywords] = useState<SEOKeyword[]>([]);
  const addSeoKeyword = (kw: Omit<SEOKeyword, 'id'>) => {
    setSeoKeywords((prev) => [{ ...kw, id: 'kw_' + Date.now() }, ...prev]);
  };
  const deleteSeoKeyword = (id: string) => {
    setSeoKeywords((prev) => prev.filter((k) => k.id !== id));
  };

  // Business Workspace
  const [businessProjects, setBusinessProjects] = useState<BusinessProject[]>([]);
  const addBusinessProject = (proj: Omit<BusinessProject, 'id'>) => {
    setBusinessProjects((prev) => [{ ...proj, id: 'proj_' + Date.now() }, ...prev]);
  };
  const [brandProfile, setBrandProfile] = useState<BrandProfileData>({
    brandName: 'Zunme AI',
    tagline: 'Your AI Workspace for Ideas, Content & Discovery',
    voiceTone: 'Professional yet approachable',
    targetAudience: 'Creators, researchers, and entrepreneurs',
    coreValues: 'Clarity, speed, attribution, and creativity',
    missionStatement: 'Empowering modern knowledge workers with unified AI tools.'
  });
  const updateBrandProfile = (data: Partial<BrandProfileData>) => {
    setBrandProfile((prev) => ({ ...prev, ...data }));
  };
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const addCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
    setCalendarEvents((prev) => [{ ...event, id: 'cal_' + Date.now() }, ...prev]);
  };

  // Integrations
  const [integrations, setIntegrations] = useState<PlatformIntegration[]>([]);
  const toggleIntegrationStatus = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: i.status === 'CONNECTED' ? 'DISCONNECTED' : 'CONNECTED' } : i
      )
    );
  };

  // Chat Functions
  const createNewChat = () => {
    const newId = 'conv_' + Date.now();
    const newConv: Conversation = {
      id: newId,
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newId);
    setMessagesRecord((prev) => ({
      ...prev,
      [newId]: []
    }));
  };

  const selectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const deleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversationId === id) {
      const remaining = conversations.filter((c) => c.id !== id);
      if (remaining.length > 0) {
        setActiveConversationId(remaining[0].id);
      } else {
        createNewChat();
      }
    }
    showToast('Conversation deleted', 'info');
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMsg: ChatMessage = {
      id: 'msg_u_' + Date.now(),
      conversationId: activeConversationId,
      role: 'user',
      content,
      createdAt: new Date().toISOString()
    };

    setMessagesRecord((prev) => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), userMsg]
    }));

    // Update conversation title if it was "New Conversation"
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConversationId && c.title === 'New Conversation') {
          return {
            ...c,
            title: content.slice(0, 32) + (content.length > 32 ? '...' : ''),
            updatedAt: new Date().toISOString()
          };
        }
        return c;
      })
    );

    // Simulate AI response with natural delay
    setIsAiResponding(true);
    setTimeout(() => {
      const aiResponseContent = generateSimulatedAiResponse(content);
      const aiMsg: ChatMessage = {
        id: 'msg_a_' + Date.now(),
        conversationId: activeConversationId,
        role: 'assistant',
        content: aiResponseContent,
        createdAt: new Date().toISOString()
      };

      setMessagesRecord((prev) => ({
        ...prev,
        [activeConversationId]: [...(prev[activeConversationId] || []), aiMsg]
      }));
      setIsAiResponding(false);
    }, 1100);
  };

  // Web Search Simulation
  const executeSearch = (query: string) => {
    if (!query.trim()) return;
    setIsSearching(true);

    setTimeout(() => {
      const simulatedResult: SearchResult = {
        query,
        timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        summary: `Comprehensive synthesis for "${query}": Recent 2026 reports highlight accelerated adoption across commercial industries. Key drivers include increased workflow automation, real-time citation verification, and decentralized creator tooling. Industry analysts project a 42% compound annual growth rate through 2028, with enterprise pilots transitioning into permanent production infrastructure.`,
        sources: [
          {
            id: 's1',
            title: `Global Trends & Technical Analysis: ${query}`,
            url: `https://techinsights-journal.com/reports/${encodeURIComponent(query.slice(0, 20))}`,
            domain: 'techinsights-journal.com',
            snippet: `In-depth investigation detailing operational benchmarks, architecture diagrams, and field performance metrics related to ${query}.`,
            publishedDate: 'Oct 11, 2026'
          },
          {
            id: 's2',
            title: `Executive Whitepaper: Implementing Modern Solutions`,
            url: `https://business-strategy-review.io/insights/${encodeURIComponent(query.slice(0, 15))}`,
            domain: 'business-strategy-review.io',
            snippet: `Case studies demonstrating practical efficiency gains, safety protocols, and implementation timelines.`,
            publishedDate: 'Oct 04, 2026'
          },
          {
            id: 's3',
            title: `Engineering Review & Standards Overview`,
            url: `https://open-standards-consortium.org/docs/2026`,
            domain: 'open-standards-consortium.org',
            snippet: `Formal consensus guidelines, interoperability specifications, and reliability evaluations.`,
            publishedDate: 'Sep 27, 2026'
          }
        ]
      };
      setSearchResult(simulatedResult);
      setIsSearching(false);
      showToast('Search completed with 3 verified sources', 'success');
    }, 1300);
  };

  const clearSearch = () => {
    setSearchResult(null);
  };

  // Content Studio Simulation
  const generateContent = (params: {
    category: ContentCategory;
    format: ContentFormat;
    instructions: string;
    tone: ContentTone;
    length: ContentLength;
  }) => {
    setIsGeneratingContent(true);
    setTimeout(() => {
      const formatTitle = params.format.replace('_', ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
      const mockResult: GeneratedContent = {
        id: 'gen_' + Date.now(),
        title: `${formatTitle}: ${params.instructions.slice(0, 28)}...`,
        category: params.category,
        format: params.format,
        tone: params.tone,
        length: params.length,
        content: generateSimulatedStudioCopy(params),
        wordCount: params.length.includes('150') ? 145 : params.length.includes('500') ? 480 : 890,
        createdAt: new Date().toISOString()
      };
      setGeneratedContent(mockResult);
      setIsGeneratingContent(false);
      showToast('Content successfully drafted!', 'success');
    }, 1200);
  };

  // Library Functions
  const saveToLibrary = (item: Omit<SavedLibraryItem, 'id' | 'createdAt'>) => {
    const newItem: SavedLibraryItem = {
      ...item,
      id: 'lib_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setLibraryItems((prev) => [newItem, ...prev]);
    showToast(`Saved "${newItem.title}" to My Library`, 'success');
  };

  const deleteFromLibrary = (id: string) => {
    setLibraryItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from Library', 'info');
  };

  const toggleUserStatus = (id: string) => {
    setAdminUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const newStatus = u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
          showToast(`User ${u.fullName} is now ${newStatus}`, 'info');
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const activeMessages = messagesRecord[activeConversationId] || [];

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        toggleRole,
        conversations,
        activeConversationId,
        activeMessages,
        isAiResponding,
        createNewChat,
        selectConversation,
        sendMessage,
        deleteConversation,
        searchResult,
        isSearching,
        executeSearch,
        clearSearch,
        generatedContent,
        isGeneratingContent,
        generateContent,
        libraryItems,
        saveToLibrary,
        deleteFromLibrary,
        toasts,
        showToast,
        adminUsers,
        toggleUserStatus,
        setRole,
        auditLogs,
        addAuditLog,
        pricingPlans,
        updatePricingPlan,
        warehouseAssets,
        toggleAssetSaved,
        creatorSubmissions,
        addCreatorSubmission,
        updateCreatorSubmissionStatus,
        seoKeywords,
        addSeoKeyword,
        deleteSeoKeyword,
        businessProjects,
        addBusinessProject,
        brandProfile,
        updateBrandProfile,
        calendarEvents,
        addCalendarEvent,
        integrations,
        toggleIntegrationStatus
      }}
    >
      {children}
      {/* Toast Notification Container */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <span>{toast.type === 'success' ? '✓' : toast.type === 'info' ? 'ℹ' : '⚠'}</span>
            <span>{toast.text}</span>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Helper mock responses
function generateSimulatedAiResponse(prompt: string): string {
  const lower = prompt.toLowerCase();
  if (lower.includes('code') || lower.includes('typescript') || lower.includes('react')) {
    return `Here is a clean implementation pattern for your request:\n\n\`\`\`typescript\n// Example: Type-safe handler in TypeScript\ninterface WorkspaceAction {\n  type: 'SAVE' | 'EXPORT' | 'REFRESH';\n  payload: Record<string, unknown>;\n}\n\nexport const executeAction = async (action: WorkspaceAction) => {\n  console.log('Dispatching action:', action.type);\n  return { success: true, timestamp: Date.now() };\n};\n\`\`\`\n\nThis pattern ensures strict type-checking and prevents invalid dispatch states in your component logic. Let me know if you would like me to expand this with custom hooks!`;
  }
  if (lower.includes('research') || lower.includes('trend') || lower.includes('fact')) {
    return `Based on current analytical data:\n\n1. **Core Insight:** Market validation indicates that creative workflows benefit most from integrated citation verification.\n2. **Actionable Step:** Leverage the **Web Search** tab in Zunme AI to ground this analysis with live external references.\n3. **Recommendation:** Save key conclusions to your **Library** so you can reference them directly when drafting in Content Studio.`;
  }
  return `I have analyzed your prompt: "${prompt}".\n\nHere are three high-impact recommendations you can immediately apply:\n\n- **Focus on Core Objectives:** Clarify the primary user goal before expanding into edge scenarios.\n- **Maintain High Contrast & Clarity:** Clear visual hierarchy and concise copy drive significantly higher engagement.\n- **Iterate in Small Steps:** Validate each building block before connecting complex multi-step pipelines.\n\nWould you like me to elaborate on any of these points or prepare a draft format for you?`;
}

function generateSimulatedStudioCopy(params: {
  category: ContentCategory;
  format: ContentFormat;
  instructions: string;
  tone: ContentTone;
  length: ContentLength;
}): string {
  if (params.format === 'EMAIL_NEWSLETTER') {
    return `Subject: Important Update: ${params.instructions.slice(0, 36)}\n\nHey there,\n\nWe are excited to share some big news regarding ${params.instructions}.\n\nOver the past few weeks, our team has been working hard behind the scenes to deliver a better, faster, and more seamless experience. Here is what this means for you:\n\n- **Immediate Time Savings:** Automate repetitive drafting tasks.\n- **Unmatched Precision:** Real-time data verification built into every workflow.\n- **Tailored Results:** Formatted specifically for your unique audience.\n\nReady to get started? Check it out today and let us know what you think.\n\nBest regards,\n**The Team**`;
  }
  if (params.format === 'BLOG_OUTLINE') {
    return `# Comprehensive Guide: ${params.instructions}\n\n## 1. Introduction & Context\n- Hook: Why this topic matters right now\n- Defining the problem space\n- Who benefits most from this approach\n\n## 2. Key Challenges & Common Misconceptions\n- Outdated practices that hold creators back\n- The hidden cost of fragmented tools\n\n## 3. Step-by-Step Implementation Framework\n- Phase 1: Planning and research discovery\n- Phase 2: Draft synthesis and structural outlining\n- Phase 3: Final refinement, fact verification, and distribution\n\n## 4. Key Takeaways & Call to Action\n- Summary checklist\n- Recommended next steps for readers`;
  }
  if (params.format === 'SOCIAL_CAPTION') {
    return `🚀 Big shift happening in creative productivity:\n\n"${params.instructions}"\n\nMost people spend 70% of their time researching and only 30% creating. By unifying verified search with intelligent drafting, you flip the script.\n\n3 lessons we learned:\n1. Never guess when you can cite live sources.\n2. Templates save hours, but personalized tone builds trust.\n3. Save your best ideas to a single library.\n\nDrop your thoughts below 👇 #Productivity #Creators #AIWorkspace #Tech`;
  }
  return `### Draft Content: ${params.instructions}\n\nTone: ${params.tone} | Target: ${params.length}\n\nEffective execution requires clear alignment between high-level strategy and daily execution. When approaching "${params.instructions}", always start with the audience's most urgent pain point.\n\nBy maintaining a structured workflow—from initial research to synthesis and storage—creators and teams can produce higher quality output in half the time.`;
}
