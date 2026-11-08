import { RotateCcw, Home, Droplet } from 'lucide-react';

interface Props {
  onRetry: () => void;
  onHome: () => void;
}

export default function DrownedScreen({ onRetry, onHome }: Props) {
  return (
    <div className="animate-pop-in">
      <div
        className="fe-panel relative overflow-hidden p-8 text-center ring-2 ring-rose-500/50 sm:p-12"
        style={{ boxShadow: '0 0 40px rgba(255,90,90,0.25), 0 8px 24px rgba(0,0,0,0.5)' }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(circle at 50% 30%, #ff6464, transparent 60%)' }}
        />
        {/* danger stripes */}
        <div
          className="relative mb-5 h-3 rounded-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #ff5a5a, #ff5a5a 10px, #1a1d24 10px, #1a1d24 20px)',
          }}
        />
        <div className="relative">
          <div className="mx-auto mb-4 flex h-24 w-24 animate-float items-center justify-center rounded-3xl fe-btn bg-rose-600 text-white">
            <Droplet className="h-12 w-12" fill="currentColor" />
          </div>
          <p className="text-xs font-800 uppercase tracking-[0.25em] text-rose-300/80">ВИ ВТОПИЛИСЯ</p>
          <h2 className="font-display text-3xl font-900 uppercase text-rose-400 sm:text-4xl">
            ПОТОП ЗАБРАВ ВАС
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-steel-50/80">
            Повітря закінчилось, поки ви гаюлись. Потоп не чекає — наступного разу відповідайте швидше!
          </p>
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
    </div>
  );
}
