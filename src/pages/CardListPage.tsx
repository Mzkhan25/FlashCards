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

export function CardListPage() {
  const { state } = useCards();
  const [search, setSearch] = useState('');

  const filtered = state.cards.filter((card) => {
    const q = search.toLowerCase();
    return card.german.toLowerCase().includes(q) || card.english.toLowerCase().includes(q);
  });

  return (
    <div className="py-6 px-4 md:py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display text-text-primary">
          All Cards <span className="text-text-muted font-body font-normal text-lg">({state.cards.length})</span>
        </h2>
      </div>

      <div className="relative mb-4">
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
        <div className="space-y-2">
          {filtered.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.6) }}
              className={`flex items-center p-4 bg-surface-card rounded-xl border border-border border-l-[3px] ${borderColor(card)} hover:border-primary/30 hover:shadow-sm transition-all`}
            >
              <div className="flex items-center gap-3">
                {card.type === 'word' && genderBadge(card.gender)}
                {card.type === 'verb' && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600">verb</span>
                )}
                <div>
                  <span className="font-medium text-text-primary">{card.german}</span>
                  <span className="text-text-muted mx-2">&mdash;</span>
                  <span className="text-text-secondary">{card.english}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
