import type { Image } from "./common";

export interface Article {
  id: string;
  title: string;
  slug?: string;
  excerpt: string;
  content?: string;
  coverImage?: Image;
  image?: Image;
  author: ArticleAuthor;
  category: string;
  tags?: string[];
  publishedDate?: string;
  date?: string;
  readingTime?: number;
  readTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
}

export interface ArticleAuthor {
  name: string;
  avatar?: Image;
  bio?: string;
}

export type ArticleCategory =
  | "destinations"
  | "visa"
  | "travel-tips"
  | "guides"
  | "inspiration";
