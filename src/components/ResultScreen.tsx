import { RotateCcw, Home, Sparkles, Trophy } from 'lucide-react';

interface Props {
  correct: number;
  total: number;
  score: number;
  onRetry: () => void;
  onHome: () => void;
}

const TIERS = [
  { min: 80, label: 'ESCAPED!', emoji: '🏆', color: '#ffd43b', sub: 'Ти втік без потопу' },
  { min: 60, label: 'ПОЧАСТКОВО ВРЯТОВАНО', emoji: '🎉', color: '#7ed957', sub: 'Майже втік' },
  { min: 40, label: 'ЗАБРАЛО НОГИ', emoji: '💪', color: '#3b9eff', sub: 'Треба швидше' },
  { min: 0, label: 'ПОТОП ЗАБРАВ', emoji: '🌊', color: '#ff7a3d', sub: 'Спробуй ще раз' },
];

export default function ResultScreen({ correct, total, score, onRetry, onHome }: Props) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const tier = TIERS.find((t) => pct >= t.min) ?? TIERS[TIERS.length - 1];

  return (
    <div className="animate-pop-in">
      <div
        className="fe-panel relative overflow-hidden p-6 text-center sm:p-10"
        style={{ boxShadow: `0 0 40px ${tier.color}44, 0 8px 24px rgba(0,0,0,0.5)` }}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{ background: `radial-gradient(circle at 50% 30%, ${tier.color}, transparent 60%)` }}
        />
        {/* danger stripes top */}
        <div
          className="relative mb-4 h-3 rounded-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #ffd43b, #ffd43b 10px, #1a1d24 10px, #1a1d24 20px)',
          }}
        />
        <div className="relative">
          <div
            className="mx-auto mb-3 flex h-20 w-20 animate-float items-center justify-center rounded-2xl fe-btn text-5xl"
            style={{ backgroundColor: tier.color, color: '#0f1115' }}
          >
            {tier.emoji}
          </div>
          <p className="text-xs font-800 uppercase tracking-[0.2em] text-steel-100">ТЕСТ ЗАВЕРШЕНО</p>
          <h2 className="font-display text-2xl font-900 uppercase sm:text-3xl" style={{ color: tier.color }}>
            {tier.label}
          </h2>
          <p className="mt-1 text-sm text-steel-50/70">{tier.sub}</p>

          <div className="mx-auto mt-5 max-w-xs">
            <div className="mb-2 flex items-end justify-center gap-1">
              <span className="font-display text-6xl font-900 tabular-nums" style={{ color: tier.color }}>
                {pct}
              </span>
              <span className="mb-2 text-2xl font-800" style={{ color: tier.color }}>%</span>
            </div>
            <p className="text-sm font-700 text-steel-50/85">
              {correct} з {total} правильних
            </p>
          </div>

          <div
            className="mx-auto mt-5 inline-flex items-center gap-2 rounded-md px-5 py-2 ring-1"
            style={{ backgroundColor: `${tier.color}22`, color: tier.color, borderColor: tier.color }}
          >
            <Sparkles className="h-4 w-4" />
            <span className="font-display font-800">{score} БАЛІВ</span>
          </div>
        </div>
      </div>

      {/* Score breakdown — blocky stat panels */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="fe-panel p-4 text-center ring-1 ring-emerald-500/40">
          <p className="font-display text-2xl font-900 text-emerald-400">{correct}</p>
          <p className="text-xs font-800 uppercase text-steel-100">Врятовано</p>
        </div>
        <div className="fe-panel p-4 text-center ring-1 ring-rose-500/40">
          <p className="font-display text-2xl font-900 text-rose-400">{total - correct}</p>
          <p className="text-xs font-800 uppercase text-steel-100">Потоп</p>
        </div>
        <div className="fe-panel p-4 text-center ring-1 ring-volt/40">
          <p className="font-display text-2xl font-900 text-volt">{score}</p>
          <p className="text-xs font-800 uppercase text-steel-100">Бали</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onRetry}
          className="fe-btn inline-flex flex-1 items-center justify-center gap-2 px-6 py-3.5"
          style={{ backgroundColor: '#ffd43b' }}
        >
          <RotateCcw className="h-5 w-5" />
          ЩЕ РЕЙС
        </button>
        <button
          onClick={onHome}
          className="fe-btn inline-flex items-center justify-center gap-2 px-6 py-3.5"
          style={{ backgroundColor: '#1a1d24', color: '#cfd4dd' }}
        >
          <Home className="h-5 w-5" />
          ЛОБІ
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-steel-100">
        <Trophy className="h-3.5 w-3.5 text-volt" />
        <span className="font-700 uppercase tracking-wide">Найкращі втікачі — ті, хто не здаються</span>
      </div>
    </div>
  );
}
