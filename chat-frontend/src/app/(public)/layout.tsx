"use client";

import { socket } from "@/socket";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <main
      className="w-full h-screen overflow-auto flex flex-col bg-gradient-45 from-indigo-50
    to-blue-50 text-gray-800"
    >
      {children}
    </main>
  );
}
