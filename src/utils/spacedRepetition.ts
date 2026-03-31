import type { FlashCard, ReviewData } from '../types';

export function sortByPriority(
  cards: FlashCard[],
  reviewData: Record<string, ReviewData>,
): FlashCard[] {
  return [...cards].sort((a, b) => {
    const ra = reviewData[a.id];
    const rb = reviewData[b.id];

    // Never-reviewed cards first
    const aReviewed = ra ? ra.reviewCount > 0 : false;
    const bReviewed = rb ? rb.reviewCount > 0 : false;
    if (!aReviewed && bReviewed) return -1;
    if (aReviewed && !bReviewed) return 1;

    // Both unreviewed — keep original order
    if (!aReviewed && !bReviewed) return 0;

    // Lower ease (harder cards) first
    const aEase = ra?.ease ?? 2.5;
    const bEase = rb?.ease ?? 2.5;
    if (aEase !== bEase) return aEase - bEase;

    // Oldest reviewed first
    const aTime = ra?.lastReviewedAt ? new Date(ra.lastReviewedAt).getTime() : 0;
    const bTime = rb?.lastReviewedAt ? new Date(rb.lastReviewedAt).getTime() : 0;
    return aTime - bTime;
  });
}
