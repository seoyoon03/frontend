"use client"

import Link from "next/link"

export function HeroSection() {
  return (
    <section className="hero-section h-screen flex items-center relative snap-start">
      <div className="container mx-auto px-8 md:px-16 relative z-10">
        <div className="max-w-4xl">
          {/* Section 1: Main Title */}
          <div className="mb-8 md:mb-12">
            <h1 
              className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-left break-keep"
              style={{ wordBreak: "keep-all" }}
            >
              <div className="glow-text text-white mb-2 md:mb-4">
                파일 보호부터 웹 보안까지,
              </div>
              <div className="text-white">
                하나의 솔루션으로
              </div>
            </h1>
          </div>

          {/* Section 2: Description */}
          <div className="mb-10 md:mb-12">
            <h2 
              className="text-xl md:text-3xl font-semibold text-white mb-6 text-left break-keep"
              style={{ wordBreak: "keep-all" }}
            >
              파일 보호와 웹 사이트 보안 통합 관리 단일 플랫폼
            </h2>

            {/* ⭐️ 수정: 마침표 뒤에 띄어쓰기 한 칸을 추가했습니다. */}
            <p 
              className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed text-left max-w-4xl break-keep"
              style={{ wordBreak: "keep-all" }}
            >
              웹 기반 통합 보안 솔루션으로 개인 파일은 AES 암호화로 안전하게 보호하고, 웹 서비스는 취약점 분석으로 안전하게 관리하세요. 한 화면에서 파일과 서비스 상태를 모두 확인할 수 있습니다.
            </p>
          </div>

          {/* Section 3: Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/encryption" className="bg-transparent border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg transition-colors text-center cursor-pointer text-sm md:text-base font-medium">
              파일 검사
            </Link>
            
            <Link href="/website-inspection" className="bg-transparent border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg transition-colors text-center cursor-pointer text-sm md:text-base font-medium">
              웹사이트 점검
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}