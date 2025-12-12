"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { authService } from "@/lib/services"
import { useToast } from "@/hooks/use-toast"

export default function FindIdPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [emailError, setEmailError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [foundId, setFoundId] = useState("")
  const [searchMethod, setSearchMethod] = useState<"email" | "phone">("email")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/
    return phoneRegex.test(phone)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)

    if (value && !validateEmail(value)) {
      setEmailError("올바른 이메일 형식이 아닙니다. (예: example@email.com)")
    } else {
      setEmailError("")
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhone(value)

    if (value && !validatePhone(value)) {
      setPhoneError("올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)")
    } else {
      setPhoneError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    // 유효성 검증
    if (searchMethod === "email") {
      if (!email) {
        setEmailError("이메일을 입력해주세요.")
        return
      }
      if (!validateEmail(email)) {
        setEmailError("올바른 이메일 형식이 아닙니다.")
        return
      }
    } else {
      if (!phone) {
        setPhoneError("전화번호를 입력해주세요.")
        return
      }
      if (!validatePhone(phone)) {
        setPhoneError("올바른 전화번호 형식이 아닙니다.")
        return
      }
    }
    
    setLoading(true)
    try {
      let result
      
      // searchMethod에 따라 적절한 파라미터로 API 호출
      if (searchMethod === "email") {
        result = await authService.findId(email)
      } else {
        // 전화번호로 찾기 - 백엔드가 phoneNumber 파라미터를 지원한다고 가정
        result = await authService.findId(phone)
      }
      
      setFoundId(result?.userId || result?.username || "알 수 없음")
      setSubmitted(true)
      toast({
        title: "아이디 찾기 성공",
        description: "회원님의 아이디를 확인했습니다.",
      })
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "아이디를 찾을 수 없습니다. 입력값을 확인해주세요."
      setError(errorMessage)
      toast({
        title: "아이디 찾기 실패",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">아이디를 찾았습니다</h2>
            <p className="text-gray-600 mb-6">회원님의 아이디는 다음과 같습니다.</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <p className="text-2xl font-bold text-gray-900">{foundId}</p>
            </div>
            <div className="space-y-3">
              <Link
                href="/login"
                className="block w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                로그인하기
              </Link>
              <Link
                href="/reset-password"
                className="block w-full py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                비밀번호 찾기
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">아이디 찾기</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            가입하신 이메일 또는 전화번호를 입력하시면
            <br />
            아이디를 확인하실 수 있습니다.
          </p>
        </div>

        <div className="flex rounded-md shadow-sm mb-6">
          <button
            type="button"
            onClick={() => setSearchMethod("email")}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-md border ${
              searchMethod === "email"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            이메일로 찾기
          </button>
          <button
            type="button"
            onClick={() => setSearchMethod("phone")}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-md border-t border-r border-b ${
              searchMethod === "phone"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            전화번호로 찾기
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {searchMethod === "email" ? (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  emailError ? "border-red-500" : "border-gray-300"
                } rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="example@email.com"
              />
              {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
            </div>
          ) : (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                전화번호
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                required
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  phoneError ? "border-red-500" : "border-gray-300"
                } rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="010-1234-5678"
              />
              {phoneError && <p className="mt-1 text-sm text-red-600">{phoneError}</p>}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  찾는 중...
                </span>
              ) : (
                "아이디 찾기"
              )}
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              로그인으로 돌아가기
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
