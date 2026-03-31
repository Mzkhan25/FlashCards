import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { useCards } from '../../hooks/useCards';
import { useTags } from '../../hooks/useTags';
import { FlashCard } from './FlashCard';
import { FlashCardProgress } from './FlashCardProgress';
import { RatingButtons } from './RatingButtons';
import { SessionStatsBar } from '../stats/SessionStatsBar';
import { TagFilter } from '../shared/TagFilter';
import { shuffle } from '../../utils/shuffle';
import { sortByPriority } from '../../utils/spacedRepetition';
import type { FlashCard as FlashCardType, Rating } from '../../types';

type Filter = 'all' | 'words' | 'verbs' | 'phrases';

const FILTER_OPTIONS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'words', label: 'Words' },
  { value: 'verbs', label: 'Verbs' },
  { value: 'phrases', label: 'Phrases' },
];

export function FlashCardDeck() {
  const { state, dispatch } = useCards();
  const { cards } = state;
  const [filter, setFilter] = useState<Filter>('all');
  const [localIndex, setLocalIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [orderedIds, setOrderedIds] = useState<string[]>(() => cards.map((c) => c.id));
  const [smartOrder, setSmartOrder] = useState(false);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const allTags = useTags();

  const cardMap = useMemo(() => {
    const map = new Map<string, FlashCardType>();
    for (const c of cards) map.set(c.id, c);
    return map;
  }, [cards]);

  const filteredIds = useMemo(() => {
    const matches = new Set(
      cards
        .filter((c) => {
          if (filter === 'words' && c.type !== 'word') return false;
          if (filter === 'verbs' && c.type !== 'verb') return false;
          if (filter === 'phrases' && c.type !== 'phrase') return false;
          if (activeTags.length > 0 && !activeTags.some((t) => c.tags.includes(t))) return false;
          return true;
        })
        .map((c) => c.id),
    );
    return orderedIds.filter((id) => matches.has(id));
  }, [cards, filter, orderedIds, activeTags]);

  useEffect(() => {
    setOrderedIds(cards.map((c) => c.id));
    setLocalIndex(0);
    setIsFlipped(false);
  }, [filter]);

  const filteredIdsRef = useRef(filteredIds);
  filteredIdsRef.current = filteredIds;

  const next = useCallback(() => {
    const len = filteredIdsRef.current.length;
    if (len === 0) return;
    setLocalIndex((i) => (i + 1) % len);
    setIsFlipped(false);
  }, []);

  const prev = useCallback(() => {
    const len = filteredIdsRef.current.length;
    if (len === 0) return;
    setLocalIndex((i) => (i - 1 + len) % len);
    setIsFlipped(false);
  }, []);

  const flip = useCallback(() => {
    setIsFlipped((f) => !f);
  }, []);

  const doShuffle = useCallback(() => {
    setOrderedIds((prev) => shuffle(prev));
    setLocalIndex(0);
    setIsFlipped(false);
    setSmartOrder(false);
  }, []);

  const doSmartOrder = useCallback(() => {
    const sorted = sortByPriority(cards, state.reviewData);
    setOrderedIds(sorted.map((c) => c.id));
    setLocalIndex(0);
    setIsFlipped(false);
    setSmartOrder(true);
  }, [cards, state.reviewData]);

  const handleRate = useCallback((rating: Rating) => {
    const id = filteredIdsRef.current[localIndex];
    if (!id) return;
    dispatch({ type: 'RECORD_RESULT', payload: { cardId: id, rating } });
    // Auto-advance after a brief moment
    setTimeout(() => {
      setLocalIndex((i) => {
        const len = filteredIdsRef.current.length;
        return len > 0 ? (i + 1) % len : 0;
      });
      setIsFlipped(false);
    }, 300);
  }, [dispatch, localIndex]);

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

  const currentId = filteredIds[localIndex];
  const currentCard = currentId ? cardMap.get(currentId) : undefined;
  if (!currentCard) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">
      {/* Main card area */}
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

        {/* Tags on mobile only */}
        <div className="lg:hidden">
          <TagFilter
            tags={allTags}
            activeTags={activeTags}
            onToggle={(tag) => {
              setActiveTags((prev) =>
                prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
              );
              setLocalIndex(0);
              setIsFlipped(false);
            }}
            onClear={() => {
              setActiveTags([]);
              setLocalIndex(0);
              setIsFlipped(false);
            }}
          />
        </div>

        <FlashCard
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={flip}
        />

        {isFlipped && <RatingButtons onRate={handleRate} />}

        <FlashCardProgress current={localIndex + 1} total={filteredIds.length} />

        <div className="flex gap-3">
          <button
            onClick={prev}
            className="px-5 py-2.5 rounded-xl bg-surface-card border border-border text-text-primary hover:bg-surface-elevated active:scale-95 transition-all shadow-sm font-medium text-sm"
          >
            &larr; Prev
          </button>
          <button
            onClick={smartOrder ? doShuffle : doSmartOrder}
            className={`px-5 py-2.5 rounded-xl border active:scale-95 transition-all shadow-sm font-medium text-sm ${
              smartOrder
                ? 'bg-primary/10 border-primary/20 text-primary hover:bg-primary/15'
                : 'bg-accent/10 border-accent/20 text-accent hover:bg-accent/15'
            }`}
          >
            {smartOrder ? 'Shuffle' : 'Smart Order'}
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

      {/* Sidebar — desktop only */}
      <aside className="hidden lg:flex flex-col gap-4">
        <div className="bg-surface-card border border-border rounded-xl p-5">
          <h3 className="font-display text-sm text-text-primary mb-3">Session</h3>
          <SessionStatsBar layout="vertical" />
        </div>

        <div className="bg-surface-card border border-border rounded-xl p-5">
          <h3 className="font-display text-sm text-text-primary mb-3">Tags</h3>
          <TagFilter
            tags={allTags}
            activeTags={activeTags}
            onToggle={(tag) => {
              setActiveTags((prev) =>
                prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
              );
              setLocalIndex(0);
              setIsFlipped(false);
            }}
            onClear={() => {
              setActiveTags([]);
              setLocalIndex(0);
              setIsFlipped(false);
            }}
          />
        </div>

        <div className="bg-surface-card border border-border rounded-xl p-5">
          <h3 className="font-display text-sm text-text-primary mb-3">Keyboard</h3>
          <div className="space-y-2 text-xs text-text-secondary">
            <div className="flex items-center gap-2">
              <kbd className="font-mono text-[11px] bg-surface-elevated px-1.5 py-0.5 rounded border border-border">Space</kbd>
              <span>Flip card</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="font-mono text-[11px] bg-surface-elevated px-1.5 py-0.5 rounded border border-border">&larr; &rarr;</kbd>
              <span>Navigate</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Session stats on mobile */}
      <div className="lg:hidden flex justify-center -mt-4">
        <SessionStatsBar />
      </div>
    </div>
  );
}
