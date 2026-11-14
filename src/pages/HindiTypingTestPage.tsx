import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Languages, HelpCircle, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TypingEngine } from '../components/typing/TypingEngine';
import { HINDI_PASSAGES } from '../data/passages/hindi';
import { Difficulty } from '../types/typing';
import { 
  getSoftwareApplicationSchema, 
  getBreadcrumbSchema, 
  getFAQSchema 
} from '../utils/seoSchemas';

const HINDI_TEST_FAQS = [
  {
    question: 'हिंदी टाइपिंग के लिए कौन सा लेआउट बेहतर है: Inscript या Remington Gail?',
    answer: 'Inscript भारत सरकार द्वारा मानकीकृत आधिकारिक लेआउट है जो सभी ऑपरेटिंग सिस्टम (Windows, Mac, Android) में बिना किसी अतिरिक्त सॉफ्टवेयर के पहले से उपलब्ध होता है। Remington Gail पारंपरिक टाइपराइटर लेआउट पर आधारित है। यदि आप नए सिरे से टाइपिंग सीख रहे हैं, तो Inscript सीखना अधिक सरल और वैज्ञानिक है।',
  },
  {
    question: 'Windows 10 / 11 में Hindi Inscript कीबोर्ड कैसे चालू करें?',
    answer: 'Settings खोलें -> Time & Language -> Language & Region -> Add a language -> Hindi चुनें -> Options में जाकर Keyboard में "Hindi Inscript" जोड़ें। इसके बाद Alt + Shift दबाकर सीधे हिंदी टाइपिंग शुरू करें।',
  },
  {
    question: 'Inscript में संयुक्ताक्षर (आधा अक्षर) कैसे बनाएं?',
    answer: 'किसी भी अक्षर के बाद हलंत (D की) दबाने से वह आधा अक्षर बन जाता है। जैसे: क + ् + ष = क्ष, त + ् + र = त्र, ज + ् + ञ = ज्ञ।',
  },
  {
    question: 'MP CPCT में हिंदी टाइपिंग का न्यूनतम क्वालीफाइंग स्कोर क्या है?',
    answer: 'MP CPCT में हिंदी टाइपिंग के लिए न्यूनतम 20 शुद्ध शब्द प्रति मिनट (Net WPM) आवश्यक है, जिससे 50% अंक प्राप्त होते हैं। 40+ WPM पर अधिकतम 90% अंक दिए जाते हैं।',
  },
];

export const HindiTypingTestPage: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('intermediate');
  const [passageIndex, setPassageIndex] = useState(0);

  const filteredPassages = HINDI_PASSAGES.filter(
    (p) => p.difficulty === selectedDifficulty
  );
  const currentPassage = filteredPassages[passageIndex % filteredPassages.length] || HINDI_PASSAGES[0];

  const handleNextPassage = () => {
    setPassageIndex((prev) => (prev + 1) % filteredPassages.length);
  };

  const hindiSchemas = [
    getSoftwareApplicationSchema(
      'TypeBharat Hindi Typing Test (हिंदी टाइपिंग टेस्ट)',
      'मुफ्त ऑनलाइन हिंदी यूनिकोड टाइपिंग टेस्ट। Inscript और Remington Gail लेआउट पर वास्तविक समय गति और सटीकता मापें।',
      'https://typebharat.com/hindi-typing-test/'
    ),
    getBreadcrumbSchema([
      { name: 'Home', url: 'https://typebharat.com/' },
      { name: 'Hindi Typing Test', url: 'https://typebharat.com/hindi-typing-test/' },
    ]),
    getFAQSchema(HINDI_TEST_FAQS),
  ];

  return (
    <div className="space-y-10">
      <SEOHead
        title="Hindi Typing Test Online - यूनिकोड हिंदी टाइपिंग टेस्ट (Inscript & Remington)"
        description="मुफ्त हिंदी यूनिकोड टाइपिंग टेस्ट। CPCT, SSC और सरकारी परीक्षाओं के लिए 1, 3, 5 और 10 मिनट की हिंदी टाइपिंग गति और सटीकता मापें।"
        canonical="https://typebharat.com/hindi-typing-test/"
        keywords={[
          'Hindi typing test',
          'online hindi typing test',
          'hindi unicode typing',
          'cpct hindi typing test',
          'hindi typing practice inscript',
          'hindi remington gail test',
          'online devanagari typing test',
        ]}
        schemaJson={hindiSchemas}
        inLanguage="hi"
      />

      <Breadcrumbs items={[{ name: 'Hindi Typing Test' }]} />

      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-yellow text-amber-900 text-xs font-bold uppercase tracking-wider font-hindi">
          <Languages className="w-3.5 h-3.5" />
          <span>देवनागरी यूनिकोड टाइपिंग परीक्षा</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-heading tracking-tight font-hindi">
          ऑनलाइन हिंदी टाइपिंग टेस्ट (Hindi Unicode Test)
        </h1>
        <p className="text-base text-ink-body leading-relaxed font-hindi">
          अपने कीबोर्ड अथवा IME (Inscript, Indic Input अथवा Google Input Tools) के माध्यम से टाइपिंग शुरू करें। पहला अक्षर टाइप करते ही समय स्वतः प्रारंभ हो जाएगा।
        </p>
      </div>

      {/* Interactive Typing Arena */}
      <div className="w-full">
        <TypingEngine
          key={`hin-${selectedDifficulty}-${currentPassage.id}`}
          passage={currentPassage}
          defaultDuration={60}
          mode="timed"
          onNextPassage={handleNextPassage}
        />
      </div>

      {/* Explanatory Guide: How to Enable Hindi Input */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-border-subtle shadow-card space-y-4">
            <h2 className="text-2xl font-bold text-ink-heading font-hindi">
              हिंदी टाइपिंग इनपुट कैसे चालू करें (Input Setup Instructions)
            </h2>
            <p className="text-sm text-ink-body leading-relaxed">
              TypeBharat मानक <strong>Unicode Devanagari</strong> का उपयोग करता है। इसके लिए आपको किसी विशेष फोंट (जैसे KrutiDev) को डाउनलोड करने की आवश्यकता नहीं है; आपका कंप्यूटर या फोन सीधे देवनागरी यूनिकोड स्वीकार करता है।
            </p>

            <div className="space-y-3 text-xs sm:text-sm pt-2">
              <div className="p-4 rounded-2xl bg-soft-gray space-y-1.5">
                <strong className="text-ink-heading font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-teal" />
                  <span>Windows 10 / 11 पर Hindi Inscript चालू करने की विधि:</span>
                </strong>
                <ol className="list-decimal pl-6 space-y-1 text-ink-body leading-relaxed">
                  <li>Start Menu &rarr; <strong>Settings</strong> &rarr; <strong>Time & Language</strong> खोलें।</li>
                  <li><strong>Language & Region</strong> पर क्लिक करें और <strong>Add a language</strong> चुनें।</li>
                  <li><strong>Hindi (हिंदी)</strong> सर्च करके इंस्टॉल करें।</li>
                  <li>Hindi के विकल्प (Options) में जाकर <strong>Keyboards</strong> में <strong>Hindi Inscript</strong> जोड़ें।</li>
                  <li>टाइपिंग शुरू करने से पहले <kbd className="px-1.5 py-0.5 rounded bg-white border border-border-subtle font-mono text-[11px]">Alt + Shift</kbd> या <kbd className="px-1.5 py-0.5 rounded bg-white border border-border-subtle font-mono text-[11px]">Win + Space</kbd> दबाकर हिंदी भाषा चुनें।</li>
                </ol>
              </div>

              <div className="p-4 rounded-2xl bg-soft-gray space-y-1.5">
                <strong className="text-ink-heading font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-teal" />
                  <span>Google Input Tools (Phonetic) उपयोगकर्ताओं के लिए:</span>
                </strong>
                <p className="text-ink-body leading-relaxed">
                  TypeBharat में कंपोजिशन इवेंट्स (Composition Events) पूर्णतः समर्थित हैं। जब आप अंग्रेजी में "bharat" लिखते हैं और वह "भारत" में बदलता है, तो स्पेस दबाने के बाद ही शब्द का सही मूल्यांकन किया जाता है।
                </p>
              </div>
            </div>
          </section>

          <section className="bg-surface p-6 sm:p-8 rounded-3xl border border-border-subtle shadow-card space-y-4">
            <h2 className="text-xl font-bold text-ink-heading font-hindi">
              हिंदी टाइपिंग में हलंत और संयुक्ताक्षर नियम
            </h2>
            <div className="p-4 rounded-2xl bg-brand-lightTeal/40 border border-brand-teal/20 text-xs sm:text-sm space-y-2">
              <p className="leading-relaxed text-brand-darkTeal">
                <strong>Inscript में आधा अक्षर कैसे बनाएं:</strong> किसी भी व्यंजन के बाद हलंत (<kbd className="px-1.5 py-0.5 rounded bg-white font-mono text-xs text-ink-heading">D</kbd> की) दबाने पर वह आधा अक्षर बन जाता है।
              </p>
              <ul className="list-disc pl-5 space-y-1 text-ink-body">
                <li>क + ् + ष = <strong>क्ष</strong></li>
                <li>त + ् + र = <strong>त्र</strong></li>
                <li>ज + ् + ञ = <strong>ज्ञ</strong></li>
                <li>श + ् + र = <strong>श्र</strong></li>
              </ul>
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-surface border border-border-subtle shadow-card space-y-4">
            <h3 className="font-bold text-ink-heading text-base font-hindi">सरकारी परीक्षाओं के मानक</h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <span className="text-ink-body">MP CPCT हिंदी न्यूनतम</span>
                <span className="font-bold text-brand-darkTeal">20 WPM (50% अंक)</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <span className="text-ink-body">MP CPCT उच्च श्रेणी</span>
                <span className="font-bold text-purple-700">40+ WPM (90% अंक)</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <span className="text-ink-body">SSC CHSL हिंदी मानक</span>
                <span className="font-bold text-ink-heading">30 WPM (9000 KDPH)</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-ink-body">रेलवे RRB NTPC हिंदी</span>
                <span className="font-bold text-ink-heading">25 WPM</span>
              </li>
            </ul>

            <Link
              to="/cpct-typing-test/"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-lightTeal text-brand-darkTeal font-bold text-xs hover:bg-brand-teal hover:text-white transition-colors"
            >
              <span>CPCT हिंदी परीक्षा अभ्यास</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-surface border border-border-subtle shadow-card space-y-3">
            <h3 className="font-bold text-ink-heading text-base font-hindi">संबंधित अभ्यास</h3>
            <div className="space-y-2 text-xs">
              <Link
                to="/hindi-typing-practice/"
                className="block p-3 rounded-xl bg-soft-gray hover:bg-soft-yellow/50 transition-colors text-ink-heading font-medium font-hindi"
              >
                हिंदी वर्णमाला, मात्रा एवं संयुक्ताक्षर अभ्यास &rarr;
              </Link>
              <Link
                to="/english-typing-test/"
                className="block p-3 rounded-xl bg-soft-gray hover:bg-brand-lightTeal/50 transition-colors text-ink-heading font-medium"
              >
                Switch to English Typing Test &rarr;
              </Link>
              <Link
                to="/typing-lessons/#hindi-typing-inscript-guide"
                className="block p-3 rounded-xl bg-soft-gray hover:bg-soft-blue/50 transition-colors text-ink-heading font-medium"
              >
                Read Hindi Inscript Layout Guide &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hindi FAQ Section (Matches FAQPage Schema) */}
      <section className="p-6 sm:p-8 bg-surface rounded-3xl border border-border-subtle shadow-card space-y-6 font-hindi">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-ink-heading">
            अक्सर पूछे जाने वाले प्रश्न (Hindi Typing FAQs)
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">
            हिंदी टाइपिंग, यूनिकोड इनपुट और सरकारी परीक्षाओं से संबंधित महत्वपूर्ण उत्तर।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HINDI_TEST_FAQS.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-soft-gray/60 space-y-2">
              <h3 className="font-bold text-sm text-ink-heading">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
