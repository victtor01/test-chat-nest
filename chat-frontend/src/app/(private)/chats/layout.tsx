"use client";

import { Sidebar } from "./chats-sidebar";

interface LayoutProps {
  children: React.ReactElement;
  params: any;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex w-full h-screen">
      <nav
        className="w-full max-w-[18rem] bg-zinc-900 h-full 
      border-r border-gray-800 z-40"
      >
        <Sidebar />
      </nav>
      <div className="w-full h-auto flex flex-col relative">{children}</div>
    </div>
  );
}
