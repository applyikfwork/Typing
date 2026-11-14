export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  ogType?: 'website' | 'article';
  ogImage?: string;
  schemaJson?: object | object[];
}
