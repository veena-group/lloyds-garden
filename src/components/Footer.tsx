import { useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ruleDraw, DUR, VIEWPORT_OFFSET } from '../utils/animations';

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const [logoError, setLogoError] = useState(false);

  const staggerFooter: Variants = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  };

  const fadeItem: Variants = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1, transition: { duration: DUR.STD } }
  };

  return (
    <footer className="bg-[var(--color-charcoal)] text-[#FAF8F3] pt-[56px] md:pt-[64px] pb-[28px] md:pb-[36px]">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-[32px] lg:px-[48px] xl:px-[56px]">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-[48px] md:gap-[32px]"
          initial={shouldReduceMotion ? { opacity: 0 } : "initial"}
          whileInView={shouldReduceMotion ? { opacity: 1, transition: { duration: DUR.STD } } : "whileInView"}
          viewport={VIEWPORT_OFFSET}
          variants={staggerFooter}
        >
          
          {/* Brand */}
          <motion.div className="md:col-span-5" variants={shouldReduceMotion ? {} : fadeItem}>
            <Link to="/" className="inline-block mb-6">
              {logoError ? (
                <span className="font-display text-xl sm:text-2xl tracking-wide uppercase text-white">
                  LLOYDS <span className="text-xs sm:text-sm font-sans font-medium tracking-widest ml-1 opacity-80">CHSL</span>
                </span>
              ) : (
                <img 
                  src="/logo.webp" 
                  alt="Lloyds CHSL" 
                  onError={() => setLogoError(true)}
                  className="w-[145px] md:w-[165px] object-contain brightness-0 invert opacity-90"
                />
              )}
            </Link>
            <p className="text-[14px] text-white/60 max-w-[280px] leading-relaxed">
              Official website of Lloyds Garden Co-operative Housing Society Ltd.
            </p>
          </motion.div>

          {/* Public Navigation */}
          <motion.div className="md:col-span-2" variants={shouldReduceMotion ? {} : fadeItem}>
            <h4 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/40 mb-6">Explore</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-white/70">
              <li><a href="/#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/#committee" className="hover:text-white transition-colors">Committee</a></li>
              <li><a href="/#gallery" className="hover:text-white transition-colors">Gallery</a></li>
              <li><a href="/#events" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="/#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </motion.div>

          {/* Member Access */}
          <motion.div className="md:col-span-2" variants={shouldReduceMotion ? {} : fadeItem}>
            <h4 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/40 mb-6">Members</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-white/70">
              <li><Link to="/login" className="hover:text-[var(--color-bronze)] transition-colors">Member Login</Link></li>
            </ul>
          </motion.div>

          {/* Location */}
          <motion.div className="md:col-span-3" variants={shouldReduceMotion ? {} : fadeItem}>
            <h4 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/40 mb-6">Location</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-white/70">
              <li>
                <a 
                  href="https://maps.app.goo.gl/jbMopq4skxRQTiWLA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-bronze)] transition-colors inline-flex items-center gap-1 group"
                >
                  View on Google Maps
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </li>
            </ul>
          </motion.div>
          
        </motion.div>

        <div className="mt-[48px] md:mt-[56px] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-white/40 relative">
          {shouldReduceMotion ? (
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />
          ) : (
            <motion.div 
              className="absolute top-0 left-0 right-0 h-[1px] bg-white/10 origin-left"
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_OFFSET}
              variants={ruleDraw}
            />
          )}
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: DUR.STD, delay: 0.4 }}
            viewport={VIEWPORT_OFFSET}
          >
            &copy; 2026 Lloyds Garden Co-operative Housing Society Ltd. All Rights Reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
