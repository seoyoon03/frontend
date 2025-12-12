"use client"

import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <footer
      className={`w-full ${
        isHomePage
          ? "h-screen snap-start flex items-center justify-center bg-black"
          : "relative bg-slate-900 text-gray-300"
      }`}
    >
      <div className="container mx-auto px-8 md:px-16 py-12">
        
        {/*
          [모바일 레이아웃 목표]
          1. 로고 섹션: grid-cols-2 내에서 col-span-2 (1열 전체)
          2. 정보 섹션 (개발자, 역할, 이메일, 소속): grid-cols-2 내에서 각각 col-span-1 (2x2 격자)
          3. 데스크톱 (md 이상): grid-cols-6 내에서 로고(2), 나머지(1씩) 배치
        */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-y-10 md:gap-8"> 
          
          {/* 1. Company Info - 로고 섹션 */}
          <div className="space-y-4 col-span-2 md:col-span-2"> 
            <div className="flex items-center space-x-2">
              <img 
                src="/shield-hub-logo.png"
                alt="Shield Hub Logo" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed"> 
              쉴드 허브는 지능형 파일 보안 및 <br className="md:hidden"></br>웹 취약점 분석을 제공하는 올인원 <br className="md:hidden"></br>보안 플랫폼입니다.
            </p>
          </div>
          
          {/* 2. 개발자 섹션 (2x2 좌상단) */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold text-white">개발자</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  하서윤
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  표상혁
                </a>
              </li>
            </ul>
          </div>

          {/* 3. 역할 섹션 (2x2 우상단) */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold text-white">역할</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  프론트엔드&UXUI
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  백엔드&AI개발
                </a>
              </li>
            </ul>
          </div>
          
          {/* 4. 이메일 섹션 (2x2 좌하단) */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold text-white">이메일</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:rachel136@naver.com" className="text-gray-400 hover:text-white text-sm hover:underline">
                  rachel136@naver.com
                </a>
              </li>
              <li>
                <a href="mailto:yunsik134@naver.com" className="text-gray-400 hover:text-white text-sm hover:underline">
                  yunsik134@naver.com
                </a>
              </li>
            </ul>
          </div>

          {/* 5. 소속 섹션 (2x2 우하단) */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold text-white">소속</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  수원대 정보보호학과
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  수원대 정보보호학과
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright 섹션 */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-400 text-sm">© 2025. Developed by 하서윤/표상혁 for Capstone Design.</p>
            {/* 소셜 아이콘이 들어갈 자리 */}
            <div className="flex space-x-6 mt-4 md:mt-0">
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}