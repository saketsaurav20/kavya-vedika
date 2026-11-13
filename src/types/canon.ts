export type EraCategory = 'vedas' | 'upanishads' | 'classical' | 'bhakti' | 'modern';

export interface Shloka {
  id: string;
  source: string;
  sourceCategory: EraCategory;
  chapterOrHymn: string;
  chapterOrHymnHi?: string;
  authorOrRishi?: string;
  authorOrRishiHi?: string;
  title: string;
  titleHi?: string;
  devanagari: string[];
  iast: string[];
  metre?: string;
  metreHi?: string;
  anvaya?: { word: string; meaning: string; meaningHi?: string }[];
  translation: string;
  translationHi?: string;
  philosophicalContext: string;
  philosophicalContextHi?: string;
  tags: string[];
  audioChantType?: 'Vedic Udātta' | 'Samavedic Chant' | 'Meditative Sloka' | 'Bhakti Bhajan';
}

export interface Poet {
  id: string;
  name: string;
  sanskritName: string;
  era: string;
  eraHi?: string;
  periodApprox: string;
  periodApproxHi?: string;
  category: 'classical' | 'bhakti' | 'modern';
  regionOrTradition: string;
  regionOrTraditionHi?: string;
  bio: string;
  bioHi?: string;
  imageUrl?: string;
  imageCaption?: string;
  imageCaptionHi?: string;
  imageAlt?: string;
  imageFocalPoint?: string;
  famousWorks: string[];
  masterpieceQuote: {
    verse: string;
    translation: string;
    translationHi?: string;
    work: string;
    workHi?: string;
  };
  keyThemes: string[];
  keyThemesHi?: string[];
}

export interface ScriptureOverview {
  id: string;
  name: string;
  sanskritName: string;
  category: 'vedas' | 'upanishads';
  summary: string;
  summaryHi?: string;
  significance: string;
  significanceHi?: string;
  structure: string;
  structureHi?: string;
  centralTheme: string;
  centralThemeHi?: string;
  sampleSuktasOrVerses: Shloka[];
}
