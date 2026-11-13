import React, { useState } from 'react';
import type { ForumCategory, ForumThread } from '../types/forum';
import { addForumThread } from '../utils/storage';
import { useLanguage } from '../context/LanguageContext';
import { X, Sparkles, Feather } from 'lucide-react';

interface NewThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onThreadCreated: (thread: ForumThread) => void;
  initialCitation?: {
    shlokaId?: string;
    text: string;
    source: string;
  };
}

export const NewThreadModal: React.FC<NewThreadModalProps> = ({
  isOpen,
  onClose,
  onThreadCreated,
  initialCitation,
}) => {
  const { language } = useLanguage();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ForumCategory>('vedic-exegesis');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [citationText, setCitationText] = useState(initialCitation?.text || '');
  const [citationSource, setCitationSource] = useState(initialCitation?.source || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newThread = addForumThread({
      title: title.trim(),
      category,
      author: author.trim(),
      content: content.trim(),
      tags: tags.length > 0 ? tags : ['Philosophy', 'Discussion'],
      authorAvatar: '🕉️',
      citation: citationText && citationSource ? {
        text: citationText,
        source: citationSource,
        shlokaId: initialCitation?.shlokaId
      } : undefined
    });

    onThreadCreated(newThread);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#14120e] border border-[rgba(230,195,135,0.3)] rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-[#d97736] via-[#e6c387] to-[#d97736]" />

        <div className="p-6 border-b border-[rgba(230,195,135,0.18)] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#e6c387] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'सभा • पावन शास्त्रार्थ मञ्च' : 'The Sabha • Open Sacred Inquiries'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-[#fbf8ee] mt-1">
              {language === 'hi' ? 'सभा में नया शास्त्रार्थ आरम्भ करें' : 'Initiate a Discussion in the Sabha'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#ded5c4] hover:text-[#fbf8ee] hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
          {/* Author Name */}
          <div>
            <label className="block text-xs uppercase font-mono tracking-wider text-[#ded5c4] mb-2 font-semibold">
              {language === 'hi' ? 'आपका शुभ नाम / पदवी *' : 'Your Name / Title *'}
            </label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder={language === 'hi' ? 'उदा. आचार्य विद्यासागर, वेदान्त अध्येता, जिज्ञासु' : 'e.g. Acharya Vidyasagar, Seeker, Student of Vedanta'}
              className="w-full px-4 py-3 rounded-xl bg-[#090806] border border-[rgba(230,195,135,0.25)] text-[#fbf8ee] text-sm focus:outline-none focus:border-[#e6c387] transition-all"
            />
          </div>

          {/* Category Picker */}
          <div>
            <label className="block text-xs uppercase font-mono tracking-wider text-[#ded5c4] mb-2 font-semibold">
              {language === 'hi' ? 'परम्परा / श्रेणी *' : 'Category *'}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ForumCategory)}
              className="w-full px-4 py-3 rounded-xl bg-[#090806] border border-[rgba(230,195,135,0.25)] text-[#fbf8ee] text-sm focus:outline-none focus:border-[#e6c387] transition-all cursor-pointer font-medium"
            >
              <option value="vedic-exegesis" className="bg-[#14120e]">{language === 'hi' ? 'वैदिक संहिता एवं सूक्त भाष्य' : 'Vedic Exegesis & Hymns'}</option>
              <option value="upanishadic-advaita" className="bg-[#14120e]">{language === 'hi' ? 'उपनिषद् एवं अद्वैत दर्शन (वेदान्त)' : 'Upanishadic Non-Duality (Advaita & Vedanta)'}</option>
              <option value="classical-rasa" className="bg-[#14120e]">{language === 'hi' ? 'शास्त्रीय संस्कृत काव्य एवं रसशास्त्र' : 'Classical Sanskrit Kavya & Aesthetics (Rasa)'}</option>
              <option value="bhakti-mysticism" className="bg-[#14120e]">{language === 'hi' ? 'भक्ति रसधारा एवं सन्त काव्य' : 'Bhakti Movement & Mystical Lyrics'}</option>
              <option value="modern-reflections" className="bg-[#14120e]">{language === 'hi' ? 'आधुनिक विमर्श एवं तुलनात्मक दर्शन' : 'Modern Interpretations & Comparative Philosophy'}</option>
              <option value="meter-chanting" className="bg-[#14120e]">{language === 'hi' ? 'वैदिक छन्द एवं गान परम्परा' : 'Metre & Chanting Traditions'}</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs uppercase font-mono tracking-wider text-[#ded5c4] mb-2 font-semibold">
              {language === 'hi' ? 'शास्त्रार्थ का मुख्य विषय / शीर्षक *' : 'Topic / Inquiry Title *'}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={language === 'hi' ? 'उदा. ऋग्वेद में उषा की दार्शनिक भूमिका एवं महर्षि अरविन्द का दृष्टिकोण' : "e.g. The metaphysical role of Usha in the Rigveda vs. Sri Aurobindo's interpretation"}
              className="w-full px-4 py-3 rounded-xl bg-[#090806] border border-[rgba(230,195,135,0.25)] text-[#fbf8ee] text-sm focus:outline-none focus:border-[#e6c387] transition-all font-cinzel font-semibold"
            />
          </div>

          {/* Citation (Optional) */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#090806] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#e6c387] font-semibold">
              <Feather className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'पावन श्लोक उद्धरण संलग्न करें (ऐच्छिक)' : 'Attach Sacred Shloka Citation (Optional)'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={citationSource}
                onChange={(e) => setCitationSource(e.target.value)}
                placeholder={language === 'hi' ? 'स्रोत (उदा. कठोपनिषद् १.३.१४)' : 'Source (e.g. Katha Upanishad 1.3.14)'}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#14120e] border border-white/15 text-xs sm:text-sm text-[#fbf8ee] focus:border-[#e6c387] focus:outline-none"
              />
              <input
                type="text"
                value={citationText}
                onChange={(e) => setCitationText(e.target.value)}
                placeholder={language === 'hi' ? 'मन्त्र अंश या मूल पंक्ति' : 'Verse excerpt or key phrase'}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#14120e] border border-white/15 text-xs sm:text-sm text-[#fbf8ee] focus:border-[#e6c387] focus:outline-none font-devanagari"
              />
            </div>
          </div>

          {/* Content Body */}
          <div>
            <label className="block text-xs uppercase font-mono tracking-wider text-[#ded5c4] mb-2 font-semibold">
              {language === 'hi' ? 'आपका विमर्श / जिज्ञासा *' : 'Your Discourse / Inquiry *'}
            </label>
            <textarea
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={language === 'hi' ? 'अपनी जिज्ञासा, दार्शनिक विचार, भाषिक विवेचना अथवा व्याख्या प्रस्तुत करें...' : 'State your reflection, philosophical question, linguistic nuance, or poetic commentary...'}
              className="w-full p-4 rounded-xl bg-[#090806] border border-[rgba(230,195,135,0.25)] text-[#fbf8ee] text-sm sm:text-base focus:outline-none focus:border-[#e6c387] transition-all font-serif leading-relaxed"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs uppercase font-mono tracking-wider text-[#ded5c4] mb-2 font-semibold">
              {language === 'hi' ? 'विषय-सूचक टैग (अल्पविराम से पृथक्)' : 'Tags (Comma separated)'}
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder={language === 'hi' ? 'उदा. ऋग्वेद, अग्नि, अद्वैत, कालिदास' : 'e.g. Rigveda, Agni, Advaita, Kalidasa'}
              className="w-full px-4 py-3 rounded-xl bg-[#090806] border border-[rgba(230,195,135,0.25)] text-[#fbf8ee] text-sm focus:outline-none focus:border-[#e6c387] transition-all"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#ded5c4] hover:text-[#fbf8ee] transition-colors"
            >
              {language === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#e6c387] hover:bg-[#f5d99b] text-[#0b0a08] transition-all shadow-[0_2px_15px_rgba(230,195,135,0.35)]"
            >
              {language === 'hi' ? 'सभा में प्रकाशित करें' : 'Post to The Sabha'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
