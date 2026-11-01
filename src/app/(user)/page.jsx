import {
  ChevronRight,
  Award,
  ShieldCheck,
  Truck,
  Sparkles,
  ShoppingBag,
  Grid,
} from "lucide-react";
import Image from "next/image";
import ProductsGrid from "@/components/ProductsGrid";
import ClImage from "@/components/ClgImage";

export default function MultiCategoryStoreWebsite() {
  try {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-600 selection:text-white">
        {/* ----------------- ANNOUNCEMENT BAR ----------------- */}
        <div className="bg-amber-700 text-stone-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex justify-center items-center gap-2">
          <Sparkles size={14} className="animate-pulse text-amber-300" />
          <span>
            Free Delivery All Over Pakistan | Premium Quality Across All
            Collections
          </span>
          <Sparkles size={14} className="animate-pulse text-amber-300" />
        </div>

        {/* ----------------- HERO SECTION ----------------- */}
        <section
          id="home"
          className="relative min-h-[85vh] flex items-center bg-stone-900 overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Hero Left Content */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-stone-800/80 border border-stone-700 text-amber-500 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                  <Award size={14} />
                  <span>Premium Quality & Authentic Products</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-100 leading-tight">
                  Discover Our{" "}
                  <span className="text-amber-500 underline decoration-amber-600/40">
                    Exclusive
                  </span>{" "}
                  Multi-Category Collections
                </h1>

                <p className="text-stone-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                  From traditional handcrafted footwear to modern everyday
                  essentials, explore our wide range of premium goods crafted
                  for ultimate durability and style.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a
                    href="#collections"
                    className="w-full sm:w-auto px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-lg shadow-amber-600/20 transition flex items-center justify-center gap-2 group"
                  >
                    <ShoppingBag size={18} />
                    <span>Shop All Categories</span>
                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </a>
                  <a
                    href="#quality"
                    className="w-full sm:w-auto px-8 py-4 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold rounded-lg transition text-center"
                  >
                    Why Choose Us
                  </a>
                </div>

                {/* Quick Trust Badges */}
                <div className="pt-8 border-t border-stone-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                  <div>
                    <h4 className="text-lg font-serif font-bold text-amber-500">
                      100%
                    </h4>
                    <p className="text-xs text-stone-400">Authentic Items</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-serif font-bold text-amber-500">
                      Top Tier
                    </h4>
                    <p className="text-xs text-stone-400">Quality Checked</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-serif font-bold text-amber-500">
                      Hassle-Free
                    </h4>
                    <p className="text-xs text-stone-400">Easy Returns</p>
                  </div>
                </div>
              </div>

              {/* Hero Right Image Spotlight */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="aspect-4/5 rounded-2xl overflow-hidden border-2 border-stone-800 shadow-2xl relative group bg-stone-900">
                    <ClImage
                      src="https://res.cloudinary.com/druroxxha/image/upload/v1793532119/Gemini_Generated_Image_vxm08nvxm08nvxm0-1024x1024_jkhtfg.jpg"
                      fill
                      priority
                      alt="Store Showcase"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- LOGISTICS / TRUST BADGES ----------------- */}
        <section className="bg-stone-900/50 border-y border-stone-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 p-4">
                <div className="p-3 bg-amber-600/10 text-amber-500 rounded-lg border border-amber-600/20">
                  <Truck size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-200">
                    Nationwide Express Delivery
                  </h4>
                  <p className="text-xs text-stone-400">
                    Cash on delivery available all across Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 p-4">
                <div className="p-3 bg-amber-600/10 text-amber-500 rounded-lg border border-amber-600/20">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-200">
                    100% Guaranteed Quality
                  </h4>
                  <p className="text-xs text-stone-400">
                    Tested and verified materials for long durability
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 p-4">
                <div className="p-3 bg-amber-600/10 text-amber-500 rounded-lg border border-amber-600/20">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-200">
                    Unmatched Customer Care
                  </h4>
                  <p className="text-xs text-stone-400">
                    Fast exchanges & responsive support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- PRODUCTS SECTION ----------------- */}
        <section id="collections" className="py-20 bg-stone-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5">
                <Grid size={14} /> Our Catalog
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 mt-2">
                Explore All Products
              </h2>
              <p className="text-stone-400 text-sm mt-3">
                Browse through our wide selection of items carefully curated for
                quality, performance, and style.
              </p>
            </div>
            <ProductsGrid />
          </div>
        </section>

        {/* ----------------- QUALITY & BRAND SECTION ----------------- */}
        <section
          id="quality"
          className="py-20 bg-stone-900 border-t border-stone-800 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-video sm:aspect-square rounded-2xl overflow-hidden border border-stone-800 relative">
                  <Image
                    src="https://res.cloudinary.com/druroxxha/image/upload/v1793532119/Gemini_Generated_Image_vxm08nvxm08nvxm0-1024x1024_jkhtfg.jpg"
                    fill
                    alt="Brand Showcase"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 hidden sm:block bg-stone-950 p-6 rounded-xl border border-stone-800 max-w-xs">
                  <p className="text-amber-500 font-serif font-bold text-2xl">
                    Uncompromised
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    Quality standard maintained across all our product lines.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">
                  Our Promise
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
                  Crafted for Excellence & Customer Satisfaction
                </h2>
                <p className="text-stone-400 text-sm leading-relaxed">
                  We believe in delivering items that meet the highest standards
                  of durability and functionality. Whether you are shopping for
                  traditional classics or modern essentials, every product in
                  our catalog undergoes rigorous checks before reaching your
                  doorstep.
                </p>

                <ul className="space-y-3 text-sm text-stone-300">
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    Carefully sourced high-grade materials
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    Strict quality control on every single order
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    Fast, secure, and reliable nationwide shipping
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (err) {
    return <h1>Error while loading products</h1>;
  }
}
