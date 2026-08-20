"use client";

import { addToCart } from "@/actions/userActions";
import { getCartItems, guestAddToCart } from "@/store/cartSlice";
import { ShoppingBag } from "lucide-react";
import { useActionState, useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function AddToCart({ product }) {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

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
      dispatch(guestAddToCart({ ...product, size: selectedSize }));
      toast.success("added to cart");
      return;
    }

    // Logged-in user
    startTransition(() => {
      action({ productId: product._id, size: selectedSize });
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
    <>
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Select Size (UK/PK):
          </span>
          <span className="text-xs font-semibold text-amber-500">
            Size {selectedSize} Selected
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {product?.sizes?.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-10 h-10 rounded-lg text-xs font-bold transition border ${
                selectedSize === size
                  ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20"
                  : "bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-600 hover:text-white"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-stone-800 hover:bg-amber-600 text-stone-200 hover:text-white text-xs font-bold py-2.5 rounded-lg transition border border-stone-700 hover:border-amber-600 flex items-center justify-center gap-2"
      >
        <ShoppingBag size={14} />
        Add to Cart
      </button>
    </>
  );
}
