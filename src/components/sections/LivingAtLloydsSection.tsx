import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { sectionLabel, ruleDraw, ruleDrawY, DUR, EASE_PRIMARY, VIEWPORT_OFFSET } from '../../utils/animations';

export default function LivingAtLloydsSection() {
  const shouldReduceMotion = useReducedMotion();

  const themes = [
    {
      number: '01',
      title: 'Community',
      desc: 'Residents and families together shape the everyday character of Lloyds.'
    },
    {
      number: '02',
      title: 'Shared Spaces',
      desc: 'Common spaces form an important part of society life and are cared for through shared responsibility.'
    },
    {
      number: '03',
      title: 'Continuity',
      desc: 'Resident participation and responsible administration help maintain the community for present and future members.'
    }
  ];

  const staggerContainer: Variants = {
    initial: {},
    whileInView: { 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.4 // Wait for rules to draw
      } 
    }
  };

  const itemFade: Variants = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0, transition: { duration: DUR.STD, ease: EASE_PRIMARY } }
  };

  return (
    <section id="community" className="py-[64px] md:py-[72px] lg:py-[80px] bg-[var(--color-paper)]">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-[32px] lg:px-[48px] xl:px-[56px] w-full">
        
        <div className="mb-[48px] md:mb-[64px]">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_OFFSET}
            variants={sectionLabel}
          >
            <span className="block text-[11px] md:text-[12px] font-semibold tracking-[0.16em] uppercase text-[var(--color-muted)] mb-6">
              Our Community
            </span>
          </motion.div>
          <motion.h2 
            className="font-display text-[42px] md:text-[52px] leading-[1.05] text-[var(--color-ink)]"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.STD, delay: 0.1, ease: EASE_PRIMARY }}
            viewport={VIEWPORT_OFFSET}
          >
            Life at Lloyds.
          </motion.h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0"
          initial={shouldReduceMotion ? { opacity: 0 } : "initial"}
          whileInView={shouldReduceMotion ? { opacity: 1, transition: { duration: DUR.STD } } : "whileInView"}
          viewport={VIEWPORT_OFFSET}
          variants={staggerContainer}
        >
          {themes.map((theme, idx) => (
            <motion.div 
              key={theme.number}
              className={`flex flex-col relative md:pr-12 ${idx !== 0 ? 'md:pl-12' : ''}`}
            >
              {/* Vertical Rule (Desktop) / Horizontal Rule (Mobile) */}
              {idx !== 0 && !shouldReduceMotion && (
                <>
                  <motion.div 
                    className="hidden md:block absolute top-0 bottom-0 left-0 w-[1px] bg-[var(--color-rule)] origin-top"
                    variants={ruleDrawY}
                  />
                  <motion.div 
                    className="md:hidden absolute -top-6 left-0 right-0 h-[1px] bg-[var(--color-rule)] origin-left"
                    variants={ruleDraw}
                  />
                </>
              )}
              {idx !== 0 && shouldReduceMotion && (
                <>
                  <div className="hidden md:block absolute top-0 bottom-0 left-0 w-[1px] bg-[var(--color-rule)]" />
                  <div className="md:hidden absolute -top-6 left-0 right-0 h-[1px] bg-[var(--color-rule)]" />
                </>
              )}
              
              <motion.div variants={shouldReduceMotion ? {} : itemFade}>
                <div>
                  <span className="block text-[32px] md:text-[36px] font-display text-[var(--color-ink)] opacity-40 mb-3">
                    {theme.number}
                  </span>
                  
                  <div className="h-[2px] w-[24px] bg-[var(--color-bronze)] mb-5" />

                  <h3 className="text-[13px] md:text-[14px] font-semibold tracking-[0.08em] uppercase text-[var(--color-ink)] mb-3">
                    {theme.title}
                  </h3>
                  <p className="text-[15px] md:text-[16px] leading-[1.65] text-[#6F6B65]">
                    {theme.desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
