export function checkAnswer(userAnswer: string, correctAnswer: string): boolean {
  const normalize = (s: string) =>
    s.trim().toLowerCase()
      .replace(/^to\s+/, '')   // strip "to " prefix
      .replace(/['']/g, "'");  // normalize quotes

  const user = normalize(userAnswer);
  if (!user) return false;

  // The correct answer may have alternatives separated by " / "
  const alternatives = correctAnswer.split(/\s*\/\s*/).map(normalize);
  return alternatives.some((alt) => alt === user);
}
