import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Languages, BookOpen, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TypingEngine } from '../components/typing/TypingEngine';
import { HINDI_DRILLS } from '../data/passages/hindiDrills';
import { Passage } from '../types/typing';
import { getSoftwareApplicationSchema, getBreadcrumbSchema } from '../utils/seoSchemas';

export const HindiPracticePage: React.FC = () => {
  const categories = [
    { id: 'hindi-vowels-consonants', name: 'वर्णमाला आधार (क, ख, ग, घ)', desc: 'मूल व्यंजन' },
    { id: 'hindi-matras', name: 'मात्रा अभ्यास (ा, ि, ी, ु, ू)', desc: 'मात्रा संयोजन' },
    { id: 'hindi-conjuncts', name: 'संयुक्ताक्षर व हलंत (क्ष, त्र, ज्ञ)', desc: 'आधे अक्षर' },
    { id: 'hindi-words', name: 'प्रशासनिक व परीक्षा शब्द', desc: 'उच्च-आवृत्ति शब्दावली' },
    { id: 'hindi-sentences', name: 'वाक्य अभ्यास (गति व सटीकता)', desc: 'प्रवाह निर्माण' },
  ];

  const [activeCategory, setActiveCategory] = useState<string>('hindi-vowels-consonants');
  const [drillIndex, setDrillIndex] = useState<number>(0);

  const activeDrills = HINDI_DRILLS[activeCategory] || HINDI_DRILLS['hindi-vowels-consonants'];
  const currentDrill: Passage = activeDrills[drillIndex % activeDrills.length] || activeDrills[0];

  const handleNextPassage = () => {
    setDrillIndex((prev) => (prev + 1) % activeDrills.length);
  };

  const handleCategorySelect = (catId: string) => {
    setActiveCategory(catId);
    setDrillIndex(0);
  };

  const hindiPracticeSchemas = [
    getSoftwareApplicationSchema(
      'TypeBharat Hindi Typing Practice (हिंदी टाइपिंग अभ्यास)',
      'क्रमबद्ध हिंदी टाइपिंग अभ्यास: वर्णमाला, मात्राएं, संयुक्ताक्षर, हलंत और प्रशासनिक शब्दावली।',
      'https://typebharat.com/hindi-typing-practice/'
    ),
    getBreadcrumbSchema([
      { name: 'Home', url: 'https://typebharat.com/' },
      { name: 'Hindi Typing Practice', url: 'https://typebharat.com/hindi-typing-practice/' },
    ]),
  ];

  return (
    <div className="space-y-10">
      <SEOHead
        title="Hindi Typing Practice Online - हिंदी टाइपिंग अभ्यास (Inscript & Remington)"
        description="चरणबद्ध हिंदी टाइपिंग अभ्यास। वर्णमाला, मात्राएं, संयुक्ताक्षर, हलंत और प्रशासनिक परीक्षा शब्दावली का सटीक ऑनलाइन अभ्यास करें।"
        canonical="https://typebharat.com/hindi-typing-practice/"
        keywords={[
          'hindi typing practice',
          'hindi typing practice online',
          'inscript typing practice',
          'hindi matra practice',
          'hindi varnamala typing',
          'hindi typing test chart',
        ]}
        schemaJson={hindiPracticeSchemas}
        inLanguage="hi"
      />

      <Breadcrumbs items={[{ name: 'Hindi Typing Practice' }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-3 font-hindi">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-yellow text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Languages className="w-3.5 h-3.5" />
          <span>क्रमबद्ध हिंदी टाइपिंग अभ्यास</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-heading tracking-tight">
          हिंदी टाइपिंग अभ्यास केंद्र (Hindi Typing Practice)
        </h1>
        <p className="text-base text-ink-body leading-relaxed">
          वर्णमाला के मूल अक्षरों से लेकर कठिन संयुक्ताक्षरों और शासकीय कार्यालयीन शब्दों तक का चरणबद्ध अभ्यास करें।
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-hindi">
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

      {/* Interactive Typing Arena */}
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between text-xs text-ink-muted px-1 font-hindi">
          <span className="font-semibold text-brand-darkTeal flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            अभ्यास: {currentDrill.title}
          </span>
          <span>अभ्यास क्रमांक { (drillIndex % activeDrills.length) + 1 } / { activeDrills.length }</span>
        </div>

        <TypingEngine
          key={`hin-prac-${activeCategory}-${currentDrill.id}`}
          passage={currentDrill}
          defaultDuration={60}
          mode="practice"
          onNextPassage={handleNextPassage}
        />
      </div>

      {/* Instructions & Guidelines */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border-subtle shadow-card space-y-4 font-hindi">
        <h2 className="text-xl font-bold text-ink-heading">हिंदी टाइपिंग सीखने के मुख्य सूत्र</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-soft-gray space-y-1.5">
            <span className="font-bold text-brand-darkTeal block">१. मात्राओं का क्रम</span>
            <p className="text-ink-body leading-relaxed">
              Inscript में पहले व्यंजन टाइप किया जाता है और उसके बाद मात्रा। जैसे: 'कि' लिखने के लिए पहले <kbd className="px-1.5 py-0.5 rounded bg-white font-mono text-xs">क</kbd> और फिर <kbd className="px-1.5 py-0.5 rounded bg-white font-mono text-xs">ि</kbd> दबाएं।
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-soft-gray space-y-1.5">
            <span className="font-bold text-brand-darkTeal block">२. हलंत से आधा अक्षर</span>
            <p className="text-ink-body leading-relaxed">
              व्यंजन के बाद D की (हलंत) दबाने से आधा अक्षर बनता है। उदाहरण: 'प्र' के लिए <kbd className="px-1.5 py-0.5 rounded bg-white font-mono text-xs">प + ् + र</kbd> टाइप करें।
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-soft-gray space-y-1.5">
            <span className="font-bold text-brand-darkTeal block">३. नियमित १५ मिनट</span>
            <p className="text-ink-body leading-relaxed">
              प्रतिदिन १५ मिनट का अभ्यास २ से ३ सप्ताह में आपकी गति को २० से ३५ WPM तक पहुंचाने के लिए पर्याप्त है।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
