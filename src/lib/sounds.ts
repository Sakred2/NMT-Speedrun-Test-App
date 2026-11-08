import { getSfxVolume } from './storage';

// Lightweight Web Audio sound effects — synthesized, no external files.
// Sounds are created on the fly with oscillators so the app stays self-contained.

type SoundName =
  | 'correct'
  | 'wrong'
  | 'tick'
  | 'tickLow'
  | 'complete'
  | 'start'
  | 'click'
  | 'drown'
  | 'bubble'
  | 'heartbeat'
  | 'floodRise'
  | 'pageTurn'
  | 'splash'
  | 'warning';

let ctx: AudioContext | null = null;
let enabled = true;
let masterGain: GainNode | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    masterGain = ctx.createGain();
    masterGain.gain.value = getSfxVolume() / 100;
    masterGain.connect(ctx.destination);
  }
  // resume if suspended (autoplay policy)
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

export function setSoundEnabled(v: boolean): void {
  enabled = v;
}

export function isSoundEnabled(): boolean {
  return enabled;
}

export function refreshSfxVolume(): void {
  const c = getCtx();
  if (c && masterGain) masterGain.gain.value = getSfxVolume() / 100;
}

function tone(
  freq: number,
  start: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainPeak = 0.15,
): void {
  const c = getCtx();
  if (!c || !masterGain) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime + start);
  gain.gain.setValueAtTime(0, c.currentTime + start);
  gain.gain.linearRampToValueAtTime(gainPeak, c.currentTime + start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + duration);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(c.currentTime + start);
  osc.stop(c.currentTime + start + duration + 0.02);
}

function sweep(
  fromFreq: number,
  toFreq: number,
  start: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainPeak = 0.15,
): void {
  const c = getCtx();
  if (!c || !masterGain) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(fromFreq, c.currentTime + start);
  osc.frequency.exponentialRampToValueAtTime(toFreq, c.currentTime + start + duration);
  gain.gain.setValueAtTime(0, c.currentTime + start);
  gain.gain.linearRampToValueAtTime(gainPeak, c.currentTime + start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + duration);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(c.currentTime + start);
  osc.stop(c.currentTime + start + duration + 0.02);
}

export function playSound(name: SoundName): void {
  if (!enabled) return;
  const c = getCtx();
  if (!c) return;

  switch (name) {
    case 'correct':
      // bright rising arpeggio: C5 -> E5 -> G5
      tone(523.25, 0, 0.12, 'sine', 0.18);
      tone(659.25, 0.09, 0.12, 'sine', 0.18);
      tone(783.99, 0.18, 0.22, 'sine', 0.2);
      break;
    case 'wrong':
      // descending buzz
      sweep(311.13, 130.81, 0, 0.32, 'sawtooth', 0.12);
      break;
    case 'tick':
      // short soft click
      tone(880, 0, 0.05, 'square', 0.04);
      break;
    case 'tickLow':
      // urgent low tick for final seconds
      tone(440, 0, 0.08, 'square', 0.08);
      break;
    case 'start':
      // quick whoosh up
      sweep(220, 660, 0, 0.25, 'sine', 0.12);
      break;
    case 'click':
      tone(660, 0, 0.04, 'square', 0.03);
      break;
    case 'complete':
      // triumphant little fanfare: C5, E5, G5, C6
      tone(523.25, 0, 0.15, 'sine', 0.18);
      tone(659.25, 0.14, 0.15, 'sine', 0.18);
      tone(783.99, 0.28, 0.15, 'sine', 0.18);
      tone(1046.5, 0.42, 0.4, 'sine', 0.22);
      break;
    case 'drown':
      // drowning: gurgle descent + bubbles
      sweep(440, 110, 0, 0.9, 'sawtooth', 0.16);
      tone(180, 0.5, 0.4, 'square', 0.08);
      tone(90, 0.8, 0.5, 'sine', 0.1);
      break;
    case 'bubble':
      // water bubble pop
      tone(300, 0, 0.08, 'sine', 0.1);
      tone(450, 0.04, 0.06, 'sine', 0.08);
      break;
    case 'heartbeat':
      // dual-thump heartbeat for low air
      tone(60, 0, 0.12, 'sine', 0.2);
      tone(55, 0.15, 0.1, 'sine', 0.15);
      break;
    case 'floodRise':
      // water rushing up — short watery sweep
      sweep(200, 400, 0, 0.4, 'sawtooth', 0.1);
      tone(120, 0.1, 0.3, 'sine', 0.06);
      break;
    case 'pageTurn':
      // page/question transition whoosh
      sweep(400, 800, 0, 0.15, 'sine', 0.06);
      break;
    case 'splash':
      // water splash — noise burst with filter
      if (c && masterGain) {
        const bufSize = c.sampleRate * 0.2;
        const buf = c.createBuffer(1, bufSize, c.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
        const noise = c.createBufferSource();
        noise.buffer = buf;
        const filter = c.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, c.currentTime);
        filter.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.2);
        const g = c.createGain();
        g.gain.setValueAtTime(0.15, c.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.2);
        noise.connect(filter);
        filter.connect(g);
        g.connect(masterGain);
        noise.start();
        noise.stop(c.currentTime + 0.2);
      }
      break;
    case 'warning':
      // urgent warning klaxon for flood critical
      tone(880, 0, 0.15, 'square', 0.12);
      tone(880, 0.2, 0.15, 'square', 0.12);
      break;
  }
}

/** Unlock audio context on first user gesture (browser autoplay policy). */
export function unlockAudio(): void {
  getCtx();
}
