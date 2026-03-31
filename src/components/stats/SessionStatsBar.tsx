import { useCards } from '../../hooks/useCards';

interface SessionStatsBarProps {
  layout?: 'horizontal' | 'vertical';
}

export function SessionStatsBar({ layout = 'horizontal' }: SessionStatsBarProps) {
  const { state } = useCards();
  const { cardsReviewed, gotIt, streak } = state.sessionStats;

  if (cardsReviewed === 0 && layout === 'horizontal') return null;

  const accuracy = cardsReviewed > 0 ? Math.round((gotIt / cardsReviewed) * 100) : 0;

  if (layout === 'vertical') {
    return (
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-surface-elevated rounded-lg p-3 text-center">
          <div className="font-mono text-lg font-semibold text-primary tabular-nums">{cardsReviewed}</div>
          <div className="text-[11px] text-text-muted mt-0.5">Reviewed</div>
        </div>
        <div className="bg-surface-elevated rounded-lg p-3 text-center">
          <div className={`font-mono text-lg font-semibold tabular-nums ${accuracy >= 70 ? 'text-success' : 'text-amber-600'}`}>{accuracy}%</div>
          <div className="text-[11px] text-text-muted mt-0.5">Accuracy</div>
        </div>
        <div className="bg-surface-elevated rounded-lg p-3 text-center">
          <div className="font-mono text-lg font-semibold text-accent tabular-nums">{streak}</div>
          <div className="text-[11px] text-text-muted mt-0.5">Streak</div>
        </div>
      </div>
    );
  }

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
