import { FlashCardDeck } from '../components/flashcard/FlashCardDeck';
import { DailyWordBanner } from '../components/daily/DailyWordBanner';

export function PracticePage() {
  return (
    <div className="py-6 md:py-8 flex flex-col gap-6">
      <DailyWordBanner />
      <FlashCardDeck />
    </div>
  );
}
