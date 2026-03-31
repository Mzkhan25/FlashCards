import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { useCards } from '../hooks/useCards';
import { SessionStatsBar } from '../components/stats/SessionStatsBar';
import { checkAnswer } from '../utils/answerCheck';
import type { FlashCard, VerbCard, Conjugation } from '../types';

type Mode = 'translate' | 'conjugate';
type Filter = 'all' | 'words' | 'verbs' | 'phrases';

const PRONOUNS: { key: keyof Conjugation; label: string }[] = [
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

export function TypeQuizPage() {
  const { state, dispatch } = useCards();
  const { cards } = state;

  const [mode, setMode] = useState<Mode>('translate');
  const [filter, setFilter] = useState<Filter>('all');
  const [currentCard, setCurrentCard] = useState<FlashCard | null>(null);
  const [pronoun, setPronoun] = useState(PRONOUNS[0]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const pool = cards.filter((c) => {
    if (filter === 'words') return c.type === 'word';
    if (filter === 'verbs') return c.type === 'verb';
    if (filter === 'phrases') return c.type === 'phrase';
    return true;
  });

  const verbPool = cards.filter((c): c is VerbCard => c.type === 'verb' && !!c.conjugations);

  const pickNew = useCallback(() => {
    if (mode === 'conjugate') {
      if (verbPool.length === 0) return;
      setCurrentCard(pickRandom(verbPool));
      setPronoun(pickRandom(PRONOUNS));
    } else {
      if (pool.length === 0) return;
      setCurrentCard(pickRandom(pool));
    }
    setInput('');
    setResult(null);
    setCorrectAnswer('');
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [mode, pool.length, verbPool.length]);

  useEffect(() => {
    pickNew();
  }, [mode, filter]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentCard || !input.trim()) return;

    let answer: string;
    if (mode === 'conjugate' && currentCard.type === 'verb' && currentCard.conjugations) {
      answer = currentCard.conjugations[pronoun.key];
    } else {
      answer = currentCard.english;
    }

    const isCorrect = checkAnswer(input, answer);
    setResult(isCorrect ? 'correct' : 'incorrect');
    setCorrectAnswer(answer);

    dispatch({
      type: 'RECORD_RESULT',
      payload: { cardId: currentCard.id, rating: isCorrect ? 'got_it' : 'missed_it' },
    });
  }

  if (pool.length === 0 && mode === 'translate') {
    return <div className="text-center py-20 text-text-muted">No cards available.</div>;
  }

  return (
    <div className="py-6 px-4 md:py-8 flex flex-col items-center gap-6">
      <h2 className="text-2xl font-display text-text-primary">Type Quiz</h2>
      <SessionStatsBar />

      {/* Mode toggle */}
      <div className="flex gap-1 bg-surface-elevated p-1 rounded-xl">
        <button
          onClick={() => setMode('translate')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            mode === 'translate' ? 'bg-surface-card text-primary shadow-sm' : 'text-text-secondary'
          }`}
        >
          Translate
        </button>
        <button
          onClick={() => setMode('conjugate')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            mode === 'conjugate' ? 'bg-surface-card text-primary shadow-sm' : 'text-text-secondary'
          }`}
        >
          Conjugate
        </button>
      </div>

      {/* Filter (translate mode only) */}
      {mode === 'translate' && (
        <div className="flex gap-1 bg-surface-elevated p-1 rounded-xl">
          {(['all', 'words', 'verbs', 'phrases'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                filter === f ? 'bg-surface-card text-primary shadow-sm' : 'text-text-secondary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {currentCard && (
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-surface-card shadow-[0_2px_24px_-4px_rgba(0,0,0,0.08)] border border-border border-t-[3px] border-t-primary p-8 text-center">
            {mode === 'conjugate' && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600">
                verb
              </span>
            )}
            <p className="text-3xl font-display text-text-primary mt-3">{currentCard.german}</p>

            {mode === 'conjugate' && (
              <p className="text-sm text-text-secondary mt-1">
                {currentCard.english} — <span className="font-bold text-primary">{pronoun.label}</span> form?
              </p>
            )}
            {mode === 'translate' && (
              <p className="text-xs text-text-muted mt-2">Type the English meaning</p>
            )}

            <form onSubmit={handleSubmit} className="mt-6">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={result !== null}
                placeholder={mode === 'conjugate' ? `${pronoun.label} ...` : 'English meaning...'}
                autoComplete="off"
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary text-center text-lg font-medium placeholder:text-text-muted/50 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all disabled:opacity-60"
              />
              {result === null && (
                <button
                  type="submit"
                  className="mt-3 w-full py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-light active:scale-95 transition-all"
                >
                  Check
                </button>
              )}
            </form>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                {result === 'correct' ? (
                  <p className="text-success font-semibold text-lg">Correct!</p>
                ) : (
                  <div>
                    <p className="text-red-500 font-semibold text-lg">Incorrect</p>
                    <p className="text-text-secondary mt-1">
                      Correct answer: <span className="font-bold text-text-primary">{correctAnswer}</span>
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {result !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex justify-center"
            >
              <button
                onClick={pickNew}
                className="px-6 py-2.5 rounded-xl bg-surface-card border border-border text-text-primary hover:bg-surface-elevated active:scale-95 transition-all shadow-sm font-medium text-sm"
              >
                Next &rarr;
              </button>
            </motion.div>
          )}
        </div>
      )}

      <p className="text-xs text-text-muted">
        Enter to check &middot; Type your answer and submit
      </p>
    </div>
  );
}
