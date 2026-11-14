import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gauge, Zap, CheckCircle2, TrendingUp, HelpCircle, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TypingEngine } from '../components/typing/TypingEngine';
import { ENGLISH_PASSAGES } from '../data/passages/english';
import { Difficulty } from '../types/typing';

export const TypingSpeedTestPage: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('intermediate');
  const [passageIndex, setPassageIndex] = useState(1);

  const filteredPassages = ENGLISH_PASSAGES.filter((p) => p.difficulty === selectedDifficulty);
  const currentPassage = filteredPassages[passageIndex % filteredPassages.length] || ENGLISH_PASSAGES[0];

  const handleNextPassage = () => {
    setPassageIndex((prev) => (prev + 1) % filteredPassages.length);
  };

  return (
    <div className="space-y-10">
      <SEOHead
        title="Typing Speed Test - Calculate Real WPM & Accuracy Online"
        description="Calculate your exact typing speed in Words Per Minute (WPM) and accuracy. Instant results with comprehensive error analysis and custom improvement recommendations."
        canonical="https://typebharat.com/typing-speed-test/"
        keywords={[
          'typing speed test',
          'typing speed calculator',
          'wpm speed test',
          'how fast do i type',
          'online typing speed checker',
        ]}
      />

      <Breadcrumbs items={[{ name: 'Typing Speed Test' }]} />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-blue text-blue-800 text-xs font-bold uppercase tracking-wider">
          <Gauge className="w-3.5 h-3.5" />
          <span>Precision Speed Measurement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-heading tracking-tight">
          Typing Speed Calculator (WPM)
        </h1>
        <p className="text-base text-ink-body leading-relaxed">
          Take a 60-second test to calculate your current gross keystroke rate, net speed after error deductions, and overall accuracy percentile.
        </p>
      </div>

      {/* Typing Engine */}
      <div className="w-full">
        <TypingEngine
          key={`speed-${selectedDifficulty}-${currentPassage.id}`}
          passage={currentPassage}
          defaultDuration={60}
          mode="timed"
          onNextPassage={handleNextPassage}
        />
      </div>

      {/* Educational Guide on WPM & Speed Improvement */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-3xl bg-surface border border-border-subtle shadow-card space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-lightTeal flex items-center justify-center text-brand-teal font-bold">
            1
          </div>
          <h3 className="font-bold text-ink-heading text-lg">Understanding Gross vs Net WPM</h3>
          <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
            Gross WPM reflects raw mechanical hand speed. Net WPM subtracts a penalty for every uncorrected typo. If you type fast but make mistakes, your Net WPM drops drastically.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-surface border border-border-subtle shadow-card space-y-3">
          <div className="w-10 h-10 rounded-xl bg-soft-blue flex items-center justify-center text-blue-600 font-bold">
            2
          </div>
          <h3 className="font-bold text-ink-heading text-lg">Target the 97% Accuracy Zone</h3>
          <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
            Research proves that typists who train with a strict 97%+ accuracy floor accelerate to 50+ WPM twice as fast as those who type frantically and backspace repeatedly.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-surface border border-border-subtle shadow-card space-y-3">
          <div className="w-10 h-10 rounded-xl bg-soft-yellow flex items-center justify-center text-amber-700 font-bold">
            3
          </div>
          <h3 className="font-bold text-ink-heading text-lg">Personalized Improvement Plan</h3>
          <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
            After completing this test, check the <strong>Weak Keys Diagnostic</strong> on the result screen. Practice targeted drills on your error letters for 10 minutes daily.
          </p>
        </div>
      </div>
    </div>
  );
};
