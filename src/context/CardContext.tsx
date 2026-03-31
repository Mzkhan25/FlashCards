import { createContext, useReducer, useEffect, type ReactNode } from 'react';
import type { FlashCard, AppState, CardAction } from '../types';
import { SEED_CARDS } from '../data/seed';
import { shuffle } from '../utils/shuffle';

const STORAGE_KEY = 'flashcards_v1';

function loadCards(): FlashCard[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as FlashCard[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fall through to seed
  }
  return SEED_CARDS;
}

const initialState: AppState = {
  cards: loadCards(),
  currentIndex: 0,
  isFlipped: false,
};

function cardReducer(state: AppState, action: CardAction): AppState {
  switch (action.type) {
    case 'NEXT_CARD':
      return {
        ...state,
        currentIndex: (state.currentIndex + 1) % state.cards.length,
        isFlipped: false,
      };

    case 'PREV_CARD':
      return {
        ...state,
        currentIndex: (state.currentIndex - 1 + state.cards.length) % state.cards.length,
        isFlipped: false,
      };

    case 'FLIP_CARD':
      return { ...state, isFlipped: !state.isFlipped };

    case 'SHUFFLE_DECK':
      return { ...state, cards: shuffle(state.cards), currentIndex: 0, isFlipped: false };

    case 'MARK_REVIEWED':
      return {
        ...state,
        cards: state.cards.map((c) =>
          c.id === action.payload
            ? { ...c, reviewCount: c.reviewCount + 1, lastReviewedAt: new Date().toISOString() }
            : c,
        ),
      };

    case 'LOAD_CARDS':
      return { ...state, cards: action.payload, currentIndex: 0, isFlipped: false };

    default:
      return state;
  }
}

interface CardContextValue {
  state: AppState;
  dispatch: React.Dispatch<CardAction>;
}

export const CardContext = createContext<CardContextValue | null>(null);

export function CardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cardReducer, initialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cards));
    } catch {
      // ignore
    }
  }, [state.cards]);

  return <CardContext.Provider value={{ state, dispatch }}>{children}</CardContext.Provider>;
}
