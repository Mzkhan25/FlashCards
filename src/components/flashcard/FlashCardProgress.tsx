interface FlashCardProgressProps {
  current: number;
  total: number;
}

export function FlashCardProgress({ current, total }: FlashCardProgressProps) {
  return (
    <div className="text-sm text-gray-500 text-center">
      Card <span className="font-medium text-gray-700">{current}</span> of{' '}
      <span className="font-medium text-gray-700">{total}</span>
    </div>
  );
}
