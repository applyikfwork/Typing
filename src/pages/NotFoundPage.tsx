import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Keyboard, Search, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-16 text-center max-w-xl mx-auto space-y-6">
      <SEOHead
        title="404 - Page Not Found"
        description="The typing page you requested could not be found. Return to TypeBharat home or start an English or Hindi typing test."
      />

      <div className="w-20 h-20 rounded-3xl bg-brand-lightTeal text-brand-darkTeal flex items-center justify-center mx-auto text-3xl font-black font-mono shadow-sm">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-ink-heading">Page Not Found</h1>
        <p className="text-sm text-ink-body leading-relaxed">
          The page you are looking for might have been moved or does not exist. Choose one of our main practice destinations below.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-teal text-white font-bold text-sm hover:bg-brand-darkTeal transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>

        <Link
          to="/english-typing-test/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border-subtle text-ink-heading font-semibold text-sm hover:bg-soft-gray transition-colors"
        >
          <Keyboard className="w-4 h-4 text-brand-teal" />
          <span>English Typing Test</span>
        </Link>
      </div>
    </div>
  );
};
