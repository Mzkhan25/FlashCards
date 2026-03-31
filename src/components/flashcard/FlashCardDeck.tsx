import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { useCards } from '../../hooks/useCards';
import { FlashCard } from './FlashCard';
import { FlashCardProgress } from './FlashCardProgress';
import { shuffle } from '../../utils/shuffle';
import type { FlashCard as FlashCardType } from '../../types';

type Filter = 'all' | 'words' | 'verbs';

const FILTER_OPTIONS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'words', label: 'Words' },
  { value: 'verbs', label: 'Verbs' },
];

export function FlashCardDeck() {
  const { state, dispatch } = useCards();
  const { cards } = state;
  const [filter, setFilter] = useState<Filter>('all');
  const [localIndex, setLocalIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filteredCards, setFilteredCards] = useState<FlashCardType[]>(() => cards);

  const derived = useMemo(() => {
    switch (filter) {
      case 'words': return cards.filter((c) => c.type === 'word');
      case 'verbs': return cards.filter((c) => c.type === 'verb');
      default: return cards;
    }
  }, [cards, filter]);

  // Sync filtered cards from derived, but only reset index/flip when filter changes
  useEffect(() => {
    setFilteredCards(derived);
  }, [derived]);

  useEffect(() => {
    setLocalIndex(0);
    setIsFlipped(false);
  }, [filter]);

  const filteredCardsRef = useRef(filteredCards);
  filteredCardsRef.current = filteredCards;

  const next = useCallback(() => {
    const len = filteredCardsRef.current.length;
    if (len === 0) return;
    setLocalIndex((i) => (i + 1) % len);
    setIsFlipped(false);
  }, []);

  const prev = useCallback(() => {
    const len = filteredCardsRef.current.length;
    if (len === 0) return;
    setLocalIndex((i) => (i - 1 + len) % len);
    setIsFlipped(false);
  }, []);

  const flip = useCallback(() => {
    setIsFlipped((f) => !f);
  }, []);

  const doShuffle = useCallback(() => {
    setFilteredCards((prev) => shuffle(prev));
    setLocalIndex(0);
    setIsFlipped(false);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          flip();
          break;
        case 'ArrowRight':
          next();
          break;
        case 'ArrowLeft':
          prev();
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [flip, next, prev]);

  if (cards.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="animate-float inline-block mb-4">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
            <rect x="2" y="4" width="16" height="16" rx="2" />
            <rect x="6" y="2" width="16" height="16" rx="2" />
          </svg>
        </div>
        <p className="text-xl text-text-secondary font-display">No cards yet</p>
        <p className="text-text-muted mt-2">Add some words to get started!</p>
      </div>
    );
  }

  const currentCard = filteredCards[localIndex];
  if (!currentCard) return null;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Filter bar */}
      <div className="flex gap-1 bg-surface-elevated p-1 rounded-xl">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className="relative px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
          >
            {filter === opt.value && (
              <motion.span
                layoutId="filter-pill"
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

      <FlashCard
        card={currentCard}
        isFlipped={isFlipped}
        onFlip={() => {
          flip();
          if (!isFlipped) {
            dispatch({ type: 'MARK_REVIEWED', payload: currentCard.id });
          }
        }}
      />

      <FlashCardProgress current={localIndex + 1} total={filteredCards.length} />

      <div className="flex gap-3">
        <button
          onClick={prev}
          className="px-5 py-2.5 rounded-xl bg-surface-card border border-border text-text-primary hover:bg-surface-elevated active:scale-95 transition-all shadow-sm font-medium text-sm"
        >
          &larr; Prev
        </button>
        <button
          onClick={doShuffle}
          className="px-5 py-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent hover:bg-accent/15 active:scale-95 transition-all shadow-sm font-medium text-sm"
        >
          Shuffle
        </button>
        <button
          onClick={next}
          className="px-5 py-2.5 rounded-xl bg-surface-card border border-border text-text-primary hover:bg-surface-elevated active:scale-95 transition-all shadow-sm font-medium text-sm"
        >
          Next &rarr;
        </button>
      </div>

      <p className="text-xs text-text-muted">
        Space to flip &middot; Arrow keys to navigate
      </p>
    </div>
  );
}
