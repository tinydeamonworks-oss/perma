import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FestiveOffers } from './components/FestiveOffers';
import { ProductCard } from './components/ProductCard';
import { ProductTable } from './components/ProductTable';
import { CartDrawer } from './components/CartDrawer';
import { EstimateModal } from './components/EstimateModal';
import { StoreLocation } from './components/StoreLocation';
import { SafetyGuidelines } from './components/SafetyGuidelines';
import { Footer } from './components/Footer';
import { PRODUCTS, CATEGORIES, OFFER_MILESTONES } from './data/products';
import { Product, CartItem, CustomerOrderInfo } from './types';
import { LayoutGrid, Table, ShoppingBag, ArrowUpRight, Flame, Percent, FileText, Search, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Cart state: productId -> quantity
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('prema_cart_state');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'discount'>('featured');
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [estimateModalOpen, setEstimateModalOpen] = useState<boolean>(false);

  const [customerInfo, setCustomerInfo] = useState<CustomerOrderInfo>(() => {
    try {
      const saved = localStorage.getItem('prema_customer_info');
      return saved ? JSON.parse(saved) : { name: '', phone: '', place: '', notes: '' };
    } catch {
      return { name: '', phone: '', place: '', notes: '' };
    }
  });

  // Save cart to local storage for persistence during browsing
  useEffect(() => {
    try {
      localStorage.setItem('prema_cart_state', JSON.stringify(cartQuantities));
    } catch {}
  }, [cartQuantities]);

  // Save customer info
  useEffect(() => {
    try {
      localStorage.setItem('prema_customer_info', JSON.stringify(customerInfo));
    } catch {}
  }, [customerInfo]);

  // Cart item objects
  const cartItems: CartItem[] = useMemo(() => {
    return (Object.entries(cartQuantities) as [string, number][])
      .filter(([_, qty]) => typeof qty === 'number' && qty > 0)
      .map(([id, qty]) => {
        const product = PRODUCTS.find((p) => p.id === id);
        return product ? { product, quantity: qty } : null;
      })
      .filter((item): item is CartItem => item !== null);
  }, [cartQuantities]);

  // Totals calculations
  const totalItems = useMemo(() => {
    return (Object.values(cartQuantities) as number[]).reduce((sum: number, q: number) => sum + (q || 0), 0);
  }, [cartQuantities]);

  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const totalMrp = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0);
  }, [cartItems]);

  const totalSavings = totalMrp - totalAmount;

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      const matchesCat = selectedCategory === 'all' || product.category === selectedCategory;

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.tamilName.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      // Default: featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Quantity updates
  const handleUpdateQuantity = (productId: string, newQty: number) => {
    setCartQuantities((prev) => {
      const updated = { ...prev };
      if (newQty <= 0) {
        delete updated[productId];
      } else {
        updated[productId] = newQty;
      }
      return updated;
    });
  };

  const handleAddToCart = (product: Product, qty: number = 1) => {
    setCartQuantities((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + qty,
    }));
  };

  const handleClearCart = () => {
    setCartQuantities({});
  };

  const handleQuickOrderScroll = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleTableMode = () => {
    setViewMode('table');
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-red-600 selection:text-white overflow-x-hidden w-full">
      {/* Top Navigation */}
      <Navbar
        totalItems={totalItems}
        totalAmount={totalAmount}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenEstimate={() => setEstimateModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={CATEGORIES}
      />

      {/* Hero Showcase with store banner theme */}
      <HeroBanner
        onQuickOrderClick={handleQuickOrderScroll}
        onViewPriceList={handleToggleTableMode}
      />

      {/* Realtime Festive Free Gifts / Rewards Milestones bar */}
      <FestiveOffers
        currentTotal={totalAmount}
        milestones={OFFER_MILESTONES}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {/* Main Catalog Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8" id="catalog-section">
        {/* Controls Header: Active Category, View Mode Toggle, Count, Sorting */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-red-50 text-red-700 border border-red-100">
                <Flame className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
                  {CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Product Catalog'}
                </h2>
                <p className="text-xs text-slate-500 font-bold">
                  {CATEGORIES.find((c) => c.id === selectedCategory)?.tamilName} • {filteredProducts.length} items available
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Toggle: Price List Table FIRST, then Visual Grid */}
            <div className="flex items-center bg-white rounded-xl p-1 border border-slate-200 shadow-2xs">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors uppercase tracking-wider ${
                  viewMode === 'table'
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Wholesale Table View (ElephantCracker Style)"
              >
                <Table className="w-3.5 h-3.5" />
                <span>Wholesale Table</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors uppercase tracking-wider ${
                  viewMode === 'grid'
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Card Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid View</span>
              </button>
            </div>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white text-slate-700 text-xs rounded-xl px-3 py-2 border border-slate-200 focus:outline-none focus:border-red-700 font-bold shadow-2xs"
            >
              <option value="featured">⭐ Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>
        </div>

        {/* Search status tag if searching */}
        {searchQuery && (
          <div className="my-4 flex items-center justify-between bg-red-50/70 border border-red-200 rounded-xl p-3 text-xs text-red-950">
            <span>
              Showing results for: <strong>"{searchQuery}"</strong> ({filteredProducts.length} items found)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-red-700 hover:text-red-900 underline font-bold"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Product Display Area */}
        <div className="mt-6">
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No products found matching your search</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try searching for another term like "sparklers", "pots", "shots", "bomb", or select "All Products".
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl uppercase tracking-wider"
              >
                Reset Catalog
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantityInCart={cartQuantities[product.id] || 0}
                  onUpdateQuantity={handleUpdateQuantity}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <ProductTable
              products={filteredProducts}
              cartQuantities={cartQuantities}
              onUpdateQuantity={handleUpdateQuantity}
            />
          )}
        </div>
      </main>

      {/* Showroom Physical Store Location & Info Section */}
      <StoreLocation />

      {/* Safe Celebration & Green Fireworks Guidelines */}
      <SafetyGuidelines />

      {/* Comprehensive Footer */}
      <Footer
        onSelectCategory={(id) => {
          setSelectedCategory(id);
          handleQuickOrderScroll();
        }}
        onOpenEstimate={() => setEstimateModalOpen(true)}
        categories={CATEGORIES}
      />

      {/* Cart Side-Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onOpenEstimate={() => {
          setCartDrawerOpen(false);
          setEstimateModalOpen(true);
        }}
        milestones={OFFER_MILESTONES}
        customerInfo={customerInfo}
        onCustomerInfoChange={setCustomerInfo}
      />

      {/* Printable Estimate Quotation Modal */}
      <EstimateModal
        isOpen={estimateModalOpen}
        onClose={() => setEstimateModalOpen(false)}
        cartItems={cartItems}
        customerInfo={customerInfo}
        milestones={OFFER_MILESTONES}
      />

      {/* Mobile Sticky Floating Cart Bottom Bar */}
      {totalItems > 0 && (
        <div
          className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:w-auto z-40 animate-slideUp"
          id="sticky-mobile-cart-bar"
        >
          <div className="bg-slate-900 border border-slate-700 p-3 sm:px-5 rounded-2xl shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-xl bg-red-700 text-white font-black">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 animate-bounce">
                  {totalItems}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block leading-none">
                  Cart Total ({totalItems} items)
                </span>
                <span className="text-base sm:text-lg font-black text-white">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-green-400 font-bold block sm:inline sm:ml-2">
                  (Saved ₹{totalSavings.toLocaleString('en-IN')})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEstimateModalOpen(true)}
                className="hidden sm:flex bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl text-xs font-bold border border-slate-700 items-center gap-1 uppercase tracking-wider"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Estimate</span>
              </button>

              <button
                onClick={() => setCartDrawerOpen(true)}
                className="bg-red-700 hover:bg-red-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95 transition-transform uppercase tracking-wider"
                id="floating-view-cart-btn"
              >
                <span>View Cart</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
