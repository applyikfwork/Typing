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
}) => {
  useEffect(() => {
    // 1. Update document title
    const fullTitle = `${title} | TypeBharat`;
    document.title = fullTitle;

    // Helper to update or create meta tags
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

    // 2. Primary Meta
    setMeta('description', description);
    if (keywords && keywords.length > 0) {
      setMeta('keywords', keywords.join(', '));
    }

    // 3. Open Graph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', ogType, true);
    setMeta('og:image', ogImage, true);
    if (canonical) {
      setMeta('og:url', canonical, true);
    }

    // 4. Twitter Card
    setMeta('twitter:card', 'summary_large_image');
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

    // 6. JSON-LD Structured Data
    if (schemaJson) {
      const scriptId = 'schema-ld-json';
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schemaJson);
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [title, description, canonical, keywords, ogType, ogImage, schemaJson]);

  return null;
};
