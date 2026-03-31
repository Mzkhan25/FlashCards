import type { ReviewData } from '../types';

const REVIEW_DATA_KEY = 'de-flashcards-review-data';

export function loadReviewData(): Record<string, ReviewData> {
  try {
    const stored = localStorage.getItem(REVIEW_DATA_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (typeof parsed === 'object' && parsed !== null) return parsed;
    }
  } catch {
    // ignore
  }
  return {};
}

export function saveReviewData(data: Record<string, ReviewData>): void {
  try {
    localStorage.setItem(REVIEW_DATA_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}
