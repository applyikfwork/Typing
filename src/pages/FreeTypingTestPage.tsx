import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, CheckCircle2, Award, Clock, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TypingEngine } from '../components/typing/TypingEngine';
import { ENGLISH_PASSAGES } from '../data/passages/english';
import { getSoftwareApplicationSchema, getBreadcrumbSchema } from '../utils/seoSchemas';

export const FreeTypingTestPage: React.FC = () => {
  const [passageIndex, setPassageIndex] = useState(2);
  const currentPassage = ENGLISH_PASSAGES[passageIndex % ENGLISH_PASSAGES.length];

  const handleNextPassage = () => {
    setPassageIndex((prev) => (prev + 1) % ENGLISH_PASSAGES.length);
  };

  const freeSchemas = [
    getSoftwareApplicationSchema(
      'TypeBharat Free Typing Test Online',
      'Free online typing test with instant WPM results, zero registration required, and 100% client-side privacy.',
      'https://typebharat.com/free-typing-test/'
    ),
    getBreadcrumbSchema([
      { name: 'Home', url: 'https://typebharat.com/' },
      { name: 'Free Typing Test', url: 'https://typebharat.com/free-typing-test/' },
    ]),
  ];

  return (
    <div className="space-y-10">
      <SEOHead
        title="Free Typing Test Online - Check Your Typing Speed & Accuracy"
        description="Take a 100% free online typing test without registration. Test WPM, view real-time accuracy, analyze errors, and learn how to improve typing speed quickly."
        canonical="https://typebharat.com/free-typing-test/"
        keywords={[
          'free typing test',
          'free typing test online',
          'check typing speed free',
          'no sign up typing test',
          'online typing speed test free',
          'typing test without login',
        ]}
        schemaJson={freeSchemas}
      />

      <Breadcrumbs items={[{ name: 'Free Typing Test' }]} />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lightTeal text-brand-darkTeal text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% Free &bull; No Login Required &bull; Privacy First</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-heading tracking-tight">
          Free Online Typing Test
        </h1>
        <p className="text-base text-ink-body leading-relaxed">
          Start typing below immediately. No account creation, payment, or ad popups. All results, speed stats, and personal bests remain safely stored on your device.
        </p>
      </div>

      {/* Typing Engine */}
      <div className="w-full">
        <TypingEngine
          key={`free-${currentPassage.id}`}
          passage={currentPassage}
          defaultDuration={60}
          mode="free"
          onNextPassage={handleNextPassage}
        />
      </div>

      {/* Detailed Intent-Focused Educational Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="p-6 sm:p-8 bg-surface rounded-3xl border border-border-subtle shadow-card space-y-4">
          <h2 className="text-2xl font-bold text-ink-heading">How to Start Your Test</h2>
          <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-ink-body leading-relaxed">
            <li>Place your left fingers on <strong>A, S, D, F</strong> and right fingers on <strong>J, K, L, ;</strong>.</li>
            <li>Look only at the screen passage text; do not look down at your hands.</li>
            <li>Type the first character; the 60-second timer begins running automatically.</li>
            <li>Green highlights indicate correct keystrokes; red highlights indicate incorrect letters.</li>
            <li>When the timer expires or the passage finishes, your complete score card appears instantly.</li>
          </ol>
        </div>

        <div className="p-6 sm:p-8 bg-surface rounded-3xl border border-border-subtle shadow-card space-y-4">
          <h2 className="text-2xl font-bold text-ink-heading">How WPM Speed is Calculated</h2>
          <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
            TypeBharat applies the globally verified typing algorithm:
          </p>
          <div className="p-3.5 rounded-2xl bg-soft-gray font-mono text-xs text-brand-darkTeal font-bold">
            WPM = (Total Correct Characters &divide; 5) &divide; (Time in Minutes)
          </div>
          <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
            By standardizing each word as exactly 5 characters, our system delivers an unbiased evaluation regardless of passage complexity.
          </p>
        </div>
      </div>

      {/* Strategy Strip */}
      <section className="p-6 sm:p-8 rounded-3xl bg-soft-blue/40 border border-blue-100 text-blue-950 space-y-4">
        <h2 className="text-xl font-bold">5 Actionable Tips to Increase Your Typing Speed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-white shadow-xs space-y-1">
            <strong className="text-ink-heading font-semibold block">1. Fix Finger Anchors</strong>
            <p className="text-ink-body">Always return each finger back to its home row key immediately after pressing an outer row key.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow-xs space-y-1">
            <strong className="text-ink-heading font-semibold block">2. Look Ahead 2 Words</strong>
            <p className="text-ink-body">Train your eyes to scan two words ahead of what your fingers are currently typing to eliminate pauses.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow-xs space-y-1">
            <strong className="text-ink-heading font-semibold block">3. Consistent Cadence</strong>
            <p className="text-ink-body">Maintain a steady metronomic rhythm rather than typing rapid bursts followed by abrupt hesitations.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
