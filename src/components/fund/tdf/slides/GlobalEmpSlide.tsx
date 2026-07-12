import ContentHeader, { type ContentHeaderProps } from './shared/ContentHeader'
import StrategyCards from './shared/StrategyCards'

interface GlobalEmpSlideProps extends ContentHeaderProps {
  variant: 'intro' | 'features'
}

export default function GlobalEmpSlide({
  eyebrow,
  title,
  variant,
}: GlobalEmpSlideProps) {
  return (
    <div className="content-slide content-slide--global-emp">
      <ContentHeader eyebrow={eyebrow} title={title} />
      {variant === 'intro' ? (
        <div className="quote-grid">
          <blockquote>
            <strong>워렌 버핏</strong>
            “시장 전체를 소유하는 저비용 인덱스 투자가 합리적입니다.”
          </blockquote>
          <blockquote>
            <strong>존 보글</strong>
            “시장을 이기려 하지 말고, 시장 전체를 소유하라.”
          </blockquote>
        </div>
      ) : (
        <StrategyCards
          items={['한국인 생애주기 솔루션', '글로벌 대표 ETF 포트폴리오', '퀀트·AI 기반 운용 전략']}
        />
      )}
    </div>
  )
}
