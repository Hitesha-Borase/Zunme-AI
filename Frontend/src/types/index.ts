export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  isStreaming?: boolean;
}

export interface SearchSource {
  id: string;
  title: string;
  url: string;
  snippet: string;
  domain: string;
  publishedDate?: string;
}

export interface SearchResult {
  query: string;
  summary: string;
  sources: SearchSource[];
  timestamp: string;
}

export type ContentCategory = 'TEXT' | 'MARKETING';

export type ContentFormat =
  | 'BLOG_OUTLINE'
  | 'EMAIL_NEWSLETTER'
  | 'SOCIAL_CAPTION'
  | 'PRODUCT_AD'
  | 'VIDEO_SCRIPT'
  | 'ARTICLE_SECTION';

export type ContentTone = 'Professional' | 'Conversational' | 'Persuasive' | 'Bold & Direct' | 'Creative';

export type ContentLength = 'Short (~150 words)' | 'Medium (~500 words)' | 'Detailed (~1,000 words)';

export interface GeneratedContent {
  id: string;
  title: string;
  category: ContentCategory;
  format: ContentFormat;
  tone: ContentTone;
  length: ContentLength;
  content: string;
  wordCount: number;
  createdAt: string;
}

export type LibraryCategory = 'ALL' | 'TEXT' | 'MARKETING' | 'RESEARCH';

export interface SavedLibraryItem {
  id: string;
  title: string;
  contentType: 'TEXT' | 'MARKETING' | 'RESEARCH';
  content: string;
  previewText: string;
  sourceMetadata?: SearchSource[];
  tags?: string[];
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  text: string;
}

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: 'ACTIVE' | 'SUSPENDED';
  joinedDate: string;
  conversationsCount: number;
  savedItemsCount: number;
}
