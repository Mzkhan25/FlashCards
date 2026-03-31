import { useState, useEffect, useCallback } from 'react';
import { useCards } from '../hooks/useCards';
import type { VerbCard } from '../types';

const PRONOUNS: { key: keyof NonNullable<VerbCard['conjugations']>; label: string }[] = [
  { key: 'ich', label: 'ich' },
  { key: 'du', label: 'du' },
  { key: 'er_sie_es', label: 'er/sie/es' },
  { key: 'wir', label: 'wir' },
  { key: 'ihr', label: 'ihr' },
  { key: 'sie_Sie', label: 'sie/Sie' },
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function ConjugatePage() {
  const { state } = useCards();
  const verbs = state.cards.filter((c): c is VerbCard => c.type === 'verb' && !!c.conjugations);

  const [currentVerb, setCurrentVerb] = useState<VerbCard | null>(null);
  const [currentPronoun, setCurrentPronoun] = useState(PRONOUNS[0]);
  const [revealed, setRevealed] = useState(false);

  const pickNew = useCallback(() => {
    if (verbs.length === 0) return;
    setCurrentVerb(pickRandom(verbs));
    setCurrentPronoun(pickRandom(PRONOUNS));
    setRevealed(false);
  }, [verbs.length]);

  useEffect(() => {
    pickNew();
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === ' ') {
        e.preventDefault();
        if (revealed) {
          pickNew();
        } else {
          setRevealed(true);
        }
      } else if (e.key === 'ArrowRight') {
        pickNew();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [revealed, pickNew]);

  if (verbs.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="animate-float inline-block mb-4">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </div>
        <p className="text-xl text-text-secondary font-display">Keine Verben vorhanden</p>
        <p className="text-text-muted mt-2">Add some verb cards to start conjugation practice.</p>
      </div>
    );
  }

  if (!currentVerb) return null;

  const answer = currentVerb.conjugations![currentPronoun.key];

  return (
    <div className="py-6 px-4 md:py-8 flex flex-col items-center gap-6">
      <h2 className="text-2xl font-display text-text-primary">Conjugation Quiz</h2>

      <div
        className="w-full max-w-md cursor-pointer"
        onClick={() => {
          if (revealed) pickNew();
          else setRevealed(true);
        }}
      >
        <div className="rounded-2xl bg-surface-card shadow-[0_2px_24px_-4px_rgba(0,0,0,0.08)] border border-border border-t-[3px] border-t-amber-500 p-8 text-center">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600">
            verb
          </span>
          <p className="text-3xl font-display text-text-primary mt-4">{currentVerb.german}</p>
          <p className="text-sm text-text-secondary mt-1">{currentVerb.english}</p>

          <div className="mt-6 py-4 border-t border-border">
            <p className="text-lg text-text-secondary">
              <span className="font-bold text-primary">{currentPronoun.label}</span>{' '}
              {revealed ? (
                <span className="font-bold text-primary text-2xl animate-fade-in-up">{answer}</span>
              ) : (
                <span className="text-text-muted/40 text-2xl">???</span>
              )}
            </p>
          </div>

          <p className="text-xs text-text-muted mt-4">
            {revealed ? 'Tap or Space for next' : 'Tap or Space to reveal'}
          </p>
        </div>
      </div>

      <button
        onClick={pickNew}
        className="px-5 py-2.5 rounded-xl bg-surface-card border border-border text-text-primary hover:bg-surface-elevated active:scale-95 transition-all shadow-sm font-medium text-sm"
      >
        Next verb &rarr;
      </button>

      <p className="text-xs text-text-muted">
        Space to reveal/next &middot; Arrow right for next
      </p>
    </div>
  );
}
