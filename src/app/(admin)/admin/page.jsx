"use client";
import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import OrdersComp from "@/components/admin/OrdersComp";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    activeProducts: 0,
    outOfStockProducts: 0,
    totalCustomers: 0,
    revenueChange: "+12.5%",
    ordersChange: "+8.2%",
    customersChange: "+18.4%",
    isRevenuePositive: true,
    isOrdersPositive: true,
    isCustomersPositive: true,
  });

  // Fetch live dashboard analytics from backend API
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/admin/api/stats", {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();

      if (result.success) {
        setMetrics(result.data);
      } else {
        toast.error(result.message || "Failed to load dashboard metrics");
      }
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
      toast.error("Network error while loading analytics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statsConfig = [
    {
      title: "Total Revenue",
      value: `Rs. ${metrics.totalRevenue.toLocaleString()}`,
      change: metrics.revenueChange,
      isPositive: metrics.isRevenuePositive,
      icon: TrendingUp,
    },
    {
      title: "Total Orders",
      value: metrics.totalOrders.toLocaleString(),
      change: metrics.ordersChange,
      isPositive: metrics.isOrdersPositive,
      icon: ShoppingBag,
    },
    {
      title: "Active Products",
      value: metrics.activeProducts.toString(),
      change: `${metrics.outOfStockProducts} Out of stock`,
      isPositive: metrics.outOfStockProducts === 0,
      icon: Package,
    },
    {
      title: "Total Customers",
      value: metrics.totalCustomers.toLocaleString(),
      change: metrics.customersChange,
      isPositive: metrics.isCustomersPositive,
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
            Welcome back! Real-time analytics for your store performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            title="Refresh Analytics"
            className="p-2.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-600 transition shadow-sm"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>

          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-black hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition shadow-sm"
          >
            <Plus size={16} /> Add New Product
          </Link>
        </div>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsConfig.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {stat.title}
                </span>
                <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
                  <Icon size={18} />
                </div>
              </div>

              {loading ? (
                <div className="space-y-2 py-1 animate-pulse">
                  <div className="h-7 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              ) : (
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
              )}
            </div>
          );
        })}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Recent Orders</h2>
            <p className="text-xs text-slate-500">
              Latest customer transactions from database
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-slate-700 hover:text-black transition"
          >
            View All Orders →
          </Link>
        </div>
        <OrdersComp />
      </div>
    </div>
  );
}
