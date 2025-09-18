import type { Metadata } from "next"
import { AboutHero } from "@/components/about/about-hero"
import { StorySection } from "@/components/about/story-section"
import { TeamSection } from "@/components/about/team-section"
import { MissionSection } from "@/components/about/mission-section"
import { TimelineSection } from "@/components/about/timeline-section"
import { ValuesSection } from "@/components/about/values-section"
import { StructuredData } from "@/components/seo/structured-data"
import { generateMetadata } from "@/lib/seo/metadata"
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data"
import QualityDelights from "@/components/about/quality-delights"

export const metadata: Metadata = generateMetadata({
  title: "About Us - Our Sweet Story",
  description:
    "Learn about Roshogolpo's mission to preserve and celebrate traditional Bengali sweets. Meet our founders Aritro and Sanjukta, and discover our journey of reimagining classics for modern taste.",
  url: "/about",
})

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://roshogolpo.com" },
    { name: "About", url: "https://roshogolpo.com/about" },
  ])

  return (
    <div className="min-h-screen">
      <StructuredData data={breadcrumbSchema} />
      <AboutHero />
      <StorySection />
      <QualityDelights />
      <MissionSection />
      <TeamSection />
      {/* <TimelineSection /> */}
      <ValuesSection />
    </div>
  )
}
