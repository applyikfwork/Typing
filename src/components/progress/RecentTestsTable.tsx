import React, { useState } from 'react';
import { Trash2, Filter, AlertCircle, CheckCircle2 } from 'lucide-react';
import { TestResult, Language } from '../../types/typing';

interface RecentTestsTableProps {
  results: TestResult[];
  onClearHistory: () => void;
}

export const RecentTestsTable: React.FC<RecentTestsTableProps> = ({
  results,
  onClearHistory,
}) => {
  const [filterLang, setFilterLang] = useState<'all' | Language>('all');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const filtered = results.filter((res) => {
    if (filterLang === 'all') return true;
    return res.language === filterLang;
  });

  return (
    <div className="bg-surface rounded-3xl border border-border-subtle shadow-card overflow-hidden">
      
      {/* Header with Filter & Delete */}
      <div className="p-5 sm:p-6 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-ink-heading text-lg">Completed Test History</h3>
          <p className="text-xs text-ink-muted">Locally recorded test attempts</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter */}
          <div className="flex items-center gap-1 bg-soft-gray p-1 rounded-xl text-xs">
            <button
              onClick={() => setFilterLang('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterLang === 'all' ? 'bg-white text-ink-heading font-semibold shadow-xs' : 'text-ink-muted'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterLang('english')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterLang === 'english' ? 'bg-white text-brand-darkTeal font-semibold shadow-xs' : 'text-ink-muted'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setFilterLang('hindi')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterLang === 'hindi' ? 'bg-white text-brand-darkTeal font-semibold shadow-xs' : 'text-ink-muted'
              }`}
            >
              Hindi
            </button>
          </div>

          {/* Delete Button */}
          {results.length > 0 && (
            <button
              onClick={() => setShowConfirmDelete(true)}
              title="Delete all saved practice history"
              className="p-2 rounded-xl text-ink-muted hover:text-status-error hover:bg-red-50 border border-border-subtle transition-colors text-xs"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDelete && (
        <div className="p-4 bg-red-50 border-b border-red-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-red-900">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-status-error flex-shrink-0" />
            <span>Are you sure you want to delete all locally stored typing records? This cannot be undone.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClearHistory();
                setShowConfirmDelete(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-status-error text-white font-bold hover:bg-red-700 transition-colors"
            >
              Confirm Delete
            </button>
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="px-3 py-1.5 rounded-lg border border-red-300 bg-white font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="p-8 text-center text-ink-muted text-sm">
          No tests recorded yet. Start a typing test above to measure your speed!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-soft-gray/60 text-ink-muted uppercase text-[11px] font-semibold border-b border-border-subtle">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Date</th>
                <th className="py-3.5 px-4">Passage / Mode</th>
                <th className="py-3.5 px-4 text-center">Lang</th>
                <th className="py-3.5 px-4 text-right">Standard WPM</th>
                <th className="py-3.5 px-4 text-right">Net WPM</th>
                <th className="py-3.5 px-4 text-right">Accuracy</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-soft-gray/40 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-ink-body whitespace-nowrap">
                    {item.dateString}
                  </td>
                  <td className="py-3.5 px-4 text-ink-heading font-medium truncate max-w-[200px]">
                    {item.passageTitle}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-soft-blue text-blue-700">
                      {item.language}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-brand-darkTeal font-mono text-base">
                    {item.standardWpm}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-ink-heading">
                    {item.netWpm}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold text-status-success">
                    {item.accuracy}%
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right text-ink-muted font-mono">
                    {item.elapsedSeconds}s
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
