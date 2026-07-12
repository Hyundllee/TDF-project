interface PageProgressProps {
  group: number
  groupTotal: number
  step: number
  stepTotal: number
}

export default function PageProgress({
  group,
  groupTotal,
  step,
  stepTotal,
}: PageProgressProps) {
  const stepProgress = stepTotal > 1 ? (step - 1) / (stepTotal - 1) : 0
  const progress =
    groupTotal > 1
      ? ((group - 1 + stepProgress) / (groupTotal - 1)) * 100
      : stepTotal > 1
        ? stepProgress * 100
        : 100

  return (
    <div
      className="page-progress"
      aria-label={`디자인 ${group} / ${groupTotal}, 세부 화면 ${step} / ${stepTotal}`}
    >
      <span
        className="page-progress__number"
        style={{ left: `${progress}%` }}
      >
        {String(group).padStart(2, '0')}
      </span>
      <div className="page-progress__rail">
        <span style={{ width: `${progress}%` }} />
        {Array.from({ length: groupTotal }, (_, index) => {
          const position = groupTotal > 1 ? (index / (groupTotal - 1)) * 100 : 100

          return (
            <i
              key={index}
              className={index + 1 <= group ? 'is-passed' : ''}
              style={{ left: `${position}%` }}
            />
          )
        })}
        <b style={{ left: `${progress}%` }} />
      </div>
    </div>
  )
}
