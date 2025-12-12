"use client"

import Link from "next/link"

export function FileEncryptionSection() {
  return (
    // ✅ h-screen 유지 (스냅 스크롤 작동)
    <section className="h-screen flex items-center justify-center bg-gradient-to-b from-blue-900/20 to-blue-800/10 snap-start">
      <div className="container mx-auto px-4 md:px-16">
        
        {/* 상단 텍스트 영역 */}
        {/* 모바일: mb-6 / 데스크톱: mb-16 (여백 차이를 둠) */}
        <div className="mb-6 md:mb-16"> 
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
            File Encryption <span className="text-gray-400">파일 암호화</span>
          </h2>
          <p className="text-gray-400 max-w-3xl text-xs md:text-base mb-4 md:mb-8">
            {/* ▲ 모바일: text-xs / 데스크톱: text-base */}
            업계 최고 수준의 암호화 기술로 중요한 파일을 안전하게 보호하고, 클라우드 환경에서도 완벽한 보안을
            유지합니다. 실시간 무결성 검증과 접근 제어로 데이터 보안을 한 단계 더 강화하세요.
          </p>
          <Link href="/encryption">
            {/* 버튼 크기도 반응형으로 조정 */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-lg text-xs md:text-base">
              파일 암호화
            </button>
          </Link>
        </div>

        {/* ⭐️ 그리드 레이아웃: 모바일 2열 / 데스크톱 4열 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          
          {/* Card 1: Data Security */}
          <div className="bg-gray-800/50 p-3 md:p-6 rounded-xl border border-gray-700 card-hover">
            {/* 아이콘 영역 크기 조정 */}
            <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-2 md:mb-4">
              <div className="w-4 h-4 md:w-6 md:h-6 bg-blue-400 rounded"></div>
            </div>
            {/* 제목: 모바일 text-sm / 데스크톱 text-lg */}
            <h3 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-3">Data Security</h3>
            {/* 설명: 모바일 text-[10px] / 데스크톱 text-sm */}
            <p className="text-gray-400 text-[10px] md:text-sm"> 
              파일 암호화 보안을 위한 AES-256 암호화 알고리즘을 사용합니다.
            </p>
          </div>

          {/* Card 2: Cloud Storage */}
          <div className="bg-gray-800/50 p-3 md:p-6 rounded-xl border border-gray-700 card-hover">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-2 md:mb-4">
              <div className="w-4 h-4 md:w-6 md:h-6 bg-emerald-400 rounded"></div>
            </div>
            <h3 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-3">Cloud Storage</h3>
            <p className="text-gray-400 text-[10px] md:text-sm">
              안전하고 신뢰할 수 있는 클라우드 저장소와 연동하여 언제 어디서나 접근합니다.
            </p>
          </div>

          {/* Card 3: Instant Check */}
          <div className="bg-gray-800/50 p-3 md:p-6 rounded-xl border border-gray-700 card-hover">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-2 md:mb-4">
              <div className="w-4 h-4 md:w-6 md:h-6 bg-yellow-400 rounded"></div>
            </div>
            <h3 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-3">Instant Check</h3>
            <p className="text-gray-400 text-[10px] md:text-sm">
              SHA-256 해시 기반의 실시간 파일 무결성 검증으로 변조를 탐지합니다.
            </p>
          </div>

          {/* Card 4: Access Control */}
          <div className="bg-gray-800/50 p-3 md:p-6 rounded-xl border border-gray-700 card-hover">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-2 md:mb-4">
              <div className="w-4 h-4 md:w-6 md:h-6 bg-purple-400 rounded"></div>
            </div>
            <h3 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-3">Access Control</h3>
            <p className="text-gray-400 text-[10px] md:text-sm">
              권한 기반 접근 제어와 상세한 감사 로그를 통해 이력을 관리합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}