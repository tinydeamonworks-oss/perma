import React from 'react';
import { Sparkles, MapPin, Phone, MessageSquare, ShieldCheck, Flame, Gift, Percent } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeroBannerProps {
  onQuickOrderClick: () => void;
  onViewPriceList: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onQuickOrderClick,
  onViewPriceList,
}) => {
  return (
    <section className="bg-slate-50 py-6 px-4 sm:px-6" id="hero-banner-section">
      <div className="max-w-7xl mx-auto">
        {/* Sleek Hero Banner Container */}
        <div
          id="exclusive-showroom-banner-card"
          className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg p-6 sm:p-8 text-white"
        >
          {/* Subtle Glows */}
          <div className="absolute right-[-20px] top-[-20px] w-80 h-80 bg-red-600/20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute left-[-20px] bottom-[-20px] w-64 h-64 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Content / Showroom Details */}
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              {/* Exclusive Showroom Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Exclusive Showroom • Direct Factory Rates</span>
              </div>

              {/* Title / Store Name */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase font-['Cinzel',serif] leading-tight">
                Prema Fireworks
              </h1>
              <p className="text-amber-400 font-bold text-sm sm:text-base mt-1">
                பிரேமா ஃபயர்வொர்க்ஸ் - பட்டாசு எக்ஸ்க்ளூசிவ் ஷோரூம் • Tirunelveli
              </p>

              {/* Address Box matching exact image details */}
              <div className="mt-4 p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 text-xs sm:text-sm leading-relaxed shadow-sm w-full max-w-2xl">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-white text-sm sm:text-base">
                      Maya Bazaar Pyro Park
                    </p>
                    <p className="text-slate-300">
                      20, Nainarkulam Road <span className="text-amber-300 font-semibold">(Near Pothys Backgate)</span>, Tirunelveli Town
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 pt-2 border-t border-slate-700 text-xs font-semibold">
                      <div className="flex items-center gap-1.5 text-amber-300">
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>Direct Booking: <strong className="text-white text-sm">8903425983</strong></span>
                      </div>
                      <span className="text-slate-600">•</span>
                      <div className="flex items-center gap-1 text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Open Daily: 9:00 AM – 10:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges and Highlights */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="inline-flex items-center gap-1 bg-red-950/80 border border-red-500/40 text-red-200 text-xs font-bold px-2.5 py-1 rounded-lg">
                  <Percent className="w-3.5 h-3.5 text-amber-300" />
                  Direct Sivakasi Factory Pricing
                </span>
                <span className="inline-flex items-center gap-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  100% Genuine Green Fireworks (CSIR-NEERI)
                </span>
                <span className="inline-flex items-center gap-1 bg-slate-800 border border-slate-700 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-lg">
                  <Gift className="w-3.5 h-3.5 text-amber-400" />
                  Free Gift Items with Every Order
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <button
                  onClick={onQuickOrderClick}
                  className="bg-red-700 hover:bg-red-800 text-white font-black px-6 py-3 rounded-xl shadow-lg shadow-red-700/20 flex items-center gap-2 transition-transform active:scale-95 text-xs sm:text-sm uppercase tracking-wider"
                  id="hero-order-now-btn"
                >
                  <Flame className="w-4 h-4 text-amber-300" />
                  <span>Start Online Cart / Price Estimation</span>
                </button>

                <a
                  href="https://wa.me/918903425983?text=Hi%20Prema%20Fireworks%2C%20I%20want%20to%20place%20an%20order%20for%20Diwali%20crackers."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl shadow flex items-center gap-2 transition-all text-xs sm:text-sm"
                  id="hero-whatsapp-direct-btn"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-100" />
                  <span>WhatsApp (8903425983)</span>
                </a>

                <button
                  onClick={onViewPriceList}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-3 rounded-xl border border-slate-700 text-xs sm:text-sm transition-colors"
                  id="hero-table-toggle-btn"
                >
                  📊 Wholesale Price List Table
                </button>
              </div>
            </div>

            {/* Right Card / Logo Showcase & Festive Emblem */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="relative p-6 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-md text-center w-full max-w-sm flex flex-col items-center">
                {/* Brand Logo Large */}
                <BrandLogo size="xl" showText={false} className="justify-center" />

                <div className="mt-3">
                  <h3 className="font-['Cinzel',serif] text-xl font-black text-white tracking-wider">
                    PREMA FIREWORKS
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-red-400 mt-0.5">
                    Light Up Your Celebrations
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Premium Quality • Direct Sivakasi Factory Showroom
                  </p>
                </div>

                {/* Offer Highlights Box */}
                <div className="mt-4 w-full bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-3 text-white text-left shadow-sm">
                  <div className="text-xs font-bold uppercase flex items-center justify-between">
                    <span>Diwali Festive Offer</span>
                    <span className="bg-red-700 text-white px-1.5 py-0.5 rounded text-[10px] font-black">BEST RATES</span>
                  </div>
                  <ul className="text-[11px] text-white/95 mt-1.5 space-y-1 font-medium">
                    <li className="flex items-center gap-1.5">
                      <span>✓</span> <span>Orders above ₹3,000 → <strong>Free Sparkler Pack</strong></span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span>✓</span> <span>Orders above ₹6,000 → <strong>Free 12-Shot Cake</strong></span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span>✓</span> <span>Orders above ₹10,000 → <strong>VIP Mega Pack</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

