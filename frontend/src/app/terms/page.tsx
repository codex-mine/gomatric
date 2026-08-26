import { Metadata } from 'next';
import { PageShell } from '@/components/layout/page-shell';
import { Section } from '@/components/layout/section';
import { PageHero } from '@/components/layout/hero';
import { Container } from '@/components/layout/container';

export const metadata: Metadata = {
  title: 'Terms & Conditions | GoMatric',
  description: 'Terms and conditions for using GoMatric services.',
};

export default function TermsPage() {
  return (
    <PageShell>
      <PageHero
        title="Terms & Conditions"
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
                <a href="#acceptance" className="hover:text-brand-primary transition-colors">Acceptance</a>
                <a href="#services" className="hover:text-brand-primary transition-colors">Services</a>
                <a href="#booking" className="hover:text-brand-primary transition-colors">Booking</a>
                <a href="#payments" className="hover:text-brand-primary transition-colors">Payments</a>
                <a href="#cancellation" className="hover:text-brand-primary transition-colors">Cancellation</a>
                <a href="#visa-services" className="hover:text-brand-primary transition-colors">Visa Services</a>
                <a href="#travel-documents" className="hover:text-brand-primary transition-colors">Travel Documents</a>
                <a href="#user-responsibilities" className="hover:text-brand-primary transition-colors">User Responsibilities</a>
                <a href="#liability" className="hover:text-brand-primary transition-colors">Liability</a>
                <a href="#changes" className="hover:text-brand-primary transition-colors">Changes</a>
                <a href="#contact" className="hover:text-brand-primary transition-colors">Contact</a>
              </nav>
            </div>

            {/* Content */}
            <div className="prose prose-slate max-w-[760px] mx-auto lg:mx-0 prose-headings:font-sora prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-p:text-base md:prose-p:text-[17px] prose-p:leading-relaxed text-text-secondary">
              <p className="text-sm font-medium">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

              <h2 id="acceptance">Acceptance of Terms</h2>
              <p>
                By accessing and using the GoMatric website and services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h2 id="services">Description of Services</h2>
              <p>
                GoMatric provides travel-related services including but not limited to tour packages, visa processing assistance, flight bookings, and hotel reservations.
              </p>

              <h2 id="booking">Booking and Reservations</h2>
              <p>
                All bookings are subject to availability. A booking is only confirmed once full or partial payment (as stipulated in the specific package terms) is received and a confirmation email is sent by GoMatric.
              </p>

              <h2 id="payments">Payments</h2>
              <p>
                Prices are quoted in BDT (Bangladeshi Taka) unless otherwise specified. We accept major credit cards, bank transfers, and mobile financial services. Full payment must be cleared before the commencement of any travel services or visa applications.
              </p>

              <h2 id="cancellation">Cancellation and Refunds</h2>
              <p>
                Cancellation policies vary depending on the service booked. General guidelines include:
              </p>
              <ul>
                <li><strong>Tours:</strong> Cancellations made 30 days prior to departure may receive a full refund minus administrative fees. Cancellations within 14 days may not be eligible for a refund.</li>
                <li><strong>Flights/Hotels:</strong> Subject to the respective airline or hotel&apos;s cancellation policy.</li>
                <li><strong>Visa Fees:</strong> Embassy fees are strictly non-refundable once applied, regardless of the visa outcome. Service fees may be non-refundable once processing has begun.</li>
              </ul>

              <h2 id="visa-services">Visa Services Disclaimer</h2>
              <p>
                GoMatric assists with the preparation and submission of visa applications. We do not guarantee visa approval. The final decision rests entirely with the respective embassy or consulate. False documentation provided by the applicant will result in immediate termination of services without refund.
              </p>

              <h2 id="travel-documents">Travel Documents</h2>
              <p>
                It is the traveler's responsibility to ensure they hold a valid passport (minimum 6 months validity from return date) and the required visas for their destination. GoMatric is not liable for any issues arising from incorrect or invalid travel documents.
              </p>

              <h2 id="user-responsibilities">User Responsibilities</h2>
              <p>
                You agree to use our services for lawful purposes only and provide accurate, current, and complete information during the booking or application process.
              </p>

              <h2 id="liability">Limitation of Liability</h2>
              <p>
                GoMatric acts as an agent for third-party suppliers (airlines, hotels, local operators). We are not liable for any injury, damage, loss, delay, or irregularity that may occur due to default of any supplier or acts of God (force majeure).
              </p>

              <h2 id="changes">Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will become effective immediately upon being posted on the website.
              </p>

              <h2 id="contact">Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at legal@gomatric.com.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
