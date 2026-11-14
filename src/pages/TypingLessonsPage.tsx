import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BookOpen, Clock, CheckCircle2, Lightbulb, ArrowRight, Bookmark } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TYPING_LESSONS, LessonItem } from '../data/lessons';
import { getBreadcrumbSchema, getHowToSchema } from '../utils/seoSchemas';

export const TypingLessonsPage: React.FC = () => {
  const location = useLocation();
  const [selectedLessonId, setSelectedLessonId] = useState<string>(TYPING_LESSONS[0].id);

  // Jump to hash if present in URL (e.g. #hindi-typing-inscript-guide)
  useEffect(() => {
    if (location.hash) {
      const slug = location.hash.replace('#', '');
      const matched = TYPING_LESSONS.find((l) => l.slug === slug);
      if (matched) {
        setSelectedLessonId(matched.id);
      }
    }
  }, [location.hash]);

  const activeLesson = TYPING_LESSONS.find((l) => l.id === selectedLessonId) || TYPING_LESSONS[0];

  const lessonSchemas = [
    getBreadcrumbSchema([
      { name: 'Home', url: 'https://typebharat.com/' },
      { name: 'Typing Lessons', url: 'https://typebharat.com/typing-lessons/' },
      { name: activeLesson.title, url: `https://typebharat.com/typing-lessons/#${activeLesson.slug}` },
    ]),
    getHowToSchema(
      activeLesson.title,
      activeLesson.summary,
      activeLesson.content.sections.map((sec) => ({
        name: sec.heading,
        text: sec.body.join(' '),
      }))
    ),
  ];

  return (
    <div className="space-y-10">
      <SEOHead
        title="Touch Typing Lessons & Tutorials - Improve Speed, Accuracy & Posture"
        description="Comprehensive touch-typing guides. Master the home row, ergonomic posture, look-ahead buffer reading, gross vs net WPM, and Hindi Inscript layout."
        canonical="https://typebharat.com/typing-lessons/"
        keywords={[
          'typing lessons',
          'learn touch typing',
          'how to increase typing speed',
          'typing posture ergonomic',
          'touch typing guide for beginners',
        ]}
        schemaJson={lessonSchemas}
      />

      <Breadcrumbs items={[{ name: 'Typing Lessons & Tutorials' }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lightTeal text-brand-darkTeal text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Touch Typing Academy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-heading tracking-tight">
          Typing Lessons & Technique Guides
        </h1>
        <p className="text-base text-ink-body leading-relaxed">
          Master the biomechanics of touch typing. Explore proven techniques for finger placement, posture, glance reduction, and exam preparation.
        </p>
      </div>

      {/* Main Two-Column Layout: Lesson Navigation & Active Lesson Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Lesson Directory */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-4 bg-surface rounded-2xl border border-border-subtle shadow-card">
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-3">
              Course Curriculum
            </h2>
            <div className="space-y-1.5">
              {TYPING_LESSONS.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-2.5 ${
                    selectedLessonId === lesson.id
                      ? 'bg-brand-lightTeal text-brand-darkTeal font-bold shadow-xs'
                      : 'text-ink-body hover:bg-soft-gray hover:text-ink-heading'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                    selectedLessonId === lesson.id ? 'text-brand-teal' : 'text-ink-muted'
                  }`} />
                  <div className="space-y-0.5">
                    <span className="text-xs sm:text-sm block line-clamp-1 leading-snug">
                      {lesson.title}
                    </span>
                    <span className="text-[11px] text-ink-muted font-normal block">
                      {lesson.readTime} &bull; {lesson.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Full Lesson Reader */}
        <div className="lg:col-span-8 bg-surface p-6 sm:p-10 rounded-3xl border border-border-subtle shadow-card space-y-8">
          
          {/* Article Header */}
          <div className="border-b border-border-subtle pb-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-darkTeal">
              <span className="px-2.5 py-0.5 rounded-full bg-brand-lightTeal uppercase tracking-wider">
                {activeLesson.category}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1 text-ink-muted">
                <Clock className="w-3.5 h-3.5" />
                {activeLesson.readTime}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-heading leading-tight">
              {activeLesson.title}
            </h2>

            <p className="text-base text-ink-body font-medium leading-relaxed">
              {activeLesson.summary}
            </p>
          </div>

          {/* Intro */}
          <div className="text-sm sm:text-base text-ink-body leading-relaxed space-y-4">
            <p className="p-4 rounded-2xl bg-soft-blue/40 border border-blue-100 text-blue-950 font-medium">
              {activeLesson.content.intro}
            </p>

            {/* Sections */}
            {activeLesson.content.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3 pt-3">
                <h3 className="text-lg sm:text-xl font-bold text-ink-heading">
                  {sec.heading}
                </h3>
                <div className="space-y-2 text-ink-body text-sm sm:text-base leading-relaxed">
                  {sec.body.map((bText, bIdx) => (
                    <p key={bIdx}>{bText}</p>
                  ))}
                </div>

                {sec.tips && sec.tips.length > 0 && (
                  <div className="p-4 rounded-2xl bg-soft-yellow/50 border border-amber-200 text-amber-950 text-xs sm:text-sm space-y-1">
                    <strong className="font-bold flex items-center gap-1.5 text-amber-900">
                      <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span>Pro Typist Tip:</span>
                    </strong>
                    {sec.tips.map((t, tIdx) => (
                      <p key={tIdx}>{t}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Action Steps */}
            <div className="mt-8 p-6 rounded-2xl bg-brand-lightTeal/40 border border-brand-teal/20 space-y-3">
              <h4 className="font-bold text-base text-brand-darkTeal flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-teal" />
                <span>Action Checklist for Today</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-ink-body">
                {activeLesson.content.actionSteps.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-2 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
