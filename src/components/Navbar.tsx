import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useScrollSpy } from '../hooks/useScrollSpy';


const navbarReveal = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { activeSection, isDarkNavbar, scrollToSection } = useScrollSpy();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' as const },
    { name: 'About', id: 'about' as const },
    { name: 'Committee', id: 'committee' as const },
    { name: 'Gallery', id: 'gallery' as const },
    { name: 'Events', id: 'events' as const },
    { name: 'Contact', id: 'contact' as const },
  ];

  const handleNavClick = (e: React.MouseEvent, id: 'home'|'about'|'committee'|'gallery'|'events'|'contact') => {
    e.preventDefault();
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      // Wait for layout update before scrolling
      setTimeout(() => scrollToSection(id), 50);
    } else {
      scrollToSection(id);
    }
  };

  // Dynamic Theme Classes
  const getNavThemeClasses = () => {
    if (isDarkNavbar) {
      return 'bg-[rgba(25,25,25,0.94)] backdrop-blur-[12px] border-b border-[rgba(255,255,255,0.10)]';
    }
    if (scrolled) {
      return 'bg-[rgba(250,248,243,0.92)] backdrop-blur-[12px] border-b border-[rgba(22,22,22,0.10)]';
    }
    return 'bg-[rgba(250,248,243,0.96)] border-b border-transparent';
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] opacity-70 transition-colors duration-280"
        style={{ scaleX, backgroundColor: isDarkNavbar ? '#A58A6C' : '#9A8065' }}
      />

      <motion.header
        initial="initial"
        animate="animate"
        variants={navbarReveal}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${getNavThemeClasses()}`}
      >
        <div className="max-w-[1320px] mx-auto px-[20px] md:px-[32px] lg:px-[48px] xl:px-[56px] h-[64px] lg:h-[74px] flex items-center justify-between">
          
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center" aria-label="Lloyds CHSL Home">
            {logoError ? (
              <span className={`font-display text-xl sm:text-2xl tracking-wide uppercase transition-colors duration-200 ${isDarkNavbar ? 'text-white' : 'text-[var(--color-ink)]'}`}>
                LLOYDS <span className="text-xs sm:text-sm font-sans font-medium tracking-widest ml-1 opacity-80">CHSL</span>
              </span>
            ) : (
              <img 
                src="/logo.webp" 
                alt="Lloyds CHSL" 
                onError={() => setLogoError(true)}
                className={`w-[125px] sm:w-[145px] lg:w-[180px] object-contain transition-all duration-200 ${isDarkNavbar ? 'brightness-0 invert' : ''}`}
              />
            )}
          </a>

          <nav className="hidden lg:flex items-center gap-8 h-full">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              
              // Text Color Logic
              let textClass = 'text-[#68645E] hover:text-[#161616]';
              if (isDarkNavbar) {
                textClass = isActive ? 'text-[#FAF8F3]' : 'text-[rgba(250,248,243,0.70)] hover:text-[#FAF8F3]';
              } else if (isActive) {
                textClass = 'text-[#161616] font-medium';
              }

              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`text-[13px] tracking-wide transition-colors duration-[280ms] relative group py-2 h-full flex items-center ${textClass}`}
                >
                  {link.name}
                  
                  {/* Hover Indicator (Only when inactive) */}
                  {!isActive && (
                    <span 
                      className={`absolute bottom-[18px] left-0 h-[1.5px] transition-transform duration-[200ms] origin-left w-full scale-x-0 group-hover:scale-x-100 ${isDarkNavbar ? 'bg-white/50' : 'bg-[#68645E]/50'}`}
                    />
                  )}

                  {/* Active Indicator (Shared) */}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      className="absolute bottom-[18px] left-0 right-0 h-[1.5px]"
                      style={{ backgroundColor: isDarkNavbar ? '#A58A6C' : '#9A8065' }}
                      transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </a>
              );
            })}
            
            <Link
              to="/login"
              className="ml-6 bg-[var(--color-graphite)] text-[#FAF8F3] h-[44px] px-[22px] rounded-[4px] text-[13px] font-semibold tracking-wide flex items-center justify-center transition-colors duration-200 hover:bg-[var(--color-bronze)]"
            >
              MEMBER LOGIN
            </Link>
          </nav>

          <div className="lg:hidden flex items-center gap-4">
            <button
              className={`p-2 -mr-2 transition-colors duration-[280ms] ${isDarkNavbar ? 'text-[#FAF8F3]' : 'text-[#161616]'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[var(--color-paper)] border-b border-[var(--color-rule)] shadow-sm">
            <nav className="flex flex-col px-[20px] py-4 gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="flex items-center gap-3 py-3 border-b border-[var(--color-rule)]"
                  >
                    {isActive ? (
                      <span className="w-[4px] h-[4px] rounded-full bg-[var(--color-bronze)]" />
                    ) : (
                      <span className="w-[4px] h-[4px] opacity-0" />
                    )}
                    <span className={`text-[15px] transition-colors ${isActive ? 'font-semibold text-[var(--color-ink)]' : 'font-medium text-[var(--color-muted)]'}`}>
                      {link.name}
                    </span>
                  </a>
                );
              })}
              <Link
                to="/login"
                className="bg-[var(--color-graphite)] text-[#FAF8F3] h-[48px] w-full rounded-[4px] text-[14px] font-semibold tracking-wide flex items-center justify-center transition-colors duration-200 hover:bg-[var(--color-bronze)] mt-4"
              >
                MEMBER LOGIN
              </Link>
            </nav>
          </div>
        )}
      </motion.header>
    </>
  );
}
