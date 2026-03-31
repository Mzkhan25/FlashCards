import { useAudio } from '../../hooks/useAudio';

interface SpeakerButtonProps {
  text: string;
  size?: 'sm' | 'md';
}

export function SpeakerButton({ text, size = 'md' }: SpeakerButtonProps) {
  const { speak, isSpeaking, isSupported } = useAudio();

  if (!isSupported) return null;

  const dim = size === 'sm' ? 16 : 20;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      className={`inline-flex items-center justify-center rounded-lg text-text-muted hover:text-primary transition-colors ${
        isSpeaking ? 'text-primary animate-pulse' : ''
      } ${size === 'sm' ? 'p-1' : 'p-1.5'}`}
      title="Listen"
    >
      <svg width={dim} height={dim} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    </button>
  );
}
