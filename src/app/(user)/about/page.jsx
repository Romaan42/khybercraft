import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Award,
} from "lucide-react";

export const metadata = {
  title: "About Us | Charsadda Heritage Footwear",
  description:
    "Learn about our 40-year legacy of handcrafting authentic Charsadda & Peshawari leather chappals using traditional artisan techniques.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-600 selection:text-white flex flex-col justify-between">
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs text-stone-400">
            <li>
              <Link href="/" className="hover:text-amber-500 transition">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight size={12} />
            </li>
            <li className="text-amber-500 font-medium">About Us</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-amber-500 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            <Sparkles size={14} /> Traditional Craftsmanship
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 leading-tight">
            Preserving the Legacy of Handcrafted Leather
          </h1>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Since 1985, we’ve been crafting authentic Charsadda and Peshawari
            chappals using premium full-grain leather, hand-stitching, and
            tire-rubber soles built for lifelong durability.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 text-center">
            <span className="text-3xl font-serif font-bold text-amber-500">
              40+
            </span>
            <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-semibold">
              Years Experience
            </p>
          </div>
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 text-center">
            <span className="text-3xl font-serif font-bold text-amber-500">
              100%
            </span>
            <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-semibold">
              Pure Cow Leather
            </p>
          </div>
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 text-center">
            <span className="text-3xl font-serif font-bold text-amber-500">
              25k+
            </span>
            <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-semibold">
              Happy Customers
            </p>
          </div>
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 text-center">
            <span className="text-3xl font-serif font-bold text-amber-500">
              15+
            </span>
            <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-semibold">
              Master Artisans
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 space-y-4">
            <h2 className="font-serif font-bold text-2xl text-stone-100">
              Our Heritage & Passion
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              What started as a small workshop in the historic markets of
              Charsadda has grown into a trusted footwear brand across Pakistan.
            </p>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Every pair of chappals is handcrafted by seasoned karigars who
              have spent decades perfecting the art of leather cutting, shaping,
              and hand-stitching. We do not mass-produce in factories — each
              shoe receives individual attention to guarantee comfort and
              longevity.
            </p>
          </div>

          {/* Three Core Values */}
          <div className="space-y-4">
            <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-5 flex items-start gap-4">
              <div className="p-3 bg-amber-600/10 border border-amber-600/20 text-amber-500 rounded-xl shrink-0">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-stone-100">
                  Uncompromised Leather Quality
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  We strictly use genuine full-grain leather that gets softer
                  and more comfortable with age.
                </p>
              </div>
            </div>

            <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-5 flex items-start gap-4">
              <div className="p-3 bg-amber-600/10 border border-amber-600/20 text-amber-500 rounded-xl shrink-0">
                <HeartHandshake size={22} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-stone-100">
                  Supporting Local Artisans
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  By keeping traditional techniques alive, we ensure local
                  craftsmen receive fair wages and honor.
                </p>
              </div>
            </div>

            <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-5 flex items-start gap-4">
              <div className="p-3 bg-amber-600/10 border border-amber-600/20 text-amber-500 rounded-xl shrink-0">
                <Award size={22} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-stone-100">
                  Lifetime Durability
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Reinforced stitching paired with recycled tire soles offers
                  unbeatable grip and long-lasting wear.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/40 border border-amber-600/30 rounded-2xl p-8 text-center space-y-4">
          <h2 className="font-serif font-bold text-2xl text-stone-100">
            Ready to Walk in Authentic Tradition?
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
            Explore our latest collection of Kaptaan, Norozi, and Classic
            Charsadda Chappals crafted for comfort and style.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-amber-600/20"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
