"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { Star, ShoppingBag, PhoneCall } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, guestAddToCart } from "@/store/cartSlice";
import toast from "react-hot-toast";
import { addToCart } from "@/actions/userActions";
import { CldImage } from "next-cloudinary";

export default function ProductInteractiveSection({ product }) {
  const dispatch = useDispatch();
  const [trasition, setTranstion] = useTransition();
  const [state, action, loading] = useActionState(addToCart);
  const { user, userLoading } = useSelector((state) => state.user);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const isOutOfStock = product.stok <= 0;
  const dicountedPrice = Math.floor(product.price / product.discount);
  const finalPrice = product.price - dicountedPrice;
  const whatsappMessage = encodeURIComponent(
    `Hello! I want to order "${product.title}" (SKU: ${product.id})\nSize: ${selectedSize}\nPrice: Rs. ${finalPrice}`,
  );

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

  const handleAddToCart = async () => {
    if (userLoading) return;

    if (!user) {
      dispatch(guestAddToCart({ ...product, qty: 1, size: selectedSize }));
      toast.success("added to cart");
      return;
    }
    setTranstion(() => {
      action({ productId: product._id, size: selectedSize });
    });
  };

  return (
    <>
      {/* Image Gallery (Left - 7 COLS) */}
      <div className="lg:col-span-7 space-y-4">
        {/* Active Hero Image */}
        <div className="relative aspect-square bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
          {product.discount > 0 && (
            <div className="absolute top-4 left-4 z-10 bg-amber-600 text-white text-xs font-bold uppercase px-3 py-1.5 rounded-md shadow">
              {product.discount}% OFF
            </div>
          )}
          <CldImage
            src={product.images[selectedImage] || product.images[0]}
            alt={`${product.title} View ${selectedImage + 1}`}
            fill
            quality={80}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Gallery Thumbnails */}
        {/* {product.images.length > 1 && ( */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden bg-stone-900 border-2 transition shrink-0 ${
                selectedImage === idx
                  ? "border-amber-500 scale-95"
                  : "border-stone-800 hover:border-stone-700 opacity-70 hover:opacity-100"
              }`}
            >
              <CldImage
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                quality={10}
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
        {/* )} */}
      </div>

      {/* Product Details & Actions (Right - 5 COLS) */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">
              {product.category}
            </span>
            <span className="text-stone-700">•</span>
            <span className="text-xs text-stone-500 uppercase font-mono">
              SKU: {product._id}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 mt-1">
            {product.title}
          </h1>

          {/* Rating & Stock Status */}
          <div className="flex items-center gap-4 mt-3 text-xs">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star size={14} className="fill-amber-500" />
              <span>{product.reviews.length > 0 ? "4.9" : "New Arrival"}</span>
              <span className="text-stone-500 font-normal">
                ({product.reviews.length} reviews)
              </span>
            </div>
            <span className="text-stone-700">•</span>
            {product.stock > 1 ? (
              <span className="inline-flex items-center gap-1.5 text-green-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-400 font-semibold">Out of Stock</span>
            )}
          </div>
        </div>

        {/* Price Card */}
        <div className="p-4 bg-stone-900/60 border border-stone-800 rounded-xl flex items-baseline gap-3">
          <span className="text-3xl font-bold text-amber-500">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.discount > 0 && (
            <>
              <span className="text-sm text-stone-500 line-through">
                Rs. {product.price.toLocaleString()}
              </span>
              <span className="ml-auto bg-amber-500/10 text-amber-500 text-[10px] font-bold px-2.5 py-1 rounded-md border border-amber-500/20">
                Save Rs. {(product.price - finalPrice).toLocaleString()}
              </span>
            </>
          )}
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          {product.shortDescription || product.description}
        </p>

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-stone-300 uppercase tracking-wide">
                Select Size (PK/UK):
              </label>
              <button className="text-amber-500 hover:underline font-medium text-[11px]">
                Size Chart
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 rounded-lg text-xs font-bold border transition ${
                    selectedSize === size
                      ? "bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-600/20"
                      : "bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            disabled={isOutOfStock || loading || trasition}
            onClick={handleAddToCart}
            className={`w-full bg-amber-600 hover:bg-amber-700 disabled:bg-stone-800 disabled:text-stone-500 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 group ${loading || trasition ? "cursor-not-allowed" : ""}`}
          >
            <ShoppingBag size={16} />
            <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
          </button>

          <a
            href={`https://wa.me/923379368405?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 font-semibold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
          >
            <PhoneCall size={16} className="text-green-500" />
            <span>Quick Order via WhatsApp</span>
          </a>
        </div>

        {/* Detailed Description */}
        <div className="pt-4 border-t border-stone-800">
          <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wide mb-2">
            Product Description
          </h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </>
  );
}
