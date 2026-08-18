import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { sectionLabel, clipRevealRight, DUR, EASE_PRIMARY, VIEWPORT_OFFSET } from '../../utils/animations';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="bg-[var(--color-paper)] pt-[24px] md:pt-[32px] pb-[72px] md:pb-[96px]" ref={containerRef}>
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-[32px] lg:px-[48px] xl:px-[56px] w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] lg:gap-0 items-start">
          
          {/* Image (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1 lg:mt-0">
            <motion.div
              className="aspect-[4/5] overflow-hidden rounded-[4px] bg-[var(--color-rule)]"
              initial={{ clipPath: 'circle(0% at 50% 50%)' }}
              animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            >
              <img
                loading="lazy"
                decoding="async"
                src="/society-images/llyods2.png"
                alt="Entrance to Llyods Garden Co-operative Housing Society"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </div>

          {/* Spacer (1 col) */}
          <div className="hidden lg:block lg:col-span-1 lg:order-2" />

          {/* Text (6 cols) */}
          <div className="lg:col-span-6 flex flex-col order-1 lg:order-3 lg:pt-[80px]">
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_OFFSET}
              variants={sectionLabel}
            >
              <span className="block text-[11px] md:text-[12px] font-semibold tracking-[0.16em] uppercase text-[var(--color-muted)] mb-6">
                About Llyods
              </span>
            </motion.div>
            
            <motion.h2 
              className="font-display text-[42px] md:text-[52px] leading-[1.05] text-[var(--color-ink)] mb-8 max-w-[500px]"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.STD, delay: 0.1, ease: EASE_PRIMARY }}
              viewport={VIEWPORT_OFFSET}
            >
              Built around community.
            </motion.h2>
            
            <motion.div 
              className="text-[16.5px] md:text-[18px] leading-[1.7] text-[#6F6B65] max-w-[580px] space-y-4"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.STD, delay: 0.18, ease: EASE_PRIMARY }}
              viewport={VIEWPORT_OFFSET}
            >
              <p>
                At Llyods, residential living extends beyond individual homes. Residents share the common spaces and responsibilities that form part of everyday society life.
              </p>
              <p>
                The Managing Committee works with members on matters relating to administration, common facilities, society affairs and the continued upkeep of the residential environment.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
