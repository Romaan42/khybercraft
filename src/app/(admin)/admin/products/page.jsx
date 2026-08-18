"use client";
import React, { useEffect, useState } from "react";
import { Plus, Search, Filter, Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import TableSkeleton from "@/components/admin/LoadingSkeleton";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(false);

  const fetchProducts = async () => {
    setFetching(true);
    const res = await fetch("/api/products");
    const result = await res.json();
    setFetching(false);
    if (result.success) {
      setProducts(result.products);
    } else {
      toast.error(result.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("do you want to delete this product?")) {
      const res = await fetch(`/admin/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchProducts();
      } else {
        toast.error("error while deleting product");
      }
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Products
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your footwear inventory, pricing, and stock status.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-black hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition shadow-sm self-start sm:self-auto">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search products by name or category..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 text-slate-800"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="inline-flex items-center gap-1.5 border border-slate-200 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 transition">
            <Filter size={14} /> Filter
          </button>
          <select className="bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-lg px-3 py-2 focus:outline-none">
            <option>All Categories</option>
            <option>Kaptaan</option>
            <option>Norozi</option>
            <option>Zalmi</option>
          </select>
        </div>
      </div>

      {fetching ? (
        <TableSkeleton />
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3.5">Product</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Price</th>
                  <th className="px-5 py-3.5">Stock</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {products?.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/80 transition">
                    <td className="px-5 py-3.5 flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center shrink-0 overflow-hidden text-[10px] font-bold text-slate-400">
                        <img src={p.images[0]} alt={p.title} />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">
                          {p.title}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {p._id}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-600">
                      {p.category}
                    </td>
                    <td className="px-5 py-3.5 font-bold text-slate-900">
                      {p.price}
                    </td>
                    <td className="px-5 py-3.5 font-medium">{p.stok} units</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide inline-block ${
                          p.stok > 0
                            ? "bg-emerald-100 text-emerald-800"
                            : p.status < 10
                              ? "bg-amber-100 text-amber-800"
                              : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {p.isActive ? "active" : "draft"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-1">
                      <button className="p-1.5 text-slate-500 hover:text-black hover:bg-slate-100 rounded-lg transition">
                        <Link href={`/admin/products/${p._id}`}>
                          <Edit size={15} />
                        </Link>
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
