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
        <p className="text-xl text-gray-500">No verb cards available</p>
      </div>
    );
  }

  if (!currentVerb) return null;

  const answer = currentVerb.conjugations![currentPronoun.key];

  return (
    <div className="py-8 px-4 flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold text-gray-900">Conjugation Quiz</h2>

      <div
        className="w-full max-w-md cursor-pointer"
        onClick={() => {
          if (revealed) pickNew();
          else setRevealed(true);
        }}
      >
        {/* Question card */}
        <div className="rounded-2xl bg-white shadow-lg border border-gray-100 p-8 text-center">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
            verb
          </span>
          <p className="text-3xl font-semibold text-gray-900 mt-4">{currentVerb.german}</p>
          <p className="text-sm text-gray-500 mt-1">{currentVerb.english}</p>

          <div className="mt-6 py-4 border-t border-gray-100">
            <p className="text-lg text-gray-600">
              <span className="font-bold text-indigo-600">{currentPronoun.label}</span>{' '}
              {revealed ? (
                <span className="font-bold text-green-700 text-2xl">{answer}</span>
              ) : (
                <span className="text-gray-300 text-2xl">???</span>
              )}
            </p>
          </div>

          <p className="text-sm text-gray-400 mt-4">
            {revealed ? 'Tap or Space for next' : 'Tap or Space to reveal'}
          </p>
        </div>
      </div>

      <button
        onClick={pickNew}
        className="px-5 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
      >
        Next verb &rarr;
      </button>

      <p className="text-xs text-gray-400">
        Space to reveal/next &middot; Arrow right for next
      </p>
    </div>
  );
}
