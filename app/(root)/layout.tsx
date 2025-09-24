import type React from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import Banner from "@/components/layout/banner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Banner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
