import { useState, useEffect, useCallback, useRef } from 'react';

type SectionId = 'home' | 'about' | 'committee' | 'gallery' | 'events' | 'contact' | 'member-portal' | 'welcome' | 'community' | 'cooperative' | 'around-lloyds' | null;

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isDarkNavbar, setIsDarkNavbar] = useState(false);
  const isProgrammaticScrolling = useRef(false);
  const scrollTimeout = useRef<number | null>(null);

  const scrollToSection = useCallback((sectionId: SectionId) => {
    if (!sectionId) return;

    isProgrammaticScrolling.current = true;
    setActiveSection(sectionId);

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = window.innerWidth >= 1024 ? 76 : 66;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const targetY = section.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetY,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      window.history.replaceState(null, '', sectionId === 'home' ? window.location.pathname : `#${sectionId}`);

      // Lock observer logic until scroll is complete (approx 800ms)
      scrollTimeout.current = window.setTimeout(() => {
        isProgrammaticScrolling.current = false;
      }, 850);
    } else {
      isProgrammaticScrolling.current = false;
    }
  }, []);

  useEffect(() => {
    const handleInitialHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['about', 'committee', 'gallery', 'events', 'contact'].includes(hash)) {
        setTimeout(() => scrollToSection(hash as SectionId), 100);
      }
    };
    handleInitialHash();
  }, [scrollToSection]);

  useEffect(() => {
    // 1. Setup IntersectionObserver for sections
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrolling.current) return;

        const intersectingEntries = entries.filter((entry) => entry.isIntersecting);
        if (intersectingEntries.length === 0) return;

        const readingAnchor = window.innerHeight * 0.38;

        let closestSection: SectionId = null;
        let minDistance = Infinity;

        intersectingEntries.forEach((entry) => {
          const rect = entry.target.getBoundingClientRect();
          const distance = Math.abs(rect.top - readingAnchor);

          if (distance < minDistance) {
            minDistance = distance;
            let id = entry.target.id as SectionId;
            
            // Map sub-sections to 'about'
            if (id === 'welcome' || id === 'community' || id === 'cooperative' || id === 'around-lloyds') {
              id = 'about';
            }
            
            closestSection = id;
          }
        });

        // Force 'home' if we are at the very top of the page
        if (window.scrollY < 50) {
          closestSection = 'home';
        }

        if (closestSection) {
          if ((closestSection as SectionId) === 'member-portal') {
            setActiveSection(null);
          } else {
            setActiveSection(closestSection);
          }
        }
      },
      { rootMargin: '-25% 0px -55% 0px' }
    );

    const sections = ['home', 'welcome', 'about', 'around-lloyds', 'community', 'cooperative', 'committee', 'gallery', 'events', 'contact', 'member-portal'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // 2. Setup continuous scroll listener for dark mode and scroll state
    const handleScroll = () => {
      // Dark Navbar Overlap Logic
      const navbarHeight = window.innerWidth >= 1024 ? 76 : 66; // desktop vs mobile
      const portal = document.getElementById('member-portal');
      if (portal) {
        const portalRect = portal.getBoundingClientRect();
        if (portalRect.top <= navbarHeight && portalRect.bottom > navbarHeight) {
          setIsDarkNavbar(true);
        } else {
          setIsDarkNavbar(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return { activeSection, isDarkNavbar, scrollToSection };
}
