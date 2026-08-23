import { Heart } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <a href="#" className="inline-block">
            <span className="font-serif text-2xl font-bold tracking-tight text-stone-100">
              CHARSADDA<span className="text-amber-600">.</span>
            </span>
          </a>
          <p className="text-xs text-stone-500 mt-1">
            © 2026 Charsadda Heritage Footwear. All rights reserved.
          </p>
        </div>

        <div className="flex space-x-6 text-xs text-stone-400">
          <a href="#" className="hover:text-amber-500 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-amber-500 transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-amber-500 transition">
            Return & Exchange
          </a>
          <a href="#" className="hover:text-amber-500 transition">
            Contact Us
          </a>
        </div>
      </div>
      <div>
        <h1>
          Powered By <Heart />
          ROMAN KHAN
        </h1>
      </div>
    </footer>
  );
}
