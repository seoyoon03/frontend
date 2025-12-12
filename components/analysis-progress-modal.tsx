"use client"

import { useEffect, useState } from "react"

interface AnalysisProgressModalProps {
  analysisId: number
  onComplete: (analysisId: number) => void
  onFailed: () => void
}

export function AnalysisProgressModal({ analysisId, onComplete, onFailed }: AnalysisProgressModalProps) {
  const [statusMessage, setStatusMessage] = useState("URL 분석을 시작합니다...")

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/analysis/status/${analysisId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
          },
        })

        if (!response.ok) {
          throw new Error("상태 확인 실패")
        }

        const data = await response.json()

        // Update status message based on progress
        if (data.status === "IN_PROGRESS") {
          const messages = [
            "URL 분석을 시작합니다...",
            "웹사이트 데이터를 수집 중입니다...",
            "취약점 패턴을 확인 중입니다...",
            "보안 위협을 분석 중입니다...",
          ]
          setStatusMessage(messages[Math.floor(Math.random() * messages.length)])
        } else if (data.status === "COMPLETED") {
          clearInterval(intervalId)
          onComplete(analysisId)
        } else if (data.status === "FAILED") {
          clearInterval(intervalId)
          onFailed()
        }
      } catch (error) {
        console.error("Status check error:", error)
        clearInterval(intervalId)
        onFailed()
      }
    }

    // Start polling every 3 seconds
    intervalId = setInterval(checkStatus, 3000)
    checkStatus() // Initial check

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [analysisId, onComplete, onFailed])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center gap-6">
          {/* Loading spinner */}
          <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>

          {/* Status message */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">분석 진행 중</h3>
            <p className="text-gray-600">{statusMessage}</p>
          </div>

          {/* Progress indicator */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-900 h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
          </div>

          <p className="text-sm text-gray-500 text-center">
            분석이 완료될 때까지 잠시만 기다려주세요.
            <br />이 창을 닫지 마세요.
          </p>
        </div>
      </div>
    </div>
  )
}
