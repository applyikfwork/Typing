import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Feedback',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      <SEOHead
        title="Contact & Feedback - TypeBharat Platform Support"
        description="Share feedback, suggest typing passages, or report software bugs to the TypeBharat platform maintainers."
        canonical="https://typebharat.com/contact/"
      />

      <Breadcrumbs items={[{ name: 'Contact & Feedback' }]} />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-heading tracking-tight">
          Contact & Suggestions
        </h1>
        <p className="text-base text-ink-body leading-relaxed">
          Have an idea for a new practice drill, noticed an error in a passage, or have feedback to improve the typing engine? We welcome candidate suggestions.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border-subtle shadow-card space-y-6">
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-lightTeal text-brand-darkTeal flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-status-success" />
            </div>
            <h2 className="text-2xl font-bold text-ink-heading">Thank You for Your Feedback!</h2>
            <p className="text-sm text-ink-body max-w-md mx-auto">
              Your message has been recorded. Our team reviews all suggestions to make TypeBharat even better for competitive examination aspirants.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', category: 'Feedback', message: '' });
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-teal text-white font-bold text-sm hover:bg-brand-darkTeal transition-colors"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-ink-heading mb-1.5">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Candidate Name"
                className="w-full px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-brand-teal text-sm bg-soft-gray/30"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-ink-heading mb-1.5">
                Feedback Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-brand-teal text-sm bg-white"
              >
                <option value="Feedback">General Platform Feedback</option>
                <option value="Passage Suggestion">Suggest a New Practice Passage</option>
                <option value="Hindi Layout Bug">Hindi Typing / Layout Issue</option>
                <option value="Exam Rule Update">Exam Specification Update</option>
                <option value="Bug Report">Technical Bug Report</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-ink-heading mb-1.5">
                Your Message / Suggestion
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your feedback, suggestion, or test result query in detail..."
                className="w-full px-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:ring-2 focus:ring-brand-teal text-sm bg-soft-gray/30 resize-y"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-teal text-white font-bold text-sm hover:bg-brand-darkTeal shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Submit Message</span>
            </button>
          </form>
        )}
      </div>

      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Please note:</strong> TypeBharat does not issue admit cards, examination dates, or official scorecards. For questions regarding your official candidature, please contact the respective official commission helpline (e.g. SSC or MAP_IT).
        </p>
      </div>
    </div>
  );
};
