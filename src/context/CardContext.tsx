import { createContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppState, CardAction, SessionStats, ReviewData } from '../types';
import { SEED_CARDS } from '../data/seed';
import { shuffle } from '../utils/shuffle';
import { loadReviewData, saveReviewData } from '../utils/localStorage';

const emptySession: SessionStats = {
  cardsReviewed: 0,
  gotIt: 0,
  missedIt: 0,
  streak: 0,
  bestStreak: 0,
};

const initialState: AppState = {
  cards: SEED_CARDS,
  currentIndex: 0,
  isFlipped: false,
  sessionStats: emptySession,
  reviewData: loadReviewData(),
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

    case 'RECORD_RESULT': {
      const { cardId, rating } = action.payload;
      const existing: ReviewData = state.reviewData[cardId] ?? {
        cardId,
        lastReviewedAt: null,
        reviewCount: 0,
        gotItCount: 0,
        missedItCount: 0,
        ease: 2.5,
      };

      const isGotIt = rating === 'got_it';
      const newEase = isGotIt
        ? Math.min(existing.ease * 1.1, 3.0)
        : Math.max(existing.ease * 0.7, 1.0);

      const updatedReview: ReviewData = {
        ...existing,
        lastReviewedAt: new Date().toISOString(),
        reviewCount: existing.reviewCount + 1,
        gotItCount: existing.gotItCount + (isGotIt ? 1 : 0),
        missedItCount: existing.missedItCount + (isGotIt ? 0 : 1),
        ease: Math.round(newEase * 100) / 100,
      };

      const newStreak = isGotIt ? state.sessionStats.streak + 1 : 0;
      const newSession: SessionStats = {
        cardsReviewed: state.sessionStats.cardsReviewed + 1,
        gotIt: state.sessionStats.gotIt + (isGotIt ? 1 : 0),
        missedIt: state.sessionStats.missedIt + (isGotIt ? 0 : 1),
        streak: newStreak,
        bestStreak: Math.max(state.sessionStats.bestStreak, newStreak),
      };

      return {
        ...state,
        reviewData: { ...state.reviewData, [cardId]: updatedReview },
        sessionStats: newSession,
      };
    }

    case 'RESET_SESSION':
      return { ...state, sessionStats: emptySession };

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
    saveReviewData(state.reviewData);
  }, [state.reviewData]);

  return <CardContext.Provider value={{ state, dispatch }}>{children}</CardContext.Provider>;
}
