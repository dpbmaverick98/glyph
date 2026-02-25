import { useEffect } from 'react';

interface OGImageProps {
  title: string;
  description?: string;
  image?: string;
}

export function OGImage({ title, description, image }: OGImageProps) {
  useEffect(() => {
    // Update meta tags
    const metaTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description || '' },
      { property: 'og:image', content: image || '/og-image.png' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description || '' },
      { name: 'twitter:image', content: image || '/og-image.png' },
    ];
    
    metaTags.forEach(({ property, name, content }) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) meta.setAttribute('property', property);
        if (name) meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      
      meta.content = content;
    });
    
    return () => {
      // Cleanup not needed as we want to keep the meta tags
    };
  }, [title, description, image]);
  
  return null;
}
