import React from "react";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Plus,
} from "lucide-react";
import OrdersComp from "@/components/admin/OrdersComp";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "Rs. 248,500",
      change: "+12.5%",
      isPositive: true,
      icon: TrendingUp,
    },
    {
      title: "Total Orders",
      value: "142",
      change: "+8.2%",
      isPositive: true,
      icon: ShoppingBag,
    },
    {
      title: "Active Products",
      value: "25",
      change: "2 Out of stock",
      isPositive: false,
      icon: Package,
    },
    {
      title: "Total Customers",
      value: "389",
      change: "+18.4%",
      isPositive: true,
      icon: Users,
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Welcome back! Here is what is happening with your store today.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 bg-black hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition shadow-sm self-start sm:self-auto">
          <Plus size={16} /> Add New Product
        </button>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {stat.title}
                </span>
                <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
                  <Icon size={18} />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {stat.value}
                </h3>
                <div className="flex items-center gap-1 text-[11px] font-medium mt-1">
                  {stat.isPositive ? (
                    <span className="text-emerald-600 flex items-center">
                      <ArrowUpRight size={14} /> {stat.change}
                    </span>
                  ) : (
                    <span className="text-amber-600 flex items-center">
                      <ArrowDownRight size={14} /> {stat.change}
                    </span>
                  )}
                  <span className="text-slate-400">vs last month</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Section: Sales Overview & Quick Actions */}

      {/* Recent Orders Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Recent Orders</h2>
            <p className="text-xs text-slate-500">
              Latest customer transactions
            </p>
          </div>
          <button className="text-xs font-semibold text-slate-700 hover:text-black transition">
            View All Orders →
          </button>
        </div>
        <OrdersComp />
      </div>
    </div>
  );
}
