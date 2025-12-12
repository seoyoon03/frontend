"use client"

export function StatsSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900/50 snap-start py-12 sm:py-16 md:py-0">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 text-center">
        
        {/* ⭐️ 수정: 제목 크기를 Functions 페이지와 맞추되(text-3xl), PC에서는 더 크게(md:text-5xl) 설정 */}
        {/* 간격은 mb-3으로 좁게 유지 */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
          Why Shield Hub?
        </h2>
        
        {/* ⭐️ 수정: 설명 글씨 크기도 text-sm(모바일) / text-xl(PC)로 키움 */}
        <p className="text-gray-400 text-sm md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"> 
          웹사이트와 파일은 매일 수십, 수백 번의 공격에 노출됩니다.
          <br className="hidden md:block" />
          중요한 데이터와 비즈니스 자산을 위협으로부터 안전하게 지키세요.
        </p>

        {/* 통계 그리드 */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-16 max-w-5xl mx-auto">
          
          {/* 통계 1 */}
          <div className="text-center">
            <div className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-2">
              83<span className="text-base sm:text-xl md:text-3xl">%</span>
            </div>
            <div className="text-gray-400 text-xs sm:text-sm md:text-base mb-2">
              웹 고위험 취약점 증가율
            </div>
            <div className="text-gray-500 text-[8px] sm:text-xs md:text-sm hidden sm:block">
              웹 취약점 고심각성 항목
              <br />
              최근 1년간 83% 증가
            </div>
          </div>

          {/* 통계 2 */}
          <div className="text-center">
            <div className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-2">
              94<span className="text-base sm:text-xl md:text-3xl text-gray-400">/day</span>
            </div>
            <div className="text-gray-400 text-xs sm:text-sm md:text-base mb-2">
              하루 평균 공격 횟수
            </div>
            <div className="text-gray-500 text-[8px] sm:text-xs md:text-sm hidden sm:block">
              머신러닝 기반 파일 분석으로
              <br />
              하루에 평균 94번의 공격
            </div>
          </div>

          {/* 통계 3 */}
          <div className="text-center">
            <div className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-2">
              31.2<span className="text-base sm:text-xl md:text-3xl">%</span>
            </div>
            <div className="text-gray-400 text-xs sm:text-sm md:text-base mb-2">
              보안 사고 감소율
            </div>
            <div className="text-gray-500 text-[8px] sm:text-xs md:text-sm hidden sm:block">
              전체 데이터 유출의 31.2%는
              <br />
              악성코드로 인한 파일 손실로 발생
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}