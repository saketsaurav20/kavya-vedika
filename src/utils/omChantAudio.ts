// Web Audio API Procedural Sacred Om (AUM / ॐ) Chant Engine
// Synthesizes a majestic, deeply soothing Vedic temple choir chanting the primordial syllable A-U-M (ॐ)
// Features:
// 1. 136.1 Hz Cosmic Om fundamental (Earth Year / Sadja C#3) & 68.05 Hz deep monastic chest bass
// 2. Choral 3-monk stereo ensemble with organic micro-detuning & breathing vibrato
// 3. Dynamic 3-stage vocal formant synthesis: 'A' (Akaara) -> 'U' (Ukaara) -> 'M' (Makaara / Bhramari) -> Turiya (Silence)
// 4. Himalayan singing bowl / temple bell chime initiation on each breath cycle
// 5. Procedural convolution reverb simulating an ancient Himalayan stone cave temple

export type OmChantKey = '136.1Hz (Cosmic Om)' | '108Hz (Sacred)' | '146.8Hz (D)' | '128Hz (C-Parchment)';

interface OmConfig {
  pitchKey: OmChantKey;
  volume: number;
  cycleDuration: number; // Duration of one full A-U-M chant in seconds (default ~10.5s)
  reverbWet: number;
}

const FREQUENCIES: Record<OmChantKey, number> = {
  '136.1Hz (Cosmic Om)': 136.1, // Sacred C#3 Earth Frequency / Om
  '108Hz (Sacred)': 108.0,      // Sacred 108 Upanishadic Count (A2)
  '146.8Hz (D)': 146.83,        // Classic Indian D
  '128Hz (C-Parchment)': 128.0  // Scientific C pitch
};

class OmChantEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private reverbNode: ConvolverNode | null = null;
  private isPlaying: boolean = false;
  private chantTimer: number | null = null;
  private activeOscs: Set<OscillatorNode> = new Set();
  private activeGains: Set<GainNode> = new Set();

  private config: OmConfig = {
    pitchKey: '136.1Hz (Cosmic Om)',
    volume: 0.65,
    cycleDuration: 10.5,
    reverbWet: 0.45
  };

  private listeners: ((playing: boolean) => void)[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.config.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Generate procedural temple cave reverb
      this.reverbNode = this.ctx.createConvolver();
      this.reverbNode.buffer = this.buildCaveReverbBuffer(this.ctx);

      const reverbGain = this.ctx.createGain();
      reverbGain.gain.setValueAtTime(this.config.reverbWet, this.ctx.currentTime);

      this.reverbNode.connect(reverbGain);
      reverbGain.connect(this.masterGain);
    }
  }

  private registerOsc(osc: OscillatorNode) {
    this.activeOscs.add(osc);
    osc.addEventListener('ended', () => {
      this.activeOscs.delete(osc);
    });
  }

  private registerGain(gain: GainNode) {
    this.activeGains.add(gain);
  }

  /**
   * Procedurally generates a warm, majestic 3.4-second stereo impulse response
   * modeling an ancient Himalayan stone cave temple with natural absorption.
   */
  private buildCaveReverbBuffer(ctx: AudioContext): AudioBuffer {
    const rate = ctx.sampleRate;
    const length = Math.floor(rate * 3.4);
    const impulse = ctx.createBuffer(2, length, rate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);

    const decay = 2.1; // Smooth natural tail

    for (let i = 0; i < length; i++) {
      const t = i / rate;
      const envelope = Math.exp(-t * decay);
      // Gentle warm noise filtered across time
      const randL = (Math.random() * 2 - 1) * envelope;
      const randR = (Math.random() * 2 - 1) * envelope;

      // Early discrete reflection taps for spatial width
      const earlyTap1 = (i === Math.floor(rate * 0.035)) ? 0.35 : 0;
      const earlyTap2 = (i === Math.floor(rate * 0.062)) ? 0.25 : 0;

      left[i] = (randL + earlyTap1) * 0.8;
      right[i] = (randR + earlyTap2) * 0.8;
    }

    return impulse;
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getConfig(): OmConfig {
    return { ...this.config };
  }

  public setVolume(val: number) {
    this.config.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && this.isPlaying) {
      this.masterGain.gain.setTargetAtTime(this.config.volume, this.ctx.currentTime, 0.05);
    }
  }

  public setPitch(pitch: OmChantKey) {
    this.config.pitchKey = pitch;
    if (this.isPlaying) {
      this.stop();
      this.start();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;

    // Ensure audio context is running
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    const now = this.ctx.currentTime;
    try {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(0.0001, now);
      this.masterGain.gain.linearRampToValueAtTime(this.config.volume, now + 0.05);
    } catch {
      this.masterGain.gain.setValueAtTime(this.config.volume, now);
    }

    this.notify();

    // Start ambient foundation drone (undercurrent)
    this.startFoundationDrone();

    // Trigger the first majestic Om chant immediately
    this.chantOmCycle();

    // Clear any previous interval and schedule repeating breath cycle
    if (this.chantTimer !== null) {
      clearInterval(this.chantTimer);
    }
    this.chantTimer = window.setInterval(() => {
      if (this.isPlaying) {
        this.chantOmCycle();
      }
    }, this.config.cycleDuration * 1000);
  }

  public stop() {
    this.isPlaying = false;

    if (this.chantTimer !== null) {
      clearInterval(this.chantTimer);
      this.chantTimer = null;
    }

    // Smoothly fade out master gain within 50ms to prevent pops while giving instant silence
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      try {
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.05);
      } catch {}
    }

    // Stop and disconnect all active oscillators immediately
    this.activeOscs.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    this.activeOscs.clear();

    // Disconnect active gains
    this.activeGains.forEach(gain => {
      try {
        gain.disconnect();
      } catch {}
    });
    this.activeGains.clear();

    // Safely suspend audio context after short 60ms fade to completely stop hardware processing
    if (this.ctx && this.ctx.state === 'running') {
      setTimeout(() => {
        if (!this.isPlaying && this.ctx && this.ctx.state === 'running') {
          this.ctx.suspend().catch(() => {});
        }
      }, 60);
    }

    this.notify();
  }

  /**
   * Continuous gentle background cosmic drone (warm Tanpura/Tibetan bowl hum)
   * so there is never stark silence between breaths.
   */
  private startFoundationDrone() {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const f0 = FREQUENCIES[this.config.pitchKey];

    // Sub-harmonic warm base (68Hz for 136Hz)
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(f0 / 2, now);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(0.18, now + 2.0);

    // Cosmic fifth (Pa harmonic = f0 * 1.5)
    const fifthOsc = this.ctx.createOscillator();
    fifthOsc.type = 'sine';
    fifthOsc.frequency.setValueAtTime(f0 * 1.5, now);

    const fifthGain = this.ctx.createGain();
    fifthGain.gain.setValueAtTime(0.001, now);
    fifthGain.gain.linearRampToValueAtTime(0.09, now + 2.5);

    subOsc.connect(subGain);
    fifthOsc.connect(fifthGain);

    subGain.connect(this.masterGain);
    fifthGain.connect(this.masterGain);

    if (this.reverbNode) {
      subGain.connect(this.reverbNode);
      fifthGain.connect(this.reverbNode);
    }

    this.registerOsc(subOsc);
    this.registerOsc(fifthOsc);
    this.registerGain(subGain);
    this.registerGain(fifthGain);

    subOsc.start(now);
    fifthOsc.start(now);
  }

  /**
   * Synthesizes one full, majestic chant of the sacred syllable A-U-M (ॐ).
   * 1. 0s - 2.8s: "Aaaaa" (Open, radiant chest resonance)
   * 2. 2.8s - 6.5s: "Oooouuu" (Gathering, deep palatal warmth)
   * 3. 6.5s - 9.0s: "Mmmmmm" (Nasal cranium Bhramari vibration)
   * 4. 9.0s - 10.5s: Turiya (Silent lingering reverberation in the stone sanctum)
   */
  private chantOmCycle() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    const f0 = FREQUENCIES[this.config.pitchKey];
    const duration = this.config.cycleDuration;

    // Trigger soft temple chime / singing bowl at the onset of each chant
    this.playSingingBowlChime(now, f0 * 4);

    // Choral Voices (3 Monks: Center, Left detuned, Right detuned)
    this.createMonkVoice(now, f0, 0, 0, duration);          // Center Lead Monk
    this.createMonkVoice(now, f0, -2.2, -0.42, duration);   // Left Monk
    this.createMonkVoice(now, f0, +2.5, 0.42, duration);    // Right Monk
  }

  /**
   * Synthesizes one monk's vocal tract executing the A -> U -> M phonetic transition.
   */
  private createMonkVoice(
    startTime: number,
    baseFreq: number,
    detuneCents: number,
    panX: number,
    duration: number
  ) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    // Voice Gain Envelope: Gentle intake breath -> swelling majestic chant -> soft fade into M -> silence
    const voiceGain = this.ctx.createGain();
    voiceGain.gain.setValueAtTime(0.0001, startTime);

    // Breath intake / onset
    voiceGain.gain.linearRampToValueAtTime(0.26, startTime + 1.2);
    // Peak majestic chant during 'A' and 'U'
    voiceGain.gain.setValueAtTime(0.28, startTime + 3.0);
    // Sustained deep warmth during 'U'
    voiceGain.gain.setValueAtTime(0.25, startTime + 5.5);
    // Nasal hum 'M' transition (quieter, cranial vibration)
    voiceGain.gain.linearRampToValueAtTime(0.18, startTime + 7.0);
    voiceGain.gain.exponentialRampToValueAtTime(0.0001, startTime + (duration * 0.88));

    // Panner
    const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
    if (panner) {
      panner.pan.setValueAtTime(panX, startTime);
    }

    // Vibrato LFO (organic human vocal pitch fluctuation ~ 4.2Hz)
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(4.2 + (panX * 0.4), startTime);
    vibratoGain.gain.setValueAtTime(1.8, startTime); // subtle cents vibrato
    vibrato.connect(vibratoGain);

    // Source Sound: Rich sawtooth waves for vocal harmonics + triangle for body
    const sawOsc = this.ctx.createOscillator();
    sawOsc.type = 'sawtooth';
    sawOsc.frequency.setValueAtTime(baseFreq, startTime);
    sawOsc.detune.setValueAtTime(detuneCents, startTime);
    vibratoGain.connect(sawOsc.detune);

    // Sub-chest fundamental (deep monastic voice)
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(baseFreq / 2, startTime);
    subOsc.detune.setValueAtTime(detuneCents, startTime);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.35, startTime);
    subOsc.connect(subGain);

    // ==========================================
    // PARALLEL FORMANT FILTERS (Vocal Tract)
    // ==========================================
    // Formant 1 (F1): Primary jaw/throat opening
    // A (~720Hz) -> U (~340Hz) -> M (~210Hz)
    const f1 = this.ctx.createBiquadFilter();
    f1.type = 'bandpass';
    f1.Q.setValueAtTime(4.0, startTime);
    f1.frequency.setValueAtTime(720, startTime);
    f1.frequency.linearRampToValueAtTime(740, startTime + 1.5); // 'A'
    f1.frequency.exponentialRampToValueAtTime(340, startTime + 4.8); // 'U'
    f1.frequency.exponentialRampToValueAtTime(210, startTime + 7.2); // 'M'

    // Formant 2 (F2): Tongue position / palate
    // A (~1250Hz) -> U (~800Hz) -> M (~460Hz)
    const f2 = this.ctx.createBiquadFilter();
    f2.type = 'bandpass';
    f2.Q.setValueAtTime(5.2, startTime);
    f2.frequency.setValueAtTime(1250, startTime);
    f2.frequency.linearRampToValueAtTime(1200, startTime + 1.5); // 'A'
    f2.frequency.exponentialRampToValueAtTime(800, startTime + 4.8); // 'U'
    f2.frequency.exponentialRampToValueAtTime(460, startTime + 7.2); // 'M'

    // Formant 3 (F3): Cranial & Nasal resonance
    // A (~2500Hz) -> U (~2100Hz) -> M (~1550Hz)
    const f3 = this.ctx.createBiquadFilter();
    f3.type = 'bandpass';
    f3.Q.setValueAtTime(6.0, startTime);
    f3.frequency.setValueAtTime(2500, startTime);
    f3.frequency.exponentialRampToValueAtTime(2100, startTime + 4.8);
    f3.frequency.exponentialRampToValueAtTime(1550, startTime + 7.2);

    // Warm Lowpass to roll off any artificial buzzy high harmonics
    const postWarmth = this.ctx.createBiquadFilter();
    postWarmth.type = 'lowpass';
    postWarmth.frequency.setValueAtTime(3200, startTime);

    // Mix formants
    const formantsMix = this.ctx.createGain();
    formantsMix.gain.setValueAtTime(1.0, startTime);

    sawOsc.connect(f1);
    sawOsc.connect(f2);
    sawOsc.connect(f3);

    f1.connect(formantsMix);
    f2.connect(formantsMix);
    f3.connect(formantsMix);
    subGain.connect(formantsMix);

    formantsMix.connect(postWarmth);

    if (panner) {
      postWarmth.connect(panner);
      panner.connect(voiceGain);
    } else {
      postWarmth.connect(voiceGain);
    }

    // Connect to Master and Temple Cave Reverb
    voiceGain.connect(this.masterGain);
    if (this.reverbNode) {
      voiceGain.connect(this.reverbNode);
    }

    // Register active nodes for instant clean pausing
    this.registerOsc(vibrato);
    this.registerOsc(sawOsc);
    this.registerOsc(subOsc);
    this.registerGain(voiceGain);
    this.registerGain(vibratoGain);
    this.registerGain(subGain);
    this.registerGain(formantsMix);

    // Start & Stop
    vibrato.start(startTime);
    sawOsc.start(startTime);
    subOsc.start(startTime);

    const stopTime = startTime + duration;
    vibrato.stop(stopTime);
    sawOsc.stop(stopTime);
    subOsc.stop(stopTime);
  }

  /**
   * Delicate Tibetan singing bowl / Bell chime that initiates each Om cycle
   */
  private playSingingBowlChime(startTime: number, freq: number) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const chimeGain = this.ctx.createGain();
    chimeGain.gain.setValueAtTime(0.0001, startTime);
    chimeGain.gain.linearRampToValueAtTime(0.08, startTime + 0.05);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 6.0);

    this.registerGain(chimeGain);

    // Pure crystal overtone components (1.0x, 2.76x, 5.4x)
    const partials = [freq, freq * 2.76, freq * 5.4];

    partials.forEach((pFreq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pFreq, startTime);

      const pGain = this.ctx.createGain();
      pGain.gain.setValueAtTime(idx === 0 ? 0.7 : 0.25, startTime);

      osc.connect(pGain);
      pGain.connect(chimeGain);

      this.registerOsc(osc);
      this.registerGain(pGain);

      osc.start(startTime);
      osc.stop(startTime + 6.2);
    });

    chimeGain.connect(this.masterGain);
    if (this.reverbNode) {
      chimeGain.connect(this.reverbNode);
    }
  }
}

export const omChant = new OmChantEngine();
// Alias for backward compatibility if needed
export const tanpura = omChant;
