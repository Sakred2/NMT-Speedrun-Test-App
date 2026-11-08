import type { Question, QuestionKind, SubjectId, Topic } from '../types';
import { SUBJECTS, TOPICS } from '../data/subjects';
import { pickMockQuestions } from '../data/mockQuestions';
import { getModel } from './storage';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
export const DEFAULT_MODEL = 'nvidia/nemotron-3.5-super-vl:free';

export interface ModelOption {
  id: string;
  label: string;
  badge?: string;
}

export const MODEL_OPTIONS: ModelOption[] = [
  { id: 'nvidia/nemotron-3.5-super-vl:free', label: 'Nemotron 3.5 Super VL', badge: 'free' },
  { id: 'dots-studio/dots-3-note-preview:free', label: 'Dots3-Note Preview', badge: 'free' },
  { id: 'nvidia/nemotron-3.5-lightning:free', label: 'Nemotron 3.5 Lightning', badge: 'free' },
  { id: 'nvidia/nemotron-3.5-content-safety:free', label: 'Nemotron 3.5 Content Safety', badge: 'free' },
];

export function getActiveModel(): string {
  return getModel() || DEFAULT_MODEL;
}

export interface FetchResult {
  questions: Question[];
  source: 'openrouter' | 'mock';
}

interface RawQuestion {
  prompt?: unknown;
  options?: unknown;
  correctIndex?: unknown;
  explanation?: unknown;
  kind?: unknown;
}

function buildPrompt(subject: SubjectId, topicId: string | undefined, count: number): string {
  const topicLabel = topicId
    ? TOPICS[subject]?.find((t: Topic) => t.id === topicId)?.label ?? 'змішана'
    : 'змішана (випадкові теми)';

  const subjectName = SUBJECTS.find((s) => s.id === subject)?.label ?? subject;

  return `Ти — дружній AI-репетитор для підготовки до НМТ (український мультимедійний тест).
Створи ${count} тестових питання з предмету «${subjectName}», тема: «${topicLabel}».
Змішай формати завдань:
- choice: 4 варіанти відповіді;
- trueFalse: твердження, лише 2 варіанти ["Так", "Ні"];
- fillBlank: речення з пропуском «___» і 4 варіанти слова.
Кожне питання має коротке дружнє пояснення українською простими словами.

Поверни ТІЛЬКИ валідний JSON-масив без markdown-обгорток. Формат кожного елемента:
{
  "kind": "choice",
  "prompt": "текст питання",
  "options": ["A", "B", "C", "D"],
  "correctIndex": 0,
  "explanation": "дружнє пояснення українською"
}
Для trueFalse використовуй рівно 2 варіанти. Не пиши жодного тексту поза JSON.`;
}

function parseQuestions(json: string, subject: SubjectId, topicId: string | undefined): Question[] {
  const cleaned = json
    .trim()
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/i, '')
    .trim();

  const parsed = JSON.parse(cleaned) as RawQuestion[];
  if (!Array.isArray(parsed)) throw new Error('Not an array');

  const out: Question[] = [];
  parsed.forEach((raw, idx) => {
    const prompt = typeof raw.prompt === 'string' ? raw.prompt : '';
    const options = Array.isArray(raw.options) ? (raw.options as unknown[]).map(String) : [];
    const correctIndex = Number(raw.correctIndex);
    const explanation = typeof raw.explanation === 'string' ? raw.explanation : '';
    const kind: QuestionKind = raw.kind === 'trueFalse' || raw.kind === 'fillBlank' ? raw.kind : 'choice';
    const validOptionCount = kind === 'trueFalse' ? options.length === 2 : options.length === 4;

    if (
      !prompt ||
      !validOptionCount ||
      !Number.isInteger(correctIndex) ||
      correctIndex < 0 ||
      correctIndex > options.length - 1 ||
      !explanation
    ) {
      throw new Error(`Invalid question at index ${idx}`);
    }

    out.push({
      id: `ai-${subject}-${idx}-${Date.now()}`,
      subject,
      topic: topicId ?? 'ai',
      prompt,
      options,
      correctIndex,
      explanation,
      kind,
    });
  });

  return out;
}

export async function fetchQuestions(
  subject: SubjectId,
  topicId: string | undefined,
  count: number,
  apiKey: string | null,
): Promise<FetchResult> {
  if (!apiKey || !apiKey.trim()) {
    return { questions: pickMockQuestions(subject, topicId, count), source: 'mock' };
  }

  try {
    const res = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'X-Client-Info': 'nmt-speedrun',
      },
      body: JSON.stringify({
        model: getActiveModel(),
        messages: [
          { role: 'system', content: 'Ти досвідчений репетитор НМТ. Відповідай лише валідним JSON.' },
          { role: 'user', content: buildPrompt(subject, topicId, count) },
        ],
        temperature: 0.8,
      }),
    });

    if (!res.ok) throw new Error(`API ${res.status}`);

    const data = await res.json();
    const content: string = data?.choices?.[0]?.message?.content ?? '';
    if (!content) throw new Error('Empty response');

    const questions = parseQuestions(content, subject, topicId);
    if (questions.length === 0) throw new Error('No questions parsed');

    // If AI returned fewer than requested, pad with mock
    if (questions.length < count) {
      const pad = pickMockQuestions(subject, topicId, count - questions.length);
      return { questions: [...questions, ...pad], source: 'openrouter' };
    }
    return { questions: questions.slice(0, count), source: 'openrouter' };
  } catch (err) {
    console.warn('OpenRouter fetch failed, using mock:', err);
    return { questions: pickMockQuestions(subject, topicId, count), source: 'mock' };
  }
}

export interface TestConnectionResult {
  ok: boolean;
  message: string;
  model?: string;
}

/** Quick connectivity + auth + model probe. Sends a tiny completion request. */
export async function testConnection(
  apiKey: string,
  model: string,
): Promise<TestConnectionResult> {
  if (!apiKey.trim()) {
    return { ok: false, message: 'API-ключ порожній. Встав ключ і спробуй ще раз.' };
  }

  try {
    const res = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'X-Client-Info': 'nmt-speedrun',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'user', content: 'Віддай лише слово: OK' },
        ],
        max_tokens: 5,
      }),
    });

    if (res.status === 401) return { ok: false, message: 'Невірний API-ключ. Перевір його на openrouter.ai/keys.' };
    if (res.status === 402) return { ok: false, message: 'Недостатньо кредитів для цієї платної моделі. Обери безкоштовну (free).' };
    if (res.status === 404) return { ok: false, message: `Модель «${model}» недоступна. Обери іншу.` };
    if (!res.ok) {
      let detail = `Помилка ${res.status}`;
      try {
        const j = await res.json();
        const msg = j?.error?.message;
        if (typeof msg === 'string' && msg) detail = msg;
      } catch {
        // ignore parse
      }
      return { ok: false, message: detail };
    }

    const data = await res.json();
    const content: string = data?.choices?.[0]?.message?.content ?? '';
    if (!content) return { ok: false, message: 'Модель не повернула відповідь. Спробуй іншу.' };

    return {
      ok: true,
      message: `Успіх! Модель «${model}» відповіла.`,
      model,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, message: `Мережева помилка: ${msg}. Перевір інтернет або CORS.` };
  }
}
