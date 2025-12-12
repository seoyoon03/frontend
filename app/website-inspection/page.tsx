import { HeroSectionWebsite } from "@/components/hero-section-website"
import { FeatureCardsWebsite } from "@/components/feature-cards-website"
import { RecentDocuments } from "@/components/recent-documents"
import { FAQWebsite } from "@/components/faq-website"

export default function WebsiteInspectionPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20">
      <main className="flex-1">
        <HeroSectionWebsite />
        <FeatureCardsWebsite />
        <RecentDocuments />
        <FAQWebsite />
      </main>
    </div>
  )
}
