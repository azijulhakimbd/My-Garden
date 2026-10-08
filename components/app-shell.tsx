"use client";

import { usePathname } from "next/navigation";

import Footer from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = ["/login", "/register"].includes(pathname);
  const isAdminPage = pathname.startsWith("/admin");
  const showShell = !isAuthPage && !isAdminPage;

  return (
    <div className="flex min-h-screen flex-col">
      {showShell && <Navbar />}
      <main className="flex-1">{children}</main>
      {showShell && <Footer />}
    </div>
  );
}
