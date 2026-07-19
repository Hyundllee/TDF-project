import { useState } from 'react'
import { tdfContentImages } from '../../../../assets/images/fund/tdf'

const qnaItems = [
  {
    question: "삼성자산운용의 대표 연금 상품인 '삼성 TDF'란 무엇인가요?",
    answer:
      '삼성 TDF(Target Date Fund)는 투자자의 은퇴 목표 시점(Target Date)에 맞춰 포트폴리오를 알아서 리밸런싱해 주는 스마트한 개인연금·퇴직연금 자산 배분 펀드입니다. 은퇴 시기가 많이 남은 초기에는 주식 등 성장 자산에 집중하고, 은퇴 시점이 다가올수록 채권 등 안전 자산의 비중을 자동으로 높여 안정적인 연금 자산을 형성하도록 돕습니다.',
  },
  {
    question: "내 은퇴 연도에 맞는 '삼성TDF' 상품 라인업은 어떻게 선택하나요?",
    answer:
      '예상 은퇴 연도와 가장 가까운 목표 시점의 상품을 선택할 수 있습니다. 예를 들어 2050년 전후 은퇴를 계획한다면 TDF 2050을 기준으로 살펴보고, 투자 성향과 위험 감내 수준을 함께 고려해 최종 상품을 선택합니다.',
  },
  {
    question: "TDF 투자에서 가장 중요한 '글라이드 패스(Glide Path)'의 역할은 무엇인가요?",
    answer:
      '글라이드 패스는 은퇴까지 남은 기간에 따라 주식과 채권 등 자산의 투자 비중을 자동으로 조절하는 운용 경로입니다. 초기에는 성장 자산 비중을 높이고 은퇴가 가까워질수록 안전 자산 비중을 확대합니다.',
  },
  {
    question: '왜 많은 투자자들이 연금 자산으로 삼성 TDF를 선택하고 신뢰하나요?',
    answer:
      '생애주기를 반영한 체계적인 자산배분, 글로벌 분산투자와 지속적인 리밸런싱을 한 상품 안에서 관리할 수 있기 때문입니다. 삼성자산운용의 운용 경험과 리서치 역량도 장기 연금 운용을 지원합니다.',
  },
]

export default function QnaSlide() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="content-slide content-slide--qna">
      <div className="qna-slide__breadcrumb">
        <img src={tdfContentImages.icons.home} alt="" />
        <span>연금투자</span>
        <i aria-hidden="true">›</i>
        <strong>삼성 TDF</strong>
      </div>

      <header className="qna-slide__header">
        <p>QnA</p>
        <h2>삼성자산운용 TDF 한 눈에 보기</h2>
      </header>

      <div className="qna-slide__list">
        {qnaItems.map((item, index) => {
          const isOpen = openIndex === index
          const contentId = `tdf-qna-answer-${index + 1}`

          return (
            <article className={isOpen ? 'is-open' : undefined} key={item.question}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>Q{index + 1}</span>
                <strong>{item.question}</strong>
                <i aria-hidden="true" />
              </button>
              <div className="qna-slide__answer" id={contentId}>
                <p>{item.answer}</p>
              </div>
            </article>
          )
        })}
      </div>

      <div className="qna-slide__actions">
        <button type="button">삼성 TDF 대표 펀드 수익률 <span>→</span></button>
        <button type="button">TDF 3종 비교해 보기 <span>→</span></button>
      </div>
    </div>
  )
}
