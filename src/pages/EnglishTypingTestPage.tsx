import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Clock, Award, ShieldCheck, Target, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TypingEngine } from '../components/typing/TypingEngine';
import { ENGLISH_PASSAGES } from '../data/passages/english';
import { Difficulty } from '../types/typing';
import { 
  getSoftwareApplicationSchema, 
  getBreadcrumbSchema, 
  getFAQSchema 
} from '../utils/seoSchemas';

const ENGLISH_TEST_FAQS = [
  {
    question: 'How is Words Per Minute (WPM) calculated in this English typing test?',
    answer: 'Speed is calculated using the international standard 5-character word formula: Standard WPM = (Total Correct Characters / 5) / Time in Minutes. Spaces and punctuation marks are counted as valid keystrokes.',
  },
  {
    question: 'Should I practice using a 1-minute test or a 5-minute test?',
    answer: 'Use the 1-minute test for quick finger warm-ups, rhythm calibration, and testing keyboard tactile response. Use the 3-minute, 5-minute, and 10-minute tests for building sustained mental concentration and muscle stamina required for competitive exams.',
  },
  {
    question: 'What is the difference between Gross WPM and Net WPM?',
    answer: 'Gross WPM reflects raw typing speed: (Total Keystrokes / 5) / Minutes. Net WPM deducts an error penalty: Gross WPM - (Uncorrected Errors / Minutes). Recruitment commissions evaluate qualifying marks using Net WPM.',
  },
  {
    question: 'What typing speed is required for SSC CHSL and clerical jobs?',
    answer: 'SSC CHSL requires 35 WPM in English (equivalent to 10,500 key depressions per hour) in a 10-minute test. Most corporate data entry and administrative positions require 40 to 50 WPM with at least 95% accuracy.',
  },
];

export const EnglishTypingTestPage: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('intermediate');
  const [passageIndex, setPassageIndex] = useState(0);

  const filteredPassages = ENGLISH_PASSAGES.filter(
    (p) => p.difficulty === selectedDifficulty
  );
  const currentPassage = filteredPassages[passageIndex % filteredPassages.length] || ENGLISH_PASSAGES[0];

  const handleNextPassage = () => {
    setPassageIndex((prev) => (prev + 1) % filteredPassages.length);
  };

  const englishSchemas = [
    getSoftwareApplicationSchema(
      'TypeBharat English Typing Test',
      'Free online English typing test with live WPM calculation, accuracy tracking, and 1, 3, 5, and 10 minute timed options.',
      'https://typebharat.com/english-typing-test/'
    ),
    getBreadcrumbSchema([
      { name: 'Home', url: 'https://typebharat.com/' },
      { name: 'English Typing Test', url: 'https://typebharat.com/english-typing-test/' },
    ]),
    getFAQSchema(ENGLISH_TEST_FAQS),
  ];

  return (
    <div className="space-y-10">
      <SEOHead
        title="English Typing Test - 1, 3, 5 & 10 Minute WPM Test Online"
        description="Take a free English typing test online. Measure accurate WPM, gross speed, and accuracy percentage with real-time feedback on beginner, intermediate and advanced passages."
        canonical="https://typebharat.com/english-typing-test/"
        keywords={[
          'English typing test',
          'typing speed test 1 minute',
          '5 minute typing test english',
          'online english typing practice',
          'wpm typing speed test',
          'free english typing test with accuracy',
        ]}
        schemaJson={englishSchemas}
      />

      <Breadcrumbs items={[{ name: 'English Typing Test' }]} />

      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lightTeal text-brand-darkTeal text-xs font-bold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5" />
          <span>Timed Speed & Accuracy Evaluation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-heading tracking-tight">
          English Typing Speed Test
        </h1>
        <p className="text-base text-ink-body leading-relaxed">
          Select your desired test duration and difficulty level. Start typing the passage below; the timer activates automatically on your very first keystroke.
        </p>
      </div>

      {/* Interactive Typing Arena */}
      <div className="w-full">
        <TypingEngine
          key={`eng-${selectedDifficulty}-${currentPassage.id}`}
          passage={currentPassage}
          defaultDuration={60}
          mode="timed"
          onNextPassage={handleNextPassage}
        />
      </div>

      {/* Explanatory Educational Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-border-subtle shadow-card space-y-4">
            <h2 className="text-2xl font-bold text-ink-heading">
              How English Typing Speed is Evaluated
            </h2>
            <p className="text-sm text-ink-body leading-relaxed">
              Typing speed measurement is standardized around the world using the <strong>5-character word convention</strong>. Rather than counting whatever arbitrary length words happen to appear in a text, testing algorithms treat every 5 keystrokes (including spaces and punctuation) as one standard word.
            </p>
            
            <div className="p-4 rounded-2xl bg-soft-gray space-y-2 text-xs sm:text-sm">
              <strong className="text-ink-heading font-semibold block">
                Standard WPM Formula:
              </strong>
              <code className="block p-3 rounded-xl bg-white border border-border-subtle font-mono text-brand-darkTeal font-bold">
                Standard WPM = (Total Correct Characters / 5) / (Time in Minutes)
              </code>
              <p className="text-ink-muted">
                For example, typing 250 correct characters in a 1-minute test yields <strong>50 WPM</strong>.
              </p>
            </div>

            <h3 className="text-lg font-bold text-ink-heading pt-2">
              Why Accuracy Must Precede Speed
            </h3>
            <p className="text-sm text-ink-body leading-relaxed">
              When preparing for clerical typing exams or office work, striking keys erratically at 60 WPM with 85% accuracy results in failed qualifying marks due to heavy error penalties. Slowing down to 45 WPM with 98% accuracy ensures effortless qualification.
            </p>
          </section>

          <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-border-subtle shadow-card space-y-4">
            <h2 className="text-xl font-bold text-ink-heading">
              Frequently Recommended Test Durations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-soft-gray/50 space-y-1.5">
                <span className="font-bold text-brand-darkTeal text-sm">1-Minute Quick Test</span>
                <p className="text-xs text-ink-body leading-relaxed">
                  Best for quick warm-ups, testing keyboard sensitivity, and establishing baseline finger speed.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-soft-gray/50 space-y-1.5">
                <span className="font-bold text-brand-darkTeal text-sm">3 & 5-Minute Tests</span>
                <p className="text-xs text-ink-body leading-relaxed">
                  Ideal for building sustained focus without mental fatigue. Recommended for daily practice sessions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-soft-gray/50 space-y-1.5 sm:col-span-2">
                <span className="font-bold text-brand-darkTeal text-sm">10 & 15-Minute Exam Simulations</span>
                <p className="text-xs text-ink-body leading-relaxed">
                  Simulates full-length SSC CHSL, CGL DEST, and High Court exams where muscle stamina and sustained concentration are tested.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-surface border border-border-subtle shadow-card space-y-4">
            <h3 className="font-bold text-ink-heading text-base">Target Speed Benchmarks</h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <span className="text-ink-body">Beginner Typist</span>
                <span className="font-bold text-ink-heading">15 - 25 WPM</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <span className="text-ink-body">Average Office Typist</span>
                <span className="font-bold text-ink-heading">30 - 40 WPM</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <span className="text-ink-body">SSC CHSL Benchmark</span>
                <span className="font-bold text-brand-darkTeal">35 WPM (10,500 KDPH)</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <span className="text-ink-body">Court Typist Standard</span>
                <span className="font-bold text-brand-darkTeal">35 - 45 WPM</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-ink-body">Pro Touch Typist</span>
                <span className="font-bold text-purple-700">65+ WPM</span>
              </li>
            </ul>

            <Link
              to="/government-typing-test/"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-lightTeal text-brand-darkTeal font-bold text-xs hover:bg-brand-teal hover:text-white transition-colors"
            >
              <span>View Govt Exam Criteria</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-surface border border-border-subtle shadow-card space-y-3">
            <h3 className="font-bold text-ink-heading text-base">Next Steps</h3>
            <div className="space-y-2 text-xs">
              <Link
                to="/hindi-typing-test/"
                className="block p-3 rounded-xl bg-soft-gray hover:bg-soft-yellow/50 transition-colors text-ink-heading font-medium"
              >
                Switch to Hindi Typing Test (Unicode) &rarr;
              </Link>
              <Link
                to="/typing-practice/"
                className="block p-3 rounded-xl bg-soft-gray hover:bg-brand-lightTeal/50 transition-colors text-ink-heading font-medium"
              >
                Practice Home Row & Number Drills &rarr;
              </Link>
              <Link
                to="/my-progress/"
                className="block p-3 rounded-xl bg-soft-gray hover:bg-soft-blue/50 transition-colors text-ink-heading font-medium"
              >
                Check Personal Best & Weak Keys &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Section (Matches FAQPage Schema) */}
      <section className="p-6 sm:p-8 bg-surface rounded-3xl border border-border-subtle shadow-card space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-ink-heading">
            Frequently Asked Questions: English Typing Speed &amp; Accuracy
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">
            Common questions regarding words per minute measurement, test durations, and government benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ENGLISH_TEST_FAQS.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-soft-gray/60 space-y-2">
              <h3 className="font-bold text-sm text-ink-heading">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
