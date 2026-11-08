import { Volume2, VolumeX, Settings, Zap, Brain } from 'lucide-react';

interface Props {
  onOpenSettings: () => void;
  source: 'openrouter' | 'mock' | null;
  soundOn: boolean;
  onToggleSound: () => void;
}

export default function Header({ onOpenSettings, source, soundOn, onToggleSound }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-steel-500/40 bg-cave-400/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="fe-btn flex h-9 w-9 items-center justify-center bg-gradient-to-br from-volt to-volt-deep text-cave-700">
            <Zap className="h-5 w-5" fill="currentColor" />
          </div>
          <div className="leading-tight">
            <h1 className="font-display text-base font-800 text-white">
              NMT <span className="text-volt">FLOOD</span> RUN
            </h1>
            <p className="text-[11px] font-600 text-steel-100">Втечи від питань</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {source && (
            <span
              className={`hidden items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-700 uppercase tracking-wide ring-1 sm:inline-flex ${
                source === 'openrouter'
                  ? 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/40'
                  : 'bg-volt/15 text-volt ring-volt/40'
              }`}
              title={
                source === 'openrouter'
                  ? 'Питання згенеровано AI'
                  : 'Локальна база питань (Mock-режим)'
              }
            >
              <Brain className="h-3.5 w-3.5" />
              {source === 'openrouter' ? 'AI' : 'Локально'}
            </span>
          )}
          <button
            onClick={onToggleSound}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-steel-50 transition hover:bg-steel-400/40 hover:text-white"
            aria-label={soundOn ? 'Вимкнути звук' : 'Увімкнути звук'}
            title={soundOn ? 'Звук увімкнено' : 'Звук вимкнено'}
          >
            {soundOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button>
          <button
            onClick={onOpenSettings}
            className="group flex h-10 w-10 items-center justify-center rounded-xl text-steel-50 transition hover:rotate-45 hover:bg-steel-400/40 hover:text-volt"
            aria-label="Налаштування OpenRouter"
          >
            <Settings className="h-5 w-5 transition" />
          </button>
        </div>
      </div>
    </header>
  );
}
