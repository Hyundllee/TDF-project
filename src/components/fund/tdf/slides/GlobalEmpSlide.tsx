import { tdfContentImages } from '../../../../assets/images/fund/tdf'
import ContentHeader, { type ContentHeaderProps } from './shared/ContentHeader'
import StrategyCards from './shared/StrategyCards'

interface GlobalEmpSlideProps extends ContentHeaderProps {
  variant: 'intro' | 'features'
}

const globalEmpStrategies = [
  {
    title: '한국인의 특성에 적합한 생애주기별 자동 자산배분 솔루션, TDF',
    description: [
      '소득주기와 은퇴 시점 등 한국인의 생애주기 특성을 반영합니다.',
      '시장 상황을 고려한 리밸런싱으로 운용 성과를 최적화합니다.',
    ],
    icon: tdfContentImages.icons.allocationSystem,
  },
  {
    title: '글로벌 대표 ETF로 완성하는 초분산·저비용 포트폴리오',
    description: [
      '검증된 국내외 ETF를 편입해 운용 보수와 비용 효율을 관리합니다.',
      '글로벌 주식과 대체자산, 국내 채권까지 투자 기회를 넓힙니다.',
    ],
    icon: tdfContentImages.icons.coin,
  },
  {
    title: '퀀트·AI 기반의 고도화된 운용 전략과 리스크 모니터링',
    description: [
      '정량 데이터와 퀀트 알고리즘으로 시장의 알파 기회를 탐색합니다.',
      'AI 기반 모니터링으로 변동 신호를 감지하고 선제 대응합니다.',
    ],
    icon: tdfContentImages.icons.aiStrategy,
  },
]

export default function GlobalEmpSlide({
  eyebrow,
  title,
  variant,
}: GlobalEmpSlideProps) {
  return (
    <div className={`content-slide content-slide--global-emp content-slide--global-emp-${variant}`}>
      <ContentHeader eyebrow={eyebrow} title={title} />
      {variant === 'intro' ? (
        <div className="quote-grid">
          <blockquote>
            <img src={tdfContentImages.portraits.warrenBuffett} alt="" />
            <p>“저비용 인덱스 펀드는 대다수 투자자들에게 가장 합리적인 주식 투자 방법입니다. 장기적으로 시장 전체를 소유하는 원칙이 중요합니다.”</p>
            <strong>워렌 버핏, 2006</strong>
          </blockquote>
          <blockquote>
            <img src={tdfContentImages.portraits.johnBogle} alt="" />
            <p>“시장을 이기려 하지 말고, 시장 전체를 소유하라. 수수료와 거래비용은 장기 복리 수익을 갉아먹습니다.”</p>
            <strong>존 보글, 『모든 주식을 소유하라』</strong>
          </blockquote>
        </div>
      ) : (
        <StrategyCards items={globalEmpStrategies} />
      )}
    </div>
  )
}
