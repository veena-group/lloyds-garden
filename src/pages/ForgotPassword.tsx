import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ForgotPassword() {
  const [status, setStatus] = useState<'default' | 'loading' | 'success' | 'error'>('default');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate frontend state for demo purposes only
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--color-main)]">
      
      {/* LEFT: Visual Area (approx 55%) */}
      <div className="hidden md:flex md:w-[55%] relative overflow-hidden bg-[var(--color-border-subtle)]">
        <img 
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          src="/society-images/lloyds2.webp" 
          alt="Lloyds Garden Architecture" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-12 left-12 z-10">
          <Link to="/" className="inline-block">
            <span className="font-display text-3xl tracking-wide uppercase text-white">
              LLOYDS <span className="text-sm font-sans font-medium tracking-widest ml-1 text-white/80">CHSL</span>
            </span>
          </Link>
        </div>
      </div>

      {/* RIGHT: Form Area (approx 45%) */}
      <div className="w-full md:w-[45%] min-h-screen flex items-center justify-center p-[20px] md:p-[40px] lg:p-[64px]">
        <motion.div 
          className="w-full max-w-[420px]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        >
          {/* Mobile Back & Logo */}
          <div className="md:hidden mb-12">
            <Link to="/" className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-wide text-[var(--color-stone)] hover:text-[var(--color-ink)] transition-colors mb-6">
              <ArrowLeft size={16} /> Back to website
            </Link>
            <span className="block font-display text-3xl tracking-wide uppercase text-[var(--color-ink)]">
              LLOYDS <span className="text-sm font-sans font-medium tracking-widest ml-1 text-[var(--color-stone)]">CHSL</span>
            </span>
          </div>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center md:text-left"
            >
              <h1 className="font-display text-[32px] md:text-[36px] leading-[1.1] text-[var(--color-ink)] mb-4">
                Check your email
              </h1>
              <p className="text-[15px] text-[var(--color-stone)] leading-relaxed mb-8">
                If an account exists for the provided email or username, we have sent password reset instructions.
              </p>
              <Link 
                to="/login"
                className="inline-flex justify-center items-center w-full h-[52px] md:h-[56px] bg-[var(--color-graphite)] text-[#F4F1EA] rounded-[4px] text-[14px] font-semibold tracking-wide transition-colors hover:bg-[var(--color-ink)]"
              >
                Return to Sign In
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="mb-8">
                <span className="block text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--color-stone)] mb-3">
                  Account Recovery
                </span>
                <h1 className="font-display text-[36px] md:text-[42px] leading-[1.1] text-[var(--color-ink)] mb-3">
                  Forgot your password?
                </h1>
                <p className="text-[15px] text-[var(--color-stone)] leading-relaxed">
                  Enter your registered username or email to continue.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="identifier" className="block text-[13px] font-medium text-[var(--color-ink)]">Username or Email</label>
                  <input 
                    type="text" 
                    id="identifier" 
                    className={`w-full h-[52px] md:h-[56px] px-4 bg-white border rounded-[4px] text-[15px] text-[var(--color-ink)] focus:outline-none focus:ring-1 transition-all ${
                      status === 'error' 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                        : 'border-[rgba(20,20,20,0.16)] focus:border-[var(--color-graphite)] focus:ring-[var(--color-graphite)]'
                    }`}
                    placeholder="Enter username or email"
                  />
                  {status === 'error' && (
                    <p className="text-[12px] text-red-500 mt-1">Please enter a valid username or email.</p>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full h-[52px] md:h-[56px] bg-[var(--color-graphite)] text-[#F4F1EA] rounded-[4px] text-[14px] font-semibold tracking-wide transition-colors hover:bg-[var(--color-ink)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}

          <div className="mt-8 text-center md:text-left">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-wide text-[var(--color-stone)] hover:text-[var(--color-ink)] transition-colors group"
            >
              <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" /> Back to Sign In
            </Link>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
