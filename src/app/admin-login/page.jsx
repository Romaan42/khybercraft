"use client";

import { adminLogin } from "@/actions/adminActions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [state, action, loading] = useActionState(adminLogin);
  useEffect(() => {
    if (state) {
      if (state.success) {
        router.push("/admin");
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4">
      <form
        action={action}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-gray-100"
      >
        <Toaster />
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Ibrahim!</h1>
          <p className="mt-2 text-sm text-gray-500">Login to your account</p>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>

          <input
            id="email"
            type="email"
            name="email"
            placeholder="mail@mail.com"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
          className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 active:scale-[0.98]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default page;
