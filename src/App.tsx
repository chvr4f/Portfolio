import { useEffect } from 'react';
import ClickSpark from '@/components/ClickSpark';
import SideNav from '@/components/layout/SideNav';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Work from '@/sections/Work';
import Skills from '@/sections/Skills';
import Contact from '@/sections/Contact';

declare global {
  interface Window {
    /** Installed by the inline preloader script in index.html. */
    __appReady?: () => void;
  }
}

export default function App() {
  // Dismiss the boot overlay once React has painted and the webfonts have
  // settled — handing off earlier means the hero reflows in front of the user
  // as Poppins swaps in.
  useEffect(() => {
    const release = () => window.__appReady?.();
    if (document.fonts) {
      document.fonts.ready.then(release, release);
    } else {
      release();
    }
  }, []);

  return (
    <ClickSpark sparkColor="#22d3ee" sparkSize={9} sparkRadius={18} sparkCount={8} duration={420}>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-mist-100 focus:px-4 focus:py-2 focus:text-sm focus:text-ink-950"
      >
        Skip to content
      </a>

      <SideNav />

      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>
    </ClickSpark>
  );
}
