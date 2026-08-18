import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TableSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-pulse">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          {/* Table Header */}
          <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100">
            <tr>
              <th className="px-5 py-3.5">Product</th>
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Price</th>
              <th className="px-5 py-3.5">Stock</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body Skeletons */}
          <tbody className="divide-y divide-slate-100">
            {Array.from({ length: 5 }).map((_, idx) => (
              <tr key={idx}>
                {/* Product Thumbnail & Title */}
                <td className="px-5 py-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-lg shrink-0" />
                  <div className="space-y-1.5 w-full max-w-40">
                    <div className="h-3.5 bg-slate-200 rounded w-3/4" />
                    <div className="h-2.5 bg-slate-100 rounded w-1/2" />
                  </div>
                </td>

                {/* Category */}
                <td className="px-5 py-3.5">
                  <div className="h-3 bg-slate-200 rounded w-24" />
                </td>

                {/* Price */}
                <td className="px-5 py-3.5">
                  <div className="h-3.5 bg-slate-200 rounded w-16" />
                </td>

                {/* Stock */}
                <td className="px-5 py-3.5">
                  <div className="h-3 bg-slate-200 rounded w-14" />
                </td>

                {/* Status Badge */}
                <td className="px-5 py-3.5">
                  <div className="h-5 bg-slate-200 rounded-full w-14" />
                </td>

                {/* Actions (Edit & Delete Buttons) */}
                <td className="px-5 py-3.5 text-right">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-7 h-7 bg-slate-100 rounded-lg" />
                    <div className="w-7 h-7 bg-slate-100 rounded-lg" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
