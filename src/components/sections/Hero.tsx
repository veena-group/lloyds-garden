import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DUR, EASE_PRIMARY } from '../../utils/animations';

export default function Hero() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const yDrift = useTransform(scrollY, [0, 1000], [0, 18]);

  return (
    <section id="home" className="relative pt-[112px] md:pt-[132px] pb-[64px] md:pb-[88px] flex items-center bg-[var(--color-canvas)] lg:min-h-[760px]">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-[32px] lg:px-[48px] xl:px-[56px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] lg:gap-[64px] items-center">
          
          {/* Left Content (5 cols) */}
          <div className="lg:col-span-5 flex flex-col order-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DUR.STD, delay: 0.08 }}
            >
              <span className="block text-[11px] md:text-[12px] font-semibold tracking-[0.16em] uppercase text-[var(--color-muted)] mb-5 md:mb-6">
                CO-OPERATIVE HOUSING SOCIETY LTD.
              </span>
            </motion.div>
            
            <h1 className="font-display text-[64px] md:text-[88px] lg:text-[clamp(72px,6.5vw,106px)] leading-[1.05] text-[var(--color-ink)] tracking-[-0.025em] mb-8">
              <div className="overflow-hidden pb-[0.2em] -mb-[0.2em]">
                <motion.div 
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: DUR.EDITORIAL, delay: 0.12, ease: EASE_PRIMARY }}
                >
                  Lloyds
                </motion.div>
              </div>
              <div className="overflow-hidden pb-[0.2em] -mb-[0.2em]">
                <motion.div 
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: DUR.EDITORIAL, delay: 0.21, ease: EASE_PRIMARY }}
                >
                  Garden
                </motion.div>
              </div>
            </h1>

            <motion.p 
              className="text-[16px] md:text-[17px] leading-[1.65] text-[#6F6B65] max-w-[520px] mb-10"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.STD, delay: 0.35, ease: EASE_PRIMARY }}
            >
              A residential community in Prabhadevi shaped by shared responsibility, thoughtful administration and everyday neighbourhood life.
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center gap-6"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.STD, delay: 0.47, ease: EASE_PRIMARY }}
            >
              <a 
                href="#about" 
                className="bg-[var(--color-ink)] text-[#FAF8F3] px-[24px] py-[12px] rounded-[4px] text-[13px] font-semibold tracking-wide transition-colors duration-200 hover:bg-[var(--color-bronze)]"
              >
                Discover Lloyds
              </a>
              <Link 
                to="/login"
                className="text-[13px] font-semibold tracking-wide text-[var(--color-ink)] hover:text-[var(--color-bronze)] transition-colors group flex items-center gap-2"
              >
                Member Login
                <span className="transition-transform duration-200 group-hover:translate-x-[4px]">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Image (7 cols) */}
          <div className="lg:col-span-7 order-2 w-full flex justify-end relative">
            <motion.div 
              className="w-full lg:w-[96%] aspect-[3/4] md:aspect-[4/5] lg:aspect-[1.15/1] overflow-hidden rounded-[4px] bg-[var(--color-rule)] relative"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              transition={{ duration: 0.92, delay: 0.18, ease: EASE_PRIMARY }}
            >
              <motion.img 
                fetchPriority="high"
                loading="eager"
                decoding="async"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                src="/society-images/lloyds4.webp" 
                alt="Exterior view of Lloyds Garden Co-operative Housing Society" 
                className="w-full h-full object-cover object-[center_35%]"
                initial={{ scale: shouldReduceMotion ? 1 : 1.035 }}
                animate={{ scale: 1 }}
                transition={{ duration: DUR.IMAGE, delay: 0.18, ease: EASE_PRIMARY }}
                style={{ y: (shouldReduceMotion || isMobile) ? 0 : yDrift }}
              />
              
              {/* Editorial Label */}
              <motion.div 
                className="absolute bottom-5 left-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: DUR.EDITORIAL, delay: 1.1 }}
              >
                <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-white/90 drop-shadow-md">
                  Lloyds Garden · Mumbai
                </span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
