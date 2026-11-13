export type ForumCategory =
  | 'all'
  | 'vedic-exegesis'
  | 'upanishadic-advaita'
  | 'classical-rasa'
  | 'bhakti-mysticism'
  | 'modern-reflections'
  | 'meter-chanting';

export interface ForumComment {
  id: string;
  author: string;
  authorRole?: string;
  createdAt: string;
  content: string;
  upvotes: number;
}

export interface ForumThread {
  id: string;
  category: ForumCategory;
  title: string;
  author: string;
  authorAvatar?: string;
  createdAt: string;
  content: string;
  tags: string[];
  citation?: {
    shlokaId?: string;
    text: string;
    source: string;
  };
  upvotes: number;
  comments: ForumComment[];
  isPinned?: boolean;
}
