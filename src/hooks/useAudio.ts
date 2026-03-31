import { useState, useCallback, useEffect, useRef } from 'react';

export function useAudio() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
      // Voices may load async
      const check = () => {
        const voices = synthRef.current?.getVoices() ?? [];
        setIsSupported(voices.some((v) => v.lang.startsWith('de')));
      };
      check();
      synthRef.current.addEventListener('voiceschanged', check);
      return () => synthRef.current?.removeEventListener('voiceschanged', check);
    }
  }, []);

  const speak = useCallback((text: string) => {
    const synth = synthRef.current;
    if (!synth) return;

    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.85;

    const voices = synth.getVoices();
    const deVoice = voices.find((v) => v.lang === 'de-DE') ?? voices.find((v) => v.lang.startsWith('de'));
    if (deVoice) utterance.voice = deVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.speak(utterance);
  }, []);

  return { speak, isSpeaking, isSupported };
}
