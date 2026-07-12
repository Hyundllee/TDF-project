import { useEffect, useRef, useState } from 'react'
import sliderPoint from '../../../assets/images/slider-point.svg'

const heroImageModules = import.meta.glob<string>(
  '../../../assets/images/tdf-[0-9][0-9].svg',
  { eager: true, import: 'default', query: '?url' },
)

const heroImages = Object.fromEntries(
  Object.entries(heroImageModules).map(([path, image]) => {
    const age = path.match(/tdf-(\d{2})\.svg$/)?.[1]

    return [age, image]
  }),
)

const lifeStages = [
  { age: '20', pathProgress: 0.9 },
  { age: '30', pathProgress: 0.77 },
  { age: '40', pathProgress: 0.63 },
  { age: '50', pathProgress: 0.3 },
  { age: '60', pathProgress: 0.1 },
]

export default function TdfHero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [point, setPoint] = useState({ x: 253, y: 30 })
  const curvePathRef = useRef<SVGPathElement>(null)
  const currentProgressRef = useRef(lifeStages[0].pathProgress)
  const activeStage = lifeStages[activeIndex]

  useEffect(() => {
    const path = curvePathRef.current
    if (!path) return

    const startProgress = currentProgressRef.current
    const targetProgress = lifeStages[activeIndex].pathProgress
    const totalLength = path.getTotalLength()
    const duration = 750
    let animationFrame = 0
    let startTime = 0

    const animatePoint = (time: number) => {
      if (!startTime) startTime = time

      const elapsed = Math.min((time - startTime) / duration, 1)
      const eased = 0.5 - Math.cos(elapsed * Math.PI) / 2
      const progress =
        startProgress + (targetProgress - startProgress) * eased
      const nextPoint = path.getPointAtLength(totalLength * progress)

      currentProgressRef.current = progress
      setPoint({ x: nextPoint.x, y: nextPoint.y })

      if (elapsed < 1) {
        animationFrame = window.requestAnimationFrame(animatePoint)
      }
    }

    animationFrame = window.requestAnimationFrame(animatePoint)

    return () => window.cancelAnimationFrame(animationFrame)
  }, [activeIndex])

  return (
    <div className="tdf-hero">
      <p className="tdf-hero__eyebrow">SAMSUNG ASSET MANAGEMENT</p>
      <h1>
        SAMSUNG <em>TDF</em>
      </h1>
      <p className="tdf-hero__description">
        투자는 평생 같은 방식으로 해야 할까요?<br />
        생애주기에 따라 투자 비중도 함께 변화합니다.
      </p>

      <div className="tdf-hero__stage">
        <div className="tdf-hero__curve" aria-hidden="true">
          <svg viewBox="0 0 1633 367" preserveAspectRatio="none">
            <defs>
              <linearGradient
                id="tdf-curve-gradient"
                x1="1632.12"
                y1="182.436"
                x2="0.123"
                y2="182.436"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#48c8a7" stopOpacity="0" />
                <stop offset="0.341346" stopColor="#48c8a7" />
                <stop offset="0.658654" stopColor="#1454ff" />
                <stop offset="1" stopColor="#1454ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              ref={curvePathRef}
              d="M1632.12 362.535C1496.53 367.362 1144.83 380.418 874.322 260.665C492.123 91.4657 311.322 44.9671 253.123 30.4855C154.123 5.85157 26.3935 3.65884 0.123047 1.49493"
              fill="none"
              stroke="url(#tdf-curve-gradient)"
              strokeWidth="3"
              opacity="0.5"
            />
            <image
              href={sliderPoint}
              x={point.x - 34}
              y={point.y - 34}
              width="68"
              height="68"
            />
          </svg>
        </div>

        <div className="tdf-hero__visual" aria-live="polite">
          <img
            key={activeStage.age}
            className="is-active"
            src={heroImages[activeStage.age]}
            alt={`${activeStage.age}대 TDF 투자 이미지`}
          />
        </div>
      </div>

      <div className="tdf-hero__ages" aria-label="생애주기 선택">
        {lifeStages.map((stage, index) => (
          <button
            key={stage.age}
            type="button"
            className={index === activeIndex ? 'is-active' : ''}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            {stage.age}대
          </button>
        ))}
      </div>
      <span className="tdf-hero__scroll-guide" aria-hidden="true" />
    </div>
  )
}
