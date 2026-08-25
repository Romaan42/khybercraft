"use client";

import React, { useActionState, useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  Sparkles,
  ShieldCheck,
  Truck,
  Award,
  ArrowRight,
} from "lucide-react";
import { registerUser } from "@/actions/userActions";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState(null);
  const router = useRouter();
  const [state, formAction, loading] = useActionState(registerUser);

  useEffect(() => {
    if (state && !loading) {
      if (state.success) {
        setErrors(null);
        alert(state.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        });

        router.push("/login");
      } else {
        setErrors([state.message]);
      }
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setErrors(["Passwords do not match"]);
      return;
    }
    formAction(formData);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-600 selection:text-white flex flex-col justify-between">
      {/* Announcement Bar */}
      <div className="bg-amber-700 text-stone-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex justify-center items-center gap-2">
        <Sparkles size={14} className="animate-pulse text-amber-300" />
        <span>
          Create an account today to get 10% OFF on your first Charsadda Chappal
          order!
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Story & Loyalty Benefits */}
          <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
            <div>
              <a href="/" className="inline-block group mb-4">
                <span className="font-serif text-3xl font-bold tracking-tight text-stone-100 group-hover:text-amber-500 transition">
                  CHARSADDA<span className="text-amber-600">.</span>
                </span>
                <span className="block text-[10px] uppercase tracking-[0.3em] text-stone-400 -mt-1 font-semibold">
                  Heritage Footwear
                </span>
              </a>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 leading-tight">
                Join the Exclusive{" "}
                <span className="text-amber-500">Charsadda</span> Club
              </h1>
              <p className="text-stone-400 text-sm mt-3 leading-relaxed">
                Unlock instant access to limited edition Norozi cuts, VIP
                pre-orders for Kaptaan collections, and seamless order tracking.
              </p>
            </div>

            {/* Member Perks */}
            <div className="space-y-4 pt-4 border-t border-stone-800/80">
              <div className="flex items-start gap-4 text-left">
                <div className="p-2.5 bg-amber-600/10 text-amber-500 rounded-lg border border-amber-600/20 mt-1">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-200">
                    Exclusive Reward Points
                  </h4>
                  <p className="text-xs text-stone-400">
                    Earn points on every purchase and redeem them for free
                    leather care kits.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="p-2.5 bg-amber-600/10 text-amber-500 rounded-lg border border-amber-600/20 mt-1">
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-200">
                    Express Checkout
                  </h4>
                  <p className="text-xs text-stone-400">
                    Save multiple delivery addresses across Pakistan for 1-click
                    orders.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <div className="p-2.5 bg-amber-600/10 text-amber-500 rounded-lg border border-amber-600/20 mt-1">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-200">
                    Lifetime Sole Guarantee
                  </h4>
                  <p className="text-xs text-stone-400">
                    Registered members get direct priority access for
                    replacement warranty services.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

              {errors && errors.length > 0 && (
                <div className="mb-6 p-4 bg-red-950/30 border border-red-700/50 rounded-lg">
                  <ul className="flex flex-col gap-2">
                    {errors.map((error, i) => (
                      <li
                        className="text-sm text-red-400 flex items-start gap-2"
                        key={i}
                      >
                        <span className="text-red-500 mt-0.5">•</span>
                        <span>{error}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-stone-100">
                  Create Your Account
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-amber-500 font-semibold hover:underline"
                  >
                    Sign in here
                  </a>
                </p>
              </div>

              <form action={handleSubmit} className="space-y-5">
                {/* Full Name Input */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500"
                    />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Khan Bahadur"
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-10 pr-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                    />
                  </div>
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500"
                      />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-10 pr-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                      Phone Number (WhatsApp)
                    </label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500"
                      />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0300 1234567"
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-10 pr-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Password & Confirm Password Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-10 pr-10 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
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
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500"
                      />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-10 pr-10 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
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

                {/* Terms and Conditions Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    required
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 accent-amber-600 bg-stone-950 border-stone-800 rounded cursor-pointer"
                  />
                  <label
                    htmlFor="agreeToTerms"
                    className="text-xs text-stone-400 cursor-pointer leading-normal"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-amber-500 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-amber-500 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                {/* Register Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-amber-600 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-700"} text-white font-bold py-3.5 rounded-lg text-sm uppercase tracking-wider transition shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 group`}
                >
                  <span>Register Account</span>
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
