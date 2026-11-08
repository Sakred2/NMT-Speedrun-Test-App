import { Lightbulb, ChevronRight, Check, X, CircleHelp, PenLine, ListChecks, Link2, ArrowUpDown, Scale, Tag, AlertTriangle, Calculator, Sparkles } from 'lucide-react';
import type { Question } from '@/types';
import type { Element } from '@/data/subjects';
import { ELEMENT_COLOR } from '@/data/subjects';

interface Props {
  question: Question;
  index: number;
  total: number;
  selectedIndex: number | null;
  answered: boolean;
  element: Element;
  /** 0..100 — how much of the content is underwater */
  floodPct: number;
  onSelect: (index: number) => void;
  onNext: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuestionCard({
  question, index, total, selectedIndex, answered, element, floodPct, onSelect, onNext,
}: Props) {
  const correct = selectedIndex === question.correctIndex;
  const color = ELEMENT_COLOR[element];
  const underwater = floodPct >= 100;
  const kind = question.kind ?? 'choice';
  const kindMeta = {
    choice: { label: 'ОБЕРИ ВІДПОВІДЬ', icon: ListChecks },
    trueFalse: { label: 'ПРАВДА ЧИ НІ?', icon: CircleHelp },
    fillBlank: { label: 'ЗАПОВНИ ПРОПУСК', icon: PenLine },
    matching: { label: 'ЗІСТАВЛЕННЯ', icon: Link2 },
    ordering: { label: 'ПОСЛІДОВНІСТЬ', icon: ArrowUpDown },
    compare: { label: 'ПОРІВНЯННЯ', icon: Scale },
    classify: { label: 'КЛАСИФІКАЦІЯ', icon: Tag },
    errorFind: { label: 'ЗНАЙДИ ПОМИЛКУ', icon: AlertTriangle },
    calculation: { label: 'ОБЧИСЛЕННЯ', icon: Calculator },
    analogy: { label: 'АНАЛОГІЯ', icon: Sparkles },
  }[kind] ?? { label: 'ОБЕРИ ВІДПОВІДЬ', icon: ListChecks };
  const KindIcon = kindMeta.icon;
  const optionLabels = kind === 'trueFalse' ? ['ТАК', 'НІ'] : LETTERS;

  function optionClasses(i: number): string {
    const base =
      'fe-btn group relative flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5 sm:py-5';
    if (!answered) {
      return `${base} ring-1 ring-steel-500/50`;
    }
    if (i === question.correctIndex) {
      return `${base} !bg-emerald-500 !text-white ring-2 ring-emerald-300`;
    }
    if (i === selectedIndex && i !== question.correctIndex) {
      return `${base} !bg-rose-600 !text-white ring-2 ring-rose-300 animate-shake`;
    }
    return `${base} ring-1 ring-steel-500/50 opacity-40`;
  }

  function letterClasses(i: number): string {
    const base =
      'fe-btn flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm';
    if (!answered) return `${base} !bg-cave-600 !text-steel-50`;
    if (i === question.correctIndex) return `${base} !bg-emerald-700 !text-white`;
    if (i === selectedIndex && i !== question.correctIndex) return `${base} !bg-rose-800 !text-white`;
    return `${base} !bg-cave-600 !text-steel-200`;
  }

  return (
    <div className="animate-slide-up">
      {/* type, topic + counter */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-800 uppercase tracking-wide"
          style={{ backgroundColor: `${color}22`, color }}
        >
          <KindIcon className="h-3.5 w-3.5" /> {kindMeta.label}
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-cave-600 px-2.5 py-1 text-xs font-700 uppercase tracking-wide text-steel-100">
          ◆ {question.topic}
        </span>
        <span className="text-xs font-700 uppercase tracking-wide text-steel-100">
          {index + 1} / {total}
        </span>
      </div>

      {/* Flooded zone — question + answers with rising water on top */}
      <div className="relative overflow-hidden rounded-xl">
        {/* content */}
        <div className="relative z-10">
          <h2 className="mb-5 px-1 font-display text-xl font-800 leading-snug text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.7)] sm:text-2xl">
            {kind === 'fillBlank'
              ? question.prompt.split('___').map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span
                        className="mx-1 inline-block min-w-[3rem] rounded-md border-b-2 px-1 text-center"
                        style={{ borderColor: color, color, backgroundColor: `${color}18` }}
                      >___</span>
                    )}
                  </span>
                ))
              : question.prompt}
          </h2>

          {/* answer options — layout adapts to kind */}
          {kind === 'trueFalse' || (kind === 'compare' && question.options.length === 2) ? (
            <div className="grid grid-cols-2 gap-3 px-1 pb-1">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  disabled={answered}
                  onClick={() => onSelect(i)}
                  className={optionClasses(i)}
                  style={!answered ? { backgroundColor: '#1a1d24', color: '#e2e6ee' } : undefined}
                >
                  <span className="flex-1 text-center font-800 text-base">{opt}</span>
                  {answered && i === question.correctIndex && <Check className="h-5 w-5 text-white" />}
                  {answered && i === selectedIndex && i !== question.correctIndex && <X className="h-5 w-5 text-white" />}
                </button>
              ))}
            </div>
          ) : (
            <div className="grid gap-3 px-1 pb-1">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  disabled={answered}
                  onClick={() => onSelect(i)}
                  className={optionClasses(i)}
                  style={!answered ? { backgroundColor: '#1a1d24', color: '#e2e6ee' } : undefined}
                >
                  <span className={letterClasses(i)}>{LETTERS[i]}</span>
                  <span className="flex-1 font-700">{opt}</span>
                  {answered && i === question.correctIndex && <Check className="h-5 w-5 text-white" />}
                  {answered && i === selectedIndex && i !== question.correctIndex && <X className="h-5 w-5 text-white" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* rising water layer — sits on top of content, fills from bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 transition-all duration-1000 ease-linear"
          style={{
            height: `${floodPct}%`,
            background: `linear-gradient(180deg, ${color}40 0%, ${color}66 35%, ${color}80 100%)`,
          }}
        >
          {/* wavy surface line at the top of the water */}
          <div
            className="absolute -top-1.5 left-0 right-0 h-3 animate-pulse-glow"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              borderRadius: '50%',
            }}
          />
          {/* subtle wave shimmer */}
          <div
            className="absolute top-0 left-0 right-0 h-6 opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 8px, transparent 8px, transparent 24px)',
            }}
          />
          {/* bubbles inside the water */}
          {floodPct > 10 && (
            <>
              <span className="uw-bubble" style={{ left: '15%', width: '6px', height: '6px', animationDuration: '4s', animationDelay: '0s' }} />
              <span className="uw-bubble" style={{ left: '45%', width: '4px', height: '4px', animationDuration: '3.5s', animationDelay: '1.2s' }} />
              <span className="uw-bubble" style={{ left: '75%', width: '8px', height: '8px', animationDuration: '5s', animationDelay: '0.6s' }} />
              <span className="uw-bubble" style={{ left: '88%', width: '5px', height: '5px', animationDuration: '4.5s', animationDelay: '2s' }} />
            </>
          )}
        </div>
      </div>

      {/* explanation + next — always above water so they remain usable */}
      {answered && (
        <div className="mt-5 animate-slide-up">
          <div
            className={`fe-panel p-4 sm:p-5 ring-2 ${
              correct ? 'ring-emerald-500/60' : 'ring-rose-500/60'
            }`}
          >
            <div className="mb-2 flex items-center gap-2">
              <Lightbulb className={`h-5 w-5 ${correct ? 'text-emerald-400' : 'text-rose-400'}`} />
              <span className={`font-display font-800 uppercase ${correct ? 'text-emerald-400' : 'text-rose-400'}`}>
                {correct ? 'Врятовано!' : 'Потоп! Правильно: ' + (optionLabels[question.correctIndex] ?? LETTERS[question.correctIndex])}
              </span>
            </div>
            <div className="rounded-xl bg-cave-600/70 p-3 ring-1 ring-steel-500/40">
              <div
                className="mb-1 flex items-center gap-1.5 text-xs font-800 uppercase tracking-wide"
                style={{ color }}
              >
                <Lightbulb className="h-3.5 w-3.5" /> AI TUTOR
              </div>
              <p className="text-sm leading-relaxed text-steel-50">{question.explanation}</p>
            </div>
          </div>

          <button
            onClick={onNext}
            className="fe-btn mt-4 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5"
            style={{ backgroundColor: color }}
          >
            {index + 1 >= total ? 'ФІНАЛ' : 'ДАЛІ'}
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
