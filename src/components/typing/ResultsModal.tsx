import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  ArrowRight, 
  Share2, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Target, 
  Clock 
} from 'lucide-react';
import { TestResult, ExamConfig } from '../../types/typing';
import { getSpeedCategory, evaluateExamQualifying } from '../../utils/typingEngine';
import { WeakKeyAnalysis } from './WeakKeyAnalysis';

interface ResultsModalProps {
  result: TestResult;
  examConfig?: ExamConfig;
  onRetry: () => void;
  onNextPassage?: () => void;
  onClose: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  result,
  examConfig,
  onRetry,
  onNextPassage,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const speedCat = getSpeedCategory(result.standardWpm);

  // Trigger celebratory confetti if WPM >= 35 or accuracy >= 97%
  useEffect(() => {
    if (result.standardWpm >= 35 || result.accuracy >= 97) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#159E8C', '#11796E', '#23865B', '#FFF2CC'],
        });
      } catch {
        // Safe fail
      }
    }
  }, [result]);

  // Exam qualification calculation
  const examEvaluation = examConfig
    ? evaluateExamQualifying(
        result.netWpm,
        result.accuracy,
        examConfig.targetSpeedWpm,
        examConfig.maxErrorRatePercent
      )
    : null;

  const handleShare = () => {
    const text = `🎯 I just scored ${result.standardWpm} WPM with ${result.accuracy}% accuracy on TypeBharat! (${result.language.toUpperCase()} - ${result.passageTitle})\nPractice now: https://typebharat.com`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="results-title"
        className="w-full max-w-2xl bg-surface rounded-3xl border border-border-subtle shadow-hover overflow-hidden transform transition-all"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-brand-lightTeal to-soft-blue px-6 py-6 border-b border-border-subtle text-center relative">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-teal text-white shadow-md mb-3">
            <Trophy className="w-7 h-7" />
          </div>

          <h2 id="results-title" className="text-2xl sm:text-3xl font-extrabold text-ink-heading tracking-tight">
            Test Performance Report
          </h2>
          <p className="text-sm text-ink-body mt-1">
            {result.passageTitle} &bull; {result.language.toUpperCase()} &bull; {result.elapsedSeconds}s
          </p>

          {/* Speed Rank Badge */}
          <div className="mt-3 inline-block">
            <span
              className={`px-3.5 py-1 rounded-full text-xs font-bold border tracking-wide uppercase ${speedCat.badgeColor}`}
            >
              {speedCat.title}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Exam Status Banner (if exam mode active) */}
          {examEvaluation && examConfig && (
            <div
              className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                examEvaluation.passed
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50/80 border-amber-200 text-amber-900'
              }`}
            >
              {examEvaluation.passed ? (
                <CheckCircle2 className="w-6 h-6 text-status-success flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-status-warning flex-shrink-0 mt-0.5" />
              )}
              <div className="text-xs sm:text-sm space-y-1">
                <div className="font-bold text-base flex items-center gap-2">
                  <span>{examConfig.shortName} Simulation Result:</span>
                  <span className={examEvaluation.passed ? 'text-status-success' : 'text-status-warning'}>
                    {examEvaluation.passed ? 'QUALIFIED ✓' : 'NEEDS PRACTICE'}
                  </span>
                </div>
                <p className="leading-relaxed">
                  Target: {examConfig.targetSpeedWpm} WPM with max {examConfig.maxErrorRatePercent}% error.
                  Your performance: <strong>{result.netWpm} Net WPM</strong> with{' '}
                  <strong>{examEvaluation.actualErrorRatePercent}% error</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Primary Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            
            <div className="p-4 rounded-2xl bg-brand-lightTeal/60 border border-brand-teal/30 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-darkTeal block mb-1">
                Standard WPM
              </span>
              <span className="text-3xl sm:text-4xl font-black text-brand-darkTeal">
                {result.standardWpm}
              </span>
              <span className="text-[11px] block text-brand-darkTeal/80 mt-1">
                (Correct / 5) / Min
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-border-subtle text-center shadow-card">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted block mb-1">
                Accuracy
              </span>
              <span className={`text-3xl sm:text-4xl font-black ${
                result.accuracy >= 95 ? 'text-status-success' : 'text-ink-heading'
              }`}>
                {result.accuracy}%
              </span>
              <span className="text-[11px] block text-ink-muted mt-1">
                Precision score
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-border-subtle text-center shadow-card">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted block mb-1">
                Net WPM
              </span>
              <span className="text-3xl sm:text-4xl font-black text-ink-heading">
                {result.netWpm}
              </span>
              <span className="text-[11px] block text-ink-muted mt-1">
                Gross - Penalties
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-border-subtle text-center shadow-card">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted block mb-1">
                Gross WPM
              </span>
              <span className="text-3xl sm:text-4xl font-black text-ink-muted">
                {result.grossWpm}
              </span>
              <span className="text-[11px] block text-ink-muted mt-1">
                Raw keystroke rate
              </span>
            </div>

          </div>

          {/* Keystroke Breakdown Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center p-3 rounded-xl bg-soft-gray text-xs">
            <div>
              <span className="text-ink-muted block">Correct Keystrokes</span>
              <span className="font-bold text-status-success text-sm sm:text-base">
                {result.correctChars}
              </span>
            </div>
            <div>
              <span className="text-ink-muted block">Errors Committed</span>
              <span className="font-bold text-status-error text-sm sm:text-base">
                {result.incorrectChars}
              </span>
            </div>
            <div>
              <span className="text-ink-muted block">Backspaces Used</span>
              <span className="font-bold text-ink-heading text-sm sm:text-base">
                {result.backspacesUsed}
              </span>
            </div>
            <div>
              <span className="text-ink-muted block">Time Elapsed</span>
              <span className="font-bold text-ink-heading text-sm sm:text-base">
                {result.elapsedSeconds}s
              </span>
            </div>
          </div>

          {/* Weak Keys Diagnostic */}
          {result.keyErrors && Object.keys(result.keyErrors).length > 0 && (
            <WeakKeyAnalysis errors={result.keyErrors} />
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handleShare}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border-subtle text-ink-body font-semibold text-sm hover:bg-soft-gray hover:text-ink-heading transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-status-success" /> : <Share2 className="w-4 h-4 text-ink-muted" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Share Result'}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onRetry}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border-subtle bg-white text-ink-heading font-semibold text-sm hover:bg-soft-gray transition-colors shadow-xs"
              >
                <RotateCcw className="w-4 h-4 text-ink-muted" />
                <span>Retry (Enter)</span>
              </button>

              {onNextPassage && (
                <button
                  onClick={onNextPassage}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-teal text-white font-semibold text-sm hover:bg-brand-darkTeal shadow-sm transition-all active:scale-95"
                >
                  <span>Next Passage</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
