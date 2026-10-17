import React, { useState, useMemo } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {
  Store,
  Package,
  Plus,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Eye,
  Edit3,
  Trash2,
  Megaphone,
  ArrowRight,
  BarChart2,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  ShoppingBag,
  HelpCircle,
  X,
  Sliders,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './MerchantZonePage.css';

export interface MerchantProduct {
  id: string;
  sku: string;
  title: string;
  category: 'AI Content' | 'Animation' | 'Cartoon' | 'Images / Photos' | 'Videos / AI Videos' | 'AI Builder' | 'General Goods';
  price: number;
  inventory: number;
  status: 'ACTIVE_ORGANIC' | 'ACTIVE_BOOSTED' | 'DRAFT';
  views: number;
  sales: number;
  imageUrl: string;
  description: string;
  createdAt: string;
}

const INITIAL_MERCHANT_PRODUCTS: MerchantProduct[] = [
  {
    id: 'prod-101',
    sku: 'ZUN-AIC-001',
    title: 'Enterprise B2B Lead-Gen & Copywriting Pack',
    category: 'AI Content',
    price: 29.0,
    inventory: 999,
    status: 'ACTIVE_BOOSTED',
    views: 8420,
    sales: 142,
    imageUrl: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=300&q=80',
    description: '45-module prompt framework for executive thought leadership and cold outbound sequences.',
    createdAt: '2026-09-15'
  },
  {
    id: 'prod-102',
    sku: 'ZUN-ANM-002',
    title: 'Cyberpunk Tech HUD & UI Motion Graphic Assets',
    category: 'Animation',
    price: 39.0,
    inventory: 999,
    status: 'ACTIVE_ORGANIC',
    views: 3120,
    sales: 48,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=300&q=80',
    description: 'Futuristic sci-fi heads-up display motion graphics with alpha channel transparency.',
    createdAt: '2026-08-20'
  },
  {
    id: 'prod-103',
    sku: 'ZUN-IMG-003',
    title: 'Hyper-Realistic Studio Product Podiums & Backdrops',
    category: 'Images / Photos',
    price: 35.0,
    inventory: 999,
    status: 'ACTIVE_BOOSTED',
    views: 12400,
    sales: 230,
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=300&q=80',
    description: '8K photorealistic marble and minimalist podium environments tailored for e-commerce mockups.',
    createdAt: '2026-07-29'
  },
  {
    id: 'prod-104',
    sku: 'ZUN-BLD-004',
    title: 'Autonomous Competitor Price Scraper & Alert Agent',
    category: 'AI Builder',
    price: 59.0,
    inventory: 999,
    status: 'ACTIVE_ORGANIC',
    views: 4890,
    sales: 85,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=300&q=80',
    description: 'Autonomous agent that monitors competitor prices and triggers instant price-drop webhook notifications.',
    createdAt: '2026-09-05'
  },
  {
    id: 'prod-105',
    sku: 'ZUN-CRT-005',
    title: 'Friendly Tech Mascot 3D Cartoon Expressions',
    category: 'Cartoon',
    price: 0,
    inventory: 999,
    status: 'ACTIVE_ORGANIC',
    views: 6200,
    sales: 410,
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80',
    description: 'Free onboarding mascot expressions with Blender project files and transparent PNGs.',
    createdAt: '2026-09-18'
  }
];

export const MerchantZonePage: React.FC = () => {
  const { showToast } = useApp();
  const navigate = useNavigate();
  const { section } = useParams<{ section?: string }>();

  type MerchantTab = 'overview' | 'listings' | 'feed-upload' | 'visibility-ads' | 'analytics';

  const [activeTab, setActiveTab] = useState<MerchantTab>(() => {
    if (section && ['overview', 'listings', 'feed-upload', 'visibility-ads', 'analytics'].includes(section.toLowerCase())) {
      return section.toLowerCase() as MerchantTab;
    }
    return 'overview';
  });

  const [products, setProducts] = useState<MerchantProduct[]>(INITIAL_MERCHANT_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<MerchantProduct | null>(null);

  // Form Fields
  const [formSku, setFormSku] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<MerchantProduct['category']>('AI Content');
  const [formPrice, setFormPrice] = useState<number>(19.0);
  const [formInventory, setFormInventory] = useState<number>(100);
  const [formStatus, setFormStatus] = useState<MerchantProduct['status']>('ACTIVE_ORGANIC');
  const [formDescription, setFormDescription] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');

  // Feed Upload Simulation State
  const [feedUrl, setFeedUrl] = useState('');
  const [feedUploading, setFeedUploading] = useState(false);
  const [feedParsedCount, setFeedParsedCount] = useState<number | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.sku.toLowerCase().includes(q)) return false;
      }
      if (filterCategory !== 'All' && p.category !== filterCategory) return false;
      if (filterStatus !== 'All' && p.status !== filterStatus) return false;
      return true;
    });
  }, [products, searchQuery, filterCategory, filterStatus]);

  // Handle open modal
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormSku(`ZUN-${Math.random().toString(36).substring(2, 6).toUpperCase()}-00${products.length + 1}`);
    setFormTitle('');
    setFormCategory('AI Content');
    setFormPrice(25.0);
    setFormInventory(500);
    setFormStatus('ACTIVE_ORGANIC');
    setFormDescription('');
    setFormImageUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: MerchantProduct) => {
    setEditingProduct(p);
    setFormSku(p.sku);
    setFormTitle(p.title);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormInventory(p.inventory);
    setFormStatus(p.status);
    setFormDescription(p.description);
    setFormImageUrl(p.imageUrl);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showToast('Please provide a valid product title.', 'error');
      return;
    }

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? {
        ...p,
        sku: formSku,
        title: formTitle,
        category: formCategory,
        price: Number(formPrice),
        inventory: Number(formInventory),
        status: formStatus,
        description: formDescription,
        imageUrl: formImageUrl || p.imageUrl
      } : p));
      showToast(`Product "${formTitle}" updated successfully.`, 'success');
    } else {
      const newProd: MerchantProduct = {
        id: `prod-${Date.now()}`,
        sku: formSku || `SKU-${Date.now().toString().slice(-4)}`,
        title: formTitle,
        category: formCategory,
        price: Number(formPrice),
        inventory: Number(formInventory),
        status: formStatus,
        views: 0,
        sales: 0,
        imageUrl: formImageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
        description: formDescription,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProducts(prev => [newProd, ...prev]);
      showToast(`Product "${formTitle}" added to merchant inventory.`, 'success');
    }
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product listing removed from catalog.', 'info');
  };

  const handleToggleBoost = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'ACTIVE_BOOSTED' ? 'ACTIVE_ORGANIC' : 'ACTIVE_BOOSTED';
        showToast(
          nextStatus === 'ACTIVE_BOOSTED'
            ? `Shopping ad boost enabled for ${p.title}.`
            : `Listing reverted to standard organic distribution.`,
          'success'
        );
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const handleSimulateFeedUpload = () => {
    setFeedUploading(true);
    setTimeout(() => {
      setFeedUploading(false);
      setFeedParsedCount(28);
      showToast('Product feed parsed: 28 items verified against Zunme Store schema.', 'success');
    }, 1200);
  };

  return (
    <div className="merchant-page-container">
      {/* Top Banner */}
      <div className="merchant-header-banner">
        <div className="merchant-header-info">
          <div className="merchant-header-icon">
            <Store size={26} />
          </div>
          <div>
            <h1 className="merchant-header-title">Zunme Merchant Zone</h1>
            <p className="merchant-header-subtitle">
              Manage digital store listings, sync catalog feeds, and amplify visibility across Zunme Search &amp; MPA Shopping Ads.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleOpenAddModal}
          >
            <Plus size={16} />
            <span>Add New Product</span>
          </button>
          <NavLink to="/store" className="btn btn-outline" style={{ textDecoration: 'none' }}>
            <ShoppingBag size={15} />
            <span>View Public Store</span>
          </NavLink>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="merchant-nav-tabs">
        <button
          type="button"
          className={`merchant-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart2 size={16} />
          <span>Overview</span>
        </button>

        <button
          type="button"
          className={`merchant-tab-btn ${activeTab === 'listings' ? 'active' : ''}`}
          onClick={() => setActiveTab('listings')}
        >
          <Package size={16} />
          <span>Product Listings ({products.length})</span>
        </button>

        <button
          type="button"
          className={`merchant-tab-btn ${activeTab === 'feed-upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('feed-upload')}
        >
          <UploadCloud size={16} />
          <span>Product Feed &amp; Import</span>
        </button>

        <button
          type="button"
          className={`merchant-tab-btn ${activeTab === 'visibility-ads' ? 'active' : ''}`}
          onClick={() => setActiveTab('visibility-ads')}
        >
          <Megaphone size={16} />
          <span>Visibility &amp; Shopping Ads</span>
        </button>

        <button
          type="button"
          className={`merchant-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <TrendingUp size={16} />
          <span>Sales &amp; Analytics (Demo)</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* KPI Summary Cards */}
          <div className="merchant-kpi-grid">
            <div className="merchant-kpi-card">
              <div className="merchant-kpi-header">
                <span className="merchant-kpi-label">Active Listings</span>
                <div className="merchant-kpi-icon-wrap" style={{ background: '#ECFDF5', color: '#059669' }}>
                  <Package size={17} />
                </div>
              </div>
              <div className="merchant-kpi-value">{products.filter(p => p.status !== 'DRAFT').length}</div>
              <div className="merchant-kpi-subtext" style={{ color: '#059669' }}>
                <CheckCircle2 size={13} />
                <span>Synchronized with Store</span>
              </div>
            </div>

            <div className="merchant-kpi-card">
              <div className="merchant-kpi-header">
                <span className="merchant-kpi-label">Shopping Ad Boosted</span>
                <div className="merchant-kpi-icon-wrap" style={{ background: '#F3E8FF', color: '#7E22CE' }}>
                  <Megaphone size={17} />
                </div>
              </div>
              <div className="merchant-kpi-value">{products.filter(p => p.status === 'ACTIVE_BOOSTED').length}</div>
              <div className="merchant-kpi-subtext">
                <span>Featured placement in Zunme Search</span>
              </div>
            </div>

            <div className="merchant-kpi-card">
              <div className="merchant-kpi-header">
                <span className="merchant-kpi-label">Total Catalog Views</span>
                <div className="merchant-kpi-icon-wrap" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                  <Eye size={17} />
                </div>
              </div>
              <div className="merchant-kpi-value">
                {products.reduce((acc, p) => acc + p.views, 0).toLocaleString()}
              </div>
              <div className="merchant-kpi-subtext" style={{ color: '#0284C7' }}>
                <TrendingUp size={13} />
                <span>+24.8% organic growth</span>
              </div>
            </div>

            <div className="merchant-kpi-card">
              <div className="merchant-kpi-header">
                <span className="merchant-kpi-label">Gross Revenue (Demo)</span>
                <div className="merchant-kpi-icon-wrap" style={{ background: '#FEF3C7', color: '#D97706' }}>
                  <DollarSign size={17} />
                </div>
              </div>
              <div className="merchant-kpi-value">
                ${products.reduce((acc, p) => acc + (p.price * p.sales), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="merchant-kpi-subtext">
                <span>515 total orders fulfilled</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Educational Callout */}
          <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                Free Organic Placement vs. Paid Shopping Ads
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', maxWidth: '720px' }}>
                All approved products are automatically indexed organically in the Zunme Store at zero cost. To feature your items at the top of AI Search queries and across the Zunme Display Network, activate a Shopping Ad Boost.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setActiveTab('feed-upload')}
              >
                <UploadCloud size={15} />
                <span>Sync Feed</span>
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setActiveTab('visibility-ads')}
              >
                <Megaphone size={15} />
                <span>Shopping Ads Manager</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT LISTINGS MANAGEMENT */}
      {activeTab === 'listings' && (
        <div>
          {/* Table Controls */}
          <div className="merchant-table-controls">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '260px', maxWidth: '420px' }}>
              <div className="store-search-box" style={{ width: '100%' }}>
                <Search size={15} color="var(--color-text-muted)" />
                <input
                  type="text"
                  placeholder="Search products by title or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <select
                className="store-sort-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="AI Content">AI Content</option>
                <option value="Animation">Animation</option>
                <option value="Cartoon">Cartoon</option>
                <option value="Images / Photos">Images / Photos</option>
                <option value="Videos / AI Videos">Videos / AI Videos</option>
                <option value="AI Builder">AI Builder</option>
              </select>

              <select
                className="store-sort-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="ACTIVE_ORGANIC">Organic Active</option>
                <option value="ACTIVE_BOOSTED">Boosted (Shopping Ads)</option>
                <option value="DRAFT">Draft</option>
              </select>

              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleOpenAddModal}
              >
                <Plus size={14} />
                <span>New Item</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="merchant-table-wrap">
            <table className="merchant-table">
              <thead>
                <tr>
                  <th>Product Details</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status &amp; Visibility</th>
                  <th>Views / Sales</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
                      No product listings match your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                          />
                          <div>
                            <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-primary)' }}>
                              {p.title}
                            </strong>
                            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                              Added: {p.createdAt}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <code style={{ fontSize: '11px', background: '#F1F5F9', padding: '3px 6px', borderRadius: '4px' }}>
                          {p.sku}
                        </code>
                      </td>
                      <td>
                        <span className="badge badge-primary" style={{ fontSize: '11px' }}>{p.category}</span>
                      </td>
                      <td>
                        <strong style={{ fontSize: '14px', color: 'var(--color-primary)' }}>
                          {p.price === 0 ? 'FREE' : `$${p.price.toFixed(2)}`}
                        </strong>
                      </td>
                      <td>
                        {p.status === 'ACTIVE_BOOSTED' ? (
                          <span className="status-pill boosted" title="Promoted via Shopping Ads on Zunme Search">
                            <Megaphone size={11} /> Boosted
                          </span>
                        ) : p.status === 'ACTIVE_ORGANIC' ? (
                          <span className="status-pill active" title="Free organic listing in Store">
                            <CheckCircle2 size={11} /> Organic Free
                          </span>
                        ) : (
                          <span className="status-pill draft">Draft</span>
                        )}
                      </td>
                      <td>
                        <div style={{ fontSize: '12px' }}>
                          <div><Eye size={12} style={{ display: 'inline', marginRight: '4px' }} />{p.views.toLocaleString()} views</div>
                          <div style={{ color: '#059669', fontWeight: 600 }}>{p.sales} sales</div>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            type="button"
                            className={`btn btn-sm ${p.status === 'ACTIVE_BOOSTED' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => handleToggleBoost(p.id)}
                            title={p.status === 'ACTIVE_BOOSTED' ? 'Remove Ad Boost' : 'Boost with Shopping Ad'}
                            style={{ padding: '6px 10px', fontSize: '12px' }}
                          >
                            <Megaphone size={13} />
                            <span>{p.status === 'ACTIVE_BOOSTED' ? 'Boosted' : 'Boost'}</span>
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-ghost"
                            onClick={() => handleOpenEditModal(p)}
                            title="Edit Product"
                            style={{ padding: '6px' }}
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-ghost"
                            onClick={() => handleDeleteProduct(p.id)}
                            title="Delete"
                            style={{ padding: '6px', color: '#E11D48' }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCT FEED & UPLOAD */}
      {activeTab === 'feed-upload' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <UploadCloud size={18} color="var(--color-primary)" />
                Automated Product Feed Ingestion
              </div>
              <span className="badge badge-primary">Catalog Sync</span>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '18px' }}>
              Upload your digital goods catalog using standard CSV, XML, or connect a remote feed URL. Products will be automatically indexed into your Merchant Zone inventory.
            </p>

            <div className="merchant-feed-dropzone" onClick={handleSimulateFeedUpload}>
              <FileSpreadsheet size={42} color="var(--color-primary)" style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                {feedUploading ? 'Parsing Product Feed File...' : 'Click or Drag & Drop Product Feed (CSV, TSV, XML)'}
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', maxWidth: '440px', margin: '0 auto 14px' }}>
                Supports Zunme Store specification, Google Merchant Center Feed, and Shopify Product Export formats.
              </p>
              <button type="button" className="btn btn-outline btn-sm" disabled={feedUploading}>
                {feedUploading ? <RefreshCw size={14} className="spin" /> : <UploadCloud size={14} />}
                <span>{feedUploading ? 'Processing...' : 'Browse Local Files'}</span>
              </button>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                Or Connect Remote Feed URL (Shopify / WooCommerce / Custom Endpoint)
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="url"
                  className="input-field"
                  placeholder="https://yourstore.com/feeds/zunme-catalog.xml"
                  value={feedUrl}
                  onChange={(e) => setFeedUrl(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSimulateFeedUpload}
                  disabled={feedUploading}
                >
                  <RefreshCw size={14} className={feedUploading ? 'spin' : ''} />
                  <span>Sync Remote Feed</span>
                </button>
              </div>
            </div>

            {feedParsedCount !== null && (
              <div style={{ marginTop: '16px', padding: '12px 16px', background: '#ECFDF5', border: '1px solid rgba(5, 150, 105, 0.25)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '10px', color: '#059669', fontSize: '13px' }}>
                <CheckCircle2 size={16} />
                <span>
                  Feed successfully ingested: <strong>{feedParsedCount} items</strong> verified and added to draft inventory.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: VISIBILITY & SHOPPING ADS */}
      {activeTab === 'visibility-ads' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="cards-grid-2">
            <div className="glass-panel">
              <div className="panel-header">
                <div className="panel-title">
                  <CheckCircle2 size={18} color="#059669" />
                  Organic Free Listing Program
                </div>
                <span className="badge badge-success">Active</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
                Your approved catalog items are presented to customers browsing the Zunme Store and relevant AI search queries at zero cost.
              </p>
              <ul style={{ fontSize: '13px', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '18px' }}>
                <li>Zero listing or hosting fees for verified accounts.</li>
                <li>Indexed across standard search queries and categories.</li>
                <li>Direct checkout and instant digital delivery.</li>
              </ul>
            </div>

            <div className="glass-panel" style={{ border: '1px solid rgba(168, 85, 247, 0.4)' }}>
              <div className="panel-header">
                <div className="panel-title">
                  <Megaphone size={18} color="#A855F7" />
                  Zunme Shopping Ads &amp; Search Promotion
                </div>
                <span className="badge badge-primary">High Reach</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
                Drive 4.5x more buyers to your listings with keyword-triggered Shopping Ads across Zunme Search and the Multi-Platform Advertising (MPA) network.
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <NavLink to="/ads/create-campaign" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                  <Megaphone size={15} />
                  <span>Launch Shopping Campaign</span>
                </NavLink>
                <NavLink to="/ads/onboarding" className="btn btn-outline" style={{ textDecoration: 'none' }}>
                  <span>7-Step Ad Setup Wizard</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ANALYTICS (DEMO) */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <BarChart2 size={18} color="var(--color-primary)" />
                Merchant Performance Insights (Prototype Demo)
              </div>
              <span className="badge badge-primary">Last 30 Days</span>
            </div>

            <div style={{ padding: '10px 14px', background: '#FEF3E2', border: '1px solid rgba(217, 119, 6, 0.25)', borderRadius: 'var(--radius-md)', fontSize: '12px', color: '#B45309', marginBottom: '16px' }}>
              <strong>Demo Environment:</strong> Metrics reflect simulated marketplace traffic for prototyping and catalog validation.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'var(--color-bg-alt)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 700 }}>Organic vs Boosted Views</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                  <div style={{ flex: 1, background: '#E2E8F0', height: '10px', borderRadius: '5px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: '62%', background: '#059669' }} title="Organic: 62%" />
                    <div style={{ width: '38%', background: '#A855F7' }} title="Shopping Ads: 38%" />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '6px', color: 'var(--color-text-secondary)' }}>
                  <span>Organic (62%)</span>
                  <span>Paid Boost (38%)</span>
                </div>
              </div>

              <div style={{ background: 'var(--color-bg-alt)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 700 }}>Conversion Rate</span>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary)', marginTop: '8px' }}>
                  3.84%
                </div>
                <span style={{ fontSize: '12px', color: '#059669' }}>+0.42% above store benchmark</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="store-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="store-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="store-modal-header">
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>
                {editingProduct ? 'Edit Product Listing' : 'Add New Product to Merchant Zone'}
              </h3>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setIsModalOpen(false)}
                style={{ padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="store-modal-body">
              <div className="merchant-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Product Title *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. 3D Character Model Rig Pack"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    SKU Identifier
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="merchant-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Store Category *
                  </label>
                  <select
                    className="input-field"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                  >
                    <option value="AI Content">AI Content</option>
                    <option value="Animation">Animation</option>
                    <option value="Cartoon">Cartoon</option>
                    <option value="Images / Photos">Images / Photos</option>
                    <option value="Videos / AI Videos">Videos / AI Videos</option>
                    <option value="AI Builder">AI Builder</option>
                    <option value="General Goods">General Goods</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Price ($ USD) — Enter 0 for Free *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    className="input-field"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Listing Distribution Mode
                </label>
                <select
                  className="input-field"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as any)}
                >
                  <option value="ACTIVE_ORGANIC">Organic Free (Standard Store Index)</option>
                  <option value="ACTIVE_BOOSTED">Boosted (Shopping Ads + Priority Search)</option>
                  <option value="DRAFT">Draft (Unpublished)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Thumbnail Image URL
                </label>
                <input
                  type="url"
                  className="input-field"
                  placeholder="https://images.unsplash.com/..."
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Product Description &amp; Usage Rights
                </label>
                <textarea
                  className="input-field"
                  style={{ minHeight: '80px' }}
                  placeholder="Describe your digital asset, file formats, and commercial usage guidelines..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={15} />
                  <span>{editingProduct ? 'Save Changes' : 'Create Listing'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
