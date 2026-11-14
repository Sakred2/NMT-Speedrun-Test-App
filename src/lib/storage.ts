const KEY = 'nmt-openrouter-key';
const SOUND_KEY = 'nmt-sound-on';
const MODEL_KEY = 'nmt-openrouter-model';
const MUSIC_VOL_KEY = 'nmt-music-volume';
const SFX_VOL_KEY = 'nmt-sfx-volume';
const MUSIC_ON_KEY = 'nmt-music-on';
const BEST_RUN_KEY = 'nmt-best-run';
const DEVICE_MODE_KEY = 'nmt-device-mode';
const THEME_MODE_KEY = 'nmt-theme-mode';

export type DeviceMode = 'mobile' | 'tablet' | 'desktop';
export type ThemeMode = 'classic' | 'midnight' | 'sunset' | 'ocean' | 'forest';

export function getApiKey(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function saveApiKey(value: string): void {
  try {
    if (value.trim()) localStorage.setItem(KEY, value.trim());
    else localStorage.removeItem(KEY);
  } catch {
    // ignore quota / privacy errors
  }
}

export function clearApiKey(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

export function getDeviceMode(): DeviceMode {
  try {
    const value = localStorage.getItem(DEVICE_MODE_KEY);
    return value === 'mobile' || value === 'tablet' || value === 'desktop' ? value : 'desktop';
  } catch {
    return 'desktop';
  }
}

export function saveDeviceMode(mode: DeviceMode): void {
  try {
    localStorage.setItem(DEVICE_MODE_KEY, mode);
  } catch {
    // ignore quota / privacy errors
  }
}

export function getThemeMode(): ThemeMode {
  try {
    const value = localStorage.getItem(THEME_MODE_KEY);
    return value === 'classic' || value === 'midnight' || value === 'sunset' || value === 'ocean' || value === 'forest'
      ? value
      : 'classic';
  } catch {
    return 'classic';
  }
}

export function saveThemeMode(mode: ThemeMode): void {
  try {
    localStorage.setItem(THEME_MODE_KEY, mode);
  } catch {
    // ignore quota / privacy errors
  }
}

export function getSoundOn(): boolean {
  try {
    return localStorage.getItem(SOUND_KEY) !== '0';
  } catch {
    return true;
  }
}

export function saveSoundOn(on: boolean): void {
  try {
    localStorage.setItem(SOUND_KEY, on ? '1' : '0');
  } catch {
    // ignore
  }
}

export function getModel(): string | null {
  try {
    return localStorage.getItem(MODEL_KEY);
  } catch {
    return null;
  }
}

export function saveModel(model: string): void {
  try {
    if (model) localStorage.setItem(MODEL_KEY, model);
    else localStorage.removeItem(MODEL_KEY);
  } catch {
    // ignore
  }
}

export function getMusicOn(): boolean {
  try {
    return localStorage.getItem(MUSIC_ON_KEY) !== '0';
  } catch {
    return true;
  }
}

export function saveMusicOn(on: boolean): void {
  try {
    localStorage.setItem(MUSIC_ON_KEY, on ? '1' : '0');
  } catch {
    // ignore
  }
}

export function getMusicVolume(): number {
  try {
    const raw = localStorage.getItem(MUSIC_VOL_KEY);
    if (raw === null) return 35;
    const v = Number(raw);
    return Number.isFinite(v) && v >= 0 && v <= 100 ? v : 35;
  } catch {
    return 35;
  }
}

export function saveMusicVolume(v: number): void {
  try {
    localStorage.setItem(MUSIC_VOL_KEY, String(Math.max(0, Math.min(100, Math.round(v)))));
  } catch {
    // ignore
  }
}

export function getSfxVolume(): number {
  try {
    const raw = localStorage.getItem(SFX_VOL_KEY);
    if (raw === null) return 70;
    const v = Number(raw);
    return Number.isFinite(v) && v >= 0 && v <= 100 ? v : 70;
  } catch {
    return 70;
  }
}

export function saveSfxVolume(v: number): void {
  try {
    localStorage.setItem(SFX_VOL_KEY, String(Math.max(0, Math.min(100, Math.round(v)))));
  } catch {
    // ignore
  }
}

export interface BestRun {
  score: number;
  correct: number;
  total: number;
  at: number;
}

export function getBestRun(): BestRun | null {
  try {
    const raw = localStorage.getItem(BEST_RUN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<BestRun>;
    if (typeof parsed.score !== 'number' || !Number.isFinite(parsed.score)) return null;
    return {
      score: parsed.score,
      correct: typeof parsed.correct === 'number' ? parsed.correct : 0,
      total: typeof parsed.total === 'number' ? parsed.total : 0,
      at: typeof parsed.at === 'number' ? parsed.at : 0,
    };
  } catch {
    return null;
  }
}

/** Saves the run if it beats the stored record. Returns true when it is a new best. */
export function recordBestRun(score: number, correct: number, total: number): boolean {
  const prev = getBestRun();
  if (prev && score <= prev.score) return false;
  const run: BestRun = { score, correct, total, at: Date.now() };
  try {
    localStorage.setItem(BEST_RUN_KEY, JSON.stringify(run));
  } catch {
    // ignore
  }
  return true;
}
