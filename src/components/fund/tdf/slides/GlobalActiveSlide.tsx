import { useEffect, useState, type CSSProperties } from 'react'
import { tdfContentImages } from '../../../../assets/images/fund/tdf'
import allocationDetailBracket from '../../../../assets/images/fund/tdf/allocation-detail-bracket.svg'
import ContentHeader, { type ContentHeaderProps } from './shared/ContentHeader'
import StrategyCards from './shared/StrategyCards'

interface GlobalActiveSlideProps extends ContentHeaderProps {
  variant: 'history' | 'glide' | 'features'
}

type AllocationPoint = {
  axisLabel: string
  year: string
  phase: '전' | '후' | '시점'
  stock: number
  activeStock: number
  coreStock: number
  bond: number
}

const allocationPoints: AllocationPoint[] = [
  { axisLabel: '은퇴 -35년', year: '-35', phase: '전', stock: 79, activeStock: 59, coreStock: 20, bond: 21 },
  { axisLabel: '-30년', year: '-30', phase: '전', stock: 78, activeStock: 58, coreStock: 20, bond: 22 },
  { axisLabel: '-25년', year: '-25', phase: '전', stock: 73.4, activeStock: 56.9, coreStock: 16.5, bond: 26.6 },
  { axisLabel: '-20년', year: '-20', phase: '전', stock: 69, activeStock: 54, coreStock: 15, bond: 31 },
  { axisLabel: '-15년', year: '-15', phase: '전', stock: 64, activeStock: 50, coreStock: 14, bond: 36 },
  { axisLabel: '-10년', year: '-10', phase: '전', stock: 59, activeStock: 46, coreStock: 13, bond: 41 },
  { axisLabel: '-5년', year: '-5', phase: '전', stock: 52, activeStock: 42, coreStock: 10, bond: 48 },
  { axisLabel: '은퇴', year: '0', phase: '시점', stock: 35.6, activeStock: 30.6, coreStock: 5, bond: 64.4 },
  { axisLabel: '+5년', year: '+5', phase: '후', stock: 32.4, activeStock: 28.8, coreStock: 3.6, bond: 67.6 },
  { axisLabel: '은퇴 +10년', year: '+10', phase: '후', stock: 30, activeStock: 27, coreStock: 3, bond: 70 },
]

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

      {variant === 'glide' && <GlideAllocation />}

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

function formatRatio(value: number) {
  return `${Number.isInteger(value) ? value : value.toFixed(1)}%`
}

function AnimatedRatio({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame = 0

    if (reduceMotion) {
      animationFrame = window.requestAnimationFrame(() => setDisplayValue(value))
      return () => window.cancelAnimationFrame(animationFrame)
    }

    const startedAt = performance.now()
    const duration = 680

    const count = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      setDisplayValue(value * easedProgress)

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(count)
      }
    }

    animationFrame = window.requestAnimationFrame(count)

    return () => window.cancelAnimationFrame(animationFrame)
  }, [value])

  const normalizedValue = Number.isInteger(value)
    ? Math.round(displayValue)
    : Math.round(displayValue * 10) / 10

  return <>{formatRatio(normalizedValue)}</>
}

function GlideAllocation() {
  const [activeIndex, setActiveIndex] = useState(2)
  const selected = allocationPoints[activeIndex]
  const focusPosition = (activeIndex + 0.5) * 10
  const chartStyle = {
    '--allocation-focus-left': `${focusPosition}%`,
  } as CSSProperties

  const timingCopy = selected.phase === '시점'
    ? <>나의 <b>은퇴 시점</b>,</>
    : <>나의 은퇴 {selected.phase} <b>{selected.year}년</b>,</>

  return (
    <div
      className={`allocation-chart${selected.phase === '시점' ? ' is-retirement-selected' : ''}`}
      style={chartStyle}
    >
      <div className="allocation-chart__plot-wrap">
        <div className="allocation-chart__y-axis" aria-hidden="true">
          <span>100(%)</span>
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>
        <div className="allocation-chart__plot">
          <img src={tdfContentImages.glidePathArea} alt="은퇴 시점에 따른 주식과 채권 비중 변화 그래프" />
          <span className="allocation-chart__retirement-line" aria-hidden="true" />
          <span className="allocation-chart__focus" aria-hidden="true">
            <i />
          </span>
        </div>
      </div>

      <div className="allocation-chart__axis" aria-label="은퇴 시점 선택">
        {allocationPoints.map((point, index) => (
          <button
            key={point.axisLabel}
            type="button"
            className={index === activeIndex ? 'is-active' : ''}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            {point.axisLabel}
          </button>
        ))}
      </div>

      <div className="allocation-chart__summary">
        <p>{timingCopy}<br />생애주기에 맞는 자산 비중은?</p>
        <div className="allocation-chart__ratios">
          <dl className="allocation-chart__stock-total">
            <div>
              <dt><i aria-hidden="true" />주식</dt>
              <dd><AnimatedRatio value={selected.stock} /></dd>
            </div>
          </dl>
          <div className="allocation-chart__stock-detail">
            <img src={allocationDetailBracket} alt="" aria-hidden="true" />
            <dl>
              <div>
                <dt><i aria-hidden="true" />액티브 주식</dt>
                <dd><AnimatedRatio value={selected.activeStock} /></dd>
              </div>
              <div className="allocation-chart__core-ratio">
                <dt><i aria-hidden="true" />코어 주식</dt>
                <dd><AnimatedRatio value={selected.coreStock} /></dd>
                <div className="allocation-chart__tooltip" role="note">
                  <span><b>코어 주식</b> 글로벌 성장주식 (자산 증대 기대)</span>
                  <span><b>액티브 주식</b> 글로벌 주식 (성과 및 위험 관리)</span>
                </div>
              </div>
            </dl>
          </div>
          <dl className="allocation-chart__bond-total">
            <div>
              <dt><i aria-hidden="true" />채권</dt>
              <dd><AnimatedRatio value={selected.bond} /></dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
