import React, { useState } from 'react';
import type { ForumThread, ForumComment } from '../types/forum';
import { toggleUpvote, addCommentToThread, getUpvotedIds } from '../utils/storage';
import { useLanguage } from '../context/LanguageContext';
import { X, Heart, MessageSquare, Send, Quote } from 'lucide-react';

interface ThreadDetailModalProps {
  thread: ForumThread | null;
  onClose: () => void;
  onUpdateThread: (updatedThread: ForumThread) => void;
}

export const ThreadDetailModal: React.FC<ThreadDetailModalProps> = ({
  thread,
  onClose,
  onUpdateThread,
}) => {
  const { language } = useLanguage();
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentRole, setCommentRole] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [upvotedIds, setUpvotedIds] = useState<string[]>(() => getUpvotedIds());

  if (!thread) return null;

  const hasUpvotedThread = upvotedIds.includes(thread.id);

  const handleThreadUpvote = () => {
    const res = toggleUpvote(thread.id, true);
    if (res.success) {
      const updated = { ...thread, upvotes: res.newCount };
      onUpdateThread(updated);
      setUpvotedIds(getUpvotedIds());
    }
  };

  const handleCommentUpvote = (commentId: string) => {
    const res = toggleUpvote(commentId, false, thread.id);
    if (res.success) {
      const updatedComments = thread.comments.map(c =>
        c.id === commentId ? { ...c, upvotes: res.newCount } : c
      );
      const updated = { ...thread, comments: updatedComments };
      onUpdateThread(updated);
      setUpvotedIds(getUpvotedIds());
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentContent.trim()) return;

    const newComment: ForumComment | null = addCommentToThread(thread.id, {
      author: commentAuthor.trim(),
      authorRole: commentRole.trim() || 'Fellow Inquirer',
      content: commentContent.trim()
    });

    if (newComment) {
      const updated = {
        ...thread,
        comments: [...thread.comments, newComment]
      };
      onUpdateThread(updated);
      setCommentContent('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-[#14120e] border border-[rgba(230,195,135,0.3)] rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-[#d97736] via-[#e6c387] to-[#d97736]" />

        {/* Modal Header */}
        <div className="p-6 border-b border-[rgba(230,195,135,0.18)] flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs uppercase font-mono px-3 py-1 rounded-full bg-[#e6c387]/20 text-[#e6c387] border border-[#e6c387]/35 font-bold">
                {thread.category.replace('-', ' ')}
              </span>
              <span className="text-xs text-[#ded5c4] font-mono">
                {thread.createdAt}
              </span>
            </div>
            <h3 className={`font-bold text-[#fbf8ee] leading-snug ${language === 'hi' ? 'font-devanagari text-2xl sm:text-3xl md:text-4xl tracking-normal' : 'text-xl sm:text-2xl md:text-3xl font-cinzel'}`}>
              {thread.title}
            </h3>
            <div className="flex items-center gap-2 mt-2.5 text-xs sm:text-sm text-[#ded5c4]">
              <span className="text-base">{thread.authorAvatar || '🕉️'}</span>
              <span className="font-semibold text-[#e6c387]">{thread.author}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#ded5c4] hover:text-[#fbf8ee] hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Attached Scripture Citation */}
          {thread.citation && (
            <div className="p-4 sm:p-5 rounded-xl bg-[#090806] border border-[rgba(230,195,135,0.25)]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#e6c387] font-semibold mb-1.5">
                <Quote className="w-4 h-4" />
                <span>{language === 'hi' ? 'शास्त्र सन्दर्भ:' : 'Scripture Reference:'} {thread.citation.source}</span>
              </div>
              <p className="font-devanagari text-lg sm:text-xl text-[#fbf8ee] font-medium leading-loose">
                {thread.citation.text}
              </p>
            </div>
          )}

          {/* Main Discourse Content */}
          <div className={`text-base sm:text-lg text-[#f3eee1] leading-relaxed whitespace-pre-line ${language === 'hi' ? 'font-devanagari leading-loose text-[#fbf8ee]' : 'font-serif'}`}>
            {thread.content}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
            {thread.tags.map((tag, idx) => (
              <span key={idx} className="text-xs px-3 py-1 rounded-md bg-white/10 text-[#ded5c4] font-mono border border-white/5">
                #{tag}
              </span>
            ))}
          </div>

          {/* Anumodana Offering Bar */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#181512] border border-[rgba(230,195,135,0.2)]">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#ded5c4] font-medium">
              <MessageSquare className="w-4 h-4 text-[#e6c387]" />
              <span>{thread.comments.length} {language === 'hi' ? 'विचार प्रस्तुत' : 'Reflections Offered'}</span>
            </div>

            <button
              onClick={handleThreadUpvote}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                hasUpvotedThread
                  ? 'bg-[#e6c387] text-[#0b0a08] shadow-[0_0_15px_rgba(230,195,135,0.4)]'
                  : 'bg-white/10 border border-white/15 text-[#ded5c4] hover:border-[#e6c387]/50 hover:text-[#fbf8ee]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasUpvotedThread ? 'fill-current text-[#0b0a08]' : 'text-[#e6c387]'}`} />
              <span>{language === 'hi' ? 'अनुमोदन' : 'Anumodana'} ({thread.upvotes})</span>
            </button>
          </div>

          {/* Comments / Replies Section */}
          <div className="space-y-4 pt-4">
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#e6c387] font-bold flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>{language === 'hi' ? `विद्वत् एवं रसिक विचार (${thread.comments.length})` : `Scholarly & Devotional Reflections (${thread.comments.length})`}</span>
            </h4>

            {thread.comments.length === 0 ? (
              <p className="text-sm text-[#ded5c4] font-serif italic py-4 text-center">
                {language === 'hi' ? 'अभी तक कोई टिप्पणी नहीं है। इस जिज्ञासा पर विचार रखने वाले प्रथम मनीषी बनें!' : 'No reflections offered yet. Be the first to illuminate this inquiry!'}
              </p>
            ) : (
              <div className="space-y-3.5">
                {thread.comments.map((comment) => {
                  const hasUpvotedComment = upvotedIds.includes(comment.id);
                  return (
                    <div
                      key={comment.id}
                      className="p-4 sm:p-5 rounded-xl bg-[#0e0c09] border border-white/10 space-y-2.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[#fbf8ee]">{comment.author}</span>
                          {comment.authorRole && (
                            <span className="text-xs px-2.5 py-0.5 rounded bg-white/10 text-[#e6c387] font-mono font-medium">
                              {comment.authorRole}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#ded5c4]/80 font-mono">
                          {comment.createdAt}
                        </span>
                      </div>
                      <p className={`text-sm sm:text-base leading-relaxed whitespace-pre-line ${language === 'hi' ? 'font-devanagari text-[#ede6d7] text-[15px] leading-relaxed' : 'text-[#ded5c4] font-serif'}`}>
                        {comment.content}
                      </p>
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => handleCommentUpvote(comment.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                            hasUpvotedComment
                              ? 'text-[#e6c387] font-bold bg-[#e6c387]/10'
                              : 'text-[#ded5c4] hover:text-[#e6c387]'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${hasUpvotedComment ? 'fill-current text-[#e6c387]' : ''}`} />
                          <span>{comment.upvotes}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Post Comment / Reply Form */}
        <form onSubmit={handleAddComment} className="p-4 sm:p-6 bg-[#0b0a08] border-t border-[rgba(230,195,135,0.18)] space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              placeholder={language === 'hi' ? 'आपका नाम *' : 'Your Name *'}
              className="px-4 py-2.5 rounded-xl bg-[#14120e] border border-white/15 text-xs sm:text-sm text-[#fbf8ee] focus:border-[#e6c387] focus:outline-none"
            />
            <input
              type="text"
              value={commentRole}
              onChange={(e) => setCommentRole(e.target.value)}
              placeholder={language === 'hi' ? 'परम्परा / सम्प्रदाय (ऐच्छिक)' : 'Your Lineage / Tradition (Optional)'}
              className="px-4 py-2.5 rounded-xl bg-[#14120e] border border-white/15 text-xs sm:text-sm text-[#fbf8ee] focus:border-[#e6c387] focus:outline-none"
            />
          </div>

          <div className="flex gap-2.5">
            <textarea
              required
              rows={2}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder={language === 'hi' ? 'अपनी दार्शनिक सम्मति अथवा उत्तर लिखें...' : 'Write your scholarly reflection or response...'}
              className="flex-1 p-3.5 rounded-xl bg-[#14120e] border border-white/15 text-xs sm:text-sm text-[#fbf8ee] focus:border-[#e6c387] focus:outline-none font-serif resize-none leading-relaxed"
            />
            <button
              type="submit"
              className="px-5 py-2.5 self-end rounded-xl bg-[#e6c387] hover:bg-[#f5d99b] text-[#0b0a08] font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'hi' ? 'उत्तर भेजें' : 'Reply'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
