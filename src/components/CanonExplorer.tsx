import React, { useState } from 'react';
import { getAssetUrl } from '../utils/asset';
import type { Shloka } from '../types/canon';
import { VEDAS_SHLOKAS, VEDAS_OVERVIEW } from '../data/vedasData';
import { UPANISHADS_SHLOKAS } from '../data/upanishadsData';
import { POETS_LIST, POETS_SHLOKAS } from '../data/poetsData';
import { Sparkles, BookOpen, Feather, ArrowUpRight, Filter, X, Maximize2, RotateCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ArtworkModalData {
  imageUrl: string;
  title: string;
  subtitle?: string;
  caption: string;
  alt: string;
}

interface CanonExplorerProps {
  onSelectShloka: (shloka: Shloka) => void;
  onOpenSabhaWithTopic?: (category: string) => void;
}

export const CanonExplorer: React.FC<CanonExplorerProps> = ({
  onSelectShloka,
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'vedas' | 'upanishads' | 'classical' | 'bhakti' | 'modern'>('all');
  const [poetEraFilter, setPoetEraFilter] = useState<'all' | 'classical' | 'bhakti' | 'modern'>('all');
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkModalData | null>(null);
  const [artworkRotation, setArtworkRotation] = useState<number>(0);

  const handleOpenArtwork = (data: ArtworkModalData) => {
    setArtworkRotation(0);
    setSelectedArtwork(data);
  };

  const filteredPoets = POETS_LIST.filter(p => {
    if (poetEraFilter === 'all') return true;
    return p.category === poetEraFilter;
  });

  return (
    <div id="canon-explorer" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
      {/* Chapter Navigation Tabs */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e6c387]/15 border border-[#e6c387]/30 text-[#e6c387] text-xs font-mono uppercase tracking-widest font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'शाश्वत भारतीय वाङ्मय' : 'The Timeless Indian Corpus'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-[#fbf8ee] tracking-wide leading-tight">
          {language === 'hi'
            ? 'संस्कृत एवं लोकभाषा की अमूल्य काव्य धरोहर'
            : 'Treasures of Sacred Sanskrit & Vernacular Verse'}
        </h2>
        <p className="max-w-2xl text-base sm:text-lg text-[#ded5c4] font-serif leading-relaxed">
          {language === 'hi'
            ? 'ऋग्वेद की वैश्वानर अग्नि से लेकर उपनिषदों के परम अद्वैत शान्ति और कालिदास, कबीर, मीराबाई एवं रवीन्द्रनाथ ठाकुर के अमर रसोत्कर्ष तक।'
            : 'From the cosmic fire of the Rigveda to the transcendental silence of the Upanishads and the sublime aesthetics of Kalidasa, Kabir, and Tagore.'}
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-[0_2px_14px_rgba(230,195,135,0.35)]'
                : 'bg-[#181512] text-[#ded5c4] hover:text-[#fbf8ee] border border-white/10'
            }`}
          >
            {language === 'hi' ? 'समस्त खण्ड' : 'All Sections'}
          </button>
          <button
            onClick={() => setActiveTab('vedas')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === 'vedas'
                ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-[0_2px_14px_rgba(230,195,135,0.35)]'
                : 'bg-[#181512] text-[#ded5c4] hover:text-[#fbf8ee] border border-white/10'
            }`}
          >
            {language === 'hi' ? '०१ / वैदिक संहिताएँ' : '01 / The Vedas'}
          </button>
          <button
            onClick={() => setActiveTab('upanishads')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === 'upanishads'
                ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-[0_2px_14px_rgba(230,195,135,0.35)]'
                : 'bg-[#181512] text-[#ded5c4] hover:text-[#fbf8ee] border border-white/10'
            }`}
          >
            {language === 'hi' ? '०२ / उपनिषद् दर्शन' : '02 / The Upanishads'}
          </button>
          <button
            onClick={() => setActiveTab('classical')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === 'classical'
                ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-[0_2px_14px_rgba(230,195,135,0.35)]'
                : 'bg-[#181512] text-[#ded5c4] hover:text-[#fbf8ee] border border-white/10'
            }`}
          >
            {language === 'hi' ? '०३ / शास्त्रीय एवं महाकाव्य' : '03 / Classical & Mythological'}
          </button>
          <button
            onClick={() => setActiveTab('bhakti')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === 'bhakti'
                ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-[0_2px_14px_rgba(230,195,135,0.35)]'
                : 'bg-[#181512] text-[#ded5c4] hover:text-[#fbf8ee] border border-white/10'
            }`}
          >
            {language === 'hi' ? '०४ / भक्ति रसधारा' : '04 / Bhakti Masters'}
          </button>
          <button
            onClick={() => setActiveTab('modern')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeTab === 'modern'
                ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-[0_2px_14px_rgba(230,195,135,0.35)]'
                : 'bg-[#181512] text-[#ded5c4] hover:text-[#fbf8ee] border border-white/10'
            }`}
          >
            {language === 'hi' ? '०५ / नवजागरण काव्य' : '05 / Modern Renaissance'}
          </button>
        </div>
      </div>

      {/* SACRED INVOCATION: SARASWATI VANDANA ALTAR */}
      {(activeTab === 'all' || activeTab === 'vedas') && (
        <section className="w-full rounded-3xl bg-gradient-to-b from-[#181512] via-[#120f0c] to-[#0c0a08] border border-[rgba(230,195,135,0.3)] shadow-2xl overflow-hidden p-6 sm:p-8 md:p-10 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(230,195,135,0.12),transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Artwork Column: Maa Saraswati Masterpiece */}
            <div
              className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[rgba(230,195,135,0.35)] shadow-2xl aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] cursor-pointer group bg-[#080706]"
              onClick={() => handleOpenArtwork({
                imageUrl: getAssetUrl('/images/saraswati-devi.jpeg'),
                title: 'Maa Saraswati (माँ सरस्वती)',
                subtitle: 'Goddess of Pure Speech (Vāk), Chhandas, and Wisdom',
                caption: 'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता — The eternal embodiment of aesthetic realization and divine learning.',
                alt: 'Maa Saraswati classical masterpiece painting'
              })}
            >
              <img
                src={getAssetUrl('/images/saraswati-devi.jpeg')}
                alt="Maa Saraswati"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#fbf8ee]">
                <span className="font-devanagari text-sm text-[#e6c387] font-semibold">सरस्वती वन्दना</span>
                <span className="text-[11px] font-mono text-[#ded5c4] group-hover:text-[#e6c387] transition-colors flex items-center gap-1">
                  <span>Enlarge Artwork</span>
                  <Maximize2 className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Invocatory Verse and Commentary */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e6c387]/15 border border-[#e6c387]/30 text-[#e6c387] text-xs font-mono uppercase tracking-widest font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'ॐ वाग्देव्यै नमः • पावन मङ्गलाचरण' : 'ॐ वाग्देव्यै नमः • SACRED INVOCATION'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-[#fbf8ee] tracking-wide leading-tight">
                {language === 'hi' ? 'माँ सरस्वती पावन वेदी' : 'The Sacred Altar of Vidyā'}
              </h3>
              <p className="text-sm sm:text-base text-[#ded5c4] font-serif leading-relaxed">
                {language === 'hi'
                  ? 'वेदों, उपनिषदों एवं अमर कवियों के अनुशीलन से पूर्व, सनातन परम्परा के अनुसार भगवती सरस्वती की पावन वन्दना की जाती है — जो विद्या, वाक् (विशुद्ध वाणी), छन्द एवं नादब्रह्म की अधिष्ठात्री देवी हैं।'
                  : 'Before the seeker embarks upon the contemplation of the Vedas, Upanishads, and the classical poets, tradition bids us offer reverence to Goddess Saraswati—the supreme consciousness presiding over wisdom, pure speech (Vāk), aesthetic grace, and musical harmony.'}
              </p>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#090806]/95 border border-[rgba(230,195,135,0.25)] space-y-2.5 font-devanagari text-lg sm:text-xl md:text-2xl text-[#fbf8ee] font-medium leading-loose">
                <p>या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता ।</p>
                <p>या वीणावरदण्डमण्डितकरा या श्वेतपद्मासना ॥</p>
                <p>या ब्रह्माच्युतशङ्करप्रभृतिभिर्देवैः सदा वन्दिता ।</p>
                <p className="text-[#e6c387] font-semibold">सा मां पातु सरस्वती भगवती निःशेषजाड्यापहा ॥</p>
              </div>

              <p className="text-sm sm:text-base text-[#ded5c4] font-serif italic leading-relaxed">
                {language === 'hi'
                  ? '"माँ सरस्वती हमारी रक्षा करें — जो कुन्द पुष्प, चन्द्रमा और हिमहार के समान धवल हैं; जो श्वेत वस्त्र धारण करती हैं; जिनके कर-कमलों में वीणा और वरदण्ड सुशोभित हैं; जो श्वेत कमल पर विराजमान हैं; ब्रह्मा, विष्णु और शंकर आदि देव जिनकी नित्य स्तुति करते हैं; वे भगवती सरस्वती हमारी समस्त जड़ता और अज्ञान का नाश करें।"'
                  : '"May Goddess Saraswati protect us—She who is fair and radiant as the jasmine blossom, the autumn moon, and a garland of virgin snow; She who is adorned in spotless white raiment; She whose hands gracefully hold the Veena and grant blessings; She who sits upon the sacred white lotus; She who is ever adored by Brahma, Vishnu, and Shankara; may She dispel every trace of darkness, ignorance, and lethargy from our intellects."'}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 01: THE VEDIC CANON */}
      {(activeTab === 'all' || activeTab === 'vedas') && (
        <section id="vedas-section" className="space-y-10 scroll-mt-24">
          <div className="border-b border-[rgba(230,195,135,0.2)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#e6c387] uppercase tracking-widest font-semibold">
                {language === 'hi' ? '०१ / शाश्वत श्रुति' : '01 / THE ETERNAL REVELATION'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#fbf8ee] mt-1.5">
                {language === 'hi' ? 'चारों वेद (चतुर्वेदाः)' : 'The Four Vedas (चतुर्वेदाः)'}
              </h3>
              <p className="text-sm sm:text-base text-[#ded5c4] font-serif max-w-xl mt-2 leading-relaxed">
                {language === 'hi'
                  ? 'अपौरुषेय (मानव बुद्धि द्वारा अरचित): ऋषियों द्वारा गहन समाधि में साक्षात्कृत सृष्टि का मूल नाद और वैश्विक छन्द।'
                  : 'Apaurusheya (unauthored by mortal mind): the auditory revelation of cosmic harmonic rhythm heard by ancient Rishis in profound meditation.'}
              </p>
            </div>
          </div>

          {/* 4 Vedas Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {VEDAS_OVERVIEW.map((veda) => (
              <div
                key={veda.id}
                className="p-6 rounded-2xl parchment-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-devanagari text-2xl text-[#e6c387] font-semibold">
                      {veda.sanskritName}
                    </span>
                    <span className="text-xs uppercase font-mono px-2.5 py-0.5 rounded bg-white/10 text-[#ded5c4] border border-white/5">
                      {language === 'hi' ? 'श्रुति' : 'Shruti'}
                    </span>
                  </div>
                  <h4 className="text-lg font-cinzel font-bold text-[#fbf8ee]">
                    {language === 'hi' ? `${veda.sanskritName} संहिता` : veda.name}
                  </h4>
                  <p className="text-sm text-[#ded5c4] mt-2.5 font-serif leading-relaxed line-clamp-4">
                    {language === 'hi' && veda.summaryHi ? veda.summaryHi : veda.summary}
                  </p>
                </div>
                <div className="mt-4 pt-3.5 border-t border-white/10 text-xs text-[#e6c387] font-mono font-medium">
                  {language === 'hi' ? 'केन्द्रीय विषय: ' : 'Theme: '}
                  {language === 'hi' && veda.centralThemeHi ? veda.centralThemeHi : veda.centralTheme}
                </div>
              </div>
            ))}
          </div>

          {/* Celebrated Vedic Suktas Explorer */}
          <div>
            <h4 className="text-sm uppercase tracking-widest font-mono text-[#e6c387] mb-4 flex items-center gap-2 font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>{language === 'hi' ? 'प्रमुख वैदिक सूक्त एवं मन्त्र' : 'Seminal Vedic Suktas & Verses'}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {VEDAS_SHLOKAS.map((shloka) => {
                const title = language === 'hi' && shloka.titleHi ? shloka.titleHi : shloka.title;
                const chapter = language === 'hi' && shloka.chapterOrHymnHi ? shloka.chapterOrHymnHi : shloka.chapterOrHymn;
                const translation = language === 'hi' && shloka.translationHi ? shloka.translationHi : shloka.translation;
                const rishi = language === 'hi' && shloka.authorOrRishiHi ? shloka.authorOrRishiHi : shloka.authorOrRishi;

                return (
                  <div
                    key={shloka.id}
                    onClick={() => onSelectShloka(shloka)}
                    className="p-6 rounded-2xl parchment-card cursor-pointer group transition-all"
                  >
                    <div className="flex items-center justify-between text-xs text-[#e6c387] mb-2 font-mono font-medium">
                      <span>{shloka.source} • {chapter}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <h5 className={`font-bold text-[#fbf8ee] group-hover:text-[#e6c387] transition-colors leading-snug ${language === 'hi' ? 'font-devanagari text-xl tracking-normal' : 'text-lg font-cinzel'}`}>
                      {title}
                    </h5>

                    {/* Devanagari preview - Large & pristine Sanskrit */}
                    <div className="my-4 p-4 rounded-xl bg-[#0b0a08]/90 border border-white/10 font-devanagari text-lg sm:text-xl text-[#fbf8ee] font-medium leading-loose line-clamp-2">
                      {shloka.devanagari[0]}
                    </div>

                    <p className={`text-sm sm:text-base text-[#ded5c4] line-clamp-2 leading-relaxed ${language === 'hi' ? 'font-devanagari not-italic text-[15px]' : 'font-serif italic'}`}>
                      "{translation}"
                    </p>

                    <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-[#ded5c4]">
                      <span>{language === 'hi' ? 'द्रष्टा ऋषि:' : 'Revealer:'} {rishi}</span>
                      <span className="text-[#e6c387] font-semibold group-hover:underline">
                        {language === 'hi' ? 'मन्त्र दर्शन एवं भाष्य →' : 'Examine Verse →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 02: THE UPANISHADS */}
      {(activeTab === 'all' || activeTab === 'upanishads') && (
        <section id="upanishads-section" className="space-y-10 scroll-mt-24">
          <div className="border-b border-[rgba(230,195,135,0.2)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#e6c387] uppercase tracking-widest font-semibold">
                {language === 'hi' ? '०२ / ज्ञान काण्ड (वेदान्त)' : '02 / THE END OF KNOWLEDGE (VEDANTA)'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#fbf8ee] mt-1.5">
                {language === 'hi' ? 'मुख्य उपनिषदः (वेदान्त दर्शन)' : 'The Principal Upanishads (मुख्य उपनिषदः)'}
              </h3>
              <p className="text-sm sm:text-base text-[#ded5c4] font-serif max-w-xl mt-2 leading-relaxed">
                {language === 'hi'
                  ? '"उप-नि-षद्" — आत्मज्ञान प्राप्त करने हेतु गुरु के समीप निष्ठापूर्वक बैठना ताकि भेद-भ्रम नष्ट होकर अमर आत्मा का साक्षात्कार हो सके।'
                  : '"Upa-ni-shad" — sitting down intimately near the enlightened seer to dissolve the illusion of separation and discover the deathless Self (Atman).'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {UPANISHADS_SHLOKAS.map((shloka) => {
              const title = language === 'hi' && shloka.titleHi ? shloka.titleHi : shloka.title;
              const chapter = language === 'hi' && shloka.chapterOrHymnHi ? shloka.chapterOrHymnHi : shloka.chapterOrHymn;
              const translation = language === 'hi' && shloka.translationHi ? shloka.translationHi : shloka.translation;

              return (
                <div
                  key={shloka.id}
                  onClick={() => onSelectShloka(shloka)}
                  className="p-6 rounded-2xl parchment-card cursor-pointer group transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#e6c387] mb-2 font-mono font-medium">
                      <span>{shloka.source}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <h4 className={`font-bold text-[#fbf8ee] group-hover:text-[#e6c387] transition-colors leading-snug ${language === 'hi' ? 'font-devanagari text-xl tracking-normal' : 'text-lg font-cinzel'}`}>
                      {title}
                    </h4>

                    {/* Sacred Devanagari verse - preserved */}
                    <div className="my-4 p-4 rounded-xl bg-[#0b0a08]/90 border border-white/10 font-devanagari text-lg text-[#fbf8ee] font-medium leading-loose line-clamp-2">
                      {shloka.devanagari[0]}
                    </div>

                    <p className={`text-sm sm:text-base text-[#ded5c4] line-clamp-3 leading-relaxed ${language === 'hi' ? 'font-devanagari not-italic text-[15px]' : 'font-serif italic'}`}>
                      "{translation}"
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-[#ded5c4] font-mono">
                    <span>{chapter}</span>
                    <span className="text-[#e6c387] font-semibold group-hover:underline">
                      {language === 'hi' ? 'चिन्तन एवं भाष्य →' : 'Read & Contemplate →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* SECTION 03 & 04 & 05: POETS & KAVYA */}
      {(activeTab === 'all' || activeTab === 'classical' || activeTab === 'bhakti' || activeTab === 'modern') && (
        <section id="poets-section" className="space-y-12 scroll-mt-24">
          <div className="border-b border-[rgba(230,195,135,0.2)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#e6c387] uppercase tracking-widest font-semibold">
                {language === 'hi' ? '०३ / भारत के अमर स्वर' : '03 / IMMORTAL VOICES OF BHARAT'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#fbf8ee] mt-1.5">
                {language === 'hi' ? 'पौराणिक, शास्त्रीय एवं आधुनिक महाकवि' : 'The Great Mythological, Classical & Modern Poets'}
              </h3>
              <p className="text-sm sm:text-base text-[#ded5c4] font-serif max-w-xl mt-2 leading-relaxed">
                {language === 'hi'
                  ? '"काव्य" — आध्यात्मिक अनुभूति से प्रस्फुटित रसात्मक अभिव्यक्ति, जो नवरसों के माध्यम से सत्य को वाणी प्रदान करती है।'
                  : '"Kavya" — aesthetic expression born of spiritual realization, giving wing to truth through the nine Rasas of human emotion.'}
              </p>
            </div>

            {/* Sub-era Filter */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#181512] border border-white/10 text-xs">
              <Filter className="w-3.5 h-3.5 ml-2 text-[#e6c387]" />
              <button
                onClick={() => setPoetEraFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${poetEraFilter === 'all' ? 'bg-[#e6c387] text-[#0b0a08] font-bold' : 'text-[#ded5c4] hover:text-[#fbf8ee]'}`}
              >
                {language === 'hi' ? 'समस्त युग' : 'All Eras'}
              </button>
              <button
                onClick={() => setPoetEraFilter('classical')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${poetEraFilter === 'classical' ? 'bg-[#e6c387] text-[#0b0a08] font-bold' : 'text-[#ded5c4] hover:text-[#fbf8ee]'}`}
              >
                {language === 'hi' ? 'शास्त्रीय' : 'Classical'}
              </button>
              <button
                onClick={() => setPoetEraFilter('bhakti')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${poetEraFilter === 'bhakti' ? 'bg-[#e6c387] text-[#0b0a08] font-bold' : 'text-[#ded5c4] hover:text-[#fbf8ee]'}`}
              >
                {language === 'hi' ? 'भक्ति' : 'Bhakti'}
              </button>
              <button
                onClick={() => setPoetEraFilter('modern')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${poetEraFilter === 'modern' ? 'bg-[#e6c387] text-[#0b0a08] font-bold' : 'text-[#ded5c4] hover:text-[#fbf8ee]'}`}
              >
                {language === 'hi' ? 'आधुनिक' : 'Modern'}
              </button>
            </div>
          </div>

          {/* Poets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPoets.map((poet) => {
              const bio = language === 'hi' && poet.bioHi ? poet.bioHi : poet.bio;
              const period = language === 'hi' && poet.periodApproxHi ? poet.periodApproxHi : poet.periodApprox;
              const quoteWork = language === 'hi' && poet.masterpieceQuote.workHi ? poet.masterpieceQuote.workHi : poet.masterpieceQuote.work;
              const quoteTrans = language === 'hi' && poet.masterpieceQuote.translationHi ? poet.masterpieceQuote.translationHi : poet.masterpieceQuote.translation;
              const imageCaption = language === 'hi' && poet.imageCaptionHi ? poet.imageCaptionHi : (poet.imageCaption || '');

              return (
                <div
                  key={poet.id}
                  className="p-6 rounded-2xl parchment-card transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h4 className={`font-bold text-[#fbf8ee] ${language === 'hi' ? 'font-devanagari text-xl tracking-normal' : 'text-lg font-cinzel'}`}>
                          {language === 'hi' ? (poet.sanskritName || poet.name) : poet.name}
                        </h4>
                        <div className="font-devanagari text-base text-[#e6c387] font-semibold mt-0.5">
                          {poet.sanskritName}
                        </div>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/10 text-[#ded5c4] border border-white/5 whitespace-nowrap">
                        {period}
                      </span>
                    </div>

                    {/* Sacred Masterpiece Artwork if present */}
                    {poet.imageUrl && (
                      <div
                        className="relative w-full aspect-[16/10] my-3.5 rounded-xl overflow-hidden border border-[rgba(230,195,135,0.25)] group/img cursor-pointer shadow-lg bg-[#080706]"
                        onClick={() => handleOpenArtwork({
                          imageUrl: poet.imageUrl!,
                          title: poet.name,
                          subtitle: poet.sanskritName,
                          caption: imageCaption,
                          alt: poet.imageAlt || poet.name,
                        })}
                      >
                        <img
                          src={poet.imageUrl}
                          alt={poet.imageAlt || poet.name}
                          style={{ objectPosition: poet.imageFocalPoint || 'center' }}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-[#fbf8ee]">
                          <span className="text-[11px] font-serif italic line-clamp-1 pr-2">
                            {imageCaption}
                          </span>
                          <span className="text-[10px] uppercase font-mono text-[#e6c387] shrink-0 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-0.5">
                            <span>{language === 'hi' ? 'विस्तृत करें' : 'Enlarge'}</span>
                            <Maximize2 className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    )}

                    <p className={`text-sm leading-relaxed line-clamp-3 mt-3 ${language === 'hi' ? 'font-devanagari text-[#ede6d7] text-[14.5px]' : 'font-serif text-[#ded5c4]'}`}>
                      {bio}
                    </p>

                    {/* Masterpiece Quote Box */}
                    <div className="my-4 p-4 rounded-xl bg-[#0b0a08]/90 border border-[rgba(230,195,135,0.2)]">
                      <div className="flex items-center gap-1.5 text-xs text-[#e6c387] font-mono font-medium mb-1.5">
                        <Feather className="w-3.5 h-3.5" />
                        <span>{quoteWork}</span>
                      </div>
                      <p className="font-devanagari text-base text-[#fbf8ee] font-medium leading-loose line-clamp-2">
                        {poet.masterpieceQuote.verse}
                      </p>
                      <p className={`mt-2 line-clamp-2 leading-relaxed ${language === 'hi' ? 'font-devanagari not-italic text-sm text-[#ede6d7]' : 'text-xs sm:text-sm text-[#ded5c4] font-serif italic'}`}>
                        "{quoteTrans}"
                      </p>
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-white/10">
                    <div className="text-xs uppercase font-mono text-[#ded5c4]/80 mb-2 font-medium">
                      {language === 'hi' ? 'प्रमुख कालजयी कृतियाँ' : 'Notable Works'}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {poet.famousWorks.slice(0, 3).map((work, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 rounded bg-white/10 text-[#fbf8ee] font-serif border border-white/5"
                        >
                          {work}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Featured Classical Shlokas */}
          <div className="pt-6">
            <h4 className="text-sm uppercase tracking-widest font-mono text-[#e6c387] mb-4 flex items-center gap-2 font-semibold">
              <Feather className="w-4 h-4" />
              <span>{language === 'hi' ? 'अमर पद्य एवं भाष्य अनुशीलन' : 'Select Masterpiece Verses to Study'}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {POETS_SHLOKAS.map((shloka) => {
                const title = language === 'hi' && shloka.titleHi ? shloka.titleHi : shloka.title;
                const chapter = language === 'hi' && shloka.chapterOrHymnHi ? shloka.chapterOrHymnHi : shloka.chapterOrHymn;
                const translation = language === 'hi' && shloka.translationHi ? shloka.translationHi : shloka.translation;
                const author = language === 'hi' && shloka.authorOrRishiHi ? shloka.authorOrRishiHi : shloka.authorOrRishi;
                const metre = language === 'hi' && shloka.metreHi ? shloka.metreHi : shloka.metre;

                return (
                  <div
                    key={shloka.id}
                    onClick={() => onSelectShloka(shloka)}
                    className="p-6 rounded-2xl parchment-card cursor-pointer group transition-all"
                  >
                    <div className="flex items-center justify-between text-xs text-[#e6c387] mb-2 font-mono font-medium">
                      <span>{shloka.source} ({chapter}) • {author}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <h5 className="text-lg font-cinzel font-bold text-[#fbf8ee] group-hover:text-[#e6c387] transition-colors leading-snug">
                      {title}
                    </h5>

                    {/* Original Sacred Sanskrit Verse */}
                    <div className="my-4 p-4 rounded-xl bg-[#0b0a08]/90 border border-white/10 font-devanagari text-lg sm:text-xl text-[#fbf8ee] font-medium leading-loose line-clamp-2">
                      {shloka.devanagari[0]}
                    </div>

                    <p className="text-sm sm:text-base text-[#ded5c4] font-serif italic line-clamp-2 leading-relaxed">
                      "{translation}"
                    </p>

                    <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-[#ded5c4] font-mono">
                      <span>{language === 'hi' ? 'छन्द:' : 'Meter:'} {metre}</span>
                      <span className="text-[#e6c387] font-semibold group-hover:underline">
                        {language === 'hi' ? 'पदान्वय एवं भाष्य देखें →' : 'Explore Verse & Analysis →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Sacred Artwork Contemplation Modal */}
      {selectedArtwork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedArtwork(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#14120e] border border-[rgba(230,195,135,0.35)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#0b0a08]">
              <div>
                <div className="text-xs uppercase font-mono text-[#e6c387] font-semibold">
                  Sacred Classical Masterpiece
                </div>
                <h4 className="text-lg sm:text-xl font-cinzel font-bold text-[#fbf8ee] mt-0.5">
                  {selectedArtwork.title} {selectedArtwork.subtitle && `• ${selectedArtwork.subtitle}`}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setArtworkRotation((prev) => (prev + 90) % 360)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#e6c387]/20 border border-white/15 hover:border-[#e6c387]/40 text-xs font-mono text-[#ded5c4] hover:text-[#e6c387] transition-all flex items-center gap-1.5"
                  title="Rotate artwork 90 degrees"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Rotate {artworkRotation > 0 ? `(${artworkRotation}°)` : ''}</span>
                </button>
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="p-2 rounded-full text-[#ded5c4] hover:text-[#fbf8ee] hover:bg-white/10 transition-all"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="relative w-full rounded-xl overflow-hidden border border-[rgba(230,195,135,0.2)] bg-[#070605] flex items-center justify-center min-h-[300px] p-2">
                <img
                  src={selectedArtwork.imageUrl}
                  alt={selectedArtwork.alt}
                  style={{ transform: `rotate(${artworkRotation}deg)` }}
                  className="w-full max-h-[65vh] object-contain transition-transform duration-300"
                />
              </div>
              {selectedArtwork.caption && (
                <div className="p-4 rounded-xl bg-[#090806] border border-white/10 text-sm sm:text-base text-[#ded5c4] font-serif leading-relaxed italic text-center">
                  "{selectedArtwork.caption}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
