"use client";

import OrdersComp from "@/components/admin/OrdersComp";
import { Search, Download } from "lucide-react";

export default function AdminOrdersPage() {
  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Orders
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track customer orders, shipping status, and cash on delivery
            details.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-lg transition shadow-sm self-start sm:self-auto">
          <Download size={15} /> Export Orders
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
          {["All", "Pending", "Processing", "Delivered", "Cancelled"].map(
            (tab, i) => (
              <button
                key={i}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
                  i === 0
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab}
              </button>
            ),
          )}
        </div>
        <div className="relative w-full sm:w-64">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search order ID or phone..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 text-slate-800"
          />
        </div>
      </div>

      <OrdersComp />
    </div>
  );
}
