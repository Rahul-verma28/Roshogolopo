import type React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
// Force dynamic rendering for admin routes
export const dynamic = 'force-dynamic'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>{children}</AuthProvider>
  );
}
