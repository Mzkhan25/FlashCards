import { createContext, useReducer, type ReactNode } from 'react';
import type { AppState, CardAction } from '../types';
import { SEED_CARDS } from '../data/seed';
import { shuffle } from '../utils/shuffle';

const initialState: AppState = {
  cards: SEED_CARDS,
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
  return <CardContext.Provider value={{ state, dispatch }}>{children}</CardContext.Provider>;
}
