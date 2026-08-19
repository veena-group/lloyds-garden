import { motion, useReducedMotion } from 'framer-motion';
import { sectionLabel, clipRevealBottom, DUR, EASE_PRIMARY, VIEWPORT_OFFSET } from '../../utils/animations';

export default function WelcomeSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="welcome" className="bg-[var(--color-paper)] pt-[72px] md:pt-[88px] pb-[24px] md:pb-[32px]">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-[32px] lg:px-[48px] xl:px-[56px] w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] lg:gap-0 items-start">
          
          {/* Text Content (6 columns) */}
          <div className="lg:col-span-6 flex flex-col pt-4">
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_OFFSET}
              variants={sectionLabel}
            >
              <span className="block text-[11px] md:text-[12px] font-semibold tracking-[0.16em] uppercase text-[var(--color-muted)] mb-6">
                Welcome to Lloyds
              </span>
            </motion.div>

            <motion.h2 
              className="font-display text-[42px] md:text-[56px] leading-[1.05] text-[var(--color-ink)] mb-8 max-w-[500px]"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.STD, delay: 0.1, ease: EASE_PRIMARY }}
              viewport={VIEWPORT_OFFSET}
            >
              A community we call home.
            </motion.h2>

            <motion.div 
              className="text-[16px] md:text-[17px] leading-[1.65] text-[#6F6B65] space-y-4 max-w-[560px]"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.STD, delay: 0.18, ease: EASE_PRIMARY }}
              viewport={VIEWPORT_OFFSET}
            >
              <p>
                <strong className="font-medium text-[var(--color-ink)]">Lloyds Garden Co-operative Housing Society Ltd.</strong> is a residential community located on Appasaheb Marathe Marg in Prabhadevi, Mumbai. Like every co-operative community, its character is shaped not only by its buildings, but by the residents who share responsibility for the spaces, administration and everyday life of the society.
              </p>
              <p>
                The society brings members together through an organised co-operative framework while maintaining focus on communication, common responsibilities and the long-term upkeep of the residential community.
              </p>
            </motion.div>
          </div>

          {/* Spacer (1 column) */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Identity Image (5 columns) */}
          <div className="lg:col-span-5 w-full flex lg:mt-[32px]">
            <motion.div 
              className="w-full aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-[4px] bg-[var(--color-rule)]"
              initial={shouldReduceMotion ? { opacity: 0 } : clipRevealBottom.initial}
              whileInView={shouldReduceMotion ? { opacity: 1, transition: { duration: DUR.STD } } : clipRevealBottom.whileInView}
              viewport={VIEWPORT_OFFSET}
            >
              <motion.img 
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                src="/society-images/lloyds3.webp" 
                alt="Lloyds Garden society sign surrounded by greenery" 
                className="w-full h-full object-cover"
                initial={{ scale: shouldReduceMotion ? 1 : 1.03 }}
                whileInView={{ scale: 1, transition: { duration: DUR.IMAGE, ease: EASE_PRIMARY } }}
                viewport={VIEWPORT_OFFSET}
              />
            </motion.div>
          </div>

        </div>
        
      </div>
    </section>
  );
}
