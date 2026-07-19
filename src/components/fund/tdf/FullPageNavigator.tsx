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
const COMPACT_HEIGHT_QUERY = '(max-height: 820px)'
const SCROLL_EDGE_THRESHOLD = 2

function canScrollInDirection(element: HTMLElement, direction: 1 | -1) {
  const maxScrollTop = element.scrollHeight - element.clientHeight

  if (maxScrollTop <= SCROLL_EDGE_THRESHOLD) return false

  return direction > 0
    ? element.scrollTop < maxScrollTop - SCROLL_EDGE_THRESHOLD
    : element.scrollTop > SCROLL_EDGE_THRESHOLD
}

function scrollWithin(
  element: HTMLElement,
  direction: 1 | -1,
  distance: number,
  behavior: ScrollBehavior = 'auto',
) {
  if (!canScrollInDirection(element, direction)) return false

  const maxScrollTop = element.scrollHeight - element.clientHeight
  const nextScrollTop = Math.min(
    Math.max(element.scrollTop + distance * direction, 0),
    maxScrollTop,
  )

  element.scrollTo({ top: nextScrollTop, behavior })
  return true
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false

  return (
    target.matches('input, textarea, select') ||
    target.isContentEditable
  )
}

export default function FullPageNavigator({
  slides,
  menuItems,
}: FullPageNavigatorProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const isMoving = useRef(false)
  const slideRefs = useRef<Array<HTMLElement | null>>([])

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
    const animationFrame = window.requestAnimationFrame(() => {
      const activeSlide = slideRefs.current[activeIndex]
      if (!activeSlide) return

      activeSlide.scrollTop = 0
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [activeIndex])

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 10) return

      const direction = event.deltaY > 0 ? 1 : -1
      event.preventDefault()

      if (window.matchMedia(COMPACT_HEIGHT_QUERY).matches) {
        const sidebar =
          event.target instanceof Element
            ? event.target.closest<HTMLElement>('.tdf-sidebar')
            : null

        if (
          sidebar &&
          scrollWithin(sidebar, direction, Math.abs(event.deltaY))
        ) {
          return
        }

        const activeSlide = slideRefs.current[activeIndex]
        if (
          activeSlide &&
          scrollWithin(activeSlide, direction, Math.abs(event.deltaY))
        ) {
          return
        }
      }

      moveTo(activeIndex + direction)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return

      const direction =
        event.key === 'ArrowRight' || event.key === 'ArrowDown'
          ? 1
          : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
            ? -1
            : 0

      if (!direction) return

      event.preventDefault()

      if (window.matchMedia(COMPACT_HEIGHT_QUERY).matches) {
        const activeSlide = slideRefs.current[activeIndex]
        const scrollDistance = activeSlide
          ? Math.max(activeSlide.clientHeight * 0.72, 1)
          : 1

        if (
          activeSlide &&
          scrollWithin(activeSlide, direction, scrollDistance, 'smooth')
        ) {
          return
        }
      }

      moveTo(activeIndex + direction)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, moveTo])

  const activeSlide = slides[activeIndex]
  const showNavigation = (activeSlide?.menuIndex ?? -1) >= 0
  const activeMenuIndex = activeSlide?.menuIndex ?? 0

  useEffect(() => {
    const contentClassName = 'tdf-slides-content'

    document.body.classList.toggle(contentClassName, showNavigation)

    return () => {
      document.body.classList.remove(contentClassName)
    }
  }, [showNavigation])

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
            ref={(element) => {
              slideRefs.current[index] = element
            }}
            className={`fullpage__slide${slide.menuIndex >= 0 ? ' fullpage__slide--with-sidebar' : ''}${index === activeIndex ? ' is-active' : ''}`}
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
