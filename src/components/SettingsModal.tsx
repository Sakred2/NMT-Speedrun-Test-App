import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  X, KeyRound, Trash2, Check, Eye, EyeOff, Sparkles, ExternalLink,
  Loader2, AlertCircle, Zap, ChevronDown, Cpu, Music, Volume2, VolumeX,
  Settings,
} from 'lucide-react';
import {
  DEFAULT_MODEL, MODEL_OPTIONS, testConnection,
} from '@/lib/openrouter';
import type { TestConnectionResult } from '@/lib/openrouter';
import {
  saveApiKey, getApiKey, clearApiKey,
  getModel, saveModel,
  getMusicOn, saveMusicOn, getMusicVolume, saveMusicVolume,
  getSfxVolume, saveSfxVolume,
} from '@/lib/storage';
import { setMusicVol as setMusicModuleVol, applyMusicSettings } from '@/lib/music';
import { refreshSfxVolume } from '@/lib/sounds';

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

type TestState = 'idle' | 'testing' | 'done';

function SectionTitle({
  icon, title, hint, color = '#3b9eff',
}: {
  icon: ReactNode;
  title: string;
  hint: string;
  color?: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-2.5">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}1f`, color, boxShadow: `inset 0 0 0 1px ${color}55` }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-white">
          {title}
        </h3>
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-steel-100">{hint}</p>
      </div>
      <span
        aria-hidden="true"
        className="ml-1 h-[3px] flex-1 rounded-full"
        style={{ backgroundImage: `repeating-linear-gradient(90deg, ${color}55 0 7px, transparent 7px 12px)` }}
      />
    </div>
  );
}

export default function SettingsModal({ open, onClose, onSaved }: Props) {
  const [value, setValue] = useState(getApiKey() ?? '');
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);

  const [model, setModel] = useState(getModel() || DEFAULT_MODEL);
  const [modelOpen, setModelOpen] = useState(false);

  const [testState, setTestState] = useState<TestState>('idle');
  const [testResult, setTestResult] = useState<TestConnectionResult | null>(null);

  const [musicOn, setMusicOn] = useState(getMusicOn());
  const [musicVol, setMusicVol] = useState(getMusicVolume());
  const [sfxVol, setSfxVol] = useState(getSfxVolume());

  if (!open) return null;

  function handleSave() {
    saveApiKey(value);
    saveModel(model);
    saveMusicOn(musicOn);
    saveMusicVolume(musicVol);
    saveSfxVolume(sfxVol);
    setMusicModuleVol(musicVol);
    applyMusicSettings();
    refreshSfxVolume();
    setSaved(true);
    onSaved();
    setTimeout(() => setSaved(false), 1600);
  }

  function handleClear() {
    clearApiKey();
    setValue('');
    onSaved();
  }

  async function handleTest() {
    setTestState('testing');
    setTestResult(null);
    const res = await testConnection(value, model);
    setTestResult(res);
    setTestState('done');
  }

  const selectedOption = MODEL_OPTIONS.find((m) => m.id === model);
  const aiOn = value.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div
        className="absolute inset-0 bg-cave-900/80 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl animate-pop-in flex-col overflow-hidden rounded-3xl border-2 border-steel-500/70 bg-cave-300 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.95)]">
        <div className="hazard-strip h-2 w-full shrink-0" aria-hidden="true" />

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-steel-500/60 bg-cave-400/70 px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex min-w-0 items-center gap-3.5">
            <div
              className="flex h-12 w-12 shrink-0 rotate-[-3deg] items-center justify-center rounded-2xl bg-gradient-to-br from-volt-glow via-volt to-volt-deep text-cave-700 ring-2 ring-volt-glow/40"
              style={{ boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.4), 0 10px 24px -10px rgba(255,212,59,0.7)' }}
            >
              <Settings className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.26em] text-steel-100">
                Control room
              </p>
              <h2 className="mt-0.5 truncate font-display text-xl font-extrabold uppercase tracking-wide text-white sm:text-2xl">
                Налаштування
              </h2>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            <span
              className={`hidden items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-display text-[10px] font-extrabold uppercase tracking-wide ring-1 sm:inline-flex ${
                aiOn
                  ? 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/40'
                  : 'bg-volt/15 text-volt ring-volt/40'
              }`}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
              </span>
              {aiOn ? 'AI-режим' : 'Локальний режим'}
            </span>
            <button
              onClick={onClose}
              className="fe-icon-btn"
              aria-label="Закрити налаштування"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          <div className="grid gap-6 md:grid-cols-2 md:gap-7">
            {/* AI / API */}
            <section>
              <SectionTitle
                icon={<KeyRound className="h-4 w-4" />}
                title="AI-підключення"
                hint="OpenRouter · API-ключ"
                color="#3b9eff"
              />

              <div className="rounded-2xl border border-steel-500/60 bg-cave-400/70 p-4 sm:p-5">
                <label
                  htmlFor="api-key"
                  className="mb-1.5 block font-display text-[11px] font-extrabold uppercase tracking-[0.12em] text-steel-50"
                >
                  API-ключ OpenRouter
                </label>

                <div className="relative">
                  <input
                    id="api-key"
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="sk-or-v1-..."
                    spellCheck={false}
                    autoComplete="off"
                    className="w-full rounded-xl bg-cave-500/80 px-4 py-3.5 pr-12 font-mono text-sm text-white outline-none ring-1 ring-steel-500/70 transition placeholder:text-steel-100/50 focus:ring-2 focus:ring-water"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-100 transition hover:text-white"
                    aria-label={show ? 'Сховати ключ' : 'Показати ключ'}
                  >
                    {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="mt-3 flex items-start gap-2 rounded-xl bg-water/10 p-3 text-[11px] leading-relaxed text-water-glow ring-1 ring-water/25">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    Ключ зберігається лише у твоєму браузері (localStorage) і нікуди не передається,
                    крім запитів до OpenRouter. Без ключа додаток використовує вбудовану базу питань.
                  </p>
                </div>

                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 font-display text-[11px] font-extrabold uppercase tracking-wide text-water transition hover:text-water-glow"
                >
                  Отримати ключ на openrouter.ai
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                {/* Model */}
                <div className="mt-5">
                  <label className="mb-1.5 flex items-center gap-1.5 font-display text-[11px] font-extrabold uppercase tracking-[0.12em] text-steel-50">
                    <Cpu className="h-3.5 w-3.5 text-water" /> Модель ШІ
                  </label>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setModelOpen((o) => !o)}
                      aria-expanded={modelOpen}
                      className="flex w-full items-center justify-between gap-2 rounded-xl bg-cave-500/80 px-4 py-3.5 text-left ring-1 ring-steel-500/70 transition hover:ring-steel-300"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="truncate text-sm font-bold text-white">
                          {selectedOption?.label ?? model}
                        </span>
                        {selectedOption?.badge && (
                          <span
                            className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ring-1 ${
                              selectedOption.badge === 'free'
                                ? 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/40'
                                : 'bg-amber-500/15 text-amber-300 ring-amber-500/40'
                            }`}
                          >
                            {selectedOption.badge}
                          </span>
                        )}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-steel-100 transition ${modelOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {modelOpen && (
                      <div className="absolute bottom-full z-20 mb-2 max-h-60 w-full animate-slide-up overflow-y-auto rounded-xl border border-steel-500/70 bg-cave-400 p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)]">
                        {MODEL_OPTIONS.map((m) => {
                          const active = m.id === model;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => {
                                setModel(m.id);
                                setModelOpen(false);
                                setTestState('idle');
                                setTestResult(null);
                              }}
                              className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left transition ${
                                active ? 'bg-volt/15 text-volt' : 'text-steel-50 hover:bg-steel-500/40 hover:text-white'
                              }`}
                            >
                              <span className="flex min-w-0 items-center gap-2">
                                <span className="truncate text-sm font-bold">{m.label}</span>
                                {m.badge && (
                                  <span
                                    className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ${
                                      m.badge === 'free'
                                        ? 'bg-emerald-500/15 text-emerald-300'
                                        : 'bg-amber-500/15 text-amber-300'
                                    }`}
                                  >
                                    {m.badge}
                                  </span>
                                )}
                              </span>
                              {active && <Check className="h-4 w-4 shrink-0 text-volt" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <p className="mt-1.5 text-[11px] text-steel-100">
                    Усі моделі <span className="font-bold text-emerald-300">free</span> — безкоштовні на OpenRouter.
                  </p>
                </div>

                {/* Test */}
                <button
                  type="button"
                  onClick={handleTest}
                  disabled={testState === 'testing'}
                  className="fe-btn mt-4 inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm"
                  style={{ backgroundColor: '#3b9eff', color: '#ffffff' }}
                >
                  {testState === 'testing' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Перевіряю…
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5" fill="currentColor" />
                      Перевірити з'єднання
                    </>
                  )}
                </button>

                {testState === 'done' && testResult && (
                  <div
                    className={`mt-3 flex items-start gap-2 rounded-xl p-3 text-xs font-semibold ring-1 animate-slide-up ${
                      testResult.ok
                        ? 'bg-emerald-500/12 text-emerald-300 ring-emerald-500/35'
                        : 'bg-rose-500/12 text-rose-300 ring-rose-500/35'
                    }`}
                  >
                    {testResult.ok ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0" />
                    ) : (
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    )}
                    <p>{testResult.message}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Audio */}
            <section>
              <SectionTitle
                icon={<Music className="h-4 w-4" />}
                title="Аудіо"
                hint="Музика та ефекти"
                color="#f472b6"
              />

              <div className="space-y-3 rounded-2xl border border-steel-500/60 bg-cave-400/70 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3 rounded-xl bg-cave-500/60 p-3 ring-1 ring-steel-500/50">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ember/15 text-ember ring-1 ring-ember/30">
                      <Music className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-display text-xs font-extrabold uppercase tracking-wide text-white">
                        Фонова музика
                      </p>
                      <p className="truncate text-[11px] text-steel-100">Nuclear Blizzard [V2]</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setMusicOn((v) => !v)}
                    role="switch"
                    aria-checked={musicOn}
                    aria-label="Перемкнути музику"
                    className={`relative h-9 w-16 shrink-0 rounded-full transition-colors duration-200 ${
                      musicOn ? 'bg-volt' : 'bg-steel-500'
                    }`}
                    style={musicOn ? { boxShadow: '0 0 18px -2px rgba(255,212,59,0.55)' } : undefined}
                  >
                    <span
                      className={`absolute top-1 h-7 w-7 rounded-full bg-white shadow-md transition-all duration-200 ${
                        musicOn ? 'left-8' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                <p className="px-1 text-[11px] leading-relaxed text-steel-100">
                  Синтетичний OST у стилі FE2CM — грає під час тесту.
                </p>

                <div className="rounded-xl bg-cave-500/40 p-3 ring-1 ring-steel-500/40">
                  <label className="flex items-center justify-between gap-2 font-display text-[11px] font-extrabold uppercase tracking-[0.1em] text-steel-50">
                    <span className="flex items-center gap-1.5">
                      <Volume2 className="h-4 w-4" style={{ color: '#f472b6' }} />
                      Гучність музики
                    </span>
                    <span className="rounded bg-cave-800 px-2 py-0.5 font-display text-[11px] font-extrabold tabular-nums" style={{ color: '#f472b6' }}>
                      {musicVol}%
                    </span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={musicVol}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setMusicVol(v);
                      setMusicModuleVol(v);
                    }}
                    className="mt-3 h-2 w-full cursor-pointer accent-[#f472b6]"
                  />
                </div>

                <div className="rounded-xl bg-cave-500/40 p-3 ring-1 ring-steel-500/40">
                  <label className="flex items-center justify-between gap-2 font-display text-[11px] font-extrabold uppercase tracking-[0.1em] text-steel-50">
                    <span className="flex items-center gap-1.5">
                      {sfxVol > 0 ? (
                        <Volume2 className="h-4 w-4" style={{ color: '#67e8f9' }} />
                      ) : (
                        <VolumeX className="h-4 w-4 text-steel-100" />
                      )}
                      Звукові ефекти
                    </span>
                    <span className="rounded bg-cave-800 px-2 py-0.5 font-display text-[11px] font-extrabold tabular-nums" style={{ color: '#67e8f9' }}>
                      {sfxVol}%
                    </span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sfxVol}
                    onChange={(e) => setSfxVol(Number(e.target.value))}
                    className="mt-3 h-2 w-full cursor-pointer accent-[#67e8f9]"
                  />
                </div>

                <div className="flex items-start gap-2 rounded-xl bg-volt/10 p-3 text-[11px] leading-relaxed text-steel-50 ring-1 ring-volt/20">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-volt" />
                  <p>
                    Налаштування зберігаються у браузері. Музика вмикається після першого кліку по
                    сторінці — цього вимагає браузер.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center gap-3 border-t border-steel-500/60 bg-cave-400/80 px-5 py-4 sm:px-7">
          <button
            onClick={handleSave}
            className="shine-sweep fe-btn inline-flex flex-1 items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base"
            style={{
              backgroundColor: '#ffd43b',
              backgroundImage: 'linear-gradient(180deg, #ffe66b 0%, #ffd43b 55%, #f5a623 100%)',
              color: '#14161c',
            }}
          >
            {saved ? <Check className="h-5 w-5" strokeWidth={3} /> : <KeyRound className="h-5 w-5" />}
            {saved ? 'Збережено!' : 'Зберегти'}
          </button>

          <button
            onClick={handleClear}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cave-500/70 px-4 py-3.5 font-display text-xs font-extrabold uppercase tracking-wide text-steel-50 ring-1 ring-steel-500/60 transition hover:bg-rose-500/15 hover:text-rose-300 hover:ring-rose-500/40 active:translate-y-0.5 sm:px-5 sm:text-sm"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Видалити ключ</span>
            <span className="sm:hidden">Видалити</span>
          </button>
        </div>
      </div>
    </div>
  );
}
