"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { authService } from "@/lib/services"
import { useToast } from "@/hooks/use-toast"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  
  // 경로 상태 변수 정의
  const isHomePage = pathname === "/"
  const isSignUpPage = pathname === "/signup"
  const isLoginPage = pathname === "/login" 
  const isServicePage = pathname === "/encryption" || pathname === "/decryption" || pathname === "/website-inspection"

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token')
      const name = localStorage.getItem('name')
      
      if (token) {
        setIsLoggedIn(true)
        setUserName(name || '')
      } else {
        setIsLoggedIn(false)
        setUserName('')
      }
    }

    checkLoginStatus()

    // 스토리지 변경 감지 (다른 탭에서 로그인/로그아웃 시)
    window.addEventListener('storage', checkLoginStatus)
    
    // 커스텀 이벤트 리스너 추가 (같은 탭에서 로그인/로그아웃 시)
    window.addEventListener('authStateChanged', checkLoginStatus)
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus)
      window.removeEventListener('authStateChanged', checkLoginStatus)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await authService.logout()
      setIsLoggedIn(false)
      setUserName('')
      
      toast({
        title: "로그아웃 성공",
        description: "안전하게 로그아웃되었습니다.",
      })
      
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast({
        title: "로그아웃 실패",
        description: "로그아웃 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    }
  }

  // 스타일 변수 정의
  // ✅ 메뉴가 열리면 isMenuOpen 상태에 따라 텍스트 색상을 결정합니다.
  const textColor = isHomePage && !isMenuOpen ? "text-white" : "text-gray-900" 
  const hoverColor = "hover:text-gray-600"
  
  // ⭐️ 수정된 부분: 햄버거 메뉴가 열려있거나(!isHomePage)일 경우 흰색 배경 적용
  const bgColor = isMenuOpen || !isHomePage
    ? "bg-white border-b border-gray-200" // 메뉴 열림 또는 홈 페이지 아님: 흰색 배경
    : "bg-transparent" // 메뉴 닫힘 & 홈 페이지: 투명 배경
  
  // ✅ 추가: 모바일 메뉴 내부 텍스트 색상을 흰색 배경에 맞춰 항상 검정색으로 지정
  const mobileTextColor = "text-gray-900" 

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${bgColor}`} style={{ width: '100%', boxSizing: 'border-box' }}>
      <div className="container mx-auto px-8 md:px-16" style={{ maxWidth: '100%' }}>
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <img src="/shield-hub-logo.png" alt="Shield Hub Logo" className="h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center space-x-12">
            <Link href="/encryption" className={`${textColor} ${hoverColor} transition-colors text-base`}>
              파일 암호화
            </Link>
            <Link href="/decryption" className={`${textColor} ${hoverColor} transition-colors text-base`}>
              파일 복호화
            </Link>
            <Link href="/website-inspection" className={`${textColor} ${hoverColor} transition-colors text-base`}>
              웹사이트 점검
            </Link>
          </nav>

          {/* 데스크톱 로그인/회원가입 버튼 */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className={`${textColor} text-sm mr-2`}>
                  {userName ? `${userName}님` : '환영합니다'}
                </span>
                <Link href="/settings" className={`${textColor} ${hoverColor} transition-colors`}>
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </Link>
                <button
                  onClick={handleLogout}
                  className={`${textColor} ${hoverColor} transition-colors px-4 py-2 rounded-md border ${isHomePage ? 'border-white' : 'border-gray-300'} text-sm font-medium`}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                {/* 로그인 버튼: 글자 스타일 통일 완료 */}
                <Link href="/login" className={`${textColor} ${hoverColor} transition-colors px-4 py-2 text-sm font-medium`}>
                  로그인
                </Link>
                {/* 데스크톱 회원가입 버튼 수정: 로그인 페이지에서도 배경 제거 조건 추가 */}
                <Link 
                  href="/signup" 
                  className={`
                    ${
                      isHomePage 
                        ? 'bg-transparent border border-white text-white' // 홈 페이지일 때
                        : isSignUpPage || isServicePage || isLoginPage 
                          ? `${textColor} border border-transparent` // 일반 텍스트 스타일
                          : 'bg-blue-600 text-white' // 그 외 페이지일 때
                    } 
                    hover:opacity-80 
                    transition-all 
                    py-2 px-4 
                    rounded-md 
                    text-center 
                    text-sm font-medium 
                    border border-transparent
                  `}
                >
                  회원가입
                </Link>
              </>
            )}
          </div>

          <button className={`md:hidden ${textColor}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          // ✅ 수정: bg-white 클래스를 추가하고, 절대 위치를 사용하여 메뉴 배경을 흰색으로 고정
          <div className={`md:hidden py-4 bg-white shadow-lg absolute left-0 right-0 top-20`}> 
            <nav className="flex flex-col space-y-4 px-8 md:px-16">
              {/* ✅ 수정: 텍스트 색상을 mobileTextColor 변수로 고정 */}
              <Link href="/encryption" className={`${mobileTextColor} ${hoverColor} transition-colors text-base`}>
                파일 암호화
              </Link>
              <Link href="/decryption" className={`${mobileTextColor} ${hoverColor} transition-colors text-base`}>
                파일 복호화
              </Link>
              <Link href="/website-inspection" className={`${mobileTextColor} ${hoverColor} transition-colors text-base`}>
                웹사이트 점검
              </Link>
              <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
                {isLoggedIn ? (
                  <>
                    <span className={`${mobileTextColor} text-sm`}> 
                      {userName ? `${userName}님` : '환영합니다'}
                    </span>
                    <Link href="/settings" className={`${mobileTextColor} ${hoverColor} transition-colors flex items-center space-x-2`}> 
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>설정</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={`text-left py-2 px-4 rounded-md border border-gray-300 text-sm font-medium ${mobileTextColor} ${hoverColor} transition-colors`}
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    {/* 모바일 로그인 버튼 */}
                    <Link href="/login" className={`${mobileTextColor} ${hoverColor} transition-colors py-2 text-sm font-medium`}>
                      로그인
                    </Link>
                    {/* 모바일 회원가입 버튼 수정: 로그인 페이지 조건 추가 및 글자 스타일 통일 */}
                    <Link 
                      href="/signup" 
                      className={`
                        bg-blue-600 text-white 
                        hover:opacity-90 
                        transition-opacity 
                        py-2 px-4 
                        rounded-md 
                        text-center 
                        text-sm font-medium
                      `}
                    >
                      회원가입
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}