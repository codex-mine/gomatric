import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeading } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { CTA } from "@/components/layout/cta";

export const metadata = {
  title: "About Us | GoMatric",
  description: "Learn about GoMatric's mission, values, and journey.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero 
        title="We Help People Go Further." 
        subtitle="ABOUT GOMATRIC" 
      />

      <Section className="bg-surface">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-sora text-4xl md:text-5xl font-bold text-brand-primary mb-6">
                Empowering travelers with transparent, reliable, and personalized travel solutions.
              </h2>
            </div>
            <div>
              <p className="text-lg text-text-secondary mb-6">
                At GoMatric, we believe travel should be about the destination, not the paperwork. Our mission is to simplify the complex processes of visas, ticketing, and tour planning so you can focus on the journey ahead.
              </p>
              <p className="text-lg text-text-secondary">
                With a blend of expert human support and innovative digital tools, we guide you every step of the way—making international travel more accessible for everyone.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title="Our Core Values" subtitle="WHAT DRIVES US" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Trust", desc: "We act with integrity and honesty in everything we do." },
              { title: "Excellence", desc: "We strive to exceed expectations with premium service." },
              { title: "Transparency", desc: "No hidden fees, no surprises. Just clear communication." },
              { title: "Innovation", desc: "We use technology to make travel planning seamless." },
              { title: "Customer First", desc: "Your journey is our priority. We're here to help 24/7." },
              { title: "Global Reach", desc: "Connecting you to destinations all around the world." },
            ].map((value, i) => (
              <div key={i} className="p-8 border border-border rounded-md bg-white">
                <h3 className="font-sora text-xl font-bold text-brand-primary mb-3">{value.title}</h3>
                <p className="text-text-secondary">{value.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-brand-primary text-white">
        <Container>
          <SectionHeading title="Our Journey" subtitle="TIMELINE" className="text-white" />
          <div className="mt-16 space-y-12">
            {[
              { year: "2020", event: "Founded", desc: "Started with a small team and a big vision in Dhaka." },
              { year: "2021", event: "First 100 Customers", desc: "Reached our first milestone of happy travelers." },
              { year: "2022", event: "Expanded Services", desc: "Added tour packages and travel insurance to our offerings." },
              { year: "2024", event: "1000+ Happy Travelers", desc: "A growing community of explorers trusting GoMatric." },
              { year: "2026", event: "Digital Platform Launch", desc: "Bringing our services online for a seamless experience." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center relative">
                <div className="md:w-1/4 text-brand-accent font-sora text-3xl font-bold">{item.year}</div>
                <div className="md:w-3/4">
                  <h4 className="font-sora text-2xl font-bold mb-2">{item.event}</h4>
                  <p className="text-white/80 text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "1000+", label: "Happy Travelers" },
              { stat: "50+", label: "Destinations" },
              { stat: "98%", label: "Visa Success Rate" },
              { stat: "24/7", label: "Support" },
            ].map((item, i) => (
              <div key={i} className="p-6">
                <div className="font-sora text-4xl md:text-5xl font-bold text-brand-primary mb-2">{item.stat}</div>
                <div className="text-text-secondary font-medium uppercase tracking-wider text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTA 
        title="Ready to start your journey?" 
        description="Get in touch with our travel experts today."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </PageShell>
  );
}
