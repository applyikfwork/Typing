import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FREQUENTLY_ASKED_QUESTIONS, FAQItem } from '../data/faqs';
import { getBreadcrumbSchema, getFAQSchema } from '../utils/seoSchemas';

export const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'scoring', name: 'WPM & Scoring' },
    { id: 'exam', name: 'Government Exams' },
    { id: 'hindi', name: 'Hindi Unicode' },
    { id: 'general', name: 'Platform & Privacy' },
  ];

  const filteredFaqs = FREQUENTLY_ASKED_QUESTIONS.filter((faq) => {
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const faqSchemas = [
    getBreadcrumbSchema([
      { name: 'Home', url: 'https://typebharat.com/' },
      { name: 'Frequently Asked Questions', url: 'https://typebharat.com/faq/' },
    ]),
    getFAQSchema(FREQUENTLY_ASKED_QUESTIONS),
  ];

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <SEOHead
        title="Frequently Asked Questions (FAQ) - Typing Speed, Exams & Hindi Unicode"
        description="Comprehensive answers about WPM calculation, Gross vs Net typing speed, SSC CHSL & MP CPCT requirements, and Hindi Inscript typing."
        canonical="https://typebharat.com/faq/"
        keywords={[
          'typing faq',
          'how is wpm calculated',
          'cpct typing marks',
          'ssc chsl typing rules',
          'hindi typing questions',
          'wpm vs gross wpm',
        ]}
        schemaJson={faqSchemas}
      />

      <Breadcrumbs items={[{ name: 'Frequently Asked Questions' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lightTeal text-brand-darkTeal text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base & Clarifications</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-heading tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-ink-body leading-relaxed">
          Detailed explanations of typing measurement mathematics, examination rules, Hindi keyboard configurations, and candidate best practices.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search questions (e.g., 'CPCT', 'Gross WPM', 'Inscript')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-border-subtle bg-surface focus:outline-none focus:ring-2 focus:ring-brand-teal text-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                activeCategory === cat.id
                  ? 'bg-brand-teal text-white border-brand-teal shadow-xs'
                  : 'bg-surface text-ink-body border-border-subtle hover:bg-soft-gray'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center text-ink-muted text-sm bg-surface rounded-3xl border border-border-subtle">
            No questions matching your search query. Try another keyword.
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={index}
                className="bg-surface rounded-2xl border border-border-subtle shadow-card overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-ink-heading text-sm sm:text-base hover:text-brand-teal transition-colors"
                >
                  <span>{faq.question}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-brand-teal flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-ink-muted flex-shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-ink-body leading-relaxed border-t border-border-subtle pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
