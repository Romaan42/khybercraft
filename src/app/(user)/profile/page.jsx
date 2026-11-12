"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Package,
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Phone,
  Mail,
  Edit3,
  ExternalLink,
  LogOut,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loading from "../loading";
import { logoutUser } from "@/actions/userActions";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders"); // 'orders' | 'profile'
  const [loading, setLoading] = useState(false);
  const { user, userLoading } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  // Local state for editable profile fields
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        postalCode: user.postalCode || "",
      });
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/orders", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setOrders(result.orders);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      toast.success(result.message);
      router.push("/");
    } else {
      toast.error(result.message);
    }
  };

  const getStatusBadge = (orderStatus) => {
    switch (orderStatus?.toLowerCase()) {
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20">
            <CheckCircle2 size={12} /> Delivered
          </span>
        );
      case "in transit":
      case "processing":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20">
            <Truck size={12} /> In Transit
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300 border border-rose-200 dark:border-rose-500/20">
            <XCircle size={12} /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-stone-200 text-stone-800 dark:bg-slate-100 dark:text-slate-800">
            <Clock size={12} /> Pending
          </span>
        );
    }
  };

  if (userLoading || loading) return <Loading />;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-amber-600 selection:text-white transition-colors duration-300">
      {/* Top Banner */}
      <div className="bg-amber-700 text-stone-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex justify-center items-center gap-2">
        <Sparkles size={14} className="animate-pulse text-amber-300" />
        <span>
          KhyberCraft Heritage Account — Handcrafted Authentic Leather Footwear
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* User Header Profile Card */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md dark:shadow-xl relative overflow-hidden transition-colors duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 dark:bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-600 text-white font-serif text-2xl font-bold flex items-center justify-center border-2 border-amber-500/30 shadow-lg">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                {user?.name}
              </h1>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 flex items-center gap-2">
                <Mail
                  size={13}
                  className="text-amber-600 dark:text-amber-500"
                />{" "}
                {user?.email}
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 flex items-center gap-2">
                <Phone
                  size={13}
                  className="text-amber-600 dark:text-amber-500"
                />{" "}
                {user?.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 border-stone-200 dark:border-stone-800 pt-4 md:pt-0">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 dark:bg-stone-950 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-800 text-xs font-semibold px-4 py-2.5 rounded-lg transition cursor-pointer"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 mb-8 gap-8">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-4 text-sm font-semibold flex items-center gap-2 transition relative cursor-pointer ${
              activeTab === "orders"
                ? "text-amber-600 dark:text-amber-500"
                : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
            }`}
          >
            <Package size={18} />
            <span>My Orders ({orders.length})</span>
            {activeTab === "orders" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 dark:bg-amber-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-4 text-sm font-semibold flex items-center gap-2 transition relative cursor-pointer ${
              activeTab === "profile"
                ? "text-amber-600 dark:text-amber-500"
                : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
            }`}
          >
            <User size={18} />
            <span>Shipping & Account Info</span>
            {activeTab === "profile" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 dark:bg-amber-500 rounded-full" />
            )}
          </button>
        </div>

        {/* TAB 1: ORDERS HISTORY */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {orders.length > 0 ? (
              orders.map((order) => {
                const formattedDate = new Date(order.createdAt).toDateString();
                return (
                  <div
                    key={order._id}
                    className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-lg transition hover:border-stone-300 dark:hover:border-stone-700"
                  >
                    {/* Order Top Bar */}
                    <div className="bg-stone-100/80 dark:bg-stone-950 px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                      <div className="flex flex-wrap items-center gap-6">
                        <div>
                          <span className="text-stone-500 block uppercase font-semibold text-[10px]">
                            Order ID
                          </span>
                          <span className="font-bold text-stone-900 dark:text-stone-100">
                            {order._id}
                          </span>
                        </div>
                        <div>
                          <span className="text-stone-500 block uppercase font-semibold text-[10px]">
                            Date Placed
                          </span>
                          <span className="text-stone-700 dark:text-stone-300">
                            {formattedDate}
                          </span>
                        </div>
                        <div>
                          <span className="text-stone-500 block uppercase font-semibold text-[10px]">
                            Payment
                          </span>
                          <span className="text-stone-700 dark:text-stone-300">
                            {order.paymentMethod}
                          </span>
                        </div>
                        {order.tracking && (
                          <div>
                            <span className="text-stone-500 block uppercase font-semibold text-[10px]">
                              Tracking #
                            </span>
                            <span className="text-amber-600 dark:text-amber-500 font-medium">
                              {order.tracking}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {getStatusBadge(order.orderStatus)}
                        <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
                          Rs. {order.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Order Items List */}
                    <div className="p-6 divide-y divide-stone-200 dark:divide-stone-800">
                      {order.orderItems.map((item) => (
                        <div
                          key={item._id}
                          className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-stone-100 dark:bg-stone-950 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800 shrink-0">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
                                {item.title}
                              </h4>
                              <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 mt-1">
                                <span>
                                  Size:{" "}
                                  <strong className="text-stone-800 dark:text-stone-200">
                                    {item.size}
                                  </strong>
                                </span>
                                <span>•</span>
                                <span>
                                  Qty:{" "}
                                  <strong className="text-stone-800 dark:text-stone-200">
                                    {item.qty}
                                  </strong>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right self-end sm:self-center">
                            <span className="font-bold text-amber-600 dark:text-amber-500 text-sm">
                              Rs. {(item.price * item.qty).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-stone-50 dark:bg-stone-950/60 px-6 py-3 border-t border-stone-200 dark:border-stone-800 flex justify-between items-center text-xs">
                      <span className="text-stone-500">
                        Need help with this order?{" "}
                        <a
                          href="https://wa.me/923379368405"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 dark:text-amber-500 hover:underline font-medium"
                        >
                          Contact Support
                        </a>
                      </span>
                      <button className="inline-flex items-center gap-1 text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-500 font-medium transition cursor-pointer">
                        View Order Receipt <ExternalLink size={12} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-white dark:bg-stone-900/40 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm dark:shadow-none">
                <ShoppingBag
                  size={40}
                  className="mx-auto text-stone-400 dark:text-stone-600 mb-3"
                />
                <h3 className="text-stone-800 dark:text-stone-200 font-serif font-bold text-lg">
                  No orders found
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-xs mt-1">
                  You haven't placed any orders with KhyberCraft yet.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROFILE & SHIPPING ADDRESS */}
        {activeTab === "profile" && (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 max-w-3xl space-y-6 shadow-sm dark:shadow-none">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  Default Shipping Address
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Used for quick 1-click checkout on KhyberCraft orders
                </p>
              </div>
              <button
                onClick={() => toast.success("Profile saved")}
                className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition cursor-pointer"
              >
                <Edit3 size={14} /> Save Changes
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block text-stone-600 dark:text-stone-400 uppercase font-semibold text-[10px] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-lg px-3.5 py-2.5 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 transition"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 uppercase font-semibold text-[10px] mb-1.5">
                  Phone Number (WhatsApp)
                </label>
                <input
                  type="text"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                  className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-lg px-3.5 py-2.5 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-stone-600 dark:text-stone-400 uppercase font-semibold text-[10px] mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) =>
                    setProfileData({ ...profileData, address: e.target.value })
                  }
                  className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-lg px-3.5 py-2.5 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 transition"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 uppercase font-semibold text-[10px] mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={profileData.city}
                  onChange={(e) =>
                    setProfileData({ ...profileData, city: e.target.value })
                  }
                  className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-lg px-3.5 py-2.5 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 transition"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 uppercase font-semibold text-[10px] mb-1.5">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={profileData.postalCode}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      postalCode: e.target.value,
                    })
                  }
                  className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-lg px-3.5 py-2.5 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 transition"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
