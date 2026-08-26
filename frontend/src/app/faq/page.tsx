"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { CTA } from "@/components/layout/cta";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockFaqs } from "@/lib/mock-data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = ["All", "Visa", "Tours", "Bookings", "Payments", "Documents", "Travel", "General"];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFaqs = mockFaqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageShell>
      <PageHero 
        title="Questions? Start Here." 
        subtitle="FAQ" 
      />

      <Section>
        <Container className="max-w-4xl">
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
            <Input 
              type="text" 
              placeholder="Search for answers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-surface border-transparent focus:border-brand-primary rounded-[10px]"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-brand-primary text-white"
                    : "bg-surface text-text-secondary hover:bg-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible={true} className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border py-2">
                  <AccordionTrigger className="text-left font-sora font-semibold text-lg hover:text-brand-accent hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-text-secondary text-base leading-relaxed pt-2 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-text-secondary">No matching questions found.</p>
            </div>
          )}
        </Container>
      </Section>

      <CTA 
        title="Still have questions?" 
        description="Our support team is ready to help you with any inquiries."
        buttonText="Contact Support"
        buttonLink="/contact"
      />
    </PageShell>
  );
}
