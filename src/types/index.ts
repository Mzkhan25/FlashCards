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

export interface VerbCard extends CardBase {
  type: 'verb';
  conjugations?: {
    ich: string;
    du: string;
    er_sie_es: string;
    wir: string;
    ihr: string;
    sie_Sie: string;
  };
  tense?: string;
  isRegular?: boolean;
}

export type FlashCard = WordCard | PhraseCard | VerbCard;

export type CardAction =
  | { type: 'NEXT_CARD' }
  | { type: 'PREV_CARD' }
  | { type: 'FLIP_CARD' }
  | { type: 'SHUFFLE_DECK' }
  | { type: 'MARK_REVIEWED'; payload: string }
  | { type: 'LOAD_CARDS'; payload: FlashCard[] };

export interface AppState {
  cards: FlashCard[];
  currentIndex: number;
  isFlipped: boolean;
}
