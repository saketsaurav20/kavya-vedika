export type ShelfCategory = 'vedas' | 'upanishads' | 'poets';

export interface BookPage {
  pageNumber: number;
  folioTitle: string;
  folioTitleHi?: string;
  chapterOrWork?: string;
  chapterOrWorkHi?: string;
  devanagariText?: string[];
  iastText?: string[];
  translation?: string;
  translationHi?: string;
  commentary?: string;
  commentaryHi?: string;
  anvaya?: { word: string; meaning: string; meaningHi?: string }[];
  imageSrc?: string;
  imageCaption?: string;
  imageCaptionHi?: string;
  tags?: string[];
  audioHint?: string;
}

export interface GranthBook {
  id: string;
  shelfCategory: ShelfCategory;
  title: string;
  titleHi?: string;
  sanskritTitle: string;
  subtitle: string;
  subtitleHi?: string;
  authorOrRishi: string;
  authorOrRishiHi?: string;
  era: string;
  eraHi?: string;
  spineColor: string;       // Primary leather/cloth tone
  accentColor: string;      // Gold/brass metallic highlight
  ornamentStyle?: 'lotus' | 'om' | 'yantra' | 'peacock' | 'trishul';
  coverArtwork?: string;
  shelfTier: 0 | 1 | 2;     // 0 = Top (Vedas), 1 = Middle (Upanishads), 2 = Bottom (Poets)
  shelfIndex: number;       // Horizontal index within the tier
  width: number;            // Book physical width in 3D units
  height: number;           // Book physical height in 3D units
  thickness: number;        // Book spine thickness in 3D units
  pages: BookPage[];
}

export type BookshelfMode = 'browsing' | 'fetching' | 'reading' | 'returning';
