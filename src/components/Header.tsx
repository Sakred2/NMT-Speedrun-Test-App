import { Volume2, VolumeX, Settings, Zap, Brain, Pencil } from 'lucide-react';
import FlyingText from '@/components/FlyingText';

interface Props {
  onOpenSettings: () => void;
  onOpenEditor: () => void;
  source: 'openrouter' | 'mock' | 'custom' | null;
  soundOn: boolean;
  onToggleSound: () => void;
}

export default function Header({ onOpenSettings, onOpenEditor, source, soundOn, onToggleSound }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-steel-500/80 bg-cave-400/95 backdrop-blur-md">
      <div className="hazard-strip h-1.5 w-full opacity-80" aria-hidden="true" />
      <div className="h-px w-full bg-gradient-to-r from-water via-volt to-lava" aria-hidden="true" />

      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 rotate-[-4deg] items-center justify-center rounded-xl bg-gradient-to-br from-volt-glow via-volt to-volt-deep text-cave-700 ring-2 ring-volt-glow/50 transition-transform duration-300 hover:rotate-0">
            <Zap className="h-6 w-6" fill="currentColor" strokeWidth={2.5} />
            <span className="absolute inset-x-1.5 top-1 h-px rounded-full bg-white/60" aria-hidden="true" />
          </div>

          <div className="min-w-0 leading-none">
            <div className="flex items-center gap-2">
              <h1 className="truncate font-display text-base font-extrabold uppercase tracking-tight text-white sm:text-lg">
                <FlyingText text="NMT" />{' '}
                <span className="text-volt"><FlyingText text="Flood" /></span>{' '}
                <FlyingText text="Run" />
              </h1>
              <span className="hidden rounded-md bg-volt/15 px-1.5 py-0.5 font-display text-[9px] font-extrabold uppercase tracking-[0.18em] text-volt ring-1 ring-volt/40 sm:inline-block">
                v2
              </span>
            </div>
            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-steel-100">
              Втечи від питань
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {source && (
            <span
              className={`hidden items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-display text-[10px] font-extrabold uppercase tracking-wide ring-1 sm:inline-flex ${
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
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
              </span>
              <Brain className="h-3.5 w-3.5" />
              {source === 'openrouter' ? 'AI' : 'Локально'}
            </span>
          )}

          <button
            onClick={onOpenEditor}
            className="fe-icon-btn group"
            aria-label="Редактор завдань"
            title="Мої завдання"
          >
            <Pencil className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
          </button>

          <button
            onClick={onToggleSound}
            className="fe-icon-btn"
            aria-label={soundOn ? 'Вимкнути звук' : 'Увімкнути звук'}
            title={soundOn ? 'Звук увімкнено' : 'Звук вимкнено'}
          >
            {soundOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button>
          <button
            onClick={onOpenSettings}
            className="fe-icon-btn group"
            aria-label="Налаштування OpenRouter"
            title="Налаштування"
          >
            <Settings className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>
      </div>
    </header>
  );
}
