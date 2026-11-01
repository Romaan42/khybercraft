import ShopClient from "@/components/shop/ClientShop";
import { Sparkles, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Shop Charsadda Chappal | Handcrafted Leather Collection",
  description:
    "Shop the finest handcrafted Kaptaan, Norozi, and Peshawari chappals made with premium leather and durable soles.",
};

export default async function ShopPage() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/products`, {
      cache: "no-store",
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
  } catch (err) {
    console.log(err);
    return <h1>something went wrong</h1>;
  }
}
