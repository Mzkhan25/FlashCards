import { useContext } from 'react';
import { CardContext } from '../context/CardContext';

export function useCards() {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error('useCards must be used within a CardProvider');
  return ctx;
}
