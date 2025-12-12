import { HeroSection } from "@/components/hero-section-home"
import { FunctionsSection } from "@/components/functions-section"
import { FileEncryptionSection } from "@/components/file-encryption-section"
import { StatsSection } from "@/components/stats-section"
import { WebSecuritySection } from "@/components/web-security-section"
import { Footer } from "@/components/main-footer"

export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <HeroSection />
      <StatsSection />
      <FunctionsSection />
      <FileEncryptionSection />
      <WebSecuritySection />
      <Footer />
    </main>
  )
}