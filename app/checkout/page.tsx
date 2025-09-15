import type { Metadata } from "next"
import { CheckoutClient } from "@/components/checkout/checkout-client"
import { StructuredData } from "@/components/seo/structured-data"
import { generateMetadata } from "@/lib/seo/metadata"
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data"

export const metadata: Metadata = generateMetadata({
  title: "Checkout - Complete Your Order",
  description:
    "Complete your order of authentic Bengali sweets from Roshogolpo. Secure checkout with multiple payment options.",
  url: "/checkout",
  noIndex: true,
})

export default function CheckoutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://roshogolpo.com" },
    { name: "Checkout", url: "https://roshogolpo.com/checkout" },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={breadcrumbSchema} />
      <CheckoutClient />
    </div>
  )
}
