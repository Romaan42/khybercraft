"use client";
import { logoutUser } from "@/actions/userActions";
import { getAllItems, getCartItems } from "@/store/cartSlice";
import { checkLogin } from "@/store/userSlice";
import {
  Heart,
  Menu,
  PhoneCall,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, userLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  useEffect(() => {
    if (!user && !userLoading) {
      dispatch(getAllItems());
      return;
    }
    dispatch(getCartItems());
  }, [user]);

  const handleLogout = async () => {
    // Implement logout functionality here
    await logoutUser();
    dispatch(checkLogin());
  };

  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Shop",
      link: "/shop",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "About",
      link: "/about",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-stone-900/90 backdrop-blur-md border-b border-stone-800">
      <Toaster />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-stone-400 hover:text-amber-500 hover:bg-stone-800 transition"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-100 group-hover:text-amber-500 transition">
                KHYBERCRAFT<span className="text-amber-600">.</span>
              </span>

              <span className="block text-[10px] uppercase tracking-[0.3em] text-stone-400 -mt-1 font-semibold">
                Heritage Footwear
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
            {links.map((val) => (
              <Link
                key={val.name}
                href={val.link}
                className="text-stone-300 hover:text-amber-500 transition"
              >
                {val.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search */}
            <button className="p-2 text-stone-300 hover:text-amber-500 transition hidden sm:block">
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="p-2 text-stone-300 hover:text-amber-500 transition hidden sm:block"
            >
              <Heart size={20} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 text-stone-300 hover:text-amber-500 transition relative"
            >
              <ShoppingBag size={22} />

              <span className="absolute top-1 right-1 bg-amber-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cart.items.length}
              </span>
            </Link>

            {/* User Authentication */}
            {userLoading ? (
              <div className="hidden sm:flex items-center gap-2 px-3 py-2">
                <div className="w-5 h-5 rounded-full bg-stone-700 animate-pulse" />
                <div className="w-20 h-4 rounded bg-stone-700 animate-pulse" />
              </div>
            ) : user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/profile"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 text-stone-200 hover:text-amber-500 transition"
                >
                  <User size={19} />

                  <span className="text-sm font-medium">{user.name}</span>
                </Link>
                <button
                  className="px-3 py-2 text-sm font-medium text-stone-300 hover:text-red-400 transition cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <Link
                  href="/login"
                  className="text-stone-300 hover:text-amber-500 transition font-medium"
                >
                  Login
                </Link>

                <span className="text-stone-600">/</span>

                <Link
                  href="/register"
                  className="text-amber-500 hover:text-amber-400 transition font-semibold"
                >
                  Register
                </Link>
              </div>
            )}

            {/* WhatsApp */}
            <a
              href="https://wa.me/923139598855"
              className="hidden md:inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full transition shadow-lg shadow-amber-600/20"
            >
              <PhoneCall size={14} />
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-800 bg-stone-900 px-4 pt-2 pb-6 space-y-3">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-stone-300 hover:bg-stone-800 hover:text-amber-500"
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Auth */}
          {user ? (
            <Link
              href="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-amber-500 font-semibold"
            >
              <User size={18} />
              {user.name}
            </Link>
          ) : (
            <div className="flex items-center gap-4 px-3 py-2">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-stone-300 hover:text-amber-500 font-medium"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-amber-500 hover:text-amber-400 font-semibold"
              >
                Register
              </Link>
            </div>
          )}

          {/* WhatsApp */}
          <div className="pt-2">
            <a
              href="#order"
              className="flex items-center justify-center gap-2 w-full bg-amber-600 text-white font-bold py-2.5 rounded-md text-sm"
            >
              <PhoneCall size={16} />
              Order on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
