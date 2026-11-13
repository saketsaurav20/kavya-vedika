import React, { useState, useEffect } from 'react';
import type { Shloka } from '../types/canon';
import { toggleBookmarkShloka, getBookmarkedShlokaIds } from '../utils/storage';
import { useLanguage } from '../context/LanguageContext';
import { X, Bookmark, Copy, Check, MessageSquare, Sparkles, BookOpen } from 'lucide-react';

interface ShlokaModalProps {
  shloka: Shloka | null;
  onClose: () => void;
  onDiscussInSabha: (shloka: Shloka) => void;
}

export const ShlokaModal: React.FC<ShlokaModalProps> = ({
  shloka,
  onClose,
  onDiscussInSabha,
}) => {
  const { language } = useLanguage();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (shloka) {
      const bookmarked = getBookmarkedShlokaIds();
      setIsBookmarked(bookmarked.includes(shloka.id));
    }
  }, [shloka]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!shloka) return null;

  const handleBookmarkToggle = () => {
    const res = toggleBookmarkShloka(shloka.id);
    setIsBookmarked(res);
  };

  const title = language === 'hi' && shloka.titleHi ? shloka.titleHi : shloka.title;
  const chapter = language === 'hi' && shloka.chapterOrHymnHi ? shloka.chapterOrHymnHi : shloka.chapterOrHymn;
  const translation = language === 'hi' && shloka.translationHi ? shloka.translationHi : shloka.translation;
  const commentary = language === 'hi' && shloka.philosophicalContextHi ? shloka.philosophicalContextHi : shloka.philosophicalContext;
  const author = language === 'hi' && shloka.authorOrRishiHi ? shloka.authorOrRishiHi : shloka.authorOrRishi;
  const metre = language === 'hi' && shloka.metreHi ? shloka.metreHi : shloka.metre;

  const handleCopy = () => {
    const textToCopy = `${title}\n\n${shloka.devanagari.join('\n')}\n\n${shloka.iast.join('\n')}\n\n${language === 'hi' ? 'भावार्थ:' : 'Translation:'}\n"${translation}"\n\n— ${shloka.source} (${chapter})\nvia Kavya Vedika`;
    navigator.clipboard.writeText(textToCopy);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl my-8 bg-[#14120e] border border-[rgba(230,195,135,0.3)] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Gradient Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#d97736] via-[#e6c387] to-[#d97736]" />

        {/* Modal Header */}
        <div className="p-6 border-b border-[rgba(230,195,135,0.18)] flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#e6c387]/20 text-[#e6c387] border border-[#e6c387]/35 font-mono font-bold">
                {shloka.source}
              </span>
              <span className="text-xs text-[#ded5c4] font-mono font-medium">
                {chapter}
              </span>
              {metre && (
                <span className="text-xs text-[#e6c387] bg-[#1e1a14] px-2.5 py-0.5 rounded border border-[#e6c387]/20 font-mono">
                  {language === 'hi' ? 'छन्द:' : 'Meter:'} {metre}
                </span>
              )}
            </div>
            <h2 className={`font-bold text-[#fbf8ee] leading-snug ${language === 'hi' ? 'font-devanagari text-2xl sm:text-3xl md:text-4xl leading-normal tracking-normal' : 'text-xl sm:text-2xl md:text-3xl font-cinzel tracking-wide'}`}>
              {title}
            </h2>
            {author && (
              <p className={`text-sm text-[#ded5c4] mt-1.5 ${language === 'hi' ? 'font-devanagari not-italic' : 'italic font-serif'}`}>
                {language === 'hi' ? 'द्रष्टा ऋषि / रचयिता:' : 'Revealed through / Authored by:'}{' '}
                <span className="text-[#f5d99b] not-italic font-medium">{author}</span>
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#ded5c4] hover:text-[#fbf8ee] hover:bg-white/10 transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-7 max-h-[72vh] overflow-y-auto">
          {/* Sacred Devanagari Script Section - Strictly Preserved Original Sanskrit */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#090806] border border-[rgba(230,195,135,0.25)] text-center relative overflow-hidden group shadow-inner">
            <div className="absolute top-2.5 right-3.5 text-xs font-mono text-[#e6c387]/70">
              संस्कृत मूलम्
            </div>
            <div className="space-y-3.5 my-3">
              {shloka.devanagari.map((line, idx) => (
                <p
                  key={idx}
                  className="font-devanagari text-xl sm:text-2xl md:text-[27px] leading-loose text-[#fbf8ee] font-medium tracking-wide"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* IAST Scholarly Transliteration */}
          <div className="p-5 rounded-xl bg-[#181512]/90 border border-white/10">
            <h4 className="text-xs uppercase tracking-widest font-mono text-[#e6c387] mb-2.5 font-bold">
              {language === 'hi' ? 'IAST अन्तर्राष्ट्रीय लिप्यन्तरण' : 'IAST Transliteration & Metrical Cadence'}
            </h4>
            <div className="space-y-1.5 font-serif text-base sm:text-lg text-[#ded5c4] italic leading-relaxed">
              {shloka.iast.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>

          {/* Anvaya (Word-by-Word Breakdown) */}
          {shloka.anvaya && shloka.anvaya.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#e6c387]" />
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#e6c387]">
                  {language === 'hi' ? 'पदान्वय (शब्दार्थ सहित व्याख्या)' : 'Anvaya (Word-by-Word Grammatical Exposition)'}
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {shloka.anvaya.map((item, idx) => {
                  const meaning = language === 'hi' && item.meaningHi ? item.meaningHi : item.meaning;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#181512]/80 border border-[rgba(230,195,135,0.18)] flex flex-col justify-between"
                    >
                      <span className="font-mono text-sm sm:text-base text-[#f5d99b] font-semibold">
                        {item.word}
                      </span>
                      <span className={`text-xs sm:text-sm text-[#ded5c4] mt-1.5 leading-relaxed ${language === 'hi' ? 'font-devanagari text-sm text-[#e2dac9]' : 'font-serif'}`}>
                        {meaning}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Translation */}
          <div className="border-l-3 border-[#e6c387] pl-5 py-1.5 bg-[#181512]/40 rounded-r-xl">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#e6c387] mb-2 font-mono">
              {language === 'hi' ? 'प्रकाशित भावार्थ एवं अनुवाद' : 'Poetic English Translation'}
            </h4>
            <p className={`${language === 'hi' ? 'font-devanagari text-lg sm:text-xl text-[#fbf8ee] leading-loose not-italic font-normal' : 'font-serif text-base sm:text-lg text-[#fbf8ee] leading-relaxed italic'}`}>
              "{translation}"
            </p>
          </div>

          {/* Philosophical Context & Exegesis */}
          <div className="p-6 rounded-xl bg-[#181512]/60 border border-white/10">
            <div className="flex items-center gap-2 mb-2.5">
              <BookOpen className="w-4 h-4 text-[#e6c387]" />
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#e6c387] font-mono">
                {language === 'hi' ? 'दार्शनिक भाष्य एवं पृष्ठभूमि' : 'Philosophical Exegesis & Significance'}
              </h4>
            </div>
            <p className={`${language === 'hi' ? 'text-base sm:text-[17px] text-[#ede6d7] leading-loose font-devanagari font-normal' : 'text-sm sm:text-base text-[#ded5c4] leading-relaxed font-serif'}`}>
              {commentary}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
            {shloka.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded bg-white/10 text-[#ded5c4] font-mono border border-white/5"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-6 bg-[#0e0c09] border-t border-[rgba(230,195,135,0.18)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {/* Bookmark button */}
            <button
              onClick={handleBookmarkToggle}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                isBookmarked
                  ? 'bg-[#e6c387]/25 border-[#e6c387] text-[#e6c387]'
                  : 'bg-white/10 border-white/15 text-[#ded5c4] hover:text-[#fbf8ee] hover:border-white/30'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>
                {isBookmarked
                  ? (language === 'hi' ? 'सहेजा गया' : 'Bookmarked')
                  : (language === 'hi' ? 'मन्त्र सहेजें' : 'Save Verse')}
              </span>
            </button>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 border border-white/15 text-[#ded5c4] hover:text-[#fbf8ee] hover:border-white/30 transition-all"
            >
              {hasCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{language === 'hi' ? 'प्रतिलिपि बना ली गई!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'उद्धरण प्रतिलिपि करें' : 'Copy Citation'}</span>
                </>
              )}
            </button>
          </div>

          {/* Discuss in Sabha action */}
          <button
            onClick={() => {
              onClose();
              onDiscussInSabha(shloka);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#e6c387] hover:bg-[#f5d99b] text-[#0b0a08] transition-all shadow-[0_2px_14px_rgba(230,195,135,0.3)]"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'सभा में विमर्श करें' : 'Discuss in The Sabha'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
