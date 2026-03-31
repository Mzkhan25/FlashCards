import { useCards } from '../../hooks/useCards';

export function SessionStatsBar() {
  const { state } = useCards();
  const { cardsReviewed, gotIt, streak } = state.sessionStats;

  if (cardsReviewed === 0) return null;

  const accuracy = cardsReviewed > 0 ? Math.round((gotIt / cardsReviewed) * 100) : 0;

  return (
    <div className="flex items-center justify-center gap-4 text-xs font-mono tabular-nums text-text-secondary">
      <span title="Cards reviewed this session">
        <span className="text-text-muted">Reviewed</span>{' '}
        <span className="font-semibold text-text-primary">{cardsReviewed}</span>
      </span>
      <span className="text-border">|</span>
      <span title="Accuracy">
        <span className="text-text-muted">Accuracy</span>{' '}
        <span className={`font-semibold ${accuracy >= 70 ? 'text-success' : 'text-amber-600'}`}>{accuracy}%</span>
      </span>
      <span className="text-border">|</span>
      <span title="Current streak">
        <span className="text-text-muted">Streak</span>{' '}
        <span className="font-semibold text-accent">{streak}</span>
      </span>
    </div>
  );
}
