import React from 'react';
import { ArrowUp, Feather } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#070605] border-t border-[rgba(230,195,135,0.2)] text-[#ded5c4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Universal Brihadaranyaka Peace Inscription */}
        <div className="text-center max-w-3xl mx-auto pb-16 border-b border-white/10">
          <div className="inline-block p-3 rounded-full bg-[#181512] border border-[#e6c387]/30 text-2xl mb-4 shadow-inner">
            🪔
          </div>
          <h3 className={`font-bold text-[#fbf8ee] mb-5 ${language === 'hi' ? 'font-devanagari text-2xl tracking-normal' : 'font-cinzel text-xl sm:text-2xl tracking-wider'}`}>
            {language === 'hi' ? 'सार्वभौमिक शान्ति मन्त्र (बृहदारण्यक उपनिषद्)' : 'The Universal Peace Inscription (शान्ति मन्त्रः)'}
          </h3>

          <div className="space-y-3 font-devanagari text-xl sm:text-2xl md:text-3xl text-[#fbf8ee] font-medium leading-loose">
            <p>ॐ असतो मा सद्गमय ।</p>
            <p>तमसो मा ज्योतिर्गमय ।</p>
            <p>मृत्योर्मा अमृतं गमय ।</p>
            <p className="text-xl sm:text-2xl text-[#e6c387] pt-2 font-semibold">ॐ शान्तिः शान्तिः शान्तिः ॥</p>
          </div>

          <p className={`text-base sm:text-lg text-[#ded5c4] mt-5 max-w-xl mx-auto leading-relaxed ${language === 'hi' ? 'font-devanagari not-italic text-lg' : 'font-serif italic'}`}>
            {language === 'hi'
              ? '"हमें असत्य से सत्य की ओर ले चलो; अन्धकार से प्रकाश की ओर ले चलो; मृत्यु से अमरता की ओर ले चलो। ॐ शान्ति, शान्ति, शान्ति।"'
              : '"Lead us from the unreal to the Real; from darkness unto Light; from death unto Immortality. Om Peace, Peace, Peace."'}
          </p>
          <div className="text-xs font-mono text-[#e6c387] mt-2.5 font-semibold">
            — {language === 'hi' ? 'बृहदारण्यकोपनिषद् (१.३.२८)' : 'Bṛhadāraṇyaka Upaniṣad (1.3.28)'}
          </div>
        </div>

        {/* Directory Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-xs sm:text-sm pt-14">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🪷</span>
              <span className="font-cinzel text-lg font-bold text-[#fbf8ee] tracking-wider">
                {language === 'hi' ? 'काव्य वेदिका' : 'KAVYA VEDIKA'}
              </span>
            </div>
            <p className="font-serif text-[#ded5c4] leading-relaxed text-sm">
              {language === 'hi'
                ? 'भारत के शाश्वत आध्यात्मिक साहित्य, संस्कृत काव्य एवं दार्शनिक ज्ञान को समर्पित पावन डिजिटल मन्दिर।'
                : 'The digital sanctuary dedicated to the immortal spiritual literature, poetry, and philosophy of India.'}
            </p>
            <div className="text-xs font-mono text-[#e6c387] pt-2 font-medium">
              काव्यशास्त्रविनोदेन कालो गच्छति धीमताम्
            </div>
          </div>

          {/* Canonical Sections */}
          <div className="space-y-2.5">
            <h4 className="font-cinzel uppercase font-bold text-[#fbf8ee] tracking-wider text-sm mb-3">
              {language === 'hi' ? 'शास्त्र संग्रह' : 'Sacred Canon'}
            </h4>
            <ul className="space-y-2 font-serif text-sm text-[#ded5c4]">
              <li><a href="#canon-explorer" className="hover:text-[#e6c387] transition-colors">{language === 'hi' ? 'चारों वेद (ऋग्, साम, यजुर्, अथर्व)' : 'The Four Vedas (Rig, Sama, Yajur, Atharva)'}</a></li>
              <li><a href="#canon-explorer" className="hover:text-[#e6c387] transition-colors">{language === 'hi' ? 'प्रमुख उपनिषद् दर्शन' : 'The Mukhya Upanishads'}</a></li>
              <li><a href="#canon-explorer" className="hover:text-[#e6c387] transition-colors">{language === 'hi' ? 'शास्त्रीय संस्कृत काव्य (कालिदास, वाल्मीकि)' : 'Classical Sanskrit Kavya (Kalidasa, Valmiki)'}</a></li>
              <li><a href="#canon-explorer" className="hover:text-[#e6c387] transition-colors">{language === 'hi' ? 'भक्ति रसधारा (कबीर, तुलसीदास, मीराबाई)' : 'Bhakti Masters (Kabir, Tulsidas, Mirabai)'}</a></li>
              <li><a href="#canon-explorer" className="hover:text-[#e6c387] transition-colors">{language === 'hi' ? 'आधुनिक नवजागरण (रवीन्द्रनाथ ठाकुर, दिनकर)' : 'Modern Renaissance (Tagore, Dinkar)'}</a></li>
            </ul>
          </div>

          {/* The Sabha Forum */}
          <div className="space-y-2.5">
            <h4 className="font-cinzel uppercase font-bold text-[#fbf8ee] tracking-wider text-sm mb-3">
              {language === 'hi' ? 'सभा एवं शास्त्रार्थ' : 'The Sabha Assembly'}
            </h4>
            <ul className="space-y-2 font-serif text-sm text-[#ded5c4]">
              <li><a href="#sabha-forum" className="hover:text-[#e6c387] transition-colors">{language === 'hi' ? 'वैदिक भाष्य एवं मन्त्र विमर्श' : 'Vedic Exegesis & Mantras'}</a></li>
              <li><a href="#sabha-forum" className="hover:text-[#e6c387] transition-colors">{language === 'hi' ? 'उपनिषद् एवं अद्वैत दर्शन' : 'Upanishadic Non-Duality (Advaita)'}</a></li>
              <li><a href="#sabha-forum" className="hover:text-[#e6c387] transition-colors">{language === 'hi' ? 'रस सिद्धान्त एवं संस्कृत सौन्दर्यशास्त्र' : 'Rasa Theory & Sanskrit Aesthetics'}</a></li>
              <li><a href="#sabha-forum" className="hover:text-[#e6c387] transition-colors">{language === 'hi' ? 'भक्ति काव्य एवं रहस्यवाद' : 'Bhakti Lyricism & Mysticism'}</a></li>
              <li><a href="#sabha-forum" className="hover:text-[#e6c387] transition-colors">{language === 'hi' ? 'वैदिक छन्द एवं उदात्त गान' : 'Metre & Acoustic Chanting Traditions'}</a></li>
            </ul>
          </div>

          {/* Acoustic & Philosophy */}
          <div className="space-y-3">
            <h4 className="font-cinzel uppercase font-bold text-[#fbf8ee] tracking-wider text-sm mb-3">
              {language === 'hi' ? 'नाद ब्रह्म मन्दिर' : 'Acoustic Sanctuary (नाद ब्रह्म)'}
            </h4>
            <p className="font-serif text-sm text-[#ded5c4] leading-relaxed">
              {language === 'hi'
                ? 'मूल Web Audio सिन्थेसाइज़र द्वारा 136.1 Hz दिव्य ॐ प्रणव ध्वनि — मन्दिर की गुहा में गूँजती ध्यानमयी अनुभूति।'
                : 'Equipped with a native Web Audio procedural Om (AUM / ॐ) chant synthesizer, delivering a majestic temple choir in stone-cave acoustics tuned to the cosmic 136.1 Hz Earth vibration.'}
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#181512] border border-white/15 hover:border-[#e6c387] text-[#e6c387] text-xs font-mono font-medium transition-all"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'शीर्ष पर लौटें' : 'Return to Summit'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-10 mt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#ded5c4]/70 font-mono">
          <div className="flex items-center gap-2">
            <Feather className="w-4 h-4 text-[#e6c387]" />
            <span>
              {language === 'hi'
                ? 'भारतीय ऋषियों, अमर कवियों एवं जिज्ञासुओं की शाश्वत धरोहर को सादर समर्पित।'
                : 'Dedicated to the eternal heritage of Indian poets, rishis, and seekers.'}
            </span>
          </div>
          <div>
            Built with React, Vite, TypeScript & Tailwind CSS.
          </div>
        </div>
      </div>
    </footer>
  );
};
