"use client";

import React, { useActionState, useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Sparkles,
  ShieldCheck,
  Truck,
  Award,
  ArrowRight,
} from "lucide-react";
import { loginUser } from "@/actions/userActions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { checkLogin } from "@/store/userSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [state, formAction, loading] = useActionState(loginUser);

  useEffect(() => {
    if (state && !loading) {
      if (state.success) {
        toast.success(state.message);
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
        });

        router.push("/");
        dispatch(checkLogin());
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    formAction(formData);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-amber-600 selection:text-white flex flex-col justify-between transition-colors duration-300">
      <Toaster />
      {/* Announcement Bar */}
      <div className="bg-amber-700 text-stone-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex justify-center items-center gap-2">
        <Sparkles size={14} className="animate-pulse text-amber-300" />
        <span>
          Create an account today to get 10% OFF on your first KhyberCraft
          order!
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Story & Loyalty Benefits */}
          <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
            <div>
              <Link href="/" className="inline-block group mb-4">
                <span className="font-serif text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition">
                  KHYBERCRAFT<span className="text-amber-600">.</span>
                </span>
                <span className="block text-[10px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 -mt-1 font-semibold">
                  Heritage Footwear
                </span>
              </Link>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-tight">
                Join the Exclusive{" "}
                <span className="text-amber-600 dark:text-amber-500">
                  KhyberCraft
                </span>{" "}
                Club
              </h1>
              <p className="text-stone-600 dark:text-stone-400 text-sm mt-3 leading-relaxed">
                Unlock instant access to limited edition Norozi cuts, VIP
                pre-orders for Kaptaan collections, and seamless order tracking.
              </p>
            </div>

            {/* Member Perks */}
            <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800/80">
              <div className="flex items-start gap-4 text-left">
                <div className="p-2.5 bg-amber-600/10 text-amber-600 dark:text-amber-500 rounded-lg border border-amber-600/20 mt-1">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                    Exclusive Reward Points
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Earn points on every purchase and redeem them for free
                    leather care kits.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="p-2.5 bg-amber-600/10 text-amber-600 dark:text-amber-500 rounded-lg border border-amber-600/20 mt-1">
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                    Express Checkout
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Save multiple delivery addresses across Pakistan for 1-click
                    orders.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="p-2.5 bg-amber-600/10 text-amber-600 dark:text-amber-500 rounded-lg border border-amber-600/20 mt-1">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                    Lifetime Sole Guarantee
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Registered members get direct priority access for
                    replacement warranty services.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-10 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 dark:bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

              <div className="mb-8 relative z-10">
                <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Login Your Account
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-amber-600 dark:text-amber-500 font-semibold hover:underline"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>

              <form action={handleSubmit} className="space-y-5 relative z-10">
                {/* Email */}
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500"
                      />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-lg pl-10 pr-4 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Password & Confirm Password Grid */}
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-lg pl-10 pr-10 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500"
                      />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-lg pl-10 pr-10 py-3 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Login Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-amber-600 ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-amber-700 cursor-pointer"
                  } text-white font-bold py-3.5 rounded-lg text-sm uppercase tracking-wider transition shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 group`}
                >
                  <span>Login Account</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
