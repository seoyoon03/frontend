"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, Info, XCircle, CheckCircle, Download, ArrowLeft, ChevronRight, X } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import type { 
  VulnerabilityAnalysisResponse, 
  Vulnerability,
  VULNERABILITY_SOLUTIONS
} from "@/lib/types/vulnerability.types"

interface ScanResultsViewProps {
  analysisId?: string
}

export function ScanResultsView({ analysisId }: ScanResultsViewProps) {
  const router = useRouter()
  const params = useParams()
  const [scanResult, setScanResult] = useState<VulnerabilityAnalysisResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(null)

  // ... (useEffect 및 헬퍼 함수들은 기존과 동일) ...
  useEffect(() => {
    const fetchResults = async () => {
      const id = analysisId || params?.id
      
      if (id === 'latest') {
        const storedResult = sessionStorage.getItem('latestScanResult')
        if (storedResult) {
          try {
            const data = JSON.parse(storedResult) as VulnerabilityAnalysisResponse
            setScanResult(data)
            setLoading(false)
            return
          } catch (error) {
            console.error("Error parsing stored result:", error)
          }
        }
      }

      if (id === 'demo' || !id) {
        loadDemoData()
        return
      }
      loadDemoData()
    }

    const loadDemoData = () => {
      const demoData: VulnerabilityAnalysisResponse = {
        success: true,
        url: "https://www.naver.com/",
        vulnerabilities: [
          {
            type: "SQL_INJECTION",
            severity: "CRITICAL",
            pattern: "' OR 1=1--",
            details: "Form input 'query' (type: search)에서 SQLi 취약점 가능성",
            confidence: 0.99,
            location: "https://www.naver.com/ - Form #1 action: https://search.naver.com/search.naver (GET)",
          },
          {
            type: "SSTI",
            severity: "CRITICAL",
            pattern: "{{7*7}}",
            details: "Form input 'query' (type: search)에서 SSTI 취약점 가능성",
            confidence: 0.98,
            location: "https://www.naver.com/ - Form #1 action: https://search.naver.com/search.naver (GET)",
          },
          {
            type: "COMMAND_INJECTION",
            severity: "CRITICAL",
            pattern: "; whoami",
            details: "Form input 'query' (type: search)에서 COMMAND_INJECTION 취약점 가능성",
            confidence: 0.89,
            location: "https://www.naver.com/ - Form #1 action: https://search.naver.com/search.naver (GET)",
          },
          {
            type: "PATH_TRAVERSAL",
            severity: "HIGH",
            pattern: "../../../etc/passwd",
            details: "Form input 'query' (type: search)에서 PATH_TRAVERSAL 취약점 가능성",
            confidence: 0.98,
            location: "https://www.naver.com/ - Form #1 action: https://search.naver.com/search.naver (GET)",
          },
          {
            type: "XSS",
            severity: "HIGH",
            pattern: "<script>alert('xss')</script>",
            details: "Form input 'query' (type: search)에서 XSS 취약점 가능성",
            confidence: 0.96,
            location: "https://www.naver.com/ - Form #1 action: https://search.naver.com/search.naver (GET)",
          },
          {
            type: "CSP_MISSING",
            severity: "MEDIUM",
            pattern: "Content-Security-Policy 헤더 없음",
            details: "XSS 방어를 위한 CSP 헤더 누락",
            confidence: 0.95,
            location: "https://www.naver.com/",
          },
          {
            type: "MIME_SNIFFING",
            severity: "LOW",
            pattern: "X-Content-Type-Options 헤더 없음",
            details: "MIME 타입 스니핑 방어 헤더 누락",
            confidence: 0.95,
            location: "https://www.naver.com/",
          },
        ],
        vulnerability_count: 7,
      }

      setTimeout(() => {
        setScanResult(demoData)
        setLoading(false)
      }, 500)
    }

    fetchResults()
  }, [analysisId, params])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "#D32F2F"
      case "HIGH": return "#FF7043"
      case "MEDIUM": return "#FFCA28"
      case "LOW": return "#66BB6A"
      default: return "#9E9E9E"
    }
  }

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "bg-[#D32F2F]/20 text-[#D32F2F] border-[#D32F2F]/30"
      case "HIGH": return "bg-[#FF7043]/20 text-[#FF7043] border-[#FF7043]/30"
      case "MEDIUM": return "bg-[#FFCA28]/20 text-[#FFCA28] border-[#FFCA28]/30"
      case "LOW": return "bg-[#66BB6A]/20 text-[#66BB6A] border-[#66BB6A]/30"
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return <XCircle className="w-5 h-5" style={{ color: getSeverityColor(severity) }} />
      case "HIGH": return <AlertTriangle className="w-5 h-5" style={{ color: getSeverityColor(severity) }} />
      case "MEDIUM": return <Info className="w-5 h-5" style={{ color: getSeverityColor(severity) }} />
      case "LOW": return <Shield className="w-5 h-5" style={{ color: getSeverityColor(severity) }} />
      default: return <Info className="w-5 h-5" />
    }
  }

  const getCounts = () => {
    if (!scanResult) return { critical: 0, high: 0, medium: 0, low: 0 }
    return {
      critical: scanResult.vulnerabilities.filter((v) => v.severity === "CRITICAL").length,
      high: scanResult.vulnerabilities.filter((v) => v.severity === "HIGH").length,
      medium: scanResult.vulnerabilities.filter((v) => v.severity === "MEDIUM").length,
      low: scanResult.vulnerabilities.filter((v) => v.severity === "LOW").length,
    }
  }

  const downloadReport = () => {
    if (!scanResult) return
    const dataStr = JSON.stringify(scanResult, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `scan-report-${new Date().getTime()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const getSolution = (type: string) => {
    const solutions: Record<string, string[]> = {
      SQL_INJECTION: ["Prepared Statement 사용", "파라미터 바인딩 적용", "입력값 검증 및 이스케이프 처리", "ORM 프레임워크 사용 권장"],
      XSS: ["입력값 검증 및 출력 인코딩", "Content-Security-Policy 헤더 설정", "HttpOnly, Secure 쿠키 플래그 사용", "XSS 방어 라이브러리 사용 (DOMPurify 등)"],
      CSRF: ["CSRF 토큰 구현", "SameSite 쿠키 속성 설정", "Referer 헤더 검증", "중요 작업에 재인증 요구"],
      COMMAND_INJECTION: ["사용자 입력으로 시스템 명령 실행 금지", "화이트리스트 기반 입력 검증", "쉘 메타문자 이스케이프 처리", "최소 권한 원칙 적용"],
      PATH_TRAVERSAL: ["파일 경로 정규화 및 검증", "화이트리스트 기반 경로 제한", "상대 경로 사용 금지", "웹 루트 외부 접근 차단"],
      SSTI: ["템플릿 엔진 샌드박스 활성화", "사용자 입력을 템플릿에 직접 사용 금지", "안전한 템플릿 렌더링 함수 사용", "입력값 검증 및 이스케이프"],
      XXE: ["XML 외부 엔티티 비활성화", "안전한 XML 파서 사용", "XML 입력 검증", "JSON 등 대체 포맷 사용 고려"],
      SSRF: ["내부 IP 주소 접근 차단", "URL 화이트리스트 검증", "리다이렉트 제한", "네트워크 레벨 접근 제어"],
      OPEN_REDIRECT: ["리다이렉트 URL 화이트리스트 검증", "외부 URL 리다이렉트 제한", "사용자 확인 단계 추가", "상대 경로만 허용"],
      CSP_MISSING: ["Content-Security-Policy 헤더 설정", "인라인 스크립트 제한", "nonce 또는 hash 기반 스크립트 허용", "외부 리소스 로드 제한"],
      MIME_SNIFFING: ["X-Content-Type-Options: nosniff 헤더 설정", "올바른 Content-Type 헤더 설정", "파일 업로드 검증 강화", "파일 확장자 화이트리스트 적용"],
    }
    return solutions[type] || ["보안 전문가와 상담하여 적절한 대응 방안을 마련하세요."]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">결과를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!scanResult) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-500">스캔 결과를 찾을 수 없습니다.</p>
        </div>
      </div>
    )
  }

  const counts = getCounts()

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl mt-12 md:mt-16">
      {/* Header: 모바일에서는 세로 배치로 변경 */}
      <div className="mb-6 md:mb-8">
        <Button 
          variant="ghost" className="mt-3 mb-2 md:mb-4 text-gray-400 hover:text-gray-200 hover:bg-transparent p-0" 
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Button>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">보안 스캔 결과</h1>
            <p className="text-gray-500 flex items-center gap-2 text-sm break-all">
              <span className="font-mono">{scanResult.url}</span>
              {scanResult.success ? (
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              )}
            </p>
          </div>

          <Button onClick={downloadReport} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            리포트 다운로드
          </Button>
        </div>
      </div>

      {/* Summary Cards: 모바일에서는 2x2 그리드 적용 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <Card className="bg-white border shadow-sm p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <p className="text-gray-500 text-xs md:text-sm mb-1">CRITICAL</p>
              <p className="text-2xl md:text-3xl font-bold" style={{ color: getSeverityColor("CRITICAL") }}>
                {counts.critical}
              </p>
            </div>
            <XCircle className="w-8 h-8 md:w-10 md:h-10 self-end md:self-auto" style={{ color: getSeverityColor("CRITICAL") }} />
          </div>
        </Card>

        <Card className="bg-white border shadow-sm p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <p className="text-gray-500 text-xs md:text-sm mb-1">HIGH</p>
              <p className="text-2xl md:text-3xl font-bold" style={{ color: getSeverityColor("HIGH") }}>
                {counts.high}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 self-end md:self-auto" style={{ color: getSeverityColor("HIGH") }} />
          </div>
        </Card>

        <Card className="bg-white border shadow-sm p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <p className="text-gray-500 text-xs md:text-sm mb-1">MEDIUM</p>
              <p className="text-2xl md:text-3xl font-bold" style={{ color: getSeverityColor("MEDIUM") }}>
                {counts.medium}
              </p>
            </div>
            <Info className="w-8 h-8 md:w-10 md:h-10 self-end md:self-auto" style={{ color: getSeverityColor("MEDIUM") }} />
          </div>
        </Card>

        <Card className="bg-white border shadow-sm p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <p className="text-gray-500 text-xs md:text-sm mb-1">LOW</p>
              <p className="text-2xl md:text-3xl font-bold" style={{ color: getSeverityColor("LOW") }}>
                {counts.low}
              </p>
            </div>
            <Shield className="w-8 h-8 md:w-10 md:h-10 self-end md:self-auto" style={{ color: getSeverityColor("LOW") }} />
          </div>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">취약점 리스트</h2>

        <Card className="bg-white border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-3 md:p-4 text-gray-500 font-semibold text-sm whitespace-nowrap">Severity</th>
                  <th className="text-left p-3 md:p-4 text-gray-500 font-semibold text-sm whitespace-nowrap">Type</th>
                  <th className="text-left p-3 md:p-4 text-gray-500 font-semibold text-sm hidden md:table-cell">Location</th>
                  <th className="text-center p-3 md:p-4 text-gray-500 font-semibold text-sm whitespace-nowrap">Confidence</th>
                  <th className="text-center p-3 md:p-4 text-gray-500 font-semibold text-sm whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {scanResult.vulnerabilities.map((vuln, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedVuln(vuln)}
                  >
                    <td className="p-3 md:p-4">
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(vuln.severity)}
                        <Badge className={`${getSeverityBadgeClass(vuln.severity)} text-xs px-2 py-0.5 whitespace-nowrap`}>
                          {vuln.severity}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-3 md:p-4">
                      <span className="text-gray-900 font-medium text-sm md:text-base">{vuln.type}</span>
                      {/* 모바일에서만 Location을 타입 아래에 작게 표시 */}
                      <span className="text-gray-400 text-xs font-mono block mt-1 md:hidden truncate max-w-[150px]">
                        {vuln.location ? vuln.location.split(" - ")[0] : scanResult.url}
                      </span>
                    </td>
                    <td className="p-3 md:p-4 hidden md:table-cell">
                      <span className="text-gray-500 text-sm font-mono truncate max-w-xs block">
                        {vuln.location ? vuln.location.split(" - ")[0] : scanResult.url}
                      </span>
                    </td>
                    <td className="p-3 md:p-4 text-center">
                      <span className="text-gray-900 font-semibold text-sm">{(vuln.confidence * 100).toFixed(0)}%</span>
                    </td>
                    <td className="p-3 md:p-4 text-center">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 h-8">
                        <span className="hidden md:inline">상세보기</span> 
                        <ChevronRight className="w-4 h-4 md:ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {selectedVuln && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center md:justify-end"
          onClick={() => setSelectedVuln(null)}
        >
          {/* 모바일에서는 바텀 시트처럼 올라오고, 데스크톱에서는 오른쪽 슬라이드 */}
          <div
            className="bg-white w-full md:max-w-2xl h-[85vh] md:h-full overflow-y-auto shadow-2xl rounded-t-2xl md:rounded-none animate-slide-in-bottom md:animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 md:p-6 border-b border-gray-200 flex items-start justify-between sticky top-0 bg-white z-10 rounded-t-2xl md:rounded-none">
              <div className="flex items-center gap-3">
                {getSeverityIcon(selectedVuln.severity)}
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">{selectedVuln.type}</h2>
                  <Badge className={getSeverityBadgeClass(selectedVuln.severity) + " mt-1"}>
                    {selectedVuln.severity}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedVuln(null)}
                className="text-gray-500 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="p-4 md:p-6 space-y-6">
              {/* Confidence */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Confidence</h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${selectedVuln.confidence * 100}%`,
                        backgroundColor: getSeverityColor(selectedVuln.severity),
                      }}
                    />
                  </div>
                  <span className="text-gray-900 font-bold text-lg">{(selectedVuln.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>

              {/* Location */}
              {selectedVuln.location && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Location</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 md:p-4">
                    <p className="text-gray-700 font-mono text-xs md:text-sm break-all">{selectedVuln.location}</p>
                  </div>
                </div>
              )}

              {/* Payload Pattern */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Payload (탐지 패턴)</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 md:p-4">
                  <code className="text-[#FF7043] font-mono text-xs md:text-sm break-all">{selectedVuln.pattern}</code>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">설명</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 md:p-4">
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">{selectedVuln.details}</p>
                </div>
              </div>

              {/* Solutions */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-3">해결 방법</h3>
                <div className="space-y-3">
                  {getSolution(selectedVuln.type).map((solution, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3 md:p-4">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: getSeverityColor(selectedVuln.severity) + "20" }}
                      >
                        <span style={{ color: getSeverityColor(selectedVuln.severity) }} className="text-sm font-bold">
                          {idx + 1}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">{solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}