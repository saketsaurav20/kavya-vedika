import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { GranthBook, BookPage } from '../../types/bookshelf';
import { bookAudio } from '../../utils/pageTurnSound';
import { useLanguage } from '../../context/LanguageContext';
import {
  ChevronLeft,
  ChevronRight,
  X,
  MessageSquare,
  Copy,
  Check,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface InteractiveBookReaderProps {
  book: GranthBook;
  onClose: () => void;
  onDiscussInSabha?: (text: string, source: string) => void;
}

interface FlipState {
  direction: 'next' | 'prev';
  fromIndex: number;
  toIndex: number;
}

export const InteractiveBookReader: React.FC<InteractiveBookReaderProps> = ({
  book,
  onClose,
  onDiscussInSabha
}) => {
  const { language } = useLanguage();
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [flipState, setFlipState] = useState<FlipState | null>(null);
  const [copied, setCopied] = useState(false);
  const [isHoveringRightCorner, setIsHoveringRightCorner] = useState(false);
  const [isHoveringLeftCorner, setIsHoveringLeftCorner] = useState(false);

  // Drag interaction refs
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);

  const totalPages = book.pages.length;
  // Each spread shows 2 pages: leftPageIndex and rightPageIndex
  const maxSpreadIndex = Math.max(0, Math.ceil(totalPages / 2) - 1);

  // Safe page accessor
  const getPage = useCallback(
    (spreadIdx: number, side: 'left' | 'right'): BookPage | undefined => {
      const pageIndex = side === 'left' ? spreadIdx * 2 : spreadIdx * 2 + 1;
      return book.pages[pageIndex];
    },
    [book.pages]
  );

  // Trigger smooth forward 3D page turn
  const handleNext = useCallback(() => {
    if (flipState !== null || currentSpreadIndex >= maxSpreadIndex) return;

    setFlipState({
      direction: 'next',
      fromIndex: currentSpreadIndex,
      toIndex: currentSpreadIndex + 1
    });

    bookAudio.playPageTurn();

    // 650ms matching the CSS 3D turn animation duration
    setTimeout(() => {
      setCurrentSpreadIndex(prev => prev + 1);
      setFlipState(null);
    }, 650);
  }, [flipState, currentSpreadIndex, maxSpreadIndex]);

  // Trigger smooth backward 3D page turn
  const handlePrev = useCallback(() => {
    if (flipState !== null || currentSpreadIndex <= 0) return;

    setFlipState({
      direction: 'prev',
      fromIndex: currentSpreadIndex,
      toIndex: currentSpreadIndex - 1
    });

    bookAudio.playPageTurn();

    setTimeout(() => {
      setCurrentSpreadIndex(prev => prev - 1);
      setFlipState(null);
    }, 650);
  }, [flipState, currentSpreadIndex]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  // Pointer drag to turn leaves
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag on non-text / non-button targets
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || window.getSelection()?.toString()) {
      return;
    }
    dragStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current || dragStartX.current === null) {
      isDragging.current = false;
      dragStartX.current = null;
      return;
    }
    const diffX = e.clientX - dragStartX.current;
    isDragging.current = false;
    dragStartX.current = null;

    if (diffX < -50) {
      handleNext();
    } else if (diffX > 50) {
      handlePrev();
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Stack thickness calculations
  const leftStackCount = currentSpreadIndex;
  const rightStackCount = maxSpreadIndex - currentSpreadIndex;

  // Pages currently being displayed
  const currentLeftPage = getPage(currentSpreadIndex, 'left');
  const currentRightPage = getPage(currentSpreadIndex, 'right');

  // Next/prev target pages during flip
  const targetLeftPage = flipState ? getPage(flipState.toIndex, 'left') : undefined;
  const targetRightPage = flipState ? getPage(flipState.toIndex, 'right') : undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget && !flipState) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-5xl max-h-[94vh] flex flex-col items-center">
        {/* Top Floating Ribbon: Book Title, Leaf Indicators & Quick Actions */}
        <div className="w-full flex items-center justify-between px-3.5 py-2.5 mb-2 rounded-xl bg-[#171410]/95 border border-[rgba(230,195,135,0.25)] text-[#fbf8ee] shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#201812] border border-[#e6c387]/50 flex items-center justify-center text-sm font-devanagari font-bold text-[#e6c387] shadow-[0_0_10px_rgba(230,195,135,0.2)]">
              ॐ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel font-bold text-sm sm:text-base text-[#fbf8ee] tracking-wide">
                  {book.title}
                </h2>
                <span className="text-xs text-[#e6c387] font-devanagari font-semibold hidden sm:inline">
                  • {book.sanskritTitle}
                </span>
              </div>
              <p className="text-[11px] text-[#d1c7b2]/75 font-serif italic">
                {book.subtitle} ({book.era})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Leaf Progress Badge */}
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#241c16] text-[#e6c387] border border-[#e6c387]/25 font-mono shadow-inner">
              {language === 'hi'
                ? `पृष्ठ ${currentSpreadIndex + 1} / ${maxSpreadIndex + 1}`
                : `Leaf ${currentSpreadIndex + 1} of ${maxSpreadIndex + 1}`}
            </span>

            {/* Return to Shelf Button */}
            <button
              onClick={onClose}
              disabled={flipState !== null}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#2a1e16] hover:bg-[#38281d] text-[#fbf8ee] border border-[rgba(230,195,135,0.3)] hover:border-[#e6c387] transition-all shadow-md active:scale-95"
              title={language === 'hi' ? 'ग्रन्थ बन्द कर मञ्जूषा पर लौटें (Esc)' : 'Close book and return to shelf (Esc)'}
            >
              <X className="w-3.5 h-3.5 text-[#e6c387]" />
              <span className="hidden sm:inline">{language === 'hi' ? 'मञ्जूषा पर लौटें' : 'Return to Shelf'}</span>
            </button>
          </div>
        </div>

        {/* ==============================================================
            THE 3D OPEN CODEX (Outer Leather Casing + Fanned Edges)
            ============================================================== */}
        <div
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/10] min-h-[460px] sm:min-h-[520px] md:min-h-[560px] max-h-[80vh] rounded-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_45px_rgba(230,195,135,0.18)] flex items-center justify-center p-2 sm:p-3 md:p-4 book-3d-stage"
          style={{
            backgroundColor: book.spineColor,
            boxShadow: `0 35px 80px -15px rgba(0,0,0,0.98), 0 0 50px ${book.accentColor}30`
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {/* Leather Cover Outset Trim & Gold Filigree Corner Fittings */}
          <div className="absolute inset-0 border-[6px] sm:border-[8px] border-double border-[#d4af37]/45 pointer-events-none z-40 rounded-2xl" />

          {/* Fanned Paper Stack Layer (Left Stack Depth) */}
          <div
            className="absolute top-3 bottom-3 left-2 sm:left-3 bg-[#e8dfcf] rounded-l-md pointer-events-none z-10 transition-all duration-300 page-stack-left"
            style={{
              width: `${Math.min(14, Math.max(3, leftStackCount * 3 + 2))}px`
            }}
          />

          {/* Fanned Paper Stack Layer (Right Stack Depth) */}
          <div
            className="absolute top-3 bottom-3 right-2 sm:right-3 bg-[#e8dfcf] rounded-r-md pointer-events-none z-10 transition-all duration-300 page-stack-right"
            style={{
              width: `${Math.min(14, Math.max(3, rightStackCount * 3 + 2))}px`
            }}
          />

          {/* Central Binding Crease Headbands (Woven Top and Bottom Headband Cords) */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-2 bg-gradient-to-b from-[#8a1c14] to-[#d4af37] rounded-sm z-40 shadow-sm pointer-events-none" />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-2 bg-gradient-to-t from-[#8a1c14] to-[#d4af37] rounded-sm z-40 shadow-sm pointer-events-none" />

          {/* Crimson Silk Bookmark Ribbon (Pavitra Sutra) Hanging Down the Gutter */}
          <div className="absolute top-2 bottom-4 left-1/2 -translate-x-1/2 w-2.5 z-35 pointer-events-none overflow-visible bookmark-ribbon">
            <div className="w-full h-full bg-gradient-to-r from-[#8a1818] via-[#ba2a24] to-[#7a1212] shadow-[2px_4px_8px_rgba(0,0,0,0.5)] rounded-b-sm" />
            {/* Gold Embroidered Ribbon Fishtail Tip */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-[#d4af37] drop-shadow-md" />
          </div>

          {/* ==============================================================
              THE PARCHMENT FOLIO LEAF SPREAD CONTAINER
              ============================================================== */}
          <div className="relative w-full h-full flex rounded-xl overflow-hidden shadow-2xl border border-[#d4af37]/35 sacred-parchment">
            {/* ------------------------------------------------------------
                1. STATIC UNDERLYING LEFT PAGE (Fixed Height - Never Scrollable)
                ------------------------------------------------------------ */}
            <div
              onClick={() => {
                if (!flipState) handlePrev();
              }}
              className="relative w-1/2 h-full flex flex-col justify-between p-4 sm:p-6 md:p-7 overflow-hidden cursor-pointer select-text sacred-parchment"
            >
              {/* Natural Curvature Gutter Shadow */}
              <div className="absolute inset-0 pointer-events-none z-10 page-shadow-verso" />

              {/* Sweeping Shadow Underneath during Backward Flip */}
              {flipState?.direction === 'prev' && (
                <div className="absolute inset-0 pointer-events-none z-20 sweep-shadow-prev" />
              )}

              {/* Left Page Folio Content */}
              <FolioContent
                page={flipState?.direction === 'prev' ? targetLeftPage : currentLeftPage}
                book={book}
                folioNumber={(flipState?.direction === 'prev' ? flipState.toIndex : currentSpreadIndex) * 2 + 1}
                side="left"
                onCopy={handleCopy}
                copied={copied}
                onDiscuss={onDiscussInSabha}
              />

              {/* Bottom-left Corner Peel Hint */}
              {currentSpreadIndex > 0 && !flipState && (
                <div
                  onMouseEnter={() => setIsHoveringLeftCorner(true)}
                  onMouseLeave={() => setIsHoveringLeftCorner(false)}
                  className="absolute bottom-0 left-0 w-16 h-16 pointer-events-auto flex items-end justify-start p-2 cursor-pointer group z-20"
                >
                  <div
                    className={`w-8 h-8 rounded-tr-xl bg-gradient-to-tr from-[#3a2210]/20 to-transparent border-t border-r border-[#d4af37]/50 shadow-md transition-all duration-300 ${
                      isHoveringLeftCorner ? 'scale-125 -translate-x-0.5 -translate-y-0.5' : 'scale-100'
                    }`}
                  />
                  {isHoveringLeftCorner && (
                    <span className="absolute bottom-2 left-10 text-[10px] font-cinzel font-bold text-[#8a381a] whitespace-nowrap bg-white/95 px-2 py-0.5 rounded shadow">
                      {language === 'hi' ? '← पृष्ठ पलटें' : '← Turn back'}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* ------------------------------------------------------------
                2. STATIC UNDERLYING RIGHT PAGE (Fixed Height - Never Scrollable)
                ------------------------------------------------------------ */}
            <div
              onClick={() => {
                if (!flipState) handleNext();
              }}
              className="relative w-1/2 h-full flex flex-col justify-between p-4 sm:p-6 md:p-7 overflow-hidden cursor-pointer select-text sacred-parchment border-l border-[#3a2817]/15"
            >
              {/* Natural Curvature Gutter Shadow */}
              <div className="absolute inset-0 pointer-events-none z-10 page-shadow-recto" />

              {/* Sweeping Shadow Underneath during Forward Flip */}
              {flipState?.direction === 'next' && (
                <div className="absolute inset-0 pointer-events-none z-20 sweep-shadow-next" />
              )}

              {/* Right Page Folio Content */}
              <FolioContent
                page={flipState?.direction === 'next' ? targetRightPage : currentRightPage}
                book={book}
                folioNumber={(flipState?.direction === 'next' ? flipState.toIndex : currentSpreadIndex) * 2 + 2}
                side="right"
                onCopy={handleCopy}
                copied={copied}
                onDiscuss={onDiscussInSabha}
              />

              {/* Bottom-right Corner Peel Hint */}
              {currentSpreadIndex < maxSpreadIndex && !flipState && (
                <div
                  onMouseEnter={() => setIsHoveringRightCorner(true)}
                  onMouseLeave={() => setIsHoveringRightCorner(false)}
                  className="absolute bottom-0 right-0 w-16 h-16 pointer-events-auto flex items-end justify-end p-2 cursor-pointer group z-20"
                >
                  <div
                    className={`w-8 h-8 rounded-tl-xl bg-gradient-to-tl from-[#3a2210]/25 to-transparent border-t border-l border-[#d4af37]/60 shadow-md transition-all duration-300 ${
                      isHoveringRightCorner ? 'scale-125 translate-x-0.5 -translate-y-0.5 shadow-lg' : 'scale-100'
                    }`}
                  />
                  {isHoveringRightCorner && (
                    <span className="absolute bottom-2 right-10 text-[10px] font-cinzel font-bold text-[#8a381a] whitespace-nowrap bg-white/95 px-2 py-0.5 rounded shadow">
                      {language === 'hi' ? 'पृष्ठ पलटें →' : 'Turn leaf →'}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* ------------------------------------------------------------
                3. THE 3D FLIPPING LEAF (Dynamic Two-Sided Sheet)
                ------------------------------------------------------------ */}
            {flipState && (
              <div
                className={`book-turning-leaf ${
                  flipState.direction === 'next'
                    ? 'book-turning-leaf-next'
                    : 'book-turning-leaf-prev'
                }`}
              >
                {/* FRONT FACE OF TURNING LEAF */}
                <div className="leaf-face leaf-face-front sacred-parchment p-4 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden border border-[#d4af37]/30">
                  <div className="absolute inset-0 pointer-events-none leaf-lighting-front" />
                  <div
                    className={`absolute inset-0 pointer-events-none ${
                      flipState.direction === 'next' ? 'page-shadow-recto' : 'page-shadow-verso'
                    }`}
                  />
                  <FolioContent
                    page={
                      flipState.direction === 'next'
                        ? getPage(flipState.fromIndex, 'right')
                        : getPage(flipState.fromIndex, 'left')
                    }
                    book={book}
                    folioNumber={
                      flipState.direction === 'next'
                        ? flipState.fromIndex * 2 + 2
                        : flipState.fromIndex * 2 + 1
                    }
                    side={flipState.direction === 'next' ? 'right' : 'left'}
                    onCopy={handleCopy}
                    copied={copied}
                  />
                </div>

                {/* BACK FACE OF TURNING LEAF */}
                <div className="leaf-face leaf-face-back sacred-parchment p-4 sm:p-6 md:p-7 flex flex-col justify-between overflow-hidden border border-[#d4af37]/30">
                  <div className="absolute inset-0 pointer-events-none leaf-lighting-back" />
                  <div
                    className={`absolute inset-0 pointer-events-none ${
                      flipState.direction === 'next' ? 'page-shadow-verso' : 'page-shadow-recto'
                    }`}
                  />
                  <FolioContent
                    page={
                      flipState.direction === 'next'
                        ? getPage(flipState.toIndex, 'left')
                        : getPage(flipState.toIndex, 'right')
                    }
                    book={book}
                    folioNumber={
                      flipState.direction === 'next'
                        ? flipState.toIndex * 2 + 1
                        : flipState.toIndex * 2 + 2
                    }
                    side={flipState.direction === 'next' ? 'left' : 'right'}
                    onCopy={handleCopy}
                    copied={copied}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ==============================================================
            BOTTOM NAVIGATION RIBBON & TACTILE LEAF CONTROLS
            ============================================================== */}
        <div className="w-full flex items-center justify-between mt-2.5 px-4 py-2 rounded-xl bg-[#171410]/95 border border-[rgba(230,195,135,0.2)] text-[#fbf8ee] shadow-xl backdrop-blur-sm">
          {/* Previous Leaf Pill */}
          <button
            onClick={handlePrev}
            disabled={currentSpreadIndex === 0 || flipState !== null}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all ${
              currentSpreadIndex === 0 || flipState !== null
                ? 'opacity-30 cursor-not-allowed text-[#7a6e5b]'
                : 'bg-[#221a14] hover:bg-[#32261e] text-[#e6c387] border border-[rgba(230,195,135,0.3)] active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{language === 'hi' ? 'पिछला पृष्ठ' : 'Previous Leaf'}</span>
          </button>

          {/* Leaf Dots / Spread Jump Indicators */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {Array.from({ length: maxSpreadIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                disabled={flipState !== null}
                onClick={() => {
                  if (idx !== currentSpreadIndex && !flipState) {
                    if (idx > currentSpreadIndex) {
                      setFlipState({
                        direction: 'next',
                        fromIndex: currentSpreadIndex,
                        toIndex: idx
                      });
                    } else {
                      setFlipState({
                        direction: 'prev',
                        fromIndex: currentSpreadIndex,
                        toIndex: idx
                      });
                    }
                    bookAudio.playPageTurn();
                    setTimeout(() => {
                      setCurrentSpreadIndex(idx);
                      setFlipState(null);
                    }, 650);
                  }
                }}
                className={`transition-all rounded-full ${
                  idx === currentSpreadIndex
                    ? 'w-7 h-2 bg-[#e6c387] shadow-[0_0_8px_#e6c387]'
                    : 'w-2 h-2 bg-[#423425] hover:bg-[#6e563d]'
                }`}
                title={language === 'hi' ? `पृष्ठ ${idx + 1} पर जाएँ` : `Jump to Leaf ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next Leaf Pill */}
          <button
            onClick={handleNext}
            disabled={currentSpreadIndex >= maxSpreadIndex || flipState !== null}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all ${
              currentSpreadIndex >= maxSpreadIndex || flipState !== null
                ? 'opacity-30 cursor-not-allowed text-[#7a6e5b]'
                : 'bg-[#e6c387] hover:bg-[#f5d99b] text-[#120e0a] font-bold shadow-[0_2px_12px_rgba(230,195,135,0.3)] active:scale-95'
            }`}
          >
            <span className="hidden sm:inline">{language === 'hi' ? 'अगला पृष्ठ' : 'Next Leaf'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ==============================================================
// GAUSSIAN LINE LENS COMPONENT (per index-lens/index.js)
// Math function: Math.exp(-(d/K)*(d/K))
// The line under cursor swells and neighbors step aside smoothly
// ==============================================================
interface GaussianLineLensProps {
  lines: string[];
  isDevanagari?: boolean;
}

const GaussianLineLens: React.FC<GaussianLineLensProps> = ({ lines, isDevanagari = false }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // K = Gaussian influence spread constant
  const K = 1.45;

  return (
    <div
      className={isDevanagari ? "space-y-1 sm:space-y-1.5" : "space-y-0.5"}
      onMouseLeave={() => setHoveredIdx(null)}
    >
      {lines.map((line, idx) => {
        let intensity = 0;
        let yOffset = 0;
        let scale = 1;

        if (hoveredIdx !== null) {
          const d = Math.abs(idx - hoveredIdx);
          // Gaussian math formula from index-lens/index.js: Math.exp(-(d/K)*(d/K))
          intensity = Math.exp(-((d / K) * (d / K)));
          // Line under cursor swells
          scale = 1 + intensity * (isDevanagari ? 0.08 : 0.05);
          // Neighboring lines step aside
          const stepDirection = idx > hoveredIdx ? 1 : idx < hoveredIdx ? -1 : 0;
          yOffset = stepDirection * intensity * (isDevanagari ? 3.2 : 2.0);
        }

        const isHovered = hoveredIdx === idx;

        return (
          <p
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            style={{
              transform: `translateY(${yOffset}px) scale(${scale})`,
              transformOrigin: 'center center',
              transition: 'transform 0.16s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.16s ease',
              willChange: 'transform'
            }}
            className={`cursor-pointer transition-colors ${
              isDevanagari
                ? `font-devanagari text-sm sm:text-base md:text-lg font-bold leading-relaxed text-center tracking-wide ${
                    isHovered
                      ? 'text-[#9c2f18] drop-shadow-[0_1px_4px_rgba(156,47,24,0.25)]'
                      : intensity > 0.3
                      ? 'text-[#3d2311]'
                      : 'text-[#1e1308]'
                  }`
                : `font-serif italic text-center leading-relaxed px-2 text-[11px] sm:text-xs ${
                    isHovered
                      ? 'text-[#8a2e1d] font-semibold'
                      : intensity > 0.3
                      ? 'text-[#3d2311]'
                      : 'text-[#4e3820]'
                  }`
            }`}
          >
            {line}
          </p>
        );
      })}
    </div>
  );
};

// ==============================================================
// AUTHENTIC SACRED FOLIO PAGE CONTENT COMPONENT
// ==============================================================
interface FolioContentProps {
  page?: BookPage;
  book: GranthBook;
  folioNumber: number;
  side: 'left' | 'right';
  onCopy?: (text: string) => void;
  copied?: boolean;
  onDiscuss?: (text: string, source: string) => void;
}

const FolioContent: React.FC<FolioContentProps> = ({
  page,
  book,
  folioNumber,
  side,
  onCopy,
  copied,
  onDiscuss
}) => {
  const { language } = useLanguage();

  if (!page) {
    return (
      <div className="h-full flex items-center justify-center text-[#786142] italic font-serif">
        <div className="text-center">
          <BookOpen className="w-8 h-8 mx-auto mb-2 text-[#b38634]/40" />
          <p className="text-xs">{language === 'hi' ? 'पावन ग्रन्थ समाप्त' : 'End of Sacred Folio'}</p>
        </div>
      </div>
    );
  }

  const folioTitle = language === 'hi' && page.folioTitleHi ? page.folioTitleHi : page.folioTitle;
  const chapterOrWork = language === 'hi' && page.chapterOrWorkHi ? page.chapterOrWorkHi : (page.chapterOrWork || book.authorOrRishi);
  const translation = language === 'hi' && page.translationHi ? page.translationHi : page.translation;
  const commentary = language === 'hi' && page.commentaryHi ? page.commentaryHi : page.commentary;

  return (
    <div className="flex-1 flex flex-col justify-between select-text overflow-hidden h-full">
      {/* Classical Manuscript Header with Vermilion Ink Rule */}
      <div className="flex items-center justify-between pb-2 border-b border-[#8a2e1d]/20 text-xs text-[#78593a] font-cinzel shrink-0">
        <span className={`flex items-center gap-1.5 font-bold tracking-wider text-[#8a2e1d] truncate max-w-[65%] ${language === 'hi' ? 'font-devanagari text-sm tracking-normal' : ''}`}>
          <Sparkles className="w-3 h-3 text-[#b38634] shrink-0" />
          <span className="truncate">{folioTitle}</span>
        </span>
        <span className={`italic font-serif text-[11px] text-[#6d5032] truncate max-w-[32%] text-right ${language === 'hi' ? 'font-devanagari not-italic text-xs' : ''}`}>
          {chapterOrWork}
        </span>
      </div>

      {/* Middle Section: Auto-fits within available vertical height, centered without scrolling */}
      <div className="flex-1 flex flex-col justify-center min-h-0 py-2 sm:py-3 overflow-hidden space-y-2.5">
        {/* Miniature Manuscript Artwork (if present) */}
        {page.imageSrc && (
          <div className="shrink-0 rounded-xl overflow-hidden border border-[#b38634]/40 shadow-md">
            <img
              src={page.imageSrc}
              alt={page.imageCaption || 'Sacred illumination'}
              className="w-full h-28 sm:h-36 md:h-40 object-cover"
            />
            {page.imageCaption && (
              <p className={`text-[10px] sm:text-[11px] p-1.5 bg-[#ede1c7] text-[#4e3820] text-center border-t border-[#b38634]/20 truncate ${language === 'hi' ? 'font-devanagari not-italic text-xs leading-normal' : 'italic font-serif'}`}>
                {page.imageCaption}
              </p>
            )}
          </div>
        )}

        {/* Sacred Devanagari Shloka Block with Gaussian Index Lens - Strictly Preserved Original Sanskrit */}
        {page.devanagariText && page.devanagariText.length > 0 && (
          <div className="p-3 sm:p-4 rounded-xl bg-[#f5ebd7]/90 border-l-4 border-[#9c2f18] shadow-xs relative overflow-hidden">
            <div className="absolute top-1 right-2 text-xs text-[#9c2f18]/30 font-devanagari select-none pointer-events-none">
              ॥ श्रीः ॥
            </div>
            <GaussianLineLens lines={page.devanagariText} isDevanagari={true} />
          </div>
        )}

        {/* IAST Transliteration with Gaussian Index Lens */}
        {page.iastText && page.iastText.length > 0 && (
          <GaussianLineLens lines={page.iastText} isDevanagari={false} />
        )}

        {/* Word-by-word Anvaya Analysis */}
        {page.anvaya && page.anvaya.length > 0 && (
          <div className="pt-2 border-t border-[#8a2e1d]/15">
            <h4 className={`text-[10px] uppercase font-bold text-[#8a2e1d] mb-1.5 ${language === 'hi' ? 'font-devanagari text-xs tracking-normal font-bold' : 'font-cinzel tracking-widest'}`}>
              {language === 'hi' ? 'पदान्वय • शब्दार्थ सहित' : 'अन्वय • Word-by-Word Analysis'}
            </h4>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              {page.anvaya.slice(0, 6).map((item, aIdx) => {
                const meaning = language === 'hi' && item.meaningHi ? item.meaningHi : item.meaning;
                return (
                  <div
                    key={aIdx}
                    className="p-1 sm:p-1.5 rounded bg-[#f6efe1]/80 hover:bg-[#fff9ed] border border-[#8a2e1d]/10 hover:border-[#8a2e1d]/30 transition-all shadow-2xs hover:shadow-xs cursor-default truncate"
                  >
                    <span className="font-semibold text-[#8a2e1d]">{item.word}: </span>
                    <span className={`text-[#322415] ${language === 'hi' ? 'font-devanagari text-xs' : ''}`}>{meaning}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Translation */}
        {translation && (
          <div className="my-1">
            <h4 className={`text-[10px] uppercase font-bold text-[#8a2e1d] mb-1 ${language === 'hi' ? 'font-devanagari text-xs tracking-normal font-bold' : 'font-cinzel tracking-widest'}`}>
              {language === 'hi' ? '✦ प्रकाशित भावार्थ' : '✦ Illumined Translation'}
            </h4>
            <p className={`${language === 'hi' ? 'font-devanagari not-italic text-sm sm:text-[15px] leading-loose text-[#1f140a]' : 'font-serif italic text-xs sm:text-sm md:text-[15px] text-[#24170a] leading-relaxed'}`}>
              "{translation}"
            </p>
          </div>
        )}

        {/* Philosophical Exegesis */}
        {commentary && (
          <div className="p-2.5 sm:p-3 rounded-xl bg-[#f4ebd8]/75 border border-[#b38634]/25 leading-relaxed shadow-xs whitespace-pre-line">
            <h5 className={`text-[10px] uppercase font-bold text-[#8a2e1d] mb-0.5 ${language === 'hi' ? 'font-devanagari text-xs tracking-normal font-bold' : 'font-cinzel'}`}>
              {language === 'hi' ? 'दार्शनिक भाष्य' : 'Philosophical Exegesis'}
            </h5>
            <p className={`${language === 'hi' ? 'font-devanagari not-italic text-xs sm:text-[13.5px] leading-relaxed text-[#2c1a0c]' : 'font-serif text-xs sm:text-[13px] text-[#382614]'}`}>
              {commentary}
            </p>
          </div>
        )}

        {/* Interactive Actions: Copy & Discuss in Sabha */}
        {(translation || onDiscuss) && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#8a2e1d]/10 shrink-0">
            {translation && onCopy && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy(`${page.devanagariText?.join('\n') || ''}\n\n${translation}`);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/70 hover:bg-white text-xs text-[#4e3820] border border-[#3b2d1d]/15 transition-all shadow-2xs hover:shadow active:scale-95"
              >
                {copied ? <Check className="w-3 h-3 text-green-700" /> : <Copy className="w-3 h-3 text-[#8a2e1d]" />}
                <span>{copied ? (language === 'hi' ? 'प्रतिलिपि सहेजी!' : 'Copied') : (language === 'hi' ? 'मन्त्र प्रतिलिपि' : 'Copy Verse')}</span>
              </button>
            )}

            {onDiscuss && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDiscuss(
                    page.devanagariText?.[0] || translation || book.title,
                    `${book.title} (${chapterOrWork})`
                  );
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#2a170f] hover:bg-[#3d2217] text-xs text-[#e6c387] border border-[#e6c387]/30 transition-all shadow-xs active:scale-95"
              >
                <MessageSquare className="w-3 h-3" />
                <span>{language === 'hi' ? 'सभा में विमर्श करें' : 'Discuss in Sabha'}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Footer */}
      <div className="pt-2 border-t border-[#8a2e1d]/15 flex items-center justify-between text-xs text-[#78593a] shrink-0">
        {side === 'left' ? (
          <>
            <span className="font-mono text-[11px]">{language === 'hi' ? `पृष्ठ ${folioNumber}` : `Folio ${folioNumber}`}</span>
            <span className="text-[10px] italic font-serif text-[#8a2e1d] flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" /> {language === 'hi' ? 'पीछे पलटें' : 'Turn back'}
            </span>
          </>
        ) : (
          <>
            <span className="text-[10px] italic font-serif text-[#8a2e1d] flex items-center gap-1">
              {language === 'hi' ? 'आगे पलटें' : 'Turn leaf'} <ChevronRight className="w-3 h-3" />
            </span>
            <span className="font-mono text-[11px]">{language === 'hi' ? `पृष्ठ ${folioNumber}` : `Folio ${folioNumber}`}</span>
          </>
        )}
      </div>
    </div>
  );
};
