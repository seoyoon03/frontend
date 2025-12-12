"use client"

import Link from "next/link"

export function WebSecuritySection() {
  return (
    // h-screen 유지 (스냅 스크롤 작동)
    <section
      id="security"
      className="h-screen flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 snap-start"
    >
      <div className="container mx-auto px-4 md:px-16">
        
        {/* 상단 텍스트 영역: 모바일/데스크톱 여백 차별화 */}
        <div className="mb-6 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
            Website Security Scan <span className="text-gray-400">웹사이트 취약점 점검</span>
          </h2>
          <p className="text-gray-400 max-w-3xl text-xs md:text-base mb-4 md:mb-8">
            AI가 웹사이트의 보안 취약점을 실시간으로 모니터링하고 분석합니다. 포괄적인 보안 검사를 통해 잠재적 위험을
            사전에 차단하고, 상세한 보고서로 보안 상태를 투명하게 관리하세요.
          </p>
          <Link href="/website-inspection">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-lg text-xs md:text-base">
              웹사이트 보안 검사
            </button>
          </Link>
        </div>

        {/* ⭐️ 그리드 레이아웃: 모바일 2열(2x2) / 데스크톱 4열 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          
          {/* Threat Detection */}
          <div className="bg-gray-800/50 p-3 md:p-6 rounded-xl border border-gray-700 card-hover">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-2 md:mb-4">
              <div className="w-4 h-4 md:w-6 md:h-6 bg-red-400 rounded"></div>
            </div>
            <h3 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-3">Threat Detection</h3>
            <p className="text-gray-400 text-[10px] md:text-sm">
              딥러닝 기반의 위협 탐지 시스템으로 알려진 위협부터 제로데이 공격까지 실시간으로 탐지합니다.
            </p>
          </div>

          {/* Detailed Report */}
          <div className="bg-gray-800/50 p-3 md:p-6 rounded-xl border border-gray-700 card-hover">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-2 md:mb-4">
              <div className="w-4 h-4 md:w-6 md:h-6 bg-green-400 rounded"></div>
            </div>
            <h3 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-3">Detailed Report</h3>
            <p className="text-gray-400 text-[10px] md:text-sm">
              상세한 보안 리포트와 취약점 분석 결과를 제공하여 보안 상태를 한눈에 파악할 수 있습니다.
            </p>
          </div>

          {/* Status Operations */}
          <div className="bg-gray-800/50 p-3 md:p-6 rounded-xl border border-gray-700 card-hover">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-2 md:mb-4">
              <div className="w-4 h-4 md:w-6 md:h-6 bg-cyan-400 rounded"></div>
            </div>
            <h3 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-3">Status Operations</h3>
            <p className="text-gray-400 text-[10px] md:text-sm">
              실시간 모니터링 대시보드를 통해 웹사이트의 보안 상태와 트래픽을 실시간으로 확인합니다.
            </p>
          </div>

          {/* Vulnerability & Patch */}
          <div className="bg-gray-800/50 p-3 md:p-6 rounded-xl border border-gray-700 card-hover">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-2 md:mb-4">
              <div className="w-4 h-4 md:w-6 md:h-6 bg-orange-400 rounded"></div>
            </div>
            <h3 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-3">Vulnerability & Patch</h3>
            <p className="text-gray-400 text-[10px] md:text-sm">
              취약점 발견 시 즉시 알림을 제공하고, 자동 패치 시스템으로 신속한 보안 업데이트를 지원합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}