"use client";

import { Box, LayoutGrid, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <LayoutGrid size={20} />,
    },
    {
      name: "Products",
      link: "/admin/products",
      icon: <Box size={20} />,
    },
    {
      name: "Orders",
      link: "/admin/orders",
      icon: <ShoppingCart size={20} />,
    },
  ];

  return (
    <header className="flex flex-col h-screen w-64 border-neutral-200 border relative">
      {/* Header */}
      <div className="text-2xl font-bold p-5 flex justify-center items-center border-neutral-200 border">
        Admin Panel
      </div>

      {/* Navigation */}
      <nav className="flex flex-col p-5 gap-4">
        {links.map((link) => {
          const isActive = pathname === link.link;

          return (
            <Link
              key={link.link}
              href={link.link}
              className={`flex items-center gap-4 text-sm px-5 py-2 rounded-xl transition ${
                isActive
                  ? "text-white bg-neutral-800"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {link.icon}

              <span className="font-bold">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
