import { motion, useReducedMotion } from 'framer-motion';
import { sectionLabel, clipRevealLeft, DUR, EASE_PRIMARY, VIEWPORT_OFFSET } from '../../utils/animations';

export default function LocationContactSection() {
  const shouldReduceMotion = useReducedMotion();

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const textFadeIn = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    whileInView: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: DUR.STD, ease: EASE_PRIMARY } 
    }
  };

  const mapCTAVariant = {
    initial: { opacity: 0, x: shouldReduceMotion ? 0 : 8 },
    whileInView: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: DUR.STD, delay: 0.4, ease: EASE_PRIMARY } 
    }
  };

  return (
    <section id="contact" className="pt-[64px] md:pt-[88px] pb-[48px] md:pb-[64px] bg-[var(--color-paper)]">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-[32px] lg:px-[48px] xl:px-[56px] w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] lg:gap-[64px] items-start">
          
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <motion.div
                initial="initial"
                whileInView="whileInView"
                viewport={VIEWPORT_OFFSET}
                variants={sectionLabel}
              >
                <span className="block text-[11px] md:text-[12px] font-semibold tracking-[0.16em] uppercase text-[var(--color-muted)] mb-6">
                  Contact
                </span>
              </motion.div>
              
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : "initial"}
                whileInView={shouldReduceMotion ? { opacity: 1, transition: { duration: DUR.STD } } : "whileInView"}
                viewport={VIEWPORT_OFFSET}
                variants={staggerContainer}
                className="flex flex-col gap-[32px] md:gap-[48px]"
              >
                <motion.h2 
                  className="font-display text-[42px] md:text-[52px] leading-[1.05] text-[var(--color-ink)]"
                  variants={shouldReduceMotion ? {} : textFadeIn}
                >
                  Visit or get in touch.
                </motion.h2>

                <motion.div variants={shouldReduceMotion ? {} : textFadeIn}>
                  <h4 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--color-muted)] mb-2">Society Office</h4>
                  <p className="text-[15px] md:text-[16px] leading-[1.65] text-[var(--color-ink)]">
                    Lloyds Garden Co-operative Housing Society Ltd.<br />
                    Appasaheb Marathe Marg<br />
                    near Century Bazaar<br />
                    Prabhadevi<br />
                    Mumbai, Maharashtra 400025
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="lg:col-span-7">
            <motion.div 
              className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[16/10] overflow-hidden rounded-[4px] bg-[var(--color-rule)] group"
              initial={shouldReduceMotion ? { opacity: 0 } : clipRevealLeft.initial}
              whileInView={shouldReduceMotion ? { opacity: 1, transition: { duration: DUR.STD } } : clipRevealLeft.whileInView}
              viewport={VIEWPORT_OFFSET}
            >
              <img 
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                src="/society-images/lloyds5.webp" 
                alt="Lloyds Garden Co-operative Housing Society" 
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.018]"
                style={{ transformOrigin: '50% 50%' }}
              />
              
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
              
              <div className="absolute bottom-[16px] right-[16px] md:bottom-[20px] md:right-[20px] overflow-hidden">
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 0 } : mapCTAVariant.initial}
                  whileInView={shouldReduceMotion ? { opacity: 1, transition: { duration: DUR.STD } } : mapCTAVariant.whileInView}
                  viewport={VIEWPORT_OFFSET}
                >
                  <a 
                    href="https://maps.app.goo.gl/jbMopq4skxRQTiWLA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[rgba(250,248,243,0.95)] backdrop-blur-sm text-[var(--color-ink)] px-[18px] py-[14px] rounded-[4px] text-[13px] font-semibold tracking-wide flex items-center gap-2 hover:bg-[#FAF8F3] transition-colors duration-300 h-[46px] md:h-[48px] shadow-lg group/cta"
                  >
                    View on Google Maps
                    <span className="ml-[6px] group-hover/cta:translate-x-[4px] transition-transform duration-200">→</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
