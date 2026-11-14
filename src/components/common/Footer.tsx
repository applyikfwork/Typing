import React from 'react';
import { Link } from 'react-router-dom';
import { Keyboard, Heart, ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border-subtle mt-16 text-sm text-ink-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-brand-teal flex items-center justify-center text-white">
                <Keyboard className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-ink-heading">
                Type<span className="text-brand-teal">Bharat</span>
              </span>
            </Link>
            
            <p className="text-ink-body leading-relaxed max-w-sm">
              India's premier open typing practice, speed test, and competitive examination preparation platform. Engineered for speed, accuracy, and official government exam excellence.
            </p>

            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <ShieldCheck className="w-4 h-4 text-brand-teal" />
              <span>100% Client-Side Privacy &bull; Zero Server Tracking</span>
            </div>
          </div>

          {/* Typing Tests */}
          <div className="space-y-3">
            <h3 className="font-semibold text-ink-heading text-xs tracking-wider uppercase">
              Typing Tests
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/english-typing-test/" className="hover:text-brand-teal transition-colors">
                  English Typing Test
                </Link>
              </li>
              <li>
                <Link to="/hindi-typing-test/" className="hover:text-brand-teal transition-colors">
                  Hindi Typing Test (Unicode)
                </Link>
              </li>
              <li>
                <Link to="/typing-speed-test/" className="hover:text-brand-teal transition-colors">
                  Typing Speed Test (WPM)
                </Link>
              </li>
              <li>
                <Link to="/free-typing-test/" className="hover:text-brand-teal transition-colors">
                  Free Typing Test
                </Link>
              </li>
              <li>
                <Link to="/my-progress/" className="hover:text-brand-teal transition-colors">
                  My Performance Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Examination Prep */}
          <div className="space-y-3">
            <h3 className="font-semibold text-ink-heading text-xs tracking-wider uppercase">
              Govt Exam Prep
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/government-typing-test/" className="hover:text-brand-teal transition-colors">
                  All Govt Exam Tests
                </Link>
              </li>
              <li>
                <Link to="/cpct-typing-test/" className="hover:text-brand-teal transition-colors">
                  MP CPCT Typing Practice
                </Link>
              </li>
              <li>
                <Link to="/ssc-typing-test/" className="hover:text-brand-teal transition-colors">
                  SSC CHSL & CGL Practice
                </Link>
              </li>
              <li>
                <Link to="/typing-practice/" className="hover:text-brand-teal transition-colors">
                  Structured Practice Drills
                </Link>
              </li>
              <li>
                <Link to="/hindi-typing-practice/" className="hover:text-brand-teal transition-colors">
                  Hindi Inscript Drills
                </Link>
              </li>
            </ul>
          </div>

          {/* Educational & Platform */}
          <div className="space-y-3">
            <h3 className="font-semibold text-ink-heading text-xs tracking-wider uppercase">
              Resources & Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/typing-lessons/" className="hover:text-brand-teal transition-colors">
                  Typing Lessons & Guides
                </Link>
              </li>
              <li>
                <Link to="/faq/" className="hover:text-brand-teal transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/about/" className="hover:text-brand-teal transition-colors">
                  About TypeBharat
                </Link>
              </li>
              <li>
                <Link to="/contact/" className="hover:text-brand-teal transition-colors">
                  Contact & Feedback
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy/" className="hover:text-brand-teal transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms/" className="hover:text-brand-teal transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Notice */}
        <div className="mt-10 pt-6 border-t border-border-subtle text-xs text-ink-muted leading-relaxed">
          <p>
            <strong className="text-ink-body font-semibold">Important Disclaimer:</strong> TypeBharat is an independent educational training platform developed to aid candidates in typing skill enhancement. TypeBharat is not affiliated with, authorized, sponsored, or endorsed by any government organization, examination board (including SSC, MAP_IT, RRB, or High Courts). All examination names and acronyms are used strictly for descriptive educational purposes. Always cross-verify official schedules and notifications directly on respective official commission websites.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted gap-4">
          <p>&copy; {currentYear} TypeBharat. All rights reserved. Built for learners across India and beyond.</p>
          <div className="flex items-center gap-1">
            <span>Precision engineering for high-speed typing</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
