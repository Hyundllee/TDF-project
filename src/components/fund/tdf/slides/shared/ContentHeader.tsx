import { ReactSVG } from 'react-svg'
import { tdfContentImages } from '../../../../../assets/images/fund/tdf'

export interface ContentHeaderProps {
  eyebrow: string
  title: string
}

export default function ContentHeader({
  eyebrow,
  title,
}: ContentHeaderProps) {
  return (
    <header className="content-header">
      <div className="content-header__breadcrumb">
        <ReactSVG src={tdfContentImages.icons.home} aria-hidden="true" />
        <span>연금투자</span>
        <i aria-hidden="true">›</i>
        <strong>삼성 TDF</strong>
      </div>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </header>
  )
}
