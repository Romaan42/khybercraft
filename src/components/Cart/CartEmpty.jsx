import Link from "next/link";
import { ShoppingBag, ArrowLeft, Sparkles } from "lucide-react";

export default function EmptyCheckoutCart() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      {/* Icon Badge with Glow Effect */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-amber-600/20 dark:bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative w-24 h-24 bg-amber-50 dark:bg-stone-900 border border-amber-200 dark:border-stone-800 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-500 shadow-sm">
          <ShoppingBag size={42} className="stroke-[1.5]" />
        </div>
      </div>

      {/* Heading & Subtitle */}
      <span className="text-xs uppercase tracking-widest font-bold text-amber-600 dark:text-amber-500 mb-2">
        Your Cart is Empty
      </span>
      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 max-w-md">
        No heritage items found in your cart
      </h1>
      <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm mt-2 max-w-sm leading-relaxed">
        It looks like you haven&apos;t added any traditional footwear to your
        cart yet. Explore our handcrafted collection to get started.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-xs">
        <Link
          href="/shop"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles size={16} />
          <span>Explore Shop</span>
        </Link>
        <Link
          href="/"
          className="w-full bg-stone-100 hover:bg-stone-200 dark:bg-stone-900 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-800 font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
