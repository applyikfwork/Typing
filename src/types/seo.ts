export interface HreflangAlternate {
  lang: string;
  url: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  ogImage?: string;
  schemaJson?: object | object[];
  inLanguage?: string;
  hreflangAlternates?: HreflangAlternate[];
  author?: string;
  datePublished?: string;
  dateModified?: string;
}
