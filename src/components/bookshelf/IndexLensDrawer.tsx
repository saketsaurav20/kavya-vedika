import React, { useState } from 'react';
import type { GranthBook } from '../../types/bookshelf';
import { useLanguage } from '../../context/LanguageContext';
import { X, Sparkles, BookOpen } from 'lucide-react';

interface IndexLensDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  books: GranthBook[];
  onSelectBook: (book: GranthBook) => void;
}

export const IndexLensDrawer: React.FC<IndexLensDrawerProps> = ({
  isOpen,
  onClose,
  books,
  onSelectBook
}) => {
  const { language } = useLanguage();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!isOpen) return null;

  // Gaussian Spread constant for magnetic lens
  const K = 1.6;

  return (
    <div className="absolute inset-y-0 right-0 z-40 w-full sm:w-96 bg-[#130f0c]/95 border-l border-[#e6c387]/30 shadow-[-16px_0_40px_rgba(0,0,0,0.85)] backdrop-blur-xl flex flex-col animate-fade-in text-[#fbf8ee]">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#e6c387]/20 bg-[#19130d]/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#241a12] border border-[#e6c387]/40 flex items-center justify-center text-[#e6c387] shadow-sm">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-cinzel font-bold text-sm text-[#fbf8ee] tracking-wider">
                {language === 'hi' ? 'ग्रन्थसूची' : 'INDEX LENS'}
              </h2>
              <span className="text-[11px] font-devanagari font-bold px-1.5 py-0.2 rounded bg-[#e6c387]/15 text-[#e6c387] border border-[#e6c387]/30">
                {language === 'hi' ? 'गॉसियन लेंस' : 'ग्रन्थसूची'}
              </span>
            </div>
            <p className="text-[10px] text-[#d1c7b2]/60 uppercase tracking-widest">
              {language === 'hi' ? 'गॉसियन आवर्धन ग्रन्थ पञ्जिका' : 'Gaussian Magnification Directory'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-[#241a12] hover:bg-[#322317] border border-[#e6c387]/30 text-[#d1c7b2] hover:text-[#fbf8ee] transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Guidance Tagline */}
      <div className="px-5 py-2.5 bg-[#1b140e] border-b border-[#e6c387]/10 flex items-center gap-2 text-[11px] text-[#cca664]">
        <Sparkles className="w-3.5 h-3.5 text-[#e6c387] shrink-0" />
        <span>
          {language === 'hi'
            ? 'चुम्बकीय गॉसियन आवर्धन का अनुभव करने हेतु ग्रन्थों पर कर्सर ले जाएँ'
            : 'Hover across titles to experience magnetic Gaussian magnification'}
        </span>
      </div>

      {/* Scrollable Lens List */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 custom-scrollbar select-none"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {books.map((book, idx) => {
          // Gaussian distribution math: intensity = exp(-(d/K)^2)
          const d = hoveredIdx !== null ? Math.abs(idx - hoveredIdx) : 999;
          const intensity = Math.exp(-((d / K) * (d / K)));

          // Scale ranges from 1.0 to 1.18
          const scale = hoveredIdx !== null ? 1 + intensity * 0.16 : 1;
          // Dynamic slide out towards the right
          const xOffset = hoveredIdx !== null ? intensity * 12 : 0;
          // Dynamic opacity and gold glow
          const glow = intensity > 0.4 ? `0 0 16px rgba(230,195,135,${intensity * 0.4})` : 'none';
          const bgAlpha = hoveredIdx !== null ? 0.08 + intensity * 0.35 : 0.08;

          return (
            <div
              key={book.id}
              onMouseEnter={() => setHoveredIdx(idx)}
              onClick={() => onSelectBook(book)}
              className="cursor-pointer rounded-xl p-3 border transition-transform duration-100 ease-out flex items-center justify-between gap-3"
              style={{
                transform: `translateX(${xOffset}px) scale(${scale})`,
                transformOrigin: 'left center',
                backgroundColor: `rgba(230, 195, 135, ${bgAlpha})`,
                borderColor: intensity > 0.35 ? '#e6c387' : 'rgba(230, 195, 135, 0.15)',
                boxShadow: glow
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Book Spine Color Swatch */}
                <div
                  className="w-2.5 h-10 rounded-sm shrink-0 shadow-inner"
                  style={{
                    backgroundColor: book.spineColor,
                    border: `1px solid ${book.accentColor}`
                  }}
                />

                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-devanagari text-sm transition-all"
                      style={{
                        fontWeight: intensity > 0.5 ? 800 : 600,
                        color: intensity > 0.5 ? '#ffd77a' : '#fbf8ee'
                      }}
                    >
                      {book.sanskritTitle}
                    </span>
                    <span className="text-[11px] font-cinzel text-[#ded5c4]/90 truncate">
                      • {book.title}
                    </span>
                  </div>
                  <p className={`text-[10px] text-[#d1c7b2]/70 truncate mt-0.5 ${language === 'hi' ? 'font-devanagari not-italic text-[11px]' : 'font-serif italic'}`}>
                    {book.subtitle}
                  </p>
                </div>
              </div>

              {/* Shelf Category Chip */}
              <span
                className="text-[9px] px-2 py-0.5 rounded uppercase tracking-wider shrink-0 font-semibold"
                style={{
                  backgroundColor: intensity > 0.4 ? 'rgba(230, 195, 135, 0.3)' : 'rgba(0,0,0,0.3)',
                  color: intensity > 0.4 ? '#fbf8ee' : '#cca664',
                  border: '1px solid rgba(230, 195, 135, 0.25)'
                }}
              >
                {book.shelfCategory === 'vedas'
                  ? (language === 'hi' ? 'वेद' : 'Veda')
                  : book.shelfCategory === 'upanishads'
                  ? (language === 'hi' ? 'उपनिषद्' : 'Upanishad')
                  : (language === 'hi' ? 'काव्य' : 'Kāvya')}
              </span>
            </div>
          );
        })}
      </div>

      {/* Drawer Footer */}
      <div className={`p-4 border-t border-[#e6c387]/20 bg-[#17110c] text-center text-[10px] text-[#d1c7b2]/60 uppercase ${language === 'hi' ? 'font-devanagari text-xs tracking-normal font-semibold' : 'tracking-widest font-cinzel'}`}>
        {language === 'hi'
          ? '3D मञ्जूषा से ग्रन्थ बाहर निकालने हेतु क्लिक करें'
          : 'Click any codex to extract from 3D shelf'}
      </div>
    </div>
  );
};
