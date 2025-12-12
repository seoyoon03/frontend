"use client"

import { Card } from "@/components/ui/card"
import { useRef, useState, useEffect } from "react"
import { fileService, type FileListItem } from "@/lib/services/file.service"

export default function FileHistoryPage() {
  const [documents, setDocuments] = useState<
    Array<{
      id: number | string
      title: string
      status: string
      date: string
      type?: string
    }>
  >([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mapFromApi = (list: FileListItem[]) =>
      (list || []).map((x) => ({
        id: x.fileId ?? `${Date.now()}-${Math.random()}`,
        title: x.fileName ?? "파일",
        status: "암호화 완료",
        date: (() => {
          const d = x.uploadDate ? new Date(x.uploadDate) : new Date()
          return d
            .toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
            .replace(/\. /g, ".")
            .replace(/\.$/, "")
        })(),
        type: "encryption",
      }))

    const refresh = async () => {
      const token = localStorage.getItem("token")
      setIsLoggedIn(!!token)
      setError("")
      if (!token) {
        setDocuments([])
        setLoading(false)
        return
      }
      setLoading(true)
      try {
        const list = await fileService.getFileList()
        setDocuments(mapFromApi(list))
      } catch (e: any) {
        setError(e?.response?.data?.message || "이력을 불러오지 못했습니다.")
      } finally {
        setLoading(false)
      }
    }

    refresh()

    const handleFilesUploaded = () => refresh()
    const handleAuthChanged = () => refresh()
    const handleUnauthorized = () => {
      setIsLoggedIn(false)
      setDocuments([])
      setError("세션이 만료되었습니다. 다시 로그인해주세요.")
    }

    window.addEventListener("filesUploaded", handleFilesUploaded)
    window.addEventListener("authStateChanged", handleAuthChanged)
    window.addEventListener("unauthorized", handleUnauthorized)
    return () => {
      window.removeEventListener("filesUploaded", handleFilesUploaded)
      window.removeEventListener("authStateChanged", handleAuthChanged)
      window.removeEventListener("unauthorized", handleUnauthorized)
    }
  }, [])

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: "smooth" })
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <p className="text-gray-500">로그인 후 파일 암호화 이력을 확인할 수 있습니다.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">파일 암호화 이력</h1>
          <p className="text-gray-600">암호화한 파일 목록을 확인하세요</p>
        </div>

        {!isLoggedIn ? (
          <div className="text-center py-16">
            <p className="text-gray-500">로그인 후 파일 암호화 이력을 확인할 수 있습니다.</p>
          </div>
        ) : loading ? (
          <div className="text-center py-16">
            <p className="text-gray-600">불러오는 중...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">암호화한 파일이 없습니다</p>
            <p className="text-gray-400 text-sm mt-2">파일을 암호화하면 여기에 표시됩니다</p>
          </div>
        ) : (
          <div className="relative max-w-7xl mx-auto group">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-6 px-2 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {documents.map((doc, index) => (
                <Card
                  key={doc.id}
                  className="flex-shrink-0 w-80 p-8 transition-shadow duration-300 bg-white border border-gray-200 rounded-2xl cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gray-400 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xl mb-2 text-gray-900 truncate">{doc.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {doc.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{doc.date}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-sm text-gray-700 font-medium">보안 상태 정상</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {documents.length > 0 && (
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-md border border-gray-300"
                aria-label="다음 문서 보기"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
