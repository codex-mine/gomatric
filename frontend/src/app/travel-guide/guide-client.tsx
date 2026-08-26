'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockArticles } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User } from 'lucide-react';

export function GuideClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Visa Guide', 'Travel Guide', 'Religious Tours', 'Tips & Tricks', 'Experiences'];

  const filteredArticles = activeCategory === 'All' 
    ? mockArticles 
    : mockArticles.filter(a => a.category === activeCategory || a.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const featured = filteredArticles[0];
  const rest = filteredArticles.slice(1);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-16 pb-6 border-b border-border">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant="ghost"
            onClick={() => setActiveCategory(cat)}
            className={`text-base md:text-lg font-sora px-6 h-12 rounded-full ${
              activeCategory === cat 
                ? 'bg-brand-primary text-white hover:bg-brand-primary hover:text-white' 
                : 'text-text-secondary hover:text-brand-primary hover:bg-brand-primary/5'
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      {featured && (
        <Link href={`/travel-guide/${featured.slug || featured.id}`} className="block mb-20 group">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[4/3] lg:aspect-square rounded-[20px] overflow-hidden bg-brand-primary/10">
              <Image
                src={featured.image?.src || featured.coverImage?.src || '/images/placeholder.jpg'}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="lg:pl-8">
              <Badge className="bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20 border-none mb-6 text-sm px-4 py-1">
                {featured.category}
              </Badge>
              <h2 className="font-sora text-4xl lg:text-5xl font-bold mb-6 leading-tight group-hover:text-brand-primary transition-colors">
                {featured.title}
              </h2>
              <p className="text-xl text-text-secondary mb-8 line-clamp-3">
                {featured.excerpt}
              </p>
              <div className="flex items-center text-sm text-text-muted space-x-6">
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-2" /> {featured.author?.name || 'GoMatric Desk'}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" /> {featured.readTime || featured.readingTime || '5 min read'}
                </span>
                <span>{new Date(featured.publishedDate || featured.date || '2026-01-01').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </Link>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {rest.map((article) => (
          <Link key={article.id} href={`/travel-guide/${article.slug || article.id}`} className="group block">
            <div className="relative aspect-[3/2] rounded-[16px] overflow-hidden mb-6 bg-brand-primary/10">
              <Image
                src={article.image?.src || article.coverImage?.src || '/images/placeholder.jpg'}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <Badge className="absolute top-4 left-4 bg-white/90 text-brand-primary border-none shadow-sm backdrop-blur-sm">
                {article.category}
              </Badge>
            </div>
            <h3 className="font-sora text-2xl font-bold mb-3 group-hover:text-brand-primary transition-colors leading-snug line-clamp-2">
              {article.title}
            </h3>
            <p className="text-text-secondary mb-4 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between text-sm text-text-muted">
              <span>{article.author?.name || 'GoMatric Desk'}</span>
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {article.readTime || article.readingTime || '5 min read'}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
