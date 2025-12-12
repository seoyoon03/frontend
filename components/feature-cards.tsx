export function FeatureCards() {
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
      title: "개인 파일은 안전한 AES-256 암호화로부터 보호됩니다",
      description:
        "군사 등급의 256 비트 암호화를 사용하여 파일을 보호하고, 무단 접근으로부터 데이터를 안전하게 보호합니다.",
      color: "text-blue-500",
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: "안전하게 보호된 파일을 공유하고 접근 제어",
      description: "안전 파일을 팀과 공유하고, 세밀한 접근 권한을 설정하여 누가 파일을 볼 수 있는지 제어합니다.",
      color: "text-blue-600",
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      title: "SHA-256 기반 무결성 검증으로 파일 위·변조 방지",
      description: "파일의 SHA-256 해시를 생성하여 다운로드 시 파일의 무결성을 검증하고, 위·변조된 파일을 감지합니다.",
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
