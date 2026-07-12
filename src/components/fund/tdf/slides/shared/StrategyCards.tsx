interface StrategyCardsProps {
  items: string[]
}

export default function StrategyCards({ items }: StrategyCardsProps) {
  return (
    <div className="strategy-grid">
      {items.map((item, index) => (
        <article key={item}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <h3>{item}</h3>
          <p>장기 투자를 위한 체계적인 운용 전략을 제공합니다.</p>
        </article>
      ))}
    </div>
  )
}
