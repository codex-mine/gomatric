import { Metadata } from 'next';
import { PageShell } from '@/components/layout/page-shell';
import { Section } from '@/components/layout/section';
import { PageHero } from '@/components/layout/hero';
import { Container } from '@/components/layout/container';

export const metadata: Metadata = {
  title: 'Cookie Policy | GoMatric',
  description: 'How we use cookies to improve your experience.',
};

export default function CookiePolicyPage() {
  return (
    <PageShell>
      <PageHero
        title="Cookie Policy"
        subtitle="LEGAL"
        className="py-20 md:py-28" // compact hero
      />
      <Section className="py-12 md:py-20">
        <Container>
          <div className="grid lg:grid-cols-[250px_1fr] gap-12 items-start">
            {/* Sticky TOC on desktop */}
            <div className="hidden lg:block sticky top-24">
              <h3 className="font-sora font-semibold mb-4 text-text-primary">Contents</h3>
              <nav className="flex flex-col space-y-3 text-sm font-medium text-text-secondary">
                <a href="#what-are-cookies" className="hover:text-brand-primary transition-colors">What Cookies Are</a>
                <a href="#types-of-cookies" className="hover:text-brand-primary transition-colors">Types of Cookies</a>
                <a href="#essential" className="hover:text-brand-primary transition-colors">Essential Cookies</a>
                <a href="#analytics" className="hover:text-brand-primary transition-colors">Analytics Cookies</a>
                <a href="#preferences" className="hover:text-brand-primary transition-colors">Preference Cookies</a>
                <a href="#managing-cookies" className="hover:text-brand-primary transition-colors">Managing Cookies</a>
                <a href="#contact" className="hover:text-brand-primary transition-colors">Contact</a>
              </nav>
            </div>

            {/* Content */}
            <div className="prose prose-slate max-w-[760px] mx-auto lg:mx-0 prose-headings:font-sora prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-p:text-base md:prose-p:text-[17px] prose-p:leading-relaxed text-text-secondary">
              <p className="text-sm font-medium">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

              <h2 id="what-are-cookies">What Are Cookies</h2>
              <p>
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
              </p>

              <h2 id="types-of-cookies">Types of Cookies We Use</h2>
              <p>
                We use different types of cookies to run the GoMatric website and provide our services. Some are set by us (first-party cookies) and some are set by third parties (third-party cookies).
              </p>

              <h2 id="essential">Essential Cookies</h2>
              <p>
                These cookies are strictly necessary to provide you with services available through our website and to use some of its features. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our site functions.
              </p>

              <h2 id="analytics">Analytics Cookies</h2>
              <p>
                These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website and application for you in order to enhance your experience.
              </p>

              <h2 id="preferences">Preference Cookies</h2>
              <p>
                These cookies allow our website to remember choices you make (such as your language preference or the region you are in) and provide enhanced, more personal features.
              </p>

              <h2 id="managing-cookies">Managing Cookies</h2>
              <p>
                You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
              </p>
              <p>
                As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser&apos;s help menu for more information.
              </p>

              <h2 id="contact">Contact Information</h2>
              <p>
                If you have any questions about our use of cookies or other technologies, please email us at privacy@gomatric.com.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
