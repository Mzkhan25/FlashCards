import { useEffect } from 'react';
import { useCards } from '../../hooks/useCards';
import { FlashCard } from './FlashCard';
import { FlashCardProgress } from './FlashCardProgress';

export function FlashCardDeck() {
  const { state, dispatch } = useCards();
  const { cards, currentIndex, isFlipped } = state;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          dispatch({ type: 'FLIP_CARD' });
          break;
        case 'ArrowRight':
          dispatch({ type: 'NEXT_CARD' });
          break;
        case 'ArrowLeft':
          dispatch({ type: 'PREV_CARD' });
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  if (cards.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500">No cards yet</p>
        <p className="text-gray-400 mt-2">Add some words to get started!</p>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="flex flex-col items-center gap-6">
      <FlashCard
        card={currentCard}
        isFlipped={isFlipped}
        onFlip={() => {
          dispatch({ type: 'FLIP_CARD' });
          if (!isFlipped) {
            dispatch({ type: 'MARK_REVIEWED', payload: currentCard.id });
          }
        }}
      />

      <FlashCardProgress current={currentIndex + 1} total={cards.length} />

      <div className="flex gap-3">
        <button
          onClick={() => dispatch({ type: 'PREV_CARD' })}
          className="px-5 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
        >
          &larr; Prev
        </button>
        <button
          onClick={() => dispatch({ type: 'SHUFFLE_DECK' })}
          className="px-5 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
        >
          Shuffle
        </button>
        <button
          onClick={() => dispatch({ type: 'NEXT_CARD' })}
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
