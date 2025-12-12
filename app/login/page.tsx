"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/services"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // 1. OTP 활성화 여부 확인
      const otpStatus = await authService.checkOtp(username)

      if (otpStatus.otpEnabled) {
        // 2. OTP가 활성화되어 있으면 임시 저장하고 OTP 페이지로 이동
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('loginUsername', username)
          sessionStorage.setItem('loginPassword', password)
        }
        
        router.push('/login/otp')
      } else {
        // 3. 일반 로그인 진행
        const result = await authService.login({ username, password })
        
        // 아이디 저장 기능
        if (rememberMe && typeof window !== 'undefined') {
          localStorage.setItem('savedUsername', username)
        } else if (typeof window !== 'undefined') {
          localStorage.removeItem('savedUsername')
        }

        // 대시보드로 리다이렉트
        router.push('/')
      }
    } catch (err: any) {
      console.error('로그인 실패:', err)
      const errorMessage = err.response?.data?.message || '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.'
      setError(errorMessage)
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">로그인</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                아이디
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="아이디를 입력하세요"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:cursor-not-allowed"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                아이디 저장
              </label>
            </div>

            <div className="text-sm space-x-2">
              <Link href="/find-id" className="font-medium text-blue-600 hover:text-blue-500">
                아이디 찾기
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/reset-password" className="font-medium text-blue-600 hover:text-blue-500">
                비밀번호 찾기
              </Link>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600">
            계정이 없으신가요?{" "}
            <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              회원가입
            </Link>
          </p>

          <div>
            <button
              type="submit"
              disabled={loading || !username || !password}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  로그인 중...
                </span>
              ) : (
                "로그인"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
