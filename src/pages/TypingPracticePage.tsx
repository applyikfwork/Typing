import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Keyboard, 
  CheckCircle, 
  Target, 
  Layers, 
  Zap, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TypingEngine } from '../components/typing/TypingEngine';
import { ENGLISH_DRILLS } from '../data/passages/practiceDrills';
import { Passage } from '../types/typing';

export const TypingPracticePage: React.FC = () => {
  const categories = [
    { id: 'home-row', name: 'Home Row (ASDF JKL;)', desc: 'Foundation anchors' },
    { id: 'top-row', name: 'Top Row (QWERTY)', desc: 'Upper row reach' },
    { id: 'bottom-row', name: 'Bottom Row (ZXCV)', desc: 'Lower row reach' },
    { id: 'numbers-symbols', name: 'Numbers & Symbols', desc: 'Punctuation & digits' },
    { id: 'common-words', name: '100 Frequent Words', desc: 'Core English vocabulary' },
    { id: 'sentences', name: 'Alphabet Pangrams', desc: 'All 26 letters flow' },
    { id: 'common-errors', name: 'Tricky Spellings', desc: 'Common clerical typos' },
  ];

  const [activeCategory, setActiveCategory] = useState<string>('home-row');
  const [drillIndex, setDrillIndex] = useState<number>(0);

  const activeDrills = ENGLISH_DRILLS[activeCategory] || ENGLISH_DRILLS['home-row'];
  const currentDrill: Passage = activeDrills[drillIndex % activeDrills.length] || activeDrills[0];

  const handleNextPassage = () => {
    setDrillIndex((prev) => (prev + 1) % activeDrills.length);
  };

  const handleCategorySelect = (catId: string) => {
    setActiveCategory(catId);
    setDrillIndex(0);
  };

  return (
    <div className="space-y-10">
      <SEOHead
        title="Online Typing Practice - Step-by-Step Drills for Beginners to Pro"
        description="Structured online typing practice exercises. Master home row, top row, numbers, common clerical vocabulary, and tricky words with real-time feedback."
        canonical="https://typebharat.com/typing-practice/"
        keywords={[
          'typing practice',
          'online typing practice',
          'typing practice for beginners',
          'home row typing practice',
          'touch typing practice drills',
        ]}
      />

      <Breadcrumbs items={[{ name: 'Typing Practice' }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lightTeal text-brand-darkTeal text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Systematic Skill Building</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-heading tracking-tight">
          Structured Typing Practice Arena
        </h1>
        <p className="text-base text-ink-body leading-relaxed">
          Select a targeted category to build tactile muscle memory. Move sequentially from foundational home-row exercises to complex number-symbol patterns.
        </p>
      </div>

      {/* Category Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategorySelect(cat.id)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all border ${
              activeCategory === cat.id
                ? 'bg-brand-teal text-white border-brand-teal shadow-sm'
                : 'bg-surface text-ink-body border-border-subtle hover:bg-soft-gray hover:text-ink-heading'
            }`}
          >
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Interactive Typing Engine for Selected Practice Drill */}
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between text-xs text-ink-muted px-1">
          <span className="font-semibold text-brand-darkTeal flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Current Drill: {currentDrill.title}
          </span>
          <span>Drill { (drillIndex % activeDrills.length) + 1 } of { activeDrills.length }</span>
        </div>

        <TypingEngine
          key={`practice-${activeCategory}-${currentDrill.id}`}
          passage={currentDrill}
          defaultDuration={60}
          mode="practice"
          onNextPassage={handleNextPassage}
        />
      </div>

      {/* Practice Methodology Guidelines */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border-subtle shadow-card space-y-4">
        <h2 className="text-xl font-bold text-ink-heading">The 3-Step Practice Rule for Rapid Mastery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-soft-gray space-y-1.5">
            <span className="font-bold text-brand-darkTeal block">1. Form over Velocity</span>
            <p className="text-ink-body leading-relaxed">
              Resist the urge to type fast. Type each character at a relaxed, steady pace with your eyes fixed entirely on the screen.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-soft-gray space-y-1.5">
            <span className="font-bold text-brand-darkTeal block">2. Strict Finger Allocation</span>
            <p className="text-ink-body leading-relaxed">
              Always use the designated finger for each key. Never let your index finger take over keys meant for the ring or pinky finger.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-soft-gray space-y-1.5">
            <span className="font-bold text-brand-darkTeal block">3. 15-Minute Daily Habit</span>
            <p className="text-ink-body leading-relaxed">
              Neuroscience confirms that short daily repetitions form strong synaptic pathways far quicker than cramming long sessions on weekends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
