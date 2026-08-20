"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  PhoneCall,
  Tag,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllItems,
  getCartItems,
  guestRemoveFromCart,
  setLoading,
  updateQty,
} from "@/store/cartSlice";
import { deleteCartItem, updateServerQty } from "@/actions/userActions";
import toast from "react-hot-toast";
import CartSkeleton from "@/components/Cart/CartSkelton";

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, cartLoading } = useSelector((state) => state.cart);
  const { user, userLoading } = useSelector((state) => state.user);

  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  // Handle Quantity Increase / Decrease
  const updateQuantity = async (id, delta, qty) => {
    if (userLoading) return;
    if (!user) {
      dispatch(updateQty({ id, delta }));
    } else {
      dispatch(setLoading(true));
      const result = await updateServerQty({ id, delta, qty });
      if (result.success) {
        dispatch(getCartItems());
      } else {
        toast.error(result.message);
      }
    }
  };

  // Handle Size Change
  const updateSize = (id, newSize) => {};

  // Handle Item Removal
  const removeItem = async (id) => {
    if (userLoading) return;
    if (!user) {
      dispatch(guestRemoveFromCart(id));
      return;
    }
    dispatch(setLoading(true));
    const result = await deleteCartItem(id);
    if (result.success) {
      dispatch(getCartItems());
    } else {
      toast.error(result.message);
    }
  };

  // Handle Promo Code Apply
  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim() === "123") {
      toast.success("coupon are applied");
      setAppliedDiscount(10);
    } else {
      toast.error("code are wrong!");
      setAppliedDiscount(0);
    }
  };

  // Calculation summaries
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    if (appliedDiscount < 1) {
      return 0;
    }

    return subtotal / appliedDiscount;
  }, [items]);

  const shippingFee = 0; // Free delivery
  const grandTotal = subtotal - discountAmount + shippingFee;

  if (cartLoading || userLoading) {
    return <CartSkeleton />;
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-600 selection:text-white flex flex-col justify-between">
      {/* Top Free Shipping Announcement */}
      <div className="bg-amber-700 text-stone-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex justify-center items-center gap-2">
        <Sparkles size={14} className="animate-pulse text-amber-300" />
        <span>Free Shipping Across Pakistan | Cash on Delivery Available</span>
      </div>

      {/* Main Cart Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-6 mb-8">
          <div>
            <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">
              Your Selection
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100 mt-1">
              Shopping Cart ({items.reduce((acc, i) => acc + i.qty, 0)})
            </h1>
          </div>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-500 text-xs font-semibold tracking-wide transition"
          >
            <ArrowLeft size={16} /> Continue Shopping
          </a>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* ----------------- CART ITEMS LIST (LEFT - 8 COLS) ----------------- */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-stone-900 border border-stone-800 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-stone-700 transition"
                >
                  {/* Item Image & Info */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-stone-950 rounded-lg overflow-hidden border border-stone-800 shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-stone-100 text-base sm:text-lg">
                        {item.title}
                      </h3>

                      <div className="flex items-center gap-2 pt-1">
                        <label className="text-[11px] text-stone-400 uppercase font-bold">
                          Size (PK/UK):
                        </label>
                        <span className="text-[11px] text-white uppercase font-bold">
                          {item.size}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls & Price */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 border-stone-800 pt-3 sm:pt-0">
                    {/* Quantity Adjustment Buttons */}
                    <div className="flex items-center border border-stone-800 rounded-lg bg-stone-950">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, "DECREASE", item.qty)
                        }
                        className="p-2 text-stone-400 hover:text-amber-500 transition"
                        title="Decrease"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-xs font-bold text-stone-100">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, "INCREASE", item.qty)
                        }
                        className="p-2 text-stone-400 hover:text-amber-500 transition"
                        title="Increase"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price Tag */}
                    <div className="text-right">
                      <div className="text-base sm:text-lg font-bold text-amber-500">
                        Rs. {(item.price * item.qty).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-stone-500 line-through">
                        Rs. {(item.price * item.qty + 30).toLocaleString()}
                      </div>
                    </div>

                    {/* Remove Item Button */}
                    <button
                      onClick={() => removeItem(item._id)}
                      className="p-2 text-stone-500 hover:text-red-500 transition"
                      title="Remove Item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Guarantees Ribbon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-stone-900/50 border border-stone-800/80 p-3.5 rounded-xl flex items-center gap-3">
                  <ShieldCheck size={20} className="text-amber-500 shrink-0" />
                  <p className="text-xs text-stone-300">
                    <strong className="text-stone-100">
                      100% Genuine Leather Guarantee:
                    </strong>{" "}
                    Hand-stitched with lifetime sole endurance.
                  </p>
                </div>
                <div className="bg-stone-900/50 border border-stone-800/80 p-3.5 rounded-xl flex items-center gap-3">
                  <Truck size={20} className="text-amber-500 shrink-0" />
                  <p className="text-xs text-stone-300">
                    <strong className="text-stone-100">
                      Easy Size Exchange:
                    </strong>{" "}
                    Free replacement if the chappal doesn't fit your feet
                    perfectly.
                  </p>
                </div>
              </div>
            </div>

            {/* ----------------- ORDER SUMMARY (RIGHT - 4 COLS) ----------------- */}
            <div className="lg:col-span-4">
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6 sticky top-24">
                <h2 className="font-serif font-bold text-xl text-stone-100 pb-4 border-b border-stone-800">
                  Order Summary
                </h2>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Have a Promo Code?
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500"
                      />
                      <input
                        type="text"
                        placeholder="CHARSADDA10"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-100 uppercase placeholder-stone-600 focus:outline-none focus:border-amber-600"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold px-4 py-2 rounded-lg transition border border-stone-700"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p
                      className={`text-[11px] ${appliedDiscount > 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {promoMessage}
                    </p>
                  )}
                </form>

                {/* Calculation Breakdown */}
                <div className="space-y-3 pt-4 border-t border-stone-800 text-sm">
                  <div className="flex justify-between text-stone-300">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Heritage Discount (10%)</span>
                      <span>- Rs. {discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-300">
                    <span>Nationwide Delivery</span>
                    <span className="text-amber-500 font-semibold">FREE</span>
                  </div>

                  <div className="flex justify-between font-serif font-bold text-lg text-stone-100 pt-3 border-t border-stone-800">
                    <span>Total Amount</span>
                    <span className="text-amber-500">
                      Rs. {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Checkout Actions */}
                <div className="space-y-3 pt-2">
                  <a
                    href="/checkout"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider transition shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Checkout</span>
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </a>

                  <a
                    href={`https://wa.me/923001234567?text=Hello%2C%20I%20want%20to%20order%20Chappal%20Total%20Rs.%20${grandTotal}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-stone-950 hover:bg-stone-800 text-stone-200 border border-stone-800 font-semibold py-3 rounded-lg text-xs flex items-center justify-center gap-2 transition"
                  >
                    <PhoneCall size={14} className="text-green-500" /> Quick
                    Order via WhatsApp
                  </a>
                </div>

                <p className="text-[10px] text-center text-stone-500">
                  Tax included. Delivery usually takes 2–4 working days anywhere
                  in Pakistan.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ----------------- EMPTY CART STATE ----------------- */
          <div className="text-center py-20 bg-stone-900/40 rounded-2xl border border-stone-800 max-w-2xl mx-auto my-8">
            <div className="w-16 h-16 bg-stone-800 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-stone-700">
              <ShoppingBag size={28} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-100">
              Your Cart is Currently Empty
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-md mx-auto">
              You haven't added any authentic Charsadda Chappals to your cart
              yet. Explore our handcrafted Kaptaan and Norozi collections.
            </p>
            <a
              href="/shop"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition shadow-lg shadow-amber-600/20"
            >
              <span>Explore Collection</span>
              <ArrowRight size={16} />
            </a>
          </div>
        )}
      </div>

      {/* Mini Footer */}
      <footer className="border-t border-stone-900 py-6 text-center text-xs text-stone-500">
        © 2026 Charsadda Heritage Footwear. All rights reserved.
      </footer>
    </div>
  );
}
