import type { FlashCard as FlashCardType } from '../../types';

interface FlashCardProps {
  card: FlashCardType;
  isFlipped: boolean;
  onFlip: () => void;
}

function genderColor(gender?: string): string {
  switch (gender) {
    case 'der': return 'text-blue-600';
    case 'die': return 'text-pink-600';
    case 'das': return 'text-green-600';
    default: return 'text-gray-400';
  }
}

export function FlashCard({ card, isFlipped, onFlip }: FlashCardProps) {
  const gender = card.type === 'word' ? card.gender : undefined;

  return (
    <div className="card-container w-full max-w-md mx-auto h-64 cursor-pointer" onClick={onFlip}>
      <div className={`card-inner relative w-full h-full ${isFlipped ? 'flipped' : ''}`}>
        {/* Front - German word */}
        <div className="card-front flex flex-col items-center justify-center rounded-2xl bg-white shadow-lg border border-gray-100 p-8">
          {gender && (
            <span className={`text-sm font-medium mb-2 ${genderColor(gender)}`}>
              {gender}
            </span>
          )}
          <span className="text-3xl font-semibold text-gray-900">{card.german}</span>
          <span className="text-sm text-gray-400 mt-4">Tap to reveal</span>
        </div>

        {/* Back - English meaning */}
        <div className="card-back flex flex-col items-center justify-center rounded-2xl bg-indigo-50 shadow-lg border border-indigo-100 p-8">
          <span className="text-3xl font-semibold text-indigo-900">{card.english}</span>
          {gender && (
            <span className={`text-sm font-medium mt-3 ${genderColor(gender)}`}>
              {gender} {card.german}
            </span>
          )}
          {card.type === 'word' && card.plural && (
            <span className="text-sm text-gray-500 mt-1">Plural: {card.plural}</span>
          )}
        </div>
      </div>
    </div>
  );
}
