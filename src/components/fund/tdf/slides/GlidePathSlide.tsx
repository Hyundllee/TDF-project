import ContentHeader, { type ContentHeaderProps } from './shared/ContentHeader'

const ratios = [79, 78, 73, 69, 64, 59, 52, 35, 32, 30]

export default function GlidePathSlide({
  eyebrow,
  title,
}: ContentHeaderProps) {
  return (
    <div className="content-slide content-slide--glide-path">
      <ContentHeader eyebrow={eyebrow} title={title} />
      <div className="ratio-chart" aria-label="생애주기별 주식 비중">
        {ratios.map((ratio, index) => (
          <div key={ratio}>
            <span style={{ height: `${ratio}%` }}>{ratio}%</span>
            <small>TDF {2060 - index * 5}</small>
          </div>
        ))}
      </div>
    </div>
  )
}
