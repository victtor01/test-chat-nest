
"use client";

import { Header } from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  <div className="flex flex-col">
    <Header />
    {children}
  </div>;
}
