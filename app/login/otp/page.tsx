"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/services"
import { useToast } from "@/hooks/use-toast"

export default function OtpLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [otpCode, setOtpCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // sessionStorage에서 로그인 정보 불러오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUsername = sessionStorage.getItem('loginUsername')
      const savedPassword = sessionStorage.getItem('loginPassword')
      
      if (!savedUsername || !savedPassword) {
        toast({
          title: "접근 오류",
          description: "먼저 아이디와 비밀번호를 입력해주세요.",
          variant: "destructive",
        })
        router.push('/login')
      } else {
        setUsername(savedUsername)
        setPassword(savedPassword)
      }
    }
  }, [router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // OTP 코드를 숫자로 변환
      const otpCodeNumber = parseInt(otpCode)
      
      if (isNaN(otpCodeNumber) || otpCode.length !== 6) {
        throw new Error("6자리 OTP 코드를 입력해주세요.")
      }

      // OTP 로그인 진행
      const result = await authService.loginWithOtp({
        username,
        password,
        otpCode: otpCodeNumber,
      })

      // sessionStorage 정리
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('loginUsername')
        sessionStorage.removeItem('loginPassword')
      }

      toast({
        title: "로그인 성공",
        description: `환영합니다, ${result.name}님!`,
      })

      // 대시보드로 리다이렉트
      router.push('/')
    } catch (err: any) {
      console.error('OTP 로그인 실패:', err)
      const errorMessage = err.message || err.response?.data?.message || 'OTP 인증에 실패했습니다. 코드를 확인해주세요.'
      setError(errorMessage)
      
      toast({
        title: "OTP 인증 실패",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    // sessionStorage 정리
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('loginUsername')
      sessionStorage.removeItem('loginPassword')
    }
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">2단계 인증</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            인증 앱에서 생성된 6자리 코드를 입력하세요
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
              OTP 코드
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              required
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
              disabled={loading}
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 text-center text-2xl tracking-widest focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="000000"
              autoFocus
            />
            <p className="mt-2 text-xs text-gray-500 text-center">
              Google Authenticator 또는 다른 인증 앱의 코드를 입력하세요
            </p>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading || otpCode.length !== 6}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  인증 중...
                </span>
              ) : (
                "인증하기"
              )}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed"
            >
              취소
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              인증 코드를 받을 수 없나요?{" "}
              <Link href="/settings" className="font-medium text-blue-600 hover:text-blue-500">
                도움말
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
