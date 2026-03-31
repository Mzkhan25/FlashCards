import { useEffect, useState, useMemo } from 'react';
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
  const [filteredCards, setFilteredCards] = useState<FlashCardType[]>([]);

  const derived = useMemo(() => {
    switch (filter) {
      case 'words': return cards.filter((c) => c.type === 'word');
      case 'verbs': return cards.filter((c) => c.type === 'verb');
      default: return cards;
    }
  }, [cards, filter]);

  useEffect(() => {
    setFilteredCards(derived);
    setLocalIndex(0);
    setIsFlipped(false);
  }, [derived]);

  function next() {
    if (filteredCards.length === 0) return;
    setLocalIndex((i) => (i + 1) % filteredCards.length);
    setIsFlipped(false);
  }

  function prev() {
    if (filteredCards.length === 0) return;
    setLocalIndex((i) => (i - 1 + filteredCards.length) % filteredCards.length);
    setIsFlipped(false);
  }

  function flip() {
    setIsFlipped((f) => !f);
  }

  function doShuffle() {
    setFilteredCards(shuffle(filteredCards));
    setLocalIndex(0);
    setIsFlipped(false);
  }

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
  }, [filteredCards.length]);

  if (cards.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500">No cards yet</p>
        <p className="text-gray-400 mt-2">Add some words to get started!</p>
      </div>
    );
  }

  const currentCard = filteredCards[localIndex];
  if (!currentCard) return null;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Filter bar */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === opt.value
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {opt.label}
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
          className="px-5 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
        >
          &larr; Prev
        </button>
        <button
          onClick={doShuffle}
          className="px-5 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
        >
          Shuffle
        </button>
        <button
          onClick={next}
          className="px-5 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
        >
          Next &rarr;
        </button>
      </div>

      <p className="text-xs text-gray-400">
        Space to flip &middot; Arrow keys to navigate
      </p>
    </div>
  );
}
