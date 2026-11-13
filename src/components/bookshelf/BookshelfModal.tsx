import React, { useEffect, useRef, useState } from 'react';
import type { GranthBook } from '../../types/bookshelf';
import { ALL_GRANTH_BOOKS } from '../../utils/bookDataTransformer';
import { BookshelfScene } from './BookshelfScene';
import { InteractiveBookReader } from './InteractiveBookReader';
import { IndexLensDrawer } from './IndexLensDrawer';
import { bookAudio } from '../../utils/pageTurnSound';
import { useLanguage } from '../../context/LanguageContext';
import { X, Volume2, VolumeX, Compass, HelpCircle, Layers } from 'lucide-react';

interface BookshelfModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDiscussInSabha?: (text: string, source: string) => void;
}

export const BookshelfModal: React.FC<BookshelfModalProps> = ({
  isOpen,
  onClose,
  onDiscussInSabha
}) => {
  const { language, setLanguage } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<BookshelfScene | null>(null);

  const [hoveredBook, setHoveredBook] = useState<GranthBook | null>(null);
  const [hoveredScreenPos, setHoveredScreenPos] = useState<{ x: number; y: number } | null>(null);
  const [openedBook, setOpenedBook] = useState<GranthBook | null>(null);
  const [activeTier, setActiveTier] = useState<0 | 1 | 2 | 'all' | 'window'>('all');
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isIndexLensOpen, setIsIndexLensOpen] = useState(false);

  // Initialize Three.js Bookshelf Scene when modal opens
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const scene = new BookshelfScene(containerRef.current, ALL_GRANTH_BOOKS);
    sceneRef.current = scene;

    scene.onHoverChange = (book, screenPos) => {
      setHoveredBook(book);
      setHoveredScreenPos(screenPos || null);
    };

    scene.onBookOpened = (book) => {
      setOpenedBook(book);
    };

    scene.onReturnComplete = () => {
      setOpenedBook(null);
    };

    return () => {
      scene.destroy();
      sceneRef.current = null;
    };
  }, [isOpen]);

  // Handle tier jump with state lock protection
  const handleTierJump = (tier: 0 | 1 | 2 | 'all' | 'window') => {
    if (openedBook || sceneRef.current?.getIsInteractionLocked()) return;
    setActiveTier(tier);
    if (!sceneRef.current) return;
    if (tier === 'window') {
      sceneRef.current.jumpToWindow();
    } else if (tier === 'all') {
      sceneRef.current.jumpToAll();
    } else {
      sceneRef.current.jumpToTier(tier);
    }
  };

  // Handle book return
  const handleCloseBookReader = () => {
    if (sceneRef.current) {
      sceneRef.current.returnBookToShelf();
    }
    setOpenedBook(null);
  };

  const handleAudioToggle = () => {
    const nextMuted = !isAudioMuted;
    setIsAudioMuted(nextMuted);
    bookAudio.setMuted(nextMuted);
  };

  const handleSelectBookFromIndex = (book: GranthBook) => {
    if (openedBook || sceneRef.current?.getIsInteractionLocked()) return;
    setIsIndexLensOpen(false);
    if (sceneRef.current) {
      sceneRef.current.jumpToTier(book.shelfTier);
      setActiveTier(book.shelfTier);
      setTimeout(() => {
        sceneRef.current?.selectAndFetchBook(book);
      }, 350);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#171410] text-[#fbf8ee] select-none">
      {/* Top Header Bar */}
      <header className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-[#171410]/95 border-b border-[rgba(230,195,135,0.2)] shadow-2xl backdrop-blur-md">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#1c140d] border border-[#e6c387]/50 flex items-center justify-center text-lg shadow-[0_0_12px_rgba(230,195,135,0.25)]">
            📚
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-cinzel font-bold text-base sm:text-lg tracking-wider text-[#fbf8ee]">
                {language === 'hi' ? 'ग्रन्थागार' : 'GRANTHĀGĀRA'}
              </h1>
              <span className="text-xs px-2 py-0.5 rounded bg-[#e6c387]/15 text-[#e6c387] border border-[#e6c387]/30 font-devanagari font-bold">
                {language === 'hi' ? '3D ग्रन्थ मन्दिर' : 'ग्रन्थागार'}
              </span>
            </div>
            <p className="text-[10px] text-[#d1c7b2]/60 uppercase tracking-widest hidden sm:block">
              {language === 'hi' ? 'पावन 3D ग्रन्थागार एवं मन्दिर' : 'Interactive 3D Sacred Book Sanctum'}
            </p>
          </div>
        </div>

        {/* Shelf Tier & Atmosphere Quick-Jump Filters */}
        <div className="hidden md:flex items-center p-0.5 rounded-full bg-[#1e1711] border border-[rgba(230,195,135,0.25)] text-xs">
          <button
            onClick={() => handleTierJump('all')}
            className={`px-3 py-1.5 rounded-full transition-all ${
              activeTier === 'all'
                ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-sm'
                : 'text-[#d1c7b2] hover:text-[#fbf8ee]'
            }`}
          >
            {language === 'hi' ? 'समस्त मञ्जूषा' : 'All Shelves'}
          </button>
          <button
            onClick={() => handleTierJump('window')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
              activeTier === 'window'
                ? 'bg-[#9fb0cf] text-[#0b0a08] font-bold shadow-[0_0_12px_rgba(159,176,207,0.5)]'
                : 'text-[#9fb0cf] hover:text-[#fbf8ee]'
            }`}
            title={language === 'hi' ? 'शान्त चन्द्र गवाक्ष पर दृष्टि केन्द्रित करें' : 'Focus directly on the peaceful Moonlit Window'}
          >
            <span>🌙</span>
            <span>{language === 'hi' ? 'चन्द्र गवाक्ष' : 'Moon Window'}</span>
          </button>
          <button
            onClick={() => handleTierJump(0)}
            className={`px-3 py-1.5 rounded-full transition-all ${
              activeTier === 0
                ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-sm'
                : 'text-[#d1c7b2] hover:text-[#fbf8ee]'
            }`}
          >
            {language === 'hi' ? 'वेद (प्रथम तल)' : 'The Vedas (Top)'}
          </button>
          <button
            onClick={() => handleTierJump(1)}
            className={`px-3 py-1.5 rounded-full transition-all ${
              activeTier === 1
                ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-sm'
                : 'text-[#d1c7b2] hover:text-[#fbf8ee]'
            }`}
          >
            {language === 'hi' ? 'उपनिषद् (मध्यम तल)' : 'The Upanishads (Middle)'}
          </button>
          <button
            onClick={() => handleTierJump(2)}
            className={`px-3 py-1.5 rounded-full transition-all ${
              activeTier === 2
                ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-sm'
                : 'text-[#d1c7b2] hover:text-[#fbf8ee]'
            }`}
          >
            {language === 'hi' ? 'कवि एवं काव्य (तृतीय तल)' : 'Poets & Kavya (Bottom)'}
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* HUD Language Switcher Pill (EN | हिन्दी) */}
          <div className="flex items-center bg-[#1e1711] border border-[rgba(230,195,135,0.3)] rounded-full p-0.5 shadow-sm">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-[11px] font-semibold rounded-full transition-all ${
                language === 'en'
                  ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-xs'
                  : 'text-[#d1c7b2]/70 hover:text-[#fbf8ee]'
              }`}
              title="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 text-[11px] font-semibold rounded-full font-devanagari transition-all ${
                language === 'hi'
                  ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-xs'
                  : 'text-[#d1c7b2]/70 hover:text-[#fbf8ee]'
              }`}
              title="हिन्दी में बदलें"
            >
              हिन्दी
            </button>
          </div>

          {/* Index Lens Toggle */}
          <button
            onClick={() => setIsIndexLensOpen(!isIndexLensOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wider transition-all shadow-sm ${
              isIndexLensOpen
                ? 'bg-[#e6c387] text-[#0b0a08] border-[#e6c387] shadow-[0_0_12px_rgba(230,195,135,0.4)]'
                : 'bg-[#22180f] border-[#e6c387]/40 text-[#e6c387] hover:border-[#e6c387]'
            }`}
            title="Open Gaussian Magnification Index Lens (ग्रन्थसूची)"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{language === 'hi' ? 'ग्रन्थसूची' : 'Index Lens'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-lg border transition-all ${
              isAudioMuted
                ? 'bg-[#1a140e] border-[#55402c] text-[#8c7a65]'
                : 'bg-[#22180f] border-[#e6c387]/40 text-[#e6c387] hover:border-[#e6c387]'
            }`}
            title={isAudioMuted ? 'Unmute paper sounds' : 'Mute paper sounds'}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Help Button */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-2 rounded-lg bg-[#22180f] border border-[rgba(230,195,135,0.3)] text-[#d1c7b2] hover:text-[#fbf8ee] transition-all"
            title="Show interaction instructions"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Exit 3D Sanctum */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#2b1810] hover:bg-[#3d2217] border border-[#e6c387]/40 text-[#fbf8ee] text-xs font-semibold tracking-wider uppercase transition-all shadow-md"
            title="Return to Main Website"
          >
            <X className="w-4 h-4 text-[#e6c387]" />
            <span className="hidden sm:inline">{language === 'hi' ? 'बाहर निकलें' : 'Exit Sanctum'}</span>
          </button>
        </div>
      </header>

      {/* 3D Three.js Canvas Viewport */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Help Banner Popup */}
        {showHelp && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 max-w-md w-full px-4 animate-fade-in">
            <div className="p-4 rounded-xl bg-[#14100c]/95 border border-[#e6c387]/40 text-xs text-[#ded5c4] shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <span className="font-cinzel font-bold text-[#e6c387] flex items-center gap-1.5">
                  <Compass className="w-4 h-4" /> 3D Sanctum Navigation
                </span>
                <button onClick={() => setShowHelp(false)} className="text-[#8c7a65] hover:text-[#fbf8ee]">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <ul className="space-y-1.5 text-[11px] list-disc list-inside text-[#ded5c4]/80">
                <li><strong className="text-[#fbf8ee]">Hover:</strong> Hover over any book on the shelf to lift and inspect its title.</li>
                <li><strong className="text-[#fbf8ee]">Click to Pull:</strong> Click any book to pull it from the shelf and unfold its sacred pages.</li>
                <li><strong className="text-[#fbf8ee]">Drag Viewport:</strong> Click and drag up/down to explore between top, middle, and bottom shelves.</li>
                <li><strong className="text-[#fbf8ee]">Flip Leaves:</strong> Turn pages using on-screen buttons, mouse click, or Left/Right keyboard arrows.</li>
                <li><strong className="text-[#fbf8ee]">Return:</strong> Click outside the book or press <kbd className="px-1 py-0.5 rounded bg-black/40 border border-[#e6c387]/30 text-[#e6c387]">Esc</kbd> to put it back.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Floating 3D Overhead Tooltip directly above hovered book */}
        {hoveredBook && hoveredScreenPos && !openedBook && (
          <div
            className="absolute z-30 pointer-events-none transition-all duration-150 ease-out -translate-x-1/2 -translate-y-full mb-2"
            style={{ left: hoveredScreenPos.x, top: hoveredScreenPos.y }}
          >
            <div className="flex flex-col items-center animate-fade-in">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#14100c]/95 border border-[#e6c387] shadow-[0_8px_24px_rgba(0,0,0,0.9),0_0_15px_rgba(230,195,135,0.45)] backdrop-blur-md whitespace-nowrap">
                <span className="font-devanagari font-bold text-sm text-[#ffd77a] gold-glow">
                  {hoveredBook.sanskritTitle}
                </span>
                <span className="text-[11px] font-cinzel font-semibold text-[#fbf8ee]">
                  • {hoveredBook.title}
                </span>
              </div>
              {/* Delicate vertical indicator line connecting to elevated codex */}
              <div className="w-px h-3.5 bg-gradient-to-b from-[#e6c387] to-[#ffd77a]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffd77a] shadow-[0_0_8px_#ffd77a]" />
            </div>
          </div>
        )}

        {/* Floating Bottom HUD: Hovered Book Card */}
        {hoveredBook && !openedBook && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-fade-in">
            <div className="flex items-center gap-4 px-6 py-3.5 rounded-2xl bg-[#14100c]/95 border-2 border-[#e6c387]/70 shadow-[0_12px_40px_rgba(0,0,0,0.95),0_0_28px_rgba(230,195,135,0.35)] backdrop-blur-md">
              <div
                className="w-5 h-14 rounded-sm shadow-inner flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: hoveredBook.spineColor, border: `1.5px solid ${hoveredBook.accentColor}` }}
              />
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-devanagari font-bold text-lg text-[#ffd77a] gold-glow">
                    {hoveredBook.sanskritTitle}
                  </span>
                  <span className="text-sm text-[#fbf8ee] font-cinzel font-bold">
                    • {hoveredBook.title}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#e6c387]/20 text-[#e6c387] border border-[#e6c387]/40 uppercase tracking-wider font-semibold">
                    {hoveredBook.shelfCategory === 'vedas'
                      ? (language === 'hi' ? 'वेद' : 'Veda')
                      : hoveredBook.shelfCategory === 'upanishads'
                      ? (language === 'hi' ? 'उपनिषद्' : 'Upanishad')
                      : (language === 'hi' ? 'काव्य' : 'Kāvya')}
                  </span>
                </div>
                <p className={`text-xs text-[#ded5c4]/90 mt-0.5 ${language === 'hi' ? 'font-devanagari not-italic text-sm' : 'font-serif italic'}`}>
                  {hoveredBook.subtitle}
                </p>
                <p className={`text-[10px] text-[#e6c387] uppercase mt-1 font-semibold flex items-center gap-1.5 ${language === 'hi' ? 'font-devanagari tracking-normal text-xs' : 'tracking-widest'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e6c387] animate-ping" />
                  {language === 'hi'
                    ? 'ग्रन्थ बाहर निकालने और पन्ने पलटने हेतु क्लिक करें'
                    : 'Click to pull out from shelf & unfold folio'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Ambient Subtle Guidance when idle */}
        {!hoveredBook && !openedBook && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center">
            <span className={`text-[11px] uppercase text-[#d1c7b2]/70 bg-black/50 px-4 py-1.5 rounded-full border border-[rgba(230,195,135,0.2)] backdrop-blur-md shadow-lg ${language === 'hi' ? 'font-devanagari text-xs tracking-normal font-medium' : 'tracking-widest font-cinzel'}`}>
              {language === 'hi'
                ? 'गवाक्ष और ग्रन्थालय के मध्य भ्रमण हेतु क्षैतिज ड्रैग करें • ग्रन्थ खोलने हेतु क्लिक करें'
                : 'Drag horizontally to pan between moonlit window & bookcase · Click codex to open'}
            </span>
          </div>
        )}

        {/* Open Book Interactive Two-Page Reader Layer */}
        {openedBook && (
          <InteractiveBookReader
            book={openedBook}
            onClose={handleCloseBookReader}
            onDiscussInSabha={onDiscussInSabha}
          />
        )}

        {/* Index Lens Drawer with Gaussian Magnification */}
        <IndexLensDrawer
          isOpen={isIndexLensOpen && !openedBook}
          onClose={() => setIsIndexLensOpen(false)}
          books={ALL_GRANTH_BOOKS}
          onSelectBook={handleSelectBookFromIndex}
        />
      </div>
    </div>
  );
};
