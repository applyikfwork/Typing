import React from 'react';
import { TestResult } from '../../types/typing';

interface PerformanceChartProps {
  results: TestResult[];
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ results }) => {
  if (results.length < 2) {
    return (
      <div className="p-8 text-center bg-surface rounded-3xl border border-border-subtle shadow-card text-ink-muted text-sm">
        Complete at least 2 typing tests to see your interactive speed & accuracy progress trend line.
      </div>
    );
  }

  // Reverse so chronological (oldest to newest, max 15 points)
  const dataPoints = [...results].reverse().slice(-15);

  const maxWpm = Math.max(...dataPoints.map((d) => d.standardWpm), 50);
  const minWpm = 0;

  const width = 600;
  const height = 200;
  const padding = 35;

  const points = dataPoints.map((d, index) => {
    const x = padding + (index / (dataPoints.length - 1)) * (width - padding * 2);
    const y = height - padding - ((d.standardWpm - minWpm) / (maxWpm - minWpm)) * (height - padding * 2);
    return { x, y, wpm: d.standardWpm, acc: d.accuracy, date: d.dateString };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  return (
    <div className="p-5 sm:p-6 bg-surface rounded-3xl border border-border-subtle shadow-card space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-ink-heading text-base">Typing Speed Trend</h3>
          <p className="text-xs text-ink-muted">WPM history across your last {dataPoints.length} tests</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-brand-darkTeal">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-teal" /> Standard WPM
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-44 sm:h-52 overflow-visible select-none"
        >
          {/* Subtle horizontal grid lines */}
          {[0, 25, 50, 75, 100].map((percent) => {
            const y = height - padding - (percent / 100) * (height - padding * 2);
            const val = Math.round((percent / 100) * maxWpm);
            return (
              <g key={percent}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="#E8ECEB"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding - 6}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[10px] fill-[#8A99A4] font-mono"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area fill under curve */}
          {points.length > 1 && (
            <path
              d={`${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`}
              fill="rgba(21, 158, 140, 0.08)"
            />
          )}

          {/* Line Path */}
          <path
            d={pathD}
            fill="none"
            stroke="#159E8C"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {points.map((pt, idx) => (
            <g key={idx} className="group cursor-pointer">
              <circle
                cx={pt.x}
                cy={pt.y}
                r="4.5"
                fill="#FFFFFF"
                stroke="#159E8C"
                strokeWidth="2.5"
                className="transition-transform group-hover:scale-125"
              />
              <title>{`${pt.wpm} WPM (${pt.acc}% accuracy) on ${pt.date}`}</title>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};
