import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQDecryption() {
  const faqs = [
    {
      question: "Q. 복호화를 위해 필요한 파일은 무엇인가요?",
      answer:
        "A. 복호화를 위해서는 암호화 시 다운로드했던 암호화된 파일과 암호화된 키 파일 두 가지가 모두 필요합니다.",
    },
    {
      question: "Q. 복호화 키가 없거나 올바르지 않으면 어떻게 되나요?",
      answer:
        "A. 키 파일이 없거나 올바르지 않은 경우, 서버에서 원본 키를 복구하여 복호화하는 것이 불가능하며, 복호화 페이지에 오류 메시지가 표시됩니다.",
    },
    {
      question: "Q. 복호화 시 무결성 검증은 어떻게 이루어지나요?",
      answer:
        "A. 복호화 후, 복호화된 파일의 해시값을 다시 계산하여 업로드 시 저장된 SHA-256 해시값과 비교합니다. 해시값이 일치해야만 원본 파일임을 확인하고 다운로드를 제공합니다.",
    },
    {
      question: "Q. 복호화 작업에 시간 제한이나 용량 제한이 있나요?",
      answer:
        "A. 복호화 작업은 암호화된 파일의 용량과 동일하게 100MB 제한이 적용됩니다. 복호화 과정 중에 일정 시간이 초과될 경우 오류로 판단되어 중단됩니다.",
    },
    {
      question: "Q. 복호화가 실패하는 다른 이유는 무엇인가요?",
      answer:
        "A. 키가 올바르더라도 파일이 전송 과정에서 손상되었거나, 원본 파일을 복원하는 데 필요한 무결성 검증(SHA-256 해시 비교)에 실패할 경우 복호화가 중단됩니다.",
    },
    {
      question: "Q. 복호화된 원본 파일은 서버에 저장되나요?",
      answer:
        "A. 아니요, 복호화된 파일은 사용자에게 즉시 다운로드로 제공되며, 다운로드 완료 후 서버에 남아있는 파일은 즉시 삭제됩니다.",
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