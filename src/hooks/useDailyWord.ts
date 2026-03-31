import { useMemo } from 'react';
import { useCards } from './useCards';
import type { FlashCard } from '../types';

const DAILY_WORD_KEY = 'de-flashcards-daily-word';

interface DailyWordData {
  cardId: string;
  date: string;
}

export function useDailyWord(): FlashCard | null {
  const { state } = useCards();
  const { cards } = state;

  return useMemo(() => {
    if (cards.length === 0) return null;

    const today = new Date().toISOString().slice(0, 10);

    try {
      const stored = localStorage.getItem(DAILY_WORD_KEY);
      if (stored) {
        const data: DailyWordData = JSON.parse(stored);
        if (data.date === today) {
          const card = cards.find((c) => c.id === data.cardId);
          if (card) return card;
        }
      }
    } catch {
      // ignore
    }

    // Pick a deterministic-ish random card based on date
    const seed = today.split('-').reduce((acc, n) => acc + parseInt(n, 10), 0);
    const card = cards[seed % cards.length];

    try {
      localStorage.setItem(DAILY_WORD_KEY, JSON.stringify({ cardId: card.id, date: today }));
    } catch {
      // ignore
    }

    return card;
  }, [cards]);
}
