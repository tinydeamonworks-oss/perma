import React, { useState } from 'react';
import logoImg from '../assets/images/prema_fireworks_logo.jpeg';
import { ShoppingBag, Phone, MessageSquare, Search, FileText, MapPin, Sparkles, X } from 'lucide-react';

interface NavbarProps {
  totalItems: number;
  totalAmount: number;
  onOpenCart: () => void;
  onOpenEstimate: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  categories: { id: string; name: string; tamilName: string }[];
}

export const Navbar: React.FC<NavbarProps> = ({
  totalItems,
  totalAmount,
  onOpenCart,
  onOpenEstimate,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
}) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full shadow-lg" id="main-header">
      {/* Top Festive Announcement Bar */}
      <div className="bg-red-900 text-white text-xs py-1.5 px-3 border-b border-red-950/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-amber-400 text-red-950 font-black px-1.5 py-0.5 rounded text-[10px] uppercase">
              DIRECT FACTORY PRICE
            </span>
            <span className="font-medium text-[11px] sm:text-xs opacity-95">
              Direct Sivakasi Factory Showroom Prices in Tirunelveli • Free Gift Box on orders above ₹3,000!
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs font-medium ml-auto">
            <div className="hidden sm:flex items-center gap-1 opacity-90">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>Maya Bazaar Pyro Park, Tirunelveli</span>
            </div>
            <a
              href="tel:8903425983"
              className="flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-lg border border-white/20 text-white font-bold transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-300" />
              <span>8903425983</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-red-700 text-white p-3 sm:px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Showroom Title */}
          <a href="#" className="hover:opacity-95 transition-opacity flex items-center gap-3" id="nav-brand-link">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-amber-300 shadow-md shrink-0 bg-slate-950 overflow-hidden flex items-center justify-center p-0.5">
              <img
                src={logoImg}
                alt="Prema Fireworks Logo"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black tracking-tight uppercase leading-none text-white font-['Cinzel',serif]">
                  Prema Fireworks
                </h1>
                <span className="hidden sm:inline-block bg-amber-400 text-red-950 text-[10px] font-black uppercase px-1.5 py-0.5 rounded shadow-2xs">
                  Exclusive
                </span>
              </div>
              <p className="text-[10px] sm:text-xs font-semibold text-amber-200 mt-0.5 tracking-wide">
                Light Up Your Celebrations • Tirunelveli Showroom
              </p>
            </div>
          </a>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative" id="desktop-search-container">
            <input
              type="text"
              placeholder="Search sparklers, flower pots, rockets, sky shots..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white text-slate-800 placeholder-slate-400 text-sm rounded-xl pl-10 pr-9 py-2 border border-red-800 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all shadow-inner"
              id="desktop-search-input"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3" id="nav-actions">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2 rounded-xl bg-white/15 text-white border border-white/20 hover:bg-white/25"
              aria-label="Toggle search"
              id="mobile-search-toggle"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* WhatsApp Quick Link */}
            <a
              href="https://wa.me/918903425983?text=Hi%20Prema%20Fireworks%2C%20I%20would%20like%20to%20know%20more%20about%20fireworks%20and%20offers."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow transition-colors border border-emerald-400/40"
              id="nav-whatsapp-btn"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-100" />
              <span>WhatsApp Us</span>
            </a>

            {/* Instant Quotation / Price Estimate View */}
            <button
              onClick={onOpenEstimate}
              className="hidden sm:flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl text-xs font-semibold border border-white/20 transition-all shadow-sm"
              id="nav-estimate-btn"
              title="View Price Estimate Quotation"
            >
              <FileText className="w-3.5 h-3.5 text-amber-300" />
              <span>Estimate Sheet</span>
            </button>

            {/* Sleek Cart Widget */}
            <button
              onClick={onOpenCart}
              className="bg-white/10 hover:bg-white/20 p-2 sm:px-3 sm:py-2 rounded-xl border border-white/20 flex items-center gap-3 transition-all cursor-pointer active:scale-95 text-left"
              id="nav-cart-btn"
            >
              <div className="relative">
                <ShoppingBag className="w-6 h-6 text-white" />
                <span className="absolute -top-2 -right-2 bg-amber-400 text-red-950 text-[10px] font-black px-1.5 py-0.2 rounded-full min-w-[18px] text-center shadow">
                  {totalItems}
                </span>
              </div>
              <div className="text-xs hidden sm:block">
                <p className="opacity-80 text-[10px] uppercase font-bold tracking-tight">My Cart</p>
                <p className="font-black text-sm text-amber-300">₹ {totalAmount.toLocaleString('en-IN')}</p>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {mobileSearchOpen && (
          <div className="mt-2.5 pt-2 border-t border-white/20 md:hidden relative" id="mobile-search-box">
            <input
              type="text"
              placeholder="Search all crackers (e.g. sparklers, rockets)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white text-slate-900 placeholder-slate-400 text-sm rounded-xl pl-10 pr-9 py-2 border border-white focus:outline-none"
              autoFocus
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Sleek Category Filter Chips Bar */}
      <div className="bg-white border-b border-slate-200 px-3 sm:px-6 py-2.5 overflow-x-auto no-scrollbar shadow-sm" id="category-scroll-bar">
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-red-50 text-red-700 border-red-200 font-bold shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200 font-medium'
                }`}
                id={`cat-pill-${cat.id}`}
              >
                {cat.id === 'all' && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                <span>{cat.name}</span>
                <span className={`text-[10px] ${isSelected ? 'text-red-700 font-bold' : 'text-slate-400'}`}>
                  • {cat.tamilName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

