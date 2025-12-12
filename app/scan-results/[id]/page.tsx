import { Header } from "@/components/main-header"
import { ScanResultsView } from "@/components/scan-results-view"

export default function ScanResultsPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <Header />
      <ScanResultsView />
    </div>
  )
}
