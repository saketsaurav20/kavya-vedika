import React, { useState, useEffect, useRef } from 'react';
import type { Shloka } from '../types/canon';
import type { ForumThread } from '../types/forum';
import { VEDAS_SHLOKAS } from '../data/vedasData';
import { UPANISHADS_SHLOKAS } from '../data/upanishadsData';
import { POETS_SHLOKAS, POETS_LIST } from '../data/poetsData';
import { getStoredForumThreads } from '../utils/storage';
import { useLanguage } from '../context/LanguageContext';
import { Search, X, BookOpen, MessageSquare, Feather, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectShloka: (shloka: Shloka) => void;
  onSelectThread: (thread: ForumThread) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectShloka,
  onSelectThread,
}) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allShlokas = [...VEDAS_SHLOKAS, ...UPANISHADS_SHLOKAS, ...POETS_SHLOKAS];
  const allThreads = getStoredForumThreads();

  const q = query.trim().toLowerCase();

  const matchedShlokas = q
    ? allShlokas.filter(s => {
        return (
          s.title.toLowerCase().includes(q) ||
          (s.titleHi && s.titleHi.toLowerCase().includes(q)) ||
          s.source.toLowerCase().includes(q) ||
          s.chapterOrHymn.toLowerCase().includes(q) ||
          s.translation.toLowerCase().includes(q) ||
          (s.translationHi && s.translationHi.toLowerCase().includes(q)) ||
          s.devanagari.some(line => line.includes(query.trim())) ||
          s.iast.some(line => line.toLowerCase().includes(q)) ||
          s.tags.some(tag => tag.toLowerCase().includes(q))
        );
      })
    : [];

  const matchedPoets = q
    ? POETS_LIST.filter(p => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.sanskritName.includes(query.trim()) ||
          p.bio.toLowerCase().includes(q) ||
          (p.bioHi && p.bioHi.toLowerCase().includes(q)) ||
          p.famousWorks.some(w => w.toLowerCase().includes(q)) ||
          p.keyThemes.some(t => t.toLowerCase().includes(q))
        );
      })
    : [];

  const matchedThreads = q
    ? allThreads.filter(t => {
        return (
          t.title.toLowerCase().includes(q) ||
          t.content.toLowerCase().includes(q) ||
          t.author.toLowerCase().includes(q) ||
          t.tags.some(tag => tag.toLowerCase().includes(q))
        );
      })
    : [];

  const totalMatches = matchedShlokas.length + matchedPoets.length + matchedThreads.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#14120e] border border-[rgba(230,195,135,0.3)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[rgba(230,195,135,0.18)] flex items-center gap-3 bg-[#090806]">
          <Search className="w-5 h-5 text-[#e6c387]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === 'hi' ? 'मन्त्र, उपनिषद्, कवि या सभा विमर्श खोजें...' : 'Search verses, mantras, poets, or Sabha inquiries...'}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#fbf8ee] placeholder-[#ded5c4]/50 focus:outline-none font-serif"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 rounded text-[#ded5c4] hover:text-[#fbf8ee]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2.5 py-1 text-xs bg-white/10 border border-white/15 rounded-md font-mono text-[#ded5c4]">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {!q ? (
            <div className="text-center py-10 space-y-3">
              <p className="text-sm sm:text-base text-[#ded5c4] font-serif">
                {language === 'hi' ? (
                  <>सुझाव: <span className="text-[#e6c387] italic font-semibold">"नासदीय"</span>, <span className="text-[#e6c387] italic font-semibold">"माण्डूक्य"</span>, <span className="text-[#e6c387] italic font-semibold">"कालिदास"</span>, <span className="text-[#e6c387] italic font-semibold">"कबीर"</span>, या <span className="text-[#e6c387] italic font-semibold">"अद्वैत"</span> खोजें।</>
                ) : (
                  <>Try searching for <span className="text-[#e6c387] italic font-semibold">"Nasadiya"</span>, <span className="text-[#e6c387] italic font-semibold">"Turiya"</span>, <span className="text-[#e6c387] italic font-semibold">"Kalidasa"</span>, <span className="text-[#e6c387] italic font-semibold">"Kabir"</span>, or <span className="text-[#e6c387] italic font-semibold">"Advaita"</span>.</>
                )}
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Nasadiya Sukta', 'Gayatri Mantra', 'Isha Upanishad', 'Meghaduta', 'Kabir Doha', 'Tagore', 'Rashmirathi'].map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#e6c387]/20 border border-white/10 hover:border-[#e6c387]/40 text-[#ded5c4] hover:text-[#e6c387] transition-all font-mono font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalMatches === 0 ? (
            <div className="text-center py-12 text-[#ded5c4] font-serif text-base">
              {language === 'hi' ? `"${query}" हेतु कोई परिणाम प्राप्त नहीं हुआ। अन्य शब्द द्वारा खोजें।` : `No results found for "${query}". Try a different term or spelling.`}
            </div>
          ) : (
            <>
              {/* Shlokas / Verses Matches */}
              {matchedShlokas.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-mono text-[#e6c387] mb-2.5 flex items-center gap-1.5 font-bold">
                    <BookOpen className="w-4 h-4" />
                    <span>{language === 'hi' ? `शास्त्र एवं मन्त्र (${matchedShlokas.length})` : `Scriptures & Shlokas (${matchedShlokas.length})`}</span>
                  </h4>
                  <div className="space-y-2.5">
                    {matchedShlokas.map((shloka) => {
                      const shlokaTitle = language === 'hi' && shloka.titleHi ? shloka.titleHi : shloka.title;
                      const shlokaTrans = language === 'hi' && shloka.translationHi ? shloka.translationHi : shloka.translation;
                      return (
                        <div
                          key={shloka.id}
                          onClick={() => {
                            onClose();
                            onSelectShloka(shloka);
                          }}
                          className="p-4 rounded-xl bg-[#090806] hover:bg-[#181512] border border-white/10 hover:border-[rgba(230,195,135,0.4)] cursor-pointer group transition-all flex items-start justify-between gap-3"
                        >
                          <div>
                            <div className="text-xs font-mono text-[#e6c387] mb-1 font-semibold">
                              {shloka.source} • {shloka.chapterOrHymn}
                            </div>
                            <div className={`font-bold text-[#fbf8ee] group-hover:text-[#e6c387] transition-colors ${language === 'hi' ? 'font-devanagari text-lg leading-normal' : 'text-base font-cinzel'}`}>
                              {shlokaTitle}
                            </div>
                            <p className={`text-sm mt-1 line-clamp-1 leading-relaxed ${language === 'hi' ? 'font-devanagari text-[#ded5c4] not-italic' : 'text-[#ded5c4] font-serif italic'}`}>
                              "{shlokaTrans}"
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#e6c387] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1.5" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Poets Matches */}
              {matchedPoets.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-mono text-[#e6c387] mb-2.5 flex items-center gap-1.5 font-bold">
                    <Feather className="w-4 h-4" />
                    <span>{language === 'hi' ? `कवि एवं मनीषी (${matchedPoets.length})` : `Poets & Luminaries (${matchedPoets.length})`}</span>
                  </h4>
                  <div className="space-y-2.5">
                    {matchedPoets.map((poet) => (
                      <div
                        key={poet.id}
                        className="p-4 rounded-xl bg-[#090806] border border-white/10 flex items-start justify-between gap-3"
                      >
                        <div>
                          <div className="text-xs font-mono text-[#e6c387] font-semibold">
                            {language === 'hi' && poet.eraHi ? poet.eraHi : poet.era} • {poet.periodApprox}
                          </div>
                          <div className={`font-bold text-[#fbf8ee] ${language === 'hi' ? 'font-devanagari text-lg leading-normal' : 'text-base font-cinzel'}`}>
                            {poet.name} ({poet.sanskritName})
                          </div>
                          <p className="text-sm text-[#ded5c4] font-serif mt-1 line-clamp-1 leading-relaxed">
                            {language === 'hi' && poet.bioHi ? poet.bioHi : poet.bio}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Forum Discussions Matches */}
              {matchedThreads.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-mono text-[#e6c387] mb-2.5 flex items-center gap-1.5 font-bold">
                    <MessageSquare className="w-4 h-4" />
                    <span>{language === 'hi' ? `सभा विमर्श (${matchedThreads.length})` : `The Sabha Inquiries (${matchedThreads.length})`}</span>
                  </h4>
                  <div className="space-y-2.5">
                    {matchedThreads.map((thread) => (
                      <div
                        key={thread.id}
                        onClick={() => {
                          onClose();
                          onSelectThread(thread);
                        }}
                        className="p-4 rounded-xl bg-[#090806] hover:bg-[#181512] border border-white/10 hover:border-[rgba(230,195,135,0.4)] cursor-pointer group transition-all flex items-start justify-between gap-3"
                      >
                        <div>
                          <div className="text-xs font-mono text-[#e6c387] font-semibold">
                            {thread.category.replace('-', ' ')} • by {thread.author}
                          </div>
                          <div className="text-base font-cinzel font-bold text-[#fbf8ee] group-hover:text-[#e6c387] transition-colors">
                            {thread.title}
                          </div>
                          <p className="text-sm text-[#ded5c4] font-serif mt-1 line-clamp-1 leading-relaxed">
                            {thread.content}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#e6c387] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1.5" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
