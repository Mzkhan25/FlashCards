import type { WordCard, VerbCard, PhraseCard, FlashCard, Conjugation } from '../types';

const T = '2024-01-01T00:00:00Z';

// Helper to reduce boilerplate for verb entries
function verb(
  id: string,
  german: string,
  english: string,
  conj: Conjugation,
  tags: string[] = ['verb', 'A1'],
  isRegular = true,
  perfekt?: Conjugation,
): VerbCard {
  return {
    id, type: 'verb', german, english, tags,
    conjugations: conj, perfekt, tense: 'present', isRegular,
    createdAt: T, lastReviewedAt: null, reviewCount: 0,
  };
}

// Helper for Perfekt with haben
function ph(pp: string): Conjugation {
  return { ich: `habe ${pp}`, du: `hast ${pp}`, er_sie_es: `hat ${pp}`, wir: `haben ${pp}`, ihr: `habt ${pp}`, sie_Sie: `haben ${pp}` };
}

// Helper for Perfekt with sein
function ps(pp: string): Conjugation {
  return { ich: `bin ${pp}`, du: `bist ${pp}`, er_sie_es: `ist ${pp}`, wir: `sind ${pp}`, ihr: `seid ${pp}`, sie_Sie: `sind ${pp}` };
}

const WORD_CARDS: WordCard[] = [
  // Greetings & Basics
  { id: 'seed-01', type: 'word', german: 'Hallo', english: 'Hello', tags: ['greeting', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-02', type: 'word', german: 'Tschüss', english: 'Goodbye', tags: ['greeting', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-03', type: 'word', german: 'Danke', english: 'Thank you', tags: ['greeting', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-04', type: 'word', german: 'Bitte', english: 'Please / You\'re welcome', tags: ['greeting', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-05', type: 'word', german: 'Guten Morgen', english: 'Good morning', tags: ['greeting', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-06', type: 'word', german: 'Guten Abend', english: 'Good evening', tags: ['greeting', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },

  // Nouns with genders
  { id: 'seed-07', type: 'word', german: 'Hund', english: 'Dog', gender: 'der', tags: ['animal', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Hunde' },
  { id: 'seed-08', type: 'word', german: 'Katze', english: 'Cat', gender: 'die', tags: ['animal', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Katzen' },
  { id: 'seed-09', type: 'word', german: 'Buch', english: 'Book', gender: 'das', tags: ['object', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Bücher' },
  { id: 'seed-10', type: 'word', german: 'Tisch', english: 'Table', gender: 'der', tags: ['furniture', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Tische' },
  { id: 'seed-11', type: 'word', german: 'Tür', english: 'Door', gender: 'die', tags: ['object', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Türen' },
  { id: 'seed-12', type: 'word', german: 'Haus', english: 'House', gender: 'das', tags: ['building', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Häuser' },
  { id: 'seed-13', type: 'word', german: 'Wasser', english: 'Water', gender: 'das', tags: ['food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-14', type: 'word', german: 'Brot', english: 'Bread', gender: 'das', tags: ['food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Brote' },
  { id: 'seed-15', type: 'word', german: 'Milch', english: 'Milk', gender: 'die', tags: ['food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-16', type: 'word', german: 'Frau', english: 'Woman / Mrs.', gender: 'die', tags: ['person', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Frauen' },
  { id: 'seed-17', type: 'word', german: 'Mann', english: 'Man / Mr.', gender: 'der', tags: ['person', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Männer' },
  { id: 'seed-18', type: 'word', german: 'Kind', english: 'Child', gender: 'das', tags: ['person', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Kinder' },
  { id: 'seed-19', type: 'word', german: 'Freund', english: 'Friend', gender: 'der', tags: ['person', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Freunde' },
  { id: 'seed-20', type: 'word', german: 'Schule', english: 'School', gender: 'die', tags: ['building', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Schulen' },

  // Adjectives
  { id: 'seed-adj-01', type: 'word', german: 'gut', english: 'Good', tags: ['adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-adj-02', type: 'word', german: 'schlecht', english: 'Bad', tags: ['adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-adj-03', type: 'word', german: 'groß', english: 'Big / Tall', tags: ['adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-adj-04', type: 'word', german: 'klein', english: 'Small / Short', tags: ['adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-adj-05', type: 'word', german: 'schnell', english: 'Fast', tags: ['adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-adj-06', type: 'word', german: 'langsam', english: 'Slow', tags: ['adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-adj-07', type: 'word', german: 'neu', english: 'New', tags: ['adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-adj-08', type: 'word', german: 'alt', english: 'Old', tags: ['adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },

  // Numbers
  { id: 'seed-num-01', type: 'word', german: 'eins', english: 'One', tags: ['number', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-num-02', type: 'word', german: 'zwei', english: 'Two', tags: ['number', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-num-03', type: 'word', german: 'drei', english: 'Three', tags: ['number', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },

  // Days
  { id: 'seed-day-01', type: 'word', german: 'Montag', english: 'Monday', gender: 'der', tags: ['day', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-day-02', type: 'word', german: 'Dienstag', english: 'Tuesday', gender: 'der', tags: ['day', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-day-03', type: 'word', german: 'Mittwoch', english: 'Wednesday', gender: 'der', tags: ['day', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },

  // Fruits (Obst)
  { id: 'seed-fruit-01', type: 'word', german: 'Apfel', english: 'Apple', gender: 'der', tags: ['fruit', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Äpfel' },
  { id: 'seed-fruit-02', type: 'word', german: 'Banane', english: 'Banana', gender: 'die', tags: ['fruit', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Bananen' },
  { id: 'seed-fruit-03', type: 'word', german: 'Orange', english: 'Orange', gender: 'die', tags: ['fruit', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Orangen' },
  { id: 'seed-fruit-04', type: 'word', german: 'Erdbeere', english: 'Strawberry', gender: 'die', tags: ['fruit', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Erdbeeren' },
  { id: 'seed-fruit-05', type: 'word', german: 'Traube', english: 'Grape', gender: 'die', tags: ['fruit', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Trauben' },
  { id: 'seed-fruit-06', type: 'word', german: 'Kirsche', english: 'Cherry', gender: 'die', tags: ['fruit', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Kirschen' },
  { id: 'seed-fruit-07', type: 'word', german: 'Birne', english: 'Pear', gender: 'die', tags: ['fruit', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Birnen' },
  { id: 'seed-fruit-08', type: 'word', german: 'Zitrone', english: 'Lemon', gender: 'die', tags: ['fruit', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Zitronen' },
  { id: 'seed-fruit-09', type: 'word', german: 'Wassermelone', english: 'Watermelon', gender: 'die', tags: ['fruit', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Wassermelonen' },
  { id: 'seed-fruit-10', type: 'word', german: 'Pfirsich', english: 'Peach', gender: 'der', tags: ['fruit', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Pfirsiche' },

  // Vegetables (Gemüse)
  { id: 'seed-veg-01', type: 'word', german: 'Kartoffel', english: 'Potato', gender: 'die', tags: ['vegetable', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Kartoffeln' },
  { id: 'seed-veg-02', type: 'word', german: 'Tomate', english: 'Tomato', gender: 'die', tags: ['vegetable', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Tomaten' },
  { id: 'seed-veg-03', type: 'word', german: 'Karotte', english: 'Carrot', gender: 'die', tags: ['vegetable', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Karotten' },
  { id: 'seed-veg-04', type: 'word', german: 'Zwiebel', english: 'Onion', gender: 'die', tags: ['vegetable', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Zwiebeln' },
  { id: 'seed-veg-05', type: 'word', german: 'Gurke', english: 'Cucumber', gender: 'die', tags: ['vegetable', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Gurken' },
  { id: 'seed-veg-06', type: 'word', german: 'Paprika', english: 'Bell pepper', gender: 'die', tags: ['vegetable', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Paprikas' },
  { id: 'seed-veg-07', type: 'word', german: 'Salat', english: 'Salad / Lettuce', gender: 'der', tags: ['vegetable', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Salate' },
  { id: 'seed-veg-08', type: 'word', german: 'Knoblauch', english: 'Garlic', gender: 'der', tags: ['vegetable', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-veg-09', type: 'word', german: 'Pilz', english: 'Mushroom', gender: 'der', tags: ['vegetable', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Pilze' },
  { id: 'seed-veg-10', type: 'word', german: 'Mais', english: 'Corn', gender: 'der', tags: ['vegetable', 'food', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },

  // Colors (Farben)
  { id: 'seed-color-01', type: 'word', german: 'rot', english: 'Red', tags: ['color', 'adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-color-02', type: 'word', german: 'blau', english: 'Blue', tags: ['color', 'adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-color-03', type: 'word', german: 'grün', english: 'Green', tags: ['color', 'adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-color-04', type: 'word', german: 'gelb', english: 'Yellow', tags: ['color', 'adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-color-05', type: 'word', german: 'schwarz', english: 'Black', tags: ['color', 'adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-color-06', type: 'word', german: 'weiß', english: 'White', tags: ['color', 'adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-color-07', type: 'word', german: 'braun', english: 'Brown', tags: ['color', 'adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-color-08', type: 'word', german: 'orange', english: 'Orange (color)', tags: ['color', 'adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-color-09', type: 'word', german: 'rosa', english: 'Pink', tags: ['color', 'adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-color-10', type: 'word', german: 'grau', english: 'Grey', tags: ['color', 'adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },

  // Clothing (Kleidung)
  { id: 'seed-cloth-01', type: 'word', german: 'Hemd', english: 'Shirt', gender: 'das', tags: ['clothing', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Hemden' },
  { id: 'seed-cloth-02', type: 'word', german: 'Hose', english: 'Pants / Trousers', gender: 'die', tags: ['clothing', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Hosen' },
  { id: 'seed-cloth-03', type: 'word', german: 'Schuh', english: 'Shoe', gender: 'der', tags: ['clothing', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Schuhe' },
  { id: 'seed-cloth-04', type: 'word', german: 'Jacke', english: 'Jacket', gender: 'die', tags: ['clothing', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Jacken' },
  { id: 'seed-cloth-05', type: 'word', german: 'Hut', english: 'Hat', gender: 'der', tags: ['clothing', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Hüte' },
  { id: 'seed-cloth-06', type: 'word', german: 'Kleid', english: 'Dress', gender: 'das', tags: ['clothing', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Kleider' },
  { id: 'seed-cloth-07', type: 'word', german: 'Rock', english: 'Skirt', gender: 'der', tags: ['clothing', 'A2'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Röcke' },
  { id: 'seed-cloth-08', type: 'word', german: 'Socke', english: 'Sock', gender: 'die', tags: ['clothing', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Socken' },
  { id: 'seed-cloth-09', type: 'word', german: 'Schal', english: 'Scarf', gender: 'der', tags: ['clothing', 'A2'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Schals' },
  { id: 'seed-cloth-10', type: 'word', german: 'Handschuh', english: 'Glove', gender: 'der', tags: ['clothing', 'A2'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Handschuhe' },

  // Body parts (Körper)
  { id: 'seed-body-01', type: 'word', german: 'Kopf', english: 'Head', gender: 'der', tags: ['body', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Köpfe' },
  { id: 'seed-body-02', type: 'word', german: 'Hand', english: 'Hand', gender: 'die', tags: ['body', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Hände' },
  { id: 'seed-body-03', type: 'word', german: 'Auge', english: 'Eye', gender: 'das', tags: ['body', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Augen' },
  { id: 'seed-body-04', type: 'word', german: 'Nase', english: 'Nose', gender: 'die', tags: ['body', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Nasen' },
  { id: 'seed-body-05', type: 'word', german: 'Mund', english: 'Mouth', gender: 'der', tags: ['body', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Münder' },
  { id: 'seed-body-06', type: 'word', german: 'Ohr', english: 'Ear', gender: 'das', tags: ['body', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Ohren' },
  { id: 'seed-body-07', type: 'word', german: 'Arm', english: 'Arm', gender: 'der', tags: ['body', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Arme' },
  { id: 'seed-body-08', type: 'word', german: 'Bein', english: 'Leg', gender: 'das', tags: ['body', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Beine' },
  { id: 'seed-body-09', type: 'word', german: 'Fuß', english: 'Foot', gender: 'der', tags: ['body', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Füße' },
  { id: 'seed-body-10', type: 'word', german: 'Herz', english: 'Heart', gender: 'das', tags: ['body', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Herzen' },

  // Family (Familie)
  { id: 'seed-family-01', type: 'word', german: 'Mutter', english: 'Mother', gender: 'die', tags: ['family', 'person', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Mütter' },
  { id: 'seed-family-02', type: 'word', german: 'Vater', english: 'Father', gender: 'der', tags: ['family', 'person', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Väter' },
  { id: 'seed-family-03', type: 'word', german: 'Bruder', english: 'Brother', gender: 'der', tags: ['family', 'person', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Brüder' },
  { id: 'seed-family-04', type: 'word', german: 'Schwester', english: 'Sister', gender: 'die', tags: ['family', 'person', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Schwestern' },
  { id: 'seed-family-05', type: 'word', german: 'Oma', english: 'Grandmother', gender: 'die', tags: ['family', 'person', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Omas' },
  { id: 'seed-family-06', type: 'word', german: 'Opa', english: 'Grandfather', gender: 'der', tags: ['family', 'person', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Opas' },
  { id: 'seed-family-07', type: 'word', german: 'Sohn', english: 'Son', gender: 'der', tags: ['family', 'person', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Söhne' },
  { id: 'seed-family-08', type: 'word', german: 'Tochter', english: 'Daughter', gender: 'die', tags: ['family', 'person', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Töchter' },
  { id: 'seed-family-09', type: 'word', german: 'Onkel', english: 'Uncle', gender: 'der', tags: ['family', 'person', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Onkel' },
  { id: 'seed-family-10', type: 'word', german: 'Tante', english: 'Aunt', gender: 'die', tags: ['family', 'person', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Tanten' },

  // Weather (Wetter)
  { id: 'seed-weather-01', type: 'word', german: 'Sonne', english: 'Sun', gender: 'die', tags: ['weather', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Sonnen' },
  { id: 'seed-weather-02', type: 'word', german: 'Regen', english: 'Rain', gender: 'der', tags: ['weather', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-weather-03', type: 'word', german: 'Schnee', english: 'Snow', gender: 'der', tags: ['weather', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-weather-04', type: 'word', german: 'Wind', english: 'Wind', gender: 'der', tags: ['weather', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Winde' },
  { id: 'seed-weather-05', type: 'word', german: 'Wolke', english: 'Cloud', gender: 'die', tags: ['weather', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Wolken' },
  { id: 'seed-weather-06', type: 'word', german: 'Sturm', english: 'Storm', gender: 'der', tags: ['weather', 'A2'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Stürme' },
  { id: 'seed-weather-07', type: 'word', german: 'warm', english: 'Warm', tags: ['weather', 'adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },
  { id: 'seed-weather-08', type: 'word', german: 'kalt', english: 'Cold', tags: ['weather', 'adjective', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0 },

  // Rooms & House (Zimmer)
  { id: 'seed-room-01', type: 'word', german: 'Küche', english: 'Kitchen', gender: 'die', tags: ['room', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Küchen' },
  { id: 'seed-room-02', type: 'word', german: 'Schlafzimmer', english: 'Bedroom', gender: 'das', tags: ['room', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Schlafzimmer' },
  { id: 'seed-room-03', type: 'word', german: 'Badezimmer', english: 'Bathroom', gender: 'das', tags: ['room', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Badezimmer' },
  { id: 'seed-room-04', type: 'word', german: 'Wohnzimmer', english: 'Living room', gender: 'das', tags: ['room', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Wohnzimmer' },
  { id: 'seed-room-05', type: 'word', german: 'Garten', english: 'Garden', gender: 'der', tags: ['room', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Gärten' },
  { id: 'seed-room-06', type: 'word', german: 'Fenster', english: 'Window', gender: 'das', tags: ['room', 'A1'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Fenster' },
  { id: 'seed-room-07', type: 'word', german: 'Wand', english: 'Wall', gender: 'die', tags: ['room', 'A2'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Wände' },
  { id: 'seed-room-08', type: 'word', german: 'Treppe', english: 'Stairs', gender: 'die', tags: ['room', 'A2'], createdAt: T, lastReviewedAt: null, reviewCount: 0, plural: 'Treppen' },
];

const VERB_CARDS: VerbCard[] = [
  // Basics & Essentials
  verb('v-01', 'sein', 'To be', { ich: 'bin', du: 'bist', er_sie_es: 'ist', wir: 'sind', ihr: 'seid', sie_Sie: 'sind' }, ['verb', 'A1'], false, ps('gewesen')),
  verb('v-02', 'haben', 'To have', { ich: 'habe', du: 'hast', er_sie_es: 'hat', wir: 'haben', ihr: 'habt', sie_Sie: 'haben' }, ['verb', 'A1'], false, ph('gehabt')),
  verb('v-03', 'heißen', 'To be called', { ich: 'heiße', du: 'heißt', er_sie_es: 'heißt', wir: 'heißen', ihr: 'heißt', sie_Sie: 'heißen' }, ['verb', 'A1'], true, ph('geheißen')),
  verb('v-04', 'essen', 'To eat', { ich: 'esse', du: 'isst', er_sie_es: 'isst', wir: 'essen', ihr: 'esst', sie_Sie: 'essen' }, ['verb', 'A1'], false, ph('gegessen')),
  verb('v-05', 'kommen', 'To come', { ich: 'komme', du: 'kommst', er_sie_es: 'kommt', wir: 'kommen', ihr: 'kommt', sie_Sie: 'kommen' }, ['verb', 'A1'], true, ps('gekommen')),
  verb('v-06', 'wohnen', 'To live (reside)', { ich: 'wohne', du: 'wohnst', er_sie_es: 'wohnt', wir: 'wohnen', ihr: 'wohnt', sie_Sie: 'wohnen' }, ['verb', 'A1'], true, ph('gewohnt')),
  verb('v-07', 'gehen', 'To go / To walk', { ich: 'gehe', du: 'gehst', er_sie_es: 'geht', wir: 'gehen', ihr: 'geht', sie_Sie: 'gehen' }, ['verb', 'A1'], true, ps('gegangen')),
  verb('v-08', 'trinken', 'To drink', { ich: 'trinke', du: 'trinkst', er_sie_es: 'trinkt', wir: 'trinken', ihr: 'trinkt', sie_Sie: 'trinken' }, ['verb', 'A1'], true, ph('getrunken')),
  verb('v-09', 'lernen', 'To learn', { ich: 'lerne', du: 'lernst', er_sie_es: 'lernt', wir: 'lernen', ihr: 'lernt', sie_Sie: 'lernen' }, ['verb', 'A1'], true, ph('gelernt')),
  verb('v-10', 'studieren', 'To study', { ich: 'studiere', du: 'studierst', er_sie_es: 'studiert', wir: 'studieren', ihr: 'studiert', sie_Sie: 'studieren' }, ['verb', 'A1'], true, ph('studiert')),
  verb('v-11', 'schlafen', 'To sleep', { ich: 'schlafe', du: 'schläfst', er_sie_es: 'schläft', wir: 'schlafen', ihr: 'schlaft', sie_Sie: 'schlafen' }, ['verb', 'A1'], false, ph('geschlafen')),
  verb('v-12', 'leben', 'To live (be alive)', { ich: 'lebe', du: 'lebst', er_sie_es: 'lebt', wir: 'leben', ihr: 'lebt', sie_Sie: 'leben' }, ['verb', 'A1'], true, ph('gelebt')),

  // Communication & Thinking
  verb('v-13', 'hören', 'To hear', { ich: 'höre', du: 'hörst', er_sie_es: 'hört', wir: 'hören', ihr: 'hört', sie_Sie: 'hören' }, ['verb', 'A1'], true, ph('gehört')),
  verb('v-14', 'lesen', 'To read', { ich: 'lese', du: 'liest', er_sie_es: 'liest', wir: 'lesen', ihr: 'lest', sie_Sie: 'lesen' }, ['verb', 'A1'], false, ph('gelesen')),
  verb('v-15', 'schreiben', 'To write', { ich: 'schreibe', du: 'schreibst', er_sie_es: 'schreibt', wir: 'schreiben', ihr: 'schreibt', sie_Sie: 'schreiben' }, ['verb', 'A1'], true, ph('geschrieben')),
  verb('v-16', 'sprechen', 'To speak', { ich: 'spreche', du: 'sprichst', er_sie_es: 'spricht', wir: 'sprechen', ihr: 'sprecht', sie_Sie: 'sprechen' }, ['verb', 'A1'], false, ph('gesprochen')),
  verb('v-17', 'sagen', 'To say', { ich: 'sage', du: 'sagst', er_sie_es: 'sagt', wir: 'sagen', ihr: 'sagt', sie_Sie: 'sagen' }, ['verb', 'A1'], true, ph('gesagt')),
  verb('v-18', 'fragen', 'To ask', { ich: 'frage', du: 'fragst', er_sie_es: 'fragt', wir: 'fragen', ihr: 'fragt', sie_Sie: 'fragen' }, ['verb', 'A1'], true, ph('gefragt')),
  verb('v-19', 'antworten', 'To answer', { ich: 'antworte', du: 'antwortest', er_sie_es: 'antwortet', wir: 'antworten', ihr: 'antwortet', sie_Sie: 'antworten' }, ['verb', 'A1'], true, ph('geantwortet')),
  verb('v-20', 'verstehen', 'To understand', { ich: 'verstehe', du: 'verstehst', er_sie_es: 'versteht', wir: 'verstehen', ihr: 'versteht', sie_Sie: 'verstehen' }, ['verb', 'A1'], true, ph('verstanden')),
  verb('v-21', 'vergessen', 'To forget', { ich: 'vergesse', du: 'vergisst', er_sie_es: 'vergisst', wir: 'vergessen', ihr: 'vergesst', sie_Sie: 'vergessen' }, ['verb', 'A1'], false, ph('vergessen')),
  verb('v-22', 'wissen', 'To know (fact)', { ich: 'weiß', du: 'weißt', er_sie_es: 'weiß', wir: 'wissen', ihr: 'wisst', sie_Sie: 'wissen' }, ['verb', 'A1'], false, ph('gewusst')),
  verb('v-23', 'kennen', 'To know (person/place)', { ich: 'kenne', du: 'kennst', er_sie_es: 'kennt', wir: 'kennen', ihr: 'kennt', sie_Sie: 'kennen' }, ['verb', 'A1'], true, ph('gekannt')),
  verb('v-24', 'denken', 'To think', { ich: 'denke', du: 'denkst', er_sie_es: 'denkt', wir: 'denken', ihr: 'denkt', sie_Sie: 'denken' }, ['verb', 'A1'], true, ph('gedacht')),

  // Actions & Work
  verb('v-25', 'machen', 'To do / To make', { ich: 'mache', du: 'machst', er_sie_es: 'macht', wir: 'machen', ihr: 'macht', sie_Sie: 'machen' }, ['verb', 'A1'], true, ph('gemacht')),
  verb('v-26', 'arbeiten', 'To work', { ich: 'arbeite', du: 'arbeitest', er_sie_es: 'arbeitet', wir: 'arbeiten', ihr: 'arbeitet', sie_Sie: 'arbeiten' }, ['verb', 'A1'], true, ph('gearbeitet')),
  verb('v-27', 'spielen', 'To play', { ich: 'spiele', du: 'spielst', er_sie_es: 'spielt', wir: 'spielen', ihr: 'spielt', sie_Sie: 'spielen' }, ['verb', 'A1'], true, ph('gespielt')),
  verb('v-28', 'kochen', 'To cook', { ich: 'koche', du: 'kochst', er_sie_es: 'kocht', wir: 'kochen', ihr: 'kocht', sie_Sie: 'kochen' }, ['verb', 'A1'], true, ph('gekocht')),
  verb('v-29', 'backen', 'To bake', { ich: 'backe', du: 'bäckst', er_sie_es: 'bäckt', wir: 'backen', ihr: 'backt', sie_Sie: 'backen' }, ['verb', 'A1'], false),
  verb('v-30', 'kaufen', 'To buy', { ich: 'kaufe', du: 'kaufst', er_sie_es: 'kauft', wir: 'kaufen', ihr: 'kauft', sie_Sie: 'kaufen' }),
  verb('v-31', 'verkaufen', 'To sell', { ich: 'verkaufe', du: 'verkaufst', er_sie_es: 'verkauft', wir: 'verkaufen', ihr: 'verkauft', sie_Sie: 'verkaufen' }),
  verb('v-32', 'bezahlen', 'To pay', { ich: 'bezahle', du: 'bezahlst', er_sie_es: 'bezahlt', wir: 'bezahlen', ihr: 'bezahlt', sie_Sie: 'bezahlen' }),
  verb('v-33', 'suchen', 'To search', { ich: 'suche', du: 'suchst', er_sie_es: 'sucht', wir: 'suchen', ihr: 'sucht', sie_Sie: 'suchen' }),
  verb('v-34', 'finden', 'To find', { ich: 'finde', du: 'findest', er_sie_es: 'findet', wir: 'finden', ihr: 'findet', sie_Sie: 'finden' }),
  verb('v-35', 'bringen', 'To bring', { ich: 'bringe', du: 'bringst', er_sie_es: 'bringt', wir: 'bringen', ihr: 'bringt', sie_Sie: 'bringen' }, ['verb', 'A1'], true, ph('gebracht')),
  verb('v-36', 'nehmen', 'To take', { ich: 'nehme', du: 'nimmst', er_sie_es: 'nimmt', wir: 'nehmen', ihr: 'nehmt', sie_Sie: 'nehmen' }, ['verb', 'A1'], false, ph('genommen')),

  // Movement
  verb('v-37', 'fahren', 'To drive', { ich: 'fahre', du: 'fährst', er_sie_es: 'fährt', wir: 'fahren', ihr: 'fahrt', sie_Sie: 'fahren' }, ['verb', 'A1'], false, ps('gefahren')),
  verb('v-38', 'fliegen', 'To fly', { ich: 'fliege', du: 'fliegst', er_sie_es: 'fliegt', wir: 'fliegen', ihr: 'fliegt', sie_Sie: 'fliegen' }, ['verb', 'A1'], true, ps('geflogen')),
  verb('v-39', 'laufen', 'To run', { ich: 'laufe', du: 'läufst', er_sie_es: 'läuft', wir: 'laufen', ihr: 'lauft', sie_Sie: 'laufen' }, ['verb', 'A1'], false, ps('gelaufen')),
  verb('v-40', 'sitzen', 'To sit', { ich: 'sitze', du: 'sitzt', er_sie_es: 'sitzt', wir: 'sitzen', ihr: 'sitzt', sie_Sie: 'sitzen' }, ['verb', 'A1'], true, ph('gesessen')),
  verb('v-41', 'stehen', 'To stand', { ich: 'stehe', du: 'stehst', er_sie_es: 'steht', wir: 'stehen', ihr: 'steht', sie_Sie: 'stehen' }, ['verb', 'A1'], true, ph('gestanden')),
  verb('v-42', 'liegen', 'To lie', { ich: 'liege', du: 'liegst', er_sie_es: 'liegt', wir: 'liegen', ihr: 'liegt', sie_Sie: 'liegen' }, ['verb', 'A1'], true, ph('gelegen')),
  verb('v-43', 'fallen', 'To fall', { ich: 'falle', du: 'fällst', er_sie_es: 'fällt', wir: 'fallen', ihr: 'fallt', sie_Sie: 'fallen' }, ['verb', 'A1'], false, ps('gefallen')),
  verb('v-44', 'steigen', 'To climb', { ich: 'steige', du: 'steigst', er_sie_es: 'steigt', wir: 'steigen', ihr: 'steigt', sie_Sie: 'steigen' }, ['verb', 'A1'], true, ps('gestiegen')),
  verb('v-45', 'springen', 'To jump', { ich: 'springe', du: 'springst', er_sie_es: 'springt', wir: 'springen', ihr: 'springt', sie_Sie: 'springen' }, ['verb', 'A1'], true, ps('gesprungen')),
  verb('v-46', 'schwimmen', 'To swim', { ich: 'schwimme', du: 'schwimmst', er_sie_es: 'schwimmt', wir: 'schwimmen', ihr: 'schwimmt', sie_Sie: 'schwimmen' }, ['verb', 'A1'], true, ps('geschwommen')),

  // Social & Emotions
  verb('v-47', 'treffen', 'To meet', { ich: 'treffe', du: 'triffst', er_sie_es: 'trifft', wir: 'treffen', ihr: 'trefft', sie_Sie: 'treffen' }, ['verb', 'A1'], false, ph('getroffen')),
  verb('v-48', 'besuchen', 'To visit', { ich: 'besuche', du: 'besuchst', er_sie_es: 'besucht', wir: 'besuchen', ihr: 'besucht', sie_Sie: 'besuchen' }, ['verb', 'A1'], true, ph('besucht')),
  verb('v-49', 'einladen', 'To invite', { ich: 'lade ein', du: 'lädst ein', er_sie_es: 'lädt ein', wir: 'laden ein', ihr: 'ladet ein', sie_Sie: 'laden ein' }, ['verb', 'separable', 'A1'], false, ph('eingeladen')),
  verb('v-50', 'helfen', 'To help', { ich: 'helfe', du: 'hilfst', er_sie_es: 'hilft', wir: 'helfen', ihr: 'helft', sie_Sie: 'helfen' }, ['verb', 'A1'], false, ph('geholfen')),
  verb('v-51', 'danken', 'To thank', { ich: 'danke', du: 'dankst', er_sie_es: 'dankt', wir: 'danken', ihr: 'dankt', sie_Sie: 'danken' }),
  verb('v-52', 'lieben', 'To love', { ich: 'liebe', du: 'liebst', er_sie_es: 'liebt', wir: 'lieben', ihr: 'liebt', sie_Sie: 'lieben' }),
  verb('v-53', 'hassen', 'To hate', { ich: 'hasse', du: 'hasst', er_sie_es: 'hasst', wir: 'hassen', ihr: 'hasst', sie_Sie: 'hassen' }),
  verb('v-54', 'grüßen', 'To greet', { ich: 'grüße', du: 'grüßt', er_sie_es: 'grüßt', wir: 'grüßen', ihr: 'grüßt', sie_Sie: 'grüßen' }),
  verb('v-55', 'gratulieren', 'To congratulate', { ich: 'gratuliere', du: 'gratulierst', er_sie_es: 'gratuliert', wir: 'gratulieren', ihr: 'gratuliert', sie_Sie: 'gratulieren' }),
  verb('v-56', 'schenken', 'To give as gift', { ich: 'schenke', du: 'schenkst', er_sie_es: 'schenkt', wir: 'schenken', ihr: 'schenkt', sie_Sie: 'schenken' }),
  verb('v-57', 'feiern', 'To celebrate', { ich: 'feiere', du: 'feierst', er_sie_es: 'feiert', wir: 'feiern', ihr: 'feiert', sie_Sie: 'feiern' }),
  verb('v-58', 'tanzen', 'To dance', { ich: 'tanze', du: 'tanzt', er_sie_es: 'tanzt', wir: 'tanzen', ihr: 'tanzt', sie_Sie: 'tanzen' }),

  // Separable Verbs (trennbare Verben)
  verb('v-59', 'aufstehen', 'To get up', { ich: 'stehe auf', du: 'stehst auf', er_sie_es: 'steht auf', wir: 'stehen auf', ihr: 'steht auf', sie_Sie: 'stehen auf' }, ['verb', 'separable', 'A1']),
  verb('v-60', 'anrufen', 'To call', { ich: 'rufe an', du: 'rufst an', er_sie_es: 'ruft an', wir: 'rufen an', ihr: 'ruft an', sie_Sie: 'rufen an' }, ['verb', 'separable', 'A1']),
  verb('v-61', 'einkaufen', 'To shop', { ich: 'kaufe ein', du: 'kaufst ein', er_sie_es: 'kauft ein', wir: 'kaufen ein', ihr: 'kauft ein', sie_Sie: 'kaufen ein' }, ['verb', 'separable', 'A1']),
  verb('v-62', 'fernsehen', 'To watch TV', { ich: 'sehe fern', du: 'siehst fern', er_sie_es: 'sieht fern', wir: 'sehen fern', ihr: 'seht fern', sie_Sie: 'sehen fern' }, ['verb', 'separable', 'A1'], false),
  verb('v-63', 'aufmachen', 'To open', { ich: 'mache auf', du: 'machst auf', er_sie_es: 'macht auf', wir: 'machen auf', ihr: 'macht auf', sie_Sie: 'machen auf' }, ['verb', 'separable', 'A1']),
  verb('v-64', 'zumachen', 'To close', { ich: 'mache zu', du: 'machst zu', er_sie_es: 'macht zu', wir: 'machen zu', ihr: 'macht zu', sie_Sie: 'machen zu' }, ['verb', 'separable', 'A1']),
  verb('v-65', 'anmachen', 'To turn on', { ich: 'mache an', du: 'machst an', er_sie_es: 'macht an', wir: 'machen an', ihr: 'macht an', sie_Sie: 'machen an' }, ['verb', 'separable', 'A1']),
  verb('v-66', 'ausmachen', 'To turn off', { ich: 'mache aus', du: 'machst aus', er_sie_es: 'macht aus', wir: 'machen aus', ihr: 'macht aus', sie_Sie: 'machen aus' }, ['verb', 'separable', 'A1']),
  verb('v-67', 'mitkommen', 'To come along', { ich: 'komme mit', du: 'kommst mit', er_sie_es: 'kommt mit', wir: 'kommen mit', ihr: 'kommt mit', sie_Sie: 'kommen mit' }, ['verb', 'separable', 'A1']),
  verb('v-68', 'mitbringen', 'To bring along', { ich: 'bringe mit', du: 'bringst mit', er_sie_es: 'bringt mit', wir: 'bringen mit', ihr: 'bringt mit', sie_Sie: 'bringen mit' }, ['verb', 'separable', 'A1']),
  verb('v-69', 'mitnehmen', 'To take along', { ich: 'nehme mit', du: 'nimmst mit', er_sie_es: 'nimmt mit', wir: 'nehmen mit', ihr: 'nehmt mit', sie_Sie: 'nehmen mit' }, ['verb', 'separable', 'A1'], false),
  verb('v-70', 'ankommen', 'To arrive', { ich: 'komme an', du: 'kommst an', er_sie_es: 'kommt an', wir: 'kommen an', ihr: 'kommt an', sie_Sie: 'kommen an' }, ['verb', 'separable', 'A1']),
  verb('v-71', 'abfahren', 'To depart', { ich: 'fahre ab', du: 'fährst ab', er_sie_es: 'fährt ab', wir: 'fahren ab', ihr: 'fahrt ab', sie_Sie: 'fahren ab' }, ['verb', 'separable', 'A1'], false),
  verb('v-72', 'einsteigen', 'To get on', { ich: 'steige ein', du: 'steigst ein', er_sie_es: 'steigt ein', wir: 'steigen ein', ihr: 'steigt ein', sie_Sie: 'steigen ein' }, ['verb', 'separable', 'A1']),
  verb('v-73', 'aussteigen', 'To get off', { ich: 'steige aus', du: 'steigst aus', er_sie_es: 'steigt aus', wir: 'steigen aus', ihr: 'steigt aus', sie_Sie: 'steigen aus' }, ['verb', 'separable', 'A1']),
  verb('v-74', 'ausfüllen', 'To fill out', { ich: 'fülle aus', du: 'füllst aus', er_sie_es: 'füllt aus', wir: 'füllen aus', ihr: 'füllt aus', sie_Sie: 'füllen aus' }, ['verb', 'separable', 'A2']),
  verb('v-75', 'zurückgeben', 'To give back', { ich: 'gebe zurück', du: 'gibst zurück', er_sie_es: 'gibt zurück', wir: 'geben zurück', ihr: 'gebt zurück', sie_Sie: 'geben zurück' }, ['verb', 'separable', 'A2'], false),
  verb('v-76', 'abholen', 'To pick up', { ich: 'hole ab', du: 'holst ab', er_sie_es: 'holt ab', wir: 'holen ab', ihr: 'holt ab', sie_Sie: 'holen ab' }, ['verb', 'separable', 'A2']),
  verb('v-77', 'umziehen', 'To move / To change', { ich: 'ziehe um', du: 'ziehst um', er_sie_es: 'zieht um', wir: 'ziehen um', ihr: 'zieht um', sie_Sie: 'ziehen um' }, ['verb', 'separable', 'A2']),
  verb('v-78', 'einziehen', 'To move in', { ich: 'ziehe ein', du: 'ziehst ein', er_sie_es: 'zieht ein', wir: 'ziehen ein', ihr: 'zieht ein', sie_Sie: 'ziehen ein' }, ['verb', 'separable', 'A2']),
  verb('v-79', 'stattfinden', 'To take place', { ich: 'finde statt', du: 'findest statt', er_sie_es: 'findet statt', wir: 'finden statt', ihr: 'findet statt', sie_Sie: 'finden statt' }, ['verb', 'separable', 'A2']),
  verb('v-80', 'anfangen', 'To begin', { ich: 'fange an', du: 'fängst an', er_sie_es: 'fängt an', wir: 'fangen an', ihr: 'fangt an', sie_Sie: 'fangen an' }, ['verb', 'separable', 'A1'], false),
  verb('v-81', 'aufhören', 'To stop', { ich: 'höre auf', du: 'hörst auf', er_sie_es: 'hört auf', wir: 'hören auf', ihr: 'hört auf', sie_Sie: 'hören auf' }, ['verb', 'separable', 'A1']),
  verb('v-82', 'kennenlernen', 'To get to know', { ich: 'lerne kennen', du: 'lernst kennen', er_sie_es: 'lernt kennen', wir: 'lernen kennen', ihr: 'lernt kennen', sie_Sie: 'lernen kennen' }, ['verb', 'separable', 'A1']),
  verb('v-83', 'sich vorstellen', 'To introduce oneself', { ich: 'stelle mich vor', du: 'stellst dich vor', er_sie_es: 'stellt sich vor', wir: 'stellen uns vor', ihr: 'stellt euch vor', sie_Sie: 'stellen sich vor' }, ['verb', 'separable', 'A1']),
  verb('v-84', 'ankreuzen', 'To tick off', { ich: 'kreuze an', du: 'kreuzt an', er_sie_es: 'kreuzt an', wir: 'kreuzen an', ihr: 'kreuzt an', sie_Sie: 'kreuzen an' }, ['verb', 'separable', 'A2']),
  verb('v-85', 'anbieten', 'To offer', { ich: 'biete an', du: 'bietest an', er_sie_es: 'bietet an', wir: 'bieten an', ihr: 'bietet an', sie_Sie: 'bieten an' }, ['verb', 'separable', 'A2']),
  verb('v-86', 'vorbereiten', 'To prepare', { ich: 'bereite vor', du: 'bereitest vor', er_sie_es: 'bereitet vor', wir: 'bereiten vor', ihr: 'bereitet vor', sie_Sie: 'bereiten vor' }, ['verb', 'separable', 'A2']),
  verb('v-87', 'teilnehmen', 'To participate', { ich: 'nehme teil', du: 'nimmst teil', er_sie_es: 'nimmt teil', wir: 'nehmen teil', ihr: 'nehmt teil', sie_Sie: 'nehmen teil' }, ['verb', 'separable', 'A2'], false),
  verb('v-88', 'nachdenken', 'To think about', { ich: 'denke nach', du: 'denkst nach', er_sie_es: 'denkt nach', wir: 'denken nach', ihr: 'denkt nach', sie_Sie: 'denken nach' }, ['verb', 'separable', 'A2']),

  // Inseparable / Prefix Verbs
  verb('v-89', 'bestehen', 'To pass / To exist', { ich: 'bestehe', du: 'bestehst', er_sie_es: 'besteht', wir: 'bestehen', ihr: 'besteht', sie_Sie: 'bestehen' }, ['verb', 'A2']),
  verb('v-90', 'bekommen', 'To receive', { ich: 'bekomme', du: 'bekommst', er_sie_es: 'bekommt', wir: 'bekommen', ihr: 'bekommt', sie_Sie: 'bekommen' }),
  verb('v-91', 'erhalten', 'To receive (formal)', { ich: 'erhalte', du: 'erhältst', er_sie_es: 'erhält', wir: 'erhalten', ihr: 'erhaltet', sie_Sie: 'erhalten' }, ['verb', 'A2'], false),
  verb('v-92', 'empfehlen', 'To recommend', { ich: 'empfehle', du: 'empfiehlst', er_sie_es: 'empfiehlt', wir: 'empfehlen', ihr: 'empfehlt', sie_Sie: 'empfehlen' }, ['verb', 'A2'], false),
  verb('v-93', 'gefallen', 'To please', { ich: 'gefalle', du: 'gefällst', er_sie_es: 'gefällt', wir: 'gefallen', ihr: 'gefallt', sie_Sie: 'gefallen' }, ['verb', 'A1'], false),
  verb('v-94', 'passieren', 'To happen', { ich: 'passiere', du: 'passierst', er_sie_es: 'passiert', wir: 'passieren', ihr: 'passiert', sie_Sie: 'passieren' }),
  verb('v-95', 'interessieren', 'To interest', { ich: 'interessiere', du: 'interessierst', er_sie_es: 'interessiert', wir: 'interessieren', ihr: 'interessiert', sie_Sie: 'interessieren' }),
  verb('v-96', 'reservieren', 'To reserve', { ich: 'reserviere', du: 'reservierst', er_sie_es: 'reserviert', wir: 'reservieren', ihr: 'reserviert', sie_Sie: 'reservieren' }, ['verb', 'A2']),
  verb('v-97', 'renovieren', 'To renovate', { ich: 'renoviere', du: 'renovierst', er_sie_es: 'renoviert', wir: 'renovieren', ihr: 'renoviert', sie_Sie: 'renovieren' }, ['verb', 'A2']),
  verb('v-98', 'probieren', 'To try', { ich: 'probiere', du: 'probierst', er_sie_es: 'probiert', wir: 'probieren', ihr: 'probiert', sie_Sie: 'probieren' }),
  verb('v-99', 'funktionieren', 'To work / To function', { ich: 'funktioniere', du: 'funktionierst', er_sie_es: 'funktioniert', wir: 'funktionieren', ihr: 'funktioniert', sie_Sie: 'funktionieren' }),

  // General / Miscellaneous
  verb('v-100', 'hoffen', 'To hope', { ich: 'hoffe', du: 'hoffst', er_sie_es: 'hofft', wir: 'hoffen', ihr: 'hofft', sie_Sie: 'hoffen' }),
  verb('v-101', 'glauben', 'To believe', { ich: 'glaube', du: 'glaubst', er_sie_es: 'glaubt', wir: 'glauben', ihr: 'glaubt', sie_Sie: 'glauben' }),
  verb('v-102', 'meinen', 'To mean', { ich: 'meine', du: 'meinst', er_sie_es: 'meint', wir: 'meinen', ihr: 'meint', sie_Sie: 'meinen' }),
  verb('v-103', 'zeigen', 'To show', { ich: 'zeige', du: 'zeigst', er_sie_es: 'zeigt', wir: 'zeigen', ihr: 'zeigt', sie_Sie: 'zeigen' }),
  verb('v-104', 'erklären', 'To explain', { ich: 'erkläre', du: 'erklärst', er_sie_es: 'erklärt', wir: 'erklären', ihr: 'erklärt', sie_Sie: 'erklären' }),
  verb('v-105', 'erzählen', 'To tell', { ich: 'erzähle', du: 'erzählst', er_sie_es: 'erzählt', wir: 'erzählen', ihr: 'erzählt', sie_Sie: 'erzählen' }),
  verb('v-106', 'benutzen', 'To use', { ich: 'benutze', du: 'benutzt', er_sie_es: 'benutzt', wir: 'benutzen', ihr: 'benutzt', sie_Sie: 'benutzen' }),
  verb('v-107', 'brauchen', 'To need', { ich: 'brauche', du: 'brauchst', er_sie_es: 'braucht', wir: 'brauchen', ihr: 'braucht', sie_Sie: 'brauchen' }),
  verb('v-108', 'warten', 'To wait', { ich: 'warte', du: 'wartest', er_sie_es: 'wartet', wir: 'warten', ihr: 'wartet', sie_Sie: 'warten' }),
  verb('v-109', 'dauern', 'To last', { ich: 'dauere', du: 'dauerst', er_sie_es: 'dauert', wir: 'dauern', ihr: 'dauert', sie_Sie: 'dauern' }),
  verb('v-110', 'reisen', 'To travel', { ich: 'reise', du: 'reist', er_sie_es: 'reist', wir: 'reisen', ihr: 'reist', sie_Sie: 'reisen' }),
  verb('v-111', 'übernachten', 'To stay overnight', { ich: 'übernachte', du: 'übernachtest', er_sie_es: 'übernachtet', wir: 'übernachten', ihr: 'übernachtet', sie_Sie: 'übernachten' }, ['verb', 'A2']),
  verb('v-112', 'bleiben', 'To stay', { ich: 'bleibe', du: 'bleibst', er_sie_es: 'bleibt', wir: 'bleiben', ihr: 'bleibt', sie_Sie: 'bleiben' }),
  verb('v-113', 'verlassen', 'To leave', { ich: 'verlasse', du: 'verlässt', er_sie_es: 'verlässt', wir: 'verlassen', ihr: 'verlasst', sie_Sie: 'verlassen' }, ['verb', 'A2'], false),
  verb('v-114', 'erreichen', 'To reach', { ich: 'erreiche', du: 'erreichst', er_sie_es: 'erreicht', wir: 'erreichen', ihr: 'erreicht', sie_Sie: 'erreichen' }, ['verb', 'A2']),
];

function phrase(id: string, german: string, english: string, context: string, tags: string[] = ['phrase', 'A1']): PhraseCard {
  return { id, type: 'phrase', german, english, context, tags, createdAt: T, lastReviewedAt: null, reviewCount: 0 };
}

const PHRASE_CARDS: PhraseCard[] = [
  // Greetings & Basics
  phrase('p-01', 'Wie geht es Ihnen?', 'How are you? (formal)', 'Formal greeting'),
  phrase('p-02', 'Wie geht es dir?', 'How are you? (informal)', 'Informal greeting'),
  phrase('p-03', 'Mir geht es gut, danke', 'I\'m fine, thank you', 'Responding to how are you'),
  phrase('p-04', 'Freut mich!', 'Nice to meet you!', 'When meeting someone'),
  phrase('p-05', 'Ich heiße...', 'My name is...', 'Introducing yourself'),
  phrase('p-06', 'Woher kommen Sie?', 'Where are you from? (formal)', 'Asking about origin'),
  phrase('p-07', 'Ich komme aus...', 'I come from...', 'Stating your origin'),

  // Everyday
  phrase('p-08', 'Ich verstehe nicht', 'I don\'t understand', 'When confused'),
  phrase('p-09', 'Können Sie das wiederholen?', 'Can you repeat that?', 'Asking for repetition'),
  phrase('p-10', 'Sprechen Sie Englisch?', 'Do you speak English?', 'Language help'),
  phrase('p-11', 'Wie sagt man... auf Deutsch?', 'How do you say... in German?', 'Learning vocabulary'),
  phrase('p-12', 'Entschuldigung!', 'Excuse me! / Sorry!', 'Getting attention or apologizing'),
  phrase('p-13', 'Kein Problem', 'No problem', 'Accepting an apology'),
  phrase('p-14', 'Es tut mir leid', 'I\'m sorry', 'Apologizing sincerely'),

  // Directions & Travel
  phrase('p-15', 'Wo ist die Toilette?', 'Where is the bathroom?', 'Asking for directions'),
  phrase('p-16', 'Wie komme ich zum Bahnhof?', 'How do I get to the train station?', 'Asking for directions'),
  phrase('p-17', 'Ich möchte ein Ticket nach...', 'I would like a ticket to...', 'Buying transport tickets'),
  phrase('p-18', 'Wann fährt der nächste Zug?', 'When does the next train leave?', 'Transport schedule', ['phrase', 'travel', 'A1']),

  // Restaurant & Shopping
  phrase('p-19', 'Ich möchte bestellen', 'I would like to order', 'At a restaurant'),
  phrase('p-20', 'Die Rechnung, bitte', 'The bill, please', 'At a restaurant'),
  phrase('p-21', 'Ich hätte gerne einen Kaffee', 'I would like a coffee', 'Ordering drinks'),
  phrase('p-22', 'Was kostet das?', 'How much does that cost?', 'Shopping'),
  phrase('p-23', 'Kann ich mit Karte bezahlen?', 'Can I pay by card?', 'Payment'),

  // Emergencies & Help
  phrase('p-24', 'Ich brauche Hilfe', 'I need help', 'Asking for help'),
  phrase('p-25', 'Rufen Sie einen Arzt!', 'Call a doctor!', 'Medical emergency'),
  phrase('p-26', 'Ich bin krank', 'I am sick', 'Health'),

  // Time & Schedule
  phrase('p-27', 'Wie spät ist es?', 'What time is it?', 'Asking the time'),
  phrase('p-28', 'Wann beginnt...?', 'When does... start?', 'Asking about schedules'),
  phrase('p-29', 'Heute / Morgen / Gestern', 'Today / Tomorrow / Yesterday', 'Time reference'),
  phrase('p-30', 'Ich habe eine Frage', 'I have a question', 'Before asking something'),
];

export const SEED_CARDS: FlashCard[] = [...WORD_CARDS, ...VERB_CARDS, ...PHRASE_CARDS];
