import { useLayoutEffect } from 'react'
import FullPageNavigator, {
  type FullPageSlide,
} from '../../../components/fund/tdf/FullPageNavigator'
import TdfHero from '../../../components/fund/tdf/TdfHero'
import {
  GlidePathSlide,
  GlobalActiveSlide,
  GlobalEmpSlide,
  KoreaEmpSlide,
  TdfOverviewSlide,
} from '../../../components/fund/tdf/slides'
import '../../../styles/pages/fund/tdf/index.scss'

const menuItems = [
  { label: 'TDF란?' },
  { label: '글로벌 액티브 TDF' },
  { label: '글로벌 EMP TDF' },
  { label: '코리아 EMP TDF' },
  { label: '글로벌 액티브/EMP TDF 글라이드 패스' },
]

const slides: FullPageSlide[] = [
  {
    id: 'hero',
    menuIndex: -1,
    progressGroup: 0,
    progressGroupTotal: 0,
    progressStep: 0,
    progressStepTotal: 0,
    content: <TdfHero />,
  },
  {
    id: 'tdf-intro',
    menuIndex: 0,
    progressGroup: 1,
    progressGroupTotal: 2,
    progressStep: 1,
    progressStepTotal: 3,
    content: (
      <TdfOverviewSlide
        eyebrow="TDF란?"
        title="20대의 투자와 60대의 투자, 같아도 괜찮을까요?"
        variant="people"
      />
    ),
  },
  {
    id: 'tdf-intro-detail',
    menuIndex: 0,
    progressGroup: 1,
    progressGroupTotal: 2,
    progressStep: 2,
    progressStepTotal: 3,
    content: (
      <TdfOverviewSlide
        eyebrow="TDF란?"
        title="20대의 투자와 60대의 투자, 같아도 괜찮을까요?"
        variant="allocation"
      />
    ),
  },
  {
    id: 'tdf-intro-solution',
    menuIndex: 0,
    progressGroup: 1,
    progressGroupTotal: 2,
    progressStep: 3,
    progressStepTotal: 3,
    content: (
      <TdfOverviewSlide
        eyebrow="TDF란?"
        title="20대의 투자와 60대의 투자, 같아도 괜찮을까요?"
        variant="definition"
      />
    ),
  },
  {
    id: 'tdf-features',
    menuIndex: 0,
    progressGroup: 2,
    progressGroupTotal: 2,
    progressStep: 1,
    progressStepTotal: 1,
    content: (
      <TdfOverviewSlide
        eyebrow="TDF란?"
        title="20대의 투자와 60대의 투자, 같아도 괜찮을까요?"
        variant="features"
      />
    ),
  },
  {
    id: 'global-active',
    menuIndex: 1,
    progressGroup: 1,
    progressGroupTotal: 3,
    progressStep: 1,
    progressStepTotal: 1,
    content: (
      <GlobalActiveSlide
        eyebrow="글로벌 액티브 TDF"
        title="오랜 경험으로 든든하게, 세계에 나눠 담는 내 자산"
        variant="history"
      />
    ),
  },
  {
    id: 'global-active-glide-before',
    menuIndex: 1,
    progressGroup: 2,
    progressGroupTotal: 3,
    progressStep: 1,
    progressStepTotal: 2,
    content: (
      <GlobalActiveSlide
        eyebrow="글로벌 액티브 TDF"
        title="오랜 경험으로 든든하게, 세계에 나눠 담는 내 자산"
        variant="glide-before"
      />
    ),
  },
  {
    id: 'global-active-glide-after',
    menuIndex: 1,
    progressGroup: 2,
    progressGroupTotal: 3,
    progressStep: 2,
    progressStepTotal: 2,
    content: (
      <GlobalActiveSlide
        eyebrow="글로벌 액티브 TDF"
        title="오랜 경험으로 든든하게, 세계에 나눠 담는 내 자산"
        variant="glide-after"
      />
    ),
  },
  {
    id: 'global-active-features',
    menuIndex: 1,
    progressGroup: 3,
    progressGroupTotal: 3,
    progressStep: 1,
    progressStepTotal: 1,
    content: (
      <GlobalActiveSlide
        eyebrow="글로벌 액티브 TDF"
        title="오랜 경험으로 든든하게, 세계에 나눠 담는 내 자산"
        variant="features"
      />
    ),
  },
  {
    id: 'global-emp',
    menuIndex: 2,
    progressGroup: 1,
    progressGroupTotal: 2,
    progressStep: 1,
    progressStepTotal: 1,
    content: (
      <GlobalEmpSlide
        eyebrow="글로벌 EMP TDF"
        title="전 세계 분산투자! 글로벌 대표 ETF로 완성!"
        variant="intro"
      />
    ),
  },
  {
    id: 'global-emp-features',
    menuIndex: 2,
    progressGroup: 2,
    progressGroupTotal: 2,
    progressStep: 1,
    progressStepTotal: 1,
    content: (
      <GlobalEmpSlide
        eyebrow="글로벌 EMP TDF"
        title="전 세계 분산투자! 글로벌 대표 ETF로 완성!"
        variant="features"
      />
    ),
  },
  {
    id: 'korea-emp',
    menuIndex: 3,
    progressGroup: 1,
    progressGroupTotal: 2,
    progressStep: 1,
    progressStepTotal: 1,
    content: (
      <KoreaEmpSlide
        eyebrow="코리아 EMP TDF"
        title="국내 자산배분으로 한국인의 생애주기에 최적화된 TDF"
        variant="intro"
      />
    ),
  },
  {
    id: 'korea-emp-features',
    menuIndex: 3,
    progressGroup: 2,
    progressGroupTotal: 2,
    progressStep: 1,
    progressStepTotal: 1,
    content: (
      <KoreaEmpSlide
        eyebrow="코리아 EMP TDF"
        title="국내 자산배분으로 한국인의 생애주기에 최적화된 TDF"
        variant="features"
      />
    ),
  },
  {
    id: 'glide-path',
    menuIndex: 4,
    progressGroup: 1,
    progressGroupTotal: 1,
    progressStep: 1,
    progressStepTotal: 1,
    content: (
      <GlidePathSlide
        eyebrow="글로벌 액티브/EMP TDF 글라이드 패스"
        title="시간이 지나면 내 자산은 어떻게 변할까요?"
      />
    ),
  },
]

export default function TdfPage() {
  useLayoutEffect(() => {
    const pageClassName = 'tdf-fullpage-active'

    document.documentElement.classList.add(pageClassName)
    document.body.classList.add(pageClassName)

    return () => {
      document.documentElement.classList.remove(pageClassName)
      document.body.classList.remove(pageClassName)
    }
  }, [])

  return <FullPageNavigator slides={slides} menuItems={menuItems} />
}
