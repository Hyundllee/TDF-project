import { tdfContentImages } from '../../../../assets/images/fund/tdf'
import ContentHeader, { type ContentHeaderProps } from './shared/ContentHeader'
import StrategyCards from './shared/StrategyCards'

interface TdfOverviewSlideProps extends ContentHeaderProps {
  variant: 'people' | 'allocation' | 'definition' | 'features'
}

const overviewStrategies = [
  {
    title: '주기적 리밸런싱',
    description: [
      '시장 상황과 운용자금 변화에 효율적으로 대응합니다.',
      '투자 포트폴리오를 주기적으로 조정해 장기 수익을 추구합니다.',
    ],
    icon: tdfContentImages.icons.rebalancingScale,
  },
  {
    title: '글로벌 자산배분',
    description: [
      '다양한 지역과 자산에 분산 투자해 불확실성을 관리합니다.',
      '시장 환경에 맞춰 추가 수익 기회를 찾습니다.',
    ],
    symbol: '🌐',
  },
  {
    title: '생애주기 반영 Glide Path',
    description: [
      '은퇴 시점이 다가올수록 위험자산의 비중을 줄입니다.',
      '비행기의 착륙 경로처럼 안정적으로 자산을 관리합니다.',
    ],
    icon: tdfContentImages.icons.glideAirplane,
  },
]

export default function TdfOverviewSlide({
  eyebrow,
  title,
  variant,
}: TdfOverviewSlideProps) {
  return (
    <div className={`content-slide content-slide--overview content-slide--overview-${variant}`}>
      <ContentHeader eyebrow={eyebrow} title={title} />

      {variant === 'people' && (
        <div className="overview-scene overview-scene--people">
          <PersonVisual type="young" label="은퇴 이전" />
          <PersonVisual type="senior" label="은퇴 이후" />
          <p>생애주기에 따라 투자 목표와<br />위험에 대한 감내 수준은 달라집니다.</p>
        </div>
      )}

      {variant === 'allocation' && (
        <div className="overview-scene overview-scene--allocation">
          <div className="overview-callout overview-callout--young">
            <strong>은퇴 이전</strong>
            <span>위험자산 <b className="is-up">↑</b></span>
            <span>안전자산 <b className="is-down">↓</b></span>
          </div>
          <PersonVisual type="young" />
          <PersonVisual type="senior" />
          <div className="overview-callout overview-callout--senior">
            <strong>은퇴 이후</strong>
            <span>위험자산 <b className="is-down">↓</b></span>
            <span>안전자산 <b className="is-up">↑</b></span>
          </div>
          <p>그럼, 누군가 자동으로 내 생애주기에 맞춰<br />투자 비중을 조정해 준다면 어떨까요?</p>
        </div>
      )}

      {variant === 'definition' && (
        <div className="overview-scene overview-scene--definition">
          <PersonVisual type="young-talking" />
          <div className="overview-definition">
            <strong>TDF</strong>
            <i><span /></i>
            <i><span /></i>
            <i><span /></i>
          </div>
          <PersonVisual type="senior-talking" />
          <p><b>TDF(Target Date Fund)</b>는 투자자의 은퇴 시점에 맞춰<br />생애주기에 따라 투자자산의 비중을 자동으로 조절하는 자산 배분 펀드입니다.</p>
        </div>
      )}

      {variant === 'features' && <StrategyCards items={overviewStrategies} />}
    </div>
  )
}

interface PersonVisualProps {
  type: 'young' | 'young-talking' | 'senior' | 'senior-talking'
  label?: string
}

function PersonVisual({ type, label }: PersonVisualProps) {
  const isYoung = type === 'young' || type === 'young-talking'
  const image = isYoung
    ? type === 'young-talking'
      ? tdfContentImages.characters.youngTalking
      : tdfContentImages.characters.youngNeutral
    : type === 'senior-talking'
      ? tdfContentImages.characters.seniorTalking
      : tdfContentImages.characters.seniorNeutral

  return (
    <div className={`overview-character overview-character--${type}`}>
      <div className="overview-character__circle">
        <img
          src={image}
          alt={isYoung ? '은퇴 이전의 젊은 투자자' : '은퇴 이후의 투자자'}
        />
      </div>
      {label && <strong>{label}</strong>}
    </div>
  )
}
