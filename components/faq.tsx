import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "Q. 암호화는 어떤 방식으로 이루어지나요?",
      answer:
        "A. 사용자가 업로드한 파일은 AES-256 알고리즘을 사용하여 강력하게 암호화됩니다. 이 방식은 현재 가장 널리 사용되는 보안 표준입니다.",
    },
    {
      question: "Q. 암호화된 파일은 서버에 저장되나요?",
      answer:
        "A. 아니요, 저장되지 않습니다. 암호화 완료 후, 사용자에게 암호화된 파일과 키 파일을 다운로드하도록 제공하며, 시스템에서는 파일 암호화 이력 정보만 남기고 암호화된 파일은 즉시 삭제됩니다.",
    },
    {
      question: "Q. 암호화 키는 어떻게 관리되나요?",
      answer:
        "A. 파일 암호화에 사용된 키는 한 번 더 암호화되어 사용자에게 제공되며, 서버에서는 암호화 키를 저장하지 않고 즉시 삭제하여 보안을 극대화합니다.",
    },
    {
      question: "Q. 파일 업로드 시 SHA-256 해시값은 왜 생성되나요?",
      answer:
        "A. 파일 업로드 시 SHA-256 해시값이 생성되어 데이터베이스에 저장됩니다. 이 해시값은 나중에 사용자가 파일을 복호화할 때 원본 파일의 무결성을 검증하는 데 사용됩니다.",
    },
    {
      question: "Q. 업로드 가능한 파일 용량과 종류에 제한이 있나요?",
      answer:
        "A. 파일 종류에는 제한이 없지만, 시스템 안정성을 위해 파일 하나당 최대 용량은 100MB로 제한됩니다.",
    },
    {
      question: "Q. 암호화 이력은 어디서 확인할 수 있나요?",
      answer:
        "A. 암호화 작업 완료 후, 설정 페이지의 '파일 암호화 이력' 메뉴에서 작업 기록을 상세하게 조회할 수 있습니다.",
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