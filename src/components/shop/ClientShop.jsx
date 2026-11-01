"use client";

import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  X,
  ChevronDown,
} from "lucide-react";
import Product from "@/components/Product";

const categories = [
  { id: "all", label: "All Collections" },
  { id: "kaptaan", label: "Kaptaan Special" },
  { id: "norozi", label: "Norozi Cut" },
  { id: "peshawari", label: "Peshawari Collection" },
];

export default function ShopClient({ initialProducts = [] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 25000 });
  const [sortBy, setSortBy] = useState("default");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Dynamic Maximum Price Calculation
  const maxAvailablePrice = useMemo(() => {
    if (!initialProducts.length) return 25000;
    return Math.max(...initialProducts.map((p) => Number(p.price) || 0));
  }, [initialProducts]);

  // Combined Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        // Category Filter
        const matchesCategory =
          activeCategory === "all" || product.category === activeCategory;

        // Search Query Filter
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          product.title?.toLowerCase().includes(searchLower) ||
          product.tags?.some((t) => t.toLowerCase().includes(searchLower));

        // Price Filter
        const productPrice = Number(product.price) || 0;
        const matchesPrice =
          productPrice >= Number(priceRange.min) &&
          productPrice <= Number(priceRange.max);

        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return Number(a.price) - Number(b.price);
        if (sortBy === "price-high") return Number(b.price) - Number(a.price);
        if (sortBy === "newest")
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        return 0;
      });
  }, [activeCategory, initialProducts, searchQuery, priceRange, sortBy]);

  const resetFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setPriceRange({ min: 0, max: maxAvailablePrice });
    setSortBy("default");
  };

  const isFiltered =
    activeCategory !== "all" ||
    searchQuery !== "" ||
    priceRange.min > 0 ||
    priceRange.max < maxAvailablePrice ||
    sortBy !== "default";

  // Shared Sidebar Filters Component
  const FilterSidebarContent = () => (
    <div className="space-y-8">
      {/* Categories Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-amber-600 text-stone-100 shadow-md shadow-amber-600/20"
                    : "text-stone-400 hover:bg-stone-800/60 hover:text-stone-200"
                }`}
              >
                <span>{cat.label}</span>
                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-stone-100" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-stone-800" />

      {/* Price Range Filter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
            Price Range
          </h3>
          <span className="text-xs font-semibold text-stone-300">
            Rs. {Number(priceRange.max).toLocaleString()}
          </span>
        </div>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max={maxAvailablePrice}
            step="500"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange((prev) => ({
                ...prev,
                max: Number(e.target.value),
              }))
            }
            className="w-full h-1.5 cursor-pointer appearance-none rounded-lg bg-stone-800 accent-amber-500"
          />
          <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
            <span>Rs. 0</span>
            <span>Rs. {maxAvailablePrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <hr className="border-stone-800" />

      {/* Sort By Filter */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
          Sort Products
        </h3>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none rounded-xl border border-stone-800 bg-stone-950 px-4 py-2.5 text-xs font-medium text-stone-200 outline-none focus:border-amber-500"
          >
            <option value="default">Featured / Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
        </div>
      </div>

      {/* Reset Action */}
      {isFiltered && (
        <button
          onClick={resetFilters}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 py-2.5 text-xs font-semibold text-rose-400 transition hover:bg-rose-500/20"
        >
          <RotateCcw size={14} /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <section id="collections" className="space-y-8">
      {/* Top Banner & Search Header */}
      <div className="rounded-[2rem] border border-stone-800 bg-stone-900/90 p-6 sm:p-8 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
              Handcrafted Footwear
            </p>
            <h2 className="text-2xl font-serif font-bold text-stone-100 sm:text-4xl">
              Authentic Leather Collection
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <label className="relative block flex-1 sm:w-80">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search styles, leather, tag..."
                className="w-full rounded-full border border-stone-800 bg-stone-950/90 py-3 pl-11 pr-4 text-sm text-stone-100 placeholder-stone-500 outline-none transition focus:border-amber-500"
              />
            </label>

            {/* Mobile Filter Button Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2 rounded-full border border-stone-800 bg-stone-950/90 px-4 py-3 text-xs font-medium text-stone-300 lg:hidden"
            >
              <SlidersHorizontal size={14} className="text-amber-400" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Desktop Sidebar (Left Side) */}
        <aside className="hidden h-fit rounded-3xl border border-stone-800 bg-stone-900/50 p-6 backdrop-blur-sm lg:block">
          <FilterSidebarContent />
        </aside>

        {/* Mobile Slide-Over Drawer Modal */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex bg-black/80 backdrop-blur-sm lg:hidden">
            <div className="ml-auto h-full w-full max-w-xs overflow-y-auto bg-stone-900 p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between border-b border-stone-800 pb-4">
                <h3 className="text-base font-semibold text-stone-100">
                  Filters
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="rounded-lg p-1 text-stone-400 hover:text-stone-100"
                >
                  <X size={20} />
                </button>
              </div>
              <FilterSidebarContent />
            </div>
          </div>
        )}

        {/* Right Side: Product Display Area */}
        <div className="space-y-6 lg:col-span-3">
          {/* Active Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-800/80 bg-stone-900/40 px-5 py-3 text-xs">
            <span className="text-stone-400 font-medium">
              Showing{" "}
              <strong className="text-stone-100">
                {filteredProducts.length}
              </strong>{" "}
              styles
            </span>

            {isFiltered && (
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-medium text-amber-400 border border-amber-500/20">
                  Filters Active
                </span>
                <button
                  onClick={resetFilters}
                  className="text-stone-400 hover:text-stone-200 underline"
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          {/* Product Grid */}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Product key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full rounded-3xl border border-stone-800 bg-stone-900/40 p-12 text-center text-stone-400 space-y-3">
                <p className="text-base font-semibold text-stone-200">
                  No matching products found
                </p>
                <p className="text-xs text-stone-500">
                  Try adjusting your price range or search keywords.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-2 inline-flex items-center gap-2 rounded-full bg-amber-600 px-5 py-2 text-xs font-semibold text-white transition hover:bg-amber-500"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
