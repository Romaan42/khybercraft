import React from "react";
import Link from "next/link";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Contact Us | Charsadda Heritage Footwear",
  description:
    "Get in touch with us for custom sizing, order tracking, wholesale inquiries, or general questions about our authentic handcrafted Chappals.",
};
src =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105822.84587900746!2d71.70119335!3d34.14815525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d930263be4c47f%3A0xbbe1752b9fae23b8!2sCharsadda%2C%20Khyber%20Pakhtunkhwa!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-600 selection:text-white flex flex-col justify-between">
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1">
        {/* Breadcrumb Navigation */}
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
            <li className="text-amber-500 font-medium">Contact Us</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-amber-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles size={14} /> Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mt-2">
            We're Here to Help You
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm mt-3 leading-relaxed">
            Have questions about your chappal size, custom design requests, or
            order tracking? Reach out to our team or chat directly with our
            craftsmen.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ----------------- LEFT: QUICK CONTACT INFO (5 COLS) ----------------- */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick WhatsApp Card */}
            <div className="bg-gradient-to-br from-amber-900/30 to-stone-900 border border-amber-600/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-600/20 text-amber-500 border border-amber-500/30 rounded-xl flex items-center justify-center shrink-0">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-100">
                    Need Quick Support?
                  </h3>
                  <p className="text-xs text-stone-300 mt-1">
                    Chat with us directly on WhatsApp for real-time sizing
                    assistance or custom orders.
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/923001234567?text=Hello%2C%20I%20have%20a%20question%20regarding%20Charsadda%20Chappal"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20"
              >
                <PhoneCall size={16} className="text-white" />
                <span>Chat On WhatsApp</span>
              </a>
            </div>

            {/* Info Cards */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl text-amber-500 shrink-0">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    Call / WhatsApp
                  </h4>
                  <p className="text-sm font-semibold text-stone-100 mt-1">
                    +92 300 1234567
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Mon - Sat (10:00 AM to 9:00 PM)
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 pt-4 border-t border-stone-800">
                <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl text-amber-500 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    Email Address
                  </h4>
                  <p className="text-sm font-semibold text-stone-100 mt-1">
                    support@charsaddaheritage.com
                  </p>
                  <p className="text-[11px] text-stone-500">
                    We respond within 24 hours.
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 pt-4 border-t border-stone-800">
                <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl text-amber-500 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    Main Workshop & Outlet
                  </h4>
                  <p className="text-sm font-semibold text-stone-100 mt-1">
                    Main Bazaar, Charsadda City, KPK, Pakistan
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Handcrafting authentic footwear since 1985.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ----------------- RIGHT: SIMPLE CONTACT FORM (7 COLS) ----------------- */}
          <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-100 pb-4 border-b border-stone-800">
              Send Us a Message
            </h2>

            <form className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Your Name <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Khan Sahib"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Phone Number <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Subject
                </label>
                <select className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-300 focus:outline-none focus:border-amber-600 transition">
                  <option value="general">General Inquiry</option>
                  <option value="size">Size Assistance / Fit Guide</option>
                  <option value="custom">Custom Design Order</option>
                  <option value="wholesale">Wholesale / Bulk Order</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Your Message <span className="text-amber-500">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write your message or inquiry details here..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-4 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-600 transition resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 group"
              >
                <span>Send Message</span>
                <Send
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>
          </div>
        </div>

        {/* ----------------- GOOGLE MAP EMBED FRAME ----------------- */}
        <div className="mt-12 bg-stone-900 border border-stone-800 rounded-2xl p-2 overflow-hidden">
          <iframe
            title="Charsadda Heritage Store Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105822.84587900746!2d71.70119335!3d34.14815525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d930263be4c47f%3A0xbbe1752b9fae23b8!2sCharsadda%2C%20Khyber%20Pakhtunkhwa!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
            width="100%"
            height="320"
            style={{ border: 0, borderRadius: "0.75rem" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale contrast-125 opacity-80 hover:opacity-100 hover:grayscale-0 transition duration-500"
          ></iframe>
        </div>
      </main>
    </div>
  );
}
