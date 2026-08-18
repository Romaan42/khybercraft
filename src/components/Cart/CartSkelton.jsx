import React from "react";

export default function CartSkeleton() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans flex flex-col justify-between animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="bg-stone-900 h-8 w-full flex items-center justify-center">
        <div className="h-3 w-64 bg-stone-800 rounded"></div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Breadcrumb Skeleton */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-6 mb-8">
          <div className="space-y-2">
            <div className="h-3 w-24 bg-stone-800 rounded"></div>
            <div className="h-8 w-48 sm:w-64 bg-stone-800 rounded-lg"></div>
          </div>
          <div className="h-4 w-32 bg-stone-800 rounded"></div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ----------------- CART ITEMS SKELETON (LEFT - 8 COLS) ----------------- */}
          <div className="lg:col-span-8 space-y-4">
            {/* Repeat 2-3 Placeholder Items */}
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-stone-900 border border-stone-800 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                {/* Item Image & Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* Image Placeholder */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-stone-800 rounded-lg shrink-0"></div>

                  {/* Text Lines */}
                  <div className="space-y-2.5 w-36 sm:w-48">
                    <div className="h-4 bg-stone-800 rounded w-full"></div>
                    <div className="h-3 bg-stone-800/60 rounded w-1/2"></div>
                    <div className="h-3 bg-stone-800/60 rounded w-1/3"></div>
                    <div className="h-5 bg-stone-800/80 rounded w-3/4 pt-1"></div>
                  </div>
                </div>

                {/* Controls & Price Skeleton */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 border-stone-800 pt-3 sm:pt-0">
                  <div className="h-8 w-24 bg-stone-800 rounded-lg"></div>
                  <div className="space-y-1.5 text-right">
                    <div className="h-5 w-20 bg-stone-800 rounded ml-auto"></div>
                    <div className="h-3 w-14 bg-stone-800/50 rounded ml-auto"></div>
                  </div>
                  <div className="w-6 h-6 bg-stone-800 rounded-full"></div>
                </div>
              </div>
            ))}

            {/* Guarantees Ribbon Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-stone-900/50 border border-stone-800/80 p-3.5 rounded-xl h-16 flex items-center gap-3">
                <div className="w-6 h-6 bg-stone-800 rounded-full shrink-0"></div>
                <div className="space-y-1.5 w-full">
                  <div className="h-3 bg-stone-800 rounded w-3/4"></div>
                  <div className="h-2 bg-stone-800/60 rounded w-1/2"></div>
                </div>
              </div>
              <div className="bg-stone-900/50 border border-stone-800/80 p-3.5 rounded-xl h-16 flex items-center gap-3">
                <div className="w-6 h-6 bg-stone-800 rounded-full shrink-0"></div>
                <div className="space-y-1.5 w-full">
                  <div className="h-3 bg-stone-800 rounded w-3/4"></div>
                  <div className="h-2 bg-stone-800/60 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* ----------------- ORDER SUMMARY SKELETON (RIGHT - 4 COLS) ----------------- */}
          <div className="lg:col-span-4">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6">
              <div className="h-6 w-36 bg-stone-800 rounded pb-4 border-b border-stone-800"></div>

              {/* Promo Form Skeleton */}
              <div className="space-y-2">
                <div className="h-3 w-28 bg-stone-800 rounded"></div>
                <div className="flex gap-2">
                  <div className="h-9 bg-stone-950 border border-stone-800 rounded-lg flex-1"></div>
                  <div className="h-9 w-20 bg-stone-800 rounded-lg"></div>
                </div>
              </div>

              {/* Breakdown Skeleton */}
              <div className="space-y-4 pt-4 border-t border-stone-800">
                <div className="flex justify-between">
                  <div className="h-3 w-16 bg-stone-800 rounded"></div>
                  <div className="h-3 w-20 bg-stone-800 rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-3 w-28 bg-stone-800 rounded"></div>
                  <div className="h-3 w-12 bg-stone-800 rounded"></div>
                </div>
                <div className="flex justify-between pt-3 border-t border-stone-800">
                  <div className="h-5 w-24 bg-stone-800 rounded"></div>
                  <div className="h-5 w-24 bg-stone-800 rounded"></div>
                </div>
              </div>

              {/* Button Skeletons */}
              <div className="space-y-3 pt-2">
                <div className="h-12 w-full bg-stone-800 rounded-lg"></div>
                <div className="h-10 w-full bg-stone-950 border border-stone-800 rounded-lg"></div>
              </div>

              <div className="h-3 w-3/4 bg-stone-800/50 rounded mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <footer className="border-t border-stone-900 py-6 text-center">
        <div className="h-3 w-64 bg-stone-900 rounded mx-auto"></div>
      </footer>
    </div>
  );
}
