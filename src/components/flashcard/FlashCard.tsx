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
      <span className="text-3xl font-semibold text-indigo-900">{card.english}</span>
      {card.gender && (
        <span className={`text-sm font-medium mt-3 ${genderColor(card.gender)}`}>
          {card.gender} {card.german}
        </span>
      )}
      {card.plural && (
        <span className="text-sm text-gray-500 mt-1">Plural: {card.plural}</span>
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
        <span className="text-lg font-semibold text-indigo-900">{card.german}</span>
        <span className="text-sm text-indigo-600 ml-2">— {card.english}</span>
      </div>
      <table className="text-sm w-full max-w-xs">
        <tbody>
          {PRONOUN_LABELS.map(({ key, label }) => (
            <tr key={key} className="border-b border-indigo-100 last:border-0">
              <td className="py-1 pr-4 text-right text-gray-500 font-medium w-20">{label}</td>
              <td className="py-1 text-indigo-900 font-semibold">
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
      className={`card-container w-full max-w-md mx-auto cursor-pointer ${isVerb ? 'h-80' : 'h-64'}`}
      onClick={onFlip}
    >
      <div className={`card-inner relative w-full h-full ${isFlipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="card-front flex flex-col items-center justify-center rounded-2xl bg-white shadow-lg border border-gray-100 p-8">
          {gender && (
            <span className={`text-sm font-medium mb-2 ${genderColor(gender)}`}>{gender}</span>
          )}
          {isVerb && (
            <span className="text-xs font-medium mb-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">verb</span>
          )}
          <span className="text-3xl font-semibold text-gray-900">{card.german}</span>
          <span className="text-sm text-gray-500 mt-1">{card.english}</span>
          <span className="text-sm text-gray-400 mt-4">Tap to reveal</span>
        </div>

        {/* Back */}
        <div className="card-back flex flex-col items-center justify-center rounded-2xl bg-indigo-50 shadow-lg border border-indigo-100 p-6">
          {card.type === 'word' && <WordBack card={card} />}
          {card.type === 'verb' && <VerbBack card={card} />}
        </div>
      </div>
    </div>
  );
}
