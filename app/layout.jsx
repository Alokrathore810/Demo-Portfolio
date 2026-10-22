import './globals.css';
import ThreeBackground from '../components/ThreeBackground';
import SmoothScroll from '../components/SmoothScroll';
import CursorSpotlight from '../components/CursorSpotlight';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aloksinghrathod.dev';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Alok Singh Rathod | Frontend & MERN Architect | Founder @ Kurukshetra Coding School',
    template: '%s | Alok Singh Rathod',
  },
  description: 'Portfolio of Alok Singh Rathod — Frontend Specialist, Full-Stack MERN Architect, Technical Educator, and Founder of Kurukshetra Coding School based in Bhopal, MP, India.',
  keywords: [
    'Alok Singh Rathod',
    'Alok Rathod',
    'Frontend Specialist Bhopal',
    'MERN Stack Developer Bhopal',
    'Full Stack Architect India',
    'React Developer Bhopal',
    'Next.js Three.js Portfolio',
    'Kurukshetra Coding School',
    'Web Development Mentorship',
    'RozgarSetu',
    'CPCT Master',
  ],
  authors: [{ name: 'Alok Singh Rathod', url: siteUrl }],
  creator: 'Alok Singh Rathod',
  publisher: 'Alok Singh Rathod',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Alok Singh Rathod | Frontend & MERN Architect | Founder @ Kurukshetra Coding School',
    description: 'High-performance web architecture, modern React/Next.js systems, and engineering mentorship by Alok Singh Rathod in Bhopal, MP.',
    url: siteUrl,
    siteName: 'Alok Singh Rathod Portfolio',
    images: [
      {
        url: '/images/alok-executive-designed.jpg',
        width: 1200,
        height: 630,
        alt: 'Alok Singh Rathod - Frontend & MERN Architect, Founder @ Kurukshetra Coding School',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alok Singh Rathod | Frontend & MERN Architect',
    description: 'Boutique web engineering, MERN architecture, and technical education in Central India.',
    images: ['/images/alok-executive-designed.jpg'],
    creator: '@eralokrathod',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Alok Singh Rathod',
      jobTitle: 'Frontend Specialist & Full-Stack MERN Architect',
      description: 'Founder of Kurukshetra Coding School, architecting high-performance web applications and mentoring next-generation software engineers.',
      url: siteUrl,
      image: `${siteUrl}/images/alok-executive-designed.jpg`,
      email: 'eralokrathod@gmail.com',
      telephone: '+918959478949',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bhopal',
        addressRegion: 'Madhya Pradesh',
        addressCountry: 'India',
      },
      sameAs: [
        'https://github.com/eralokrathod',
        'https://www.linkedin.com/in/alokrathod',
        'https://kurukshetra.edu',
      ],
      knowsAbout: [
        'React.js',
        'Next.js',
        'JavaScript (ES6+)',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Three.js',
        'Lenis Smooth Scroll',
        'System Architecture',
        'Frontend Performance Optimization',
      ],
    },
    {
      '@type': 'EducationalOrganization',
      '@id': `${siteUrl}/#organization`,
      name: 'Kurukshetra Coding School',
      url: `${siteUrl}/#academy`,
      founder: {
        '@id': `${siteUrl}/#person`,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bhopal',
        addressRegion: 'Madhya Pradesh',
        addressCountry: 'India',
      },
      description: 'Premier developer education hub in Central India offering production-grade capstone mentorship in MERN, React, and Full-Stack Engineering.',
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Alok Singh Rathod — Architecture & Portfolio',
      publisher: {
        '@id': `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Background Architectural Grid Lines */}
        <div className="site-grid-lines" aria-hidden="true">
          <div className="grid-line"></div>
          <div className="grid-line"></div>
          <div className="grid-line"></div>
          <div className="grid-line"></div>
        </div>

        {/* Ambient Golden & Teal Glows */}
        <div className="ambient-glow ambient-glow-top" aria-hidden="true"></div>
        <div className="ambient-glow ambient-glow-bottom" aria-hidden="true"></div>

        {/* Interactive Ambient Cursor Follower */}
        <CursorSpotlight />

        {/* 3D Interactive Three.js Particle Constellation & Wave Canvas */}
        <ThreeBackground />

        {/* Lenis Smooth Scroll Provider */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
