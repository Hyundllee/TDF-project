import { tdfContentImages } from '../../../../assets/images/fund/tdf'
import comparisonArrow from '../../../../assets/images/fund/tdf/korea-comparison-arrow.svg'
import comparisonFlag from '../../../../assets/images/fund/tdf/korea-comparison-flag.svg'
import initialGlobalIcon from '../../../../assets/images/fund/tdf/korea-comparison-initial-global.svg'
import initialKoreaIcon from '../../../../assets/images/fund/tdf/korea-comparison-initial-korea.svg'
import investorGlobalIcon from '../../../../assets/images/fund/tdf/korea-comparison-investor-global.svg'
import investorKoreaIcon from '../../../../assets/images/fund/tdf/korea-comparison-investor-korea.svg'
import retirementGlobalIcon from '../../../../assets/images/fund/tdf/korea-comparison-retirement-global.svg'
import retirementKoreaIcon from '../../../../assets/images/fund/tdf/korea-comparison-retirement-korea.svg'
import targetGlobalIcon from '../../../../assets/images/fund/tdf/korea-comparison-target-global.svg'
import targetKoreaIcon from '../../../../assets/images/fund/tdf/korea-comparison-target-korea.svg'
import ContentHeader, { type ContentHeaderProps } from './shared/ContentHeader'
import StrategyCards from './shared/StrategyCards'

interface KoreaEmpSlideProps extends ContentHeaderProps {
  variant: 'intro' | 'features'
}

const koreaEmpStrategies = [
  {
    title: '한국인의 특성에 적합한 생애주기별 자동 자산배분 솔루션, TDF',
    description: [
      '한국인의 소득주기와 은퇴 시점을 반영한 맞춤형 글라이드 패스를 설계합니다.',
      '시장 상황을 고려한 리밸런싱으로 운용 성과를 관리합니다.',
    ],
    icon: tdfContentImages.icons.allocationSystem,
  },
  {
    title: '국내 투자 대표 ETF를 통한 초분산·저비용 포트폴리오',
    description: [
      '장기 투자 비용을 낮추면서 안정적인 국내 자산배분을 추구합니다.',
      '국내 주식·채권·대체자산을 포함한 포트폴리오를 구성합니다.',
    ],
    icon: tdfContentImages.icons.coin,
  },
  {
    title: 'Core & Satellite 전략을 통한 알파 추구',
    description: [
      '대표지수 ETF를 코어로 두고 우수 종목에 위성 전략을 적용합니다.',
      '채권 듀레이션 전략으로 시장의 단기 변동성에 대응합니다.',
    ],
    icon: tdfContentImages.icons.aiStrategy,
  },
]

export default function KoreaEmpSlide({
  eyebrow,
  title,
  variant,
}: KoreaEmpSlideProps) {
  return (
    <div className={`content-slide content-slide--korea-emp content-slide--korea-emp-${variant}`}>
      <ContentHeader eyebrow={eyebrow} title={title} />
      {variant === 'intro' ? (
        <div className="korea-comparison">
          <h3>한국 투자자의 특수성과 국내 자산의 효율성 극대화를 위한 한국형 전략</h3>
          <div className="korea-comparison__ratio">
            <strong>공통 위험자산 비중 구조</strong>
            <span>초기 <b>79%</b></span>
            <i><img src={comparisonArrow} alt="" /></i>
            <span>은퇴시점 <b>35.6%</b></span>
            <i><img src={comparisonArrow} alt="" /></i>
            <span>생애말 <b>23%</b></span>
          </div>
          <div className="comparison-grid">
            <ComparisonCard
              title="글로벌 글라이드 패스"
              rows={[
                ['투자 대상', '전세계 주식 · 채권 · 대체자산', targetGlobalIcon],
                ['초기 전략', '글로벌 분산 · 안정적 성장', initialGlobalIcon],
                ['은퇴시점 전략', '완만한 경사 · 안전자산 확대', retirementGlobalIcon],
                ['이런 투자자에게', '단일 국가 리스크 헤지 · 전세계 성장 편승', investorGlobalIcon],
              ]}
            />
            <ComparisonCard
              title="코리아 글라이드 패스"
              badge="한국형 전략"
              highlighted
              rows={[
                ['투자 대상', '국내 주식 및 채권 중심', targetKoreaIcon],
                ['초기 전략', '위험자산 비중↑ · 수익성 극대화', initialKoreaIcon],
                ['은퇴시점 전략', '가파른 감소 · 자산보호 강화', retirementKoreaIcon],
                ['이런 투자자에게', '국내 경제성장 활용 · 형성기엔 적극, 은퇴기엔 보존', investorKoreaIcon],
              ]}
            />
          </div>
        </div>
      ) : (
        <StrategyCards items={koreaEmpStrategies} />
      )}
    </div>
  )
}

interface ComparisonCardProps {
  title: string
  badge?: string
  highlighted?: boolean
  rows: [string, string, string][]
}

function ComparisonCard({ title, badge, highlighted, rows }: ComparisonCardProps) {
  return (
    <article className={`comparison-card${highlighted ? ' is-highlighted' : ''}`}>
      <h4>
        {title}
        {badge && (
          <span>
            <img src={comparisonFlag} alt="" />
            {badge}
          </span>
        )}
      </h4>
      <dl>
        {rows.map(([term, description, icon]) => (
          <div key={term}>
            <img src={icon} alt="" />
            <div>
              <dt>{term}</dt>
              <dd>{description}</dd>
            </div>
          </div>
        ))}
      </dl>
    </article>
  )
}
