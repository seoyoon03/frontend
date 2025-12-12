"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { vulnerabilityService } from "@/lib/services/website.service"
import { toast } from "sonner"

// 데모 모드 설정 (개발/테스트용)
const IS_DEMO_MODE = false

export function HeroSectionWebsite() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!url) {
      toast.error("URL을 입력해주세요.")
      return
    }

    // URL 유효성 검증
    if (!vulnerabilityService.validateUrl(url)) {
      toast.error("유효한 URL을 입력해주세요. (http:// 또는 https:// 포함)")
      return
    }

    // 로그인 확인 (데모 모드가 아닐 때)
    if (!IS_DEMO_MODE) {
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("로그인이 필요합니다.")
        router.push("/login")
        return
      }
    }

    try {
      setIsAnalyzing(true)
      toast.info("웹사이트 분석을 시작합니다...")

      if (IS_DEMO_MODE) {
        // 데모 모드: 가짜 데이터로 테스트
        console.log("데모 모드: 가짜 분석 시작")
        await new Promise(resolve => setTimeout(resolve, 2500))
        router.push(`/scan-results/demo`)
      } else {
        // 실제 백엔드 API 호출
        const result = await vulnerabilityService.startAnalysis(url)
        
        if (result.success) {
          toast.success(`분석 완료! ${result.vulnerability_count}개의 취약점을 발견했습니다.`)
          
          // 결과를 sessionStorage에 저장 (결과 페이지에서 사용)
          sessionStorage.setItem('latestScanResult', JSON.stringify(result))
          
          // 결과 페이지로 이동
          router.push(`/scan-results/latest`)
        } else {
          throw new Error("분석에 실패했습니다.")
        }
      }
    } catch (error: any) {
      console.error("Analysis error:", error)
      const errorMessage = error.message || "분석 중 오류가 발생했습니다. 다시 시도해주세요."
      toast.error(errorMessage)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance text-gray-900">웹사이트 점검</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            웹사이트의 보안 취약점을 자동으로 분석하고 진단합니다.
            <br />
            SQL 인젝션, XSS, CSRF 등 다양한 보안 위협을 검사합니다.
          </p>
        </div>

        <div className="bg-white border-4 border-blue-900 rounded-3xl p-10">
          <form
            onSubmit={handleSubmit}
            className="border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center hover:border-gray-400 transition-colors bg-gray-50"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                required
                disabled={isAnalyzing}
              />
              <Button
                type="submit"
                size="lg"
                className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-3 text-base font-medium disabled:opacity-50"
                disabled={isAnalyzing}
              >
                {isAnalyzing 
                  ? "분석 진행 중..." 
                  : "웹사이트 검사 시작"
                }
              </Button>
              <p className="text-sm text-gray-500">
                검사할 웹사이트 URL을 입력하세요 (http:// 또는 https:// 포함)
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}