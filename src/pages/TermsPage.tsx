import React from 'react';
import { AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const TermsPage: React.FC = () => {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <SEOHead
        title="Terms of Service - TypeBharat Educational Platform Usage"
        description="Terms and conditions for utilizing TypeBharat typing tests, speed metrics, and examination simulators."
        canonical="https://typebharat.com/terms/"
      />

      <Breadcrumbs items={[{ name: 'Terms of Service' }]} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-heading tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-ink-muted">
          Last revised: November 2026
        </p>
      </div>

      <div className="bg-surface p-6 sm:p-10 rounded-3xl border border-border-subtle shadow-card space-y-6 text-sm sm:text-base text-ink-body leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-ink-heading">1. Acceptance of Terms</h2>
          <p>
            By accessing or using TypeBharat (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-ink-heading">2. Unofficial Examination Simulations & Disclaimer</h2>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm space-y-2">
            <strong className="font-bold flex items-center gap-1.5 text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Independent Educational Tool</span>
            </strong>
            <p className="leading-relaxed">
              TypeBharat is an independent educational training platform developed solely for typing practice and speed enhancement. TypeBharat is not affiliated with, endorsed by, sponsored by, or in any way associated with the Staff Selection Commission (SSC), MAP_IT (Government of Madhya Pradesh), Railway Recruitment Boards (RRB), High Courts, or any central or state government recruitment agency.
            </p>
            <p className="leading-relaxed">
              Simulations, qualifying benchmarks, and error rates presented on TypeBharat are based on publicly available historical recruitment patterns and should be treated as guidelines only. Official examination rules may vary across recruitment cycles. Always check official commission websites for definitive recruitment notifications.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-ink-heading">3. Permitted Personal Use</h2>
          <p>
            The software, text passages, speed calculators, and lessons on TypeBharat are provided free of charge for individual personal practice and educational enrichment. You may not scrape, copy in bulk, or re-brand our original passages or source code for commercial resale without express written permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-ink-heading">4. Accuracy of Results & Warranty Disclaimer</h2>
          <p>
            The typing engine and scoring calculations are provided on an "as is" and "as available" basis. While we strive for absolute mathematical precision, typing speed results depend on hardware keyboard response, browser event dispatch rates, and individual device latency. TypeBharat does not guarantee employment or examination success.
          </p>
        </section>

      </div>
    </div>
  );
};
