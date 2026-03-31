import { motion } from 'motion/react';

interface FlashCardProgressProps {
  current: number;
  total: number;
}

export function FlashCardProgress({ current, total }: FlashCardProgressProps) {
  const pct = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-2">
      <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
        />
      </div>
      <div className="text-xs text-text-muted font-mono tabular-nums">
        Card <span className="font-semibold text-text-secondary">{current}</span> of{' '}
        <span className="font-semibold text-text-secondary">{total}</span>
      </div>
    </div>
  );
}
