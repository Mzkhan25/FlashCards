import type { FlashCard as FlashCardType } from '../../types';

interface FlashCardProps {
  card: FlashCardType;
  isFlipped: boolean;
  onFlip: () => void;
}

function genderColor(gender?: string): string {
  switch (gender) {
    case 'der': return 'text-gender-der';
    case 'die': return 'text-gender-die';
    case 'das': return 'text-gender-das';
    default: return 'text-text-muted';
  }
}

function genderBgColor(gender?: string): string {
  switch (gender) {
    case 'der': return 'bg-gender-der-bg text-gender-der';
    case 'die': return 'bg-gender-die-bg text-gender-die';
    case 'das': return 'bg-gender-das-bg text-gender-das';
    default: return 'bg-surface-elevated text-text-muted';
  }
}

function accentBorder(card: FlashCardType): string {
  if (card.type === 'word' && card.gender) {
    switch (card.gender) {
      case 'der': return 'border-t-[3px] border-t-gender-der';
      case 'die': return 'border-t-[3px] border-t-gender-die';
      case 'das': return 'border-t-[3px] border-t-gender-das';
    }
  }
  if (card.type === 'verb') return 'border-t-[3px] border-t-amber-500';
  return 'border-t-[3px] border-t-border';
}

const PRONOUN_LABELS: { key: string; label: string }[] = [
  { key: 'ich', label: 'ich' },
  { key: 'du', label: 'du' },
  { key: 'er_sie_es', label: 'er/sie/es' },
  { key: 'wir', label: 'wir' },
  { key: 'ihr', label: 'ihr' },
  { key: 'sie_Sie', label: 'sie/Sie' },
];

function WordBack({ card }: { card: FlashCardType }) {
  if (card.type !== 'word') return null;
  return (
    <>
      <span className="text-3xl font-display text-text-primary">{card.english}</span>
      {card.gender && (
        <span className={`text-sm font-medium mt-3 px-3 py-1 rounded-full ${genderBgColor(card.gender)}`}>
          {card.gender} {card.german}
        </span>
      )}
      {card.plural && (
        <span className="text-sm text-text-secondary mt-1">Plural: {card.plural}</span>
      )}
    </>
  );
}

function VerbBack({ card }: { card: FlashCardType }) {
  if (card.type !== 'verb' || !card.conjugations) return null;
  const conj = card.conjugations;
  return (
    <>
      <div className="text-center mb-3">
        <span className="text-lg font-display text-text-primary">{card.german}</span>
        <span className="text-sm text-primary ml-2">— {card.english}</span>
      </div>
      <table className="text-sm w-full max-w-xs font-mono">
        <tbody>
          {PRONOUN_LABELS.map(({ key, label }) => (
            <tr key={key} className="border-b border-border-light last:border-0">
              <td className="py-1.5 text-right text-text-muted font-medium w-20">{label}</td>
              <td className="py-1.5 px-4 text-text-primary font-semibold">
                {conj[key as keyof typeof conj]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function FlashCard({ card, isFlipped, onFlip }: FlashCardProps) {
  const gender = card.type === 'word' ? card.gender : undefined;
  const isVerb = card.type === 'verb';

  return (
    <div
      className="card-container w-full max-w-md mx-auto cursor-pointer h-80"
      onClick={onFlip}
    >
      <div className={`card-inner relative w-full h-full ${isFlipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className={`card-front flex flex-col items-center justify-center rounded-2xl bg-surface-card shadow-[0_2px_24px_-4px_rgba(0,0,0,0.08)] border border-border p-8 ${accentBorder(card)}`}>
          {gender && (
            <span className={`text-xs font-semibold mb-2 px-2.5 py-0.5 rounded-full ${genderBgColor(gender)}`}>
              {gender}
            </span>
          )}
          {isVerb && (
            <span className="text-xs font-semibold mb-2 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600">verb</span>
          )}
          <span className="text-3xl font-display text-text-primary">{card.german}</span>
          <span className="text-xs text-text-muted mt-6 opacity-60">Tap to reveal</span>
        </div>

        {/* Back */}
        <div className={`card-back flex flex-col items-center justify-center rounded-2xl bg-surface-elevated shadow-[0_2px_24px_-4px_rgba(0,0,0,0.08)] border border-border p-6 ${accentBorder(card)}`}>
          {card.type === 'word' && <WordBack card={card} />}
          {card.type === 'verb' && <VerbBack card={card} />}
        </div>
      </div>
    </div>
  );
}
