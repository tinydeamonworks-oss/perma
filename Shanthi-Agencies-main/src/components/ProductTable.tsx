import React from 'react';
import { Product } from '../types';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  cartQuantities: Record<string, number>;
  onUpdateQuantity: (productId: string, newQty: number) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  cartQuantities,
  onUpdateQuantity,
}) => {
  return (
    <div className="w-full" id="wholesale-price-table-container">
      {/* 1. Mobile Phone View (<640px): 100% full-width responsive cards without side swipe */}
      <div className="block sm:hidden space-y-2.5 w-full">
        {products.map((product, index) => {
          const qty = cartQuantities[product.id] || 0;
          const lineTotal = product.price * qty;

          return (
            <div
              key={product.id}
              className={`w-full p-3 rounded-2xl border transition-all ${
                qty > 0
                  ? 'bg-red-50/50 border-red-300 shadow-xs'
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}
              id={`mobile-product-row-${product.id}`}
            >
              {/* Top Row: Index Badge, Product Name, Tamil Name & Packing */}
              <div className="flex items-start gap-2.5 w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      #{index + 1}
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200 shrink-0">
                      {product.unit}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug truncate">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-xs font-medium truncate">
                    {product.tamilName}
                  </p>
                </div>
              </div>

              {/* Middle Row: Price & Discount */}
              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-black text-red-600">
                    ₹{product.price}
                  </span>
                  {product.discountPercent > 0 && (
                    <>
                      <span className="text-[11px] text-slate-400 line-through">
                        ₹{product.mrp}
                      </span>
                      <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded">
                        {product.discountPercent}% OFF
                      </span>
                    </>
                  )}
                </div>

                {qty > 0 ? (
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold leading-none">
                      Item Total
                    </span>
                    <span className="text-sm font-black text-red-700">
                      ₹{lineTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium italic">
                    Select Qty below
                  </span>
                )}
              </div>

              {/* Bottom Row: Mobile-optimized Quantity Stepper */}
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-700">
                  Quantity:
                </span>

                <div className="flex items-center gap-1.5 bg-slate-100 rounded-xl p-1 border border-slate-200">
                  <button
                    onClick={() => {
                      if (qty > 0) onUpdateQuantity(product.id, qty - 1);
                    }}
                    disabled={qty === 0}
                    className={`w-9 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                      qty > 0
                        ? 'bg-white text-slate-800 border border-slate-200 active:scale-95'
                        : 'text-slate-300 cursor-not-allowed'
                    }`}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <input
                    type="number"
                    min="0"
                    max="999"
                    value={qty}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      onUpdateQuantity(product.id, isNaN(val) || val < 0 ? 0 : Math.min(999, val));
                    }}
                    className="w-10 text-center bg-transparent font-bold text-sm text-slate-900 focus:outline-none"
                  />

                  <button
                    onClick={() => onUpdateQuantity(product.id, qty + 1)}
                    className="w-9 h-8 rounded-lg bg-red-700 hover:bg-red-800 text-white flex items-center justify-center font-bold text-xs active:scale-95 transition-transform shadow-xs"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Desktop / Tablet Wholesale Table (>=640px) */}
      <div className="hidden sm:block w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm" id="wholesale-price-table">
        <table className="w-full text-left text-xs sm:text-sm text-slate-700">
          <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] sm:text-xs border-b border-slate-200">
            <tr>
              <th className="py-3 px-3 text-center w-12">#</th>
              <th className="py-3 px-3">Product Name & Variety</th>
              <th className="py-3 px-3">Packing</th>
              <th className="py-3 px-3 text-right">MRP (₹)</th>
              <th className="py-3 px-3 text-right">Offer (₹)</th>
              <th className="py-3 px-3 text-center min-w-[130px]">Quantity</th>
              <th className="py-3 px-3 text-right">Total (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product, index) => {
              const qty = cartQuantities[product.id] || 0;
              const lineTotal = product.price * qty;

              return (
                <tr
                  key={product.id}
                  className={`hover:bg-slate-50 transition-colors ${
                    qty > 0 ? 'bg-red-50/40' : ''
                  }`}
                  id={`table-row-${product.id}`}
                >
                  {/* S.No */}
                  <td className="py-2.5 px-3 text-center font-mono text-slate-400">
                    {index + 1}
                  </td>

                  {/* Product Name & Tamil Title */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-bold text-slate-800 flex items-center gap-1.5">
                          <span>{product.name}</span>
                          {product.featured && (
                            <span className="bg-red-600 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                              HOT
                            </span>
                          )}
                        </div>
                        <div className="text-slate-500 text-xs font-medium">
                          {product.tamilName}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Packing */}
                  <td className="py-2.5 px-3 text-slate-600 font-medium">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs border border-slate-200 text-slate-700">
                      {product.unit}
                    </span>
                  </td>

                  {/* MRP */}
                  <td className="py-2.5 px-3 text-right text-slate-400 line-through">
                    {product.discountPercent > 0 ? `₹${product.mrp}` : ''}
                  </td>

                  {/* Offer Price */}
                  <td className="py-2.5 px-3 text-right">
                    <span className="font-black text-red-600 text-sm sm:text-base">
                      ₹{product.price}
                    </span>
                    {product.discountPercent > 0 && (
                      <span className="block text-[10px] text-green-700 font-bold">
                        {product.discountPercent}% OFF
                      </span>
                    )}
                  </td>

                  {/* Quantity Controls */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center justify-center gap-1.5 max-w-[120px] mx-auto bg-slate-50 rounded-xl border border-slate-200 p-1">
                      <button
                        onClick={() => {
                          if (qty > 0) onUpdateQuantity(product.id, qty - 1);
                        }}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center active:scale-95 transition-transform font-bold"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <input
                        type="number"
                        min="0"
                        max="999"
                        value={qty}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          onUpdateQuantity(product.id, isNaN(val) || val < 0 ? 0 : Math.min(999, val));
                        }}
                        className="w-8 text-center bg-transparent font-bold text-sm text-slate-800 focus:outline-none"
                      />

                      <button
                        onClick={() => onUpdateQuantity(product.id, qty + 1)}
                        className="w-7 h-7 rounded-lg bg-red-700 hover:bg-red-800 text-white flex items-center justify-center active:scale-95 transition-transform font-bold"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </td>

                  {/* Line Total */}
                  <td className="py-2.5 px-3 text-right font-black text-sm">
                    {qty > 0 ? (
                      <span className="text-red-700 font-black">
                        ₹{lineTotal.toLocaleString('en-IN')}
                      </span>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

