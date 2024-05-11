"use client";

import { Sidebar } from "./chats-sidebar";

interface LayoutProps {
  children: React.ReactElement;
  params: any;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex w-full h-screen">
      <div
        className="w-full max-w-[22rem] bg-white h-full z-40"
      >
        <Sidebar />
      </div>
      <section
        className="w-full h-auto flex 
        flex-col relative"
      >
        {children}
      </section>
    </div>
  );
}
