import { HeroSection } from "@/components/hero-section"
import { FeatureCards } from "@/components/feature-cards"
import { RecentDocuments } from "@/components/recent-documents"
import { FAQ } from "@/components/faq"

export default function EncryptionPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20">
      <main className="flex-1">
        <HeroSection />
        <FeatureCards />
        <RecentDocuments />
        <FAQ />
      </main>
    </div>
  )
}
