import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, ExternalLink, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TypingEngine } from '../components/typing/TypingEngine';
import { EXAM_CONFIGS } from '../utils/exams';
import { ExamGuideCard } from '../components/exam/ExamGuideCard';
import { ENGLISH_PASSAGES } from '../data/passages/english';
import { 
  getSoftwareApplicationSchema, 
  getBreadcrumbSchema, 
  getFAQSchema 
} from '../utils/seoSchemas';

const SSC_FAQS = [
  {
    question: 'How many key depressions are required in SSC CHSL and SSC CGL?',
    answer: 'For SSC CHSL (LDC/JSA), the standard is 10,500 Key Depressions Per Hour (KDPH), which equals ~1,750 key depressions in a 10-minute test (~35 WPM). For SSC CGL DEST, the benchmark is 2,000 key depressions in 15 minutes (~27 WPM / 8,000 KDPH).',
  },
  {
    question: 'What is the difference between Full Mistakes and Half Mistakes in SSC typing?',
    answer: 'Full Mistakes (1 point penalty) include omission of words, substitution of words, or addition of unwritten words. Half Mistakes (0.5 point penalty) include spacing errors, punctuation errors, capitalization mistakes, and letter transpositions.',
  },
  {
    question: 'Is backspace allowed during the SSC computer typing test?',
    answer: 'Yes, backspace is permitted during the SSC typing test to correct words in the currently typed line. However, candidates cannot use arrow keys or click to edit text lines that have already been submitted.',
  },
  {
    question: 'What is the maximum error percentage permissible in SSC CHSL?',
    answer: 'The permissible error limit is usually up to 7% for Unreserved (General) category candidates and up to 10% for Reserved category candidates (SC, ST, OBC, EWS, PwD), as notified in the respective SSC tier recruitment notification.',
  },
];

export const SSCExamPage: React.FC = () => {
  const [examSubtype, setExamSubtype] = useState<'ssc-chsl' | 'ssc-cgl'>('ssc-chsl');
  const [passageIndex, setPassageIndex] = useState(0);

  const examConfig = EXAM_CONFIGS[examSubtype];
  const currentPassage = ENGLISH_PASSAGES[passageIndex % ENGLISH_PASSAGES.length];

  const handleNextPassage = () => {
    setPassageIndex((prev) => (prev + 1) % ENGLISH_PASSAGES.length);
  };

  const sscSchemas = [
    getSoftwareApplicationSchema(
      'TypeBharat SSC Typing Test Simulator (CHSL & CGL DEST)',
      'Accurate simulation of SSC CHSL (35 WPM / 10500 KDPH) and SSC CGL DEST typing tests with full and half mistake calculations.',
      'https://typebharat.com/ssc-typing-test/'
    ),
    getBreadcrumbSchema([
      { name: 'Home', url: 'https://typebharat.com/' },
      { name: 'Government Exams', url: 'https://typebharat.com/government-typing-test/' },
      { name: 'SSC Typing Test', url: 'https://typebharat.com/ssc-typing-test/' },
    ]),
    getFAQSchema(SSC_FAQS),
  ];

  return (
    <div className="space-y-10">
      <SEOHead
        title="SSC Typing Test Practice - CHSL Tier II & CGL DEST Skill Test Online"
        description="Practice official SSC CHSL (35 WPM / 10500 KDPH) and SSC CGL DEST (2000 key depressions) typing tests. Realistic 10-minute and 15-minute simulation with full/half mistake evaluation."
        canonical="https://typebharat.com/ssc-typing-test/"
        keywords={[
          'ssc typing test',
          'ssc chsl typing test',
          'ssc cgl dest typing test',
          '10500 kdph typing test',
          'ssc typing test online practice',
          'ssc typing mistake calculation formula',
        ]}
        schemaJson={sscSchemas}
      />

      <Breadcrumbs items={[
        { name: 'Government Exams', path: '/government-typing-test/' },
        { name: 'SSC Typing Practice' }
      ]} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lightTeal text-brand-darkTeal text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>Staff Selection Commission Skill Tests</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-heading tracking-tight">
          SSC Typing Test Preparation (CHSL & CGL)
        </h1>
        <p className="text-base text-ink-body leading-relaxed">
          The SSC Tier II typing test evaluates candidate proficiency for Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operator (DEO) positions.
        </p>
      </div>

      {/* Mode Selector (CHSL 10m vs CGL DEST 15m) */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => {
            setExamSubtype('ssc-chsl');
            setPassageIndex(0);
          }}
          className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
            examSubtype === 'ssc-chsl'
              ? 'bg-brand-teal text-white shadow-sm ring-2 ring-brand-teal/20'
              : 'bg-surface border border-border-subtle text-ink-body hover:bg-soft-gray'
          }`}
        >
          <span>SSC CHSL (10 Min &bull; 35 WPM / 10500 KDPH)</span>
        </button>

        <button
          onClick={() => {
            setExamSubtype('ssc-cgl');
            setPassageIndex(0);
          }}
          className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
            examSubtype === 'ssc-cgl'
              ? 'bg-brand-teal text-white shadow-sm ring-2 ring-brand-teal/20'
              : 'bg-surface border border-border-subtle text-ink-body hover:bg-soft-gray'
          }`}
        >
          <span>SSC CGL DEST (15 Min &bull; 2000 Depressions)</span>
        </button>
      </div>

      {/* Interactive Typing Simulator */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between px-2 text-xs font-semibold text-brand-darkTeal">
          <span>Active Simulation: {examConfig.name}</span>
          <span>Duration: {examConfig.durationMinutes} Minutes &bull; Error Cutoff: Max {examConfig.maxErrorRatePercent}%</span>
        </div>

        <TypingEngine
          key={`ssc-${examSubtype}-${currentPassage.id}`}
          passage={currentPassage}
          defaultDuration={examConfig.durationMinutes * 60}
          mode="exam"
          examConfig={examConfig}
          onNextPassage={handleNextPassage}
        />
      </div>

      {/* Exam Guide Card */}
      <ExamGuideCard config={examConfig} />

      {/* SSC Mistake Calculation Methodology */}
      <div className="p-6 sm:p-8 bg-surface rounded-3xl border border-border-subtle shadow-card space-y-4">
        <h2 className="text-xl font-bold text-ink-heading">Official SSC Full vs Half Mistake Evaluation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-red-50/70 border border-red-100 space-y-2">
            <h3 className="font-bold text-red-950">Full Mistakes (1 Error Penalty)</h3>
            <ul className="list-disc pl-5 space-y-1 text-red-900 leading-relaxed">
              <li>Omission of any word present in the master passage.</li>
              <li>Substitution of a wrong word in place of the correct word.</li>
              <li>Addition or insertion of any word not in the master text.</li>
              <li>Incomplete word left at the end of a line.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-2">
            <h3 className="font-bold text-amber-950">Half Mistakes (0.5 Error Penalty)</h3>
            <ul className="list-disc pl-5 space-y-1 text-amber-900 leading-relaxed">
              <li>Spacing error: leaving no space between words or extra unwanted space.</li>
              <li>Punctuation mistake: omitting or putting incorrect punctuation mark.</li>
              <li>Capitalization error: typing lowercase for capital letter or vice versa.</li>
              <li>Transposition of letters within a word.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SSC Frequently Asked Questions (Matches FAQPage Schema) */}
      <section className="p-6 sm:p-8 bg-surface rounded-3xl border border-border-subtle shadow-card space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-ink-heading">
            Frequently Asked Questions: SSC CHSL &amp; CGL Skill Test
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">
            Verified information regarding key depression standards, error formulas, and time allowances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SSC_FAQS.map((faq, idx) => (
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
