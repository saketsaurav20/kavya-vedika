import type { ForumThread, ForumComment } from '../types/forum';
import { SEED_FORUM_THREADS } from '../data/seedForumData';

const FORUM_STORAGE_KEY = 'kavya_vedika_forum_threads_v1';
const UPVOTED_ITEMS_KEY = 'kavya_vedika_upvoted_ids_v1';
const BOOKMARKS_KEY = 'kavya_vedika_bookmarked_shlokas_v1';

export function getStoredForumThreads(): ForumThread[] {
  try {
    const raw = localStorage.getItem(FORUM_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(SEED_FORUM_THREADS));
      return SEED_FORUM_THREADS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_FORUM_THREADS;
  } catch (e) {
    console.error('Failed to load forum threads from localStorage', e);
    return SEED_FORUM_THREADS;
  }
}

export function saveForumThreads(threads: ForumThread[]): void {
  try {
    localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(threads));
  } catch (e) {
    console.error('Failed to save forum threads to localStorage', e);
  }
}

export function addForumThread(newThread: Omit<ForumThread, 'id' | 'createdAt' | 'upvotes' | 'comments'>): ForumThread {
  const threads = getStoredForumThreads();
  const created: ForumThread = {
    ...newThread,
    id: `thread-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: 'Just now',
    upvotes: 1,
    comments: [],
  };
  const updated = [created, ...threads];
  saveForumThreads(updated);
  return created;
}

export function addCommentToThread(threadId: string, comment: Omit<ForumComment, 'id' | 'createdAt' | 'upvotes'>): ForumComment | null {
  const threads = getStoredForumThreads();
  const threadIndex = threads.findIndex(t => t.id === threadId);
  if (threadIndex === -1) return null;

  const newComment: ForumComment = {
    ...comment,
    id: `comment-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: 'Just now',
    upvotes: 0
  };

  threads[threadIndex].comments.push(newComment);
  saveForumThreads(threads);
  return newComment;
}

export function getUpvotedIds(): string[] {
  try {
    const raw = localStorage.getItem(UPVOTED_ITEMS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function toggleUpvote(id: string, isThread: boolean, parentThreadId?: string): { success: boolean; newCount: number } {
  const upvoted = getUpvotedIds();
  const hasUpvoted = upvoted.includes(id);
  const threads = getStoredForumThreads();

  let targetItem: { upvotes: number } | undefined;

  if (isThread) {
    targetItem = threads.find(t => t.id === id);
  } else if (parentThreadId) {
    const thread = threads.find(t => t.id === parentThreadId);
    targetItem = thread?.comments.find(c => c.id === id);
  }

  if (!targetItem) return { success: false, newCount: 0 };

  if (hasUpvoted) {
    targetItem.upvotes = Math.max(0, targetItem.upvotes - 1);
    const updatedUpvoted = upvoted.filter(item => item !== id);
    localStorage.setItem(UPVOTED_ITEMS_KEY, JSON.stringify(updatedUpvoted));
  } else {
    targetItem.upvotes += 1;
    const updatedUpvoted = [...upvoted, id];
    localStorage.setItem(UPVOTED_ITEMS_KEY, JSON.stringify(updatedUpvoted));
  }

  saveForumThreads(threads);
  return { success: true, newCount: targetItem.upvotes };
}

export function getBookmarkedShlokaIds(): string[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function toggleBookmarkShloka(shlokaId: string): boolean {
  try {
    const bookmarks = getBookmarkedShlokaIds();
    let updated: string[];
    let isBookmarked: boolean;
    if (bookmarks.includes(shlokaId)) {
      updated = bookmarks.filter(id => id !== shlokaId);
      isBookmarked = false;
    } else {
      updated = [...bookmarks, shlokaId];
      isBookmarked = true;
    }
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    return isBookmarked;
  } catch (e) {
    return false;
  }
}
