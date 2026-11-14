import React from 'react';
import { ExternalLink, AlertTriangle, CheckCircle, Info, ShieldAlert } from 'lucide-react';
import { ExamConfig } from '../../types/typing';

interface ExamGuideCardProps {
  config: ExamConfig;
}

export const ExamGuideCard: React.FC<ExamGuideCardProps> = ({ config }) => {
  return (
    <div className="space-y-6">
      {/* Official Exam Pattern Summary */}
      <div className="p-6 bg-surface rounded-3xl border border-border-subtle shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-darkTeal">
              Official Examination Specification
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-ink-heading">
              {config.name}
            </h2>
            <p className="text-sm text-ink-muted mt-0.5">
              Conducted by: <strong>{config.conductingBody}</strong>
            </p>
          </div>

          <a
            href={config.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-brand-darkTeal bg-brand-lightTeal hover:bg-brand-teal hover:text-white transition-colors self-start sm:self-center"
          >
            <span>Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Benchmarks Quick Pill Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-soft-gray">
            <span className="text-xs text-ink-muted block">Qualifying Speed</span>
            <span className="text-xl sm:text-2xl font-extrabold text-brand-darkTeal">
              {config.targetSpeedWpm} WPM
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-soft-gray">
            <span className="text-xs text-ink-muted block">Test Duration</span>
            <span className="text-xl sm:text-2xl font-extrabold text-ink-heading">
              {config.durationMinutes} Min
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-soft-gray">
            <span className="text-xs text-ink-muted block">Max Error Allowed</span>
            <span className="text-xl sm:text-2xl font-extrabold text-status-warning">
              {config.maxErrorRatePercent}%
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-soft-gray">
            <span className="text-xs text-ink-muted block">Backspace Policy</span>
            <span className="text-xl sm:text-2xl font-extrabold text-ink-heading">
              {config.backspaceAllowed ? 'Permitted' : 'Disabled'}
            </span>
          </div>
        </div>

        {/* Official Rules Breakdown */}
        <div className="space-y-2 pt-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-ink-heading">
            Key Examination Guidelines
          </h3>
          <ul className="space-y-2 text-sm text-ink-body">
            {config.rulesDescription.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scoring Methodology */}
        <div className="p-4 rounded-2xl bg-soft-blue/50 border border-blue-100 text-xs sm:text-sm text-blue-950 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-blue-900">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>Official Scoring Calculation</span>
          </div>
          <p className="leading-relaxed">{config.calculationMethod}</p>
        </div>

        {/* Simulation vs Actual Exam Notice */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
          <div className="font-bold flex items-center gap-1.5 text-amber-950">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-600" />
            <span>Difference Between Online Simulation & Official Test</span>
          </div>
          <p className="leading-relaxed">
            In the actual examination center, testing software may use locked desktop client browsers without external tabs or customizable zoom. Hardware keyboards at exam centers can vary in key travel and springiness. This simulator is intended for rigorous home training and muscle-memory conditioning.
          </p>
          <p className="font-semibold text-[11px] pt-1 border-t border-amber-200">
            {config.disclaimer}
          </p>
        </div>

      </div>
    </div>
  );
};
