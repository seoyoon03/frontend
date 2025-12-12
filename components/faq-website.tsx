import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQWebsite() {
  const faqs = [
    {
      question: "Q. 웹사이트 점검은 어떻게 진행되나요?",
      answer:
        "A. 웹사이트 URL을 입력하면 자동으로 보안 취약점 스캔이 시작됩니다. SQL 인젝션, XSS, CSRF, 보안 헤더 누락 등 다양한 취약점을 검사하며, 검사 완료 후 상세한 보고서를 제공합니다.",
    },
    {
      question: "Q. 검사에는 얼마나 시간이 걸리나요?",
      answer:
        "A. 웹사이트의 규모와 페이지 수에 따라 다르지만, 일반적으로 5~15분 정도 소요됩니다. 대규모 웹사이트의 경우 더 오래 걸릴 수 있으며, 검사 진행 상황은 실시간으로 확인할 수 있습니다.",
    },
    {
      question: "Q. 어떤 보안 취약점을 검사하나요?",
      answer:
        "A. SQL 인젝션, XSS(Cross-Site Scripting), CSRF, 보안 헤더 누락, SSL/TLS 설정 오류, 민감한 정보 노출, 디렉토리 리스팅, 취약한 인증 등 OWASP Top 10을 포함한 주요 보안 취약점을 검사합니다.",
    },
    {
      question: "Q. 검사 결과는 어떻게 확인하나요?",
      answer:
        "A. 검사 완료 후 대시보드에서 취약점 등급별로 분류된 상세 보고서를 확인할 수 있습니다. 각 취약점에 대한 설명과 해결 방법도 함께 제공됩니다.",
    },
    {
      question: "Q. 검사가 웹사이트에 영향을 주나요?",
      answer:
        "A. 검사는 비침투적 방식으로 진행되어 웹사이트의 정상 운영에 영향을 주지 않습니다. 다만, 검사 중 일시적으로 트래픽이 증가할 수 있으므로 트래픽이 적은 시간대에 검사하는 것을 권장합니다.",
    },
    {
      question: "Q. 정기적인 검사가 필요한가요?",
      answer:
        "A. 네, 새로운 취약점이 지속적으로 발견되므로 정기적인 검사가 필요합니다. 최소 월 1회 이상 검사를 권장하며, 웹사이트 업데이트 후에는 즉시 검사하는 것이 좋습니다.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">자주 묻는 질문</h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg border border-gray-200 shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-semibold text-gray-900">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
