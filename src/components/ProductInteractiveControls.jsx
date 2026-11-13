"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { Star, ShoppingBag, PhoneCall, Play } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, guestAddToCart } from "@/store/cartSlice";
import toast from "react-hot-toast";
import { addToCart } from "@/actions/userActions";
import ClImage from "./ClgImage";

export default function ProductInteractiveSection({ product }) {
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);
  const [trasition, setTranstion] = useTransition();
  const [state, action, loading] = useActionState(addToCart);
  const { user, userLoading } = useSelector((state) => state.user);

  const [selectedImage, setSelectedImage] = useState(0);
  const [isVideoSelected, setIsVideoSelected] = useState(false); // <-- Video state tracker
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");

  const initialColorObj = product?.colors?.[0];
  const initialColorName =
    typeof initialColorObj === "object"
      ? initialColorObj?.name
      : initialColorObj || "";
  const [selectedColor, setSelectedColor] = useState(initialColorName);

  const [images] = useState(product.images || []);
  const productVideo = product.video || "";

  const isOutOfStock = product.stok <= 0;
  const discountPrice = product.discount
    ? Math.floor(product.price / product.discount)
    : 0;
  const finalPrice = product.price - discountPrice;
  const whatsappMessage = encodeURIComponent(
    `Hello! I want to order "${product.title}" Size: ${selectedSize}, Color: ${selectedColor} - Rs. ${finalPrice}`,
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

  useEffect(() => {
    (async function () {
      const res = await fetch(`/api/review/${product._id}`);
      const result = await res.json();
      if (result.success) {
        setReviews(result.reviews);
      }
    })();
  }, [product._id]);

  // Handle Color Click & Switch Hero Image Automatically
  const handleColorClick = (colorItem) => {
    const colorName =
      typeof colorItem === "object" ? colorItem.name : colorItem;
    const colorImage = typeof colorItem === "object" ? colorItem.image : null;

    setSelectedColor(colorName);
    setIsVideoSelected(false); // Switch back to image view when color changes

    if (colorImage) {
      const imgIndex = images.findIndex((img) => img === colorImage);
      if (imgIndex !== -1) {
        setSelectedImage(imgIndex);
      }
    }
  };

  const handleAddToCart = async () => {
    if (userLoading) return;

    if (!user) {
      dispatch(
        guestAddToCart({
          ...product,
          qty: 1,
          size: selectedSize,
          color: selectedColor,
        }),
      );
      toast.success("Added to cart");
      return;
    }
    setTranstion(() => {
      action({
        productId: product._id,
        size: selectedSize,
        color: selectedColor,
      });
    });
  };

  return (
    <>
      {/* Image / Video Gallery (Left - 7 COLS) */}
      <div className="lg:col-span-7 space-y-4">
        {/* Active Hero Display: Shows Video if isVideoSelected is true, else shows Selected Image */}
        <div className="relative aspect-square bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-none flex items-center justify-center">
          {product.discount > 0 && !isVideoSelected && (
            <div className="absolute top-4 left-4 z-10 bg-amber-600 text-white text-xs font-bold uppercase px-3 py-1.5 rounded-md shadow">
              {product.discount}% OFF
            </div>
          )}

          {isVideoSelected && productVideo ? (
            <video
              src={productVideo}
              controls
              autoPlay
              className="w-full h-full object-cover bg-black"
            />
          ) : (
            <ClImage
              key={selectedImage}
              fill
              priority={selectedImage === 0}
              src={images[selectedImage] || images[0]}
              alt={`${product.title} View ${selectedImage + 1}`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-full object-cover transition-opacity duration-150"
            />
          )}
        </div>

        {/* Gallery Thumbnails & Video Thumbnail at Last */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsVideoSelected(false);
                setSelectedImage(idx);
              }}
              className={`relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 border-2 transition shrink-0 cursor-pointer ${
                !isVideoSelected && selectedImage === idx
                  ? "border-amber-600 dark:border-amber-500 scale-95 shadow-sm"
                  : "border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700 opacity-70 hover:opacity-100"
              }`}
            >
              <ClImage
                src={img}
                fill
                alt={`Thumbnail ${idx + 1}`}
                sizes="80px"
                className="w-full h-full object-cover"
              />
            </button>
          ))}

          {/* Product Video Thumbnail at the End */}
          {productVideo && (
            <button
              onClick={() => setIsVideoSelected(true)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden bg-stone-900 border-2 transition shrink-0 cursor-pointer flex flex-col items-center justify-center gap-1 ${
                isVideoSelected
                  ? "border-amber-600 dark:border-amber-500 scale-95 shadow-sm"
                  : "border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700 opacity-80 hover:opacity-100"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-amber-600/90 text-white flex items-center justify-center shadow">
                <Play size={14} className="fill-white ml-0.5" />
              </div>
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                Video
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Product Details & Actions (Right - 5 COLS) */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-amber-700 dark:text-amber-500 text-xs font-bold uppercase tracking-widest">
              {product.category}
            </span>
            <span className="text-stone-400 dark:text-stone-700">•</span>
            <span className="text-xs text-stone-500 uppercase font-mono">
              SKU: {product._id}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            {product.title}
          </h1>

          {/* Rating & Stock Status */}
          <div className="flex items-center gap-4 mt-3 text-xs">
            <div className="flex items-center gap-1 text-amber-600 dark:text-amber-500 font-bold">
              <Star size={14} className="fill-amber-500" />
              <span>{reviews.length > 0 ? "4.9" : "New Arrival"}</span>
              <span className="text-stone-500 font-normal">
                ({reviews.length} reviews)
              </span>
            </div>
            <span className="text-stone-400 dark:text-stone-700">•</span>
            {product.stock > 1 ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-green-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-green-500 animate-pulse" />
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-rose-600 dark:text-red-400 font-semibold">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Price Card */}
        <div className="p-4 bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl flex items-baseline gap-3 shadow-sm dark:shadow-none">
          <span className="text-3xl font-bold text-amber-600 dark:text-amber-500">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.discount > 0 && (
            <>
              <span className="text-sm text-stone-400 dark:text-stone-500 line-through">
                Rs. {(product.price + discountPrice).toLocaleString()}
              </span>
              <span className="ml-auto bg-amber-500/10 text-amber-700 dark:text-amber-500 text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-amber-500/20">
                Save Rs. {discountPrice.toLocaleString()}
              </span>
            </>
          )}
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {product?.shortDescription}
        </p>

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                Select Size (PK/UK):
              </label>
              <button className="text-amber-600 dark:text-amber-500 hover:underline font-medium text-[11px] cursor-pointer">
                Size Chart
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 rounded-lg text-xs font-bold border transition cursor-pointer ${
                    selectedSize === size
                      ? "bg-amber-600 text-white border-amber-600 dark:border-amber-500 shadow-md shadow-amber-600/20"
                      : "bg-stone-50 dark:bg-stone-900 border-stone-300 dark:border-stone-800 text-stone-800 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selection with Image Mapping Support */}
        {product.colors && product.colors.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
                Select Color:{" "}
                <span className="font-normal text-stone-500 capitalize">
                  ({selectedColor})
                </span>
              </label>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {product.colors.map((col, i) => {
                const colorName = typeof col === "object" ? col.name : col;
                const colorImg = typeof col === "object" ? col.image : null;
                const isSelected = selectedColor === colorName;

                return (
                  <button
                    key={i}
                    onClick={() => handleColorClick(col)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition cursor-pointer ${
                      isSelected
                        ? "border-amber-600 dark:border-amber-400 bg-amber-50/40 dark:bg-amber-950/20 shadow-sm"
                        : "border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 hover:border-stone-400 dark:hover:border-stone-700"
                    }`}
                  >
                    {colorImg && (
                      <div className="w-6 h-6 rounded-md overflow-hidden bg-stone-100 shrink-0">
                        <img
                          src={colorImg}
                          alt={colorName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200 capitalize">
                      {colorName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            disabled={isOutOfStock || loading || trasition}
            onClick={handleAddToCart}
            className={`w-full bg-amber-600 hover:bg-amber-700 disabled:bg-stone-200 dark:disabled:bg-stone-800 disabled:text-stone-400 dark:disabled:text-stone-500 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 group cursor-pointer ${
              loading || trasition ? "cursor-not-allowed" : ""
            }`}
          >
            <ShoppingBag size={16} />
            <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
          </button>

          <a
            href={`https://wa.me/923469715695?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-stone-100 hover:bg-stone-200 dark:bg-stone-900 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-800 font-semibold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
          >
            <PhoneCall
              size={16}
              className="text-emerald-600 dark:text-green-500"
            />
            <span>Quick Order via WhatsApp</span>
          </a>
        </div>

        {/* Product Description */}
        <div className="pt-6 border-t border-stone-200 dark:border-stone-800 w-full max-w-full overflow-hidden">
          <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-3">
            Product Description
          </h4>

          <div
            className="w-full max-w-full overflow-hidden break-words rounded-xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800/80 p-4 sm:p-5 text-sm text-stone-600 dark:text-stone-300 leading-relaxed transition-colors duration-300
    [&_*]:max-w-full
    [&_h1]:font-serif [&_h1]:text-lg [&_h1]:font-bold [&_h1]:text-stone-900 dark:[&_h1]:text-stone-100 [&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:first:mt-0
    [&_h2]:font-serif [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-stone-900 dark:[&_h2]:text-stone-100 [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:first:mt-0
    [&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-stone-800 dark:[&_h3]:text-stone-200 [&_h3]:mt-3 [&_h3]:mb-1.5
    [&_p]:mb-3 [&_p]:last:mb-0
    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:mb-3 [&_ul]:marker:text-amber-600 dark:[&_ul]:marker:text-amber-500
    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:mb-3 [&_ol]:marker:text-amber-600 dark:[&_ul]:marker:text-amber-500
    [&_li]:pl-1
    [&_strong]:font-semibold [&_strong]:text-stone-900 dark:[&_strong]:text-stone-100
    [&_a]:text-amber-600 dark:[&_a]:text-amber-500 [&_a]:underline [&_a]:break-all hover:[&_a]:text-amber-700
    [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-3
    [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:my-3
    [&_pre]:overflow-x-auto [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:bg-stone-100 dark:[&_pre]:bg-stone-950
    [&_blockquote]:border-l-2 [&_blockquote]:border-amber-600 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-stone-500 dark:[&_blockquote]:text-stone-400 [&_blockquote]:my-3"
            dangerouslySetInnerHTML={{
              __html: product.description?.replace(/&nbsp;/g, " ") || "",
            }}
          />
        </div>
      </div>
    </>
  );
}
