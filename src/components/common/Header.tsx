import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Keyboard, 
  Flame, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  TrendingUp, 
  Languages, 
  Award, 
  BookOpen, 
  CheckCircle2 
} from 'lucide-react';
import { useTypingSettings } from '../../context/TypingSettingsContext';
import { useUserHistory } from '../../context/UserHistoryContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings, toggleSound } = useTypingSettings();
  const { stats } = useUserHistory();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'English Typing', path: '/english-typing-test/' },
    { name: 'Hindi Typing', path: '/hindi-typing-test/' },
    { name: 'Practice', path: '/typing-practice/' },
    { name: 'Govt Exams', path: '/government-typing-test/' },
    { name: 'Lessons', path: '/typing-lessons/' },
    { name: 'My Progress', path: '/my-progress/' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border-subtle shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-brand-teal flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Keyboard className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-ink-heading leading-tight flex items-center gap-1">
                Type<span className="text-brand-teal">Bharat</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-ink-muted">
                Speed &bull; Accuracy &bull; Exams
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-brand-lightTeal text-brand-darkTeal font-semibold shadow-xs'
                      : 'text-ink-body hover:text-ink-heading hover:bg-soft-gray'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Utility Tools & Quick Stats */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Streak Counter */}
            {stats.practiceDaysStreak > 0 && (
              <div 
                title={`${stats.practiceDaysStreak} Day Practice Streak!`}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-soft-yellow/80 border border-amber-200 text-amber-800 text-xs font-semibold"
              >
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                <span>{stats.practiceDaysStreak}d</span>
              </div>
            )}

            {/* Best WPM Pill */}
            {stats.personalBestWpm > 0 && (
              <Link
                to="/my-progress/"
                title="View your personal best & test analytics"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-lightTeal border border-brand-teal/20 text-brand-darkTeal text-xs font-semibold hover:bg-brand-teal hover:text-white transition-colors"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>PB: {stats.personalBestWpm} WPM</span>
              </Link>
            )}

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={settings.soundEnabled ? 'Mute keyboard sound' : 'Unmute keyboard sound'}
              aria-label={settings.soundEnabled ? 'Mute sound' : 'Unmute sound'}
              className="p-2 rounded-lg text-ink-muted hover:text-ink-heading hover:bg-soft-gray transition-colors border border-border-subtle"
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-brand-teal" />
              ) : (
                <VolumeX className="w-4 h-4 text-ink-muted" />
              )}
            </button>

            {/* Quick Test CTA */}
            <Link
              to="/english-typing-test/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold text-white bg-brand-teal hover:bg-brand-darkTeal shadow-sm transition-all active:scale-95"
            >
              <span>Start Test</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleSound}
              aria-label={settings.soundEnabled ? 'Mute sound' : 'Unmute sound'}
              className="p-2 rounded-lg text-ink-muted hover:bg-soft-gray border border-border-subtle"
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-brand-teal" />
              ) : (
                <VolumeX className="w-4 h-4 text-ink-muted" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-lg text-ink-heading hover:bg-soft-gray focus:outline-none focus:ring-2 focus:ring-brand-teal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border-subtle bg-surface px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  active
                    ? 'bg-brand-lightTeal text-brand-darkTeal font-bold'
                    : 'text-ink-body hover:bg-soft-gray hover:text-ink-heading'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-border-subtle flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-3 py-2 bg-soft-gray rounded-lg text-sm">
              <span className="text-ink-body">Personal Best:</span>
              <span className="font-bold text-brand-darkTeal">
                {stats.personalBestWpm > 0 ? `${stats.personalBestWpm} WPM` : 'No tests yet'}
              </span>
            </div>
            
            <Link
              to="/english-typing-test/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg text-sm font-semibold text-white bg-brand-teal hover:bg-brand-darkTeal transition-colors shadow-sm"
            >
              Take 1-Minute Speed Test
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
