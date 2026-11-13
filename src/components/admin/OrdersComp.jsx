"use client";
import { Eye, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import TableSkeleton from "@/components/admin/LoadingSkeleton";
import toast from "react-hot-toast";

export default function OrdersComp() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const fetchOrders = () => {
    setLoading(true);
    fetch("/admin/api/orders")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          setOrders(result.orders);
        } else {
          toast.error(result.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOnDelete = async (id) => {
    setLoading(true);
    const res = await fetch(`/admin/api/orders/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();

    if (result.success) {
      toast.success(result.message);
      fetchOrders();
    } else {
      toast.error(result.message);
    }
  };

  const handeOnBulkDelete = async () => {
    if (confirm(`do yout want to delete ${selectedItems.length} products?`)) {
      const res = await fetch("/admin/api/orders/bulk", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ids: selectedItems }),
      });

      const result = await res.json();
      if (result.success) {
        toast.success(result.message);
        fetchOrders();
      } else {
        toast.error(result.message);
      }
    }
  };

  const handleChecked = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems((prev) => prev.filter((v) => v !== id));
    } else {
      setSelectedItems((prev) => [...prev, id]);
    }
  };

  const handleSelectAll = () => {
    setSelectedItems((prev) => {
      if (prev.length === orders.length) {
        return [];
      }

      return orders.map((val) => val._id);
    });
  };

  if (loading) return <TableSkeleton />;

  if (orders.length === 0)
    return (
      <div className="h-40 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Orders does not exist's</h1>
      </div>
    );
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        {selectedItems.length > 0 && (
          <div className="w-full flex justify-between items-center px-10 py-3 bg-red-200">
            <span className="text-red-500">
              {selectedItems.length} Selected
            </span>
            <button
              className="cursor-pointer text-red-500 "
              onClick={handeOnBulkDelete}
            >
              <TrashIcon />
            </button>
          </div>
        )}
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
            <tr>
              <th className="px-5 py-3.5">
                <input
                  type="checkbox"
                  className="size-4 cursor-pointer"
                  onChange={handleSelectAll}
                  checked={orders.length === selectedItems.length}
                />
              </th>
              <th className="px-5 py-3.5">Order ID</th>
              <th className="px-5 py-3.5">Customer Details</th>
              <th className="px-5 py-3.5">Ordered Items</th>
              <th className="px-5 py-3.5">Payment</th>
              <th className="px-5 py-3.5">Total</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {orders.map((o) => (
              <tr
                key={o._id}
                className={` ${selectedItems.includes(o._id) ? "border border-red-500 rounded-2xl bg-red-100" : "hover:bg-slate-50/80"} transition`}
              >
                <td className="px-5 py-3.5 font-mono font-bold text-slate-900">
                  <input
                    type="checkbox"
                    name="select"
                    id="select"
                    className="size-4 cursor-pointer"
                    checked={selectedItems.includes(o._id)}
                    onChange={() => handleChecked(o._id)}
                  />
                </td>
                <td
                  className="cursor-pointer px-5 py-3.5 font-mono font-bold text-slate-900"
                  onClick={() => handleChecked(o._id)}
                >
                  {o._id}
                </td>
                <td className="px-5 py-3.5">
                  <span className="font-bold text-slate-900 block">
                    {o.shippingAddress?.fullName}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {o.shippingAddress?.phone}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-600 font-medium max-w-xs truncate">
                  {o.orderItems
                    ?.map((item) => `${item.title} (x${item.qty})`)
                    .join(", ")}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`${o.paymentStatus === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"} text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold`}
                  >
                    {o.paymentStatus}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-bold text-slate-900">
                  Rs. {o.totalAmount}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide inline-block ${
                      o.orderStatus === "Delivered"
                        ? "bg-emerald-100 text-emerald-800"
                        : o.orderStatus === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {o.orderStatus}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right flex items-center">
                  <Link
                    href={`/admin/orders/${o._id}`}
                    className="p-1.5 text-slate-500 hover:text-black hover:bg-slate-100 rounded-lg transition"
                    title="View Order"
                  >
                    <Eye size={16} />
                  </Link>
                  <button
                    onClick={() => handleOnDelete(o._id)}
                    className="p-1.5 cursor-pointer text-red-500 hover:text-black hover:bg-slate-100 rounded-lg transition"
                    title="View Order"
                  >
                    <TrashIcon size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
