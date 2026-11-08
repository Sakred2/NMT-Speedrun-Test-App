import { getMusicOn, getMusicVolume, saveMusicOn, saveMusicVolume } from './storage';

// Procedural cinematic music engine — synthesized via Web Audio API.
// Multi-section arrangement inspired by "Nuclear Blizzard [V2]" (FE2CM OST):
// dark minor-key tension, driving percussion, evolving pads, soaring lead.

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let masterCompressor: DynamicsCompressorNode | null = null;
let reverbBus: ConvolverNode | null = null;
let isPlaying = false;
let schedulerId: ReturnType<typeof setInterval> | null = null;
let nextNoteTime = 0;
let step = 0;
let bar = 0;

// ─── Musical constants ──────────────────────────────────────────
const BPM = 132;
const SECONDS_PER_STEP = 60 / BPM / 4; // 16th notes
const STEPS_PER_BAR = 16;
const TOTAL_BARS = 32; // full loop length

// Note frequencies (Hz)
const N = {
  D1: 36.71, D2: 73.42, D3: 146.83, D4: 293.66, D5: 587.33,
  F2: 87.31, F3: 174.61, F4: 349.23, F5: 698.46,
  A1: 55.00, A2: 110.00, A3: 220.00, A4: 440.00, A5: 880.00,
  C2: 65.41, C3: 130.81, C4: 261.63, C5: 523.25, C6: 1046.5,
  E2: 82.41, E3: 164.81, E4: 329.63, E5: 659.25,
  G2: 98.00, G3: 196.00, G4: 392.00, G5: 783.99,
  B2: 123.47, B3: 246.94, B4: 493.88,
  As4: 466.16, Cs5: 554.37, Ds5: 622.25, Fs5: 739.99,
};

// ─── Section definitions (4 bars each, 8 sections = 32 bars) ───
type Section = 'intro' | 'build1' | 'drive1' | 'break' | 'build2' | 'drive2' | 'climax' | 'outro';

function sectionForBar(b: number): Section {
  const idx = Math.floor(b / 4);
  const sections: Section[] = ['intro', 'build1', 'drive1', 'break', 'build2', 'drive2', 'climax', 'outro'];
  return sections[idx % sections.length];
}

// ─── Patterns per section ──────────────────────────────────────

function getBassPattern(section: Section): number[] {
  switch (section) {
    case 'intro':   return [N.D2,0,0,0, N.D2,0,0,0, N.A1,0,0,0, N.A1,0,0,0];
    case 'build1':  return [N.D2,0,N.D2,0, N.D2,0,0,0, N.A1,0,N.A1,0, N.A1,0,0,0];
    case 'drive1':  return [N.D2,0,N.D2,0, N.F2,0,N.D2,0, N.A1,0,N.A1,0, N.C2,0,N.A1,0];
    case 'break':   return [N.A1,0,0,0, N.C2,0,0,0, N.D2,0,0,0, N.D2,0,0,N.D2];
    case 'build2':  return [N.D2,0,N.D2,0, N.D2,0,N.F2,0, N.A1,0,N.A1,0, N.C2,0,N.C2,0];
    case 'drive2':  return [N.D2,0,N.D2,0, N.F2,0,N.D2,0, N.A1,0,N.A1,0, N.C2,0,N.A1,N.C2];
    case 'climax':  return [N.D2,0,N.D2,N.F2, N.A2,0,N.A2,N.C2, N.D2,0,N.D2,N.F2, N.A2,0,N.C2,N.A2];
    case 'outro':   return [N.D2,0,0,0, N.D2,0,0,0, N.A1,0,0,0, 0,0,0,0];
  }
}

function getPadPattern(section: Section): number[] {
  switch (section) {
    case 'intro':   return [N.D3,0,0,0,0,0,0,0, N.A2,0,0,0,0,0,0,0];
    case 'build1':  return [N.D3,0,0,0,0,0,0,0, N.A2,0,0,0,0,0,0,0];
    case 'drive1':  return [N.D3,0,0,0, N.F3,0,0,0, N.A2,0,0,0, N.C3,0,0,0];
    case 'break':   return [N.A2,0,0,0,0,0,0,0, N.C3,0,0,0,0,0,0,0];
    case 'build2':  return [N.D3,0,0,0,0,0,0,0, N.F3,0,0,0,0,0,0,0];
    case 'drive2':  return [N.D3,0,0,0, N.F3,0,0,0, N.A2,0,0,0, N.C3,0,0,0];
    case 'climax':  return [N.D3,0,0,0, N.F3,0,0,0, N.A3,0,0,0, N.C4,0,0,0];
    case 'outro':   return [N.D3,0,0,0,0,0,0,0, N.A2,0,0,0,0,0,0,0];
  }
}

function getArpPattern(section: Section): number[] {
  switch (section) {
    case 'intro':   return new Array(16).fill(0);
    case 'build1':  return [N.A4,0,0,0, N.D4,0,0,0, N.E4,0,0,0, N.A4,0,0,0];
    case 'drive1':  return [N.A4,0,N.D5,0, N.A4,0,N.D5,0, N.E4,0,N.A4,0, N.E4,0,N.A4,0];
    case 'break':   return [N.A4,0,0,0, N.C5,0,0,0, N.D5,0,0,0, N.E5,0,0,0];
    case 'build2':  return [N.A4,0,N.D5,0, N.A4,0,N.F5,0, N.E4,0,N.A4,0, N.E4,0,N.C5,0];
    case 'drive2':  return [N.A4,0,N.D5,0, N.A4,0,N.F5,0, N.E4,0,N.A4,0, N.C5,0,N.E5,0];
    case 'climax':  return [N.A4,N.D5,N.F5,N.A5, N.A4,N.D5,N.F5,N.A5, N.E4,N.A4,N.C5,N.E5, N.E4,N.A4,N.C5,N.E5];
    case 'outro':   return [N.A4,0,0,0, N.D5,0,0,0, 0,0,0,0, 0,0,0,0];
  }
}

function getLeadPattern(section: Section): number[] {
  switch (section) {
    case 'intro':   return new Array(16).fill(0);
    case 'build1':  return new Array(16).fill(0);
    case 'drive1':  return [0,0,0,0, N.D5,0,N.C5,0, 0,0,0,0, N.A4,0,0,0];
    case 'break':   return [N.C5,0,0,0, N.D5,0,0,0, N.E5,0,0,N.D5, N.C5,0,0,0];
    case 'build2':  return [0,0,0,0, N.D5,0,0,0, 0,0,0,0, N.E5,0,0,0];
    case 'drive2':  return [N.D5,0,N.C5,0, N.D5,0,N.F5,0, N.E5,0,N.D5,0, N.C5,0,N.A4,0];
    case 'climax':  return [N.D5,0,N.F5,N.D5, N.A5,0,N.F5,N.D5, N.E5,0,N.D5,N.C5, N.E5,0,N.A5,0];
    case 'outro':   return [N.D5,0,0,0, N.A4,0,0,0, 0,0,0,0, 0,0,0,0];
  }
}

function getDrumPattern(section: Section): { kick: boolean[]; snare: boolean[]; hat: boolean[]; crash: boolean } {
  const empty = new Array(16).fill(false);
  switch (section) {
    case 'intro':
      return { kick: empty, snare: empty, hat: empty, crash: false };
    case 'build1':
      return {
        kick: [true,false,false,false, false,false,false,false, true,false,false,false, false,false,false,false],
        snare: empty,
        hat: [false,false,true,false, false,false,true,false, false,false,true,false, false,false,true,false],
        crash: false,
      };
    case 'drive1':
      return {
        kick: [true,false,false,false, true,false,false,false, true,false,false,false, true,false,false,false],
        snare: [false,false,false,false, true,false,false,false, false,false,false,false, true,false,false,false],
        hat: [true,false,true,false, true,false,true,false, true,false,true,false, true,false,true,false],
        crash: false,
      };
    case 'break':
      return {
        kick: [true,false,false,false, false,false,false,false, true,false,false,false, false,false,false,false],
        snare: [false,false,false,false, true,false,false,false, false,false,false,false, true,false,false,false],
        hat: [false,false,true,false, false,false,true,false, false,false,true,false, false,false,true,false],
        crash: false,
      };
    case 'build2':
      return {
        kick: [true,false,false,false, true,false,false,false, true,false,false,false, true,false,false,false],
        snare: [false,false,false,false, true,false,false,false, false,false,false,false, true,false,false,true],
        hat: [true,false,true,false, true,false,true,false, true,false,true,false, true,false,true,false],
        crash: false,
      };
    case 'drive2':
      return {
        kick: [true,false,false,false, true,false,false,false, true,false,false,false, true,false,false,false],
        snare: [false,false,false,false, true,false,false,false, false,false,false,false, true,false,false,false],
        hat: [true,false,true,false, true,false,true,false, true,false,true,false, true,false,true,false],
        crash: false,
      };
    case 'climax':
      return {
        kick: [true,false,true,false, true,false,true,false, true,false,true,false, true,false,true,false],
        snare: [false,false,false,false, true,false,false,true, false,false,false,false, true,false,false,true],
        hat: [true,true,true,true, true,true,true,true, true,true,true,true, true,true,true,true],
        crash: true,
      };
    case 'outro':
      return {
        kick: [true,false,false,false, false,false,false,false, true,false,false,false, false,false,false,false],
        snare: empty,
        hat: [false,false,true,false, false,false,true,false, false,false,true,false, false,false,true,false],
        crash: false,
      };
  }
}

// ─── Synthesis helpers ─────────────────────────────────────────

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = getMusicVolume() / 100;
    masterCompressor = audioCtx.createDynamicsCompressor();
    masterCompressor.threshold.value = -18;
    masterCompressor.knee.value = 12;
    masterCompressor.ratio.value = 4;
    masterCompressor.attack.value = 0.008;
    masterCompressor.release.value = 0.16;
    masterGain.connect(masterCompressor);
    masterCompressor.connect(audioCtx.destination);

    // Simple reverb via convolver with generated impulse
    reverbBus = audioCtx.createConvolver();
    reverbBus.buffer = makeImpulse(2.5, 2.5);
    const reverbGain = audioCtx.createGain();
    reverbGain.gain.value = 0.22;
    reverbBus.connect(reverbGain);
    reverbGain.connect(masterGain);
  }
  if (audioCtx.state === 'suspended') void audioCtx.resume();
  return audioCtx;
}

function makeImpulse(duration: number, decay: number): AudioBuffer {
  const c = audioCtx!;
  const rate = c.sampleRate;
  const length = Math.floor(rate * duration);
  const impulse = c.createBuffer(2, length, rate);
  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  return impulse;
}

function sendReverb(node: AudioNode): void {
  if (reverbBus) node.connect(reverbBus);
}

// ─── Instruments ───────────────────────────────────────────────

function playBass(time: number, freq: number, dur: number): void {
  if (!audioCtx || !masterGain || freq === 0) return;
  const osc = audioCtx.createOscillator();
  const sub = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(freq, time);
  sub.type = 'sine';
  sub.frequency.setValueAtTime(freq / 2, time);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(600, time);
  filter.frequency.exponentialRampToValueAtTime(200, time + dur);
  filter.Q.setValueAtTime(6, time);

  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.22, time + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

  osc.connect(filter);
  sub.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  osc.start(time);
  sub.start(time);
  osc.stop(time + dur + 0.02);
  sub.stop(time + dur + 0.02);
}

function playPad(time: number, freq: number, dur: number): void {
  if (!audioCtx || !masterGain || freq === 0) return;
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(freq, time);
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 2.01, time); // slight detune

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1200, time);
  filter.Q.setValueAtTime(1, time);

  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.06, time + 0.3);
  gain.gain.setValueAtTime(0.06, time + dur - 0.3);
  gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  sendReverb(gain);
  osc1.start(time);
  osc2.start(time);
  osc1.stop(time + dur + 0.02);
  osc2.stop(time + dur + 0.02);
}

function playArp(time: number, freq: number, dur: number): void {
  if (!audioCtx || !masterGain || freq === 0) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  osc.type = 'square';
  osc.frequency.setValueAtTime(freq, time);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(3000, time);
  filter.Q.setValueAtTime(2, time);

  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.06, time + 0.003);
  gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  sendReverb(gain);
  osc.start(time);
  osc.stop(time + dur + 0.01);
}

function playLead(time: number, freq: number, dur: number): void {
  if (!audioCtx || !masterGain || freq === 0) return;
  const osc = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(freq, time);
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(freq * 1.005, time);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(4000, time);
  filter.Q.setValueAtTime(3, time);

  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.1, time + 0.01);
  gain.gain.setValueAtTime(0.08, time + dur * 0.5);
  gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

  osc.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  sendReverb(gain);
  osc.start(time);
  osc2.start(time);
  osc.stop(time + dur + 0.02);
  osc2.stop(time + dur + 0.02);
}

function playKick(time: number): void {
  if (!audioCtx || !masterGain) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const click = audioCtx.createOscillator();
  const clickGain = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(160, time);
  osc.frequency.exponentialRampToValueAtTime(38, time + 0.12);

  gain.gain.setValueAtTime(0.35, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

  // pitch click for punch
  click.type = 'square';
  click.frequency.setValueAtTime(2000, time);
  clickGain.gain.setValueAtTime(0.08, time);
  clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.01);

  osc.connect(gain);
  gain.connect(masterGain);
  click.connect(clickGain);
  clickGain.connect(masterGain);
  osc.start(time);
  click.start(time);
  osc.stop(time + 0.2);
  click.stop(time + 0.02);
}

function playSnare(time: number): void {
  if (!audioCtx || !masterGain) return;
  const bufSize = audioCtx.sampleRate * 0.15;
  const buffer = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 1500;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.18, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

  // tonal body
  const osc = audioCtx.createOscillator();
  const oscGain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(180, time);
  osc.frequency.exponentialRampToValueAtTime(100, time + 0.08);
  oscGain.gain.setValueAtTime(0.1, time);
  oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  osc.connect(oscGain);
  oscGain.connect(masterGain);
  noise.start(time);
  osc.start(time);
  noise.stop(time + 0.15);
  osc.stop(time + 0.1);
}

function playHat(time: number, open: boolean): void {
  if (!audioCtx || !masterGain) return;
  const bufSize = audioCtx.sampleRate * (open ? 0.1 : 0.04);
  const buffer = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 8000;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(open ? 0.04 : 0.05, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + (open ? 0.1 : 0.03));

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  noise.start(time);
  noise.stop(time + (open ? 0.11 : 0.04));
}

function playRiser(time: number): void {
  if (!audioCtx || !masterGain) return;
  const duration = SECONDS_PER_STEP * 4;
  const bufferSize = Math.floor(audioCtx.sampleRate * duration);
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (i / bufferSize);
  }

  const noise = audioCtx.createBufferSource();
  const filter = audioCtx.createBiquadFilter();
  const gain = audioCtx.createGain();
  noise.buffer = buffer;
  filter.type = 'bandpass';
  filter.Q.value = 5;
  filter.frequency.setValueAtTime(500, time);
  filter.frequency.exponentialRampToValueAtTime(7000, time + duration);
  gain.gain.setValueAtTime(0.001, time);
  gain.gain.exponentialRampToValueAtTime(0.09, time + duration * 0.8);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  sendReverb(gain);
  noise.start(time);
  noise.stop(time + duration);
}

function playTomFill(time: number, pitch: number): void {
  if (!audioCtx || !masterGain) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(pitch, time);
  osc.frequency.exponentialRampToValueAtTime(pitch * 0.45, time + 0.16);
  gain.gain.setValueAtTime(0.2, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(time);
  osc.stop(time + 0.2);
}

function playCrash(time: number): void {
  if (!audioCtx || !masterGain) return;
  const bufSize = audioCtx.sampleRate * 1.5;
  const buffer = audioCtx.createBuffer(2, bufSize, audioCtx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 2);
  }
  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 4000;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.12, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 1.5);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  sendReverb(gain);
  noise.start(time);
  noise.stop(time + 1.5);
}

// ─── Scheduler ──────────────────────────────────────────────────

function scheduleStep(stepIdx: number, barIdx: number, time: number): void {
  const section = sectionForBar(barIdx);
  const bass = getBassPattern(section);
  const pad = getPadPattern(section);
  const arp = getArpPattern(section);
  const lead = getLeadPattern(section);
  const drums = getDrumPattern(section);

  const i = stepIdx;
  const stepDur = SECONDS_PER_STEP;

  // Bass
  if (bass[i]) playBass(time, bass[i], stepDur * 2.5);

  // Pad (long sustained)
  if (pad[i]) playPad(time, pad[i], stepDur * 8);

  // Arp
  if (arp[i]) playArp(time, arp[i], stepDur * 1.5);

  // Lead
  if (lead[i]) playLead(time, lead[i], stepDur * 2.5);

  // Drums
  if (drums.kick[i]) playKick(time);
  if (drums.snare[i]) playSnare(time);
  if (drums.hat[i]) playHat(time, i === 14);
  if (drums.crash && i === 0) playCrash(time);

  // Short transitions keep the loop from feeling mechanically repeated.
  if (i === 12 && barIdx % 4 === 3) playRiser(time);
  if (barIdx % 4 === 3 && i >= 12 && section !== 'intro' && section !== 'outro') {
    playTomFill(time, 150 - (i - 12) * 18);
  }
}

function scheduler(): void {
  const c = getCtx();
  if (!c || !isPlaying) return;

  while (nextNoteTime < c.currentTime + 0.15) {
    scheduleStep(step, bar, nextNoteTime);
    nextNoteTime += SECONDS_PER_STEP;
    step++;
    if (step >= STEPS_PER_BAR) {
      step = 0;
      bar = (bar + 1) % TOTAL_BARS;
    }
  }
}

// ─── Public API ─────────────────────────────────────────────────

export function unlockMusic(): void {
  getCtx();
}

export function isMusicOn(): boolean {
  return getMusicOn();
}

export function toggleMusicOn(): boolean {
  const next = !getMusicOn();
  saveMusicOn(next);
  return next;
}

export function getMusicVol(): number {
  return getMusicVolume();
}

export function setMusicVol(v: number): void {
  saveMusicVolume(v);
  if (masterGain && audioCtx) {
    masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
    masterGain.gain.setTargetAtTime(v / 100, audioCtx.currentTime, 0.04);
  }
}

export function playMusic(): void {
  if (!getMusicOn()) return;
  const c = getCtx();
  if (!c) return;
  if (isPlaying) return;

  isPlaying = true;
  step = 0;
  bar = 0;
  nextNoteTime = c.currentTime + 0.05;

  if (masterGain && c) {
    masterGain.gain.cancelScheduledValues(c.currentTime);
    masterGain.gain.setTargetAtTime(getMusicVolume() / 100, c.currentTime, 0.08);
  }

  if (schedulerId) clearInterval(schedulerId);
  schedulerId = setInterval(scheduler, 25);
}

export function pauseMusic(): void {
  isPlaying = false;
  if (schedulerId) {
    clearInterval(schedulerId);
    schedulerId = null;
  }
}

export function stopMusic(): void {
  pauseMusic();
  step = 0;
  bar = 0;
}

export function applyMusicSettings(): void {
  if (masterGain && audioCtx) {
    masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
    masterGain.gain.setTargetAtTime(getMusicVolume() / 100, audioCtx.currentTime, 0.08);
  }
  if (getMusicOn() && !isPlaying) {
    playMusic();
  } else if (!getMusicOn() && isPlaying) {
    pauseMusic();
  }
}
