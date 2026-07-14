import type { CSSProperties } from 'react'
import { tdfContentImages } from '../../../../assets/images/fund/tdf'
import ContentHeader, { type ContentHeaderProps } from './shared/ContentHeader'
import StrategyCards from './shared/StrategyCards'

interface GlobalActiveSlideProps extends ContentHeaderProps {
  variant: 'history' | 'glide-before' | 'glide-after' | 'features'
}

type HistoryCard = {
  date: string
  lines: string[]
  expanded?: boolean
}

type HistoryMilestone = {
  tone: 'blue' | 'magenta'
  top?: HistoryCard
  bottom?: HistoryCard
}

const historyMilestones: HistoryMilestone[] = [
  {
    tone: 'magenta',
    top: { date: '2025.9', lines: ['한국형 TDF', '2040 UH'] },
    bottom: {
      date: '2016.4',
      lines: ['한국형 TDF', '2045 H', '2040 H', '2040 UH', '2035 H', '2030 H', '2025 H', '2020 H'],
      expanded: true,
    },
  },
  {
    tone: 'blue',
    bottom: { date: '2016.10', lines: ['한국형 TDF', '2015 H'] },
  },
  {
    tone: 'magenta',
    top: { date: '2019.2', lines: ['한국형 TDF', '2050 UH'] },
    bottom: { date: '2019.2', lines: ['한국형 TDF', '2050 H'] },
  },
  {
    tone: 'blue',
    bottom: { date: '2019.12', lines: ['한국형 TDF', '2055 H'] },
  },
  {
    tone: 'magenta',
    top: { date: '2024.8', lines: ['한국형 TDF', '2060 UH'] },
    bottom: { date: '2024.8', lines: ['한국형 TDF', '2060 H'] },
  },
  {
    tone: 'magenta',
    top: { date: '2026.4', lines: ['글로벌 액티브 TDF', '리브랜딩'] },
  },
]

const globalActiveStrategies = [
  {
    title: '한국인 생애주기에 최적화된 한국형 Glide Path 설계와 정기 점검',
    description: [
      '한국인의 소득주기와 은퇴 시점을 반영한 맞춤형 글라이드 패스를 설계합니다.',
      '시장 상황을 고려한 리밸런싱으로 운용 성과를 지속적으로 점검합니다.',
    ],
    icon: tdfContentImages.icons.pieChart,
  },
  {
    title: '전 세계 우량 펀드를 선별하는 오픈 아키텍처 글로벌 분산투자',
    description: [
      '글로벌 우수 액티브 펀드와 ETF를 발굴해 투자 기회를 넓힙니다.',
      '전문 운용사의 역량을 활용해 시장의 알파를 추구합니다.',
    ],
    icon: tdfContentImages.icons.calendarChart,
  },
  {
    title: '전사 역량이 집약된 삼성자산운용의 대표 연금 펀드',
    description: [
      '리서치센터의 하우스 뷰를 바탕으로 일관된 원칙을 적용합니다.',
      '자산군별 협업과 검증을 거쳐 투자 비중을 결정합니다.',
    ],
    icon: tdfContentImages.icons.wonPuzzle,
  },
]

export default function GlobalActiveSlide({
  eyebrow,
  title,
  variant,
}: GlobalActiveSlideProps) {
  const isGlide = variant === 'glide-before' || variant === 'glide-after'

  return (
    <div className={`content-slide content-slide--global-active content-slide--global-active-${variant}`}>
      <ContentHeader eyebrow={eyebrow} title={title} />

      {variant === 'history' && (
        <div className="history-timeline">
          <img className="history-timeline__rail" src={tdfContentImages.timeline.arrow} alt="" />
          {historyMilestones.map((milestone, index) => (
            <article
              key={`${milestone.top?.date ?? milestone.bottom?.date}-${index}`}
              className={`history-timeline__milestone history-timeline__milestone--${milestone.tone}`}
              style={{ '--timeline-index': index } as CSSProperties}
            >
              {milestone.top && (
                <HistoryBox card={milestone.top} position="top" />
              )}
              <img
                className="history-timeline__dot"
                src={milestone.tone === 'blue' ? tdfContentImages.timeline.blueDot : tdfContentImages.timeline.magentaDot}
                alt=""
              />
              {milestone.bottom && (
                <HistoryBox card={milestone.bottom} position="bottom" />
              )}
            </article>
          ))}
          <p>
            글로벌액티브 TDF의 역사가 한국 TDF의 역사.<br />
            은퇴자산의 적립부터 분배까지 아우르는 <b>Total Solution</b> 제공<br />
            <strong>'연속성' 그리고 '다양성'</strong>
          </p>
        </div>
      )}

      {isGlide && <GlideAllocation variant={variant} />}

      {variant === 'features' && <StrategyCards items={globalActiveStrategies} />}
    </div>
  )
}

function HistoryBox({
  card,
  position,
}: {
  card: HistoryCard
  position: 'top' | 'bottom'
}) {
  return (
    <div
      className={`history-timeline__box history-timeline__box--${position}${card.expanded ? ' history-timeline__box--expanded' : ''}`}
    >
      <span className="history-timeline__date">{card.date}</span>
      <strong>
        {card.lines.map((line, index) => (
          <span key={`${line}-${index}`}>
            {line}
            {card.expanded && line === '2040 UH' && (
              <em>2025.9</em>
            )}
          </span>
        ))}
      </strong>
    </div>
  )
}

function GlideAllocation({ variant }: { variant: 'glide-before' | 'glide-after' }) {
  const isBefore = variant === 'glide-before'
  const selected = isBefore ? '-25' : '+5'

  return (
    <div className={`allocation-chart allocation-chart--${isBefore ? 'before' : 'after'}`}>
      <div className="allocation-chart__plot">
        <span className="allocation-chart__unit">100(%)</span>
        <img src={tdfContentImages.glidePathArea} alt="은퇴 시점에 따른 주식과 채권 비중 변화 그래프" />
        <i className="allocation-chart__retirement">은퇴</i>
        <i className="allocation-chart__selected">{selected}</i>
      </div>
      <div className="allocation-chart__axis" aria-hidden="true">
        {['은퇴 -35년', '-30', '-25', '-20', '-15', '-10', '-5', '은퇴', '+5', '은퇴 +10년'].map((label) => <span key={label}>{label}</span>)}
      </div>
      <div className="allocation-chart__summary">
        <p>나의 은퇴 {isBefore ? '전' : '후'} <b>{selected}년</b>,<br />생애주기에 맞는 자산 비중은?</p>
        <dl>
          <div><dt>주식</dt><dd>{isBefore ? '73.4%' : '32.4%'}</dd></div>
          <div><dt>액티브 주식</dt><dd>{isBefore ? '56.9%' : '28.8%'}</dd></div>
          <div><dt>코어 주식</dt><dd>{isBefore ? '16.5%' : '3.6%'}</dd></div>
          <div><dt>채권</dt><dd>{isBefore ? '26.6%' : '67.6%'}</dd></div>
        </dl>
      </div>
    </div>
  )
}
