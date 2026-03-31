import { useMemo } from 'react';
import { useCards } from './useCards';

export function useTags(): string[] {
  const { state } = useCards();
  return useMemo(() => {
    const tagSet = new Set<string>();
    for (const card of state.cards) {
      for (const tag of card.tags) tagSet.add(tag);
    }
    return Array.from(tagSet).sort();
  }, [state.cards]);
}
