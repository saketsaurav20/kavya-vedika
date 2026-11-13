import * as THREE from 'three';
import type { GranthBook } from '../../types/bookshelf';

export class BookTextureFactory {
  private static spineCache: Map<string, THREE.CanvasTexture> = new Map();
  private static coverCache: Map<string, THREE.CanvasTexture> = new Map();
  private static pageEdgeTexture: THREE.CanvasTexture | null = null;
  private static woodTexture: THREE.CanvasTexture | null = null;
  private static backWoodTexture: THREE.CanvasTexture | null = null;
  private static skyTexture: THREE.CanvasTexture | null = null;
  private static moonTexture: THREE.CanvasTexture | null = null;
  private static maxAnisotropy: number = 16;

  public static setMaxAnisotropy(val: number) {
    this.maxAnisotropy = Math.max(8, val);
  }

  public static getMaxAnisotropy(): number {
    return this.maxAnisotropy;
  }

  /**
   * GPU Memory Disposal routine: releases all cached CanvasTexture handles from VRAM
   */
  public static disposeAll() {
    this.spineCache.forEach(tex => tex.dispose());
    this.spineCache.clear();
    this.coverCache.forEach(tex => tex.dispose());
    this.coverCache.clear();
    if (this.pageEdgeTexture) {
      this.pageEdgeTexture.dispose();
      this.pageEdgeTexture = null;
    }
    if (this.woodTexture) {
      this.woodTexture.dispose();
      this.woodTexture = null;
    }
    if (this.backWoodTexture) {
      this.backWoodTexture.dispose();
      this.backWoodTexture = null;
    }
    if (this.skyTexture) {
      this.skyTexture.dispose();
      this.skyTexture = null;
    }
    if (this.moonTexture) {
      this.moonTexture.dispose();
      this.moonTexture = null;
    }
  }

  /**
   * Procedural Mathematical Wood Grain Texture Generator:
   * Generates organic longitudinal wood fibers, growth rings, knots, and medullary pores
   * onto a hidden 1024x512 canvas, mapped to shelf planks with anisotropic filtering.
   */
  public static createWoodGrainTexture(): THREE.CanvasTexture {
    if (this.woodTexture) return this.woodTexture;

    const width = 1024;
    const height = 512;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // 1. Base Warm Honey Walnut / Teak Gradient
    const baseGrad = ctx.createLinearGradient(0, 0, width, height);
    baseGrad.addColorStop(0.0, '#5a3d28');
    baseGrad.addColorStop(0.3, '#4e3321');
    baseGrad.addColorStop(0.7, '#62432c');
    baseGrad.addColorStop(1.0, '#442b1a');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Procedural Longitudinal Wood Fibers (flowing horizontally along the plank)
    const numFibers = 130;
    for (let i = 0; i < numFibers; i++) {
      const baseY = (i / numFibers) * height;
      const waveFreq1 = 0.003 + (i % 7) * 0.0008;
      const waveFreq2 = 0.008 + (i % 5) * 0.0012;
      const waveAmp1 = 12 + (i % 11) * 3;
      const waveAmp2 = 4 + (i % 3) * 2;
      const phase = (i * 17.3);

      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (let x = 0; x <= width; x += 16) {
        const yOffset = Math.sin(x * waveFreq1 + phase) * waveAmp1 + Math.cos(x * waveFreq2 + phase * 0.7) * waveAmp2;
        ctx.lineTo(x, baseY + yOffset);
      }

      const isRing = (i % 4 === 0);
      const isPore = (i % 2 === 0);
      const alpha = isRing ? 0.09 : isPore ? 0.06 : 0.035;
      const color = isRing ? 'rgba(215, 165, 105, ' : 'rgba(25, 14, 8, ';
      ctx.strokeStyle = color + alpha + ')';
      ctx.lineWidth = isRing ? 2.5 : 1.2;
      ctx.stroke();
    }

    // 3. Subtle Organic Wood Knot Swirls
    const knotX = width * 0.62;
    const knotY = height * 0.48;
    for (let r = 8; r < 90; r += 7) {
      ctx.save();
      ctx.translate(knotX, knotY);
      ctx.scale(2.4, 1.0);
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(30, 16, 9, ${0.12 * Math.exp(-r / 60)})`;
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();
    }

    // 4. Medullary Ray Flecks (transverse micro-pores of seasoned hardwood)
    for (let m = 0; m < 600; m++) {
      const mx = Math.random() * width;
      const my = Math.random() * height;
      const mLen = Math.random() * 8 + 3;
      ctx.strokeStyle = Math.random() < 0.4 ? 'rgba(230, 185, 130, 0.08)' : 'rgba(20, 10, 5, 0.09)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(mx + Math.random() * 2 - 1, my + mLen);
      ctx.stroke();
    }

    // 5. Micro-dots for physical timber roughness
    this.applyOrganicGrain(ctx, width, height, 8000);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 1);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = this.maxAnisotropy;

    this.woodTexture = texture;
    return texture;
  }

  /**
   * Procedural Architectural Panel Backboard Texture:
   * Generates vertical tongue-and-groove wooden planks with deep seam grooves
   */
  public static createBackboardWoodTexture(): THREE.CanvasTexture {
    if (this.backWoodTexture) return this.backWoodTexture;

    const width = 1024;
    const height = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Deep architectural panel backing
    ctx.fillStyle = '#2b1b11';
    ctx.fillRect(0, 0, width, height);

    // Vertical plank seams every 128px
    for (let x = 0; x <= width; x += 128) {
      // Dark groove shadow
      ctx.fillStyle = 'rgba(10, 5, 2, 0.85)';
      ctx.fillRect(x - 2, 0, 4, height);
      // Soft wood edge highlight
      ctx.fillStyle = 'rgba(160, 115, 75, 0.15)';
      ctx.fillRect(x + 2, 0, 2, height);
    }

    // Vertical wood fibers
    for (let j = 0; j < 180; j++) {
      const baseX = (j / 180) * width;
      ctx.beginPath();
      ctx.moveTo(baseX, 0);
      for (let y = 0; y <= height; y += 32) {
        const xOffset = Math.sin(y * 0.005 + j) * 6;
        ctx.lineTo(baseX + xOffset, y);
      }
      ctx.strokeStyle = j % 3 === 0 ? 'rgba(180, 130, 85, 0.05)' : 'rgba(15, 8, 4, 0.07)';
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }

    this.applyOrganicGrain(ctx, width, height, 10000);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = this.maxAnisotropy;

    this.backWoodTexture = texture;
    return texture;
  }

  /**
   * Procedural Organic Grain Generator (matching shelf.js La function):
   * Generates exactly 12,000 randomized micro-dots (pores & paper highlights)
   * and 1,400 jittered lines to eradicate flat digital CG look and simulate
   * genuine antique leather grain and paper fibers.
   */
  public static applyOrganicGrain(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    dotCount: number = 12000
  ) {
    // 1. Exactly 12,000 randomized micro-dots for authentic physical noise
    for (let i = 0; i < dotCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const size = Math.random() * 2.2 + 0.6;
      const isLightFleck = Math.random() < 0.38;

      ctx.fillStyle = isLightFleck
        ? `rgba(255, 245, 220, ${Math.random() * 0.045 + 0.015})`
        : `rgba(15, 10, 5, ${Math.random() * 0.065 + 0.025})`;

      ctx.beginPath();
      ctx.arc(rx, ry, size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Jittered micro-grain fibers (1,400 strokes)
    ctx.lineWidth = 0.8;
    for (let j = 0; j < 1400; j++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const len = Math.random() * 12 + 3;
      const angle = Math.random() * Math.PI * 2;
      const isLightFiber = Math.random() < 0.32;

      ctx.strokeStyle = isLightFiber
        ? `rgba(255, 248, 230, ${Math.random() * 0.04 + 0.01})`
        : `rgba(20, 12, 6, ${Math.random() * 0.055 + 0.018})`;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
      ctx.stroke();
    }
  }

  /**
   * Baked Ambient Occlusion Border:
   * Adds a subtle dark ambient occlusion border (a 2-3px gradient darkening to rgba(0,0,0,0.35))
   * along the outer perimeter of the canvas drawing to simulate baked contact occlusion
   * where books press tightly together and against the shelf planks.
   */
  public static applyAmbientOcclusionBorder(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    borderWidth: number = 3
  ) {
    ctx.save();

    // 1. Left perimeter border (contact with adjacent codex)
    const leftGrad = ctx.createLinearGradient(0, 0, borderWidth, 0);
    leftGrad.addColorStop(0, 'rgba(0, 0, 0, 0.35)');
    leftGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = leftGrad;
    ctx.fillRect(0, 0, borderWidth, height);

    // 2. Right perimeter border (contact with adjacent codex)
    const rightGrad = ctx.createLinearGradient(width, 0, width - borderWidth, 0);
    rightGrad.addColorStop(0, 'rgba(0, 0, 0, 0.35)');
    rightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = rightGrad;
    ctx.fillRect(width - borderWidth, 0, borderWidth, height);

    // 3. Top perimeter border
    const topGrad = ctx.createLinearGradient(0, 0, 0, borderWidth);
    topGrad.addColorStop(0, 'rgba(0, 0, 0, 0.35)');
    topGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, width, borderWidth);

    // 4. Bottom perimeter border (contact with shelf plank)
    const bottomGrad = ctx.createLinearGradient(0, height, 0, height - borderWidth);
    bottomGrad.addColorStop(0, 'rgba(0, 0, 0, 0.35)');
    bottomGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = bottomGrad;
    ctx.fillRect(0, height - borderWidth, width, borderWidth);

    ctx.restore();
  }

  /**
   * Procedural Book Canvas Drawing (`createBookTexture`):
   * Factory dispatcher generating either spine or cover texture with baked ambient occlusion
   */
  public static createBookTexture(book: GranthBook, type: 'spine' | 'cover' = 'spine'): THREE.CanvasTexture {
    return type === 'spine' ? this.createSpineTexture(book) : this.createCoverTexture(book);
  }

  /**
   * Generates a high-resolution, embossed gold-foil leather spine texture
   * Canvas resolution: 512 x 2048 with high-contrast lacquer cartouche and large typography
   */
  public static createSpineTexture(book: GranthBook): THREE.CanvasTexture {
    const cacheKey = `spine-v3-${book.id}-${book.spineColor}-${book.accentColor}`;
    if (this.spineCache.has(cacheKey)) {
      return this.spineCache.get(cacheKey)!;
    }

    const width = 512;
    const height = 2048;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return new THREE.CanvasTexture(canvas);
    }

    const { sanskrit, english, tag } = this.getSpineTitles(book);

    // 1. Rich Antique Leather Gradient
    const baseGrad = ctx.createLinearGradient(0, 0, width, 0);
    baseGrad.addColorStop(0.0, this.shadeColor(book.spineColor, -50));
    baseGrad.addColorStop(0.12, this.shadeColor(book.spineColor, -15));
    baseGrad.addColorStop(0.40, this.shadeColor(book.spineColor, 12));
    baseGrad.addColorStop(0.50, this.shadeColor(book.spineColor, 20)); // Soft spine specular highlight
    baseGrad.addColorStop(0.60, this.shadeColor(book.spineColor, 12));
    baseGrad.addColorStop(0.88, this.shadeColor(book.spineColor, -15));
    baseGrad.addColorStop(1.0, this.shadeColor(book.spineColor, -55));
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Procedural Organic Leather Pore & Paper Fiber Texture (12,000 micro-dots per shelf.js spec)
    this.applyOrganicGrain(ctx, width, height, 12000);

    // 3. Raised Horizontal Binding Ribs (Hubs) on Classical Spines
    // Rib pairs at top and bottom, leaving the entire central 1400px open for the title
    const ribPositions = [110, 280, 1730, 1910];
    ribPositions.forEach(y => {
      // Dark under-shadow for deep 3D bevel
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.fillRect(16, y - 10, width - 32, 22);

      // Highlighted ridge with warm golden gradient
      const ribGrad = ctx.createLinearGradient(0, y - 8, 0, y + 8);
      ribGrad.addColorStop(0, 'rgba(230, 195, 135, 0.6)');
      ribGrad.addColorStop(0.5, 'rgba(255, 245, 205, 0.95)');
      ribGrad.addColorStop(1, 'rgba(120, 80, 30, 0.5)');
      ctx.fillStyle = ribGrad;
      ctx.fillRect(20, y - 6, width - 40, 12);

      // Gold rib filigree dots
      ctx.fillStyle = '#ffdf78';
      for (let x = 44; x < width - 44; x += 32) {
        ctx.beginPath();
        ctx.arc(x, y, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // 4. Sacred Top Medallion (Between top ribs: y = 120 to 270)
    ctx.save();
    ctx.translate(width / 2, 195);
    ctx.shadowColor = 'rgba(255, 220, 140, 0.85)';
    ctx.shadowBlur = 14;

    // Small circular decorative frame
    ctx.strokeStyle = '#deb86a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 64, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, 56, 0, Math.PI * 2);
    ctx.stroke();

    // Sacred Emblem (ॐ / Lotus)
    ctx.fillStyle = '#fff0b8';
    ctx.font = 'bold 88px "Noto Serif Devanagari", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ॐ', 0, 2);
    ctx.restore();

    // 5. HIGH-CONTRAST CENTRAL TITLE CARTOUCHE (PLAQUE)
    // Dark lacquer plate inset into the spine so text pops with 100% clarity on any spine color
    const plaqueY = 320;
    const plaqueHeight = 1370;
    const plaqueWidth = width - 64;
    const plaqueX = 32;

    // Dark lacquer backdrop with subtle inner gradient
    const plaqueGrad = ctx.createLinearGradient(0, plaqueY, 0, plaqueY + plaqueHeight);
    plaqueGrad.addColorStop(0.0, '#120d09');
    plaqueGrad.addColorStop(0.5, '#1d150e');
    plaqueGrad.addColorStop(1.0, '#120d09');
    ctx.fillStyle = plaqueGrad;
    ctx.fillRect(plaqueX, plaqueY, plaqueWidth, plaqueHeight);

    // Outer Heavy Gold Foil Border
    ctx.strokeStyle = '#e6c387';
    ctx.lineWidth = 6;
    ctx.strokeRect(plaqueX, plaqueY, plaqueWidth, plaqueHeight);

    // Inner Delicate Gold Border
    ctx.lineWidth = 2;
    ctx.strokeRect(plaqueX + 10, plaqueY + 10, plaqueWidth - 20, plaqueHeight - 20);

    // Corner Filigree Knots on Plaque
    const drawPlaqueCorner = (cx: number, cy: number, rot: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.strokeStyle = '#ffd77a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI / 2);
      ctx.stroke();
      ctx.fillStyle = '#ffd77a';
      ctx.beginPath();
      ctx.arc(10, 10, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    drawPlaqueCorner(plaqueX + 16, plaqueY + 16, 0);
    drawPlaqueCorner(plaqueX + plaqueWidth - 16, plaqueY + 16, Math.PI / 2);
    drawPlaqueCorner(plaqueX + plaqueWidth - 16, plaqueY + plaqueHeight - 16, Math.PI);
    drawPlaqueCorner(plaqueX + 16, plaqueY + plaqueHeight - 16, (Math.PI * 3) / 2);

    // 6. GIANT, BOLD, HIGH-CONTRAST SANSKRIT TITLE
    // Running down the spine in pure radiant ivory white with gold glow & dark stroke
    ctx.save();
    ctx.translate(width / 2, plaqueY + plaqueHeight / 2);
    ctx.rotate(Math.PI / 2); // Rotated 90 degrees clockwise down the spine

    // Calculate maximum legible font size
    let devanagariFontSize = 120;
    if (sanskrit.length >= 10) {
      devanagariFontSize = 96;
    } else if (sanskrit.length >= 8) {
      devanagariFontSize = 108;
    }

    ctx.font = `900 ${devanagariFontSize}px "Noto Serif Devanagari", "Rozha One", serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Layer A: Deep dark outline for razor-sharp edge separation
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#0a0704';
    ctx.strokeText(sanskrit, 0, 0);

    // Layer B: Warm gold shadow glow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 10;

    // Layer C: Brilliant warm ivory-white fill
    ctx.fillStyle = '#ffffff';
    ctx.fillText(sanskrit, 0, 0);
    ctx.restore();

    // 7. ILLUMINATED ENGLISH TITLE PLATE (Bottom Section: y = 1750 to 1890)
    const engPlateY = 1755;
    const engPlateHeight = 135;
    const engPlateWidth = width - 64;
    const engPlateX = 32;

    ctx.fillStyle = '#140f0a';
    ctx.fillRect(engPlateX, engPlateY, engPlateWidth, engPlateHeight);

    ctx.strokeStyle = '#deb86a';
    ctx.lineWidth = 4;
    ctx.strokeRect(engPlateX, engPlateY, engPlateWidth, engPlateHeight);

    ctx.lineWidth = 1.5;
    ctx.strokeRect(engPlateX + 6, engPlateY + 6, engPlateWidth - 12, engPlateHeight - 12);

    // English Name Typography
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 6;

    let engFontSize = 54;
    if (english.length >= 13) {
      engFontSize = 38;
    } else if (english.length >= 9) {
      engFontSize = 44;
    }

    ctx.font = `800 ${engFontSize}px "Cinzel", "Plus Jakarta Sans", sans-serif`;
    ctx.fillStyle = '#ffefa6';
    ctx.fillText(english, width / 2, engPlateY + 48);

    // Category Tag (VEDA / UPANISHAD / KAVYA)
    ctx.font = '700 28px "Cinzel", "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#deb86a';
    ctx.letterSpacing = '3px';
    ctx.fillText(tag, width / 2, engPlateY + 95);
    ctx.restore();

    // 8. Baked Ambient Occlusion Border: 2-3px gradient darkening to rgba(0,0,0,0.35)
    // Simulates micro contact shadows along outer edges where books press tightly together
    this.applyAmbientOcclusionBorder(ctx, width, height, 3);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = this.maxAnisotropy;
    this.spineCache.set(cacheKey, texture);
    return texture;
  }

  /**
   * Cleans and formats concise, punchy Sanskrit and English titles for the spine
   */
  private static getSpineTitles(book: GranthBook): { sanskrit: string; english: string; tag: string } {
    let sanskrit = book.sanskritTitle.replace(/^ॐ\s*/, '').trim();
    if (sanskrit.includes('(')) {
      sanskrit = sanskrit.split('(')[0].trim();
    }

    // Canonical, high-impact Sanskrit spine names
    if (sanskrit.includes('वेदव्यास')) sanskrit = 'वेदव्यास';
    else if (sanskrit.includes('वाल्मीकि')) sanskrit = 'वाल्मीकि';
    else if (sanskrit.includes('कालिदास')) sanskrit = 'कालिदास';
    else if (sanskrit.includes('शंकराचार्य') || sanskrit.includes('शङ्कर')) sanskrit = 'शङ्कराचार्य';
    else if (sanskrit.includes('कबीर')) sanskrit = 'सन्त कबीर';
    else if (sanskrit.includes('तुलसीदास')) sanskrit = 'तुलसीदास';
    else if (sanskrit.includes('मीराबाई')) sanskrit = 'मीराबाई';
    else if (sanskrit.includes('रवीन्द्रनाथ') || sanskrit.includes('ठाकुर')) sanskrit = 'रवीन्द्रनाथ';
    else if (sanskrit.includes('ईशावास्य') || sanskrit.includes('ईश')) sanskrit = 'ईशोपनिषद्';
    else if (sanskrit.includes('कठ')) sanskrit = 'कठोपनिषद्';
    else if (sanskrit.includes('माण्डूक्य')) sanskrit = 'माण्डूक्योपनिषद्';
    else if (sanskrit.includes('छान्दोग्य')) sanskrit = 'छान्दोग्योपनिषद्';
    else if (sanskrit.includes('बृहदारण्यक')) sanskrit = 'बृहदारण्यक';
    else if (sanskrit.includes('मुण्डक')) sanskrit = 'मुण्डकोपनिषद्';

    let english = book.title.toUpperCase()
      .replace(/^MAHARISHI\s*/, '')
      .replace(/^MAHARSHI\s*/, '')
      .replace(/^MAHĀKAVI\s*/, '')
      .replace(/^MAHAKAVI\s*/, '')
      .replace(/^ĀDI\s*/, '')
      .replace(/^ADI\s*/, '')
      .replace(/^SANT\s*/, '')
      .replace(/^GOSWAMI\s*/, '')
      .replace(/\s*UPANISHAD$/, '')
      .trim();

    let tag = 'CANON';
    if (book.shelfCategory === 'vedas') tag = 'VEDA';
    else if (book.shelfCategory === 'upanishads') tag = 'UPANISHAD';
    else if (book.shelfCategory === 'poets') tag = 'KĀVYA';

    return { sanskrit, english, tag };
  }

  /**
   * Generates front/back cover texture with gold filigree corner ornaments and frame
   */
  public static createCoverTexture(book: GranthBook): THREE.CanvasTexture {
    const cacheKey = `cover-v2-${book.id}-${book.spineColor}-${book.accentColor}`;
    if (this.coverCache.has(cacheKey)) {
      return this.coverCache.get(cacheKey)!;
    }

    const width = 1024;
    const height = 1448;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return new THREE.CanvasTexture(canvas);
    }

    // 1. Leather Background with Subtle Radial Vignette
    const bg = ctx.createRadialGradient(width * 0.5, height * 0.45, 50, width * 0.5, height * 0.5, width * 0.85);
    bg.addColorStop(0, this.shadeColor(book.spineColor, 12));
    bg.addColorStop(0.7, book.spineColor);
    bg.addColorStop(1, this.shadeColor(book.spineColor, -40));
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // 2. Procedural Organic Grain & Distress Fibers (12,000 micro-dots per shelf.js spec)
    this.applyOrganicGrain(ctx, width, height, 12000);

    // 3. Quadruple Gold Embossed Ornamental Border
    ctx.strokeStyle = book.accentColor;
    ctx.lineWidth = 6;
    ctx.strokeRect(48, 48, width - 96, height - 96);

    ctx.lineWidth = 2;
    ctx.strokeRect(62, 62, width - 124, height - 124);

    ctx.lineWidth = 1;
    ctx.strokeRect(74, 74, width - 148, height - 148);

    // Corner Ornaments (Traditional Indian Mandorla / Floral Corner Knot)
    const drawCorner = (cx: number, cy: number, rot: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.strokeStyle = book.accentColor;
      ctx.fillStyle = book.accentColor;
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(14, 14, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    drawCorner(84, 84, 0);
    drawCorner(width - 84, 84, Math.PI / 2);
    drawCorner(width - 84, height - 84, Math.PI);
    drawCorner(84, height - 84, (Math.PI * 3) / 2);

    // 4. Center Gold Emblem & Medallion
    const centerX = width / 2;
    const centerY = height * 0.42;

    ctx.save();
    ctx.shadowColor = 'rgba(255, 220, 140, 0.5)';
    ctx.shadowBlur = 16;
    ctx.strokeStyle = book.accentColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 130, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 142, 0, Math.PI * 2);
    ctx.stroke();

    // Sacred Devanagari Center Icon
    ctx.fillStyle = '#ffd77a';
    ctx.font = 'bold 84px "Noto Serif Devanagari", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ॐ', centerX, centerY - 6);
    ctx.restore();

    // 5. Majestic Cover Title Typography
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 6;

    // Sanskrit Title
    ctx.fillStyle = '#fce5b2';
    ctx.font = 'bold 54px "Noto Serif Devanagari", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(book.sanskritTitle, centerX, height * 0.64);

    // English Title
    ctx.fillStyle = book.accentColor;
    ctx.font = 'bold 36px "Cinzel", serif';
    ctx.letterSpacing = '4px';
    ctx.fillText(book.title.toUpperCase(), centerX, height * 0.71);

    // Subtitle & Era
    ctx.font = 'italic 24px "Lora", serif';
    ctx.fillStyle = 'rgba(255, 235, 190, 0.85)';
    ctx.fillText(book.subtitle, centerX, height * 0.77);

    ctx.font = '500 18px "Cinzel", serif';
    ctx.fillStyle = 'rgba(230, 195, 135, 0.65)';
    ctx.letterSpacing = '3px';
    ctx.fillText(book.era.toUpperCase(), centerX, height * 0.82);

    ctx.restore();

    // 6. Baked Ambient Occlusion Border: 2-3px gradient darkening to rgba(0,0,0,0.35)
    // Simulates micro contact shadows along perimeter where adjacent covers touch
    this.applyAmbientOcclusionBorder(ctx, width, height, 3);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.anisotropy = this.maxAnisotropy;
    this.coverCache.set(cacheKey, texture);
    return texture;
  }

  /**
   * Generates paper page edge texture (fine horizontal parchment striations)
   */
  public static getPageEdgeTexture(): THREE.CanvasTexture {
    if (this.pageEdgeTexture) {
      return this.pageEdgeTexture;
    }

    const width = 256;
    const height = 256;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return new THREE.CanvasTexture(canvas);
    }

    // Warm parchment base
    ctx.fillStyle = '#ede3cc';
    ctx.fillRect(0, 0, width, height);

    // Subtle horizontal paper edge lines
    for (let y = 0; y < height; y += 2) {
      const alpha = Math.random() * 0.18 + 0.05;
      const darkness = Math.floor(Math.random() * 40 + 130);
      ctx.fillStyle = `rgba(${darkness}, ${darkness - 15}, ${darkness - 35}, ${alpha})`;
      ctx.fillRect(0, y, width, 1);
    }

    // Antiqued page edge darkening at borders
    const borderGrad = ctx.createLinearGradient(0, 0, width, 0);
    borderGrad.addColorStop(0, 'rgba(100, 75, 45, 0.35)');
    borderGrad.addColorStop(0.15, 'rgba(100, 75, 45, 0)');
    borderGrad.addColorStop(0.85, 'rgba(100, 75, 45, 0)');
    borderGrad.addColorStop(1, 'rgba(100, 75, 45, 0.35)');
    ctx.fillStyle = borderGrad;
    ctx.fillRect(0, 0, width, height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 4);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.anisotropy = this.maxAnisotropy;
    this.pageEdgeTexture = texture;
    return texture;
  }

  private static shadeColor(color: string, percent: number): string {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = Math.min(255, Math.max(0, Math.floor(R * (100 + percent) / 100)));
    G = Math.min(255, Math.max(0, Math.floor(G * (100 + percent) / 100)));
    B = Math.min(255, Math.max(0, Math.floor(B * (100 + percent) / 100)));

    const RR = R.toString(16).padStart(2, '0');
    const GG = G.toString(16).padStart(2, '0');
    const BB = B.toString(16).padStart(2, '0');

    return `#${RR}${GG}${BB}`;
  }

  /**
   * Procedural Atmospheric Night Sky Gradient Texture:
   * Recreates the exact celestial backdrop from library.jjangik.kr (shelf.js ee object)
   * Linear vertical gradient from light moon-blue (#9fb0cf) down to twilight (#33261c / deep navy)
   * with delicate starlight pinpoints.
   */
  public static createWindowSkyTexture(): THREE.CanvasTexture {
    if (this.skyTexture) return this.skyTexture;

    const width = 512;
    const height = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return new THREE.CanvasTexture(canvas);

    // 1. Smooth Night Sky Linear Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0.0, '#9fb0cf'); // Luminous silvery moon-blue near the top
    skyGrad.addColorStop(0.25, '#6b7d9e'); // Soft lunar aura
    skyGrad.addColorStop(0.55, '#323c52'); // Atmospheric twilight indigo
    skyGrad.addColorStop(0.82, '#181d2a'); // Deep night
    skyGrad.addColorStop(1.0, '#0a0d14'); // Dark horizon
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Soft Atmospheric Cloud / Nebular Wisps
    for (let i = 0; i < 6; i++) {
      const cy = 200 + i * 110 + (Math.sin(i * 1.7) * 40);
      const cx = width * (0.2 + (i % 3) * 0.3);
      const cloudGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 180);
      cloudGrad.addColorStop(0, 'rgba(180, 205, 240, 0.08)');
      cloudGrad.addColorStop(0.5, 'rgba(120, 150, 190, 0.04)');
      cloudGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = cloudGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Starlight Pinpoints (Distant celestial stars)
    const starCount = 55;
    for (let i = 0; i < starCount; i++) {
      const sx = (Math.sin(i * 997.3) * 0.5 + 0.5) * width;
      const sy = (Math.cos(i * 613.7) * 0.5 + 0.5) * height * 0.75;
      const brightness = 0.35 + (Math.sin(i * 12.3) * 0.5 + 0.5) * 0.55;
      const r = 0.7 + (i % 3 === 0 ? 0.9 : 0.4);

      ctx.fillStyle = `rgba(240, 248, 255, ${brightness})`;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = this.maxAnisotropy;
    this.skyTexture = texture;
    return texture;
  }

  /**
   * Procedural Luminous Moon Texture with Gaussian Atmospheric Haze:
   * Generates a photorealistic moon disc surrounded by a multi-layered soft atmospheric haze.
   * Rendered on a quad with emissive material properties so it glows independently of room lights.
   */
  public static createMoonTexture(): THREE.CanvasTexture {
    if (this.moonTexture) return this.moonTexture;

    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (!ctx) return new THREE.CanvasTexture(canvas);

    const center = size / 2;
    const coreRadius = size * 0.22;

    // 1. Broad Outer Atmospheric Gaussian Haze (Simulates humid night glow)
    const outerHaze = ctx.createRadialGradient(center, center, coreRadius * 0.6, center, center, size * 0.49);
    outerHaze.addColorStop(0.0, 'rgba(215, 235, 255, 0.45)');
    outerHaze.addColorStop(0.35, 'rgba(165, 200, 245, 0.22)');
    outerHaze.addColorStop(0.70, 'rgba(120, 160, 220, 0.08)');
    outerHaze.addColorStop(1.0, 'rgba(80, 120, 190, 0.0)');
    ctx.fillStyle = outerHaze;
    ctx.fillRect(0, 0, size, size);

    // 2. Middle Lunar Corona Glow
    const corona = ctx.createRadialGradient(center, center, coreRadius * 0.85, center, center, coreRadius * 1.6);
    corona.addColorStop(0.0, 'rgba(255, 255, 255, 0.85)');
    corona.addColorStop(0.4, 'rgba(220, 240, 255, 0.45)');
    corona.addColorStop(1.0, 'rgba(180, 215, 255, 0.0)');
    ctx.fillStyle = corona;
    ctx.beginPath();
    ctx.arc(center, center, coreRadius * 1.6, 0, Math.PI * 2);
    ctx.fill();

    // 3. Moon Core Disc with Soft Lunar Surface Shading (Maria / Basalt plains)
    const moonCore = ctx.createRadialGradient(center - coreRadius * 0.15, center - coreRadius * 0.15, 0, center, center, coreRadius);
    moonCore.addColorStop(0.0, '#ffffff');
    moonCore.addColorStop(0.75, '#f4f7fc');
    moonCore.addColorStop(0.95, '#dbe5f2');
    moonCore.addColorStop(1.0, '#bfd0e6');
    ctx.fillStyle = moonCore;
    ctx.beginPath();
    ctx.arc(center, center, coreRadius, 0, Math.PI * 2);
    ctx.fill();

    // Subtle Maria (Crater shadows on moon face)
    ctx.fillStyle = 'rgba(160, 178, 205, 0.18)';
    const mariaPores = [
      { x: center - 18, y: center - 12, r: 24 },
      { x: center + 14, y: center - 22, r: 18 },
      { x: center - 8, y: center + 24, r: 28 },
      { x: center + 26, y: center + 12, r: 16 }
    ];
    mariaPores.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = this.maxAnisotropy;
    this.moonTexture = texture;
    return texture;
  }
}
