import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Keyboard, 
  Zap, 
  Target, 
  Award, 
  BookOpen, 
  Languages, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { TypingEngine } from '../components/typing/TypingEngine';
import { ENGLISH_PASSAGES } from '../data/passages/english';
import { HINDI_PASSAGES } from '../data/passages/hindi';
import { EXAM_CONFIGS } from '../utils/exams';
import { FREQUENTLY_ASKED_QUESTIONS } from '../data/faqs';
import { TYPING_LESSONS } from '../data/lessons';
import { 
  getOrganizationSchema, 
  getWebSiteSchema, 
  getSoftwareApplicationSchema, 
  getFAQSchema 
} from '../utils/seoSchemas';

export const HomePage: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'english' | 'hindi'>('english');
  const [passageIndex, setPassageIndex] = useState(0);

  const activePassages = activeLang === 'english' ? ENGLISH_PASSAGES : HINDI_PASSAGES;
  const currentPassage = activePassages[passageIndex % activePassages.length];

  const handleNextPassage = () => {
    setPassageIndex((prev) => (prev + 1) % activePassages.length);
  };

  const homeSchemas = [
    getOrganizationSchema(),
    getWebSiteSchema(),
    getSoftwareApplicationSchema(
      'TypeBharat Typing Speed Test',
      'Free online English & Hindi typing speed test with real-time WPM calculation, accuracy tracking, and government exam simulators.',
      'https://typebharat.com/'
    ),
    getFAQSchema(FREQUENTLY_ASKED_QUESTIONS.slice(0, 6)),
  ];

  return (
    <div className="space-y-16 lg:space-y-24">
      <SEOHead
        title="TypeBharat - Master Typing Speed, Accuracy & Govt Exam Prep"
        description="India's leading typing platform for students and government job aspirants. Free English & Hindi Unicode typing tests, SSC CHSL, CPCT, and railway skill practice."
        canonical="https://typebharat.com/"
        keywords={[
          'typing test online',
          'typing speed test',
          'hindi typing test',
          'cpct typing test',
          'ssc typing practice',
          'free typing test',
          'wpm test',
          'typing test hindi and english',
          'typing practice online free',
        ]}
        schemaJson={homeSchemas}
      />

      {/* Hero Section with Immediate Working Typing Arena */}
      <section className="space-y-8 pt-2 sm:pt-4">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-lightTeal border border-brand-teal/20 text-brand-darkTeal text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineered for Speed, Precision & Competitive Exams</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-ink-heading tracking-tight leading-[1.15]">
            Master Keyboard Typing for{' '}
            <span className="text-brand-teal">Speed & Govt Exams</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-body max-w-2xl mx-auto leading-relaxed">
            Test your real WPM speed, eliminate accuracy bottlenecks, and simulate official SSC, CPCT, and Railway typing tests in English and Devanagari Hindi.
          </p>

          {/* Quick Switch CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setActiveLang('english');
                setPassageIndex(0);
              }}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                activeLang === 'english'
                  ? 'bg-brand-teal text-white shadow-sm ring-2 ring-brand-teal/30'
                  : 'bg-surface border border-border-subtle text-ink-body hover:bg-soft-gray'
              }`}
            >
              <span>English Typing Test</span>
            </button>

            <button
              onClick={() => {
                setActiveLang('hindi');
                setPassageIndex(0);
              }}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 font-hindi ${
                activeLang === 'hindi'
                  ? 'bg-brand-teal text-white shadow-sm ring-2 ring-brand-teal/30'
                  : 'bg-surface border border-border-subtle text-ink-body hover:bg-soft-gray'
              }`}
            >
              <span>हिंदी टाइपिंग टेस्ट (Unicode)</span>
            </button>

            <Link
              to="/government-typing-test/"
              className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-soft-blue text-blue-800 hover:bg-blue-100 transition-colors flex items-center gap-1.5"
            >
              <span>Govt Exam Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Immediate Working Typing Tool (No scrolling required!) */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex items-center justify-between px-2 mb-2 text-xs font-semibold text-ink-muted">
            <span className="flex items-center gap-1.5 text-brand-darkTeal">
              <Zap className="w-3.5 h-3.5" />
              Live Interactive Arena &bull; {activeLang.toUpperCase()} MODE
            </span>
            <span>Calculated via Standard (Correct/5)/Min Formula</span>
          </div>

          <TypingEngine
            key={`${activeLang}-${currentPassage.id}`}
            passage={currentPassage}
            defaultDuration={60}
            mode="timed"
            onNextPassage={handleNextPassage}
          />
        </div>

        {/* Google Featured Snippet (Position Zero) & Direct Answer Box */}
        <div className="w-full max-w-4xl mx-auto p-6 sm:p-7 rounded-3xl bg-surface border border-border-subtle shadow-card space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-darkTeal uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-brand-teal" />
            <span>Quick Fact &bull; Google Position Zero Summary</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-ink-heading">
            What is a Good Typing Speed (WPM) for Students &amp; Competitive Exams?
          </h2>
          <p className="text-sm sm:text-base text-ink-body leading-relaxed">
            The average international typing speed is <strong>40 Words Per Minute (WPM)</strong> with 92% accuracy. For Indian clerical and government competitive examinations, minimum qualifying benchmarks are typically <strong>35 WPM in English (10,500 KDPH for SSC CHSL)</strong> and <strong>20 to 30 WPM in Hindi Unicode (MAP_IT CPCT &amp; State Courts)</strong>. Professional typists, programmers, and stenographers operate at <strong>65 to 80+ WPM</strong>.
          </p>

          {/* WPM Speed Matrix Table */}
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-soft-gray/70 text-ink-heading font-semibold border-b border-border-subtle">
                <tr>
                  <th className="py-2.5 px-3">Typing Tier</th>
                  <th className="py-2.5 px-3">Speed (WPM)</th>
                  <th className="py-2.5 px-3">Key Depressions (KDPH)</th>
                  <th className="py-2.5 px-3">Relevance &amp; Exam Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-ink-body">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-ink-heading">Beginner / Novice</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-amber-700">15 – 25 WPM</td>
                  <td className="py-2.5 px-3 font-mono">4,500 – 7,500</td>
                  <td className="py-2.5 px-3">Hunt-and-peck typists learning finger placement</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-ink-heading">Intermediate / Average</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-700">30 – 40 WPM</td>
                  <td className="py-2.5 px-3 font-mono">9,000 – 12,000</td>
                  <td className="py-2.5 px-3">Clears MP CPCT (30 English / 20 Hindi) and RRB NTPC</td>
                </tr>
                <tr className="bg-brand-lightTeal/30">
                  <td className="py-2.5 px-3 font-bold text-brand-darkTeal">Govt Exam Qualifier</td>
                  <td className="py-2.5 px-3 font-mono font-extrabold text-brand-darkTeal">35 – 45 WPM</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-brand-darkTeal">10,500 – 13,500</td>
                  <td className="py-2.5 px-3 font-semibold text-brand-darkTeal">Qualifies for SSC CHSL LDC/JSA and High Court typists</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-ink-heading">Advanced Typist</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">50 – 65 WPM</td>
                  <td className="py-2.5 px-3 font-mono">15,000 – 19,500</td>
                  <td className="py-2.5 px-3">High-speed office data entry and administrative excellence</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-ink-heading">Pro Master Typist</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-purple-700">70+ WPM</td>
                  <td className="py-2.5 px-3 font-mono">21,000+</td>
                  <td className="py-2.5 px-3">Top 3% percentile touch typists, court stenographers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Highlights & Features Strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-surface border border-border-subtle shadow-card space-y-3 hover:border-brand-teal/30 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-brand-lightTeal flex items-center justify-center text-brand-teal">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-ink-heading">Precise Error Diagnostic</h3>
          <p className="text-sm text-ink-body leading-relaxed">
            Our typing engine tracks every keystroke, backspace, and weak key in real time. Know exactly which letters drag down your speed before exam day.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-surface border border-border-subtle shadow-card space-y-3 hover:border-brand-teal/30 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-soft-blue flex items-center justify-center text-blue-600">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-ink-heading">Govt Exam Simulators</h3>
          <p className="text-sm text-ink-body leading-relaxed">
            Realistic simulations calibrated to official MP CPCT, SSC CHSL, CGL DEST, and Railway benchmarks with exact time limits and qualifying rules.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-surface border border-border-subtle shadow-card space-y-3 hover:border-brand-teal/30 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-soft-yellow flex items-center justify-center text-amber-700">
            <Languages className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-ink-heading">True Hindi Unicode Engine</h3>
          <p className="text-sm text-ink-body leading-relaxed">
            Full support for Devanagari Inscript and Remington Gail layouts. Native IME composition handling ensures phonetic typing tools work flawlessly.
          </p>
        </div>
      </section>

      {/* Government Exam Preparation Hub */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-darkTeal">
              Exam Target Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-heading">
              Official Typing Examination Practice
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Select your competitive target to practice with authentic durations and evaluation criteria.
            </p>
          </div>

          <Link
            to="/government-typing-test/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-teal hover:text-brand-darkTeal transition-colors"
          >
            <span>View All Exam Simulators</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* CPCT English */}
          <Link
            to="/cpct-typing-test/"
            className="p-5 rounded-2xl bg-surface border border-border-subtle hover:border-brand-teal/40 hover:shadow-hover transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-soft-blue text-blue-700">
                15 Minutes &bull; English
              </span>
              <span className="text-xs font-bold text-brand-darkTeal">30 WPM Target</span>
            </div>
            <h3 className="font-bold text-lg text-ink-heading group-hover:text-brand-teal transition-colors">
              MP CPCT English Typing Test
            </h3>
            <p className="text-xs text-ink-body leading-relaxed">
              Prepare for Madhya Pradesh MAP_IT certification. Passages matched to official percentile score slabs.
            </p>
            <div className="pt-2 flex items-center gap-1 text-xs font-bold text-brand-teal">
              <span>Start CPCT Simulation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* CPCT Hindi */}
          <Link
            to="/cpct-typing-test/"
            className="p-5 rounded-2xl bg-surface border border-border-subtle hover:border-brand-teal/40 hover:shadow-hover transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-soft-yellow text-amber-800">
                15 Minutes &bull; हिंदी
              </span>
              <span className="text-xs font-bold text-brand-darkTeal">20 WPM Target</span>
            </div>
            <h3 className="font-bold text-lg text-ink-heading group-hover:text-brand-teal transition-colors">
              MP CPCT Hindi Typing Test
            </h3>
            <p className="text-xs text-ink-body leading-relaxed">
              Standard Devanagari Inscript & Remington Gail practice drills with conjunct and matra precision.
            </p>
            <div className="pt-2 flex items-center gap-1 text-xs font-bold text-brand-teal">
              <span>Start Hindi Simulation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* SSC CHSL */}
          <Link
            to="/ssc-typing-test/"
            className="p-5 rounded-2xl bg-surface border border-border-subtle hover:border-brand-teal/40 hover:shadow-hover transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-lightTeal text-brand-darkTeal">
                10 Minutes &bull; English
              </span>
              <span className="text-xs font-bold text-brand-darkTeal">35 WPM / 10500 KDPH</span>
            </div>
            <h3 className="font-bold text-lg text-ink-heading group-hover:text-brand-teal transition-colors">
              SSC CHSL LDC/JSA Skill Test
            </h3>
            <p className="text-xs text-ink-body leading-relaxed">
              Test with ~1750 key depression passages and strict full/half error deduction calculation.
            </p>
            <div className="pt-2 flex items-center gap-1 text-xs font-bold text-brand-teal">
              <span>Start SSC Simulation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Systematic Typing Improvement Section */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-surface to-brand-lightTeal/30 border border-border-subtle shadow-card space-y-8">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-darkTeal">
            Structured Practice Modes
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-heading">
            How to Advance from 20 WPM to 60+ WPM
          </h2>
          <p className="text-sm text-ink-body leading-relaxed">
            Random typing leads to plateaus. Structured muscle memory drills isolate fingers, train difficult row transitions, and solidify accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/typing-practice/"
            className="p-4 rounded-2xl bg-surface border border-border-subtle hover:border-brand-teal/30 hover:shadow-sm transition-all space-y-2"
          >
            <span className="text-xs font-bold text-brand-teal uppercase">Step 1</span>
            <h4 className="font-bold text-ink-heading">Home Row Drills</h4>
            <p className="text-xs text-ink-body">Master ASDF and JKL; anchors so your hands never wander.</p>
          </Link>

          <Link
            to="/typing-practice/"
            className="p-4 rounded-2xl bg-surface border border-border-subtle hover:border-brand-teal/30 hover:shadow-sm transition-all space-y-2"
          >
            <span className="text-xs font-bold text-brand-teal uppercase">Step 2</span>
            <h4 className="font-bold text-ink-heading">Row Integration</h4>
            <p className="text-xs text-ink-body">Learn fluid vertical finger reaches to QWERTY top and ZXCV bottom rows.</p>
          </Link>

          <Link
            to="/typing-practice/"
            className="p-4 rounded-2xl bg-surface border border-border-subtle hover:border-brand-teal/30 hover:shadow-sm transition-all space-y-2"
          >
            <span className="text-xs font-bold text-brand-teal uppercase">Step 3</span>
            <h4 className="font-bold text-ink-heading">Common Errors Drill</h4>
            <p className="text-xs text-ink-body">Target double-letter words, tricky spellings, and numbers without looking.</p>
          </Link>

          <Link
            to="/my-progress/"
            className="p-4 rounded-2xl bg-surface border border-border-subtle hover:border-brand-teal/30 hover:shadow-sm transition-all space-y-2"
          >
            <span className="text-xs font-bold text-brand-teal uppercase">Step 4</span>
            <h4 className="font-bold text-ink-heading">Review Weak Keys</h4>
            <p className="text-xs text-ink-body">Inspect your personal weak keys and track speed gains over time.</p>
          </Link>
        </div>
      </section>

      {/* Featured Educational Lessons */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-darkTeal">
              Educational Guides
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-heading">
              Expert Typing Guides & Tutorials
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Read actionable ergonomics, finger positioning, and exam preparation strategies.
            </p>
          </div>

          <Link
            to="/typing-lessons/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-teal hover:text-brand-darkTeal transition-colors"
          >
            <span>Explore All Lessons</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TYPING_LESSONS.slice(0, 3).map((lesson) => (
            <Link
              key={lesson.id}
              to={`/typing-lessons/#${lesson.slug}`}
              className="p-5 rounded-2xl bg-surface border border-border-subtle hover:border-brand-teal/40 hover:shadow-hover transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-ink-muted">
                  <span className="font-semibold uppercase tracking-wider text-brand-darkTeal">
                    {lesson.category}
                  </span>
                  <span>{lesson.readTime}</span>
                </div>
                <h3 className="font-bold text-base text-ink-heading leading-snug">
                  {lesson.title}
                </h3>
                <p className="text-xs text-ink-body leading-relaxed line-clamp-2">
                  {lesson.summary}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1 text-xs font-bold text-brand-teal">
                <span>Read Lesson</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="p-6 sm:p-10 rounded-3xl bg-surface border border-border-subtle shadow-card space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-darkTeal">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-ink-muted">
            Transparent answers regarding speed calculations, Hindi typing layouts, and exam preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {FREQUENTLY_ASKED_QUESTIONS.slice(0, 6).map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-soft-gray/50 space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-ink-heading flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-brand-teal flex-shrink-0 mt-1" />
                <span>{faq.question}</span>
              </h3>
              <p className="text-xs sm:text-sm text-ink-body leading-relaxed pl-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/faq/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border-subtle bg-white font-semibold text-sm text-ink-heading hover:bg-soft-gray transition-colors"
          >
            <span>View All FAQs & Scoring Explanations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};
