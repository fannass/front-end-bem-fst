import { useEffect } from 'react';
import { APP_NAME } from '../constants';

interface SEOProps {
  title: string;
  description?: string;
}

export const useSEO = ({ title, description }: SEOProps) => {
  useEffect(() => {
    document.title = `${title} | ${APP_NAME}`;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    
    if (description) {
      metaDescription.setAttribute('content', description);
    }

    // Scroll to top on route change usually accompanies new SEO title
    window.scrollTo(0, 0);
  }, [title, description]);
};