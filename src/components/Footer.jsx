import { Heart } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-stone-100 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 pt-12 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <a href="#" className="inline-block">
            <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              CHARSADDA<span className="text-amber-600">.</span>
            </span>
          </a>
          <p className="text-xs text-stone-600 dark:text-stone-500 mt-1">
            © 2026 Charsadda Heritage Footwear. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs text-stone-600 dark:text-stone-400">
          <a
            href="#"
            className="hover:text-amber-600 dark:hover:text-amber-500 transition"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-amber-600 dark:hover:text-amber-500 transition"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-amber-600 dark:hover:text-amber-500 transition"
          >
            Return & Exchange
          </a>
          <a
            href="#"
            className="hover:text-amber-600 dark:hover:text-amber-500 transition"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Developer Credit */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-stone-200/80 dark:border-stone-800/80 text-center">
        <p className="inline-flex items-center justify-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
          <span>Powered with</span>
          <Heart
            size={14}
            className="text-red-500 fill-red-500 animate-pulse"
          />
          <span>by</span>
          <span className="font-serif font-bold tracking-wider uppercase text-amber-600 dark:text-amber-500 hover:underline cursor-pointer">
            ROMAN KHAN
          </span>
        </p>
      </div>
    </footer>
  );
}
