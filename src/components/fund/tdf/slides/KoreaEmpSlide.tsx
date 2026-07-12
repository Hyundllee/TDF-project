import ContentHeader, { type ContentHeaderProps } from './shared/ContentHeader'
import StrategyCards from './shared/StrategyCards'

interface KoreaEmpSlideProps extends ContentHeaderProps {
  variant: 'intro' | 'features'
}

export default function KoreaEmpSlide({
  eyebrow,
  title,
  variant,
}: KoreaEmpSlideProps) {
  return (
    <div className="content-slide content-slide--korea-emp">
      <ContentHeader eyebrow={eyebrow} title={title} />
      {variant === 'intro' ? (
        <div className="comparison-grid">
          <article>
            <h3>글로벌 글라이드 패스</h3>
            <p>전세계 주식·채권·대체자산에 분산합니다.</p>
          </article>
          <article className="is-highlighted">
            <h3>코리아 글라이드 패스</h3>
            <p>국내 주식과 채권 중심의 한국형 전략입니다.</p>
          </article>
        </div>
      ) : (
        <StrategyCards
          items={['한국인 특성 맞춤 자산배분', '국내 대표 ETF 포트폴리오', 'Core & Satellite 알파 추구']}
        />
      )}
    </div>
  )
}
