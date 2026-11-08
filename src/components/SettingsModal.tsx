import { useState } from 'react';
import {
  X, KeyRound, Trash2, Check, Eye, EyeOff, Sparkles, ExternalLink,
  Loader2, AlertCircle, Zap, ChevronDown, Cpu, Music, Volume2, VolumeX,
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg animate-pop-in overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-ink-200/60 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-700 text-ink-800">Налаштування</h2>
              <p className="text-sm text-ink-500">AI, музика та звук</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-400 transition hover:bg-ink-100 hover:text-ink-700"
            aria-label="Закрити"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* API key */}
        <div className="mt-6">
          <label className="mb-1.5 block text-sm font-700 text-ink-700">API-ключ OpenRouter</label>
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="sk-or-v1-..."
              spellCheck={false}
              className="w-full rounded-2xl border-2 border-ink-200 bg-ink-50 px-4 py-3 pr-12 font-mono text-sm text-ink-800 outline-none transition focus:border-brand-400 focus:bg-white"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 transition hover:text-ink-700"
              aria-label={show ? 'Сховати' : 'Показати'}
            >
              {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-2xl bg-brand-50 p-3 text-xs text-brand-700">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Ключ зберігається лише у твоєму браузері (localStorage) і нікуди не передається, крім
              запитів до OpenRouter. Без ключа або при помилці додаток автоматично використовує
              вбудовані тестові питання — робота не зупиняється.
            </p>
          </div>

          <a
            href="https://openrouter.ai/keys"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs font-700 text-brand-600 transition hover:text-brand-700"
          >
            Отримати ключ на openrouter.ai <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Model picker */}
        <div className="mt-6">
          <label className="mb-1.5 block text-sm font-700 text-ink-700">
            <span className="inline-flex items-center gap-1.5">
              <Cpu className="h-4 w-4 text-brand-500" /> Модель ШІ
            </span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setModelOpen((o) => !o)}
              className="flex w-full items-center justify-between gap-2 rounded-2xl border-2 border-ink-200 bg-ink-50 px-4 py-3 text-left transition hover:border-brand-300 hover:bg-white"
            >
              <span className="flex items-center gap-2">
                <span className="font-700 text-ink-800">{selectedOption?.label ?? model}</span>
                {selectedOption?.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-800 uppercase ${
                      selectedOption.badge === 'free'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {selectedOption.badge}
                  </span>
                )}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-ink-400 transition ${modelOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {modelOpen && (
              <div className="absolute z-20 mt-2 max-h-60 w-full animate-slide-up overflow-y-auto rounded-2xl border-2 border-ink-200 bg-white p-1.5 shadow-xl">
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
                      className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left transition ${
                        active ? 'bg-brand-50' : 'hover:bg-ink-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`text-sm font-700 ${active ? 'text-brand-700' : 'text-ink-700'}`}>
                          {m.label}
                        </span>
                        {m.badge && (
                          <span
                            className={`rounded-full px-1.5 py-0.5 text-[9px] font-800 uppercase ${
                              m.badge === 'free'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {m.badge}
                          </span>
                        )}
                      </span>
                      {active && <Check className="h-4 w-4 text-brand-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <p className="mt-1.5 text-xs text-ink-400">
            Усі моделі <span className="font-700 text-emerald-600">free</span> — безкоштовні на OpenRouter.
          </p>
        </div>

        {/* Test connection */}
        <div className="mt-5">
          <button
            type="button"
            onClick={handleTest}
            disabled={testState === 'testing'}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-brand-200 bg-brand-50 px-5 py-3 font-700 text-brand-700 transition hover:border-brand-400 hover:bg-brand-100 active:scale-[0.99] disabled:opacity-60"
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
              className={`mt-3 flex items-start gap-2 rounded-2xl p-3 text-sm animate-slide-up ${
                testResult.ok
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-rose-50 text-rose-700'
              }`}
            >
              {testResult.ok ? (
                <Check className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              <p className="font-600">{testResult.message}</p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-ink-200" />
          <span className="text-xs font-800 uppercase tracking-wide text-ink-400">Аудіо</span>
          <div className="h-px flex-1 bg-ink-200" />
        </div>

        {/* Music on/off */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4 text-brand-500" />
            <span className="text-sm font-700 text-ink-700">Фоновая музика</span>
          </div>
          <button
            onClick={() => setMusicOn((v) => !v)}
            className={`relative h-7 w-12 rounded-full transition ${musicOn ? 'bg-brand-500' : 'bg-ink-200'}`}
            aria-label="Перемкнути музику"
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${musicOn ? 'left-6' : 'left-1'}`}
            />
          </button>
        </div>
        <p className="mt-1.5 text-xs text-ink-400">
          Nuclear Blizzard [V2] — синтетичний OST у стилі FE2CM. Програється під час тесту.
        </p>

        {/* Music volume */}
        <div className="mt-4">
          <label className="mb-1.5 flex items-center justify-between text-sm font-700 text-ink-700">
            <span className="flex items-center gap-1.5">
              <Volume2 className="h-4 w-4 text-brand-500" /> Гучність музики
            </span>
            <span className="text-xs font-600 text-ink-400">{musicVol}%</span>
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
            className="w-full accent-brand-500"
          />
        </div>

        {/* SFX volume */}
        <div className="mt-4">
          <label className="mb-1.5 flex items-center justify-between text-sm font-700 text-ink-700">
            <span className="flex items-center gap-1.5">
              {sfxVol > 0 ? <Volume2 className="h-4 w-4 text-brand-500" /> : <VolumeX className="h-4 w-4 text-ink-400" />}
              Гучність звукових ефектів
            </span>
            <span className="text-xs font-600 text-ink-400">{sfxVol}%</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={sfxVol}
            onChange={(e) => setSfxVol(Number(e.target.value))}
            className="w-full accent-brand-500"
          />
        </div>

        {/* Save / clear */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={handleSave}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-500 px-5 py-3 font-700 text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600 active:scale-[0.98]"
          >
            {saved ? <Check className="h-5 w-5" /> : <KeyRound className="h-5 w-5" />}
            {saved ? 'Збережено!' : 'Зберегти'}
          </button>
          <button
            onClick={handleClear}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-ink-200 px-5 py-3 font-700 text-ink-500 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 active:scale-[0.98]"
          >
            <Trash2 className="h-4 w-4" />
            Видалити ключ
          </button>
        </div>
      </div>
    </div>
  );
}
