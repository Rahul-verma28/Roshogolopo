import type React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import ReduxProvider from "@/components/providers/ReduxProvider";
import "@/styles/globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <AuthProvider>{children}</AuthProvider>
    </ReduxProvider>
  );
}
