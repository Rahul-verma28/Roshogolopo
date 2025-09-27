import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ReduxProvider } from "@/components/providers/redux-provider";
import { CartHydration } from "@/components/providers/cart-hydration";
import { StructuredData } from "@/components/seo/structured-data";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata";
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
} from "@/lib/seo/structured-data";
import { Suspense } from "react";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = generateSEOMetadata({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <StructuredData
          data={[organizationSchema, localBusinessSchema, websiteSchema]}
        />
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/favicon.ico" />
        <meta name="theme-color" content="#fffae6" />
        <meta name="msapplication-TileColor" content="#b39402" />
      </head>
      <body className="font-sans antialiased">
        <ReduxProvider>
          <CartHydration />
          <div className="min-h-screen flex flex-col">
            <Suspense fallback={<div>Loading...</div>}>
              <AuthProvider>{children}</AuthProvider>
            </Suspense>
          </div>
        </ReduxProvider>
        <Analytics />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
