import { Search } from "lucide-react";
import React from "react";

export default function TopSearch() {
  return (
    <div className="min-w-full h-[73.59px] flex items-center px-10 border border-neutral-200">
      <div className="relative">
        <Search className="absolute top-1 left-2 w-4 text-neutral-500" />
        <input
          className="py-1 px-7 bg-neutral-100 rounded-lg border border-neutral-100 outline-1 outline-neutral-400 outline-solid text-md text-neutral-500"
          placeholder="Search..."
          type="text"
        />
      </div>
    </div>
  );
}
