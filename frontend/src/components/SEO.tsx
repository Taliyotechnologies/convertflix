import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'ConvertFlix - File Compression & Conversion Tools',
  description = 'Transform your files with lightning-fast compression and conversion. Professional tools for images, videos, PDFs, and audio files. Smart algorithms, unlimited access.',
  keywords = 'file compression, file conversion, image converter, video converter, PDF tools, audio converter, online file tools',
  image = '/og-image.jpg',
  url = 'https://convertflix.com',
  type = 'website',
  author = 'Harsh Budhauliya',
  publishedTime,
  modifiedTime
}) => {
  const siteName = 'ConvertFlix';
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@convertflix" />
      <meta name="twitter:creator" content="@harshbudhauliya" />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "ConvertFlix",
          "description": description,
          "url": url,
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "author": {
            "@type": "Person",
            "name": author,
            "jobTitle": "Founder & CEO",
            "worksFor": {
              "@type": "Organization",
              "name": "Taliyo Technologies"
            }
          },
          "creator": {
            "@type": "Organization",
            "name": "Taliyo Technologies",
            "url": "https://taliyotechnologies.com"
          },
          "featureList": [
            "Image compression and conversion",
            "Video format conversion",
            "PDF compression and tools",
            "Audio file conversion",
            "Bulk file processing",
            "High-quality output"
          ]
        })}
      </script>
      
      {/* Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Taliyo Technologies",
          "url": "https://taliyotechnologies.com",
          "logo": "https://taliyotechnologies.com/logo.png",
          "founder": {
            "@type": "Person",
            "name": author
          },
          "description": "Leading software development company specializing in innovative web applications and digital solutions."
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
