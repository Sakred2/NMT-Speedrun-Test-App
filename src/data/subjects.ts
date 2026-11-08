import type { Subject, Topic } from '../types';

export type Element = 'water' | 'lava' | 'acid' | 'volt' | 'stone' | 'moss' | 'frost' | 'ember' | 'sand';

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
    id: 'math', label: 'Математика', icon: '🪨', element: 'stone', difficulty: 'Insane',
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
};
