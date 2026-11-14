import React from 'react';
import { Link } from 'react-router-dom';
import { Keyboard, Target, ShieldCheck, Heart, Users, Award, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <SEOHead
        title="About TypeBharat - Mission, Speed Philosophy & Independent Educational Tool"
        description="Learn about TypeBharat, an independent open-access typing platform built for Indian students and competitive examination aspirants."
        canonical="https://typebharat.com/about/"
      />

      <Breadcrumbs items={[{ name: 'About TypeBharat' }]} />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-heading tracking-tight">
          About TypeBharat
        </h1>
        <p className="text-base sm:text-lg text-ink-body leading-relaxed">
          TypeBharat was engineered with a clear mission: to provide Indian students, competitive job seekers, and multilingual typists with a world-class, distraction-free typing platform that accurately reflects official government examination standards.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-surface border border-border-subtle shadow-card space-y-6">
        <h2 className="text-2xl font-bold text-ink-heading">Why We Built TypeBharat</h2>
        <p className="text-sm sm:text-base text-ink-body leading-relaxed">
          Most traditional typing websites are filled with distracting popup ads, paid paywalls, generic English-only passages, and inaccurate speed algorithms that do not match the real requirements of examinations like SSC CHSL, MP CPCT, High Court steno tests, and Railway RRB NTPC.
        </p>
        <p className="text-sm sm:text-base text-ink-body leading-relaxed">
          Moreover, Hindi typists often struggle with buggy legacy font installations (such as KrutiDev) that fail on modern web browsers. TypeBharat solves this by providing a native <strong>Devanagari Unicode engine</strong> supporting both Inscript and Remington Gail keyboard layouts directly in the browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-surface border border-border-subtle shadow-card space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-lightTeal flex items-center justify-center text-brand-teal">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-ink-heading text-lg">Pure Utility</h3>
          <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
            No mandatory accounts, no subscription fees, no locked passages. You open the website and start testing immediately.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border-subtle shadow-card space-y-3">
          <div className="w-10 h-10 rounded-xl bg-soft-blue flex items-center justify-center text-blue-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-ink-heading text-lg">Client-Side Privacy</h3>
          <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
            Your keystrokes, personal bests, and test results are stored exclusively in your browser LocalStorage. Nothing is tracked on external servers.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border-subtle shadow-card space-y-3">
          <div className="w-10 h-10 rounded-xl bg-soft-yellow flex items-center justify-center text-amber-700">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-ink-heading text-lg">Exam Precision</h3>
          <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
            Passages calibrated to genuine exam paragraph formats with mathematically transparent WPM and KDPH calculation.
          </p>
        </div>
      </div>

      {/* Independent Notice */}
      <div className="p-6 rounded-3xl bg-soft-gray/60 border border-border-subtle text-xs sm:text-sm text-ink-muted leading-relaxed space-y-2">
        <h4 className="font-bold text-ink-heading uppercase tracking-wider text-xs">
          Independent Educational Initiative
        </h4>
        <p>
          TypeBharat is an independent educational training platform. We are not affiliated with, endorsed by, or operated by the Staff Selection Commission (SSC), MAP_IT (Government of Madhya Pradesh), Railway Recruitment Boards (RRB), High Courts, or any central or state government recruiting authority.
        </p>
      </div>
    </div>
  );
};
