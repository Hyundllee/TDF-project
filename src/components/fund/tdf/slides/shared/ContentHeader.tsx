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
      <div className="content-header__breadcrumb">⌂ &gt; 연금투자 &gt; 삼성 TDF</div>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </header>
  )
}
