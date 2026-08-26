import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PageShell } from '@/components/layout/page-shell';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { mockArticles } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Calendar, ArrowLeft } from 'lucide-react';
import { CTASection as CTA } from '@/components/layout/cta';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const article = mockArticles.find((a) => (a.slug || a.id) === resolvedParams.slug);
  if (!article) return { title: 'Article Not Found' };
  return { title: `${article.title} | GoMatric Guide` };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const article = mockArticles.find((a) => (a.slug || a.id) === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = mockArticles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 2);

  const displayDate = article.publishedDate || article.date || '2026-01-01';

  return (
    <PageShell>
      <Section className="pt-32 pb-12">
        <Container size="narrow">
          <Link href="/travel-guide" className="inline-flex items-center text-text-secondary hover:text-brand-primary transition-colors mb-10 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Guide
          </Link>
          
          <Badge className="bg-brand-accent/10 text-brand-accent border-none mb-6 text-sm px-4 py-1.5 uppercase tracking-wider font-sora">
            {article.category}
          </Badge>
          
          <h1 className="font-sora text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-text-secondary gap-6 mb-12 pb-8 border-b border-border">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2 text-brand-primary" />
              <span className="font-medium">{article.author?.name || 'GoMatric Desk'}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-brand-primary" />
              <span>{new Date(displayDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-brand-primary" />
              <span>{article.readTime || article.readingTime || '5 min read'}</span>
            </div>
          </div>
        </Container>
      </Section>

      <Container size="default" className="mb-16">
        <div className="relative aspect-[21/9] w-full rounded-[24px] overflow-hidden bg-brand-primary/10">
          <Image
            src={article.image?.src || article.coverImage?.src || '/images/placeholder.jpg'}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </Container>

      <Section className="py-0">
        <Container size="narrow">
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-sora prose-headings:font-bold prose-a:text-brand-primary hover:prose-a:text-brand-accent prose-img:rounded-[14px]">
            <p className="lead text-xl text-text-secondary mb-8">
              {article.excerpt}
            </p>
            <p>
              Travel is more than just arriving at a destination; it is the entire transformative journey from the moment you plan until the day you return. At GoMatric, we simplify complex visa guidelines and design bespoke experiences so you can immerse yourself in every encounter with complete peace of mind.
            </p>
            <h2>Planning Your Journey</h2>
            <p>
              Before embarking on your adventure, ensure your travel documents are verified and within validity dates. Booking in advance and preparing for local customs will ensure an enriching, hassle-free international experience.
            </p>
            <ul>
              <li>Confirm your passport has at least 6 months validity</li>
              <li>Check visa processing timelines and required financial proofs</li>
              <li>Plan local transport and reserve landmark entries early</li>
              <li>Pack appropriately for the season and cultural guidelines</li>
            </ul>
            <blockquote className="border-l-4 border-brand-accent pl-4 my-8 italic text-text-primary">
              &ldquo;Travel makes one modest. You see what a tiny place you occupy in the world.&rdquo;
              <footer className="text-sm text-text-muted mt-2">— Gustave Flaubert</footer>
            </blockquote>
            <h3>Essential Tips</h3>
            <p>
              Always keep digital copies of your passport, tickets, and insurance accessible. Consult GoMatric&apos;s travel desk for real-time updates and localized support.
            </p>
          </div>
        </Container>
      </Section>

      {relatedArticles.length > 0 && (
        <Section className="bg-surface mt-20">
          <Container size="narrow">
            <h3 className="font-sora text-3xl font-bold mb-10 text-center">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedArticles.map((rel) => (
                <Link key={rel.id} href={`/travel-guide/${rel.slug || rel.id}`} className="group block bg-white p-4 rounded-[16px] shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative aspect-video rounded-[10px] overflow-hidden mb-4 bg-brand-primary/10">
                    <Image src={rel.image?.src || rel.coverImage?.src || '/images/placeholder.jpg'} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <Badge className="bg-brand-primary/5 text-brand-primary border-none mb-3 shadow-none">{rel.category}</Badge>
                  <h4 className="font-sora text-xl font-bold mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">{rel.title}</h4>
                  <p className="text-sm text-text-secondary line-clamp-2">{rel.excerpt}</p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTA
        title="Ready to start your own adventure?"
        description="Connect with our specialists to plan your next customized vacation."
        primaryAction={{ label: "Explore Destinations", href: "/destinations" }}
      />
    </PageShell>
  );
}
