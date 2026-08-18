"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Product from "@/components/Product";

const categories = [
  { id: "all", label: "All Collections" },
  { id: "kaptaan", label: "Kaptaan Special" },
  { id: "norozi", label: "Norozi Cut" },
  { id: "peshawari", label: "Peshawari Collection" },
];

export default function ShopClient({ initialProducts }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;

      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = product.title.toLowerCase().includes(searchLower);
      // product.tag.toLowerCase().includes(searchLower) ||
      // product.category.toLowerCase().includes(searchLower);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, initialProducts, searchQuery]);

  return (
    <section id="collections" className="space-y-10">
      <div className="rounded-[2rem] border border-stone-800 bg-stone-900/90 p-6 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
              Explore our collection
            </p>
            <h2 className="text-3xl font-serif font-bold text-stone-100 sm:text-4xl">
              Premium leather chappals built for everyday style.
            </h2>
            <p className="text-sm leading-7 text-stone-400">
              Filter the shop by category, search by product name, and discover
              the handcrafted details behind every pair.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search styles, leather, tag..."
                className="w-full rounded-full border border-stone-800 bg-stone-950/90 py-3 pl-12 pr-4 text-sm text-stone-100 outline-none transition focus:border-amber-500"
              />
            </label>
            <div className="flex items-center justify-between gap-3 rounded-full border border-stone-800 bg-stone-950/90 px-4 py-3 text-sm text-stone-300">
              <span className="font-semibold text-stone-100">
                {filteredProducts.length}
              </span>
              <span>styles</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeCategory === category.id
                  ? "border-amber-500 bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20"
                  : "border-stone-800 bg-stone-950/90 text-stone-300 hover:border-amber-500 hover:bg-stone-900"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full rounded-[2rem] border border-stone-800 bg-stone-900/90 p-14 text-center text-stone-400">
            No matching products found. Try a broader search or choose another
            collection.
          </div>
        )}
      </div>
    </section>
  );
}
