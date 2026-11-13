// Procedural Web Audio API sound effects for the 3D Bookshelf & Book Folio
// Synthesizes:
// 1. Gentle parchment page turn rustle
// 2. Wooden shelf book slide
// 3. Sacred opening chime / singing bowl tint

class BookAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Suspend audio context when tab is inactive to save battery and prevent audio glitches
   */
  public suspend() {
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend().catch(() => {});
    }
  }

  /**
   * Resume audio context when tab returns to focus
   */
  public resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  /**
   * High-fidelity, multi-layered parchment paper sound:
   * Uses pitch randomization between 0.96 and 1.04 (per library.jjangik.kr sound.js spec)
   * 1. Crisp initial paper separation / lift
   * 2. Sweeping air curve flutter
   * 3. Gentle paper settle / landing tap
   */
  public playPageTurn() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Pitch randomization between 0.96 and 1.04 prevents mechanical audio fatigue
      const pitch = 0.96 + Math.random() * 0.08;

      // Layer 1: Crisp paper friction / lift rustle (0.42s)
      const bufferSize = Math.floor(this.ctx.sampleRate * (0.45 * (1 / pitch)));
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        // Fine paper fiber crackle
        const fiberCrackle = Math.random() < 0.03 ? (Math.random() * 0.8 - 0.4) : 0;
        data[i] = (b0 + b1 + b2) * 0.28 + fiberCrackle;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.playbackRate.value = pitch;

      // Sweeping bandpass filter to simulate paper arching through air
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(1.8 * pitch, now);
      filter.frequency.setValueAtTime(1600 * pitch, now);
      filter.frequency.exponentialRampToValueAtTime(700 * pitch, now + 0.28);
      filter.frequency.linearRampToValueAtTime(450 * pitch, now + 0.42);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.20, now + 0.05); // Initial crisp peel
      gain.gain.linearRampToValueAtTime(0.12, now + 0.22); // Air swoosh
      gain.gain.linearRampToValueAtTime(0.16, now + 0.35); // Landing flutter
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noiseSource.start(now);
      noiseSource.stop(now + 0.45);

      // Layer 2: Subtle low-frequency paper flutter & gentle stack landing tap (0.32s - 0.45s)
      const tapBuffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.12), this.ctx.sampleRate);
      const tapData = tapBuffer.getChannelData(0);
      for (let i = 0; i < tapData.length; i++) {
        tapData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.025));
      }
      const tapSource = this.ctx.createBufferSource();
      tapSource.buffer = tapBuffer;
      tapSource.playbackRate.value = pitch;

      const tapFilter = this.ctx.createBiquadFilter();
      tapFilter.type = 'lowpass';
      tapFilter.frequency.setValueAtTime(320 * pitch, now + 0.34);

      const tapGain = this.ctx.createGain();
      tapGain.gain.setValueAtTime(0.0001, now + 0.34);
      tapGain.gain.linearRampToValueAtTime(0.15, now + 0.36);
      tapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.46);

      tapSource.connect(tapFilter);
      tapFilter.connect(tapGain);
      tapGain.connect(this.ctx.destination);

      tapSource.start(now + 0.34);
    } catch {}
  }

  /**
   * Deep wooden/cloth friction sound when pulling or returning a book
   * Randomized pitch (0.96 - 1.04) prevents repetitive mechanical audio
   */
  public playBookSlide(pullOut: boolean = true) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const pitch = 0.96 + Math.random() * 0.08;
      const duration = 0.38 / pitch;

      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.25;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.playbackRate.value = pitch;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime((pullOut ? 280 : 360) * pitch, now);
      filter.frequency.linearRampToValueAtTime((pullOut ? 480 : 220) * pitch, now + duration);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noiseSource.start(now);
      noiseSource.stop(now + duration);
    } catch {}
  }

  /**
   * Warm brass chime on book opening
   */
  public playBookOpenChime() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const pitch = 0.98 + Math.random() * 0.04;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(544.4 * pitch, now); // C#5 celestial harmonic
      osc.frequency.exponentialRampToValueAtTime(272.2 * pitch, now + 1.2);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.5);
    } catch {}
  }

  /**
   * Crisp brass bead pull-chain click for the lamp light toggle
   */
  public playLampClick(turnOn: boolean = true) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(turnOn ? 1800 : 1200, now);
      osc.frequency.exponentialRampToValueAtTime(turnOn ? 3200 : 700, now + 0.045);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch {}
  }
}

export const bookAudio = new BookAudioEngine();
