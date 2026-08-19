import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { sectionLabel, clipRevealRight, DUR, EASE_PRIMARY, VIEWPORT_OFFSET } from '../../utils/animations';
import { MapPin, HeartPulse, GraduationCap, ShoppingBag, Store, Trees } from 'lucide-react';

const gridContainerVariants: Variants = {
  initial: { opacity: 0 },
  whileInView: { 
    opacity: 1,
    transition: { 
      duration: DUR.STD, 
      ease: EASE_PRIMARY,
      when: "beforeChildren",
      staggerChildren: 0.07 // 70ms stagger
    } 
  }
};

const cellVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  whileInView: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: DUR.STD, ease: EASE_PRIMARY } 
  }
};

export default function AroundLloydsSection() {
  const shouldReduceMotion = useReducedMotion();

  const features = [
    {
      id: '01',
      title: 'Connectivity',
      desc: 'Located in Prabhadevi, Lloyds is connected to the wider Mumbai road and public transport network.',
      detail: 'PRABHADEVI · MUMBAI',
      icon: MapPin
    },
    {
      id: '02',
      title: 'Healthcare',
      desc: 'Residents have access to healthcare services, clinics and hospitals across Prabhadevi and the surrounding central Mumbai neighbourhoods.',
      detail: 'HEALTHCARE ACCESS',
      icon: HeartPulse
    },
    {
      id: '03',
      title: 'Education',
      desc: 'Schools, colleges and educational institutions across the surrounding area serve families and students living in the neighbourhood.',
      detail: 'EDUCATION & LEARNING',
      icon: GraduationCap
    },
    {
      id: '04',
      title: 'Daily Essentials',
      desc: 'Groceries, pharmacies, banking and other everyday services are available throughout the surrounding Prabhadevi neighbourhood.',
      detail: 'EVERYDAY CONVENIENCE',
      icon: ShoppingBag
    },
    {
      id: '05',
      title: 'Shopping & Leisure',
      desc: 'Prabhadevi and neighbouring parts of Mumbai provide access to shopping, dining and recreational destinations.',
      detail: 'SHOPPING · DINING · LEISURE',
      icon: Store
    },
    {
      id: '06',
      title: 'The Neighbourhood',
      desc: 'Lloyds forms part of an established residential neighbourhood around Appasaheb Marathe Marg and Century Bazaar.',
      detail: 'PRABHADEVI · 400025',
      icon: Trees
    }
  ];

  return (
    <section id="around-lloyds" className="bg-[#F7F3EC] py-[64px] md:py-[88px]">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-[32px] lg:px-[48px] xl:px-[56px] w-full">
        
        <div className="max-w-[640px] mb-[44px] md:mb-[48px]">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_OFFSET}
            variants={sectionLabel}
          >
            <span className="block text-[11px] md:text-[12px] font-semibold tracking-[0.16em] uppercase text-[var(--color-muted)] mb-6">
              Around Lloyds
            </span>
          </motion.div>
          
          <div className="overflow-hidden mb-[24px]">
            <motion.h2 
              className="font-display text-[42px] md:text-[52px] leading-[1.05] text-[var(--color-ink)]"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : "100%" }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.EDITORIAL, delay: 0.1, ease: EASE_PRIMARY }}
              viewport={VIEWPORT_OFFSET}
            >
              Everything you need,<br />close to home.
            </motion.h2>
          </div>

          <motion.p 
            className="text-[16px] md:text-[17px] leading-[1.65] text-[#6F6B65] max-w-[560px]"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.STD, delay: 0.2, ease: EASE_PRIMARY }}
            viewport={VIEWPORT_OFFSET}
          >
            Lloyds is connected to the everyday essentials of city life, with access to transport, healthcare, education, shopping and neighbourhood conveniences.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[#F8F4ED] border border-[rgba(22,22,22,0.10)] rounded-[6px] overflow-hidden mb-[32px] md:mb-[40px]"
          initial={shouldReduceMotion ? { opacity: 0 } : "initial"}
          whileInView={shouldReduceMotion ? { opacity: 1, transition: { duration: DUR.STD } } : "whileInView"}
          viewport={VIEWPORT_OFFSET}
          variants={gridContainerVariants}
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={shouldReduceMotion ? {} : cellVariants}
              className={`group p-[32px] flex flex-col justify-between transition-colors duration-[200ms] ease-out hover:bg-[rgba(154,128,101,0.02)] min-h-[240px]
                ${idx !== 0 && idx !== 3 ? 'md:border-l border-[rgba(22,22,22,0.08)]' : ''} 
                ${idx > 2 ? 'lg:border-t border-[rgba(22,22,22,0.08)]' : ''}
                ${idx > 1 && idx < 3 ? 'md:border-t lg:border-t-0 border-[rgba(22,22,22,0.08)]' : ''}
                ${idx > 0 && idx < 2 ? 'border-t md:border-t-0 border-[rgba(22,22,22,0.08)]' : ''}
                ${idx > 1 ? 'border-t md:border-t-0 lg:border-t-0 border-[rgba(22,22,22,0.08)]' : ''}
              `}
              style={{
                borderTopWidth: idx > 0 ? '1px' : '0',
                borderLeftWidth: '0'
              }}
            >
              <style>{`
                @media (min-width: 768px) {
                  #around-lloyds .grid > div:nth-child(n+3) { border-top-width: 1px; }
                  #around-lloyds .grid > div:nth-child(2n) { border-left-width: 1px; }
                  #around-lloyds .grid > div:nth-child(2n+1) { border-left-width: 0; }
                }
                @media (min-width: 1024px) {
                  #around-lloyds .grid > div:nth-child(n+4) { border-top-width: 1px; }
                  #around-lloyds .grid > div:nth-child(n+1) { border-top-width: 0; }
                  #around-lloyds .grid > div:nth-child(n+4) { border-top-width: 1px; }
                  #around-lloyds .grid > div:nth-child(3n+2),
                  #around-lloyds .grid > div:nth-child(3n+3) { border-left-width: 1px; }
                  #around-lloyds .grid > div:nth-child(3n+1) { border-left-width: 0; }
                }
              `}</style>
              
              <div>
                <div className="flex items-start justify-end mb-[24px]">
                  <div className="text-[var(--color-muted)] transition-transform duration-[200ms] ease-out group-hover:text-[var(--color-bronze)] group-hover:-translate-y-[2px]">
                    <feature.icon strokeWidth={1.5} size={20} />
                  </div>
                </div>

                <h3 className="text-[13px] md:text-[14px] font-semibold tracking-[0.08em] uppercase text-[var(--color-ink)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[14px] md:text-[15px] leading-[1.6] text-[#6F6B65] mb-6 font-manrope">
                  {feature.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(22,22,22,0.06)] flex items-end justify-between mt-auto">
                <p className="text-[11px] md:text-[12px] leading-[1.5] font-medium text-[var(--color-muted)] whitespace-pre-line font-manrope uppercase tracking-[0.05em]">
                  {feature.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Wide Contextual Image */}
        <motion.div 
          className="w-full h-[240px] md:h-[300px] rounded-[4px] overflow-hidden bg-[var(--color-rule)]"
          initial={shouldReduceMotion ? { opacity: 0 } : clipRevealRight.initial}
          whileInView={shouldReduceMotion ? { opacity: 1, transition: { duration: DUR.STD } } : clipRevealRight.whileInView}
          viewport={VIEWPORT_OFFSET}
        >
          <img 
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            src="/society-images/lloyds5.webp" 
            alt="Lloyds Garden context view" 
            className="w-full h-full object-cover object-[center_55%]"
          />
        </motion.div>

      </div>
    </section>
  );
}
