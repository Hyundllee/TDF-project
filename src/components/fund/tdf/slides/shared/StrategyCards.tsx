export interface StrategyCardItem {
  title: string
  description: string[]
  icon?: string
  symbol?: string
}

interface StrategyCardsProps {
  items: StrategyCardItem[]
}

export default function StrategyCards({ items }: StrategyCardsProps) {
  return (
    <div className="strategy-grid">
      {items.map((item, index) => (
        <article key={item.title}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          {(item.icon || item.symbol) && (
            <div className="strategy-grid__icon" aria-hidden="true">
              {item.icon ? <img src={item.icon} alt="" /> : item.symbol}
            </div>
          )}
          <h3>{item.title}</h3>
          <ul>
            {item.description.map((description) => (
              <li key={description}>{description}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}
