import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, ExternalLink, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EXAM_CONFIGS } from '../utils/exams';
import { TypingEngine } from '../components/typing/TypingEngine';
import { ExamGuideCard } from '../components/exam/ExamGuideCard';
import { ENGLISH_PASSAGES } from '../data/passages/english';
import { HINDI_PASSAGES } from '../data/passages/hindi';
import { ExamType } from '../types/typing';
import { getSoftwareApplicationSchema, getBreadcrumbSchema } from '../utils/seoSchemas';

export const GovernmentExamsPage: React.FC = () => {
  const [selectedExamId, setSelectedExamId] = useState<string>('ssc-chsl');
  const [passageIndex, setPassageIndex] = useState(0);

  const selectedConfig = EXAM_CONFIGS[selectedExamId] || EXAM_CONFIGS['ssc-chsl'];
  const passages = selectedConfig.language === 'hindi' ? HINDI_PASSAGES : ENGLISH_PASSAGES;
  const currentPassage = passages[passageIndex % passages.length];

  const handleNextPassage = () => {
    setPassageIndex((prev) => (prev + 1) % passages.length);
  };

  const govtSchemas = [
    getSoftwareApplicationSchema(
      'TypeBharat Government Typing Exam Simulator Directory',
      'Accurate practice simulations for SSC CHSL, SSC CGL DEST, MP CPCT, Railway RRB NTPC, and High Court typist exams.',
      'https://typebharat.com/government-typing-test/'
    ),
    getBreadcrumbSchema([
      { name: 'Home', url: 'https://typebharat.com/' },
      { name: 'Government Typing Test Directory', url: 'https://typebharat.com/government-typing-test/' },
    ]),
  ];

  return (
    <div className="space-y-10">
      <SEOHead
        title="Government Typing Exam Preparation - SSC, CPCT, Railway & Court Practice"
        description="Comprehensive preparation directory for Indian government typing examinations. Authentic simulations for SSC CHSL, CGL DEST, MP CPCT, Railway RRB NTPC, and High Court typist tests."
        canonical="https://typebharat.com/government-typing-test/"
        keywords={[
          'government typing test',
          'ssc typing test',
          'cpct typing test',
          'railway typing test',
          'court typist exam practice',
          'govt typing exam pattern',
          'sarkari typing test online',
        ]}
        schemaJson={govtSchemas}
      />

      <Breadcrumbs items={[{ name: 'Government Typing Preparation' }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-blue text-blue-800 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>Competitive Skill Test Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-heading tracking-tight">
          Government Typing Exam Simulations
        </h1>
        <p className="text-base text-ink-body leading-relaxed">
          Select an examination to launch authentic timer durations, strict qualifying thresholds, and error evaluation models.
        </p>
      </div>

      {/* Exam Selector Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {Object.values(EXAM_CONFIGS).map((exam) => (
          <button
            key={exam.id}
            onClick={() => {
              setSelectedExamId(exam.id);
              setPassageIndex(0);
            }}
            className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between gap-1.5 ${
              selectedExamId === exam.id
                ? 'bg-brand-teal text-white border-brand-teal shadow-sm ring-2 ring-brand-teal/20'
                : 'bg-surface text-ink-body border-border-subtle hover:bg-soft-gray hover:text-ink-heading'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider opacity-85 block truncate">
              {exam.language.toUpperCase()} &bull; {exam.durationMinutes}m
            </span>
            <span className="font-bold text-xs sm:text-sm line-clamp-1">
              {exam.shortName}
            </span>
            <span className="text-[11px] font-medium opacity-90">
              Cutoff: {exam.targetSpeedWpm} WPM
            </span>
          </button>
        ))}
      </div>

      {/* Active Exam Typing Arena */}
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between px-2 text-xs font-semibold text-brand-darkTeal">
          <span>Active Simulation: {selectedConfig.name} ({selectedConfig.durationMinutes} Minutes)</span>
          <span>Target: {selectedConfig.targetSpeedWpm} Net WPM | Max Error: {selectedConfig.maxErrorRatePercent}%</span>
        </div>

        <TypingEngine
          key={`exam-${selectedExamId}-${currentPassage.id}`}
          passage={currentPassage}
          defaultDuration={selectedConfig.durationMinutes * 60}
          mode="exam"
          examConfig={selectedConfig}
          onNextPassage={handleNextPassage}
        />
      </div>

      {/* Official Guidelines & Specification Card */}
      <ExamGuideCard config={selectedConfig} />

      {/* Dedicated Sub-Pages Direct Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
        <Link
          to="/cpct-typing-test/"
          className="p-6 rounded-3xl bg-surface border border-border-subtle hover:border-brand-teal/40 hover:shadow-hover transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">
              Dedicated Portal
            </span>
            <ArrowRight className="w-4 h-4 text-ink-muted group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="text-xl font-bold text-ink-heading">MP CPCT Comprehensive Preparation Hub</h3>
          <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
            Full guide and dual English + Hindi Inscript/Remington Gail simulators designed specifically for MAP_IT scorecards.
          </p>
        </Link>

        <Link
          to="/ssc-typing-test/"
          className="p-6 rounded-3xl bg-surface border border-border-subtle hover:border-brand-teal/40 hover:shadow-hover transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">
              Dedicated Portal
            </span>
            <ArrowRight className="w-4 h-4 text-ink-muted group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="text-xl font-bold text-ink-heading">SSC CHSL & CGL Typing Preparation Hub</h3>
          <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
            Practice for LDC, JSA, and DEO positions with exact 10,500 KDPH key depression passage standards and error calculation.
          </p>
        </Link>
      </div>
    </div>
  );
};
