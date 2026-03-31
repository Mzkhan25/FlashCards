import { motion } from 'motion/react';
import type { Rating } from '../../types';

interface RatingButtonsProps {
  onRate: (rating: Rating) => void;
}

export function RatingButtons({ onRate }: RatingButtonsProps) {
  return (
    <motion.div
      className="flex gap-3 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <button
        onClick={() => onRate('missed_it')}
        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 hover:bg-red-500/15 active:scale-95 transition-all font-medium text-sm"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        Missed it
      </button>
      <button
        onClick={() => onRate('got_it')}
        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/15 active:scale-95 transition-all font-medium text-sm"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Got it
      </button>
    </motion.div>
  );
}
