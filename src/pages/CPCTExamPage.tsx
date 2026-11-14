import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, ExternalLink, Languages, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TypingEngine } from '../components/typing/TypingEngine';
import { EXAM_CONFIGS } from '../utils/exams';
import { ExamGuideCard } from '../components/exam/ExamGuideCard';
import { ENGLISH_PASSAGES } from '../data/passages/english';
import { HINDI_PASSAGES } from '../data/passages/hindi';
import { 
  getSoftwareApplicationSchema, 
  getBreadcrumbSchema, 
  getFAQSchema 
} from '../utils/seoSchemas';

const CPCT_FAQS = [
  {
    question: 'Is backspace allowed in the actual MP CPCT typing examination?',
    answer: 'Yes, backspace is permitted to correct errors in the currently typed active word before you press spacebar to move forward.',
  },
  {
    question: 'Can candidates attempt both English and Hindi typing in CPCT?',
    answer: 'Yes, the MP CPCT examination includes both English typing (15 minutes) and Hindi typing (15 minutes) following the computer theory section. You can clear either one or both based on your job requirement.',
  },
  {
    question: 'What is the validity period of the MP CPCT scorecard?',
    answer: 'As per the Madhya Pradesh state government notification, the CPCT scorecard is valid for 7 years from the date of the examination.',
  },
  {
    question: 'What are the qualifying marks for CPCT typing?',
    answer: 'The minimum qualifying cutoff is 30 Net WPM for English typing (awards 50% score) and 20 Net WPM for Hindi typing (awards 50% score). Higher speeds unlock higher score slabs up to 90% at 71+ WPM English and 41+ WPM Hindi.',
  },
];

export const CPCTExamPage: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'english' | 'hindi'>('english');
  const [passageIndex, setPassageIndex] = useState(0);

  const examConfig = activeLang === 'english' ? EXAM_CONFIGS['cpct-english'] : EXAM_CONFIGS['cpct-hindi'];
  const passages = activeLang === 'english' ? ENGLISH_PASSAGES : HINDI_PASSAGES;
  const currentPassage = passages[passageIndex % passages.length];

  const handleNextPassage = () => {
    setPassageIndex((prev) => (prev + 1) % passages.length);
  };

  const cpctSchemas = [
    getSoftwareApplicationSchema(
      'TypeBharat MP CPCT Typing Test Simulator',
      'Realistic 15-minute MP CPCT typing test simulator for English (30 WPM) and Hindi (20 WPM) with official percentile scorecard slabs.',
      'https://typebharat.com/cpct-typing-test/'
    ),
    getBreadcrumbSchema([
      { name: 'Home', url: 'https://typebharat.com/' },
      { name: 'Government Exams', url: 'https://typebharat.com/government-typing-test/' },
      { name: 'MP CPCT Typing Test', url: 'https://typebharat.com/cpct-typing-test/' },
    ]),
    getFAQSchema(CPCT_FAQS),
  ];

  return (
    <div className="space-y-10">
      <SEOHead
        title="MP CPCT Typing Test Online - English & Hindi Inscript Practice"
        description="Comprehensive preparation portal for Madhya Pradesh CPCT exam. Practice 15-minute English (30 WPM) and Hindi (20 WPM) typing tests with official percentile score calculation."
        canonical="https://typebharat.com/cpct-typing-test/"
        keywords={[
          'cpct typing test',
          'cpct hindi typing test',
          'cpct english typing test',
          'mp cpct typing speed test',
          'cpct remington gail typing',
          'cpct inscript practice',
          'map it cpct qualifying speed',
        ]}
        schemaJson={cpctSchemas}
      />

      <Breadcrumbs items={[
        { name: 'Government Exams', path: '/government-typing-test/' },
        { name: 'MP CPCT Typing Practice' }
      ]} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-yellow text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>MAP_IT Madhya Pradesh Skill Certification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-heading tracking-tight">
          MP CPCT Typing Test Preparation
        </h1>
        <p className="text-base text-ink-body leading-relaxed">
          The Computer Proficiency Certification Test (CPCT) is mandatory for data entry operator, steno, and clerical positions across Madhya Pradesh government departments.
        </p>
      </div>

      {/* Language Switch for CPCT (English 15m vs Hindi 15m) */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => {
            setActiveLang('english');
            setPassageIndex(0);
          }}
          className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeLang === 'english'
              ? 'bg-brand-teal text-white shadow-sm ring-2 ring-brand-teal/20'
              : 'bg-surface border border-border-subtle text-ink-body hover:bg-soft-gray'
          }`}
        >
          <span>CPCT English Typing (Target: 30 WPM)</span>
        </button>

        <button
          onClick={() => {
            setActiveLang('hindi');
            setPassageIndex(0);
          }}
          className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 font-hindi ${
            activeLang === 'hindi'
              ? 'bg-brand-teal text-white shadow-sm ring-2 ring-brand-teal/20'
              : 'bg-surface border border-border-subtle text-ink-body hover:bg-soft-gray'
          }`}
        >
          <span>CPCT हिंदी टाइपिंग (लक्ष्य: 20 WPM)</span>
        </button>
      </div>

      {/* Interactive Typing Simulator */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between px-2 text-xs font-semibold text-brand-darkTeal">
          <span>Active CPCT Mode: {activeLang.toUpperCase()} &bull; Official Standard: 15 Minutes</span>
          <span>Qualifying Floor: {examConfig.targetSpeedWpm} Net WPM</span>
        </div>

        <TypingEngine
          key={`cpct-${activeLang}-${currentPassage.id}`}
          passage={currentPassage}
          defaultDuration={900} // 15 minutes
          mode="exam"
          examConfig={examConfig}
          onNextPassage={handleNextPassage}
        />
      </div>

      {/* Official Guide Card */}
      <ExamGuideCard config={examConfig} />

      {/* CPCT Scorecard Percentile Matrix */}
      <div className="p-6 sm:p-8 bg-surface rounded-3xl border border-border-subtle shadow-card space-y-4">
        <h2 className="text-xl font-bold text-ink-heading">Official CPCT Typing Scorecard Slabs</h2>
        <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
          The CPCT certificate awards score percentiles according to the candidate's net words per minute speed:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* English Slabs */}
          <div className="p-4 rounded-2xl bg-soft-blue/40 border border-blue-100 space-y-2 text-xs sm:text-sm">
            <h3 className="font-bold text-blue-950">English Typing Slabs (Min Qualifying: 30 WPM)</h3>
            <ul className="space-y-1.5 text-blue-900">
              <li className="flex justify-between py-1 border-b border-blue-200/60">
                <span>30 - 40 NWPM</span>
                <span className="font-bold">50.0% Score</span>
              </li>
              <li className="flex justify-between py-1 border-b border-blue-200/60">
                <span>41 - 50 NWPM</span>
                <span className="font-bold">60.0% Score</span>
              </li>
              <li className="flex justify-between py-1 border-b border-blue-200/60">
                <span>51 - 60 NWPM</span>
                <span className="font-bold">70.0% Score</span>
              </li>
              <li className="flex justify-between py-1 border-b border-blue-200/60">
                <span>61 - 70 NWPM</span>
                <span className="font-bold">80.0% Score</span>
              </li>
              <li className="flex justify-between py-1">
                <span>71+ NWPM</span>
                <span className="font-bold text-brand-darkTeal">90.0% Score</span>
              </li>
            </ul>
          </div>

          {/* Hindi Slabs */}
          <div className="p-4 rounded-2xl bg-soft-yellow/40 border border-amber-100 space-y-2 text-xs sm:text-sm">
            <h3 className="font-bold text-amber-950">Hindi Typing Slabs (Min Qualifying: 20 WPM)</h3>
            <ul className="space-y-1.5 text-amber-900">
              <li className="flex justify-between py-1 border-b border-amber-200/60">
                <span>20 - 25 NWPM</span>
                <span className="font-bold">50.0% Score</span>
              </li>
              <li className="flex justify-between py-1 border-b border-amber-200/60">
                <span>26 - 30 NWPM</span>
                <span className="font-bold">60.0% Score</span>
              </li>
              <li className="flex justify-between py-1 border-b border-amber-200/60">
                <span>31 - 35 NWPM</span>
                <span className="font-bold">70.0% Score</span>
              </li>
              <li className="flex justify-between py-1 border-b border-amber-200/60">
                <span>36 - 40 NWPM</span>
                <span className="font-bold">80.0% Score</span>
              </li>
              <li className="flex justify-between py-1">
                <span>41+ NWPM</span>
                <span className="font-bold text-brand-darkTeal">90.0% Score</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* MP CPCT Frequently Asked Questions (Matches FAQPage Schema) */}
      <section className="p-6 sm:p-8 bg-surface rounded-3xl border border-border-subtle shadow-card space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-ink-heading">
            Frequently Asked Questions: MP CPCT Typing Examination
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">
            Official guidelines, scoring percentiles, and preparation tips for MP IT certification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CPCT_FAQS.map((faq, idx) => (
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
