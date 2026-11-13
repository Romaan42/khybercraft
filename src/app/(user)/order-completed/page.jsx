"use client";

import React, { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  PackageCheck,
  MessageCircle,
  Home,
  ShoppingBag,
  Clock,
  Loader2,
} from "lucide-react";

// Main Order Details Component
function OrderDetails() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order") || searchParams.get("id");

  // Query Params se real data extract kar rahe hain
  const orderData = {
    orderId: orderId,
    customerName: searchParams.get("name") || "Valued Customer",
    phone: searchParams.get("phone") || "N/A",
    deliveryAddress:
      searchParams.get("address") || "Address provided at checkout",
    paymentMethod: searchParams.get("payment") || "Cash on Delivery (COD)",
    totalAmount: Number(searchParams.get("total")) || 0,
    estimatedDelivery: "3 to 5 Working Days",
  };

  const whatsappMessage = encodeURIComponent(
    `AoA! Maine order place kiya hai.\nOrder ID: #${orderData.orderId}\nName: ${orderData.customerName}\nTotal Amount: Rs. ${orderData.totalAmount}`,
  );

  return (
    <div className="max-w-2xl w-full space-y-8">
      {/* Success Header Box */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-8 sm:p-10 text-center space-y-5 shadow-sm dark:shadow-2xl relative overflow-hidden transition-colors duration-300">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-20 h-20 bg-amber-50 dark:bg-amber-600/10 border border-amber-200 dark:border-amber-600/30 rounded-full flex items-center justify-center mx-auto text-amber-600 dark:text-amber-500 shadow-inner">
          <CheckCircle2 size={44} className="stroke-[1.75]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-600 dark:text-amber-500">
            Order Confirmed
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100">
            Shukriya, {orderData.customerName}!
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
            Your order received successfully
          </p>
        </div>

        {/* Order ID Badge */}
        <div className="inline-flex items-center gap-2 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-full px-5 py-2 text-xs text-stone-700 dark:text-stone-300 shadow-sm">
          <PackageCheck
            size={16}
            className="text-amber-600 dark:text-amber-500"
          />
          <span>Order Reference:</span>
          <strong className="text-amber-600 dark:text-amber-500 font-mono text-sm">
            #{orderData.orderId}
          </strong>
        </div>
      </div>

      {/* Order Brief & Delivery Details */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-none transition-colors duration-300">
        <h2 className="font-serif font-bold text-base text-stone-900 dark:text-stone-200 pb-3 border-b border-stone-200 dark:border-stone-800">
          Delivery Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-stone-50 dark:bg-stone-950 p-4 rounded-xl border border-stone-200 dark:border-stone-800/80 space-y-1">
            <span className="text-stone-500 font-semibold block uppercase tracking-wider text-[10px]">
              Shipping Address
            </span>
            <p className="text-stone-900 dark:text-stone-200 font-medium leading-normal">
              {orderData.deliveryAddress}
            </p>
            <p className="text-stone-600 dark:text-stone-400 text-[11px]">
              Phone: {orderData.phone}
            </p>
          </div>

          <div className="bg-stone-50 dark:bg-stone-950 p-4 rounded-xl border border-stone-200 dark:border-stone-800/80 space-y-1">
            <span className="text-stone-500 font-semibold block uppercase tracking-wider text-[10px]">
              Payment Summary
            </span>
            <p className="text-stone-900 dark:text-stone-200 font-medium">
              {orderData.paymentMethod}
            </p>
            <p className="text-amber-600 dark:text-amber-500 font-bold text-sm pt-1">
              Total: Rs. {orderData.totalAmount.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-stone-50/80 dark:bg-stone-950/60 p-4 rounded-xl border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400">
          <Clock
            size={18}
            className="text-amber-600 dark:text-amber-500 shrink-0"
          />
          <span>
            Estimated Delivery Time:{" "}
            <strong className="text-stone-900 dark:text-stone-200">
              {orderData.estimatedDelivery}
            </strong>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <a
          href={`https://wa.me/923379368405?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-600/10 flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageCircle size={16} />
          <span>Confirm Order via WhatsApp</span>
        </a>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/shop"
            className="w-full bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-800 text-stone-800 dark:text-stone-200 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm dark:shadow-none"
          >
            <ShoppingBag size={15} />
            <span>Continue Shopping</span>
          </Link>

          <Link
            href="/"
            className="w-full bg-stone-100 dark:bg-stone-950 hover:bg-stone-200 dark:hover:bg-stone-900 border border-stone-300 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm dark:shadow-none"
          >
            <Home size={15} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Parent Export with Suspense Wrapper
export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-amber-600 selection:text-white flex flex-col justify-between items-center px-4 py-12 transition-colors duration-300">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2
              className="animate-spin text-amber-600 dark:text-amber-500"
              size={32}
            />
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Loading Order Receipt...
            </p>
          </div>
        }
      >
        <OrderDetails />
      </Suspense>

      <footer className="mt-12 text-center text-xs text-stone-500 dark:text-stone-600">
        Questions about your order? Contact support at{" "}
        <span className="text-stone-700 dark:text-stone-400">
          support@charsaddaheritage.com
        </span>
      </footer>
    </div>
  );
}
