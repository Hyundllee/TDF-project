import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import PageProgress from './PageProgress'
import TdfSidebar, { type TdfMenuItem } from './TdfSidebar'

export interface FullPageSlide {
  id: string
  menuIndex: number
  progressGroup: number
  progressGroupTotal: number
  progressStep: number
  progressStepTotal: number
  content: ReactNode
}

interface FullPageNavigatorProps {
  slides: FullPageSlide[]
  menuItems: TdfMenuItem[]
}

const TRANSITION_DELAY = 850

export default function FullPageNavigator({
  slides,
  menuItems,
}: FullPageNavigatorProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const isMoving = useRef(false)

  const moveTo = useCallback(
    (nextIndex: number) => {
      if (isMoving.current) return

      const safeIndex = Math.min(Math.max(nextIndex, 0), slides.length - 1)
      if (safeIndex === activeIndex) return

      isMoving.current = true
      setActiveIndex(safeIndex)

      window.setTimeout(() => {
        isMoving.current = false
      }, TRANSITION_DELAY)
    },
    [activeIndex, slides.length],
  )

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 10) return
      event.preventDefault()
      moveTo(activeIndex + (event.deltaY > 0 ? 1 : -1))
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        moveTo(activeIndex + 1)
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        moveTo(activeIndex - 1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, moveTo])

  const showNavigation = activeIndex > 0
  const activeSlide = slides[activeIndex]
  const activeMenuIndex = activeSlide?.menuIndex ?? 0

  const moveToMenu = (menuIndex: number) => {
    const targetIndex = slides.findIndex(
      (slide, index) => index > 0 && slide.menuIndex === menuIndex,
    )

    if (targetIndex >= 0) moveTo(targetIndex)
  }

  return (
    <main className="fullpage" aria-label="삼성 TDF 소개">
      {showNavigation && (
        <TdfSidebar
          items={menuItems}
          activeIndex={activeMenuIndex}
          onSelect={moveToMenu}
        />
      )}

      <div className="fullpage__track">
        {slides.map((slide, index) => (
          <section
            key={slide.id}
            className={`fullpage__slide${index > 0 ? ' fullpage__slide--with-sidebar' : ''}${index === activeIndex ? ' is-active' : ''}`}
            aria-hidden={index !== activeIndex}
          >
            {slide.content}
          </section>
        ))}
      </div>

      {showNavigation && (
        <PageProgress
          group={activeSlide.progressGroup}
          groupTotal={activeSlide.progressGroupTotal}
          step={activeSlide.progressStep}
          stepTotal={activeSlide.progressStepTotal}
        />
      )}
    </main>
  )
}
