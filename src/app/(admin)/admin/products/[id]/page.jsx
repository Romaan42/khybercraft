"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Package,
  Image as ImageIcon,
  Tag,
  Layers,
  Loader2,
  AlertCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { CldUploadButton } from "next-cloudinary";

export default function AdminEditProductPage({ params }) {
  const resolvedParams = use(params);
  const productId = resolvedParams?.id;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Product Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Traditional Chappal",
    price: "",
    salePrice: "",
    stock: "",
    description: "",
    isFeatured: false,
    inStock: true,
  });

  const [sizes, setSizes] = useState(["6", "7", "8", "9", "10", "11"]);
  const [images, setImages] = useState([""]);

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
            category: data.category || "Traditional Chappal",
            price: data.price || "",
            salePrice: data.salePrice || "",
            stock: data.stock || "",
            description: data.description || "",
            isFeatured: data.isFeatured || false,
            inStock: data.inStock ?? true,
          });
          setSizes(
            data.sizes && data.sizes.length > 0
              ? data.sizes
              : ["6", "7", "8", "9", "10", "11"],
          );
          setImages(data.images && data.images.length > 0 ? data.images : [""]);
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

  // Dynamic Array Handlers for Images
  const handleImageChange = (index, value) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  const addImageField = () => setImages([...images, ""]);
  const removeImageField = (index) =>
    setImages(images.filter((_, i) => i !== index));

  // Dynamic Array Handlers for Sizes
  const handleSizeToggle = (sizeStr) => {
    if (sizes.includes(sizeStr)) {
      setSizes(sizes.filter((s) => s !== sizeStr));
    } else {
      setSizes([...sizes, sizeStr]);
    }
  };

  // Submit Handler
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
          images: images.filter((img) => img.trim() !== ""),
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
      <div className="min-h-screen bg-stone-100 text-stone-900 flex items-center justify-center">
        <Loader2 className="animate-spin text-amber-600" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div className="space-y-1">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-amber-600 transition font-medium mb-1"
            >
              <ArrowLeft size={14} /> Back to Products
            </Link>
            <h1 className="font-serif font-bold text-2xl text-stone-900 flex items-center gap-2">
              Edit Product{" "}
              <span className="text-amber-600 text-lg">
                ({formData.title || "Untitled"})
              </span>
            </h1>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm"
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
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-5">
              <h2 className="font-serif font-bold text-base text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
                <Package size={18} className="text-amber-600" /> General
                Information
              </h2>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Product Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. Special Charsadda Kaptaan Chappal"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="charsadda-kaptaan-chappal"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white transition font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Description
                  </label>
                  <textarea
                    rows={5}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter detailed craft and leather details..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-4 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white transition resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Box */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-5">
              <h2 className="font-serif font-bold text-base text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
                <Tag size={18} className="text-amber-600" /> Pricing & Discount
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Regular Price (PKR)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="5500"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Sale Price (Optional)
                  </label>
                  <input
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) =>
                      setFormData({ ...formData, salePrice: e.target.value })
                    }
                    placeholder="4800"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white transition"
                  />
                </div>
              </div>
            </div>

            {/* Sizes Box */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="font-serif font-bold text-base text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
                <Layers size={18} className="text-amber-600" /> Available Sizes
              </h2>

              <div className="flex flex-wrap gap-2">
                {["6", "7", "8", "9", "10", "11", "12"].map((size) => {
                  const isSelected = sizes.includes(size);
                  return (
                    <button
                      type="button"
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={`w-12 h-12 rounded-xl text-xs font-bold border transition flex items-center justify-center ${
                        isSelected
                          ? "bg-amber-600 border-amber-600 text-white shadow-sm"
                          : "bg-stone-50 border-stone-300 text-stone-700 hover:bg-stone-100"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Images Box */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
              <CldUploadButton
                className="w-full"
                uploadPreset="ibrahim"
                onSuccess={(result) => {
                  console.log("product uploaded success", result);

                  setImages((pre) => [...pre, result.info.secure_url]);
                }}
              >
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                    <h2 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                      <ImageIcon size={18} className="text-amber-600" /> Product
                      Images
                    </h2>
                    <span className="text-xs text-stone-500 font-medium">
                      {images.length} {images.length === 1 ? "Image" : "Images"}
                    </span>
                  </div>

                  <label className="border-2 border-dashed border-stone-300 hover:border-amber-600 bg-stone-50 hover:bg-amber-50/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition group">
                    <div className="p-3 bg-white rounded-full border border-stone-200 shadow-sm text-stone-600 group-hover:text-amber-600 transition">
                      <Plus size={20} />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-stone-800">
                        Click to upload product images
                      </p>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        PNG, JPG, WEBP up to 5MB each
                      </p>
                    </div>
                  </label>
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
                          className="relative group aspect-square rounded-xl overflow-hidden border border-stone-200 bg-stone-100 shadow-sm"
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
                              className="bg-rose-600 hover:bg-rose-700 text-white p-2 rounded-lg shadow-md transition transform hover:scale-110"
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
          </div>

          {/* Right Column (4 COLS): Organization & Visibility */}
          <div className="lg:col-span-4 space-y-6">
            {/* Category & Inventory */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-5">
              <h2 className="font-serif font-bold text-base text-stone-900 pb-3 border-b border-stone-100">
                Inventory & Category
              </h2>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:border-amber-600 focus:bg-white transition"
                  >
                    <option value="Traditional Chappal">
                      Traditional Chappal
                    </option>
                    <option value="Kaptaan Special">Kaptaan Special</option>
                    <option value="Norani Chappal">Norani Chappal</option>
                    <option value="Zalmi Cut">Zalmi Cut</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    placeholder="25"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white transition"
                  />
                </div>
              </div>
            </div>

            {/* Visibility Settings */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="font-serif font-bold text-base text-stone-900 pb-3 border-b border-stone-100">
                Visibility Settings
              </h2>

              <div className="space-y-4 text-xs">
                <label className="flex items-center justify-between cursor-pointer p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-800">
                    In Stock Status
                  </span>
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) =>
                      setFormData({ ...formData, inStock: e.target.checked })
                    }
                    className="w-4 h-4 accent-amber-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-800">
                    Featured Product (Home Page)
                  </span>
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                    className="w-4 h-4 accent-amber-600 rounded"
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
