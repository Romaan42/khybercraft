"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  Lock,
  ArrowLeft,
  Tag,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getCartItems } from "@/store/cartSlice";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    province: "Khyber Pakhtunkhwa",
    paymentMethod: "COD",
    discountCode: "",
  });

  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { items, loading } = useSelector((state) => state.cart);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = 250;
  const grandTotal = subtotal + deliveryFee - appliedDiscount;

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Discount Apply Handler
  const handleApplyDiscount = (e) => {
    e.preventDefault();
    if (formData.discountCode.toUpperCase() === "HERITAGE10") {
      setAppliedDiscount(500);
      alert("Discount code applied successfully!");
    } else {
      alert("Invalid Discount Code");
    }
  };

  // Order Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      shippingAddress: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        street: formData.street,
        city: formData.city,
        province: formData.province,
      },
      paymentMethod: formData.paymentMethod,
      orderItems: items.map((item) => ({
        title: item.title,
        qty: item.qty,
        image: item.image,
        price: item.price,
      })),
      subtotal,
      shippingFee: deliveryFee,
      discount: appliedDiscount,
      totalAmount: grandTotal,
    };

    try {
      // API call to MongoDB order endpoint
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const result = await response.json();

      if (result.success) {
        dispatch(getCartItems());
        const query = new URLSearchParams({
          id: result.order._id,
          name: formData.fullName,
          phone: formData.phone,
          address: `${formData.street}, ${formData.city},${formData.province}`,
          payment: formData.paymentMethod,
          total: grandTotal.toString(),
        }).toString();

        router.push(`/order-success?${query}`);
      } else {
        alert("Order submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-600 selection:text-white flex flex-col justify-between">
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1">
        {/* Navigation / Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-800">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-500 transition font-medium"
          >
            <ArrowLeft size={14} /> Back to Cart
          </Link>
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Lock size={12} className="text-amber-500" />
            <span>256-Bit SSL Secure Checkout</span>
          </div>
        </div>

        {/* Checkout Form Container */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          {/* ---------------- LEFT: CONTROLLED FORM INPUTS (7 COLS) ---------------- */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Customer Contact Info */}
            <section className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-stone-800">
                <span className="w-7 h-7 bg-amber-600/20 text-amber-500 border border-amber-600/30 rounded-full flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <h2 className="font-serif font-bold text-lg text-stone-100">
                  Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Full Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Khan Sahib"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Phone Number (WhatsApp){" "}
                    <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="0300 1234567"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Email Address{" "}
                    <span className="text-stone-500">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                  />
                </div>
              </div>
            </section>

            {/* Step 2: Shipping Address */}
            <section className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-stone-800">
                <span className="w-7 h-7 bg-amber-600/20 text-amber-500 border border-amber-600/30 rounded-full flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <h2 className="font-serif font-bold text-lg text-stone-100">
                  Shipping Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Complete Street Address{" "}
                    <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    placeholder="House / Flat No, Street name, Sector/Area"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    City <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Peshawar, Lahore, Karachi"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Province <span className="text-amber-500">*</span>
                  </label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-300 focus:outline-none focus:border-amber-600 transition"
                  >
                    <option value="Khyber Pakhtunkhwa">
                      Khyber Pakhtunkhwa
                    </option>
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Islamabad Capital">Islamabad Capital</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Step 3: Payment Method Selection */}
            <section className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-stone-800">
                <span className="w-7 h-7 bg-amber-600/20 text-amber-500 border border-amber-600/30 rounded-full flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <h2 className="font-serif font-bold text-lg text-stone-100">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                {/* COD Option */}
                <label
                  className={`flex items-center justify-between p-4 bg-stone-950 border rounded-xl cursor-pointer transition ${formData.paymentMethod === "COD" ? "border-amber-600" : "border-stone-800"}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={handleChange}
                      className="accent-amber-600 w-4 h-4"
                    />
                    <div className="flex items-center gap-2">
                      <Banknote size={18} className="text-amber-500" />
                      <div>
                        <span className="text-xs font-bold text-stone-100 block">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[11px] text-stone-400">
                          Pay cash when order arrives at your doorstep.
                        </span>
                      </div>
                    </div>
                  </div>
                </label>

                {/* Bank Transfer Option */}
                <label
                  className={`flex items-center justify-between p-4 bg-stone-950 border rounded-xl cursor-pointer transition ${formData.paymentMethod === "Bank Transfer" ? "border-amber-600" : "border-stone-800"}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Bank Transfer"
                      checked={formData.paymentMethod === "Bank Transfer"}
                      onChange={handleChange}
                      className="accent-amber-600 w-4 h-4"
                    />
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} className="text-stone-400" />
                      <div>
                        <span className="text-xs font-bold text-stone-300 block">
                          Direct Bank / EasyPaisa / JazzCash
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Transfer details shared via WhatsApp after order.
                        </span>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* ---------------- RIGHT: ORDER SUMMARY (5 COLS) ---------------- */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sticky top-8 space-y-6">
              <h2 className="font-serif font-bold text-xl text-stone-100 pb-4 border-b border-stone-800">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-stone-200">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Size: {item.size ?? "black"} • Qty: {item.qty}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-stone-200">
                      Rs. {(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="pt-4 border-t border-stone-800">
                <div className="flex gap-2">
                  <div className="relative w-full">
                    <Tag
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500"
                    />
                    <input
                      type="text"
                      name="discountCode"
                      value={formData.discountCode}
                      onChange={handleChange}
                      placeholder="Discount Code"
                      className="w-full pl-8 pr-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyDiscount}
                    className="bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold px-4 py-2 rounded-xl transition shrink-0"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Calculation */}
              <div className="pt-4 border-t border-stone-800 space-y-2.5 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal</span>
                  <span className="text-stone-200">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Shipping Fee</span>
                  <span className="text-stone-200">Rs. {deliveryFee}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-amber-500 font-medium">
                    <span>Discount</span>
                    <span>- Rs. {appliedDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-stone-100 pt-3 border-t border-stone-800">
                  <span>Total Amount</span>
                  <span className="text-amber-500">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2"
              >
                <ShieldCheck size={16} />
                <span>
                  {isSubmitting ? "Placing Order..." : "Confirm & Place Order"}
                </span>
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
