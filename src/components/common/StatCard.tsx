import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: string;
  trendPositive?: boolean;
  highlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  unit,
  icon,
  trend,
  trendPositive,
  highlight = false,
}) => {
  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 transition-all border ${
        highlight
          ? 'bg-brand-lightTeal/60 border-brand-teal/40 shadow-sm'
          : 'bg-surface border-border-subtle hover:border-brand-teal/30 shadow-card'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
          {label}
        </span>
        {icon && <div className="text-brand-teal p-1.5 rounded-lg bg-white/80">{icon}</div>}
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl sm:text-3xl font-extrabold text-ink-heading tracking-tight">
          {value}
        </span>
        {unit && <span className="text-xs font-semibold text-ink-muted">{unit}</span>}
      </div>

      {trend && (
        <div className="mt-2 text-xs font-medium flex items-center gap-1">
          <span className={trendPositive ? 'text-status-success' : 'text-status-warning'}>
            {trend}
          </span>
        </div>
      )}
    </div>
  );
};
