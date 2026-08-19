import { motion, useReducedMotion } from 'framer-motion';
import { sectionLabel, DUR, EASE_PRIMARY, VIEWPORT_OFFSET } from '../../utils/animations';

export default function GallerySection() {
  const shouldReduceMotion = useReducedMotion();

  const getMaskVariant = (delay: number) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 8% 0)', scale: 1.012 },
    whileInView: shouldReduceMotion 
      ? { opacity: 1, transition: { duration: DUR.STD, delay } }
      : { 
          opacity: 1, 
          clipPath: 'inset(0 0 0% 0)', 
          scale: 1, 
          transition: { duration: DUR.EDITORIAL, delay, ease: EASE_PRIMARY } 
        }
  });

  return (
    <section id="gallery" className="pt-[72px] md:pt-[96px] pb-[80px] md:pb-[96px] bg-[var(--color-canvas)]">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-[32px] lg:px-[48px] xl:px-[56px] w-full">
        
        {/* Gallery Header */}
        <div className="mb-[40px] md:mb-[48px]">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_OFFSET}
            variants={sectionLabel}
          >
            <span className="block text-[11px] md:text-[12px] font-semibold tracking-[0.16em] uppercase text-[var(--color-muted)] mb-[16px]">
              Life at Lloyds
            </span>
          </motion.div>
          <motion.h2 
            className="font-display text-[42px] md:text-[52px] leading-[1.05] text-[var(--color-ink)] mb-[24px]"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.STD, delay: 0.1, ease: EASE_PRIMARY }}
            viewport={VIEWPORT_OFFSET}
          >
            A glimpse of Lloyds.
          </motion.h2>
          <motion.p 
            className="text-[16px] md:text-[17px] leading-[1.65] text-[#6F6B65] max-w-[480px]"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.STD, delay: 0.2, ease: EASE_PRIMARY }}
            viewport={VIEWPORT_OFFSET}
          >
            Society spaces, surroundings and moments from the community.
          </motion.p>
        </div>

        {/* Architectural Collage */}
        <div className="flex flex-col gap-3 md:gap-4">
          
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4">
            
            {/* lloyds4 (main): cols 1-8 */}
            <div className="lg:col-span-8 group overflow-hidden rounded-[4px]">
              <motion.div 
                className="w-full h-full lg:h-[450px] aspect-[4/3] md:aspect-auto bg-[var(--color-rule)]"
                initial={getMaskVariant(0).initial}
                whileInView={getMaskVariant(0).whileInView}
                viewport={VIEWPORT_OFFSET}
              >
                <img 
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  src="/society-images/lloyds4.webp" 
                  alt="Exterior view of Lloyds Garden Co-operative Housing Society" 
                  className="w-full h-full block object-cover object-[50%_38%] transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:scale-[1.018]"
                />
              </motion.div>
            </div>

            {/* lloyds2 (entrance): cols 9-12 */}
            <div className="lg:col-span-4 group overflow-hidden rounded-[4px]">
              <motion.div 
                className="w-full h-full lg:h-[450px] aspect-[4/5] md:aspect-auto bg-[var(--color-rule)]"
                initial={getMaskVariant(0.1).initial}
                whileInView={getMaskVariant(0.1).whileInView}
                viewport={VIEWPORT_OFFSET}
              >
                <img 
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  src="/society-images/lloyds2.webp" 
                  alt="Entrance to Lloyds Garden Co-operative Housing Society" 
                  className="w-full h-full block object-cover object-[50%_52%] transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:scale-[1.018]"
                />
              </motion.div>
            </div>
            
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4">
            
            {/* lloyds1 (street): cols 1-5 */}
            <div className="lg:col-span-5 group overflow-hidden rounded-[4px]">
              <motion.div 
                className="w-full h-full lg:h-[380px] aspect-[4/3] md:aspect-auto bg-[var(--color-rule)]"
                initial={getMaskVariant(0.17).initial}
                whileInView={getMaskVariant(0.17).whileInView}
                viewport={VIEWPORT_OFFSET}
              >
                <img 
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  src="/society-images/lloyds1.webp" 
                  alt="Street view of Lloyds Garden and its tree-lined entrance" 
                  className="w-full h-full block object-cover object-[50%_40%] transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:scale-[1.018]"
                />
              </motion.div>
            </div>

            {/* lloyds3 (sign): cols 6-12 */}
            <div className="lg:col-span-7 group overflow-hidden rounded-[4px]">
              <motion.div 
                className="w-full h-full lg:h-[380px] aspect-[4/5] md:aspect-auto bg-[var(--color-rule)]"
                initial={getMaskVariant(0.24).initial}
                whileInView={getMaskVariant(0.24).whileInView}
                viewport={VIEWPORT_OFFSET}
              >
                <img 
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  src="/society-images/lloyds3.webp" 
                  alt="Lloyds Garden society sign surrounded by greenery" 
                  className="w-full h-full block object-cover object-[center_48%] transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:scale-[1.018]"
                />
              </motion.div>
            </div>
            
          </div>

        </div>

      </div>
    </section>
  );
}
