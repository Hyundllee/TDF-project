import ContentHeader, { type ContentHeaderProps } from './shared/ContentHeader'
import StrategyCards from './shared/StrategyCards'

interface GlobalActiveSlideProps extends ContentHeaderProps {
  variant: 'history' | 'glide-before' | 'glide-after' | 'features'
}

export default function GlobalActiveSlide({
  eyebrow,
  title,
  variant,
}: GlobalActiveSlideProps) {
  const isGlide = variant === 'glide-before' || variant === 'glide-after'

  return (
    <div className="content-slide content-slide--global-active">
      <ContentHeader eyebrow={eyebrow} title={title} />
      {variant === 'history' && (
        <div className="history-line">
          {['2016.4', '2019.2', '2019.12', '2024.8', '2026.4'].map(
            (year, index) => (
              <div key={year}>
                <span>{year}</span>
                <strong>한국형 TDF {2040 + index * 5} H</strong>
              </div>
            ),
          )}
        </div>
      )}
      {isGlide && (
        <div className="glide-area">
          <div className="glide-area__bond" />
          <div className="glide-area__active" />
          <div className="glide-area__core" />
          <span>{variant === 'glide-before' ? '은퇴 전 -25년' : '은퇴 후 +5년'}</span>
        </div>
      )}
      {variant === 'features' && (
        <StrategyCards
          items={['한국형 Glide Path 설계', '글로벌 분산투자', '전사 역량이 집약된 운용']}
        />
      )}
    </div>
  )
}
