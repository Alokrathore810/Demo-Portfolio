import './globals.css';
import ThreeBackground from '../components/ThreeBackground';
import SmoothScroll from '../components/SmoothScroll';
import CursorSpotlight from '../components/CursorSpotlight';

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Alok Singh Rathod | Frontend & MERN Architect | Founder @ Kurukshetra Coding School',
  description: 'Portfolio of Alok Singh Rathod — Frontend Specialist, Full-Stack MERN Architect, Technical Educator, Founder & Entrepreneur based in Bhopal, India.',
  keywords: 'Alok Singh Rathod, Frontend Developer, MERN Stack Developer, React, Next.js, Three.js, Lenis, Kurukshetra Coding School, Bhopal, Web Development',
  authors: [{ name: 'Alok Singh Rathod' }],
  openGraph: {
    title: 'Alok Singh Rathod | Frontend & MERN Architect | Founder @ Kurukshetra Coding School',
    description: 'Portfolio of Alok Singh Rathod — Frontend Specialist, Full-Stack MERN Architect, Technical Educator, Founder & Entrepreneur based in Bhopal, India.',
    images: ['/images/alok-executive-designed.jpg'],
    type: 'website',
  },
  icons: {
    icon: '/logo.png',
  },
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
