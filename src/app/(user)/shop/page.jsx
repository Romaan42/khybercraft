import ShopClient from "@/components/shop/ClientShop";
import { Sparkles, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Shop Charsadda Chappal | Handcrafted Leather Collection",
  description:
    "Shop the finest handcrafted Kaptaan, Norozi, and Peshawari chappals made with premium leather and durable soles.",
};

// const initialProducts = [
//   {
//     id: "1",
//     name: "Royal Charsadda Kaptaan Special",
//     category: "kaptaan",
//     price: "Rs. 4,999",
//     originalPrice: "Rs. 6,500",
//     rating: 4.9,
//     reviews: 128,
//     isBestseller: true,
//     badge: "Bestseller",
//     color: "Brown",
//     soleType: "Double Sole",
//     image:
//       "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=900",
//     tag: "Handcrafted",
//   },
//   {
//     id: "2",
//     name: "Classic Black Norozi Cut",
//     category: "norozi",
//     price: "Rs. 5,499",
//     originalPrice: "Rs. 7,000",
//     rating: 5.0,
//     reviews: 94,
//     isBestseller: false,
//     badge: "Trending",
//     color: "Black",
//     soleType: "Tyre Sole",
//     image:
//       "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=900",
//     tag: "Pure Cow Leather",
//   },
//   {
//     id: "3",
//     name: "Traditional Charsadda Zalmi",
//     category: "peshawari",
//     price: "Rs. 4,299",
//     originalPrice: "Rs. 5,500",
//     rating: 4.8,
//     reviews: 76,
//     isBestseller: false,
//     badge: "Limited",
//     color: "Mustard",
//     soleType: "Single Sole",
//     image:
//       "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=900",
//     tag: "Heritage",
//   },
//   {
//     id: "4",
//     name: "Textured Tan Panjdara",
//     category: "kaptaan",
//     price: "Rs. 5,999",
//     originalPrice: "Rs. 7,500",
//     rating: 4.9,
//     reviews: 112,
//     isBestseller: true,
//     badge: "Premium",
//     color: "Tan",
//     soleType: "Double Sole",
//     image:
//       "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=900",
//     tag: "Tyre Sole",
//   },
//   {
//     id: "5",
//     name: "Dark Chocolate Norozi Double Sole",
//     category: "norozi",
//     price: "Rs. 6,299",
//     originalPrice: "Rs. 8,000",
//     rating: 4.9,
//     reviews: 58,
//     isBestseller: false,
//     badge: "Premium",
//     color: "Chocolate",
//     soleType: "Double Sole",
//     image:
//       "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=900",
//     tag: "Premium Finish",
//   },
//   {
//     id: "6",
//     name: "Matte Black Peshawari Classic",
//     category: "peshawari",
//     price: "Rs. 3,999",
//     originalPrice: "Rs. 5,000",
//     rating: 4.7,
//     reviews: 82,
//     isBestseller: false,
//     badge: "Classic",
//     color: "Black",
//     soleType: "Single Sole",
//     image:
//       "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=900",
//     tag: "Everyday Wear",
//   },
// ];

export default async function ShopPage() {
  const res = await fetch(`${process.env.BASE_URL}/api/products`, {
    cache: "force-cache",
    next: {
      revalidate: 60, // Revalidate every 60 seconds
    },
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-950 text-stone-100">
        <p className="text-lg font-semibold">Failed to load products.</p>
      </div>
    );
  }
  const data = await res.json();
  const products = data.products;
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-600 selection:text-white">
      <div className="bg-amber-700 text-stone-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex justify-center items-center gap-2">
        <Sparkles size={14} className="animate-pulse text-amber-300" />
        <span>
          Free delivery across Pakistan | Secure checkout & premium leather
          quality
        </span>
      </div>

      <section className="relative overflow-hidden bg-stone-900 py-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-amber-600/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
                <Sparkles size={14} /> Master Artisans Collection
              </span>

              <h1 className="text-4xl font-serif font-bold tracking-tight text-stone-100 sm:text-5xl lg:text-6xl">
                Shop the Finest{" "}
                <span className="text-amber-500">Charsadda</span> Leather
                Chappals
              </h1>

              <p className="max-w-2xl text-stone-400 text-base sm:text-lg leading-8">
                Discover premium handcrafted Kaptaan, Norozi, and Peshawari
                footwear built for comfort, durability, and timeless style.
              </p>

              <div className="grid gap-4 sm:grid-cols-[max-content_max-content]">
                <a
                  href="#collections"
                  className="inline-flex items-center justify-center rounded-full bg-amber-500 px-7 py-4 text-base font-semibold text-stone-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
                >
                  Explore Collection
                </a>
                <a
                  href="#why-us"
                  className="inline-flex items-center justify-center rounded-full border border-stone-700 bg-stone-800/90 px-7 py-4 text-base font-semibold text-stone-200 transition hover:bg-stone-700"
                >
                  Why Choose Us
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-stone-800 bg-stone-950/80 p-5">
                  <p className="text-3xl font-serif font-bold text-amber-400">
                    100%
                  </p>
                  <p className="mt-2 text-sm text-stone-400">
                    Authentic local leather
                  </p>
                </div>
                <div className="rounded-3xl border border-stone-800 bg-stone-950/80 p-5">
                  <p className="text-3xl font-serif font-bold text-amber-400">
                    5.0
                  </p>
                  <p className="mt-2 text-sm text-stone-400">
                    Average customer rating
                  </p>
                </div>
                <div className="rounded-3xl border border-stone-800 bg-stone-950/80 p-5">
                  <p className="text-3xl font-serif font-bold text-amber-400">
                    Fast
                  </p>
                  <p className="mt-2 text-sm text-stone-400">
                    Nationwide delivery in 2–3 days
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[2rem] border border-stone-800 bg-stone-950/10 shadow-2xl shadow-black/30">
                <img
                  src="https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=900"
                  alt="Charsadda leather chappal"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/95 to-transparent p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
                    Featured style
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-stone-100">
                    Royal Kaptaan Classic
                  </h2>
                  <p className="mt-3 max-w-md text-sm text-stone-300">
                    A signature hand-stitched design with rich leather, durable
                    tyre soles, and premium finishing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="why-us"
        className="bg-stone-900/80 border-y border-stone-800 py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-stone-800 bg-stone-950/80 p-6">
              <p className="text-amber-500 text-sm font-semibold uppercase tracking-[0.3em]">
                Craftsmanship
              </p>
              <h3 className="mt-4 text-xl font-semibold text-stone-100">
                Handmade in Charsadda
              </h3>
              <p className="mt-3 text-sm leading-6 text-stone-400">
                Each pair is stitched by expert artisans using traditional
                techniques passed down through generations.
              </p>
            </div>
            <div className="rounded-3xl border border-stone-800 bg-stone-950/80 p-6">
              <p className="text-amber-500 text-sm font-semibold uppercase tracking-[0.3em]">
                Quality
              </p>
              <h3 className="mt-4 text-xl font-semibold text-stone-100">
                Premium leather & soles
              </h3>
              <p className="mt-3 text-sm leading-6 text-stone-400">
                Full-grain cow leather and reinforced tyre soles keep your
                chappals comfortable and long-lasting.
              </p>
            </div>
            <div className="rounded-3xl border border-stone-800 bg-stone-950/80 p-6">
              <p className="text-amber-500 text-sm font-semibold uppercase tracking-[0.3em]">
                Service
              </p>
              <h3 className="mt-4 text-xl font-semibold text-stone-100">
                Trusted shipping
              </h3>
              <p className="mt-3 text-sm leading-6 text-stone-400">
                Fast nationwide delivery, secure packaging, and easy size
                exchange for a worry-free shopping experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ShopClient initialProducts={products} />
      </div>

      <section className="bg-stone-900 border-t border-stone-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 bg-amber-600/10 text-amber-500 rounded-lg border border-amber-600/20">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-stone-200 text-sm">
                Free Nationwide Delivery
              </h4>
              <p className="text-xs text-stone-400">
                Cash on delivery available across Pakistan
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 bg-amber-600/10 text-amber-500 rounded-lg border border-amber-600/20">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-stone-200 text-sm">
                Authentic Craftsmanship
              </h4>
              <p className="text-xs text-stone-400">
                100% genuine local full-grain cow leather
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 bg-amber-600/10 text-amber-500 rounded-lg border border-amber-600/20">
              <RefreshCw size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-stone-200 text-sm">
                7-Day Easy Exchange
              </h4>
              <p className="text-xs text-stone-400">
                Hassle-free size replacement policy
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
