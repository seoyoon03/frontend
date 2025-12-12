export function FeatureCardsWebsite() {
  const features = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "실시간 보안 취약점 스캔",
      description:
        "웹사이트의 보안 취약점을 실시간으로 검사하고, SQL 인젝션, XSS, CSRF 등 주요 보안 위협을 탐지합니다.",
      color: "text-blue-500",
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "SSL/TLS 인증서 검증",
      description: "웹사이트의 SSL/TLS 인증서를 검증하고, 만료일 및 보안 설정을 확인하여 안전한 통신을 보장합니다.",
      color: "text-blue-600",
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: "상세한 보안 리포트 제공",
      description: "검사 결과를 상세한 리포트로 제공하며, 발견된 취약점에 대한 해결 방안과 우선순위를 안내합니다.",
      color: "text-blue-700",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-6">
                <div className={`w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center ${feature.color}`}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-bold text-lg mb-3 leading-snug text-balance text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
