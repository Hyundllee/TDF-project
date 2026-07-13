import iconApple from './icon-apple.svg'
import iconAiStrategy from './icon-ai-strategy.svg'
import iconAllocationSystem from './icon-allocation-system.svg'
import iconBalance from './icon-balance.svg'
import iconCalendarChart from './icon-calendar-chart.svg'
import iconCash from './icon-cash.svg'
import iconCoin from './icon-coin.svg'
import iconGlideAirplane from './icon-glide-airplane.svg'
import iconGrowth from './icon-growth.svg'
import iconHome from './icon-home.svg'
import iconPieChart from './icon-pie-chart.svg'
import iconPine from './icon-pine.svg'
import iconPlant from './icon-plant.svg'
import iconRebalancingScale from './icon-rebalancing-scale.svg'
import iconRocket from './icon-rocket.svg'
import iconSafety from './icon-safety.svg'
import iconTree from './icon-tree.svg'
import iconWonPuzzle from './icon-won-puzzle.svg'
import characterSeniorNeutral from './character-senior-neutral.svg'
import characterSeniorTalking from './character-senior-talking.svg'
import characterYoungNeutral from './character-young-neutral.svg'
import characterYoungTalking from './character-young-talking.svg'
import glidePathArea from './glide-path-area.png'
import portraitJohnBogle from './portrait-john-bogle.svg'
import portraitWarrenBuffett from './portrait-warren-buffett.svg'
import sliderPoint from './slider-point.svg'
import tdf20 from './tdf-20.svg'
import tdf30 from './tdf-30.svg'
import tdf40 from './tdf-40.svg'
import tdf50 from './tdf-50.svg'
import tdf60 from './tdf-60.svg'
import timelineArrow from './timeline-arrow.svg'
import timelineDotBlue from './timeline-dot-blue.svg'
import timelineDotMagenta from './timeline-dot-magenta.svg'

export const tdfHeroImages: Record<string, string> = {
  '20': tdf20,
  '30': tdf30,
  '40': tdf40,
  '50': tdf50,
  '60': tdf60,
}

export const tdfHeroIcons = {
  apple: iconApple,
  balance: iconBalance,
  cash: iconCash,
  growth: iconGrowth,
  pine: iconPine,
  plant: iconPlant,
  rocket: iconRocket,
  safety: iconSafety,
  tree: iconTree,
}

export const tdfContentImages = {
  characters: {
    seniorNeutral: characterSeniorNeutral,
    seniorTalking: characterSeniorTalking,
    youngNeutral: characterYoungNeutral,
    youngTalking: characterYoungTalking,
  },
  glidePathArea,
  portraits: {
    johnBogle: portraitJohnBogle,
    warrenBuffett: portraitWarrenBuffett,
  },
  timeline: {
    arrow: timelineArrow,
    blueDot: timelineDotBlue,
    magentaDot: timelineDotMagenta,
  },
  icons: {
    aiStrategy: iconAiStrategy,
    allocationSystem: iconAllocationSystem,
    calendarChart: iconCalendarChart,
    coin: iconCoin,
    glideAirplane: iconGlideAirplane,
    home: iconHome,
    pieChart: iconPieChart,
    rebalancingScale: iconRebalancingScale,
    wonPuzzle: iconWonPuzzle,
  },
}

export { sliderPoint }
