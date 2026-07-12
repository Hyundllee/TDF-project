import ContentHeader, { type ContentHeaderProps } from './shared/ContentHeader'

interface TdfOverviewSlideProps extends ContentHeaderProps {
  variant: 'people' | 'allocation' | 'definition' | 'features'
}

const strategies = [
  ['01', '주기적 리밸런싱', '시장 상황에 맞춰 포트폴리오를 조정합니다.'],
  ['02', '글로벌 자산배분', '다양한 지역과 자산에 분산 투자합니다.'],
  ['03', '생애주기 Glide Path', '은퇴에 가까워질수록 위험자산 비중을 줄입니다.'],
]

export default function TdfOverviewSlide({
  eyebrow,
  title,
  variant,
}: TdfOverviewSlideProps) {
  return (
    <div className="content-slide content-slide--overview">
      <ContentHeader eyebrow={eyebrow} title={title} />

      {variant !== 'features' ? (
        <div className={`overview-visual overview-visual--${variant}`}>
          <div className="overview-person overview-person--young">
            <span>👨🏻</span>
            <strong>은퇴 이전</strong>
          </div>
          <div className="overview-balance">
            {variant === 'definition' ? 'TDF' : '↑ 위험자산　↓ 안전자산'}
          </div>
          <div className="overview-person overview-person--senior">
            <span>👨🏻‍🦳</span>
            <strong>은퇴 이후</strong>
          </div>
          <p>생애주기에 따라 투자 목표와 위험 감내 수준은 달라집니다.</p>
        </div>
      ) : (
        <div className="strategy-grid">
          {strategies.map(([number, heading, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{heading}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
