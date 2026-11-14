import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Trophy, 
  Target, 
  Clock, 
  RotateCcw, 
  Flame, 
  AlertTriangle, 
  ArrowRight 
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { StatCard } from '../components/common/StatCard';
import { PerformanceChart } from '../components/progress/PerformanceChart';
import { RecentTestsTable } from '../components/progress/RecentTestsTable';
import { StreakTracker } from '../components/progress/StreakTracker';
import { WeakKeyAnalysis } from '../components/typing/WeakKeyAnalysis';
import { useUserHistory } from '../context/UserHistoryContext';
import { getBreadcrumbSchema } from '../utils/seoSchemas';

export const MyProgressPage: React.FC = () => {
  const { stats, resetAllHistory } = useUserHistory();

  const progressSchemas = [
    getBreadcrumbSchema([
      { name: 'Home', url: 'https://typebharat.com/' },
      { name: 'My Performance Progress', url: 'https://typebharat.com/my-progress/' },
    ]),
  ];

  return (
    <div className="space-y-10">
      <SEOHead
        title="My Typing Progress - Speed Analytics, Personal Best & Weak Keys"
        description="View your personal typing speed dashboard. Track historical WPM progression, test completion rate, accuracy trends, and weak-key analysis recorded locally."
        canonical="https://typebharat.com/my-progress/"
        keywords={[
          'typing progress tracker',
          'my typing speed dashboard',
          'typing analytics',
          'weak keys diagnostic',
          'typing test history',
        ]}
        schemaJson={progressSchemas}
      />

      <Breadcrumbs items={[{ name: 'My Performance Progress' }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lightTeal text-brand-darkTeal text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Personal Performance Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-heading tracking-tight">
            Typing Speed Analytics
          </h1>
          <p className="text-base text-ink-body">
            All records are stored privately on your browser. Zero third-party tracking.
          </p>
        </div>

        <Link
          to="/english-typing-test/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-teal text-white font-bold text-sm hover:bg-brand-darkTeal shadow-sm transition-all self-start sm:self-center"
        >
          <span>Take New Test</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Primary Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Personal Best"
          value={stats.personalBestWpm}
          unit="WPM"
          icon={<Trophy className="w-5 h-5 text-amber-500" />}
          highlight={true}
        />

        <StatCard
          label="Average Speed"
          value={stats.averageWpm}
          unit="WPM"
          icon={<TrendingUp className="w-5 h-5 text-brand-teal" />}
        />

        <StatCard
          label="Best Accuracy"
          value={stats.bestAccuracy > 0 ? `${stats.bestAccuracy}%` : '0%'}
          icon={<Target className="w-5 h-5 text-status-success" />}
        />

        <StatCard
          label="Tests Completed"
          value={stats.totalTestsTaken}
          unit={`(${stats.totalTimeTypedMinutes}m practice)`}
          icon={<Clock className="w-5 h-5 text-blue-600" />}
        />
      </div>

      {/* Progress Chart & Streak */}
      <div className="space-y-6">
        <PerformanceChart results={stats.recentResults} />
        <StreakTracker stats={stats} />
      </div>

      {/* Weak Keys Diagnostic */}
      {stats.totalTestsTaken > 0 && (
        <WeakKeyAnalysis errors={stats.weakKeys} />
      )}

      {/* History Table with delete action */}
      <RecentTestsTable
        results={stats.recentResults}
        onClearHistory={resetAllHistory}
      />
    </div>
  );
};
