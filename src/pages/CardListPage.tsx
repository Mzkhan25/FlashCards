import { useState } from 'react';
import { motion } from 'motion/react';
import { useCards } from '../hooks/useCards';
import type { FlashCard } from '../types';

function borderColor(card: FlashCard): string {
  if (card.type === 'word' && card.gender) {
    switch (card.gender) {
      case 'der': return 'border-l-gender-der';
      case 'die': return 'border-l-gender-die';
      case 'das': return 'border-l-gender-das';
    }
  }
  if (card.type === 'verb') return 'border-l-amber-500';
  if (card.type === 'phrase') return 'border-l-sky-500';
  return 'border-l-border';
}

function genderBadge(gender?: string) {
  if (!gender) return null;
  const styles: Record<string, string> = {
    der: 'bg-gender-der-bg text-gender-der',
    die: 'bg-gender-die-bg text-gender-die',
    das: 'bg-gender-das-bg text-gender-das',
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${styles[gender]}`}>
      {gender}
    </span>
  );
}

const PRONOUN_LABELS: { key: string; label: string }[] = [
  { key: 'ich', label: 'ich' },
  { key: 'du', label: 'du' },
  { key: 'er_sie_es', label: 'er/sie/es' },
  { key: 'wir', label: 'wir' },
  { key: 'ihr', label: 'ihr' },
  { key: 'sie_Sie', label: 'sie/Sie' },
];

type Filter = 'all' | 'words' | 'verbs' | 'phrases';

const FILTER_OPTIONS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'words', label: 'Words' },
  { value: 'verbs', label: 'Verbs' },
  { value: 'phrases', label: 'Phrases' },
];

export function CardListPage() {
  const { state } = useCards();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = state.cards.filter((card) => {
    if (filter === 'words' && card.type !== 'word') return false;
    if (filter === 'verbs' && card.type !== 'verb') return false;
    if (filter === 'phrases' && card.type !== 'phrase') return false;
    const q = search.toLowerCase();
    return card.german.toLowerCase().includes(q) || card.english.toLowerCase().includes(q);
  });

  return (
    <div className="py-6 md:py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display text-text-primary">
          All Cards <span className="text-text-muted font-body font-normal text-lg">({filtered.length})</span>
        </h2>
      </div>

      {/* Search + Filter inline row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cards..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface-card text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
          />
        </div>
        <div className="flex gap-1 bg-surface-elevated p-1 rounded-xl self-start shrink-0">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setFilter(opt.value); setExpandedId(null); }}
              className="relative px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
            >
              {filter === opt.value && (
                <motion.span
                  layoutId="card-list-filter-pill"
                  className="absolute inset-0 bg-surface-card rounded-lg shadow-sm"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                />
              )}
              <span className={`relative z-10 ${
                filter === opt.value
                  ? 'text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}>
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-14">
          <div className="animate-float inline-block mb-3">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <p className="text-text-secondary font-display text-lg">Keine Ergebnisse</p>
          <p className="text-text-muted text-sm mt-1">No cards match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {filtered.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.6) }}
              className={`bg-surface-card rounded-xl border border-border border-l-[3px] ${borderColor(card)} hover:border-primary/30 hover:shadow-sm transition-all ${card.type === 'verb' ? 'cursor-pointer' : ''}`}
              onClick={() => {
                if (card.type === 'verb') {
                  setExpandedId(expandedId === card.id ? null : card.id);
                }
              }}
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3 min-w-0">
                  {card.type === 'word' && genderBadge(card.gender)}
                  {card.type === 'verb' && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 shrink-0">verb</span>
                  )}
                  {card.type === 'phrase' && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-600 shrink-0">phrase</span>
                  )}
                  <div className="min-w-0">
                    <span className="font-medium text-text-primary">{card.german}</span>
                    <span className="text-text-muted mx-2">&mdash;</span>
                    <span className="text-text-secondary">{card.english}</span>
                  </div>
                </div>
                {card.type === 'verb' && (
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className={`text-text-muted transition-transform shrink-0 ml-2 ${expandedId === card.id ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </div>
              {card.type === 'verb' && card.conjugations && expandedId === card.id && (
                <div className="px-4 pb-4 pt-0 border-t border-border">
                  <table className="text-sm font-mono w-full max-w-xs mt-3">
                    <tbody>
                      {PRONOUN_LABELS.map(({ key, label }) => (
                        <tr key={key} className="border-b border-border-light last:border-0">
                          <td className="py-1.5 text-right text-text-muted font-medium w-24">{label}</td>
                          <td className="py-1.5 px-4 text-text-primary font-semibold">
                            {card.conjugations![key as keyof typeof card.conjugations]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
