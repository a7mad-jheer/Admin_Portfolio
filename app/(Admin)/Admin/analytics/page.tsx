"use client";

import { motion } from "framer-motion";
import { MdConstruction } from "react-icons/md";

export default function Analytics() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[hsl(0_0%_10.98%)] text-white">
      <div className="text-center space-y-6 max-w-md bg-black/20 p-5 border-gray-800 border rounded-md">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-zinc-800">
            <MdConstruction size={40} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold">
          Coming Soon 🚀
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed">
          This section is currently under development. We’re working hard to bring new features and improvements soon. Stay tuned!
        </p>

        {/* Divider */}
        <div className="h-px bg-zinc-800 w-full" />

        {/* Optional Button */}
        <button className="px-4 py-2 bg-[hsl(154.9_100%_19.22%)] hover:bg-[hsl(154.9_100%_23.22%)] rounded-md text-sm transition">
          Back to Overview
        </button>

      </div>
    </div>
  );
}