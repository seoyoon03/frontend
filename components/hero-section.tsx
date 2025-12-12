"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
// 👇 백엔드 팀원이 만든 서비스 파일 임포트 (필수)
import { fileService } from "@/lib/services/file.service"

// ✅ true = 포트폴리오용 (가짜 로딩)
// ✅ false = 실제 연동용 (백엔드 팀원 코드 실행)
const IS_DEMO_MODE = false

export function HeroSection() {
  const [isDragging, setIsDragging] = useState(false)
  const [authMessage, setAuthMessage] = useState("")
  const [infoMessage, setInfoMessage] = useState("")
  const [encrypting, setEncrypting] = useState(false)
  // 👇 UI를 위한 프로그레스 상태 추가
  const [progress, setProgress] = useState(0)
  const [currentFileName, setCurrentFileName] = useState("")
  
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // 인증 만료 감지 (백엔드 팀원 코드 유지)
  useEffect(() => {
    const onUnauthorized = () => setAuthMessage("세션이 만료되었습니다. 다시 로그인해주세요.")
    if (typeof window !== "undefined") window.addEventListener("unauthorized", onUnauthorized)
    return () => { if (typeof window !== "undefined") window.removeEventListener("unauthorized", onUnauthorized) }
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) await processFile(files[0])
  }

  // 1. [백엔드 팀원 코드] 실제 서버 연동 함수
  const realEncryptFile = async (file: File) => {
    const token = localStorage.getItem("token")
    if (!token) {
        setAuthMessage("로그인 후 파일 업로드를 사용할 수 있습니다.")
        throw new Error("AUTH_REQUIRED")
    }

    // 실제 서버 통신 중에는 프로그레스 바를 가짜로라도 움직이게 연출 (UX 향상)
    const fakeInterval = setInterval(() => {
        setProgress(prev => prev < 90 ? prev + 10 : prev)
    }, 500)

    try {
        // 👉 여기가 핵심: 백엔드 팀원이 짠 로직
        const zipBlob = await fileService.encryptFile(file)
        
        clearInterval(fakeInterval)
        setProgress(100) // 완료되면 100%

        // 다운로드 로직
        const url = window.URL.createObjectURL(zipBlob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${file.name}_encrypted.zip`
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
    } catch (err) {
        clearInterval(fakeInterval)
        throw err // 에러를 상위로 던져서 catch에서 잡게 함
    }
  }

  // 2. [디자이너 코드] 시뮬레이션 함수
  const mockEncryptFile = async (file: File) => {
    return new Promise((resolve) => {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            resolve(true)
            return 100
          }
          return prev + 5
        })
      }, 100)
    })
  }

  // 3. 통합 실행 함수
  const processFile = async (file: File) => {
    setAuthMessage("")
    setInfoMessage("")
    setCurrentFileName(file.name)
    setProgress(0)
    setEncrypting(true)
    setInfoMessage("암호화 중입니다...")

    try {
      if (IS_DEMO_MODE) {
        await mockEncryptFile(file)
        setInfoMessage("암호화가 완료되었습니다. (데모 모드)")
      } else {
        await realEncryptFile(file)
        setInfoMessage("암호화가 완료되어 ZIP 파일을 다운로드했습니다.")
      }
      
      // 업로드 이력 저장 (공통)
      saveUploadedFiles([file])
      
      // 완료 후 초기화
      setTimeout(() => {
          setEncrypting(false)
          setProgress(0)
          setCurrentFileName("")
      }, 2000)

    } catch (err: any) {
      setEncrypting(false)
      if (err?.message === "AUTH_REQUIRED") return; // 이미 메시지 세팅됨
      
      if (err?.response?.status === 401) {
        setAuthMessage("세션이 만료되었습니다. 다시 로그인해주세요.")
      } else {
        setInfoMessage("암호화에 실패했습니다.")
      }
    }
  }

  const saveUploadedFiles = (files: File[]) => {
    // 백엔드 연동 시에는 이벤트만 날림 (기존 유지)
    if (!IS_DEMO_MODE) {
        window.dispatchEvent(new Event("filesUploaded"))
        return
    }

    // 포트폴리오용 로컬 저장 (추가된 기능)
    const existingFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]")
    const newFiles = files.map((file) => ({
      id: Date.now(),
      title: file.name,
      status: "암호화 완료",
      date: new Date().toLocaleDateString(),
      type: "encryption",
    }))
    localStorage.setItem("uploadedFiles", JSON.stringify([...newFiles, ...existingFiles]))
    window.dispatchEvent(new Event("filesUploaded"))
  }

  const handleUploadClick = () => {
    // 리얼 모드일 때만 토큰 검사
    if (!IS_DEMO_MODE) {
        const token = localStorage.getItem("token")
        if (!token) {
            setAuthMessage("로그인 후 파일 업로드를 사용할 수 있습니다.")
            return
        }
    }
    setAuthMessage("")
    setInfoMessage("")
    fileInputRef.current?.click()
  }

  const handleFileInputChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      await processFile(files[0])
      e.target.value = ""
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance text-gray-900">파일 암호화</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            파일을 안전하게 암호화하고, 암호화된 상태로 보관
            <br />
            하세요. 다운로드 시 자동으로 무결성을 검증합니다.
          </p>
        </div>

        <div
          className={`bg-white border-4 border-blue-900 rounded-3xl p-10 transition-all ${isDragging ? "scale-[1.02]" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* 👇 여기가 UI 핵심: 로딩 중이면 프로그레스 바(New), 아니면 업로드 박스(Old) */}
          {encrypting ? (
            <div className="p-16 text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-10 h-10 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="w-full max-w-md">
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">암호화 진행 중...</span>
                    <span className="text-sm font-bold text-blue-900">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-blue-900 h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
                  </div>
                  {currentFileName && <p className="text-sm text-gray-600 mt-3 truncate">{currentFileName}</p>}
                </div>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center hover:border-gray-400 transition-colors bg-gray-50">
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <Button
                  size="lg"
                  className="bg-blue-900 text-white hover:bg-blue-800 px-8 py-3 text-base font-medium"
                  onClick={handleUploadClick}
                >
                  {IS_DEMO_MODE ? "체험 파일 업로드" : "검사 파일 업로드"}
                </Button>
                <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileInputChange} />
                
                {/* 메시지 표시 영역 */}
                {authMessage && <div className="text-red-600 text-sm">{authMessage}</div>}
                {infoMessage && !authMessage && <div className="text-gray-600 text-sm">{infoMessage}</div>}
                
                <p className="text-sm text-gray-500">파일을 끌어와 첨부해 드래그하세요</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}