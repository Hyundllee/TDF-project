import ContentHeader, { type ContentHeaderProps } from './shared/ContentHeader'

const glidePathData = [
  { year: '-35년', ratio: 79, fund: 'TDF 2060', target: '20대' },
  { year: '-30년', ratio: 78, fund: 'TDF 2055', target: '20~30대' },
  { year: '-25년', ratio: 73, fund: 'TDF 2050', target: '30대' },
  { year: '-20년', ratio: 69, fund: 'TDF 2045', target: '30~40대' },
  { year: '-15년', ratio: 64, fund: 'TDF 2040', target: '40대' },
  { year: '-10년', ratio: 59, fund: 'TDF 2035', target: '40~50대' },
  { year: '-5년', ratio: 52, fund: 'TDF 2030', target: '50대 이상' },
  { year: '은퇴', ratio: 35, fund: 'TDF 2025', target: '은퇴 이후' },
  { year: '+5년', ratio: 32, fund: 'TDF 2020', target: '은퇴 이후' },
  { year: '+10년', ratio: 30, fund: 'TDF 2015', target: '은퇴 이후' },
]

export default function GlidePathSlide({ eyebrow, title }: ContentHeaderProps) {
  return (
    <div className="content-slide content-slide--glide-path">
      <ContentHeader eyebrow={eyebrow} title={title} />
      <h3>글로벌 액티브/EMP TDF 글라이드 패스 개요<sup>*</sup></h3>
      <div className="ratio-chart" aria-label="생애주기별 주식 비중">
        <div className="ratio-chart__label">
          <span>은퇴까지<sup>**</sup></span>
          <strong>주식 비중<br />(%)</strong>
          <span>펀드명</span>
          <span>대상고객<sup>***</sup></span>
        </div>
        <div className="ratio-chart__bars">
          {glidePathData.map((item, index) => (
            <div key={item.fund}>
              <small>{item.year}</small>
              <div className="ratio-chart__bar-cell">
                <i
                  style={{
                    height: `${item.ratio}%`,
                    animationDelay: `${index * 45}ms`,
                  }}
                >
                  <b>{item.ratio}%</b>
                </i>
              </div>
              <span>{item.fund}</span>
              <span>{item.target}</span>
            </div>
          ))}
        </div>
      </div>
      <ul className="ratio-chart__notes">
        <li><sup>*</sup> 글라이드 패스 관련 내용은 참고자료이며 필요 시 수시로 조정될 수 있습니다.</li>
        <li><sup>**</sup> 2026년 기준</li>
        <li><sup>***</sup> 55~60세 은퇴 기준</li>
      </ul>
    </div>
  )
}
