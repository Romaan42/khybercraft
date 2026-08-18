import React from "react";

export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans animate-pulse">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-3 w-12 bg-stone-900 rounded"></div>
          <div className="h-3 w-3 bg-stone-900 rounded"></div>
          <div className="h-3 w-12 bg-stone-900 rounded"></div>
          <div className="h-3 w-3 bg-stone-900 rounded"></div>
          <div className="h-3 w-16 bg-stone-900 rounded"></div>
          <div className="h-3 w-3 bg-stone-900 rounded"></div>
          <div className="h-3 w-32 bg-stone-800 rounded"></div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* LEFT: Image Gallery Skeleton (7 COLS) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Big Image Placeholder */}
            <div className="aspect-square bg-stone-900 border border-stone-800 rounded-2xl w-full"></div>

            {/* Thumbnails Row Placeholder */}
            <div className="flex items-center gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-20 h-20 rounded-xl bg-stone-900 border border-stone-800 shrink-0"
                ></div>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Meta & Controls Skeleton (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Category & Title Placeholder */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-20 bg-stone-900 rounded"></div>
                <div className="h-3 w-16 bg-stone-900/60 rounded"></div>
              </div>
              <div className="h-9 sm:h-10 w-3/4 bg-stone-900 rounded-lg"></div>

              {/* Rating & Stock Badge */}
              <div className="flex items-center gap-4 pt-1">
                <div className="h-4 w-28 bg-stone-900 rounded"></div>
                <div className="h-4 w-24 bg-stone-900/80 rounded"></div>
              </div>
            </div>

            {/* Price Card Placeholder */}
            <div className="p-4 bg-stone-900/60 border border-stone-800 rounded-xl flex items-center justify-between">
              <div className="h-8 w-32 bg-stone-800 rounded"></div>
              <div className="h-6 w-24 bg-stone-800/60 rounded"></div>
            </div>

            {/* Short Description Lines */}
            <div className="space-y-2">
              <div className="h-3 w-full bg-stone-900 rounded"></div>
              <div className="h-3 w-11/12 bg-stone-900 rounded"></div>
              <div className="h-3 w-4/5 bg-stone-900 rounded"></div>
            </div>

            {/* Size Selector Placeholder */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center">
                <div className="h-3 w-28 bg-stone-900 rounded"></div>
                <div className="h-3 w-16 bg-stone-900/60 rounded"></div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[6, 7, 8, 9, 10, 11, 12].map((s) => (
                  <div
                    key={s}
                    className="h-9 bg-stone-900 border border-stone-800 rounded-lg"
                  ></div>
                ))}
              </div>
            </div>

            {/* Action Buttons Placeholder */}
            <div className="space-y-3 pt-2">
              <div className="h-12 w-full bg-stone-800 rounded-xl"></div>
              <div className="h-12 w-full bg-stone-900 border border-stone-800 rounded-xl"></div>
            </div>

            {/* Long Description Lines */}
            <div className="pt-4 border-t border-stone-800 space-y-2">
              <div className="h-3 w-32 bg-stone-900 rounded mb-3"></div>
              <div className="h-3 w-full bg-stone-900/70 rounded"></div>
              <div className="h-3 w-full bg-stone-900/70 rounded"></div>
              <div className="h-3 w-3/4 bg-stone-900/70 rounded"></div>
            </div>
          </div>

          {/* Guarantees Ribbon Skeleton */}
          <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-stone-800">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-stone-900/50 border border-stone-800/80 p-4 rounded-xl flex items-center gap-4 h-20"
              >
                <div className="w-8 h-8 rounded-full bg-stone-800 shrink-0"></div>
                <div className="space-y-2 w-full">
                  <div className="h-3 w-3/4 bg-stone-800 rounded"></div>
                  <div className="h-2.5 w-1/2 bg-stone-800/60 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured / Related Products Skeleton */}
        <div className="mt-20 pt-12 border-t border-stone-800">
          <div className="flex items-end justify-between mb-8">
            <div className="space-y-2">
              <div className="h-3 w-28 bg-stone-900 rounded"></div>
              <div className="h-7 w-48 bg-stone-800 rounded-lg"></div>
            </div>
            <div className="h-4 w-20 bg-stone-900 rounded"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden h-[380px] flex flex-col justify-between"
              >
                <div className="aspect-square bg-stone-950 w-full"></div>
                <div className="p-5 space-y-3">
                  <div className="h-3 w-16 bg-stone-800 rounded"></div>
                  <div className="h-5 w-3/4 bg-stone-800 rounded"></div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-5 w-24 bg-stone-800 rounded"></div>
                    <div className="w-8 h-8 bg-stone-800 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
