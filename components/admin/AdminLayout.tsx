"use client";

import type React from "react";

import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <AdminHeader />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-6 lg:px-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
