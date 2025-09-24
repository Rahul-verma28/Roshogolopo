import type { Metadata } from "next"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { LocationMap } from "@/components/contact/location-map"
import { StructuredData } from "@/components/seo/structured-data"
import { generateMetadata } from "@/lib/seo/metadata"
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data"

export const metadata: Metadata = generateMetadata({
  title: "Contact Us - Get in Touch",
  description:
    "Visit our store in Greater Noida or get in touch with us. Shop No EF-09, Spectrum@Metro, Phase 2, Noida, Sector 75. Call us at +91 9899743002 or +91 8010245230.",
  url: "/contact",
})

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://roshogolpo.in" },
    { name: "Contact", url: "https://roshogolpo.in/contact" },
  ])

  return (
    <div className="min-h-screen">
      <StructuredData data={breadcrumbSchema} />
      <ContactHero />
      <div className="grid lg:grid-cols-2 gap-0">
        <ContactForm />
        <ContactInfo />
      </div>
      <LocationMap />
    </div>
  )
}
