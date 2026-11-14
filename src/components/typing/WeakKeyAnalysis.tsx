import React from 'react';
import { AlertTriangle, Sparkles } from 'lucide-react';

interface WeakKeyAnalysisProps {
  errors: Record<string, number>;
  onPracticeWeakKeys?: (keys: string[]) => void;
}

export const WeakKeyAnalysis: React.FC<WeakKeyAnalysisProps> = ({ errors }) => {
  const sortedEntries = Object.entries(errors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  if (sortedEntries.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-soft-green/30 border border-status-success/20 text-status-success flex items-center gap-3">
        <Sparkles className="w-5 h-5 flex-shrink-0" />
        <div className="text-xs sm:text-sm">
          <strong className="font-semibold block">Flawless Keystrokes!</strong>
          No weak keys recorded. Maintain your steady typing rhythm.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-border-subtle shadow-card space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-ink-heading font-semibold text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Weak-Key Diagnostic</span>
        </div>
        <span className="text-xs text-ink-muted">Keys with highest error frequency</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {sortedEntries.map(([key, count]) => (
          <div
            key={key}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-soft-gray border border-border-subtle hover:border-status-error/40 transition-colors"
          >
            <span className="font-mono font-bold text-ink-heading px-1.5 py-0.5 rounded bg-white shadow-xs">
              {key === ' ' ? 'Space' : key}
            </span>
            <span className="text-xs font-semibold text-status-error">{count} errors</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-ink-muted leading-relaxed">
        Tip: Slow down slightly before striking these characters. Tactile memory strengthens when you make conscious, deliberate keystrokes.
      </p>
    </div>
  );
};
