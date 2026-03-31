import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDailyWord } from '../../hooks/useDailyWord';
import { SpeakerButton } from '../shared/SpeakerButton';

export function DailyWordBanner() {
  const card = useDailyWord();
  const [expanded, setExpanded] = useState(() => {
    const dismissed = sessionStorage.getItem('de-flashcards-daily-dismissed');
    return dismissed !== 'true';
  });

  if (!card) return null;

  function collapse() {
    setExpanded(false);
    sessionStorage.setItem('de-flashcards-daily-dismissed', 'true');
  }

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-accent/10 border border-accent/20 text-accent text-xs font-medium hover:bg-accent/15 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        Word of the Day
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full rounded-2xl bg-accent/10 border border-accent/20 p-5 relative"
      >
        <button
          onClick={collapse}
          className="absolute top-3 right-3 text-text-muted hover:text-text-secondary transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="flex items-center gap-2 text-accent text-xs font-semibold mb-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Wort des Tages
        </div>

        <div className="flex items-center gap-2">
          <span className="text-2xl font-display text-text-primary">{card.german}</span>
          <SpeakerButton text={card.german} size="sm" />
        </div>
        <p className="text-sm text-text-secondary mt-1">{card.english}</p>

        {card.type === 'word' && card.gender && (
          <p className="text-xs text-text-muted mt-2">{card.gender} {card.german}</p>
        )}
        {card.type === 'phrase' && card.context && (
          <p className="text-xs text-text-muted mt-2 italic">{card.context}</p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
