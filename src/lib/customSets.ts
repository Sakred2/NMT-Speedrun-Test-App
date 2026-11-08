import type { Question, SubjectId } from '../types';

export interface CustomSet {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: number;
  questions: Question[];
}

const KEY = 'nmt-custom-sets';

function safeParse(raw: string | null): CustomSet[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidSet);
  } catch {
    return [];
  }
}

function isValidSet(s: unknown): s is CustomSet {
  if (!s || typeof s !== 'object') return false;
  const o = s as Record<string, unknown>;
  if (typeof o.id !== 'string' || typeof o.title !== 'string') return false;
  if (!Array.isArray(o.questions) || o.questions.length === 0) return false;
  return o.questions.every(isValidQuestion);
}

function isValidQuestion(q: unknown): q is Question {
  if (!q || typeof q !== 'object') return false;
  const o = q as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.subject === 'string' &&
    typeof o.topic === 'string' &&
    typeof o.prompt === 'string' &&
    Array.isArray(o.options) &&
    o.options.length >= 2 &&
    o.options.every((x) => typeof x === 'string') &&
    typeof o.correctIndex === 'number' &&
    Number.isInteger(o.correctIndex) &&
    (o.correctIndex as number) >= 0 &&
    (o.correctIndex as number) < (o.options as string[]).length &&
    typeof o.explanation === 'string'
  );
}

export function loadCustomSets(): CustomSet[] {
  try {
    return safeParse(localStorage.getItem(KEY));
  } catch {
    return [];
  }
}

export function saveCustomSets(sets: CustomSet[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(sets));
  } catch {
    // ignore
  }
}

export function createSet(partial: Omit<CustomSet, 'id' | 'createdAt'>): CustomSet {
  return {
    ...partial,
    id: `cs-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
  };
}

export function upsertSet(set: CustomSet): CustomSet[] {
  const sets = loadCustomSets();
  const idx = sets.findIndex((s) => s.id === set.id);
  if (idx >= 0) sets[idx] = set;
  else sets.unshift(set);
  saveCustomSets(sets);
  return sets;
}

export function deleteSet(id: string): CustomSet[] {
  const sets = loadCustomSets().filter((s) => s.id !== id);
  saveCustomSets(sets);
  return sets;
}

export function encodeSet(set: CustomSet): string {
  const json = JSON.stringify(set);
  // base64url
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeSet(str: string): CustomSet | null {
  try {
    const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const padded = b64 + '==='.slice((b64.length + 3) % 4);
    const json = decodeURIComponent(escape(atob(padded)));
    const parsed = JSON.parse(json);
    if (!isValidSet(parsed)) return null;
    // give a fresh id on import to avoid collisions
    return { ...parsed, id: `cs-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` };
  } catch {
    return null;
  }
}

export function exportSetFile(set: CustomSet): void {
  const blob = new Blob([JSON.stringify(set, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${set.title.replace(/[^a-z0-9а-яіїєґ]+/gi, '_') || 'set'}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function importSetFile(file: File): Promise<CustomSet | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!isValidSet(parsed)) return resolve(null);
        resolve({ ...parsed, id: `cs-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` });
      } catch {
        resolve(null);
      }
    };
    reader.onerror = () => resolve(null);
    reader.readAsText(file);
  });
}
