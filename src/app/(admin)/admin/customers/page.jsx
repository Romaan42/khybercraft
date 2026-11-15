"use client";
import TableSkeleton from "@/components/admin/LoadingSkeleton";
import { Search, Mail, Phone, MapPin, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const res = await fetch("/admin/api/customers", {
        credentials: "include",
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        setCustomers(data.users);
      } else {
        toast.error(data.message);
      }
    })();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Customers
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          View your registered users and buyer history.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by customer name, phone, or city..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 text-slate-800"
          />
        </div>
      </div>
      {loading ? (
        <TableSkeleton />
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3.5">Customer Name</th>
                  <th className="px-5 py-3.5">Contact Info</th>
                  <th className="px-5 py-3.5">City</th>
                  <th className="px-5 py-3.5">Orders Placed</th>
                  <th className="px-5 py-3.5">Total Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {customers.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50/80 transition">
                    <td className="px-5 py-3.5">
                      <span className="font-bold text-slate-900 block">
                        {c.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {c._id}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Phone size={12} className="text-slate-400" /> {c.phone}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                        <Mail size={12} /> {c.email}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                        <MapPin size={12} className="text-slate-400" /> {c.city}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-slate-800">
                      {c.orders} orders
                    </td>
                    <td className="px-5 py-3.5 font-bold text-slate-900">
                      {c.spend}
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
