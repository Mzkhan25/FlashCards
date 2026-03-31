import { useState } from 'react';
import { useCards } from '../hooks/useCards';

function genderBadge(gender?: string) {
  if (!gender) return null;
  const colors: Record<string, string> = {
    der: 'bg-blue-100 text-blue-700',
    die: 'bg-pink-100 text-pink-700',
    das: 'bg-green-100 text-green-700',
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[gender]}`}>
      {gender}
    </span>
  );
}

export function CardListPage() {
  const { state } = useCards();
  const [search, setSearch] = useState('');

  const filtered = state.cards.filter((card) => {
    const q = search.toLowerCase();
    return card.german.toLowerCase().includes(q) || card.english.toLowerCase().includes(q);
  });

  return (
    <div className="py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          All Cards <span className="text-gray-400 font-normal text-lg">({state.cards.length})</span>
        </h2>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search cards..."
        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow mb-4"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No cards match your search.
        </p>
      ) : (
        <div className="space-y-2">
          {filtered.map((card) => (
            <div
              key={card.id}
              className="flex items-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-3">
                {card.type === 'word' && genderBadge(card.gender)}
                {card.type === 'verb' && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">verb</span>
                )}
                <div>
                  <span className="font-medium text-gray-900">{card.german}</span>
                  <span className="text-gray-400 mx-2">&mdash;</span>
                  <span className="text-gray-600">{card.english}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
