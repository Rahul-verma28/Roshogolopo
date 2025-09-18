import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ReduxProvider } from "@/components/providers/redux-provider";
import { CartHydration } from "@/components/providers/cart-hydration";
import { Banner } from "@/components/layout/banner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StructuredData } from "@/components/seo/structured-data";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo/metadata";
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
} from "@/lib/seo/structured-data";
import { Suspense } from "react";
import "./globals.css";

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
        <link rel="icon" href="/images/roshogolpo-logo.png" />
        <link rel="apple-touch-icon" href="/images/roshogolpo-logo.png" />
        <meta name="theme-color" content="#fffae6" />
        <meta name="msapplication-TileColor" content="#b39402" />
      </head>
      <body className="font-sans antialiased">
        <ReduxProvider>
          <CartHydration />
          <div className="min-h-screen flex flex-col">
            <Suspense fallback={<div>Loading...</div>}>
              <Banner />
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </Suspense>
          </div>
        </ReduxProvider>
        <Analytics />
      </body>
    </html>
  );
}
