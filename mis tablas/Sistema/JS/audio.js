// Módulo de Audio y Síntesis de Voz para MIS TABLAS
// Utiliza Web Audio API (100% autónomo, sin dependencias externas) y Web Speech API

const AudioManager = {
  audioCtx: null,
  soundEnabled: true,
  speechEnabled: true,

  init() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    } catch (e) {
      console.warn("AudioContext no disponible:", e);
    }
  },

  ensureContext() {
    if (!this.audioCtx) this.init();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  },

  // Sonido de acierto / éxito (arpegio mayor ascendente alegre)
  playSuccess() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.08);
      
      gain.gain.setValueAtTime(0, this.audioCtx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, this.audioCtx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.08 + 0.25);
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(this.audioCtx.currentTime + idx * 0.08);
      osc.stop(this.audioCtx.currentTime + idx * 0.08 + 0.3);
    });
  },

  // Sonido suave de intento / error pedagógico (no frustrante)
  playTryAgain() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(330, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, this.audioCtx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.18, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.28);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.3);
  },

  // Clic de interacción táctil
  playClick() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.audioCtx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.07);
  },

  // Fanfarria de victoria o logro / medalla
  playFanfare() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const melody = [
      { f: 523.25, d: 0.12 }, // C
      { f: 523.25, d: 0.12 }, // C
      { f: 523.25, d: 0.12 }, // C
      { f: 659.25, d: 0.35 }, // E
      { f: 587.33, d: 0.15 }, // D
      { f: 659.25, d: 0.15 }, // E
      { f: 783.99, d: 0.50 }  // G
    ];

    let t = this.audioCtx.currentTime;
    melody.forEach((note) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(t);
      osc.stop(t + note.d + 0.05);

      t += note.d * 0.9;
    });
  },

  // Volteo de carta de memoria
  playCardFlip() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, this.audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.1);
  },

  // Síntesis de voz para accesibilidad pedagógica
  speak(text) {
    if (!this.speechEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel(); // Detener lecturas previas
      const clean = text.replace(/×/g, ' por ').replace(/\*/g, ' por ');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = 'es-CL';
      utterance.rate = 0.95; // Un poco más pausado para niños de 4° básico
      utterance.pitch = 1.1; // Tono más cálido y amigable

      // Buscar voz en español si existe
      const voices = window.speechSynthesis.getVoices();
      const esVoice = voices.find(v => v.lang.startsWith('es'));
      if (esVoice) utterance.voice = esVoice;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Error en síntesis de voz:", e);
    }
  },

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  },

  toggleSpeech() {
    this.speechEnabled = !this.speechEnabled;
    if (!this.speechEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    return this.speechEnabled;
  }
};
