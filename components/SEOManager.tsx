
import React, { useEffect } from 'react';
import { useData } from '../services/dataContext';

/**
 * SEOManager Component
 * 
 * Responsibilities:
 * 1. Reads metaTags from the global context.
 * 2. Dynamically updates the document.title and <meta> tags in the <head>.
 * 3. Acts as the "aplicarMetaTags()" function requested, running automatically on change.
 */
const SEOManager: React.FC = () => {
  const { metaTags } = useData();

  useEffect(() => {
    if (!metaTags) return;

    // 1. Update Title
    document.title = metaTags.title;

    // Helper to update or create meta tag
    const updateMetaTag = (selector: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        // Create if it doesn't exist (simulated for common tags)
        element = document.createElement('meta');
        
        // Handle name vs property attributes
        if (selector.includes('name=')) {
          const name = selector.split("name='")[1].split("'")[0];
          element.setAttribute('name', name);
        } else if (selector.includes('property=')) {
          const property = selector.split("property='")[1].split("'")[0];
          element.setAttribute('property', property);
        }
        
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Update Standard Meta Tags
    updateMetaTag("meta[name='description']", metaTags.description);
    updateMetaTag("meta[name='keywords']", metaTags.keywords);

    // 3. Update Open Graph Meta Tags
    updateMetaTag("meta[property='og:title']", metaTags.ogTitle);
    updateMetaTag("meta[property='og:description']", metaTags.ogDescription);
    updateMetaTag("meta[property='og:image']", metaTags.ogImage);
    updateMetaTag("meta[property='og:url']", metaTags.ogUrl);
    updateMetaTag("meta[name='twitter:title']", metaTags.ogTitle);
    updateMetaTag("meta[name='twitter:description']", metaTags.ogDescription);
    updateMetaTag("meta[name='twitter:image']", metaTags.ogImage);

  }, [metaTags]);

  return null; // This component renders nothing visibly
};

export default SEOManager;
