import type { GranthBook, BookPage } from '../types/bookshelf';
import { VEDAS_OVERVIEW, VEDAS_SHLOKAS } from '../data/vedasData';
import { UPANISHADS_SHLOKAS } from '../data/upanishadsData';
import { POETS_LIST, POETS_SHLOKAS } from '../data/poetsData';

export function getAllBooks(): GranthBook[] {
  const books: GranthBook[] = [];

  // ==========================================
  // TIER 0: THE FOUR VEDAS (Top Shelf)
  // Palette: Terracotta Saffron, Royal Lapis, Golden Amber Ochre, Sage Olive Jade
  // ==========================================
  const vedaColors: Record<string, { spine: string; accent: string; ornament: GranthBook['ornamentStyle'] }> = {
    rigveda: { spine: '#b85434', accent: '#ffd77a', ornament: 'om' },
    samaveda: { spine: '#2a3d58', accent: '#ffdf88', ornament: 'lotus' },
    yajurveda: { spine: '#b58232', accent: '#ffe4a0', ornament: 'yantra' },
    atharvaveda: { spine: '#4e634e', accent: '#ffd77a', ornament: 'lotus' }
  };

  VEDAS_OVERVIEW.forEach((overview, idx) => {
    const relatedShlokas = VEDAS_SHLOKAS.filter(
      s => s.source.toLowerCase().includes(overview.id) || s.tags.some(t => t.toLowerCase().includes(overview.id))
    );

    const pages: BookPage[] = [
      // Spread 1 - Page 1 (Verso): Canonical Vedic Inscription
      {
        pageNumber: 1,
        folioTitle: `${overview.name} Samhita`,
        chapterOrWork: 'Canonical Vedic Inscription',
        devanagariText: [
          `ॐ ${overview.sanskritName} संहिता`,
          'अनादि-निधना नित्या वागुत्सृष्टा स्वयम्भुवा ।',
          'आदौ वेदमयी दिव्या यतः सर्वाः प्रवृत्तयः ॥'
        ],
        iastText: [
          `${overview.name} Saṃhitā`,
          'anādi-nidhanā nityā vāg utsṛṣṭā svayambhuvā |',
          'ādau vedamayī divyā yataḥ sarvāḥ pravṛttayaḥ ||'
        ],
        tags: [overview.name, 'Shruti', 'Veda']
      },
      // Spread 1 - Page 2 (Recto): Cosmic Significance & Architectural Structure
      {
        pageNumber: 2,
        folioTitle: 'Cosmic Significance & Structure',
        chapterOrWork: 'Shruti Revelation',
        translation: overview.significance,
        commentary: `Central Theme: ${overview.centralTheme}\n\nCanonical Structure: ${overview.structure}`,
        tags: ['Structure', 'Tradition', overview.name]
      }
    ];

    // Every Shloka is paginated across TWO facing leaves (Left: Sanskrit & Anvaya; Right: Translation & Commentary)
    relatedShlokas.forEach((shloka) => {
      // Left Page (Verso): Sacred Devanagari, IAST, Word-by-Word Anvaya
      pages.push({
        pageNumber: pages.length + 1,
        folioTitle: shloka.title,
        folioTitleHi: shloka.titleHi || shloka.title,
        chapterOrWork: shloka.chapterOrHymn,
        chapterOrWorkHi: shloka.chapterOrHymnHi,
        devanagariText: shloka.devanagari,
        iastText: shloka.iast,
        anvaya: shloka.anvaya,
        tags: shloka.tags
      });

      // Right Page (Recto): Illumined Translation & Philosophical Exegesis
      pages.push({
        pageNumber: pages.length + 1,
        folioTitle: `${shloka.title} — Exegesis`,
        folioTitleHi: shloka.titleHi ? `${shloka.titleHi} — भाष्य` : undefined,
        chapterOrWork: shloka.chapterOrHymn,
        chapterOrWorkHi: shloka.chapterOrHymnHi,
        translation: shloka.translation,
        translationHi: shloka.translationHi,
        commentary: shloka.philosophicalContext,
        commentaryHi: shloka.philosophicalContextHi,
        tags: shloka.tags,
        audioHint: shloka.audioChantType
      });
    });

    const style = vedaColors[overview.id] || { spine: '#b85434', accent: '#ffd77a', ornament: 'om' };

    books.push({
      id: `veda-${overview.id}`,
      shelfCategory: 'vedas',
      title: overview.name,
      sanskritTitle: overview.sanskritName,
      subtitle: 'The Eternal Shruti Revelation',
      authorOrRishi: 'Traditional Vedic Seers (Apauruṣeya)',
      era: 'Circa 2nd Millennium BCE',
      spineColor: style.spine,
      accentColor: style.accent,
      ornamentStyle: style.ornament,
      shelfTier: 0,
      shelfIndex: idx,
      width: 1.05,
      height: 1.44,
      thickness: 0.32,
      pages
    });
  });

  // ==========================================
  // TIER 1: THE PRINCIPAL UPANISHADS (Middle Shelf)
  // Palette: Antique Flax, Deep Spruce, Venetian Cinnabar, Golden Camel, Earthy Chestnut, Peacock Teal
  // ==========================================
  const upanishadColors: { spine: string; accent: string; ornament: GranthBook['ornamentStyle'] }[] = [
    { spine: '#a88e68', accent: '#ffd700', ornament: 'om' },
    { spine: '#324850', accent: '#ffdf88', ornament: 'lotus' },
    { spine: '#9c3d32', accent: '#ffe4a0', ornament: 'yantra' },
    { spine: '#9c7a42', accent: '#ffd77a', ornament: 'om' },
    { spine: '#6e442c', accent: '#ffdf88', ornament: 'lotus' },
    { spine: '#2e5052', accent: '#ffd77a', ornament: 'yantra' }
  ];

  const upanishadNames = [
    { id: 'isha', name: 'Isha Upanishad', sanskrit: 'ईशावास्योपनिषद्', sub: 'Divine Immanence & Non-Attachment' },
    { id: 'katha', name: 'Katha Upanishad', sanskrit: 'कठोपनिषद्', sub: 'Nachiketa & The Secret of Immortality' },
    { id: 'mandukya', name: 'Mandukya Upanishad', sanskrit: 'माण्डूक्योपनिषद्', sub: 'The Four States & Cosmic AUM' },
    { id: 'chandogya', name: 'Chandogya Upanishad', sanskrit: 'छान्दोग्योपनिषद्', sub: 'Tat Tvam Asi — That Thou Art' },
    { id: 'brihadaranyaka', name: 'Brihadaranyaka Upanishad', sanskrit: 'बृहदारण्यकोपनिषद्', sub: 'Asato Ma Sadgamaya' },
    { id: 'mundaka', name: 'Mundaka Upanishad', sanskrit: 'मुण्डकोपनिषद्', sub: 'The Two Golden Birds' }
  ];

  upanishadNames.forEach((u, idx) => {
    const relatedShlokas = UPANISHADS_SHLOKAS.filter(
      s => s.source.toLowerCase().includes(u.id) || s.tags.some(t => t.toLowerCase().includes(u.id))
    );

    const pages: BookPage[] = [
      // Spread 1 - Page 1 (Verso): Sacred Shanti Mantra & Title Invocation
      {
        pageNumber: 1,
        folioTitle: `${u.name} — Divine Opening`,
        chapterOrWork: 'Shanti Mantra & Title',
        devanagariText: [
          `ॐ ${u.sanskrit}`,
          'पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते ।',
          'पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥ ॐ शान्तिः शान्तिः शान्तिः ॥'
        ],
        iastText: [
          `oṃ ${u.name}`,
          'pūrṇam adaḥ pūrṇam idaṃ pūrṇāt pūrṇam udacyate |',
          'pūrṇasya pūrṇam ādāya pūrṇam evāvaśiṣyate || oṃ śāntiḥ śāntiḥ śāntiḥ ||'
        ],
        tags: [u.name, 'Vedanta', 'Upanishad', 'Shanti Mantra']
      },
      // Spread 1 - Page 2 (Recto): Illumined Translation & Advaita Vision
      {
        pageNumber: 2,
        folioTitle: 'The Cosmic Wholeness',
        chapterOrWork: 'Advaita Philosophical Vision',
        translation: 'That Absolute is Whole; this manifest universe is Whole. From Wholeness emerges Wholeness. If Wholeness is taken from Wholeness, Wholeness alone remains. Om Peace, Peace, Peace.',
        commentary: `${u.sub}. A cornerstone of Advaita Vedanta uncovering the non-dual identity of the Self (Atman) and Supreme Consciousness (Brahman).`,
        tags: [u.name, 'Advaita', 'Philosophy']
      }
    ];

    // Every Shloka is paginated across TWO facing leaves (Left: Sanskrit & Anvaya; Right: Translation & Commentary)
    relatedShlokas.forEach((shloka) => {
      // Left Page (Verso): Sacred Verse & Word Analysis
      pages.push({
        pageNumber: pages.length + 1,
        folioTitle: shloka.title,
        folioTitleHi: shloka.titleHi || shloka.title,
        chapterOrWork: shloka.chapterOrHymn,
        chapterOrWorkHi: shloka.chapterOrHymnHi,
        devanagariText: shloka.devanagari,
        iastText: shloka.iast,
        anvaya: shloka.anvaya,
        tags: shloka.tags
      });

      // Right Page (Recto): Illumined Translation & Exegesis
      pages.push({
        pageNumber: pages.length + 1,
        folioTitle: `${shloka.title} — Exegesis`,
        folioTitleHi: shloka.titleHi ? `${shloka.titleHi} — भाष्य` : undefined,
        chapterOrWork: shloka.chapterOrHymn,
        chapterOrWorkHi: shloka.chapterOrHymnHi,
        translation: shloka.translation,
        translationHi: shloka.translationHi,
        commentary: shloka.philosophicalContext,
        commentaryHi: shloka.philosophicalContextHi,
        tags: shloka.tags,
        audioHint: shloka.audioChantType
      });
    });

    const style = upanishadColors[idx % upanishadColors.length];

    books.push({
      id: `upanishad-${u.id}`,
      shelfCategory: 'upanishads',
      title: u.name,
      sanskritTitle: u.sanskrit,
      subtitle: u.sub,
      authorOrRishi: 'Forest Rishis of Ancient Bharat',
      era: 'Circa 800 - 500 BCE',
      spineColor: style.spine,
      accentColor: style.accent,
      ornamentStyle: style.ornament,
      shelfTier: 1,
      shelfIndex: idx,
      width: 1.05,
      height: 1.40,
      thickness: 0.30,
      pages
    });
  });

  // ==========================================
  // TIER 2: CLASSICAL, BHAKTI & MODERN POETS (Bottom Shelf)
  // Palette: Copper Rust, Imperial Crimson, Midnight Lapis, Slate Stone, Raw Linen Ochre, Vermilion, Madder Rose, Dark Walnut
  // ==========================================
  const poetPalettes: { spine: string; accent: string; ornament: GranthBook['ornamentStyle'] }[] = [
    { spine: '#b05530', accent: '#ffd77a', ornament: 'lotus' },
    { spine: '#802834', accent: '#ffe4a0', ornament: 'yantra' },
    { spine: '#263652', accent: '#ffd77a', ornament: 'peacock' },
    { spine: '#4c4a48', accent: '#ffe4a0', ornament: 'om' },
    { spine: '#8e6c3e', accent: '#ffd77a', ornament: 'lotus' },
    { spine: '#b55028', accent: '#ffdf88', ornament: 'trishul' },
    { spine: '#86364d', accent: '#ffd77a', ornament: 'peacock' },
    { spine: '#5c4335', accent: '#ffd77a', ornament: 'lotus' }
  ];

  const primaryPoetIds = ['valmiki', 'vyasa', 'kalidasa', 'shankara', 'kabir', 'tulsidas', 'mirabai', 'tagore'];
  const primaryPoets = POETS_LIST.filter(p => primaryPoetIds.includes(p.id));

  primaryPoets.forEach((poet, idx) => {
    const relatedShlokas = POETS_SHLOKAS.filter(
      s => s.authorOrRishi?.toLowerCase().includes(poet.id) || s.tags.some(t => t.toLowerCase().includes(poet.id))
    );

    const pages: BookPage[] = [
      // Spread 1 - Page 1 (Verso): Poet Miniature Portrait & Life Inscription
      {
        pageNumber: 1,
        folioTitle: `${poet.name}`,
        folioTitleHi: `${poet.sanskritName || poet.name}`,
        chapterOrWork: poet.era,
        chapterOrWorkHi: poet.eraHi || poet.era,
        imageSrc: poet.imageUrl,
        imageCaption: poet.imageCaption || `${poet.name} — ${poet.periodApprox}`,
        imageCaptionHi: poet.imageCaptionHi || `${poet.sanskritName} — ${poet.periodApproxHi || poet.periodApprox}`,
        commentary: poet.bio,
        commentaryHi: poet.bioHi || poet.bio,
        tags: [poet.name, poet.category, 'Biography']
      },
      // Spread 1 - Page 2 (Recto): Literary Legacy & Canonical Corpus
      {
        pageNumber: 2,
        folioTitle: 'Literary Legacy & Corpus',
        folioTitleHi: 'साहित्यिक अवदान एवं कृतियाँ',
        chapterOrWork: 'Canonical Tradition',
        chapterOrWorkHi: 'साहित्यिक परम्परा',
        commentary: `Famous Works:\n${poet.famousWorks.join(', ')}\n\nTradition & Themes:\n${poet.regionOrTradition}. Key themes include ${poet.keyThemes.join(', ')}.`,
        commentaryHi: `प्रमुख कृतियाँ:\n${poet.famousWorks.join(', ')}\n\nपरम्परा एवं भावभूमि:\n${poet.regionOrTraditionHi || poet.regionOrTradition}। मुख्य विषय: ${(poet.keyThemesHi || poet.keyThemes).join(', ')}।`,
        tags: [poet.name, 'Masterpiece', poet.category]
      },
      // Spread 2 - Page 3 (Verso): Masterpiece Verse (Original Sacred Inscription)
      {
        pageNumber: 3,
        folioTitle: `Masterpiece • ${poet.masterpieceQuote.work}`,
        folioTitleHi: `कालजयी पद्य • ${poet.masterpieceQuote.workHi || poet.masterpieceQuote.work}`,
        chapterOrWork: 'Original Inscription',
        chapterOrWorkHi: 'मूल रचना',
        devanagariText: [poet.masterpieceQuote.verse],
        tags: [poet.name, 'Masterpiece']
      },
      // Spread 2 - Page 4 (Recto): Masterpiece Translation & Aesthetic Exegesis
      {
        pageNumber: 4,
        folioTitle: `Illumined Translation • ${poet.masterpieceQuote.work}`,
        folioTitleHi: `भावार्थ • ${poet.masterpieceQuote.workHi || poet.masterpieceQuote.work}`,
        chapterOrWork: 'Aesthetic Exegesis',
        chapterOrWorkHi: 'रस एवं भावार्थ',
        translation: poet.masterpieceQuote.translation,
        translationHi: poet.masterpieceQuote.translationHi || poet.masterpieceQuote.translation,
        commentary: `A signature masterpiece of ${poet.name} celebrated across millennia. Reflecting ${poet.keyThemes.slice(0, 2).join(' and ')}.`,
        commentaryHi: `${poet.sanskritName || poet.name} की यह अमर रचना सहस्राब्दियों से रससिद्ध मानी जाती है। इसमें ${(poet.keyThemesHi || poet.keyThemes).slice(0, 2).join(' तथा ')} की दिव्य अभिव्यक्ति है।`,
        tags: [poet.name, 'Translation']
      }
    ];

    // Every Shloka is paginated across TWO facing leaves (Left: Sanskrit & Anvaya; Right: Translation & Commentary)
    relatedShlokas.forEach((shloka) => {
      // Left Page (Verso): Original Shloka & Anvaya
      pages.push({
        pageNumber: pages.length + 1,
        folioTitle: shloka.title,
        folioTitleHi: shloka.titleHi || shloka.title,
        chapterOrWork: shloka.chapterOrHymn,
        chapterOrWorkHi: shloka.chapterOrHymnHi,
        devanagariText: shloka.devanagari,
        iastText: shloka.iast,
        anvaya: shloka.anvaya,
        tags: shloka.tags
      });

      // Right Page (Recto): Illumined Translation & Commentary
      pages.push({
        pageNumber: pages.length + 1,
        folioTitle: `${shloka.title} — Exegesis`,
        folioTitleHi: shloka.titleHi ? `${shloka.titleHi} — भाष्य` : undefined,
        chapterOrWork: shloka.chapterOrHymn,
        chapterOrWorkHi: shloka.chapterOrHymnHi,
        translation: shloka.translation,
        translationHi: shloka.translationHi,
        commentary: shloka.philosophicalContext,
        commentaryHi: shloka.philosophicalContextHi,
        tags: shloka.tags,
        audioHint: shloka.audioChantType
      });
    });

    const style = poetPalettes[idx % poetPalettes.length];

    books.push({
      id: `poet-${poet.id}`,
      shelfCategory: 'poets',
      title: poet.name,
      sanskritTitle: poet.sanskritName,
      subtitle: poet.famousWorks[0] || poet.periodApprox,
      authorOrRishi: poet.name,
      era: poet.periodApprox,
      spineColor: style.spine,
      accentColor: style.accent,
      ornamentStyle: style.ornament,
      coverArtwork: poet.imageUrl,
      shelfTier: 2,
      shelfIndex: idx,
      width: 1.05,
      height: 1.42,
      thickness: 0.30,
      pages
    });
  });

  return books;
}

export const ALL_GRANTH_BOOKS = getAllBooks();
