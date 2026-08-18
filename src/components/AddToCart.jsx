"use client";

import { addToCart } from "@/actions/userActions";
import { getCartItems, guestAddToCart } from "@/store/cartSlice";
import { ShoppingBag } from "lucide-react";
import { useActionState, useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function AddToCart({ product }) {
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);

  const [state, action, loading] = useActionState(addToCart, null);
  const [isTransitioning, startTransition] = useTransition();

  const { user, userLoading } = useSelector((state) => state.user);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message);
        dispatch(getCartItems());
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  const handleAddToCart = () => {
    // Guest user
    if (!user && !userLoading) {
      dispatch(guestAddToCart(product));
      return;
    }

    // Logged-in user
    startTransition(() => {
      action(product._id);
    });
  };

  // Server aur initial client render same rahega
  if (!mounted) {
    return (
      <button
        disabled
        className="w-full bg-stone-800 text-stone-400 text-xs font-bold py-2.5 rounded-lg transition border border-stone-700 flex items-center justify-center gap-2 cursor-not-allowed opacity-60"
      >
        <ShoppingBag size={14} />
        Loading...
      </button>
    );
  }

  // User authentication loading
  if (userLoading) {
    return (
      <button
        disabled
        className="w-full bg-stone-700 text-stone-400 text-xs font-bold py-2.5 rounded-lg transition border border-stone-700 flex items-center justify-center gap-2 cursor-not-allowed opacity-60"
      >
        <ShoppingBag size={14} />
        Loading...
      </button>
    );
  }

  // Add to cart loading
  if (loading || isTransitioning) {
    return (
      <button
        disabled
        className="w-full bg-stone-700 text-stone-400 text-xs font-bold py-2.5 rounded-lg transition border border-stone-700 flex items-center justify-center gap-2 cursor-not-allowed opacity-60"
      >
        <div className="animate-spin">
          <ShoppingBag size={14} />
        </div>
        Adding...
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-stone-800 hover:bg-amber-600 text-stone-200 hover:text-white text-xs font-bold py-2.5 rounded-lg transition border border-stone-700 hover:border-amber-600 flex items-center justify-center gap-2"
    >
      <ShoppingBag size={14} />
      Add to Cart
    </button>
  );
}
