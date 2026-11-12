import React from "react";
import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans flex flex-col justify-between selection:bg-amber-600 selection:text-white transition-colors duration-300">
      {/* Top Announcement Skeleton */}
      <div className="bg-amber-700 text-stone-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex justify-center items-center gap-2">
        <Sparkles size={14} className="animate-pulse text-amber-300" />
        <span className="animate-pulse">
          Loading Exclusive Multi-Category Collections...
        </span>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 dark:bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Dual Ring Brand Loader */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-amber-600/50 dark:border-amber-600/60 animate-[spin_8s_linear_infinite]" />

          <div className="absolute w-20 h-20 rounded-full border-2 border-t-amber-600 dark:border-t-amber-500 border-r-transparent border-b-amber-700 border-l-transparent animate-spin" />

          <div className="absolute flex flex-col items-center justify-center">
            <span className="font-serif text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-500 animate-pulse">
              K<span className="text-stone-900 dark:text-stone-100">.</span>
            </span>
          </div>
        </div>

        {/* Brand Name & Loading Message */}
        <div className="text-center space-y-2 relative z-10">
          <h2 className="font-serif text-2xl font-bold tracking-widest text-stone-900 dark:text-stone-100 uppercase">
            KHYBERCRAFT<span className="text-amber-600">.</span>
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-xs uppercase tracking-[0.25em] font-medium animate-pulse">
            Preparing Premium Collections...
          </p>
        </div>

        {/* Progress Bar Line */}
        <div className="w-52 h-1.5 bg-stone-200 dark:bg-stone-900 rounded-full overflow-hidden mt-6 border border-stone-300/60 dark:border-stone-800">
          <div className="h-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 rounded-full animate-pulse w-full" />
        </div>

        {/* Product Skeleton Preview Grid */}
        <div className="w-full max-w-7xl mx-auto mt-16 px-4 hidden md:block opacity-60 dark:opacity-40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white dark:bg-stone-900/60 rounded-[1.75rem] overflow-hidden border border-stone-200 dark:border-stone-800/60 p-4 space-y-4 animate-pulse shadow-sm dark:shadow-none"
              >
                <div className="aspect-square bg-stone-200/70 dark:bg-stone-950 rounded-2xl" />
                <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-3/4" />
                <div className="h-3 bg-stone-200/70 dark:bg-stone-800/60 rounded w-1/2" />
                <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded-xl w-full mt-4" />
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-200 dark:border-stone-900 py-6 text-center text-xs text-stone-500 dark:text-stone-600">
        © 2026 KhyberCraft Store. All rights reserved.
      </footer>
    </div>
  );
}
