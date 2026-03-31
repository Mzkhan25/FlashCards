# DE FlashCards

A React-based flashcard app for learning German vocabulary and verb conjugations. Includes 114 verbs with full present-tense conjugation tables, plus nouns, adjectives, numbers, and common phrases.

Live at: **https://mzkhan25.github.io/FlashCards/**

## Features

- **Flashcard Practice** — flip cards to reveal English meanings. Nouns show gender (der/die/das) and plural forms. Verbs show a full conjugation table (ich/du/er/wir/ihr/sie).
- **Deck Filter** — toggle between All, Words, or Verbs to focus your practice.
- **Conjugation Quiz** — random verb + random pronoun. Try to recall the conjugated form, then tap to check.
- **Card Browser** — searchable list of all cards with gender and verb badges.
- **Keyboard Shortcuts** — Space to flip, arrow keys to navigate, works across all modes.
- **Mobile Friendly** — responsive design that works on phones and tablets.

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 + TypeScript | UI and type safety |
| Vite | Build tooling and dev server |
| Tailwind CSS v4 | Styling |
| React Router v7 (HashRouter) | Client-side routing (GitHub Pages compatible) |
| GitHub Actions | Automated deployment to GitHub Pages |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The app runs at `http://localhost:5173/FlashCards/`.

## Build

```bash
npm run build
```

Outputs a static site to `dist/`.

## Deployment

The app auto-deploys to GitHub Pages on push to `main` via the workflow in `.github/workflows/deploy.yml`.

To set up deployment for the first time:
1. Push to `main`
2. Go to **Settings > Pages** in your GitHub repo
3. Set **Source** to **GitHub Actions**

## Project Structure

```
src/
  components/
    flashcard/     — FlashCard (with 3D flip), FlashCardDeck (navigation + filter), FlashCardProgress
    layout/        — Header (nav), Layout (shell)
  context/         — CardContext (React context + useReducer)
  data/            — seed.ts (all card data: words, verbs with conjugations)
  hooks/           — useCards (context consumer hook)
  pages/           — PracticePage, ConjugatePage, CardListPage
  types/           — TypeScript interfaces (WordCard, VerbCard, FlashCard union)
  utils/           — shuffle (Fisher-Yates)
```

## Adding New Words

Edit `src/data/seed.ts`. Words go in `WORD_CARDS`, verbs use the `verb()` helper:

```typescript
// Word
{ id: 'seed-xx', type: 'word', german: 'Apfel', english: 'Apple', gender: 'der', tags: ['food', 'A1'], ... }

// Verb
verb('v-xxx', 'singen', 'To sing', {
  ich: 'singe', du: 'singst', er_sie_es: 'singt',
  wir: 'singen', ihr: 'singt', sie_Sie: 'singen'
})
```
