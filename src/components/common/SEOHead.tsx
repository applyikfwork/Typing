import React, { useEffect } from 'react';
import { SEOProps } from '../../types/seo';

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  keywords,
  ogType = 'website',
  ogImage = 'https://typebharat.com/og-banner.png',
  schemaJson,
  inLanguage = 'en',
  hreflangAlternates,
  author = 'TypeBharat Team',
}) => {
  useEffect(() => {
    // 1. Title
    const fullTitle = title.includes('TypeBharat') ? title : `${title} | TypeBharat`;
    document.title = fullTitle;

    // Helper to set or create meta elements
    const setMeta = (nameOrProperty: string, value: string, isProperty = false) => {
      const selector = isProperty
        ? `meta[property="${nameOrProperty}"]`
        : `meta[name="${nameOrProperty}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', nameOrProperty);
        } else {
          element.setAttribute('name', nameOrProperty);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // 2. Primary Meta Tags
    setMeta('description', description);
    if (keywords && keywords.length > 0) {
      setMeta('keywords', keywords.join(', '));
    }
    setMeta('author', author);
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('theme-color', '#159E8C');

    // 3. Open Graph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', ogType, true);
    setMeta('og:site_name', 'TypeBharat', true);
    setMeta('og:locale', inLanguage === 'hi' ? 'hi_IN' : 'en_IN', true);
    setMeta('og:image', ogImage, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:image:alt', `${title} - TypeBharat`, true);
    if (canonical) {
      setMeta('og:url', canonical, true);
    }

    // 4. Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:site', '@TypeBharat');
    setMeta('twitter:creator', '@TypeBharat');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // 5. Canonical Link
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
    }

    // 6. Hreflang Alternates
    // Remove existing hreflang alternates before inserting current
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

    const alternates = hreflangAlternates || [
      { lang: 'en', url: 'https://typebharat.com/english-typing-test/' },
      { lang: 'hi', url: 'https://typebharat.com/hindi-typing-test/' },
      { lang: 'x-default', url: 'https://typebharat.com/' },
    ];

    alternates.forEach(({ lang, url }) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      link.setAttribute('href', url);
      document.head.appendChild(link);
    });

    // 7. Structured Data (JSON-LD)
    if (schemaJson) {
      // Remove any old schema element
      const existingScript = document.getElementById('schema-ld-json');
      if (existingScript) existingScript.remove();

      const script = document.createElement('script');
      script.id = 'schema-ld-json';
      script.type = 'application/ld+json';
      const payload = Array.isArray(schemaJson) ? schemaJson : [schemaJson];
      script.textContent = JSON.stringify(payload.length === 1 ? payload[0] : payload);
      document.head.appendChild(script);
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [
    title,
    description,
    canonical,
    keywords,
    ogType,
    ogImage,
    schemaJson,
    inLanguage,
    hreflangAlternates,
    author,
  ]);

  return null;
};
