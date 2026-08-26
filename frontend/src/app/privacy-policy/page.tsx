import { Metadata } from 'next';
import { PageShell } from '@/components/layout/page-shell';
import { Section } from '@/components/layout/section';
import { PageHero } from '@/components/layout/hero';
import { Container } from '@/components/layout/container';

export const metadata: Metadata = {
  title: 'Privacy Policy | GoMatric',
  description: 'Our privacy policy and data practices.',
};

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <PageHero
        title="Privacy Policy"
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
                <a href="#introduction" className="hover:text-brand-primary transition-colors">Introduction</a>
                <a href="#information-we-collect" className="hover:text-brand-primary transition-colors">Information We Collect</a>
                <a href="#how-we-use-information" className="hover:text-brand-primary transition-colors">How We Use Information</a>
                <a href="#cookies" className="hover:text-brand-primary transition-colors">Cookies</a>
                <a href="#data-sharing" className="hover:text-brand-primary transition-colors">Data Sharing</a>
                <a href="#data-security" className="hover:text-brand-primary transition-colors">Data Security</a>
                <a href="#data-retention" className="hover:text-brand-primary transition-colors">Data Retention</a>
                <a href="#your-rights" className="hover:text-brand-primary transition-colors">Your Rights</a>
                <a href="#third-party-services" className="hover:text-brand-primary transition-colors">Third-Party Services</a>
                <a href="#contact-us" className="hover:text-brand-primary transition-colors">Contact Us</a>
              </nav>
            </div>

            {/* Content */}
            <div className="prose prose-slate max-w-[760px] mx-auto lg:mx-0 prose-headings:font-sora prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-p:text-base md:prose-p:text-[17px] prose-p:leading-relaxed text-text-secondary">
              <p className="text-sm font-medium">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

              <h2 id="introduction">Introduction</h2>
              <p>
                Welcome to GoMatric. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>

              <h2 id="information-we-collect">Information We Collect</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul>
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier, marital status, title, date of birth and gender.</li>
                <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><strong>Financial Data</strong> includes bank account and payment card details (processed securely via our payment gateways).</li>
                <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              </ul>

              <h2 id="how-we-use-information">How We Use Information</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul>
                <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., booking a tour or processing a visa).</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>

              <h2 id="cookies">Cookies</h2>
              <p>
                You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly. For more information about the cookies we use, please see our <a href="/cookie-policy" className="text-brand-primary underline">Cookie Policy</a>.
              </p>

              <h2 id="data-sharing">Data Sharing</h2>
              <p>
                We may have to share your personal data with the parties set out below for the purposes set out in the table above.
              </p>
              <ul>
                <li>Internal Third Parties: Other companies in the GoMatric Group acting as joint controllers or processors.</li>
                <li>External Third Parties: Service providers acting as processors who provide IT and system administration services, airlines, hotels, embassies (for visa processing).</li>
                <li>Professional advisers acting as processors or joint controllers including lawyers, bankers, auditors and insurers.</li>
              </ul>

              <h2 id="data-security">Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>

              <h2 id="data-retention">Data Retention</h2>
              <p>
                We will only retain your personal data for as long as reasonably necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.
              </p>

              <h2 id="your-rights">Your Rights</h2>
              <p>
                Under certain circumstances, you have rights under data protection laws in relation to your personal data. You have the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
              </p>

              <h2 id="third-party-services">Third-Party Services</h2>
              <p>
                This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
              </p>

              <h2 id="contact-us">Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@gomatric.com.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
