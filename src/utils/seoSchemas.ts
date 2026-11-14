/**
 * Multi-Entity JSON-LD Schema Generator for TypeBharat.
 * Generates valid Google-compliant structured data for rich snippets.
 */

export interface FAQSchemaItem {
  question: string;
  answer: string;
}

export interface BreadcrumbSchemaItem {
  name: string;
  url: string;
}

export interface HowToStepItem {
  name: string;
  text: string;
  url?: string;
}

/**
 * 1. Organization Schema
 * Establishes entity authority, brand identity, and educational purpose.
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://typebharat.com/#organization',
    'name': 'TypeBharat',
    'url': 'https://typebharat.com/',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://typebharat.com/favicon.svg',
      'width': '512',
      'height': '512',
    },
    'description': 'India’s premier open typing speed test, practice platform, and government competitive exam simulator for English and Hindi Unicode.',
    'email': 'support@typebharat.com',
    'sameAs': [
      'https://github.com/applyikfwork/Typing',
    ],
  };
}

/**
 * 2. WebSite Schema with Sitelinks SearchAction
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://typebharat.com/#website',
    'url': 'https://typebharat.com/',
    'name': 'TypeBharat',
    'publisher': {
      '@id': 'https://typebharat.com/#organization',
    },
    'description': 'Free online English & Hindi typing speed tests, CPCT and SSC preparation simulators, and touch typing lessons.',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://typebharat.com/faq/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * 3. SoftwareApplication Schema for Typing Tests & Simulators
 */
export function getSoftwareApplicationSchema(
  name: string,
  description: string,
  url: string,
  featureList?: string[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': name,
    'description': description,
    'url': url,
    'applicationCategory': 'EducationalApplication',
    'operatingSystem': 'Windows, macOS, Linux, Android, iOS',
    'browserRequirements': 'Requires JavaScript. Requires HTML5.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'INR',
    },
    'featureList': featureList || [
      'Standard Words Per Minute (WPM) calculation',
      'Real-time accuracy and error tracking',
      'Devanagari Hindi Unicode and Inscript layout evaluation',
      '1, 3, 5, 10, and 15-minute exam simulation modes',
      'Privacy-first LocalStorage performance dashboard',
      'Interactive visual touch-typing keyboard guide',
    ],
  };
}

/**
 * 4. BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items: BreadcrumbSchemaItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url,
    })),
  };
}

/**
 * 5. FAQPage Schema for Google Rich Snippets
 */
export function getFAQSchema(faqs: FAQSchemaItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}

/**
 * 6. HowTo Schema for Educational Lessons
 */
export function getHowToSchema(
  title: string,
  description: string,
  steps: HowToStepItem[],
  totalTime?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': title,
    'description': description,
    'totalTime': totalTime || 'PT15M',
    'step': steps.map((step, idx) => ({
      '@type': 'HowToStep',
      'position': idx + 1,
      'name': step.name,
      'text': step.text,
      'url': step.url,
    })),
  };
}
