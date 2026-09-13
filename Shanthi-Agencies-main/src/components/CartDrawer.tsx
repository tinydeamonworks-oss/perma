import React, { useState } from 'react';
import { CartItem, OfferMilestone, CustomerOrderInfo } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageSquare, FileText, Gift, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onClearCart: () => void;
  onOpenEstimate: () => void;
  milestones: OfferMilestone[];
  customerInfo: CustomerOrderInfo;
  onCustomerInfoChange: (info: CustomerOrderInfo) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
  onOpenEstimate,
  milestones,
  customerInfo,
  onCustomerInfoChange,
}) => {
  const [showOrderForm, setShowOrderForm] = useState(false);

  if (!isOpen) return null;

  const totalMrp = cartItems.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalSavings = totalMrp - totalAmount;
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Active rewards
  const unlockedRewards = milestones.filter((m) => totalAmount >= m.minAmount);
  const nextMilestone = milestones.find((m) => totalAmount < m.minAmount);

  const generateWhatsAppMessage = () => {
    let msg = `🎇 *PREMA FIREWORKS - FIREWORKS ORDER ENQUIRY* 🎇\n`;
    msg += `📍 *Showroom:* No. 26, Mariyamman Kovil Street, N.R. Palayam, Ariyankuppam, Cuddalore\n`;
    msg += `--------------------------------------------\n`;
    msg += `👤 *Customer Name:* ${customerInfo.name || 'Valued Customer'}\n`;
    msg += `📞 *Phone Number:* ${customerInfo.phone || 'Not provided'}\n`;
    msg += `🏡 *Delivery City / Address:* ${customerInfo.place || 'Cuddalore'}\n`;
    if (customerInfo.notes) {
      msg += `📝 *Notes:* ${customerInfo.notes}\n`;
    }
    msg += `--------------------------------------------\n`;
    msg += `📦 *ITEMIZED ORDER LIST:*\n`;

    cartItems.forEach((item, idx) => {
      const lineTotal = item.product.price * item.quantity;
      msg += `${idx + 1}. ${item.product.name} (${item.product.tamilName})\n`;
      msg += `   Qty: ${item.quantity} ${item.product.unit} @ ₹${item.product.price} = *₹${lineTotal.toLocaleString('en-IN')}*\n`;
    });

    msg += `--------------------------------------------\n`;
    msg += `📊 *Total Items:* ${totalQuantity} Boxes\n`;
    msg += `🏷️ *Total MRP:* ₹${totalMrp.toLocaleString('en-IN')}\n`;
    msg += `🎉 *Total Savings:* ₹${totalSavings.toLocaleString('en-IN')}\n`;
    msg += `💰 *FINAL ESTIMATE AMOUNT:* *₹${totalAmount.toLocaleString('en-IN')}*\n`;

    if (unlockedRewards.length > 0) {
      msg += `🎁 *Eligible Free Gift Rewards:*\n`;
      unlockedRewards.forEach((r) => {
        msg += `   - ${r.rewardTitle} (${r.rewardDescription})\n`;
      });
    }

    msg += `--------------------------------------------\n`;
    msg += `Please confirm my order availability and payment/pickup details. Thank you!`;

    return encodeURIComponent(msg);
  };

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {}

    const encoded = generateWhatsAppMessage();
    window.open(`https://wa.me/919600830112?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end" id="cart-drawer-overlay">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-lg bg-white border-l border-slate-200 text-slate-900 shadow-2xl flex flex-col h-full z-10">
        {/* Drawer Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-700 text-white font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight text-white uppercase">
                Your Fireworks Cart
              </h2>
              <p className="text-xs text-slate-300">
                {totalQuantity} items • Total: <strong className="text-amber-400">₹{totalAmount.toLocaleString('en-IN')}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="bg-red-950/80 hover:bg-red-800 text-red-200 hover:text-white px-2.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all font-bold border border-red-700/50 shadow-xs"
                title="Delete all items from cart"
                id="cart-delete-all-btn"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                <span>Delete All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Milestone Rewards Progress inside Cart */}
        {cartItems.length > 0 && (
          <div className="bg-red-50/70 px-4 py-2.5 border-b border-red-100">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-red-700 font-bold flex items-center gap-1">
                <Gift className="w-3.5 h-3.5 text-red-600" />
                {nextMilestone
                  ? `Add ₹${(nextMilestone.minAmount - totalAmount).toLocaleString('en-IN')} for Free Gift`
                  : '🎉 All Festive Rewards Unlocked!'}
              </span>
              <span className="text-slate-500 text-[11px] font-medium">
                {unlockedRewards.length} reward{unlockedRewards.length !== 1 ? 's' : ''} earned
              </span>
            </div>

            {/* Micro reward badges */}
            <div className="flex flex-wrap gap-1.5 mt-1">
              {milestones.map((m) => {
                const unlocked = totalAmount >= m.minAmount;
                return (
                  <span
                    key={m.minAmount}
                    className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold border ${
                      unlocked
                        ? 'bg-red-700 text-white border-red-800 shadow-2xs'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    <span>{m.icon}</span>
                    <span>{m.rewardTitle}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl mb-3">
                🎆
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1">
                Your Fireworks Basket is Empty
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mb-4">
                Explore our festive sparklers, sky shots, and gift combos at direct factory prices!
              </p>
              <button
                onClick={onClose}
                className="bg-red-700 hover:bg-red-800 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider"
              >
                Browse Cracker Catalog
              </button>
            </div>
          ) : (
            cartItems.map(({ product, quantity }) => {
              const lineTotal = product.price * quantity;
              return (
                <div
                  key={product.id}
                  className="pt-3 first:pt-0 flex items-center justify-between gap-3"
                  id={`cart-item-${product.id}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-xs sm:text-sm truncate">
                      {product.name}
                    </h4>
                    <p className="text-slate-500 text-[11px] truncate font-medium">
                      {product.tamilName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-black text-red-600">
                        ₹{product.price}
                      </span>
                      <span className="text-[10px] text-slate-400 line-through">
                        ₹{product.mrp}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        ({product.unit})
                      </span>
                    </div>
                  </div>

                  {/* Quantity Stepper & Line Total */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-xs font-black text-red-700">
                      ₹{lineTotal.toLocaleString('en-IN')}
                    </span>

                    <div className="flex items-center gap-1">
                      <div className="flex items-center gap-1 bg-slate-100 rounded-lg border border-slate-200 p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          className="w-6 h-6 rounded bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold border border-slate-200"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-bold text-xs text-slate-800">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          className="w-6 h-6 rounded bg-red-700 hover:bg-red-800 text-white font-bold flex items-center justify-center text-xs"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Individual Delete Item Trash Button */}
                      <button
                        onClick={() => onUpdateQuantity(product.id, 0)}
                        className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white flex items-center justify-center transition-colors border border-red-200"
                        title="Remove item"
                        aria-label={`Remove ${product.name} from cart`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Bottom Clear All Bar when cart has items */}
          {cartItems.length > 0 && (
            <div className="pt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                {cartItems.length} distinct item varieties added
              </span>
              <button
                onClick={onClearCart}
                className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 hover:underline p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete All Added Products</span>
              </button>
            </div>
          )}
        </div>

        {/* Customer Details Form Collapsible */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <button
              onClick={() => setShowOrderForm(!showOrderForm)}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-700 mb-2 py-1"
            >
              <span>👤 Customer & Delivery Details {showOrderForm ? '▲' : '▼'}</span>
              <span className="text-[10px] text-slate-500 font-normal">
                {customerInfo.name ? `${customerInfo.name} (${customerInfo.phone || ''})` : 'Optional / Quick fill'}
              </span>
            </button>

            {showOrderForm && (
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <input
                  type="text"
                  placeholder="Your Name / பெயர்"
                  value={customerInfo.name}
                  onChange={(e) => onCustomerInfoChange({ ...customerInfo, name: e.target.value })}
                  className="col-span-1 bg-white text-slate-800 rounded-xl p-2.5 border border-slate-200 focus:border-red-600 focus:outline-none text-xs shadow-2xs"
                />
                <input
                  type="tel"
                  placeholder="Mobile No. / எண்"
                  value={customerInfo.phone}
                  onChange={(e) => onCustomerInfoChange({ ...customerInfo, phone: e.target.value })}
                  className="col-span-1 bg-white text-slate-800 rounded-xl p-2.5 border border-slate-200 focus:border-red-600 focus:outline-none text-xs shadow-2xs"
                />
                <input
                  type="text"
                  placeholder="City / Area (e.g. Cuddalore, Ariyankuppam)"
                  value={customerInfo.place}
                  onChange={(e) => onCustomerInfoChange({ ...customerInfo, place: e.target.value })}
                  className="col-span-2 bg-white text-slate-800 rounded-xl p-2.5 border border-slate-200 focus:border-red-600 focus:outline-none text-xs shadow-2xs"
                />
                <input
                  type="text"
                  placeholder="Special instructions / notes"
                  value={customerInfo.notes}
                  onChange={(e) => onCustomerInfoChange({ ...customerInfo, notes: e.target.value })}
                  className="col-span-2 bg-white text-slate-800 rounded-xl p-2.5 border border-slate-200 focus:border-red-600 focus:outline-none text-xs shadow-2xs"
                />
              </div>
            )}

            {/* Price Calculations Summary */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Total MRP Value:</span>
                <span className="line-through text-slate-400">₹{totalMrp.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-green-700 font-bold">
                <span>Discount:</span>
                <span>- ₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-slate-900">
                <span className="font-extrabold text-sm sm:text-base">Estimated Net Total:</span>
                <span className="font-black text-xl text-red-600">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Action Buttons: WhatsApp Checkout + PDF Estimate */}
            <div className="grid grid-cols-2 gap-2 mt-3.5">
              <button
                onClick={onOpenEstimate}
                className="col-span-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-colors shadow-2xs"
                id="cart-view-quotation-btn"
              >
                <FileText className="w-3.5 h-3.5 text-slate-600" />
                <span>Estimate Bill</span>
              </button>

              <button
                onClick={handleWhatsAppCheckout}
                className="col-span-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow-md transition-transform active:scale-95"
                id="cart-whatsapp-order-btn"
              >
                <MessageSquare className="w-4 h-4 text-emerald-100" />
                <span>WhatsApp Order</span>
              </button>
            </div>

            <p className="text-[10px] text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Direct Showroom Pickup & Safe Packing from Ariyankuppam, Cuddalore</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

