import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft, Plus, Trash2, Play, Download, Upload, Link2, Pencil, Check, X,
  BookOpen, ListChecks, CircleHelp, PenLine, Link, ArrowUpDown, Scale, Tag,
  AlertTriangle, Calculator, Sparkles,
} from 'lucide-react';
import type { Question, QuestionKind, SubjectId } from '@/types';
import { SUBJECTS, TOPICS } from '@/data/subjects';
import type { CustomSet } from '@/lib/customSets';
import {
  loadCustomSets, upsertSet, deleteSet, exportSetFile, importSetFile, encodeSet,
} from '@/lib/customSets';
import { ELEMENT_COLOR } from '@/data/subjects';

interface Props {
  onHome: () => void;
  onPlay: (set: CustomSet) => void;
  initialSet?: CustomSet | null;
}

const KINDS: { id: QuestionKind; label: string; icon: typeof ListChecks; options: number }[] = [
  { id: 'choice', label: 'Обери відповідь', icon: ListChecks, options: 4 },
  { id: 'trueFalse', label: 'Правда чи ні?', icon: CircleHelp, options: 2 },
  { id: 'fillBlank', label: 'Заповни пропуск', icon: PenLine, options: 4 },
  { id: 'matching', label: 'Зіставляння', icon: Link, options: 4 },
  { id: 'ordering', label: 'Послідовність', icon: ArrowUpDown, options: 4 },
  { id: 'compare', label: 'Порівняння', icon: Scale, options: 2 },
  { id: 'classify', label: 'Класифікація', icon: Tag, options: 4 },
  { id: 'errorFind', label: 'Знайди помилку', icon: AlertTriangle, options: 4 },
  { id: 'calculation', label: 'Обчислення', icon: Calculator, options: 4 },
  { id: 'analogy', label: 'Аналогія', icon: Sparkles, options: 4 },
];

function newQuestion(): Question {
  return {
    id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    subject: 'english',
    topic: 'tenses',
    kind: 'choice',
    prompt: '',
    options: ['', '', '', ''],
    correctIndex: 0,
    explanation: '',
  };
}

function validateQuestion(q: Question): string | null {
  if (!q.prompt.trim()) return 'Введи текст питання.';
  if (q.options.some((o) => !o.trim())) return 'Усі варіанти мають бути заповнені.';
  if (!q.explanation.trim()) return 'Додай пояснення.';
  return null;
}

export default function EditorScreen({ onHome, onPlay, initialSet }: Props) {
  const [sets, setSets] = useState<CustomSet[]>(loadCustomSets());
  const [view, setView] = useState<'list' | 'edit'>('list');
  const [draft, setDraft] = useState<CustomSet | null>(null);
  const [qDraft, setQDraft] = useState<Question | null>(null);
  const [editingQIndex, setEditingQIndex] = useState<number | null>(null);
  const [qError, setQError] = useState<string | null>(null);
  const [setError, setSetError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialSet) {
      setDraft({ ...initialSet, questions: [...initialSet.questions] });
      setView('edit');
    }
  }, [initialSet]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }

  function refresh() {
    setSets(loadCustomSets());
  }

  function handleCreate() {
    setDraft({
      id: `cs-${Date.now()}`,
      title: 'Новий набір',
      description: '',
      author: '',
      createdAt: Date.now(),
      questions: [],
    });
    setView('edit');
    setSetError(null);
  }

  function handleEdit(set: CustomSet) {
    setDraft({ ...set, questions: [...set.questions] });
    setView('edit');
    setSetError(null);
  }

  function handleDelete(id: string) {
    if (!confirm('Видалити набір?')) return;
    setSets(deleteSet(id));
  }

  function handleSaveSet() {
    if (!draft) return;
    if (!draft.title.trim()) {
      setSetError('Введи назву набору.');
      return;
    }
    if (draft.questions.length === 0) {
      setSetError('Додай хоча б одне питання.');
      return;
    }
    const saved = upsertSet(draft);
    setSets(saved);
    setView('list');
    showToast('Набір збережено');
  }

  function handleShare(set: CustomSet) {
    const link = `${window.location.origin}${window.location.pathname}?set=${encodeSet(set)}`;
    navigator.clipboard?.writeText(link).then(() => showToast('Посилання скопійовано')).catch(() => showToast('Не вдалося скопіювати'));
  }

  function handleExport(set: CustomSet) {
    exportSetFile(set);
    showToast('Файл експортовано');
  }

  async function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const imported = await importSetFile(file);
    if (!imported) {
      showToast('Невірний файл');
      return;
    }
    upsertSet(imported);
    refresh();
    showToast(`Імпортовано: ${imported.title}`);
    e.target.value = '';
  }

  function openNewQuestion() {
    setQDraft(newQuestion());
    setEditingQIndex(null);
    setQError(null);
  }

  function openEditQuestion(i: number) {
    if (!draft) return;
    setQDraft({ ...draft.questions[i], options: [...draft.questions[i].options] });
    setEditingQIndex(i);
    setQError(null);
  }

  function saveQuestion() {
    if (!draft || !qDraft) return;
    const err = validateQuestion(qDraft);
    if (err) {
      setQError(err);
      return;
    }
    const questions = [...draft.questions];
    if (editingQIndex === null) questions.push(qDraft);
    else questions[editingQIndex] = qDraft;
    setDraft({ ...draft, questions });
    setQDraft(null);
    setEditingQIndex(null);
  }

  function deleteQuestion(i: number) {
    if (!draft) return;
    const questions = draft.questions.filter((_, idx) => idx !== i);
    setDraft({ ...draft, questions });
  }

  function setQField<K extends keyof Question>(key: K, value: Question[K]) {
    if (!qDraft) return;
    setQDraft({ ...qDraft, [key]: value });
  }

  function setOption(i: number, value: string) {
    if (!qDraft) return;
    const opts = [...qDraft.options];
    opts[i] = value;
    setQDraft({ ...qDraft, options: opts });
  }

  function addOption() {
    if (!qDraft || qDraft.options.length >= 4) return;
    setQDraft({ ...qDraft, options: [...qDraft.options, ''] });
  }

  function removeOption(i: number) {
    if (!qDraft || qDraft.options.length <= 2) return;
    const opts = qDraft.options.filter((_, idx) => idx !== i);
    let ci = qDraft.correctIndex;
    if (ci >= opts.length) ci = opts.length - 1;
    if (ci < 0) ci = 0;
    setQDraft({ ...qDraft, options: opts, correctIndex: ci });
  }

  function handleKindChange(kind: QuestionKind) {
    if (!qDraft) return;
    const meta = KINDS.find((k) => k.id === kind)!;
    let opts = [...qDraft.options];
    while (opts.length < meta.options) opts.push('');
    opts = opts.slice(0, meta.options);
    setQDraft({ ...qDraft, kind, options: opts, correctIndex: Math.min(qDraft.correctIndex, opts.length - 1) });
  }

  // ── List view ────────────────────────────────────────────────
  if (view === 'list') {
    return (
      <div className="min-h-screen">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <button
              onClick={onHome}
              className="fe-icon-btn"
              aria-label="На головну"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="font-display text-xl font-extrabold uppercase tracking-wide text-white sm:text-2xl">
              Мої завдання
            </h1>
            <button
              onClick={handleCreate}
              className="fe-btn inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm"
              style={{ backgroundColor: '#ffd43b', color: '#14161c' }}
            >
              <Plus className="h-4 w-4" /> Створити
            </button>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl bg-cave-400/70 px-4 py-2.5 font-display text-xs font-extrabold uppercase tracking-wide text-steel-50 ring-1 ring-steel-500/60 transition hover:text-white hover:ring-steel-300"
            >
              <Upload className="h-4 w-4" /> Імпортувати JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={handleImportFile}
            />
            <span className="text-[11px] text-steel-100">
              {sets.length} наборів збережено
            </span>
          </div>

          {sets.length === 0 ? (
            <div className="fe-panel p-8 text-center">
              <BookOpen className="mx-auto h-10 w-10 text-steel-300" />
              <p className="mt-3 font-display text-sm font-extrabold uppercase tracking-wide text-steel-50">
                Поки що порожньо
              </p>
              <p className="mt-1 text-xs text-steel-100">
                Створи свій перший набір або імпортуй JSON.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {sets.map((s) => (
                <div key={s.id} className="fe-panel flex flex-col gap-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-sm font-extrabold uppercase tracking-wide text-white">
                        {s.title}
                      </h3>
                      {s.description && (
                        <p className="mt-0.5 line-clamp-2 text-[11px] text-steel-100">{s.description}</p>
                      )}
                    </div>
                    <span className="shrink-0 rounded-md bg-volt/15 px-2 py-0.5 font-display text-[10px] font-extrabold text-volt ring-1 ring-volt/40">
                      {s.questions.length} пит.
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => onPlay(s)}
                      className="fe-btn inline-flex flex-1 items-center justify-center gap-1.5 px-3 py-2 text-xs"
                      style={{ backgroundColor: '#3b9eff', color: '#fff' }}
                    >
                      <Play className="h-3.5 w-3.5" fill="currentColor" /> Грати
                    </button>
                    <button
                      onClick={() => handleEdit(s)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-cave-500/70 px-3 py-2 font-display text-[10px] font-extrabold uppercase tracking-wide text-steel-50 ring-1 ring-steel-500/60 transition hover:text-white"
                      aria-label="Редагувати"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleShare(s)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-cave-500/70 px-3 py-2 font-display text-[10px] font-extrabold uppercase tracking-wide text-steel-50 ring-1 ring-steel-500/60 transition hover:text-water"
                      aria-label="Поділитися"
                    >
                      <Link2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleExport(s)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-cave-500/70 px-3 py-2 font-display text-[10px] font-extrabold uppercase tracking-wide text-steel-50 ring-1 ring-steel-500/60 transition hover:text-white"
                      aria-label="Експорт"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-cave-500/70 px-3 py-2 font-display text-[10px] font-extrabold uppercase tracking-wide text-steel-50 ring-1 ring-steel-500/60 transition hover:bg-rose-500/15 hover:text-rose-300"
                      aria-label="Видалити"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {toast && (
            <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-slide-up rounded-xl bg-cave-400/95 px-4 py-2.5 text-xs font-bold text-white ring-1 ring-steel-500/60 shadow-lg">
              {toast}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Edit view ────────────────────────────────────────────────
  if (!draft) return null;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <button
            onClick={() => { setView('list'); setDraft(null); }}
            className="fe-icon-btn"
            aria-label="Назад"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-xl font-extrabold uppercase tracking-wide text-white sm:text-2xl">
            {draft.questions.length === 0 ? 'Новий набір' : 'Редагування'}
          </h1>
          <button
            onClick={handleSaveSet}
            className="fe-btn inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm"
            style={{ backgroundColor: '#7ed957', color: '#0f1115' }}
          >
            <Check className="h-4 w-4" strokeWidth={3} /> Зберегти
          </button>
        </div>

        {setError && (
          <div className="mb-3 rounded-xl bg-rose-500/12 p-3 text-xs font-semibold text-rose-300 ring-1 ring-rose-500/35">
            {setError}
          </div>
        )}

        <div className="fe-panel mb-4 p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-display text-[10px] font-extrabold uppercase tracking-[0.12em] text-steel-50">
                Назва набору
              </label>
              <input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className="w-full rounded-xl bg-cave-500/80 px-3 py-2.5 text-sm text-white ring-1 ring-steel-500/70 focus:ring-2 focus:ring-water outline-none"
                placeholder="Наприклад: Фізика 9 клас"
              />
            </div>
            <div>
              <label className="mb-1 block font-display text-[10px] font-extrabold uppercase tracking-[0.12em] text-steel-50">
                Автор (необов’язково)
              </label>
              <input
                value={draft.author}
                onChange={(e) => setDraft({ ...draft, author: e.target.value })}
                className="w-full rounded-xl bg-cave-500/80 px-3 py-2.5 text-sm text-white ring-1 ring-steel-500/70 focus:ring-2 focus:ring-water outline-none"
                placeholder="Твоє ім’я"
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="mb-1 block font-display text-[10px] font-extrabold uppercase tracking-[0.12em] text-steel-50">
              Опис
            </label>
            <textarea
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              rows={2}
              className="w-full resize-none rounded-xl bg-cave-500/80 px-3 py-2.5 text-sm text-white ring-1 ring-steel-500/70 focus:ring-2 focus:ring-water outline-none"
              placeholder="Короткий опис теми"
            />
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-white">
            Питання ({draft.questions.length})
          </h2>
          <button
            onClick={openNewQuestion}
            className="inline-flex items-center gap-1.5 rounded-xl bg-water/15 px-3 py-2 font-display text-[10px] font-extrabold uppercase tracking-wide text-water ring-1 ring-water/40 transition hover:bg-water/25"
          >
            <Plus className="h-3.5 w-3.5" /> Додати
          </button>
        </div>

        {draft.questions.length === 0 ? (
          <div className="fe-panel p-6 text-center text-xs text-steel-100">
            Питань ще немає. Натисни «Додати».
          </div>
        ) : (
          <div className="space-y-2">
            {draft.questions.map((q, i) => (
              <div
                key={q.id}
                className="fe-panel flex items-start gap-3 p-3"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-volt/15 font-display text-[10px] font-extrabold text-volt ring-1 ring-volt/40">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-semibold text-white">{q.prompt || '—'}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wide text-steel-100">
                    {KINDS.find((k) => k.id === q.kind)?.label ?? q.kind} · {q.options.length} вар.
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    onClick={() => openEditQuestion(i)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-steel-50 ring-1 ring-steel-500/60 transition hover:text-white"
                    aria-label="Редагувати"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => deleteQuestion(i)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-steel-50 ring-1 ring-steel-500/60 transition hover:bg-rose-500/15 hover:text-rose-300"
                    aria-label="Видалити"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Question editor modal */}
      {qDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          <div className="absolute inset-0 bg-cave-900/80 backdrop-blur-md" onClick={() => setQDraft(null)} />
          <div className="relative z-10 max-h-[92vh] w-full max-w-2xl animate-pop-in overflow-hidden rounded-3xl border-2 border-steel-500/70 bg-cave-300 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.95)]">
            <div className="hazard-strip h-2 w-full shrink-0" aria-hidden="true" />
            <div className="flex items-center justify-between gap-3 border-b border-steel-500/60 bg-cave-400/70 px-5 py-4">
              <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-white">
                {editingQIndex === null ? 'Нове питання' : 'Редагувати питання'}
              </h3>
              <button onClick={() => setQDraft(null)} className="fe-icon-btn" aria-label="Закрити">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              {qError && (
                <div className="mb-3 rounded-xl bg-rose-500/12 p-3 text-xs font-semibold text-rose-300 ring-1 ring-rose-500/35">
                  {qError}
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-display text-[10px] font-extrabold uppercase tracking-[0.12em] text-steel-50">
                    Вид питання
                  </label>
                  <select
                    value={qDraft.kind ?? 'choice'}
                    onChange={(e) => handleKindChange(e.target.value as QuestionKind)}
                    className="w-full rounded-xl bg-cave-500/80 px-3 py-2.5 text-sm text-white ring-1 ring-steel-500/70 focus:ring-2 focus:ring-water outline-none"
                  >
                    {KINDS.map((k) => (
                      <option key={k.id} value={k.id}>{k.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block font-display text-[10px] font-extrabold uppercase tracking-[0.12em] text-steel-50">
                    Предмет
                  </label>
                  <select
                    value={qDraft.subject}
                    onChange={(e) => {
                      const s = e.target.value as SubjectId;
                      setQDraft({ ...qDraft, subject: s, topic: (TOPICS[s] ?? [])[0]?.id ?? '' });
                    }}
                    className="w-full rounded-xl bg-cave-500/80 px-3 py-2.5 text-sm text-white ring-1 ring-steel-500/70 focus:ring-2 focus:ring-water outline-none"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3">
                <label className="mb-1 block font-display text-[10px] font-extrabold uppercase tracking-[0.12em] text-steel-50">
                  Тема
                </label>
                <select
                  value={qDraft.topic}
                  onChange={(e) => setQDraft({ ...qDraft, topic: e.target.value })}
                  className="w-full rounded-xl bg-cave-500/80 px-3 py-2.5 text-sm text-white ring-1 ring-steel-500/70 focus:ring-2 focus:ring-water outline-none"
                >
                  {(TOPICS[qDraft.subject] ?? []).map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div className="mt-3">
                <label className="mb-1 block font-display text-[10px] font-extrabold uppercase tracking-[0.12em] text-steel-50">
                  Текст питання
                </label>
                <textarea
                  value={qDraft.prompt}
                  onChange={(e) => setQDraft({ ...qDraft, prompt: e.target.value })}
                  rows={3}
                  className="w-full resize-none rounded-xl bg-cave-500/80 px-3 py-2.5 text-sm text-white ring-1 ring-steel-500/70 focus:ring-2 focus:ring-water outline-none"
                  placeholder="Введи питання…"
                />
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="font-display text-[10px] font-extrabold uppercase tracking-[0.12em] text-steel-50">
                    Варіанти відповіді
                  </label>
                  <div className="flex items-center gap-1.5">
                    {qDraft.options.length < 4 && (
                      <button
                        onClick={addOption}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-steel-50 ring-1 ring-steel-500/60 transition hover:text-white"
                        aria-label="Додати варіант"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  {qDraft.options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <button
                        onClick={() => setQDraft({ ...qDraft, correctIndex: i })}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-display text-sm font-extrabold transition ${
                          qDraft.correctIndex === i
                            ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                            : 'bg-cave-600 text-steel-100 ring-1 ring-steel-500/60 hover:text-white'
                        }`}
                        aria-label={`Правильний: варіант ${i + 1}`}
                      >
                        {String.fromCharCode(65 + i)}
                      </button>
                      <input
                        value={opt}
                        onChange={(e) => setOption(i, e.target.value)}
                        className="flex-1 rounded-xl bg-cave-500/80 px-3 py-2.5 text-sm text-white ring-1 ring-steel-500/70 focus:ring-2 focus:ring-water outline-none"
                        placeholder={`Варіант ${i + 1}`}
                      />
                      {qDraft.options.length > 2 && (
                        <button
                          onClick={() => removeOption(i)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-steel-50 ring-1 ring-steel-500/60 transition hover:bg-rose-500/15 hover:text-rose-300"
                          aria-label="Видалити варіант"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-1.5 text-[10px] text-steel-100">
                  Натисни на літеру, щоб позначити правильний варіант.
                </p>
              </div>

              <div className="mt-3">
                <label className="mb-1 block font-display text-[10px] font-extrabold uppercase tracking-[0.12em] text-steel-50">
                  Пояснення
                </label>
                <textarea
                  value={qDraft.explanation}
                  onChange={(e) => setQDraft({ ...qDraft, explanation: e.target.value })}
                  rows={3}
                  className="w-full resize-none rounded-xl bg-cave-500/80 px-3 py-2.5 text-sm text-white ring-1 ring-steel-500/70 focus:ring-2 focus:ring-water outline-none"
                  placeholder="Коротке пояснення правильної відповіді…"
                />
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 border-t border-steel-500/60 bg-cave-400/80 px-5 py-4">
              <button
                onClick={saveQuestion}
                className="fe-btn inline-flex flex-1 items-center justify-center gap-2 px-5 py-3 text-sm"
                style={{ backgroundColor: '#7ed957', color: '#0f1115' }}
              >
                <Check className="h-4 w-4" strokeWidth={3} /> Зберегти питання
              </button>
              <button
                onClick={() => setQDraft(null)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cave-500/70 px-4 py-3 font-display text-xs font-extrabold uppercase tracking-wide text-steel-50 ring-1 ring-steel-500/60 transition hover:text-white"
              >
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
