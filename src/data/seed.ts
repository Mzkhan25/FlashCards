import type { WordCard, VerbCard, FlashCard } from '../types';

const T = '2024-01-01T00:00:00Z';

// Helper to reduce boilerplate for verb entries
function verb(
  id: string,
  german: string,
  english: string,
  conj: { ich: string; du: string; er_sie_es: string; wir: string; ihr: string; sie_Sie: string },
  tags: string[] = ['verb', 'A1'],
  isRegular = true,
): VerbCard {
  return {
    id, type: 'verb', german, english, tags,
    conjugations: conj, tense: 'present', isRegular,
    createdAt: T, lastReviewedAt: null, reviewCount: 0,
  };
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
];

const VERB_CARDS: VerbCard[] = [
  // Basics & Essentials
  verb('v-01', 'sein', 'To be', { ich: 'bin', du: 'bist', er_sie_es: 'ist', wir: 'sind', ihr: 'seid', sie_Sie: 'sind' }, ['verb', 'A1'], false),
  verb('v-02', 'haben', 'To have', { ich: 'habe', du: 'hast', er_sie_es: 'hat', wir: 'haben', ihr: 'habt', sie_Sie: 'haben' }, ['verb', 'A1'], false),
  verb('v-03', 'heißen', 'To be called', { ich: 'heiße', du: 'heißt', er_sie_es: 'heißt', wir: 'heißen', ihr: 'heißt', sie_Sie: 'heißen' }),
  verb('v-04', 'essen', 'To eat', { ich: 'esse', du: 'isst', er_sie_es: 'isst', wir: 'essen', ihr: 'esst', sie_Sie: 'essen' }, ['verb', 'A1'], false),
  verb('v-05', 'kommen', 'To come', { ich: 'komme', du: 'kommst', er_sie_es: 'kommt', wir: 'kommen', ihr: 'kommt', sie_Sie: 'kommen' }),
  verb('v-06', 'wohnen', 'To live (reside)', { ich: 'wohne', du: 'wohnst', er_sie_es: 'wohnt', wir: 'wohnen', ihr: 'wohnt', sie_Sie: 'wohnen' }),
  verb('v-07', 'gehen', 'To go / To walk', { ich: 'gehe', du: 'gehst', er_sie_es: 'geht', wir: 'gehen', ihr: 'geht', sie_Sie: 'gehen' }),
  verb('v-08', 'trinken', 'To drink', { ich: 'trinke', du: 'trinkst', er_sie_es: 'trinkt', wir: 'trinken', ihr: 'trinkt', sie_Sie: 'trinken' }),
  verb('v-09', 'lernen', 'To learn', { ich: 'lerne', du: 'lernst', er_sie_es: 'lernt', wir: 'lernen', ihr: 'lernt', sie_Sie: 'lernen' }),
  verb('v-10', 'studieren', 'To study', { ich: 'studiere', du: 'studierst', er_sie_es: 'studiert', wir: 'studieren', ihr: 'studiert', sie_Sie: 'studieren' }),
  verb('v-11', 'schlafen', 'To sleep', { ich: 'schlafe', du: 'schläfst', er_sie_es: 'schläft', wir: 'schlafen', ihr: 'schlaft', sie_Sie: 'schlafen' }, ['verb', 'A1'], false),
  verb('v-12', 'leben', 'To live (be alive)', { ich: 'lebe', du: 'lebst', er_sie_es: 'lebt', wir: 'leben', ihr: 'lebt', sie_Sie: 'leben' }),

  // Communication & Thinking
  verb('v-13', 'hören', 'To hear', { ich: 'höre', du: 'hörst', er_sie_es: 'hört', wir: 'hören', ihr: 'hört', sie_Sie: 'hören' }),
  verb('v-14', 'lesen', 'To read', { ich: 'lese', du: 'liest', er_sie_es: 'liest', wir: 'lesen', ihr: 'lest', sie_Sie: 'lesen' }, ['verb', 'A1'], false),
  verb('v-15', 'schreiben', 'To write', { ich: 'schreibe', du: 'schreibst', er_sie_es: 'schreibt', wir: 'schreiben', ihr: 'schreibt', sie_Sie: 'schreiben' }),
  verb('v-16', 'sprechen', 'To speak', { ich: 'spreche', du: 'sprichst', er_sie_es: 'spricht', wir: 'sprechen', ihr: 'sprecht', sie_Sie: 'sprechen' }, ['verb', 'A1'], false),
  verb('v-17', 'sagen', 'To say', { ich: 'sage', du: 'sagst', er_sie_es: 'sagt', wir: 'sagen', ihr: 'sagt', sie_Sie: 'sagen' }),
  verb('v-18', 'fragen', 'To ask', { ich: 'frage', du: 'fragst', er_sie_es: 'fragt', wir: 'fragen', ihr: 'fragt', sie_Sie: 'fragen' }),
  verb('v-19', 'antworten', 'To answer', { ich: 'antworte', du: 'antwortest', er_sie_es: 'antwortet', wir: 'antworten', ihr: 'antwortet', sie_Sie: 'antworten' }),
  verb('v-20', 'verstehen', 'To understand', { ich: 'verstehe', du: 'verstehst', er_sie_es: 'versteht', wir: 'verstehen', ihr: 'versteht', sie_Sie: 'verstehen' }),
  verb('v-21', 'vergessen', 'To forget', { ich: 'vergesse', du: 'vergisst', er_sie_es: 'vergisst', wir: 'vergessen', ihr: 'vergesst', sie_Sie: 'vergessen' }, ['verb', 'A1'], false),
  verb('v-22', 'wissen', 'To know (fact)', { ich: 'weiß', du: 'weißt', er_sie_es: 'weiß', wir: 'wissen', ihr: 'wisst', sie_Sie: 'wissen' }, ['verb', 'A1'], false),
  verb('v-23', 'kennen', 'To know (person/place)', { ich: 'kenne', du: 'kennst', er_sie_es: 'kennt', wir: 'kennen', ihr: 'kennt', sie_Sie: 'kennen' }),
  verb('v-24', 'denken', 'To think', { ich: 'denke', du: 'denkst', er_sie_es: 'denkt', wir: 'denken', ihr: 'denkt', sie_Sie: 'denken' }),

  // Actions & Work
  verb('v-25', 'machen', 'To do / To make', { ich: 'mache', du: 'machst', er_sie_es: 'macht', wir: 'machen', ihr: 'macht', sie_Sie: 'machen' }),
  verb('v-26', 'arbeiten', 'To work', { ich: 'arbeite', du: 'arbeitest', er_sie_es: 'arbeitet', wir: 'arbeiten', ihr: 'arbeitet', sie_Sie: 'arbeiten' }),
  verb('v-27', 'spielen', 'To play', { ich: 'spiele', du: 'spielst', er_sie_es: 'spielt', wir: 'spielen', ihr: 'spielt', sie_Sie: 'spielen' }),
  verb('v-28', 'kochen', 'To cook', { ich: 'koche', du: 'kochst', er_sie_es: 'kocht', wir: 'kochen', ihr: 'kocht', sie_Sie: 'kochen' }),
  verb('v-29', 'backen', 'To bake', { ich: 'backe', du: 'bäckst', er_sie_es: 'bäckt', wir: 'backen', ihr: 'backt', sie_Sie: 'backen' }, ['verb', 'A1'], false),
  verb('v-30', 'kaufen', 'To buy', { ich: 'kaufe', du: 'kaufst', er_sie_es: 'kauft', wir: 'kaufen', ihr: 'kauft', sie_Sie: 'kaufen' }),
  verb('v-31', 'verkaufen', 'To sell', { ich: 'verkaufe', du: 'verkaufst', er_sie_es: 'verkauft', wir: 'verkaufen', ihr: 'verkauft', sie_Sie: 'verkaufen' }),
  verb('v-32', 'bezahlen', 'To pay', { ich: 'bezahle', du: 'bezahlst', er_sie_es: 'bezahlt', wir: 'bezahlen', ihr: 'bezahlt', sie_Sie: 'bezahlen' }),
  verb('v-33', 'suchen', 'To search', { ich: 'suche', du: 'suchst', er_sie_es: 'sucht', wir: 'suchen', ihr: 'sucht', sie_Sie: 'suchen' }),
  verb('v-34', 'finden', 'To find', { ich: 'finde', du: 'findest', er_sie_es: 'findet', wir: 'finden', ihr: 'findet', sie_Sie: 'finden' }),
  verb('v-35', 'bringen', 'To bring', { ich: 'bringe', du: 'bringst', er_sie_es: 'bringt', wir: 'bringen', ihr: 'bringt', sie_Sie: 'bringen' }),
  verb('v-36', 'nehmen', 'To take', { ich: 'nehme', du: 'nimmst', er_sie_es: 'nimmt', wir: 'nehmen', ihr: 'nehmt', sie_Sie: 'nehmen' }, ['verb', 'A1'], false),

  // Movement
  verb('v-37', 'fahren', 'To drive', { ich: 'fahre', du: 'fährst', er_sie_es: 'fährt', wir: 'fahren', ihr: 'fahrt', sie_Sie: 'fahren' }, ['verb', 'A1'], false),
  verb('v-38', 'fliegen', 'To fly', { ich: 'fliege', du: 'fliegst', er_sie_es: 'fliegt', wir: 'fliegen', ihr: 'fliegt', sie_Sie: 'fliegen' }),
  verb('v-39', 'laufen', 'To run', { ich: 'laufe', du: 'läufst', er_sie_es: 'läuft', wir: 'laufen', ihr: 'lauft', sie_Sie: 'laufen' }, ['verb', 'A1'], false),
  verb('v-40', 'sitzen', 'To sit', { ich: 'sitze', du: 'sitzt', er_sie_es: 'sitzt', wir: 'sitzen', ihr: 'sitzt', sie_Sie: 'sitzen' }),
  verb('v-41', 'stehen', 'To stand', { ich: 'stehe', du: 'stehst', er_sie_es: 'steht', wir: 'stehen', ihr: 'steht', sie_Sie: 'stehen' }),
  verb('v-42', 'liegen', 'To lie', { ich: 'liege', du: 'liegst', er_sie_es: 'liegt', wir: 'liegen', ihr: 'liegt', sie_Sie: 'liegen' }),
  verb('v-43', 'fallen', 'To fall', { ich: 'falle', du: 'fällst', er_sie_es: 'fällt', wir: 'fallen', ihr: 'fallt', sie_Sie: 'fallen' }, ['verb', 'A1'], false),
  verb('v-44', 'steigen', 'To climb', { ich: 'steige', du: 'steigst', er_sie_es: 'steigt', wir: 'steigen', ihr: 'steigt', sie_Sie: 'steigen' }),
  verb('v-45', 'springen', 'To jump', { ich: 'springe', du: 'springst', er_sie_es: 'springt', wir: 'springen', ihr: 'springt', sie_Sie: 'springen' }),
  verb('v-46', 'schwimmen', 'To swim', { ich: 'schwimme', du: 'schwimmst', er_sie_es: 'schwimmt', wir: 'schwimmen', ihr: 'schwimmt', sie_Sie: 'schwimmen' }),

  // Social & Emotions
  verb('v-47', 'treffen', 'To meet', { ich: 'treffe', du: 'triffst', er_sie_es: 'trifft', wir: 'treffen', ihr: 'trefft', sie_Sie: 'treffen' }, ['verb', 'A1'], false),
  verb('v-48', 'besuchen', 'To visit', { ich: 'besuche', du: 'besuchst', er_sie_es: 'besucht', wir: 'besuchen', ihr: 'besucht', sie_Sie: 'besuchen' }),
  verb('v-49', 'einladen', 'To invite', { ich: 'lade ein', du: 'lädst ein', er_sie_es: 'lädt ein', wir: 'laden ein', ihr: 'ladet ein', sie_Sie: 'laden ein' }, ['verb', 'separable', 'A1'], false),
  verb('v-50', 'helfen', 'To help', { ich: 'helfe', du: 'hilfst', er_sie_es: 'hilft', wir: 'helfen', ihr: 'helft', sie_Sie: 'helfen' }, ['verb', 'A1'], false),
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

export const SEED_CARDS: FlashCard[] = [...WORD_CARDS, ...VERB_CARDS];
