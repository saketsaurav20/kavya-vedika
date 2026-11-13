import React, { useState, useEffect } from 'react';
import type { ForumCategory, ForumThread } from '../types/forum';
import { getStoredForumThreads, toggleUpvote, getUpvotedIds } from '../utils/storage';
import { useLanguage } from '../context/LanguageContext';
import { NewThreadModal } from './NewThreadModal';
import { ThreadDetailModal } from './ThreadDetailModal';
import { Sparkles, MessageSquare, Plus, Search, Heart, Quote, ArrowRight, Filter } from 'lucide-react';

interface SabhaForumProps {
  initialCategory?: string;
  initialCitationForNewThread?: {
    shlokaId?: string;
    text: string;
    source: string;
  } | null;
  onClearInitialCitation?: () => void;
}

export const SabhaForum: React.FC<SabhaForumProps> = ({
  initialCitationForNewThread,
  onClearInitialCitation,
}) => {
  const { language } = useLanguage();
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [activeCategory, setActiveCategory] = useState<ForumCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'upvotes' | 'comments'>('latest');

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [activeThreadDetail, setActiveThreadDetail] = useState<ForumThread | null>(null);
  const [upvotedIds, setUpvotedIds] = useState<string[]>([]);

  useEffect(() => {
    setThreads(getStoredForumThreads());
    setUpvotedIds(getUpvotedIds());
  }, []);

  useEffect(() => {
    if (initialCitationForNewThread) {
      setIsNewModalOpen(true);
    }
  }, [initialCitationForNewThread]);

  const handleThreadCreated = (newThread: ForumThread) => {
    setThreads(prev => [newThread, ...prev]);
    if (onClearInitialCitation) onClearInitialCitation();
  };

  const handleUpdateThread = (updated: ForumThread) => {
    setThreads(prev => prev.map(t => t.id === updated.id ? updated : t));
    setActiveThreadDetail(updated);
    setUpvotedIds(getUpvotedIds());
  };

  const handleUpvoteClick = (e: React.MouseEvent, threadId: string) => {
    e.stopPropagation();
    const res = toggleUpvote(threadId, true);
    if (res.success) {
      setThreads(prev => prev.map(t => t.id === threadId ? { ...t, upvotes: res.newCount } : t));
      setUpvotedIds(getUpvotedIds());
    }
  };

  const filteredThreads = threads.filter(t => {
    if (activeCategory !== 'all' && t.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchContent = t.content.toLowerCase().includes(q);
      const matchAuthor = t.author.toLowerCase().includes(q);
      const matchTags = t.tags.some(tag => tag.toLowerCase().includes(q));
      if (!matchTitle && !matchContent && !matchAuthor && !matchTags) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'upvotes') return b.upvotes - a.upvotes;
    if (sortBy === 'comments') return b.comments.length - a.comments.length;
    return 0; // Default order
  });

  return (
    <section id="sabha-forum" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
      {/* Section Header */}
      <div className="border-b border-[rgba(230,195,135,0.2)] pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e6c387]/15 border border-[#e6c387]/30 text-[#e6c387] text-xs font-mono uppercase tracking-widest mb-3 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? '०४ / पावन विचार सभा' : '04 / THE SACRED ASSEMBLY'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-[#fbf8ee] tracking-wide leading-tight">
            {language === 'hi' ? 'सभा — शास्त्रार्थ एवं संवाद' : 'The Sabha (सभा) — Discourse & Vichāra'}
          </h2>
          <p className="text-base sm:text-lg text-[#ded5c4] font-serif max-w-2xl mt-2 leading-relaxed">
            {language === 'hi'
              ? 'प्राचीन वैदिक सभा एवं समिति में सत्य का अन्वेषण किसी मतवाद से नहीं, अपितु निर्भीक जिज्ञासा, आदरपूर्ण शास्त्रार्थ तथा रसात्मक अनुभूति के माध्यम से होता था।'
              : 'In the ancient Vedic assembly (Sabha & Samiti), truth was discovered not through dogma, but through fearless inquiry, respectful debate (Shastrartha), and aesthetic appreciation.'}
          </p>
        </div>

        {/* Initiate Inquiry Button */}
        <button
          onClick={() => setIsNewModalOpen(true)}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#e6c387] hover:bg-[#f5d99b] text-[#0b0a08] transition-all shadow-[0_4px_20px_rgba(230,195,135,0.3)] hover:shadow-[0_6px_25px_rgba(230,195,135,0.45)] whitespace-nowrap self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'hi' ? 'सभा में नया शास्त्रार्थ आरम्भ करें' : 'Initiate Inquiry in Sabha'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeCategory === 'all'
                ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-sm'
                : 'bg-[#181512] text-[#ded5c4] hover:text-[#fbf8ee] border border-white/10'
            }`}
          >
            {language === 'hi' ? 'समस्त विचार' : 'All Inquiries'}
          </button>
          <button
            onClick={() => setActiveCategory('vedic-exegesis')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeCategory === 'vedic-exegesis'
                ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-sm'
                : 'bg-[#181512] text-[#ded5c4] hover:text-[#fbf8ee] border border-white/10'
            }`}
          >
            {language === 'hi' ? 'वैदिक भाष्य' : 'Vedic Exegesis'}
          </button>
          <button
            onClick={() => setActiveCategory('upanishadic-advaita')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeCategory === 'upanishadic-advaita'
                ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-sm'
                : 'bg-[#181512] text-[#ded5c4] hover:text-[#fbf8ee] border border-white/10'
            }`}
          >
            {language === 'hi' ? 'उपनिषद् एवं अद्वैत' : 'Upanishads & Non-Duality'}
          </button>
          <button
            onClick={() => setActiveCategory('classical-rasa')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeCategory === 'classical-rasa'
                ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-sm'
                : 'bg-[#181512] text-[#ded5c4] hover:text-[#fbf8ee] border border-white/10'
            }`}
          >
            {language === 'hi' ? 'शास्त्रीय रस एवं काव्य' : 'Classical Rasa & Kavya'}
          </button>
          <button
            onClick={() => setActiveCategory('bhakti-mysticism')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeCategory === 'bhakti-mysticism'
                ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-sm'
                : 'bg-[#181512] text-[#ded5c4] hover:text-[#fbf8ee] border border-white/10'
            }`}
          >
            {language === 'hi' ? 'भक्ति रसधारा' : 'Bhakti Mysticism'}
          </button>
          <button
            onClick={() => setActiveCategory('modern-reflections')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeCategory === 'modern-reflections'
                ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-sm'
                : 'bg-[#181512] text-[#ded5c4] hover:text-[#fbf8ee] border border-white/10'
            }`}
          >
            {language === 'hi' ? 'आधुनिक विमर्श' : 'Modern Reflections'}
          </button>
        </div>

        {/* Search and Sort */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#ded5c4]/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'सभा में शास्त्रार्थ खोजें...' : 'Search Sabha discussions...'}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#181512] border border-white/10 text-xs sm:text-sm text-[#fbf8ee] placeholder-[#ded5c4]/50 focus:outline-none focus:border-[#e6c387]"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#181512] border border-white/10 text-xs text-[#ded5c4]">
            <Filter className="w-3.5 h-3.5 ml-1.5 text-[#e6c387]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'upvotes' | 'comments')}
              className="bg-transparent text-xs text-[#ded5c4] focus:outline-none cursor-pointer py-1 pr-1 font-medium"
            >
              <option value="latest" className="bg-[#181512]">{language === 'hi' ? 'नवीनतम' : 'Latest'}</option>
              <option value="upvotes" className="bg-[#181512]">{language === 'hi' ? 'सर्वाधिक अनुमोदन' : 'Most Anumodana'}</option>
              <option value="comments" className="bg-[#181512]">{language === 'hi' ? 'सर्वाधिक विमर्श' : 'Most Discussed'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Threads Grid */}
      {filteredThreads.length === 0 ? (
        <div className="text-center py-16 parchment-card rounded-2xl p-8 space-y-3">
          <p className="text-lg text-[#fbf8ee] font-cinzel font-bold">
            {language === 'hi' ? 'कोई विचार प्राप्त नहीं हुआ' : 'No inquiries match your criteria'}
          </p>
          <p className="text-sm text-[#ded5c4] font-serif">
            {language === 'hi' ? 'इस विषय पर शास्त्रार्थ आरम्भ करने वाले प्रथम जिज्ञासु बनें!' : 'Be the first to open a discussion on this topic!'}
          </p>
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#e6c387] text-[#0b0a08] font-bold text-xs mt-2"
          >
            {language === 'hi' ? 'नया विचार प्रस्तुत करें' : 'Post an Inquiry'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredThreads.map((thread) => {
            const hasUpvoted = upvotedIds.includes(thread.id);
            return (
              <div
                key={thread.id}
                onClick={() => setActiveThreadDetail(thread)}
                className="p-6 rounded-2xl parchment-card cursor-pointer group transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category and date bar */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs uppercase tracking-wider text-[#e6c387] bg-[#e6c387]/15 px-2.5 py-0.5 rounded-full border border-[#e6c387]/30 font-semibold">
                        {thread.category.replace('-', ' ')}
                      </span>
                      {thread.isPinned && (
                        <span className="text-xs uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 font-semibold">
                          Pinned
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#ded5c4]/80 font-mono">
                      {thread.createdAt}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-bold text-[#fbf8ee] group-hover:text-[#e6c387] transition-colors leading-snug ${language === 'hi' ? 'font-devanagari text-xl tracking-normal' : 'text-lg sm:text-xl font-cinzel'}`}>
                    {thread.title}
                  </h3>

                  {/* Citation preview if present */}
                  {thread.citation && (
                    <div className="my-3.5 p-3.5 rounded-xl bg-[#0b0a08]/90 border border-[rgba(230,195,135,0.2)] flex items-start gap-2.5">
                      <Quote className="w-4 h-4 text-[#e6c387] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs uppercase font-mono text-[#e6c387] font-semibold">
                          {thread.citation.source}
                        </span>
                        <p className="font-devanagari text-sm text-[#fbf8ee] font-medium line-clamp-1 mt-0.5 leading-relaxed">
                          {thread.citation.text}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Content preview */}
                  <p className={`text-sm sm:text-base leading-relaxed line-clamp-3 mt-3 ${language === 'hi' ? 'font-devanagari text-[#ede6d7] text-[15px]' : 'font-serif text-[#ded5c4]'}`}>
                    {thread.content}
                  </p>
                </div>

                {/* Footer bar */}
                <div className="mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-[#ded5c4]">
                  <div className="flex items-center gap-2 font-medium">
                    <span>{thread.authorAvatar || '🕉️'}</span>
                    <span className="text-[#fbf8ee]">{thread.author}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Comments count */}
                    <span className="flex items-center gap-1.5 text-xs text-[#ded5c4]">
                      <MessageSquare className="w-3.5 h-3.5 text-[#e6c387]" />
                      <span>{thread.comments.length}</span>
                    </span>

                    {/* Upvote button */}
                    <button
                      onClick={(e) => handleUpvoteClick(e, thread.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                        hasUpvoted
                          ? 'bg-[#e6c387] text-[#0b0a08] font-bold shadow-sm'
                          : 'bg-white/10 text-[#ded5c4] hover:text-[#e6c387] border border-white/5'
                      }`}
                      title="Offer Anumodana"
                    >
                      <Heart className={`w-3.5 h-3.5 ${hasUpvoted ? 'fill-current text-[#0b0a08]' : ''}`} />
                      <span>{thread.upvotes}</span>
                    </button>

                    <ArrowRight className="w-4 h-4 text-[#e6c387] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <NewThreadModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onThreadCreated={handleThreadCreated}
        initialCitation={initialCitationForNewThread || undefined}
      />

      <ThreadDetailModal
        thread={activeThreadDetail}
        onClose={() => setActiveThreadDetail(null)}
        onUpdateThread={handleUpdateThread}
      />
    </section>
  );
};
