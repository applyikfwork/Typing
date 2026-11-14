import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-xs sm:text-sm text-ink-muted">
      <ol className="flex items-center flex-wrap gap-1 sm:gap-2">
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-brand-teal transition-colors text-ink-body font-medium"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1 sm:gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-ink-light flex-shrink-0" />
              {isLast || !item.path ? (
                <span className="font-semibold text-brand-darkTeal truncate max-w-[200px] sm:max-w-none">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-brand-teal transition-colors text-ink-body font-medium truncate max-w-[150px] sm:max-w-none"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
