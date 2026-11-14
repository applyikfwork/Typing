import React from 'react';
import { Flame, Award, CheckCircle2, Lock } from 'lucide-react';
import { UserStats } from '../../types/typing';

interface StreakTrackerProps {
  stats: UserStats;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  isUnlocked: boolean;
}

export const StreakTracker: React.FC<StreakTrackerProps> = ({ stats }) => {
  const badges: Badge[] = [
    {
      id: 'first-step',
      name: 'First Keystroke',
      description: 'Completed your first typing test on TypeBharat.',
      isUnlocked: stats.totalTestsTaken >= 1,
    },
    {
      id: 'speed-30',
      name: '30 WPM Qualifier',
      description: 'Cleared the 30 WPM benchmark required for clerical exams.',
      isUnlocked: stats.personalBestWpm >= 30,
    },
    {
      id: 'speed-50',
      name: '50 WPM Pro',
      description: 'Achieved high-speed 50+ WPM typing efficiency.',
      isUnlocked: stats.personalBestWpm >= 50,
    },
    {
      id: 'precision-98',
      name: 'Precision Sniper',
      description: 'Maintained 98%+ typing accuracy on a completed test.',
      isUnlocked: stats.bestAccuracy >= 98 && stats.totalTestsTaken >= 1,
    },
    {
      id: 'dedicated-3',
      name: '3-Day Habit',
      description: 'Practiced typing 3 consecutive days in a row.',
      isUnlocked: stats.practiceDaysStreak >= 3,
    },
    {
      id: 'marathoner',
      name: '10 Tests Milestone',
      description: 'Logged 10 complete practice sessions.',
      isUnlocked: stats.totalTestsTaken >= 10,
    },
  ];

  return (
    <div className="p-6 bg-surface rounded-3xl border border-border-subtle shadow-card space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-ink-heading text-lg flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>Daily Practice Streak & Milestones</span>
          </h3>
          <p className="text-xs text-ink-muted">
            Consistent daily practice trains muscle memory 3x faster than weekend marathons.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-soft-yellow/80 border border-amber-200 self-start sm:self-center">
          <span className="text-xs font-semibold text-amber-800">
            Current Streak: <strong>{stats.practiceDaysStreak} Days</strong>
          </span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
              badge.isUnlocked
                ? 'bg-brand-lightTeal/40 border-brand-teal/30 text-ink-heading'
                : 'bg-soft-gray/40 border-border-subtle text-ink-muted opacity-75'
            }`}
          >
            <div
              className={`p-2 rounded-xl flex-shrink-0 ${
                badge.isUnlocked
                  ? 'bg-brand-teal text-white shadow-xs'
                  : 'bg-border-subtle text-ink-muted'
              }`}
            >
              {badge.isUnlocked ? <Award className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>

            <div className="text-xs space-y-0.5">
              <div className="font-bold text-ink-heading flex items-center gap-1.5">
                <span>{badge.name}</span>
                {badge.isUnlocked && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
                )}
              </div>
              <p className="text-ink-body leading-relaxed">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
