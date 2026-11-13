import React, { useState, useEffect, useRef } from 'react';
import { omChant } from '../utils/omChantAudio';
import type { OmChantKey } from '../utils/omChantAudio';
import { getBookmarkedShlokaIds } from '../utils/storage';
import { useLanguage } from '../context/LanguageContext';
import { Search, Volume2, VolumeX, Bookmark, MessageSquare, Feather, Sliders, ChevronDown, Check } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenBookmarks?: () => void;
  onOpenBookshelf?: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenBookmarks,
  onOpenBookshelf,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [volume, setVolume] = useState(65);
  const [pitch, setPitch] = useState<OmChantKey>('136.1Hz (Cosmic Om)');
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = omChant.subscribe(playing => {
      setIsAudioPlaying(playing);
    });
    setBookmarkCount(getBookmarkedShlokaIds().length);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (controlsRef.current && !controlsRef.current.contains(e.target as Node)) {
        setIsControlsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAudioToggle = () => {
    omChant.toggle();
  };

  const handleVolumeChange = (newVal: number) => {
    setVolume(newVal);
    omChant.setVolume(newVal / 100);
  };

  const handlePitchChange = (newPitch: OmChantKey) => {
    setPitch(newPitch);
    omChant.setPitch(newPitch);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0b0a08]/92 backdrop-blur-md border-b border-[rgba(230,195,135,0.15)] py-3 shadow-2xl'
          : 'bg-gradient-to-b from-[#0b0a08]/95 to-transparent py-4'
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 xl:gap-6">
        {/* Brand / Logo */}
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); scrollTo('top'); }}
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
        >
          <div className="w-9 h-9 rounded-full bg-[#1c1813] border border-[rgba(230,195,135,0.3)] flex items-center justify-center text-lg shadow-inner group-hover:border-[#e6c387] transition-all shrink-0">
            🪷
          </div>
          <div className="shrink-0">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="font-cinzel font-bold text-base sm:text-lg tracking-wider text-[#fbf8ee] group-hover:text-[#e6c387] transition-colors whitespace-nowrap">
                KAVYA VEDIKA
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#e6c387]/10 text-[#e6c387] border border-[#e6c387]/20 font-devanagari whitespace-nowrap shrink-0">
                काव्य वेदिका
              </span>
            </div>
            <p className="text-[10px] tracking-wider uppercase text-[#d1c7b2]/60 hidden 2xl:block whitespace-nowrap mt-0.5">
              {t('nav.subtitle', 'Sanctuary of Vedas, Upanishads & Indian Poets')}
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-6 2xl:gap-7 text-xs uppercase tracking-wider xl:tracking-widest font-medium text-[#d1c7b2] shrink-0 whitespace-nowrap">
          <button
            onClick={() => scrollTo('vedas-section')}
            className="hover:text-[#e6c387] transition-colors whitespace-nowrap py-1 shrink-0"
          >
            {t('nav.vedas', 'The Vedas')}
          </button>
          <button
            onClick={() => scrollTo('upanishads-section')}
            className="hover:text-[#e6c387] transition-colors whitespace-nowrap py-1 shrink-0"
          >
            {t('nav.upanishads', 'Upanishads')}
          </button>
          <button
            onClick={() => scrollTo('poets-section')}
            className="hover:text-[#e6c387] transition-colors whitespace-nowrap py-1 shrink-0"
          >
            {t('nav.poets', 'Poets & Kavya')}
          </button>
          <button
            onClick={() => scrollTo('sabha-forum')}
            className="flex items-center gap-1.5 text-[#e6c387] hover:text-[#fff3d1] transition-colors whitespace-nowrap py-1 shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">{t('nav.sabha', 'The Sabha')}</span>
          </button>
          {onOpenBookshelf && (
            <button
              onClick={onOpenBookshelf}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6c387]/15 hover:bg-[#e6c387]/30 text-[#e6c387] border border-[#e6c387]/40 hover:border-[#e6c387] transition-all shadow-[0_0_12px_rgba(230,195,135,0.2)] whitespace-nowrap shrink-0"
              title="Open 3D Sacred Book Sanctum"
            >
              <span className="shrink-0">📚</span>
              <span className="font-semibold tracking-wide whitespace-nowrap">{t('nav.bookshelf', '3D Granthagar')}</span>
            </button>
          )}
        </nav>

        {/* Right Actions Bar */}
        <div className="flex items-center gap-2 xl:gap-2.5 shrink-0 whitespace-nowrap">
          {/* Sacred Om Chant Controller with Popover */}
          <div className="relative shrink-0" ref={controlsRef}>
            <div className="inline-flex items-center rounded-full bg-[#181512]/80 border border-[rgba(230,195,135,0.25)] p-0.5 shadow-sm whitespace-nowrap">
              <button
                onClick={handleAudioToggle}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs transition-all whitespace-nowrap shrink-0 ${
                  isAudioPlaying
                    ? 'bg-[#e6c387]/25 text-[#fbf8ee] shadow-[0_0_15px_rgba(230,195,135,0.35)]'
                    : 'text-[#d1c7b2] hover:text-[#fbf8ee]'
                }`}
                title="Toggle Sacred Om (AUM / ॐ) Chant"
              >
                {isAudioPlaying ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#e6c387] animate-pulse shrink-0" />
                    <span className="font-devanagari text-sm text-[#e6c387] font-bold shrink-0">ॐ</span>
                    <span className="hidden sm:inline font-mono text-[11px] text-[#e6c387] whitespace-nowrap">Om (136.1Hz)</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#d1c7b2]/70 shrink-0" />
                    <span className="font-devanagari text-xs text-[#d1c7b2] shrink-0">ॐ</span>
                    <span className="hidden sm:inline text-[11px] whitespace-nowrap">Om Chant</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsControlsOpen(prev => !prev)}
                className={`p-1.5 rounded-full transition-colors text-[#d1c7b2]/70 hover:text-[#e6c387] shrink-0 ${
                  isControlsOpen ? 'bg-white/10 text-[#e6c387]' : ''
                }`}
                title="Sacred Sound Settings"
                aria-label="Sound settings"
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${isControlsOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Sacred Om Sound Popover Panel */}
            {isControlsOpen && (
              <div className="absolute right-0 mt-2.5 w-72 sm:w-80 rounded-2xl bg-[#14120e] border border-[rgba(230,195,135,0.3)] shadow-[0_15px_40px_rgba(0,0,0,0.85)] p-4 space-y-4 z-50 animate-fade-in backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-devanagari text-lg text-[#e6c387]">ॐ</span>
                    <div>
                      <h4 className="text-xs font-cinzel font-bold text-[#fbf8ee]">
                        Pranav (ॐ) Chant Engine
                      </h4>
                      <p className="text-[10px] text-[#d1c7b2]/60 font-serif">
                        Vedic stone temple resonance
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleAudioToggle}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                      isAudioPlaying
                        ? 'bg-[#e6c387] text-[#0b0a08]'
                        : 'bg-white/10 text-[#d1c7b2] hover:text-[#fbf8ee]'
                    }`}
                  >
                    {isAudioPlaying ? 'Chanting' : 'Start'}
                  </button>
                </div>

                {/* Phonetic Evolution Cycle Indicator */}
                <div className="space-y-1.5 bg-[#0b0a08]/80 p-2.5 rounded-xl border border-white/5">
                  <div className="flex justify-between text-[10px] font-mono text-[#e6c387]">
                    <span>A (Akāra)</span>
                    <span>→</span>
                    <span>U (Ukāra)</span>
                    <span>→</span>
                    <span>M (Makāra)</span>
                    <span>→</span>
                    <span>Turīya</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-[#d97736] via-[#e6c387] to-[#d97736] rounded-full ${
                        isAudioPlaying ? 'animate-pulse' : 'opacity-40'
                      }`}
                    />
                  </div>
                  <p className="text-[10px] text-[#d1c7b2]/60 italic font-serif text-center pt-0.5">
                    Māṇḍūkya: Earthly state → Dream state → Deep sleep → Transcendence
                  </p>
                </div>

                {/* Pitch / Sacred Tuning Selection */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-[#d1c7b2]/80 uppercase tracking-wider">
                    Sacred Frequency:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {(['136.1Hz (Cosmic Om)', '108Hz (Sacred)', '146.8Hz (D)', '128Hz (C-Parchment)'] as OmChantKey[]).map((k) => (
                      <button
                        key={k}
                        onClick={() => handlePitchChange(k)}
                        className={`px-2 py-1.5 rounded-lg text-left text-[11px] font-mono transition-all flex items-center justify-between ${
                          pitch === k
                            ? 'bg-[#e6c387]/20 border border-[#e6c387] text-[#e6c387] font-semibold'
                            : 'bg-white/5 hover:bg-white/10 text-[#d1c7b2] border border-white/5'
                        }`}
                      >
                        <span className="truncate">{k.split(' ')[0]}</span>
                        {pitch === k && <Check className="w-3 h-3 text-[#e6c387]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Volume Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono text-[#d1c7b2]">
                    <span className="flex items-center gap-1">
                      <Sliders className="w-3 h-3 text-[#e6c387]" />
                      <span>Volume</span>
                    </span>
                    <span className="text-[#e6c387]">{volume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="w-full accent-[#e6c387] bg-white/10 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Universal Language Switcher Pill (EN | हिन्दी) */}
          <div className="flex items-center bg-[#181512]/90 border border-[rgba(230,195,135,0.3)] rounded-full p-0.5 shadow-sm shrink-0 whitespace-nowrap">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-full transition-all whitespace-nowrap shrink-0 ${
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
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-full font-devanagari transition-all whitespace-nowrap shrink-0 ${
                language === 'hi'
                  ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-xs'
                  : 'text-[#d1c7b2]/70 hover:text-[#fbf8ee]'
              }`}
              title="हिन्दी में बदलें"
            >
              हिन्दी
            </button>
          </div>

          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181512]/70 hover:bg-[#201c18] border border-[rgba(230,195,135,0.2)] hover:border-[rgba(230,195,135,0.5)] text-[#d1c7b2] hover:text-[#fbf8ee] text-xs transition-all whitespace-nowrap shrink-0"
            title="Global Search (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#e6c387] shrink-0" />
            <span className="hidden md:inline whitespace-nowrap">{t('nav.search', 'Search')}</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[9px] bg-black/40 border border-white/10 rounded font-mono text-[#d1c7b2]/70 shrink-0">
              ⌘K
            </kbd>
          </button>

          {/* Bookmarked Verses Pill */}
          {bookmarkCount > 0 && onOpenBookmarks && (
            <button
              onClick={onOpenBookmarks}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#181512]/70 border border-[#e6c387]/30 text-[#e6c387] text-xs hover:border-[#e6c387] transition-all whitespace-nowrap shrink-0"
              title={t('nav.savedVerses', 'Saved Verses')}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current shrink-0" />
              <span className="text-[11px] font-semibold whitespace-nowrap">{bookmarkCount}</span>
            </button>
          )}

          {/* Direct link to Sabha */}
          <button
            onClick={() => scrollTo('sabha-forum')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#e6c387] hover:bg-[#f5d99b] text-[#0b0a08] transition-all shadow-[0_2px_10px_rgba(230,195,135,0.2)] whitespace-nowrap shrink-0"
          >
            <Feather className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">{t('nav.joinDiscourse', 'Join Discourse')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
