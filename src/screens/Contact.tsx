"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import {
  Mail, Globe, ArrowRight, ArrowLeft, Check, Send,
  Palette, Code, Search, ShoppingBag, Brain, TrendingUp,
  MessageCircle, Smartphone, GitBranch, Stethoscope, Fingerprint, Layout,
  CheckSquare, Sparkles, Cloud, User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

declare global {
  interface Window { grecaptcha: any; }
}

const SERVICES = [
  { id: 'web-design',            label: 'Web Design',              icon: Palette },
  { id: 'ui-ux',                 label: 'UI / UX Design',          icon: Layout },
  { id: 'branding',              label: 'Branding',                icon: Fingerprint },
  { id: 'web-development',       label: 'Web Development',         icon: Code },
  { id: 'seo',                   label: 'SEO Optimization',        icon: Search },
  { id: 'ecommerce',             label: 'eCommerce',               icon: ShoppingBag },
  { id: 'ai-solutions',          label: 'AI Solutions',            icon: Brain },
  { id: 'performance-marketing', label: 'Performance Marketing',   icon: TrendingUp },
  { id: 'social-ugc',            label: 'Social Media & UGC',      icon: MessageCircle },
  { id: 'geo',                   label: 'GEO Optimization',        icon: Sparkles },
  { id: 'aeo',                   label: 'AEO Optimization',        icon: CheckSquare },
  { id: 'mobile',                label: 'Mobile App',              icon: Smartphone },
  { id: 'api',                   label: 'API & Integrations',      icon: GitBranch },
  { id: 'cloud',                 label: 'Cloud & Infrastructure',  icon: Cloud },
  { id: 'telehealth',            label: 'Telehealth Platform',     icon: Stethoscope },
];

const BUDGETS = [
  { id: 'under-2k',   label: 'Under $2,000',    sub: 'Starter projects' },
  { id: '2k-5k',      label: '$2,000 – $5,000', sub: 'Small – medium scope' },
  { id: '5k-15k',     label: '$5,000 – $15,000',sub: 'Mid-scale builds' },
  { id: '15k-plus',   label: '$15,000+',         sub: 'Enterprise & complex' },
];

const TIMELINES = [
  { id: 'asap',       label: 'ASAP',             sub: 'We need this yesterday' },
  { id: '1-3mo',      label: '1 – 3 months',     sub: 'Near-term launch' },
  { id: '3-6mo',      label: '3 – 6 months',     sub: 'Planned rollout' },
  { id: 'flexible',   label: 'Flexible',          sub: 'No hard deadline' },
];

const STEPS = ['Services', 'Budget', 'Timeline', 'About You', 'Message'];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

const Contact = () => {
  const { language } = useLanguage();
  const { toast } = useToast();

  const [step, setStep]           = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone]           = useState(false);

  const [services,  setServices]  = useState<string[]>([]);
  const [budget,    setBudget]    = useState('');
  const [timeline,  setTimeline]  = useState('');
  const [name,      setName]      = useState('');
  const [email,     setEmail]     = useState('');
  const [website,   setWebsite]   = useState('');
  const [message,   setMessage]   = useState('');

  const captchaRef   = useRef<HTMLDivElement>(null);
  const widgetIdRef  = useRef<number | null>(null);
  const onResolvedRef = useRef<(token: string) => void>(() => {});

  const canNext = () => {
    if (step === 0) return services.length > 0;
    if (step === 1) return !!budget;
    if (step === 2) return !!timeline;
    if (step === 3) return name.trim() !== '' && /\S+@\S+\.\S+/.test(email);
    return true;
  };

  const go = (delta: number) => {
    setDirection(delta);
    setStep(s => s + delta);
  };

  const submitForm = async (token: string) => {
    try {
      setIsSubmitting(true);
      const selectedLabels = services.map(id => SERVICES.find(s => s.id === id)?.label).join(', ');
      const budgetLabel    = BUDGETS.find(b => b.id === budget)?.label   || budget;
      const timelineLabel  = TIMELINES.find(t => t.id === timeline)?.label || timeline;

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMIN_ID!,
        {
          from_name:  name,
          from_email: email,
          name,
          email,
          reply_to:   email,
          website:    website || '—',
          service:    selectedLabels,
          budget:     budgetLabel,
          timeline:   timelineLabel,
          message:    message || '—',
          'g-recaptcha-response': token,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      try {
        if (process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_USER_ID) {
          await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_USER_ID!,
            { to_name: name, to_email: email, name, email, 'g-recaptcha-response': token },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
          );
        }
      } catch (_) {}

      setDone(true);
    } catch (err: any) {
      toast({
        title: 'Error sending message',
        description: err?.text || err?.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    onResolvedRef.current = submitForm;
  });

  useEffect(() => {
    let mounted = true;
    const init = () => {
      if (!mounted || !window.grecaptcha || !captchaRef.current) return;
      window.grecaptcha.ready(() => {
        if (!mounted || !captchaRef.current || widgetIdRef.current !== null) return;
        try {
          captchaRef.current.innerHTML = '';
          const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6Lca_2YtAAAAALvhEyU47A1Unoo3oPCniK-DcnPI';
          widgetIdRef.current = window.grecaptcha.render(captchaRef.current, {
            sitekey: key,
            size: 'invisible',
            callback: (token: string) => { if (mounted) onResolvedRef.current(token); },
            'expired-callback': () => { if (widgetIdRef.current !== null) window.grecaptcha.reset(widgetIdRef.current); },
          });
        } catch (_) {}
      });
    };
    if (window.grecaptcha?.render) init();
    else {
      const iv = setInterval(() => { if (window.grecaptcha?.render) { clearInterval(iv); init(); } }, 500);
      return () => { mounted = false; clearInterval(iv); };
    }
    return () => { mounted = false; };
  }, []);

  const handleSubmit = () => {
    if (widgetIdRef.current !== null && window.grecaptcha) {
      window.grecaptcha.execute(widgetIdRef.current);
    }
  };

  const toggleService = (id: string) =>
    setServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">

      {/* ── Progress bar ── */}
      <div className="fixed top-0 left-0 right-0 z-40 h-[3px] bg-white/5">
        <motion.div
          className="h-full bg-white"
          animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </div>

      {/* ── Step label row ── */}
      {!done && (
        <div className="fixed top-0 left-0 right-0 z-30 flex justify-center pt-6 pointer-events-none">
          <div className="flex items-center gap-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <span className={cn(
                  'text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300',
                  i === step ? 'text-white' : i < step ? 'text-white/40' : 'text-white/15'
                )}>
                  {s}
                </span>
                {i < STEPS.length - 1 && <span className="w-4 h-px bg-white/10" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-12 min-h-screen">
        <AnimatePresence mode="wait" custom={direction}>
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-lg"
            >
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-sans font-semibold tracking-tight mb-4">
                We got it.
              </h2>
              <p className="text-white/50 text-lg leading-relaxed">
                Thanks {name.split(' ')[0]} — we'll review your brief and reach out within 24 hours at <span className="text-white/80">{email}</span>.
              </p>
            </motion.div>

          ) : step === 0 ? (
            <motion.div key="step0" custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.35, ease: [0.25,0.1,0.25,1] }}
              className="w-full max-w-4xl"
            >
              <QuizHeading step={1} total={STEPS.length}
                title="What can we help you with?"
                sub="Pick everything that applies — no limit."
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-10">
                {SERVICES.map(svc => {
                  const Icon = svc.icon;
                  const active = services.includes(svc.id);
                  return (
                    <button
                      key={svc.id}
                      onClick={() => toggleService(svc.id)}
                      className={cn(
                        'group relative flex flex-col items-center gap-3 p-4 rounded-2xl border text-center transition-all duration-200',
                        active
                          ? 'bg-white text-black border-white'
                          : 'bg-white/[0.03] border-white/8 hover:border-white/20 hover:bg-white/[0.06]'
                      )}
                    >
                      {active && (
                        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-black/20 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      )}
                      <Icon className={cn('w-5 h-5', active ? 'text-black' : 'text-white/50 group-hover:text-white/80')} />
                      <span className="text-xs font-semibold leading-tight">{svc.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

          ) : step === 1 ? (
            <motion.div key="step1" custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.35, ease: [0.25,0.1,0.25,1] }}
              className="w-full max-w-2xl"
            >
              <QuizHeading step={2} total={STEPS.length}
                title="What's your budget?"
                sub="This helps us scope the right solution for you."
              />
              <div className="grid sm:grid-cols-2 gap-4 mt-10">
                {BUDGETS.map(b => (
                  <OptionCard key={b.id} label={b.label} sub={b.sub}
                    active={budget === b.id}
                    onClick={() => { setBudget(b.id); }}
                  />
                ))}
              </div>
            </motion.div>

          ) : step === 2 ? (
            <motion.div key="step2" custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.35, ease: [0.25,0.1,0.25,1] }}
              className="w-full max-w-2xl"
            >
              <QuizHeading step={3} total={STEPS.length}
                title="When do you need this?"
                sub="We'll plan around your timeline."
              />
              <div className="grid sm:grid-cols-2 gap-4 mt-10">
                {TIMELINES.map(t => (
                  <OptionCard key={t.id} label={t.label} sub={t.sub}
                    active={timeline === t.id}
                    onClick={() => { setTimeline(t.id); }}
                  />
                ))}
              </div>
            </motion.div>

          ) : step === 3 ? (
            <motion.div key="step3" custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.35, ease: [0.25,0.1,0.25,1] }}
              className="w-full max-w-lg"
            >
              <QuizHeading step={4} total={STEPS.length}
                title="Tell us about yourself"
                sub="So we know who we're talking to."
              />
              <div className="mt-10 space-y-5">
                <QuizInput icon={<User className="w-4 h-4" />} placeholder="Your name" value={name} onChange={setName} />
                <QuizInput icon={<Mail className="w-4 h-4" />} placeholder="Email address" type="email" value={email} onChange={setEmail} />
                <QuizInput icon={<Globe className="w-4 h-4" />} placeholder="Website (optional)" value={website} onChange={setWebsite} />
              </div>
            </motion.div>

          ) : (
            <motion.div key="step4" custom={direction} variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.35, ease: [0.25,0.1,0.25,1] }}
              className="w-full max-w-lg"
            >
              <QuizHeading step={5} total={STEPS.length}
                title="Anything else?"
                sub="Share any extra context, goals, or details."
              />
              <div className="mt-10">
                <Textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us more about your project… (optional)"
                  className="bg-white/[0.04] border-white/8 focus-visible:ring-0 focus-visible:border-white/25 rounded-2xl min-h-[180px] text-white placeholder:text-white/25 resize-none text-base p-5"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Navigation buttons ── */}
        {!done && (
          <div className="flex items-center gap-4 mt-12">
            {step > 0 && (
              <button
                onClick={() => go(-1)}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/25 text-sm font-medium transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => go(1)}
                disabled={!canNext()}
                className={cn(
                  'flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold transition-all',
                  canNext()
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                )}
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Sending…' : 'Send Brief'} <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Email contact strip ── */}
      <div className="border-t border-white/5 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          {[
            { label: 'Email Us', value: 'contact@belkdigital.com' },
            { label: 'Business Inquiry', value: 'contact@belkdigital.com' },
          ].map(item => (
            <a key={item.label} href={`mailto:${item.value}`}
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Mail className="w-3.5 h-3.5 text-white/40 group-hover:text-white/70 transition-colors" />
              </div>
              <div>
                <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/25">{item.label}</span>
                <span className="block text-sm text-white/60 group-hover:text-white transition-colors">{item.value}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* hidden reCAPTCHA */}
      <div className="hidden"><div ref={captchaRef} /></div>
    </div>
  );
};

function QuizHeading({ step, total, title, sub }: { step: number; total: number; title: string; sub: string }) {
  return (
    <div className="text-center">
      <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/25 mb-4 block">
        {String(step).padStart(2,'0')} / {String(total).padStart(2,'0')}
      </span>
      <h2 className="text-3xl md:text-5xl font-sans font-semibold tracking-tight text-white mb-3">{title}</h2>
      <p className="text-white/40 text-base">{sub}</p>
    </div>
  );
}

function OptionCard({ label, sub, active, onClick }: { label: string; sub: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-start gap-1 p-6 rounded-2xl border text-left transition-all duration-200',
        active
          ? 'bg-white text-black border-white'
          : 'bg-white/[0.03] border-white/8 hover:border-white/20 hover:bg-white/[0.06]'
      )}
    >
      {active && (
        <span className="absolute top-4 right-4 w-5 h-5 rounded-full bg-black/15 flex items-center justify-center">
          <Check className="w-3 h-3" />
        </span>
      )}
      <span className="font-semibold text-base">{label}</span>
      <span className={cn('text-sm', active ? 'text-black/50' : 'text-white/35')}>{sub}</span>
    </button>
  );
}

function QuizInput({ icon, placeholder, value, onChange, type = 'text' }: {
  icon: React.ReactNode; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string;
}) {
  return (
    <div className="relative group/input">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within/input:text-white/60 transition-colors">
        {icon}
      </span>
      <Input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-11 bg-white/[0.04] border-white/8 focus-visible:ring-0 focus-visible:border-white/25 rounded-2xl h-14 text-white placeholder:text-white/25 text-base"
      />
    </div>
  );
}

export default Contact;
