import {
  ChevronRight,
  Award,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import ProductsGrid from "@/components/ProductsGrid";

export default function CharsaddaChappalWebsite() {
  try {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-600 selection:text-white">
        {/* ----------------- ANNOUNCEMENT BAR ----------------- */}
        <div className="bg-amber-700 text-stone-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex justify-center items-center gap-2">
          <Sparkles size={14} className="animate-pulse text-amber-300" />
          <span>
            Free Delivery All Over Pakistan | 100% Authentic Handcrafted Cow
            Leather
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
                  <span>Original Charsadda Craftsmanship</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-100 leading-tight">
                  Authentic{" "}
                  <span className="text-amber-500 underline decoration-amber-600/40">
                    Charsadda
                  </span>{" "}
                  Handcrafted Leather Chappal
                </h1>

                <p className="text-stone-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                  Crafted by master artisans in Charsadda using pure full-grain
                  leather, durable truck-tyre soles, and centuries-old Pashtun
                  heritage techniques.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a
                    href="#collections"
                    className="w-full sm:w-auto px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-lg shadow-amber-600/20 transition flex items-center justify-center gap-2 group"
                  >
                    <span>Explore Collection</span>
                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </a>
                  <a
                    href="#craftsmanship"
                    className="w-full sm:w-auto px-8 py-4 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold rounded-lg transition text-center"
                  >
                    Our Heritage
                  </a>
                </div>

                {/* Quick Trust Badges */}
                <div className="pt-8 border-t border-stone-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                  <div>
                    <h4 className="text-lg font-serif font-bold text-amber-500">
                      100%
                    </h4>
                    <p className="text-xs text-stone-400">Pure Cow Leather</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-serif font-bold text-amber-500">
                      Master
                    </h4>
                    <p className="text-xs text-stone-400">Hand Stitched</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-serif font-bold text-amber-500">
                      Guaranteed
                    </h4>
                    <p className="text-xs text-stone-400">Life-time Sole</p>
                  </div>
                </div>
              </div>
              {/* Hero Right Image Spotlight */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="aspect-4/5 rounded-2xl overflow-hidden border-2 border-stone-800 shadow-2xl relative group">
                    <Image
                      src="https://res.cloudinary.com/druroxxha/image/upload/v1787304344/WhatsApp_Image_2026-08-21_at_2.23.06_PM_jndtpu.jpg"
                      fill
                      loading="eager"
                      alt="Charsadda Chappal Showcase"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-transparent to-transparent opacity-80" />

                    {/* Floating Price Tag */}
                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-stone-900/90 border border-stone-800 backdrop-blur-md flex items-center justify-between">
                      <div>
                        <p className="text-xs text-amber-500 uppercase font-semibold tracking-wider">
                          Signature Edition
                        </p>
                        <p className="text-lg font-bold text-stone-100">
                          Kaptaan Classic Brown
                        </p>
                      </div>
                      <span className="text-lg font-bold text-amber-500">
                        Rs. 4,999
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- FEATURE HIGHLIGHTS ----------------- */}
        <section className="bg-stone-900/50 border-y border-stone-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 p-4">
                <div className="p-3 bg-amber-600/10 text-amber-500 rounded-lg border border-amber-600/20">
                  <Truck size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-200">
                    Nationwide Free Shipping
                  </h4>
                  <p className="text-xs text-stone-400">
                    Cash on delivery available all over Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 p-4">
                <div className="p-3 bg-amber-600/10 text-amber-500 rounded-lg border border-amber-600/20">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-200">
                    Authenticity Guaranteed
                  </h4>
                  <p className="text-xs text-stone-400">
                    100% Genuine full-grain local leather
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 p-4">
                <div className="p-3 bg-amber-600/10 text-amber-500 rounded-lg border border-amber-600/20">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-200">
                    Handcrafted Perfection
                  </h4>
                  <p className="text-xs text-stone-400">
                    Made by master craftsmen in KPK
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
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">
                Heritage Lineup
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 mt-2">
                Featured Charsadda Collections
              </h2>
              <p className="text-stone-400 text-sm mt-3">
                Hand-stitched precision designed to combine traditional elegance
                with modern durability.
              </p>
            </div>
            <ProductsGrid />
          </div>
        </section>

        <section
          id="craftsmanship"
          className="py-20 bg-stone-900 border-t border-stone-800 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-video sm:aspect-square rounded-2xl overflow-hidden border border-stone-800">
                  <Image
                    src="https://res.cloudinary.com/druroxxha/image/upload/v1787125043/without-bg_kams6q.png"
                    fill
                    alt="Craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 hidden sm:block bg-stone-950 p-6 rounded-xl border border-stone-800 max-w-xs">
                  <p className="text-amber-500 font-serif font-bold text-2xl">
                    100+ Years
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    Preserving the authentic art of Charsadda footwear weaving
                    and double-sole tire cutting.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">
                  Master Artisans
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
                  Handmade with Pride in Khyber Pakhtunkhwa
                </h2>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Every pair of Charsadda Chappal goes through up to 28
                  intricate artisanal steps. From selecting premium cow leather
                  to shaping the iconic curved toe and cutting durable tire
                  soles, our craftsmen ensure maximum comfort and indestructible
                  durability.
                </p>

                <ul className="space-y-3 text-sm text-stone-300">
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    Heavy-duty truck tire soles built for all terrains
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    Premium memory foam padded footbeds for all-day wear
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    Double-stitched waxed thread for maximum tear resistance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (err) {
    return <h1>error while loading products</h1>;
  }
}
