"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Package,
  Image as ImageIcon,
  Video as VideoIcon,
  Tag,
  Layers,
  Loader2,
  Plus,
  Trash2,
  Play,
} from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { categories } from "@/lib/categories";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function AdminEditProductPage({ params }) {
  const resolvedParams = use(params);
  const productId = resolvedParams?.id;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: categories[0],
    price: "",
    salePrice: "",
    stock: "",
    description: "",
    isFeatured: false,
    inStock: true,
    shortDescription: "",
  });

  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [currColor, setCurrColor] = useState("#000000");
  const [currColorImage, setCurrColorImage] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState("");

  // Fetch Existing Product Data
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/admin/api/products/${productId}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            title: data.title || "",
            slug: data.slug || "",
            category: data.category || categories[0],
            price: data.price || "",
            salePrice: data.salePrice || "",
            stock: data.stock || "",
            description: data.description || "",
            shortDescription: data.shortDescription || "",
            isFeatured: data.isFeatured || false,
            inStock: data.inStock ?? true,
          });
          setSizes(
            data.sizes && data.sizes.length > 0
              ? data.sizes
              : ["6", "7", "8", "9", "10", "11"],
          );
          setImages(data.images && data.images.length > 0 ? data.images : []);
          setColors(data.colors || []);
          setVideo(data.video || "");
        } else {
          alert("Failed to fetch product details.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    if (productId) fetchProduct();
  }, [productId]);

  const removeImageField = (index) =>
    setImages(images.filter((_, i) => i !== index));

  const handleSizeToggle = (sizeStr) => {
    if (sizes.includes(sizeStr)) {
      setSizes(sizes.filter((s) => s !== sizeStr));
    } else {
      setSizes([...sizes, sizeStr]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/admin/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          salePrice: formData.salePrice ? Number(formData.salePrice) : null,
          stock: Number(formData.stock),
          sizes,
          colors,
          images: images.filter((img) => img.trim() !== ""),
          video,
        }),
      });

      if (res.ok) {
        alert("Product updated successfully!");
        router.refresh();
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex items-center justify-center">
        <Loader2
          className="animate-spin text-amber-600 dark:text-amber-500"
          size={32}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div className="space-y-1">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-500 transition font-medium mb-1"
            >
              <ArrowLeft size={14} /> Back to Products
            </Link>
            <h1 className="font-serif font-bold text-2xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
              Edit Product{" "}
              <span className="text-amber-600 dark:text-amber-500 text-lg">
                ({formData.title || "Untitled"})
              </span>
            </h1>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            <span>{saving ? "Saving..." : "Update Product"}</span>
          </button>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {/* General Information Box */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm dark:shadow-none space-y-5">
              <h2 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 pb-3 border-b border-stone-100 dark:border-stone-800 flex items-center gap-2">
                <Package
                  size={18}
                  className="text-amber-600 dark:text-amber-500"
                />{" "}
                General Information
              </h2>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    Product Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. Special KhyberCraft Kaptaan Chappal"
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="khybercraft-kaptaan-chappal"
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-600 transition font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    Short Description
                  </label>
                  <textarea
                    value={formData?.shortDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shortDescription: e.target.value,
                      })
                    }
                    placeholder="Detail..."
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-600 transition font-mono"
                  ></textarea>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    Description
                  </label>
                  <div className="bg-white dark:bg-stone-950 rounded-xl overflow-hidden border border-stone-300 dark:border-stone-800 focus-within:border-amber-600">
                    <ReactQuill
                      theme="snow"
                      value={formData.description}
                      onChange={(value) =>
                        setFormData({ ...formData, description: value })
                      }
                      placeholder="Enter detailed craft and leather details..."
                      className="min-h-[180px] text-sm text-stone-900 dark:text-stone-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Box */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm dark:shadow-none space-y-5">
              <h2 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 pb-3 border-b border-stone-100 dark:border-stone-800 flex items-center gap-2">
                <Tag size={18} className="text-amber-600 dark:text-amber-500" />{" "}
                Pricing & Discount
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    Regular Price (PKR)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="5500"
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    Sale Price (Optional)
                  </label>
                  <input
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) =>
                      setFormData({ ...formData, salePrice: e.target.value })
                    }
                    placeholder="4800"
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                  />
                </div>
              </div>
            </div>

            {/* Sizes Box */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm dark:shadow-none space-y-4">
              <h2 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 pb-3 border-b border-stone-100 dark:border-stone-800 flex items-center gap-2">
                <Layers
                  size={18}
                  className="text-amber-600 dark:text-amber-500"
                />{" "}
                Available Sizes
              </h2>

              <div className="flex flex-wrap gap-2">
                {["6", "7", "8", "9", "10", "11", "12"].map((size) => {
                  const isSelected = sizes.includes(size);
                  return (
                    <button
                      type="button"
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={`w-12 h-12 rounded-xl text-xs font-bold border transition flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? "bg-amber-600 border-amber-600 text-white shadow-sm"
                          : "bg-stone-50 dark:bg-stone-950 border-stone-300 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors & Associated Images Box */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm dark:shadow-none space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-stone-100 dark:border-stone-800">
                <h2 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Layers
                    size={18}
                    className="text-amber-600 dark:text-amber-500"
                  />{" "}
                  Color Variants & Linked Images
                </h2>
                <span className="text-xs text-stone-500 font-medium">
                  {colors.length} {colors.length === 1 ? "Variant" : "Variants"}
                </span>
              </div>

              {/* Display Already Added Color Variants */}
              {colors.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  {colors.map((c, i) => (
                    <div
                      key={c._id}
                      className="relative group flex items-center gap-3 p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl"
                    >
                      {/* Color Preview Box/Circle */}
                      <div
                        className="w-8 h-8 rounded-full border border-stone-300 dark:border-stone-700 shrink-0 shadow-sm"
                        style={{ backgroundColor: c.name.toLowerCase() }}
                        title={c.name}
                      />
                      {/* Linked Image Thumbnail */}
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 shrink-0">
                        {c.image ? (
                          <img
                            src={c.image}
                            alt={c.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[9px] text-stone-400">
                            No Img
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-stone-800 dark:text-stone-200 capitalize">
                          {c.name}
                        </p>
                        <p className="text-[10px] text-stone-500 truncate">
                          {c.image ? "Image mapped" : "Default"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setColors(colors.filter((_, idx) => idx !== i))
                        }
                        className="bg-rose-600 hover:bg-rose-700 text-white p-1.5 rounded-lg transition cursor-pointer shrink-0"
                        title="Remove variant"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Color by Mapping Uploaded Images */}
              <div className="space-y-4 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs py-4 font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                      Color Name / Hex
                    </label>
                    <input
                      type="color"
                      value={currColor}
                      onChange={(e) => setCurrColor(e.target.value)}
                      placeholder="e.g. Brown, Black, #8B5A2B"
                      className="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                      Select from Uploaded Images
                    </label>
                    <select
                      value={currColorImage}
                      onChange={(e) => setCurrColorImage(e.target.value)}
                      className="w-full bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 transition"
                    >
                      <option value="">
                        -- Choose image for this color --
                      </option>
                      {images.map((img, idx) => (
                        <option value={img} key={idx}>
                          Image #{idx + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Thumbnail Preview of Selected Image before adding */}
                {currColorImage && (
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs text-stone-500">
                      Selected Preview:
                    </span>
                    <div className="w-14 h-14 rounded-lg overflow-hidden border border-amber-600 shadow-sm">
                      <img
                        src={currColorImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (!currColor.trim()) {
                      alert("Pehle color ka naam ya code likhein!");
                      return;
                    }
                    if (!currColorImage) {
                      alert(
                        "Baraye meherbani is color ke liye upar di gayi images mein se ek image select karein!",
                      );
                      return;
                    }
                    if (
                      !colors.some(
                        (c) => c.name.toLowerCase() === currColor.toLowerCase(),
                      )
                    ) {
                      setColors([
                        ...colors,
                        { name: currColor, image: currColorImage },
                      ]);
                      setCurrColor("");
                      setCurrColorImage("");
                    } else {
                      alert("Ye color pehle se added hai!");
                    }
                  }}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-md shadow-amber-600/20 flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Add Color Variant with Image
                </button>
              </div>

              <p className="text-[11px] text-stone-500">
                Note: Pehle upar "Product Images" mein apni images upload
                karein, phir yahan color likh kar unhi images mein se select kar
                lein.
              </p>
            </div>

            {/* Product Images Box */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm dark:shadow-none space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-stone-100 dark:border-stone-800">
                <h2 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <ImageIcon
                    size={18}
                    className="text-amber-600 dark:text-amber-500"
                  />{" "}
                  Product Images
                </h2>
                <span className="text-xs text-stone-500 font-medium">
                  {images.length} {images.length === 1 ? "Image" : "Images"}
                </span>
              </div>

              <CldUploadButton
                className="w-full"
                uploadPreset="ibrahim"
                options={{ resourceType: "image" }}
                onSuccess={(result) => {
                  setImages((pre) => [...pre, result.info.secure_url]);
                }}
              >
                <div className="border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-amber-600 dark:hover:border-amber-500 bg-stone-50 dark:bg-stone-950 hover:bg-amber-50/30 dark:hover:bg-amber-950/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition group w-full">
                  <div className="p-3 bg-white dark:bg-stone-900 rounded-full border border-stone-200 dark:border-stone-800 shadow-sm text-stone-600 dark:text-stone-300 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition">
                    <Plus size={20} />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      Click to upload product images
                    </p>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      PNG, JPG, WEBP up to 5MB each
                    </p>
                  </div>
                </div>
              </CldUploadButton>

              <div>
                {images.filter((img) => img.trim() !== "").length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                    {images
                      .filter((img) => img.trim() !== "")
                      .map((imgUrl, idx) => (
                        <div
                          key={idx}
                          className="relative group aspect-square rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 shadow-sm"
                        >
                          <img
                            src={imgUrl}
                            alt={`Product Preview ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />

                          <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => removeImageField(idx)}
                              className="bg-rose-600 hover:bg-rose-700 text-white p-2 rounded-lg shadow-md transition transform hover:scale-110 cursor-pointer"
                              title="Remove Image"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          {idx === 0 && (
                            <span className="absolute top-2 left-2 bg-amber-600 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow">
                              Cover
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Video Box */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm dark:shadow-none space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-stone-100 dark:border-stone-800">
                <h2 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <VideoIcon
                    size={18}
                    className="text-amber-600 dark:text-amber-500"
                  />{" "}
                  Product Video
                </h2>
                {video && (
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                    Video Added
                  </span>
                )}
              </div>

              {video ? (
                <div className="relative group rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-black">
                  <video
                    src={video}
                    controls
                    className="w-full aspect-video object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setVideo("")}
                    className="absolute top-3 right-3 bg-rose-600 hover:bg-rose-700 text-white p-2 rounded-lg shadow-md transition flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                  >
                    <Trash2 size={14} /> Remove Video
                  </button>
                </div>
              ) : (
                <CldUploadButton
                  className="w-full"
                  uploadPreset="ibrahim"
                  options={{
                    resourceType: "video",
                    maxFiles: 1,
                    clientAllowedFormats: ["mp4", "webm", "mov"],
                    maxFileSize: 50000000,
                  }}
                  onSuccess={(result) => {
                    setVideo(result.info.secure_url);
                  }}
                >
                  <div className="border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-amber-600 dark:hover:border-amber-500 bg-stone-50 dark:bg-stone-950 hover:bg-amber-50/30 dark:hover:bg-amber-950/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition group w-full">
                    <div className="p-3 bg-white dark:bg-stone-900 rounded-full border border-stone-200 dark:border-stone-800 shadow-sm text-stone-600 dark:text-stone-300 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition">
                      <Play size={20} />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                        Click to upload product Video
                      </p>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        MP4, WEBM up to 50MB
                      </p>
                    </div>
                  </div>
                </CldUploadButton>
              )}
            </div>
          </div>

          {/* Right Column (4 COLS): Organization & Visibility */}
          <div className="lg:col-span-4 space-y-6">
            {/* Category & Inventory */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm dark:shadow-none space-y-5">
              <h2 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 pb-3 border-b border-stone-100 dark:border-stone-800">
                Inventory & Category
              </h2>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 transition"
                  >
                    {categories.map((val, i) => (
                      <option key={i} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    placeholder="25"
                    className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
                  />
                </div>
              </div>
            </div>

            {/* Visibility Settings */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm dark:shadow-none space-y-4">
              <h2 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 pb-3 border-b border-stone-100 dark:border-stone-800">
                Visibility Settings
              </h2>

              <div className="space-y-4 text-xs">
                <label className="flex items-center justify-between cursor-pointer p-3 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-200 dark:border-stone-800">
                  <span className="font-bold text-stone-800 dark:text-stone-200">
                    In Stock Status
                  </span>
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) =>
                      setFormData({ ...formData, inStock: e.target.checked })
                    }
                    className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer p-3 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-200 dark:border-stone-800">
                  <span className="font-bold text-stone-800 dark:text-stone-200">
                    Featured Product (Home Page)
                  </span>
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                    className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
