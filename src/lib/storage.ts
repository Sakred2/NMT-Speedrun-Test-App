const KEY = 'nmt-openrouter-key';
const SOUND_KEY = 'nmt-sound-on';
const MODEL_KEY = 'nmt-openrouter-model';
const MUSIC_VOL_KEY = 'nmt-music-volume';
const SFX_VOL_KEY = 'nmt-sfx-volume';
const MUSIC_ON_KEY = 'nmt-music-on';

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
    const v = Number(localStorage.getItem(MUSIC_VOL_KEY));
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
    const v = Number(localStorage.getItem(SFX_VOL_KEY));
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
