import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { committeeData } from '../../data/committee';
import { sectionLabel, ruleDraw, DUR, EASE_PRIMARY, VIEWPORT_OFFSET } from '../../utils/animations';

export default function CommitteeSection() {
  const primaryMembers = committeeData.filter(m => m.isPrimary);
  const regularMembers = committeeData.filter(m => !m.isPrimary);
  const shouldReduceMotion = useReducedMotion();

  const staggerTable: Variants = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  };

  const rowFadeIn: Variants = {
    initial: { opacity: 0.15, x: -6 },
    whileInView: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: DUR.STD, ease: EASE_PRIMARY } 
    }
  };

  const headerLabelAnim: Variants = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1, transition: { duration: DUR.STD } }
  };

  return (
    <section id="committee" className="py-[64px] md:py-[88px] bg-[var(--color-paper)]">
      <div className="max-w-[1320px] mx-auto px-[20px] md:px-[32px] lg:px-[48px] xl:px-[56px] w-full">
        
        <div className="mb-[48px] md:mb-[72px]">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_OFFSET}
            variants={sectionLabel}
          >
            <span className="block text-[11px] md:text-[12px] font-semibold tracking-[0.16em] uppercase text-[var(--color-muted)] mb-6">
              Administration
            </span>
          </motion.div>
          <motion.h2 
            className="font-display text-[42px] md:text-[52px] leading-[1.05] text-[var(--color-ink)] mb-6"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.STD, delay: 0.1, ease: EASE_PRIMARY }}
            viewport={VIEWPORT_OFFSET}
          >
            Managing Committee
          </motion.h2>
        </div>

        {/* Unified Premium Directory Panel */}
        <div className="bg-[#FAF8F3] border border-[rgba(22,22,22,0.08)] rounded-[4px] overflow-hidden">
          
          <motion.div 
            className="w-full"
            initial={shouldReduceMotion ? { opacity: 0 } : "initial"}
            whileInView={shouldReduceMotion ? { opacity: 1, transition: { duration: DUR.STD } } : "whileInView"}
            viewport={VIEWPORT_OFFSET}
            variants={staggerTable}
          >
            <table className="w-full text-left border-collapse block sm:table">
              
              {/* Header */}
              <thead className="block sm:table-header-group relative">
                {!shouldReduceMotion && (
                  <motion.tr 
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-[rgba(22,22,22,0.08)] block sm:table-row" 
                    variants={ruleDraw}
                  />
                )}
                <tr className="block sm:table-row border-b border-[rgba(22,22,22,0.08)] sm:border-none">
                  <motion.th variants={shouldReduceMotion ? {} : headerLabelAnim} className="hidden sm:table-cell py-5 px-6 lg:px-10 text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--color-muted)] w-[10%]">
                    No.
                  </motion.th>
                  <motion.th variants={shouldReduceMotion ? {} : headerLabelAnim} className="block sm:table-cell py-4 sm:py-5 px-5 sm:px-6 lg:px-10 text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--color-muted)] sm:w-[55%]">
                    <span className="sm:hidden">Committee Members</span>
                    <span className="hidden sm:inline">Name</span>
                  </motion.th>
                  <motion.th variants={shouldReduceMotion ? {} : headerLabelAnim} className="hidden sm:table-cell py-5 px-6 lg:px-10 text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--color-muted)] w-[35%]">
                    Designation
                  </motion.th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="block sm:table-row-group">
                
                {/* Office Bearers */}
                {primaryMembers.map((member, idx) => (
                  <motion.tr 
                    key={member.id} 
                    variants={shouldReduceMotion ? {} : rowFadeIn}
                    className="block sm:table-row border-b border-[rgba(22,22,22,0.06)] group hover:bg-white/40 transition-colors duration-200 relative"
                  >
                    <td className="hidden sm:table-cell py-5 px-6 lg:px-10 text-[12px] font-medium text-[var(--color-muted)]">
                      {String(idx + 1).padStart(2, '0')}
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-bronze)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </td>
                    <td className="block sm:table-cell py-4 px-5 sm:px-6 lg:px-10">
                      <div className="flex sm:hidden justify-between items-baseline mb-1">
                        <span className="text-[11px] font-medium text-[var(--color-muted)]">{String(idx + 1).padStart(2, '0')}</span>
                        <span className="text-[12px] font-medium text-[var(--color-bronze)]">{member.role}</span>
                      </div>
                      <span className="text-[15px] sm:text-[16px] font-medium text-[var(--color-ink)] block">
                        {member.name}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell py-5 px-6 lg:px-10 text-[14px] text-[var(--color-ink)]">
                      {member.role}
                    </td>
                  </motion.tr>
                ))}

                {/* Group Separator */}
                <motion.tr 
                  variants={shouldReduceMotion ? {} : headerLabelAnim}
                  className="block sm:table-row bg-[rgba(22,22,22,0.02)] border-b border-[rgba(22,22,22,0.06)]"
                >
                  <td colSpan={3} className="block sm:table-cell py-3 px-5 sm:px-6 lg:px-10 text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-muted)]">
                    Committee Members
                  </td>
                </motion.tr>

                {/* Regular Members */}
                {regularMembers.map((member, idx) => (
                  <motion.tr 
                    key={member.id} 
                    variants={shouldReduceMotion ? {} : rowFadeIn}
                    className="block sm:table-row border-b border-[rgba(22,22,22,0.04)] last:border-b-0 hover:bg-white/40 transition-colors duration-200"
                  >
                    <td className="hidden sm:table-cell py-4 px-6 lg:px-10 text-[12px] font-medium text-[var(--color-muted)]">
                      {String(primaryMembers.length + idx + 1).padStart(2, '0')}
                    </td>
                    <td className="block sm:table-cell py-4 px-5 sm:px-6 lg:px-10">
                      <div className="flex sm:hidden justify-between items-baseline mb-1">
                        <span className="text-[11px] font-medium text-[var(--color-muted)]">
                          {String(primaryMembers.length + idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[12px] font-medium text-[var(--color-muted)]">{member.role}</span>
                      </div>
                      <span className="text-[15px] sm:text-[15px] font-medium text-[var(--color-ink)] block">
                        {member.name}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell py-4 px-6 lg:px-10 text-[14px] text-[var(--color-muted)]">
                      {member.role}
                    </td>
                  </motion.tr>
                ))}

              </tbody>
            </table>
          </motion.div>

          {/* Committee Note (Footer of the panel) */}
          <motion.div 
            className="border-t border-[rgba(22,22,22,0.08)] bg-white px-5 sm:px-6 lg:px-10 py-8 lg:py-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: DUR.STD, delay: 0.2 } }}
            viewport={VIEWPORT_OFFSET}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="block text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-muted)] mb-4">
                  From the Committee
                </span>
                <h3 className="font-display text-[24px] md:text-[28px] leading-[1.15] text-[var(--color-ink)]">
                  Working together for our community.
                </h3>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 text-[14px] md:text-[15px] leading-[1.65] text-[#6F6B65] space-y-4">
                <p>
                  A well-functioning society is built through communication, participation and cooperation among its members.
                </p>
                <p>
                  The Managing Committee remains committed to supporting an organised and responsible community environment at Lloyds and encourages members to stay connected through the society’s official channels.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
