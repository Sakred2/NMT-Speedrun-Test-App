import type { Subject, Topic } from '../types';

export type Element =
  | 'water' | 'lava' | 'acid' | 'volt' | 'stone' | 'moss' | 'frost' | 'ember' | 'sand'
  | 'orbit' | 'spark' | 'circuit' | 'mind' | 'spirit' | 'code' | 'forest' | 'currency'
  | 'ruins' | 'forensics' | 'ocean' | 'storm' | 'draft' | 'build' | 'media' | 'reason'
  | 'society' | 'wealth' | 'palette' | 'flame';

export interface SubjectExtra extends Subject {
  element: Element;
  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Crazy' | 'Insane';
}

export const SUBJECTS: SubjectExtra[] = [
  {
    id: 'english', label: 'Англійська', icon: '🌊', element: 'water', difficulty: 'Easy',
    accent: 'from-water to-water-deep',
  },
  {
    id: 'german', label: 'Німецька', icon: '🔥', element: 'lava', difficulty: 'Normal',
    accent: 'from-lava to-lava-deep',
  },
  {
    id: 'polish', label: 'Польська', icon: '☣️', element: 'acid', difficulty: 'Hard',
    accent: 'from-acid to-acid-deep',
  },
  {
    id: 'history', label: 'Історія', icon: '⚡', element: 'volt', difficulty: 'Crazy',
    accent: 'from-volt to-volt-deep',
  },
  {
    id: 'math', label: 'Математика', icon: '📐', element: 'stone', difficulty: 'Insane',
    accent: 'from-steel-200 to-steel-400',
  },
  {
    id: 'ukrainian', label: 'Українська', icon: '📖', element: 'frost', difficulty: 'Normal',
    accent: 'from-frost to-frost-deep',
  },
  {
    id: 'biology', label: 'Біологія', icon: '🧬', element: 'moss', difficulty: 'Hard',
    accent: 'from-moss to-moss-deep',
  },
  {
    id: 'chemistry', label: 'Хімія', icon: '⚗️', element: 'ember', difficulty: 'Crazy',
    accent: 'from-ember to-ember-deep',
  },
  {
    id: 'geography', label: 'Географія', icon: '🗺️', element: 'sand', difficulty: 'Easy',
    accent: 'from-sand to-sand-deep',
  },
  {
    id: 'astronomy', label: 'Астрономія', icon: '🌙', element: 'orbit', difficulty: 'Hard',
    accent: 'from-violet-400 to-indigo-600',
  },
  {
    id: 'physics', label: 'Фізика', icon: '⚛️', element: 'spark', difficulty: 'Hard',
    accent: 'from-cyan-400 to-sky-600',
  },
  {
    id: 'robotics', label: 'Робототехніка', icon: '🤖', element: 'circuit', difficulty: 'Crazy',
    accent: 'from-emerald-400 to-teal-600',
  },
  {
    id: 'psychology', label: 'Психологія', icon: '🧠', element: 'mind', difficulty: 'Normal',
    accent: 'from-amber-400 to-orange-500',
  },
  {
    id: 'philosophy', label: 'Філософія', icon: '📜', element: 'spirit', difficulty: 'Hard',
    accent: 'from-fuchsia-400 to-purple-600',
  },
  {
    id: 'programming', label: 'Програмування', icon: '💻', element: 'code', difficulty: 'Crazy',
    accent: 'from-teal-400 to-cyan-600',
  },
  {
    id: 'ecology', label: 'Екологія', icon: '🌿', element: 'forest', difficulty: 'Normal',
    accent: 'from-lime-400 to-green-600',
  },
  {
    id: 'economics', label: 'Економіка', icon: '💰', element: 'currency', difficulty: 'Normal',
    accent: 'from-yellow-400 to-amber-600',
  },
  {
    id: 'archaeology', label: 'Археологія', icon: '🏺', element: 'ruins', difficulty: 'Hard',
    accent: 'from-orange-500 to-yellow-700',
  },
  {
    id: 'criminalistics', label: 'Криміналістика', icon: '🔍', element: 'forensics', difficulty: 'Crazy',
    accent: 'from-red-400 to-rose-600',
  },
  {
    id: 'oceanology', label: 'Океанологія', icon: '🌊', element: 'ocean', difficulty: 'Hard',
    accent: 'from-sky-400 to-blue-700',
  },
  {
    id: 'meteorology', label: 'Метеорологія', icon: '🌦️', element: 'storm', difficulty: 'Normal',
    accent: 'from-sky-300 to-indigo-500',
  },
  {
    id: 'drafting', label: 'Креслення', icon: '📐', element: 'draft', difficulty: 'Normal',
    accent: 'from-slate-300 to-slate-600',
  },
  {
    id: 'engineering', label: 'Інженерія', icon: '🛠️', element: 'build', difficulty: 'Hard',
    accent: 'from-cyan-500 to-blue-700',
  },
  {
    id: 'media-literacy', label: 'Медіаграмотність', icon: '📡', element: 'media', difficulty: 'Easy',
    accent: 'from-pink-400 to-violet-600',
  },
  {
    id: 'logic', label: 'Логіка', icon: '🧩', element: 'reason', difficulty: 'Normal',
    accent: 'from-indigo-400 to-violet-600',
  },
  {
    id: 'sociology', label: 'Соціологія', icon: '👥', element: 'society', difficulty: 'Normal',
    accent: 'from-rose-400 to-pink-600',
  },
  {
    id: 'financial-literacy', label: 'Фінансова грамотність', icon: '💳', element: 'wealth', difficulty: 'Easy',
    accent: 'from-emerald-400 to-teal-600',
  },
  {
    id: 'art', label: 'Мистецтво', icon: '🎨', element: 'palette', difficulty: 'Easy',
    accent: 'from-fuchsia-400 to-pink-600',
  },
  {
    id: 'culinary', label: 'Кулінарія', icon: '🍲', element: 'flame', difficulty: 'Normal',
    accent: 'from-orange-400 to-red-600',
  },
];

export const TOPICS: Record<string, Topic[]> = {
  english: [
    { id: 'tenses', label: 'Часи дієслів' },
    { id: 'vocab', label: 'Словниковий запас' },
    { id: 'grammar', label: 'Граматика' },
    { id: 'prepositions', label: 'Прийменники' },
  ],
  german: [
    { id: 'artikel', label: 'Артиклі та роди' },
    { id: 'verbs', label: 'Дієслова & модальні' },
    { id: 'cases', label: 'Відмінки' },
    { id: 'vocab', label: 'Словниковий запас' },
  ],
  polish: [
    { id: 'cases', label: 'Відмінки (przypadki)' },
    { id: 'verbs', label: 'Дієслова & часи' },
    { id: 'vocab', label: 'Словниковий запас' },
    { id: 'pronouns', label: 'Займенники' },
  ],
  history: [
    { id: 'kyivan', label: 'Київська Русь' },
    { id: 'cossacks', label: 'Козацька доба' },
    { id: '20century', label: 'XX століття' },
    { id: 'independence', label: 'Незалежна Україна' },
  ],
  math: [
    { id: 'algebra', label: 'Алгебра' },
    { id: 'geometry', label: 'Геометрія' },
    { id: 'fractions', label: 'Дроби та відсотки' },
    { id: 'equations', label: 'Рівняння' },
  ],
  ukrainian: [
    { id: 'orthography', label: 'Правопис' },
    { id: 'morphology', label: 'Морфологія' },
    { id: 'syntax', label: 'Синтаксис' },
    { id: 'stylistics', label: 'Стилістика' },
  ],
  biology: [
    { id: 'cell', label: 'Клітина' },
    { id: 'human', label: 'Людина' },
    { id: 'genetics', label: 'Генетика' },
    { id: 'ecology', label: 'Екологія' },
  ],
  chemistry: [
    { id: 'periodic', label: 'Періодична система' },
    { id: 'reactions', label: 'Реакції' },
    { id: 'solutions', label: 'Розчини' },
    { id: 'organic', label: 'Органіка' },
  ],
  geography: [
    { id: 'ukraine', label: 'Географія України' },
    { id: 'world', label: 'Світ' },
    { id: 'climate', label: 'Клімат' },
    { id: 'economy', label: 'Господарство' },
  ],
  astronomy: [
    { id: 'celestial-bodies', label: 'Небесні тіла' },
    { id: 'orbits', label: 'Орбіти та сили' },
    { id: 'eclipses', label: 'Затемнення' },
    { id: 'space-exploration', label: 'Дослідження космосу' },
  ],
  physics: [
    { id: 'motion', label: 'Рух і сила' },
    { id: 'electricity', label: 'Електрика' },
    { id: 'waves', label: 'Хвилі та світло' },
    { id: 'energy', label: 'Енергія та робота' },
  ],
  robotics: [
    { id: 'sensors', label: 'Сенсори' },
    { id: 'mechanics', label: 'Механіка' },
    { id: 'programming', label: 'Програмування роботів' },
    { id: 'automation', label: 'Автоматизація' },
  ],
  psychology: [
    { id: 'cognition', label: 'Пізнання' },
    { id: 'memory', label: 'Пам’ять' },
    { id: 'emotion', label: 'Емоції' },
    { id: 'development', label: 'Розвиток особистості' },
  ],
  philosophy: [
    { id: 'ethics', label: 'Етика' },
    { id: 'logic', label: 'Логічні аргументи' },
    { id: 'metaphysics', label: 'Метафізика' },
    { id: 'society', label: 'Філософія суспільства' },
  ],
  programming: [
    { id: 'algorithms', label: 'Алгоритми' },
    { id: 'data-structures', label: 'Структури даних' },
    { id: 'functions', label: 'Функції та цикли' },
    { id: 'debugging', label: 'Виправлення помилок' },
  ],
  ecology: [
    { id: 'ecosystems', label: 'Екосистеми' },
    { id: 'biodiversity', label: 'Біорізноманіття' },
    { id: 'pollution', label: 'Забруднення' },
    { id: 'conservation', label: 'Охорона природи' },
  ],
  economics: [
    { id: 'markets', label: 'Ринки' },
    { id: 'supply-demand', label: 'Попит і пропозиція' },
    { id: 'money', label: 'Гроші та банківська справа' },
    { id: 'business', label: 'Підприємництво' },
  ],
  archaeology: [
    { id: 'excavation', label: 'Розкопки' },
    { id: 'artifacts', label: 'Артефакти' },
    { id: 'civilizations', label: 'Цивілізації' },
    { id: 'dating', label: 'Датування' },
  ],
  criminalistics: [
    { id: 'traces', label: 'Сліди й відбитки' },
    { id: 'evidence', label: 'Докази' },
    { id: 'interrogation', label: 'Допит' },
    { id: 'forensic-analysis', label: 'Судово-медична експертиза' },
  ],
  oceanology: [
    { id: 'marine-zones', label: 'Морські зони' },
    { id: 'currents', label: 'Потоки і течії' },
    { id: 'marine-life', label: 'Життя в океані' },
    { id: 'tides', label: 'Припливи й відпливи' },
  ],
  meteorology: [
    { id: 'atmosphere', label: 'Атмосфера' },
    { id: 'weather', label: 'Погода' },
    { id: 'clouds', label: 'Хмари та опади' },
    { id: 'forecasting', label: 'Прогнозування' },
  ],
  drafting: [
    { id: 'geometry', label: 'Геометричні побудови' },
    { id: 'projections', label: 'Проекції' },
    { id: 'dimensions', label: 'Розміри та масштаби' },
    { id: 'symbols', label: 'Умовні позначення' },
  ],
  engineering: [
    { id: 'materials', label: 'Матеріали' },
    { id: 'structures', label: 'Конструкції' },
    { id: 'systems', label: 'Системи й механізми' },
    { id: 'design', label: 'Проєктування' },
  ],
  'media-literacy': [
    { id: 'sources', label: 'Джерела інформації' },
    { id: 'bias', label: 'Упередження' },
    { id: 'digital-safety', label: 'Цифрова безпека' },
    { id: 'media-formats', label: 'Формати медіа' },
  ],
  logic: [
    { id: 'propositions', label: 'Висловлювання' },
    { id: 'syllogisms', label: 'Силогізми' },
    { id: 'patterns', label: 'Візерунки й аналогії' },
    { id: 'fallacies', label: 'Помилки в міркуванні' },
  ],
  sociology: [
    { id: 'groups', label: 'Соціальні групи' },
    { id: 'identity', label: 'Ідентичність' },
    { id: 'institutions', label: 'Інститути' },
    { id: 'culture', label: 'Культура та норми' },
  ],
  'financial-literacy': [
    { id: 'budgeting', label: 'Бюджет і заощадження' },
    { id: 'credit', label: 'Кредити та борги' },
    { id: 'insurance', label: 'Страхування' },
    { id: 'investing', label: 'Інвестиції' },
  ],
  art: [
    { id: 'color', label: 'Колір і композиція' },
    { id: 'form', label: 'Форма й лінія' },
    { id: 'history', label: 'Історія мистецтва' },
    { id: 'techniques', label: 'Техніки та матеріали' },
  ],
  culinary: [
    { id: 'nutrition', label: 'Харчування' },
    { id: 'techniques', label: 'Кулінарні техніки' },
    { id: 'ingredients', label: 'Інгредієнти' },
    { id: 'hygiene', label: 'Гігієна й безпека' },
  ],
};

// Difficulty color mapping (Flood Escape 2 difficulty badges)
export const DIFFICULTY_STYLE: Record<string, { bg: string; text: string; ring: string }> = {
  Easy: { bg: 'bg-emerald-500', text: 'text-emerald-50', ring: 'ring-emerald-400' },
  Normal: { bg: 'bg-sky-500', text: 'text-sky-50', ring: 'ring-sky-400' },
  Hard: { bg: 'bg-amber-500', text: 'text-amber-50', ring: 'ring-amber-400' },
  Crazy: { bg: 'bg-rose-500', text: 'text-rose-50', ring: 'ring-rose-400' },
  Insane: { bg: 'bg-steel-200', text: 'text-cave-700', ring: 'ring-steel-100' },
};

// Element accent helpers
export const ELEMENT_COLOR: Record<Element, string> = {
  water: '#3b9eff',
  lava: '#ff7a3d',
  acid: '#7ed957',
  volt: '#ffd43b',
  stone: '#6b7686',
  moss: '#34d399',
  frost: '#67e8f9',
  ember: '#f472b6',
  sand: '#e2b26b',
  orbit: '#8b5cf6',
  spark: '#38bdf8',
  circuit: '#22c55e',
  mind: '#f59e0b',
  spirit: '#d946ef',
  code: '#14b8a6',
  forest: '#84cc16',
  currency: '#fbbf24',
  ruins: '#b45309',
  forensics: '#ef4444',
  ocean: '#0ea5e9',
  storm: '#6366f1',
  draft: '#94a3b8',
  build: '#0ea5e9',
  media: '#ec4899',
  reason: '#7c3aed',
  society: '#f472b6',
  wealth: '#10b981',
  palette: '#f97316',
  flame: '#f97316',
};
