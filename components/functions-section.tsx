"use client"

import Link from "next/link"

export function FunctionsSection() {
  return (
    // h-screen 유지 (스냅 스크롤 작동)
    <section className="h-screen flex items-center justify-center bg-slate-800 snap-start">
      <div className="container mx-auto px-4 md:px-16">
        
        {/* 상단 텍스트 영역 */}
        <div className="mb-6 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
            Functions <span className="text-gray-400">기능</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-xs md:text-base">
            Shield Hub은 기업의 기밀 정보를 보호하는 포괄적인 보안 솔루션을 제공합니다.
            <br />
            파일 암호화부터 웹사이트 보안 검사까지, 모든 보안 요구사항을 하나의 플랫폼에서 해결하세요.
          </p>
        </div>

        {/* 2개의 큰 카드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-8">
          
          {/* File Encryption Card */}
          <Link href="/encryption">
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 p-4 md:p-8 rounded-2xl border border-emerald-500/30 card-hover relative cursor-pointer">
              <div className="flex justify-between items-start mb-2 md:mb-6">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-emerald-400 rounded"></div>
                </div>
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs md:text-base">→</span>
                </div>
              </div>

              <h3 className="text-sm md:text-xl font-semibold text-emerald-400 mb-1 md:mb-3">File Encryption</h3>
              <p className="text-gray-300 text-[10px] md:text-sm mb-0 md:mb-6">
                {/* ✅ 수정: 줄바꿈 태그 앞에 {" "}를 추가하여 모바일에서 띄어쓰기 강제 적용 */}
                군사급 암호화 기술로 파일을 안전하게 보호하고, 클라우드 저장소와 연동하여{" "}
                <br className="hidden md:block"/>
                어디서나 안전한 파일 관리가 가능합니다. 실시간 파일 무결성 검증과{" "}
                <br className="hidden md:block"/>
                자동 백업 기능으로 데이터 손실 위험을 최소화합니다.
              </p>
            </div>
          </Link>

          {/* Website Security Scan Card */}
          <Link href="/website-inspection">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 p-4 md:p-8 rounded-2xl border border-blue-500/30 card-hover relative cursor-pointer">
              <div className="flex justify-between items-start mb-2 md:mb-6">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-blue-400 rounded"></div>
                </div>
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs md:text-base">→</span>
                </div>
              </div>

              <h3 className="text-sm md:text-xl font-semibold text-blue-400 mb-1 md:mb-3">Website Security Scan</h3>
              <p className="text-gray-300 text-[10px] md:text-sm mb-0 md:mb-6">
                {/* ✅ 수정: 줄바꿈 태그 앞에 {" "}를 추가하여 모바일에서 띄어쓰기 강제 적용 */}
                웹사이트의 보안 취약점을 실시간으로 모니터링하고, 상세한 보고서를 통해{" "}
                <br className="hidden md:block"/>
                보안 상태를 한눈에 파악할 수 있습니다. AI 기반 위협 분석으로{" "}
                <br className="hidden md:block"/>
                새로운 보안 위협에도 신속하게 대응합니다.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}