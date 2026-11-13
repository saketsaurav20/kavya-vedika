import React, { useEffect, useRef, useState } from 'react';
import styles from './HeroScrollStage.module.css';
import { HeroArtwork } from './HeroArtwork';
import type { HeroArtworkMode } from './HeroArtwork';
import { omChant } from '../utils/omChantAudio';
import { Sparkles, ArrowDown, Volume2, VolumeX, MessageSquare, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroScrollStageProps {
  onExploreCanon: () => void;
  onEnterSabha: () => void;
  onOpenBookshelf?: () => void;
}

export const HeroScrollStage: React.FC<HeroScrollStageProps> = ({
  onExploreCanon,
  onEnterSabha,
  onOpenBookshelf,
}) => {
  const { language, t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const arrivalRef = useRef<HTMLDivElement>(null);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [artworkMode, setArtworkMode] = useState<HeroArtworkMode>('saraswati');

  useEffect(() => {
    const unsub = omChant.subscribe((playing) => {
      setIsAudioPlaying(playing);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const heroEl = heroRef.current;
    const stageEl = stageRef.current;
    const introEl = introRef.current;
    const arrivalEl = arrivalRef.current;

    if (!heroEl || !stageEl || !introEl || !arrivalEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobileQuery = window.matchMedia('(max-width: 600px)');

    let isIntersecting = false;
    let animFrameId = 0;
    let heroTop = 0;
    let trackDistance = 1;
    let currentP = 0;
    let initialized = false;
    let lastTime: number | null = null;

    const updateFrame = (now: number) => {
      animFrameId = 0;
      if (!isIntersecting || document.hidden) return;

      const rawP = prefersReducedMotion.matches
        ? 0
        : Math.max(0, Math.min(1, (window.scrollY - heroTop) / trackDistance));

      const dt = lastTime === null ? 1000 / 60 : Math.min(64, now - lastTime);

      // Smooth interpolation for fluid touch gestures
      if (initialized && isMobileQuery.matches && !prefersReducedMotion.matches) {
        currentP = currentP + (rawP - currentP) * (1 - Math.exp(-dt / 80));
      } else {
        currentP = rawP;
      }
      initialized = true;

      const hasDelta = Math.abs(rawP - currentP) > 0.0002;
      if (!hasDelta) {
        currentP = rawP;
      }

      const pString = currentP.toFixed(4);
      introEl.style.setProperty('--hero-progress', pString);
      arrivalEl.style.setProperty('--hero-progress', pString);
      setScrollProgress(currentP);

      lastTime = hasDelta ? now : null;
      if (hasDelta) {
        animFrameId = requestAnimationFrame(updateFrame);
      }
    };

    const triggerFrame = () => {
      if (!animFrameId && isIntersecting && !document.hidden) {
        animFrameId = requestAnimationFrame(updateFrame);
      }
    };

    const recalculateDimensions = () => {
      heroTop = heroEl.getBoundingClientRect().top + window.scrollY;
      const stageH = stageEl.offsetHeight;
      trackDistance = Math.max(1, 0.5 * stageH, heroEl.offsetHeight - stageH);
      triggerFrame();
    };

    const handleVisibility = () => {
      if (!isIntersecting || document.hidden) {
        if (animFrameId) {
          cancelAnimationFrame(animFrameId);
          animFrameId = 0;
        }
        lastTime = null;
        initialized = false;
      } else {
        triggerFrame();
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      handleVisibility();
    });

    const ro = new ResizeObserver(recalculateDimensions);

    io.observe(heroEl);
    ro.observe(heroEl);
    ro.observe(stageEl);
    recalculateDimensions();

    prefersReducedMotion.addEventListener('change', handleVisibility);
    isMobileQuery.addEventListener('change', recalculateDimensions);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('scroll', triggerFrame, { passive: true });
    window.addEventListener('resize', recalculateDimensions);

    return () => {
      io.disconnect();
      ro.disconnect();
      if (animFrameId) cancelAnimationFrame(animFrameId);
      prefersReducedMotion.removeEventListener('change', handleVisibility);
      isMobileQuery.removeEventListener('change', recalculateDimensions);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('scroll', triggerFrame);
      window.removeEventListener('resize', recalculateDimensions);
    };
  }, []);

  const handleAudioToggle = () => {
    omChant.toggle();
  };

  return (
    <section id="top" ref={heroRef} className={styles.hero} aria-label="Hero Vedic Presentation">
      <div ref={stageRef} className={styles.stage}>
        {/* Layer -3: Classical Indian Masterpiece Scene & Atmospheric Shaders */}
        <div className={styles.artwork} aria-hidden="true">
          <HeroArtwork artworkMode={artworkMode} />
        </div>

        {/* Layer -2: Legibility Shade Vignette */}
        <div className={styles.shade} aria-hidden="true" />

        {/* Layer 1: Intro Text (Fades out and ascends slightly as user scrolls) */}
        <div ref={introRef} className={styles.intro}>
          <div className={styles.sanskritVow}>
            <Sparkles className="w-3.5 h-3.5 text-[#e6c387]" />
            <span>नासदासीन्नो सदासीत्तदानीम् • ऋग्वेद १०.१२९</span>
          </div>
          <h1>
            <span>{language === 'hi' ? 'शाश्वत वाङ्मय की' : 'Echoes of the'}</span>
            <em>{language === 'hi' ? ' दिव्य ध्वनि।' : 'Eternal Canon.'}</em>
          </h1>
          <p className="mt-4 text-[#f3eee1]/75 max-w-lg text-sm md:text-base font-serif italic tracking-wide">
            {language === 'hi'
              ? '"सृष्टि के आरम्भ से पूर्व न असत् था, न सत् था... क्या आवरण था और किसने आश्रय दिया?"'
              : '"Before the universe was born, there was neither non-existence nor existence... what concealed it, and what gave shelter?"'}
          </p>
        </div>

        {/* Layer 1: Arrival Text (Cross-fades and ascends smoothly into focus on scroll) */}
        <div ref={arrivalRef} className={styles.arrival} aria-hidden={scrollProgress < 0.2}>
          <div className={styles.sanskritVow}>
            <Sparkles className="w-3.5 h-3.5 text-[#e6c387]" />
            <span>एकं सद्विप्रा बहुधा वदन्ति • ऋग्वेद १.१६४</span>
          </div>
          <h1>
            <span>{language === 'hi' ? 'वैदिक अग्नि से' : 'From Vedic Flame to'}</span>
            <em>{language === 'hi' ? ' जीवन्त पद्य।' : 'Living Verse.'}</em>
          </h1>
          <p className="mt-4 text-[#f3eee1]/80 max-w-xl text-sm md:text-base font-serif italic tracking-wide">
            {language === 'hi'
              ? '"सत्य एक है; प्रबुद्ध मनीषी उसे विविध नामों से पुकारते हैं।" जहाँ अरण्य के ऋषि सीधे आधुनिक जिज्ञासु से संवाद करते हैं।'
              : '"Truth is One; the illumined sages call It by many names." Where the ancient forest seers speak directly to the modern seeker.'}
          </p>
        </div>

        {/* Bottom Support Bar */}
        <div className={styles.support}>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#e6c387] animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[#e6c387] font-semibold">
                {language === 'hi' ? 'पावन ज्ञान मन्दिर' : 'Sacred Literary Sanctuary'}
              </span>
            </div>
            <p className={styles.description}>
              {language === 'hi'
                ? 'चारों वेद, प्रमुख उपनिषद् तथा वाल्मीकि, कालिदास, कबीर, मीराबाई एवं रवीन्द्रनाथ ठाकुर के अमर काव्य का अनुशीलन करें — एक संवादात्मक शास्त्रार्थ सभा के साथ।'
                : 'Explore the four Vedas, principal Upanishads, and the immortal poetry of Valmiki, Kalidasa, Kabir, Mirabai, and Tagore, complemented by an interactive discourse Sabha.'}
            </p>
          </div>

          <div className={styles.actions}>
            {/* Sacred Artwork Backdrop Switcher */}
            <div className="inline-flex items-center p-0.5 rounded-full bg-[#181512]/90 border border-[rgba(230,195,135,0.25)] text-xs">
              <button
                type="button"
                onClick={() => setArtworkMode('saraswati')}
                className={`px-3 py-1.5 rounded-full transition-all text-xs flex items-center gap-1.5 ${
                  artworkMode === 'saraswati'
                    ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-sm'
                    : 'text-[#ded5c4] hover:text-[#fbf8ee]'
                }`}
                title="Display Maa Saraswati painting backdrop"
              >
                <span>🪷</span>
                <span className="hidden sm:inline">{language === 'hi' ? 'माँ सरस्वती' : 'Maa Saraswati'}</span>
              </button>
              <button
                type="button"
                onClick={() => setArtworkMode('vedic-dawn')}
                className={`px-3 py-1.5 rounded-full transition-all text-xs flex items-center gap-1.5 ${
                  artworkMode === 'vedic-dawn'
                    ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-sm'
                    : 'text-[#ded5c4] hover:text-[#fbf8ee]'
                }`}
                title="Display Vedic Dawn canvas"
              >
                <span>🌄</span>
                <span className="hidden sm:inline">{language === 'hi' ? 'वैदिक उषा' : 'Vedic Dawn'}</span>
              </button>
            </div>

            {/* Meditative Sacred Om Chant Toggle */}
            <button
              onClick={handleAudioToggle}
              className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all border ${
                isAudioPlaying
                  ? 'bg-[#e6c387]/25 border-[#e6c387] text-[#fbf8ee] shadow-[0_0_20px_rgba(230,195,135,0.35)]'
                  : 'bg-[#181512]/80 border-[rgba(230,195,135,0.2)] text-[#d1c7b2] hover:border-[rgba(230,195,135,0.5)] hover:text-[#fbf8ee]'
              }`}
              title="Toggle sacred Om (AUM / ॐ) chant synthesizer"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#e6c387] animate-pulse" />
                  <span className="font-devanagari text-base font-bold text-[#e6c387]">ॐ</span>
                  <span className="font-medium text-[#fbf8ee]">{language === 'hi' ? 'दिव्य ॐ ध्वनि (136.1Hz)' : 'Sacred Om Chant (136.1Hz)'}</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#d1c7b2]" />
                  <span className="font-devanagari text-sm text-[#e6c387]">ॐ</span>
                  <span>{language === 'hi' ? 'ॐ ध्वनि आरम्भ करें' : 'Play Sacred Om Chant'}</span>
                </>
              )}
            </button>

            {/* 3D Granthagar Sanctum Action */}
            {onOpenBookshelf && (
              <button
                onClick={onOpenBookshelf}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#18130e]/95 hover:bg-[#281c12] border border-[#e6c387]/50 hover:border-[#e6c387] text-[#e6c387] hover:text-[#fff5d6] transition-all shadow-[0_0_20px_rgba(230,195,135,0.2)] hover:shadow-[0_0_25px_rgba(230,195,135,0.35)]"
                title="Enter 3D Interactive Library Sanctum"
              >
                <span>📚</span>
                <span>{t('nav.bookshelf', '3D Granthagar')}</span>
              </button>
            )}

            {/* Explore Canon Action */}
            <button
              onClick={onExploreCanon}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#e6c387] hover:bg-[#f5d99b] text-[#0b0a08] transition-all shadow-[0_4px_20px_rgba(230,195,135,0.25)] hover:shadow-[0_6px_25px_rgba(230,195,135,0.4)]"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('hero.exploreCanon', 'Explore Canon')}</span>
            </button>

            {/* Enter Sabha Action */}
            <button
              onClick={onEnterSabha}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#221c17]/90 hover:bg-[#2e261f] border border-[rgba(230,195,135,0.3)] hover:border-[rgba(230,195,135,0.6)] text-[#fbf8ee] transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#e6c387]" />
              <span>{t('nav.sabha', 'The Sabha Forum')}</span>
            </button>
          </div>
        </div>

        {/* Scroll down indicator pill */}
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#d1c7b2]/60 hover:text-[#e6c387] transition-all cursor-pointer pointer-events-auto"
          onClick={onExploreCanon}
          style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
        >
          <span>{language === 'hi' ? 'दर्शन हेतु नीचे स्क्रॉल करें' : 'Scroll to uncover revelation'}</span>
          <ArrowDown className="w-3 h-3 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
