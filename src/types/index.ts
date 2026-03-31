export type CardType = 'word' | 'phrase' | 'verb';

export interface CardBase {
  id: string;
  type: CardType;
  german: string;
  english: string;
  tags: string[];
  createdAt: string;
  lastReviewedAt: string | null;
  reviewCount: number;
}

export interface WordCard extends CardBase {
  type: 'word';
  gender?: 'der' | 'die' | 'das';
  plural?: string;
}

export interface PhraseCard extends CardBase {
  type: 'phrase';
  context?: string;
}

export interface Conjugation {
  ich: string;
  du: string;
  er_sie_es: string;
  wir: string;
  ihr: string;
  sie_Sie: string;
}

export interface VerbCard extends CardBase {
  type: 'verb';
  conjugations?: Conjugation;
  perfekt?: Conjugation;
  tense?: string;
  isRegular?: boolean;
}

export type FlashCard = WordCard | PhraseCard | VerbCard;

export interface ReviewData {
  cardId: string;
  lastReviewedAt: string | null;
  reviewCount: number;
  gotItCount: number;
  missedItCount: number;
  ease: number;
}

export interface SessionStats {
  cardsReviewed: number;
  gotIt: number;
  missedIt: number;
  streak: number;
  bestStreak: number;
}

export type Rating = 'got_it' | 'missed_it';

export type CardAction =
  | { type: 'NEXT_CARD' }
  | { type: 'PREV_CARD' }
  | { type: 'FLIP_CARD' }
  | { type: 'SHUFFLE_DECK' }
  | { type: 'RECORD_RESULT'; payload: { cardId: string; rating: Rating } }
  | { type: 'RESET_SESSION' }
  | { type: 'LOAD_CARDS'; payload: FlashCard[] };

export interface AppState {
  cards: FlashCard[];
  currentIndex: number;
  isFlipped: boolean;
  sessionStats: SessionStats;
  reviewData: Record<string, ReviewData>;
}
