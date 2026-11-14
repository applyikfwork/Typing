import React from 'react';
import { ShieldCheck, HardDrive, EyeOff, Trash2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <SEOHead
        title="Privacy Policy - Client-Side Data Security & LocalStorage Transparency"
        description="Learn how TypeBharat protects your privacy. We store typing results strictly in your local browser storage with zero personal data collection."
        canonical="https://typebharat.com/privacy-policy/"
      />

      <Breadcrumbs items={[{ name: 'Privacy Policy' }]} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-heading tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-ink-muted">
          Last updated: November 2026 &bull; Effective immediately
        </p>
      </div>

      <div className="bg-surface p-6 sm:p-10 rounded-3xl border border-border-subtle shadow-card space-y-6 text-sm sm:text-base text-ink-body leading-relaxed">
        
        <div className="p-4 rounded-2xl bg-brand-lightTeal/60 border border-brand-teal/20 text-brand-darkTeal font-medium flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 flex-shrink-0" />
          <span>Core Guarantee: TypeBharat does not collect, sell, or transmit your keystrokes, personal names, phone numbers, or passwords.</span>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-ink-heading">1. Information We Do Not Collect</h2>
          <p>
            You can access all typing tests, practice modules, exam simulations, and educational lessons on TypeBharat without creating an account, signing in, or submitting any personal identification. We do not maintain a user database or store your email address.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-ink-heading">2. Browser LocalStorage Usage</h2>
          <p>
            To provide continuous utility across test sessions, TypeBharat saves your completed test metrics (such as words per minute, accuracy percentage, timestamp, and weak key error frequencies) locally on your device using HTML5 LocalStorage.
          </p>
          <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm">
            <li><strong>Key 'typebharat_results_v1':</strong> Array of your recent test scores and timestamps.</li>
            <li><strong>Key 'typebharat_settings_v1':</strong> Your interface preferences (sound toggle, font size, keyboard visual guide).</li>
            <li><strong>Key 'typebharat_streak_v1':</strong> Your daily practice streak counter.</li>
          </ul>
          <p className="text-xs sm:text-sm text-ink-muted">
            This data never leaves your computer or smartphone. It is not transmitted to our servers or any third-party marketing network.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-ink-heading">3. Your Right to Delete Data</h2>
          <p>
            You possess full control over your locally stored information. You may clear your test history at any time by visiting the <strong>My Progress</strong> page and clicking the <em>Clear History</em> button, or by clearing your browser cache and cookies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-ink-heading">4. Web Audio API & Sound Effects</h2>
          <p>
            Keyboard click sounds and celebratory chimes are synthesized directly in your browser using the HTML5 Web Audio API. No external audio files are downloaded, and no microphone or recording devices are ever accessed.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-ink-heading">5. External Links</h2>
          <p>
            TypeBharat provides contextual links to official examination authorities (such as ssc.gov.in and cpct.mp.gov.in) strictly for candidate convenience. When following external links, please consult the respective privacy statements of those government portals.
          </p>
        </section>

      </div>
    </div>
  );
};
