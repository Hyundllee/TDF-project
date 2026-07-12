export interface TdfMenuItem {
  label: string
}

interface TdfSidebarProps {
  items: TdfMenuItem[]
  activeIndex: number
  onSelect: (index: number) => void
}

export default function TdfSidebar({
  items,
  activeIndex,
  onSelect,
}: TdfSidebarProps) {
  return (
    <aside className="tdf-sidebar" aria-label="TDF 콘텐츠 메뉴">
      <nav>
        <ol className="tdf-sidebar__menu">
          {items.map((item, index) => (
            <li key={item.label}>
              <button
                type="button"
                className={`tdf-sidebar__link${activeIndex === index ? ' is-active' : ''}`}
                aria-current={activeIndex === index ? 'page' : undefined}
                onClick={() => onSelect(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="tdf-sidebar__quick-links" aria-label="빠른 메뉴">
        <button type="button" className="tdf-sidebar__card tdf-sidebar__card--navy">
          <strong>↗</strong>
          삼성 TDF<br />대표 펀드 수익률
        </button>
        <button type="button" className="tdf-sidebar__card tdf-sidebar__card--mint">
          <strong>◎</strong>
          TDF 3종<br />비교해 보기
        </button>
        <button type="button" className="tdf-sidebar__card tdf-sidebar__card--blue">
          <strong>◉</strong>
          나에게 맞는<br />TDF 상품 추천받기
        </button>
      </div>
    </aside>
  )
}
