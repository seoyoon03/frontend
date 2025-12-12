export function FeatureCardsDecryption() {
  const features = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "안전한 복호화로 원본 파일 복구",
      description:
        "암호화된 파일을 안전하게 복호화하여 원본 상태로 복구합니다. 올바른 키를 사용하여 데이터 손실 없이 파일을 되돌립니다.",
      color: "text-blue-500",
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
      ),
      title: "암호화 키 관리 및 보안 저장",
      description: "복호화에 필요한 키를 안전하게 관리하고, 권한이 있는 사용자만 파일에 접근할 수 있도록 제어합니다.",
      color: "text-blue-600",
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: "다양한 파일 형식 지원",
      description: "문서, 이미지, 동영상 등 다양한 파일 형식의 복호화를 지원하며, 원본 파일의 품질을 유지합니다.",
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
