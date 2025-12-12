import { HeroSectionDecryption } from "@/components/hero-section-decryption"
import { FeatureCardsDecryption } from "@/components/feature-cards-decryption"
import { RecentDocuments } from "@/components/recent-documents"
import { FAQDecryption } from "@/components/faq-decryption"

export default function DecryptionPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20">
      <main className="flex-1">
        <HeroSectionDecryption />
        <FeatureCardsDecryption />
        <RecentDocuments />
        <FAQDecryption />
      </main>
    </div>
  )
}
