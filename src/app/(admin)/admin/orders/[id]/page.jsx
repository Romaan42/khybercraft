"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Truck,
  CreditCard,
  User,
  Package,
  Clock,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function AdminEditOrderPage({ params }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams?.id;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [order, setOrder] = useState(null);

  // Controlled Form State
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [trackingId, setTrackingId] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  // Fetch Order Details
  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true);
        const res = await fetch(`/admin/api/orders/${orderId}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
          setOrderStatus(data.orderStatus || "Pending");
          setPaymentStatus(data.paymentStatus || "Pending");
          setTrackingId(data.trackingId || "");
          setAdminNotes(data.adminNotes || "");
        } else {
          alert("Failed to fetch order details.");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    }

    if (orderId) fetchOrder();
  }, [orderId]);

  // Save Changes
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderStatus,
          paymentStatus,
          trackingId,
          adminNotes,
        }),
      });

      if (res.ok) {
        alert("Order updated successfully!");
        router.refresh();
      } else {
        alert("Failed to update order.");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 text-stone-900 flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-600" size={32} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col items-center justify-center gap-4">
        <AlertCircle className="text-amber-600" size={40} />
        <p className="text-sm text-stone-600 font-medium">
          Order details not found.
        </p>
        <Link
          href="/admin/orders"
          className="bg-white border border-stone-300 text-stone-800 hover:bg-stone-50 px-4 py-2 rounded-xl text-xs font-bold shadow-sm"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div className="space-y-1">
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-amber-600 transition font-medium mb-1"
            >
              <ArrowLeft size={14} /> Back to All Orders
            </Link>
            <h1 className="font-serif font-bold text-2xl text-stone-900 flex items-center gap-3">
              Edit Order{" "}
              <span className="text-amber-600 font-mono text-xl">
                #{order._id}
              </span>
            </h1>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 COLS): Controls & Items */}
          <div className="lg:col-span-8 space-y-6">
            {/* Status Management Box */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-6">
              <h2 className="font-serif font-bold text-base text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
                <Clock size={18} className="text-amber-600" /> Order Status &
                Management
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Fulfillment Status */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Fulfillment Status
                  </label>
                  <select
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:border-amber-600 focus:bg-white transition"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Payment Status */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Payment Status
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:border-amber-600 focus:bg-white transition"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>

                {/* Courier Tracking ID */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Courier Tracking Number (TCS / Trax / Leopards)
                  </label>
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="e.g. TCS-10928374"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white transition"
                  />
                </div>
              </div>
            </div>

            {/* Purchased Items Box */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="font-serif font-bold text-base text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
                <Package size={18} className="text-amber-600" /> Purchased Items
              </h2>

              <div className="divide-y divide-stone-100">
                {order.orderItems?.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-3 flex items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Size: {item.size} • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-stone-800">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-between items-center text-sm font-bold">
                <span className="text-stone-600">Total Order Amount</span>
                <span className="text-amber-600 font-mono text-base">
                  Rs. {order.totalAmount?.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Admin Internal Notes */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                Internal Admin Notes (Private)
              </label>
              <textarea
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add private notes about custom size requests or delivery instructions..."
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-4 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white transition resize-none"
              />
            </div>
          </div>

          {/* Right Column (4 COLS): Customer Details */}
          <div className="lg:col-span-4 space-y-6">
            {/* Customer Details Box */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="font-serif font-bold text-base text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
                <User size={18} className="text-amber-600" /> Customer Details
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-stone-500 block uppercase text-[10px] font-bold">
                    Name
                  </span>
                  <span className="text-stone-900 font-semibold">
                    {order.shippingAddress?.fullName}
                  </span>
                </div>

                <div>
                  <span className="text-stone-500 block uppercase text-[10px] font-bold">
                    Phone / WhatsApp
                  </span>
                  <a
                    href={`https://wa.me/92${order.shippingAddress?.phone?.replace(/^0/, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-600 hover:underline font-mono font-medium"
                  >
                    {order.shippingAddress?.phone}
                  </a>
                </div>

                <div>
                  <span className="text-stone-500 block uppercase text-[10px] font-bold">
                    Email
                  </span>
                  <span className="text-stone-700">
                    {order.shippingAddress?.email || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Destination Box */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="font-serif font-bold text-base text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
                <Truck size={18} className="text-amber-600" /> Shipping
                Destination
              </h2>

              <div className="space-y-1.5 text-xs text-stone-700 leading-relaxed">
                <p className="font-medium text-stone-800">
                  {order.shippingAddress?.street}
                </p>
                <p>
                  <strong className="text-stone-900">
                    {order.shippingAddress?.city}
                  </strong>
                  , {order.shippingAddress?.province}
                </p>
              </div>
            </div>

            {/* Payment Info Box */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="font-serif font-bold text-base text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
                <CreditCard size={18} className="text-amber-600" /> Payment Info
              </h2>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Method:</span>
                  <strong className="text-stone-900">
                    {order.paymentMethod}
                  </strong>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Payment State:</span>
                  <span
                    className={`font-bold ${paymentStatus === "Paid" ? "text-emerald-600" : "text-amber-600"}`}
                  >
                    {paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
