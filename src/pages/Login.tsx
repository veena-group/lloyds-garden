import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface LoginResponse {
  role: 'SUPER_ADMIN' | 'SOCIETY_ADMIN' | 'MEMBER';
  [key: string]: unknown;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_DASHBOARD_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const body: ApiResponse<LoginResponse> = await res.json();

      if (!res.ok || !body.success) {
        throw new Error(body.message || 'Invalid username or password');
      }

      // Fragments (#...) are never sent to the server or logged, unlike query params.
      // encodeURIComponent guards against '+' / '/' / '=' in the base64 output being
      // misread (e.g. '+' as a literal space) when the callback parses the fragment.
      const encoded = encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(body.data)))));
      window.location.href = `${import.meta.env.VITE_DASHBOARD_APP_URL}/auth/callback#session=${encoded}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--color-main)]">
      
      {/* LEFT: Visual Area (approx 55%) */}
      <div className="hidden md:flex md:w-[55%] relative overflow-hidden bg-[var(--color-border-subtle)]">
        <img 
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          src="/society-images/lloyds3.webp" 
          alt="Lloyds Garden Identity" 
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
        <div className="absolute bottom-12 left-12 right-12 z-10">
          <p className="text-white/90 text-[18px] font-display max-w-md">
            "A residential community built around shared spaces, responsible management and everyday living."
          </p>
        </div>
      </div>

      {/* RIGHT: Login Area (approx 45%) */}
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

          <div className="mb-8">
            <span className="block text-[11px] font-semibold tracking-[0.16em] uppercase text-[var(--color-stone)] mb-3">
              Member Access
            </span>
            <h1 className="font-display text-[36px] md:text-[42px] leading-[1.1] text-[var(--color-ink)] mb-3">
              Welcome back.
            </h1>
            <p className="text-[15px] text-[var(--color-stone)] leading-relaxed">
              Sign in to access society documents, notices and member resources.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>

            {error && (
              <div className="px-4 py-3 rounded-[4px] bg-red-50 border border-red-200 text-[13px] text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className="block text-[13px] font-medium text-[var(--color-ink)]">Username</label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-[52px] md:h-[56px] px-4 bg-white border border-[rgba(20,20,20,0.16)] rounded-[4px] text-[15px] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-graphite)] focus:ring-1 focus:ring-[var(--color-graphite)] transition-all"
                placeholder="Enter your username"
              />
            </div>

            <div className="space-y-2 relative">
              <label htmlFor="password" className="block text-[13px] font-medium text-[var(--color-ink)]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-[52px] md:h-[56px] pl-4 pr-12 bg-white border border-[rgba(20,20,20,0.16)] rounded-[4px] text-[15px] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-graphite)] focus:ring-1 focus:ring-[var(--color-graphite)] transition-all"
                  placeholder="Enter your password"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-stone)] hover:text-[var(--color-ink)] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 pb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded-sm border-[rgba(20,20,20,0.16)] text-[var(--color-graphite)] focus:ring-[var(--color-graphite)]" 
                />
                <span className="text-[13px] text-[var(--color-ink)]">Remember me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-[13px] font-medium text-[var(--color-stone)] hover:text-[var(--color-ink)] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-[52px] md:h-[56px] bg-[var(--color-graphite)] text-[#F4F1EA] rounded-[4px] text-[14px] font-semibold tracking-wide transition-colors hover:bg-[var(--color-ink)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Signing In…' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center hidden md:block">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-wide text-[var(--color-stone)] hover:text-[var(--color-ink)] transition-colors group"
            >
              <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" /> Back to website
            </Link>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
