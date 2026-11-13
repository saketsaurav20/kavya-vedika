# Kavya Vedika (काव्य वेदिका)
### The Sacred Altar of Indian Literature, Vedic Philosophy, Classical Poetics & The Sabha

> *"Asato mā sadgamaya, tamaso mā jyotirgamaya, mṛtyormāmṛtaṃ gamaya."*
> — *Bṛhadāraṇyaka Upaniṣad (1.3.28)*

---

## Overview

**Kavya Vedika** is a bespoke classical Indian spiritual literature and poetry web sanctuary inspired by the interaction design and visual aesthetic of [cheaperinference.com](https://www.cheaperinference.com).

It features:
1. **Pinned Scroll Hero Engine (Reverse-Engineered from cheaperinference.com)**:
   - Sticky viewport stage pinned at `top: 0` inside an elongated scroll track.
   - Dynamic CSS variable `--hero-progress` continuously computed from `0.0000` to `1.0000` via `requestAnimationFrame`, `IntersectionObserver`, and `ResizeObserver`.
   - Multi-stage mathematical cross-fade typography curves:
     - **Intro Text**: *Echoes of the Eternal Canon* (`translateY` + `scale` fade-out)
     - **Arrival Text**: *From Vedic Flame to Living Verse* (`translateY` ascent + `opacity` fade-in)
   - Multi-layered atmospheric lighting: Conic + radial golden sunbeam shaders (`mix-blend-mode: screen`), atmospheric mist blur layers, antique parchment patina vignette, and linear/radial legibility shade.

2. **The Sacred Indian Canon**:
   - **The Four Vedas**: Rigveda, Yajurveda, Samaveda, Atharvaveda with seminal suktas (*Nasadiya Sukta*, *Gayatri Mantra*, *Purusha Sukta*, *Vak Sukta*).
   - **The Principal Mukhya Upanishads**: Isha, Katha, Mandukya (*Turiya & A-U-M*), Chandogya (*Tat Tvam Asi*), and Brihadaranyaka (*Aham Brahmasmi*).
   - **Mythological & Classical Sanskrit Masters**: Maharishi Valmiki (Adikavi of the Ramayana), Maharishi Ved Vyasa (Mahabharata & Gita), Mahakavi Kalidasa (*Meghaduta*), Adi Shankaracharya (*Nirvana Shatkam*), and Bhartrihari (*Vairagya Shatakam*).
   - **Bhakti & Medieval Mystics**: Sant Kabir Das, Goswami Tulsidas, and Mirabai.
   - **Modern Renaissance Giants**: Rabindranath Tagore (*Gitanjali*), Sri Aurobindo (*Savitri*), Subramania Bharati, Mirza Ghalib, and Ramdhari Singh 'Dinkar' (*Rashmirathi*).

3. **The Sabha (सभा) — Interactive Discussion Forum**:
   - Categorized discourse across *Vedic Exegesis*, *Upanishadic Advaita*, *Classical Rasa & Kavya*, *Bhakti Mysticism*, and *Modern Reflections*.
   - Client-side persistence via `localStorage`.
   - Rich thread initiation with integrated scripture citation linking.
   - Nested commentary system and *Anumodana* (sacred upvoting).

4. **Procedural Majestic Om (AUM / ॐ) Chant Engine & Sacred Sound Sanctuary**:
   - Built natively with the browser's **Web Audio API** (zero external MP3/WAV files).
   - Simulates a majestic Vedic temple choir chanting the primordial cosmic syllable $A\text{-}U\text{-}M$ (ॐ) in an ancient Himalayan stone cave acoustics.
   - Dynamic 3-stage vocal formant synthesis: $A$ (Akāra) $\rightarrow$ $U$ (Ukāra) $\rightarrow$ $M$ (Makāra / Bhramari nasal hum) $\rightarrow$ Turīya (Sacred Silence).
   - Choral 3-monk stereo ensemble (center lead + detuned left and right voices) with a chest-resonant 68.05 Hz monastic sub-bass and 136.1 Hz Cosmic Om fundamental.
   - Himalayan singing bowl chime initiation and procedural algorithmic stone-cave convolution reverb.
   - Interactive Sound Sanctuary popover: tune between 136.1 Hz (Cosmic Om), 108 Hz (Sacred Temple Count), 146.8 Hz (D), and fine-tune volume.

5. **Deep-Dive Shloka Modal**:
   - Original Devanagari script.
   - Standardized IAST scholarly transliteration.
   - Word-by-word grammatical exposition (*Anvaya*).
   - Poetic English translation & philosophical commentary.
   - One-click citation clipboard copy and direct "Discuss in Sabha" bridge.

6. **Global Spotlight Search (`Cmd + K` / `Ctrl + K`)**:
   - Instant multi-category search across hymns, mantras, poets, and Sabha inquiries.

---

## Technology Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS Modules
- **Audio Engine**: Native Web Audio API procedural synthesizer
- **Icons**: Lucide React
- **Typography**: Google Fonts (*Cinzel*, *Cormorant Garamond*, *Noto Serif Devanagari*, *Rozha One*, *Inter*)

---

## Quick Start

### Prerequisites
- Node.js (v18 or newer)
- npm or pnpm

### Installation & Launch

```bash
# Navigate to the project directory
cd kavya-vedika

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
# Typecheck and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```
