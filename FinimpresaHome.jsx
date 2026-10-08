import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  CheckCircle2,
  Coins,
  Handshake,
  Landmark,
  Loader2,
  LineChart,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Users,
  X,
  AlertCircle,
  Compass,
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
   Finimpresa · Homepage
   Brand: primario #102936 · secondario #1D4E67 · accento #FFE400 · accento 2 #FFBF00
   Contenuti: SOLO informazioni presenti su finimpresa.it (verificate a ottobre 2026).
   ────────────────────────────────────────────────────────────────────────── */

const LOGO_SRC = '/logo-small-alpha-1.png';
const PHONE_LABEL = '059 251760';
const PHONE_HREF = 'tel:+39059251760';
const EMAIL = 'info@finimpresa.it';
const ADDRESS_LINE_1 = 'Via Malavolti 27';
const ADDRESS_LINE_2 = '41122 Modena';
const MAPS_HREF = 'https://www.google.com/maps/search/?api=1&query=Via+Malavolti+27+41122+Modena';
const PRIVACY_HREF = 'https://finimpresa.it/privacy-policy/';
const COOKIE_HREF = 'https://finimpresa.it/cookie-policy/';

/**
 * PUNTO DI INTEGRAZIONE DEL MODULO
 * Inserisci qui l'URL dell'endpoint che riceve le richieste (es. Formspree, una funzione serverless, il tuo CRM).
 * Riceve un POST JSON: { nome, azienda, email, telefono, area, messaggio, consenso }.
 * Finché è vuoto, il modulo NON finge di inviare: apre il programma di posta dell'utente con la richiesta
 * già compilata e indirizzata a info@finimpresa.it, e lo dichiara nel messaggio di conferma.
 */
const FORM_ENDPOINT = '';

const NAV = [
  { href: '#servizi', label: 'Servizi' },
  { href: '#per-chi', label: 'Per chi lavoriamo' },
  { href: '#metodo', label: 'Metodo' },
  { href: '#contatti', label: 'Contatti' },
];

const SERVICES = [
  {
    n: '01',
    icon: Coins,
    title: 'Finanza agevolata',
    benefit:
      'Individuiamo i bandi e gli incentivi giusti per i tuoi investimenti, scegliendo le opportunità più vantaggiose, anche cumulabili.',
    points: [
      'Bandi europei, statali, regionali e locali',
      'Contributi a fondo perduto e in conto interessi',
      'Studio e certificazione degli incentivi fiscali',
    ],
    href: 'https://finimpresa.it/servizi/incentivi-e-contributi/',
    featured: true,
  },
  {
    n: '02',
    icon: LineChart,
    title: 'Consulenza aziendale',
    benefit:
      'Un consulente del credito al tuo fianco, anche se in azienda non c’è un responsabile finanziario. Le regole del credito lette a favore dell’impresa.',
    points: [
      'Rating, Basilea 2 e 3, Fondo Centrale di Garanzia',
      'Rapporti con le banche e pianificazione economico-finanziaria',
      'Gestione e rendicontazione degli incentivi pubblici',
    ],
    href: 'https://finimpresa.it/servizi/consulenza-sul-credito/',
  },
  {
    n: '03',
    icon: Landmark,
    title: 'Accesso al credito',
    benefit:
      'Confrontiamo le condizioni di mercato per proporti la soluzione adatta al tuo fabbisogno reale. Risparmi tempo e costi.',
    points: [
      'Convenzioni con i principali istituti di credito',
      'Società di leasing e consorzi fidi',
      'Condizioni di mercato a confronto in tempo reale',
    ],
    href: 'https://finimpresa.it/servizi/mediazione-creditizia/',
  },
];

const PROFILES = [
  'Titolari e amministratori che vogliono finanziare investimenti e crescita.',
  'Imprese senza un responsabile finanziario interno, che cercano un consulente di cui fidarsi.',
  'Responsabili amministrativi che hanno bisogno di un solo interlocutore per banche, leasing e consorzi fidi.',
];

const STEPS = [
  { icon: Compass, title: 'Partiamo dal tuo progetto', text: 'Ascoltiamo i tuoi piani di investimento e di crescita.' },
  { icon: Coins, title: 'Cerchiamo le agevolazioni', text: 'Individuiamo gli incentivi pubblici e privati applicabili.' },
  { icon: Handshake, title: 'Confrontiamo il credito', text: 'Mettiamo a confronto le condizioni di banche, leasing e consorzi fidi.' },
  { icon: ShieldCheck, title: 'Ti affianchiamo', text: 'Ti seguiamo nella pratica, anche nella rendicontazione dei fondi.' },
];

const AREAS = ['Finanza agevolata', 'Consulenza aziendale', 'Accesso al credito', 'Non lo so ancora, aiutatemi a capirlo'];

/* ── CSS di supporto: keyframe, reveal, focus, reduced motion ───────────── */
const CSS = `
html { scroll-behavior: smooth; }
.fi { font-family: 'Josefin Sans', system-ui, -apple-system, 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased; }
.fi :focus-visible { outline: 3px solid #1D4E67; outline-offset: 3px; border-radius: 12px; }
.fi .fi-dark :focus-visible { outline-color: #FFE400; }
.fi-rv { opacity: 0; transform: translate3d(0, 28px, 0); transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); transition-delay: var(--d, 0ms); will-change: opacity, transform; }
.fi-rv[data-in="true"] { opacity: 1; transform: none; }
@keyframes fi-drift { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-14px,0); } }
@keyframes fi-sheen { 0% { transform: translateX(-120%); } 100% { transform: translateX(220%); } }
.fi-float { animation: fi-drift 9s ease-in-out infinite; }
.fi-float-b { animation: fi-drift 11s ease-in-out -4s infinite; }
.fi-btn-sheen::after { content: ''; position: absolute; inset: 0; background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,.55) 50%, transparent 70%); transform: translateX(-120%); }
.fi-btn-sheen:hover::after { animation: fi-sheen .9s ease; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .fi-rv { opacity: 1 !important; transform: none !important; transition: none !important; }
  .fi-float, .fi-float-b { animation: none !important; }
  .fi-btn-sheen:hover::after { animation: none !important; }
  .fi * { transition-duration: .01ms !important; }
}
`;

/* ── Utilità ───────────────────────────────────────────────────────────── */
function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} data-in={inView} className={`fi-rv ${className}`} style={{ '--d': `${delay}ms` }}>
      {children}
    </Tag>
  );
}

const Eyebrow = ({ children, dark = false }) => (
  <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${dark ? 'text-[#FFE400]' : 'text-[#1D4E67]'}`}>
    {children}
  </p>
);

const GradText = ({ children }) => (
  <span className="bg-gradient-to-r from-[#FFE400] to-[#FFBF00] bg-clip-text text-transparent">{children}</span>
);

/* Motivo distintivo: nastri diagonali giallo-ambra, ripresi dal logo */
function Ribbons({ className = '', id = 'a' }) {
  return (
    <svg viewBox="0 0 640 640" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={`rb-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE400" />
          <stop offset="1" stopColor="#FFBF00" />
        </linearGradient>
        <linearGradient id={`rb2-${id}`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFBF00" stopOpacity=".9" />
          <stop offset="1" stopColor="#FFE400" stopOpacity=".15" />
        </linearGradient>
      </defs>
      <g transform="rotate(-32 320 320)">
        <rect x="-60" y="150" width="760" height="64" rx="32" fill={`url(#rb-${id})`} opacity=".95" />
        <rect x="-60" y="244" width="760" height="40" rx="20" fill={`url(#rb2-${id})`} />
        <rect x="-60" y="314" width="760" height="64" rx="32" fill={`url(#rb-${id})`} opacity=".55" />
        <rect x="-60" y="408" width="760" height="14" rx="7" fill="#FFE400" opacity=".35" />
        <rect x="-60" y="450" width="760" height="2" fill="#fff" opacity=".25" />
        <rect x="-60" y="110" width="760" height="2" fill="#fff" opacity=".2" />
      </g>
    </svg>
  );
}

/* Taglio obliquo tra sezioni */
const Slant = ({ fill = '#fff', flip = false, className = '' }) => (
  <svg
    viewBox="0 0 100 10"
    preserveAspectRatio="none"
    aria-hidden="true"
    className={`block h-8 w-full sm:h-12 lg:h-16 ${className}`}
  >
    <polygon points={flip ? '0,0 100,10 0,10' : '0,10 100,0 100,10'} fill={fill} />
  </svg>
);

const PrimaryCta = ({ href, children, glow = false, className = '' }) => (
  <a
    href={href}
    className={`fi-btn-sheen group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#FFE400] px-8 py-3 text-base font-semibold text-[#102936] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFBF00] active:translate-y-0 ${
      glow ? 'shadow-[0_0_44px_-6px_rgba(255,228,0,0.5)]' : 'shadow-[0_12px_30px_-12px_rgba(16,41,54,0.45)]'
    } ${className}`}
  >
    <span className="relative z-10">{children}</span>
    <ArrowRight size={20} strokeWidth={1.5} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
  </a>
);

/* ── Header ────────────────────────────────────────────────────────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 z-50 px-3 transition-all duration-500 sm:px-6 ${scrolled ? 'top-2' : 'top-4'}`}>
      <div
        className={`mx-auto max-w-7xl rounded-full border border-[#102936]/10 transition-all duration-500 ${
          scrolled
            ? 'bg-white shadow-[0_18px_50px_-18px_rgba(16,41,54,0.35)]'
            : 'bg-white/[0.97] shadow-[0_24px_70px_-24px_rgba(16,41,54,0.4)] backdrop-blur-md'
        } ${open ? 'rounded-b-none rounded-t-[28px] sm:rounded-full' : ''}`}
      >
        <div className={`flex items-center justify-between gap-4 pl-5 pr-2 transition-all duration-500 lg:pl-8 ${scrolled ? 'py-1.5' : 'py-2.5'}`}>
          <a href="#top" aria-label="Finimpresa, torna all’inizio" className="shrink-0">
            <img
              src={LOGO_SRC}
              alt="Finimpresa"
              width="100"
              height="40"
              className={`w-auto transition-all duration-500 ${scrolled ? 'h-8' : 'h-10'}`}
            />
          </a>

          <nav aria-label="Principale" className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-base font-semibold text-[#102936] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-[#FFBF00] after:transition-transform after:duration-300 hover:text-[#1D4E67] hover:after:scale-x-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={PHONE_HREF}
              className="hidden items-center gap-2 rounded-full px-4 py-2 text-base font-semibold text-[#102936] transition-colors hover:bg-[#102936]/5 md:inline-flex"
              aria-label={`Chiama lo 059 251760`}
            >
              <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
              {PHONE_LABEL}
            </a>
            <a
              href="#contatti"
              className="hidden min-h-11 items-center rounded-full bg-[#FFE400] px-6 text-base font-semibold text-[#102936] transition duration-300 hover:bg-[#FFBF00] sm:inline-flex"
            >
              Richiedi una consulenza
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#102936] text-white transition-colors hover:bg-[#1D4E67] lg:hidden"
            >
              {open ? <X size={20} strokeWidth={1.5} aria-hidden="true" /> : <Menu size={20} strokeWidth={1.5} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          id="menu-mobile"
          className="mx-auto max-w-7xl rounded-b-[28px] border border-t-0 border-[#102936]/10 bg-white p-4 shadow-[0_30px_70px_-20px_rgba(16,41,54,0.4)] lg:hidden"
        >
          <nav aria-label="Menu mobile" className="flex flex-col">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-4 text-lg font-semibold text-[#102936] transition-colors hover:bg-[#102936]/5"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-2 grid gap-3 border-t border-[#102936]/10 pt-4 sm:grid-cols-2">
            <a
              href={PHONE_HREF}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#102936]/20 px-6 text-base font-semibold text-[#102936]"
            >
              <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
              {PHONE_LABEL}
            </a>
            <a
              href="#contatti"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#FFE400] px-6 text-base font-semibold text-[#102936]"
            >
              Richiedi una consulenza
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  const ribbonRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.min(window.scrollY, 900);
      if (ribbonRef.current) ribbonRef.current.style.transform = `translate3d(0, ${y * 0.14}px, 0)`;
      if (glowRef.current) glowRef.current.style.transform = `translate3d(0, ${y * -0.08}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const areas = [
    { icon: Coins, title: 'Finanza agevolata', text: 'Bandi europei, statali, regionali e locali' },
    { icon: LineChart, title: 'Consulenza aziendale', text: 'Credito, rating e rapporti con le banche' },
    { icon: Landmark, title: 'Accesso al credito', text: 'Banche, leasing e consorzi fidi a confronto' },
  ];

  const trust = [
    { icon: Users, label: 'Oltre 20 anni al fianco delle PMI' },
    { icon: ShieldCheck, label: 'Mediatore creditizio, iscrizione OAM M306' },
    { icon: Building2, label: 'In collaborazione con CNA Modena' },
  ];

  return (
    <section id="top" className="fi-dark relative isolate overflow-hidden bg-[#102936] text-white">
      {/* sfondo: gradienti e nastri */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_85%_20%,#1D4E67_0%,#102936_62%)]" />
        <div ref={glowRef} className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-[#1D4E67]/40 blur-[120px]" />
        <div ref={ribbonRef} className="absolute -right-40 -top-10 w-[760px] opacity-90 sm:-right-24 lg:-right-10 lg:top-0 lg:w-[880px]">
          <Ribbons id="hero" className="fi-float w-full" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#102936_0%,rgba(16,41,54,0.92)_38%,rgba(16,41,54,0.25)_75%,rgba(16,41,54,0)_100%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-36 sm:px-8 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-40">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow dark>Mediatore creditizio a Modena</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              La <GradText>finanza giusta</GradText> per far crescere la tua impresa.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-white/85 lg:text-lg">
              Finanza agevolata, consulenza aziendale e accesso al credito: un solo interlocutore per le imprese del
              territorio modenese, al fianco di CNA Modena.
            </p>
          </Reveal>
          <Reveal delay={240} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <PrimaryCta href="#contatti" glow>
              Richiedi una consulenza
            </PrimaryCta>
            <a
              href="#servizi"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition duration-300 hover:border-[#FFE400] hover:bg-white/5"
            >
              Scopri i servizi
              <ArrowRight size={20} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-6 flex items-center gap-2 text-base font-light text-white/80">
              <Check size={20} strokeWidth={1.5} className="text-[#FFE400]" aria-hidden="true" />
              Primo appuntamento gratuito per i soci CNA
            </p>
          </Reveal>
        </div>

        <div className="relative lg:col-span-5">
          <ul className="relative grid gap-4">
            {areas.map((a, i) => (
              <li key={a.title} className={i === 1 ? 'lg:translate-x-8' : i === 2 ? 'lg:-translate-x-2' : ''}>
                <Reveal delay={200 + i * 120}>
                  <div
                    className={`${i % 2 ? 'fi-float-b' : 'fi-float'} group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition duration-300 hover:border-[#FFE400]/50 hover:bg-white/10`}
                  >
                    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FFE400] text-[#102936]">
                      <a.icon size={28} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xl font-semibold">{a.title}</p>
                      <p className="mt-1 text-base font-light text-white/80">{a.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* fascia di fiducia: solo dati presenti sul sito */}
      <div className="mx-auto max-w-7xl px-6 pb-10 sm:px-8 lg:pb-16">
        <Reveal>
          <ul className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:grid-cols-3 lg:p-8">
            {trust.map((t) => (
              <li key={t.label} className="flex items-center gap-4">
                <t.icon size={28} strokeWidth={1.5} className="shrink-0 text-[#FFE400]" aria-hidden="true" />
                <span className="text-base font-semibold leading-snug">{t.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <Slant fill="#ffffff" />
    </section>
  );
}

/* ── Servizi ───────────────────────────────────────────────────────────── */
function ServiceCard({ s, index }) {
  const dark = s.featured;
  return (
    <Reveal delay={index * 120} className="h-full">
      <article
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl p-8 transition duration-500 hover:-translate-y-1.5 lg:p-10 ${
          dark
            ? 'fi-dark bg-gradient-to-br from-[#102936] to-[#1D4E67] text-white shadow-[0_40px_90px_-30px_rgba(16,41,54,0.6)]'
            : 'border border-[#102936]/10 bg-white text-[#102936] shadow-[0_30px_80px_-30px_rgba(16,41,54,0.25)] hover:shadow-[0_40px_100px_-30px_rgba(16,41,54,0.35)]'
        }`}
      >
        {dark && <Ribbons id={`s${index}`} className="pointer-events-none absolute -right-32 -top-24 w-[420px] opacity-25" />}
        <div className="relative flex items-center justify-between">
          <span
            className={`inline-flex h-14 w-14 items-center justify-center rounded-full ${
              dark ? 'bg-[#FFE400] text-[#102936]' : 'bg-[#102936] text-white'
            }`}
          >
            <s.icon size={28} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span className={`text-sm font-semibold tracking-[0.2em] ${dark ? 'text-white/70' : 'text-[#1D4E67]'}`}>{s.n}</span>
        </div>
        <h3 className="relative mt-8 text-3xl font-bold tracking-tight">{s.title}</h3>
        <p className={`relative mt-4 text-base font-light leading-relaxed lg:text-lg ${dark ? 'text-white/85' : 'text-[#102936]/80'}`}>
          {s.benefit}
        </p>
        <ul className="relative mt-8 space-y-3">
          {s.points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-base font-semibold leading-snug">
              <CheckCircle2
                size={20}
                strokeWidth={1.5}
                className={`mt-0.5 shrink-0 ${dark ? 'text-[#FFE400]' : 'text-[#1D4E67]'}`}
                aria-hidden="true"
              />
              {p}
            </li>
          ))}
        </ul>
        <a
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative mt-10 inline-flex items-center gap-2 self-start text-base font-semibold underline decoration-2 underline-offset-8 transition-colors ${
            dark
              ? 'text-white decoration-[#FFE400] hover:text-[#FFE400]'
              : 'text-[#102936] decoration-[#FFBF00] hover:text-[#1D4E67]'
          }`}
        >
          Approfondisci {s.title.toLowerCase()}
          <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only"> (si apre in una nuova scheda)</span>
        </a>
      </article>
    </Reveal>
  );
}

function Services() {
  return (
    <section id="servizi" className="scroll-mt-24 bg-white py-20 text-[#102936] lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Cosa facciamo</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Tre aree di attività. Un unico obiettivo: più risorse per la tua impresa.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[#102936]/80 lg:text-lg">
              Dagli incentivi pubblici al credito bancario, partiamo sempre dai tuoi progetti e li mettiamo in relazione con
              le soluzioni più adatte.
            </p>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Per chi lavoriamo + metodo ────────────────────────────────────────── */
function Audience() {
  return (
    <section className="fi-dark relative isolate overflow-hidden bg-[#102936] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -left-48 bottom-0 -z-10 w-[640px] opacity-[0.12]">
        <Ribbons id="aud" className="w-full" />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-32">
        <div id="per-chi" className="grid scroll-mt-28 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow dark>Per chi lavoriamo</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                Le imprese del <GradText>territorio modenese</GradText>.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/85 lg:text-lg">
                Lavoriamo con piccole e medie imprese, con assistenza diretta sul territorio e in collaborazione con CNA
                Modena. Il primo appuntamento è gratuito per i soci CNA.
              </p>
            </Reveal>
          </div>
          <ul className="grid gap-4 lg:col-span-7">
            {PROFILES.map((p, i) => (
              <li key={p}>
                <Reveal delay={i * 100}>
                  <div className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition duration-300 hover:border-[#FFE400]/40 hover:bg-white/10">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFE400] text-[#102936]">
                      <Check size={20} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <p className="text-lg font-semibold leading-snug">{p}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div id="metodo" className="mt-24 scroll-mt-28 lg:mt-32">
          <Reveal>
            <Eyebrow dark>Il nostro metodo</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Dal tuo progetto alla soluzione, in quattro passaggi.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 110} className="h-full">
                  <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#FFE400]/40">
                    <span aria-hidden="true" className="absolute right-5 top-3 text-6xl font-bold text-white/10">
                      {i + 1}
                    </span>
                    <s.icon size={28} strokeWidth={1.5} className="relative text-[#FFE400]" aria-hidden="true" />
                    <h3 className="relative mt-6 text-xl font-semibold leading-snug">
                      <span className="sr-only">{`Passaggio ${i + 1}: `}</span>
                      {s.title}
                    </h3>
                    <p className="relative mt-3 text-base font-light leading-relaxed text-white/80">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <Slant fill="#ffffff" />
    </section>
  );
}

/* ── Modulo di contatto ────────────────────────────────────────────────── */
const EMPTY = { nome: '', azienda: '', email: '', telefono: '', area: '', messaggio: '', consenso: false, website: '' };

function validate(v) {
  const e = {};
  if (v.nome.trim().length < 2) e.nome = 'Inserisci il tuo nome e cognome.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Inserisci un indirizzo email valido.';
  if (v.telefono.trim() && !/^[+()\d\s./-]{6,}$/.test(v.telefono.trim())) e.telefono = 'Controlla il numero di telefono.';
  if (!v.area) e.area = 'Scegli l’area di tuo interesse.';
  if (!v.consenso) e.consenso = 'Per procedere serve il consenso al trattamento dei dati.';
  return e;
}

function Field({ id, label, error, required, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-base font-semibold text-[#102936]">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#B42318]">
          <AlertCircle size={20} strokeWidth={1.5} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls = (err) =>
  `w-full rounded-2xl border bg-white px-5 py-3.5 text-base font-light text-[#102936] placeholder:text-[#102936]/50 transition focus:border-[#1D4E67] focus:outline-none focus:ring-4 focus:ring-[#1D4E67]/15 ${
    err ? 'border-[#B42318]' : 'border-[#102936]/20'
  }`;

function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const set = (k) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [k]: val }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (values.website) return; // honeypot anti-spam: i bot compilano il campo nascosto
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus('sending');
    const payload = {
      nome: values.nome.trim(),
      azienda: values.azienda.trim(),
      email: values.email.trim(),
      telefono: values.telefono.trim(),
      area: values.area,
      messaggio: values.messaggio.trim(),
      consenso: values.consenso,
    };
    try {
      /* ── PUNTO DI INTEGRAZIONE ─────────────────────────────────────────
         Con FORM_ENDPOINT valorizzato la richiesta parte via POST JSON.
         Senza endpoint si usa il fallback mailto: nessun invio simulato. */
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      } else {
        const body = [
          `Nome: ${payload.nome}`,
          `Azienda: ${payload.azienda || '-'}`,
          `Email: ${payload.email}`,
          `Telefono: ${payload.telefono || '-'}`,
          `Area di interesse: ${payload.area}`,
          '',
          payload.messaggio || '(nessun messaggio)',
        ].join('\n');
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
          `Richiesta di consulenza: ${payload.area}`,
        )}&body=${encodeURIComponent(body)}`;
      }
      setStatus('success');
      setValues(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center gap-5 py-8">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#FFE400] text-[#102936]">
          <CheckCircle2 size={28} strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h3 className="text-3xl font-bold tracking-tight text-[#102936]">
          {FORM_ENDPOINT ? 'Richiesta inviata.' : 'Manca un ultimo passo.'}
        </h3>
        <p className="max-w-md text-base font-light leading-relaxed text-[#102936]/80 lg:text-lg">
          {FORM_ENDPOINT
            ? 'Grazie, ti ricontatteremo al più presto con una prima indicazione sul tuo progetto.'
            : `Abbiamo aperto la tua email con la richiesta già compilata: premi Invia per spedirla a ${EMAIL}. Se non si è aperta, scrivici o chiamaci direttamente.`}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="rounded-full border border-[#102936]/20 px-6 py-3 text-base font-semibold text-[#102936] transition hover:bg-[#102936]/5"
        >
          Compila un’altra richiesta
        </button>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Modulo di richiesta consulenza" className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="f-nome" label="Nome e cognome" required error={errors.nome}>
          <input
            id="f-nome"
            name="nome"
            type="text"
            autoComplete="name"
            value={values.nome}
            onChange={set('nome')}
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? 'f-nome-err' : undefined}
            className={inputCls(errors.nome)}
            placeholder="Mario Rossi"
          />
        </Field>
        <Field id="f-azienda" label="Azienda">
          <input
            id="f-azienda"
            name="azienda"
            type="text"
            autoComplete="organization"
            value={values.azienda}
            onChange={set('azienda')}
            className={inputCls()}
            placeholder="Ragione sociale"
          />
        </Field>
        <Field id="f-email" label="Email" required error={errors.email}>
          <input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={set('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'f-email-err' : undefined}
            className={inputCls(errors.email)}
            placeholder="nome@azienda.it"
          />
        </Field>
        <Field id="f-telefono" label="Telefono" error={errors.telefono}>
          <input
            id="f-telefono"
            name="telefono"
            type="tel"
            autoComplete="tel"
            value={values.telefono}
            onChange={set('telefono')}
            aria-invalid={!!errors.telefono}
            aria-describedby={errors.telefono ? 'f-telefono-err' : undefined}
            className={inputCls(errors.telefono)}
            placeholder="333 1234567"
          />
        </Field>
      </div>

      <Field id="f-area" label="Area di interesse" required error={errors.area}>
        <select
          id="f-area"
          name="area"
          value={values.area}
          onChange={set('area')}
          aria-invalid={!!errors.area}
          aria-describedby={errors.area ? 'f-area-err' : undefined}
          className={inputCls(errors.area)}
        >
          <option value="">Seleziona un’area</option>
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </Field>

      <Field id="f-messaggio" label="Raccontaci il tuo progetto">
        <textarea
          id="f-messaggio"
          name="messaggio"
          rows={4}
          value={values.messaggio}
          onChange={set('messaggio')}
          className={`${inputCls()} resize-y`}
          placeholder="Che investimento hai in mente? Di che cosa hai bisogno?"
        />
      </Field>

      {/* honeypot: nascosto a utenti e screen reader */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="f-website">Non compilare questo campo</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="f-consenso"
            name="consenso"
            type="checkbox"
            checked={values.consenso}
            onChange={set('consenso')}
            aria-invalid={!!errors.consenso}
            aria-describedby={errors.consenso ? 'f-consenso-err' : undefined}
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded accent-[#1D4E67]"
          />
          <label htmlFor="f-consenso" className="text-base font-light leading-snug text-[#102936]/85">
            Ho letto l’
            <a href={PRIVACY_HREF} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
              informativa privacy
            </a>{' '}
            e acconsento al trattamento dei miei dati per essere ricontattato. *
          </label>
        </div>
        {errors.consenso && (
          <p id="f-consenso-err" role="alert" className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#B42318]">
            <AlertCircle size={20} strokeWidth={1.5} aria-hidden="true" />
            {errors.consenso}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" className="flex items-start gap-3 rounded-2xl border border-[#B42318]/30 bg-[#B42318]/5 p-4 text-base font-semibold text-[#B42318]">
          <AlertCircle size={20} strokeWidth={1.5} className="mt-0.5 shrink-0" aria-hidden="true" />
          Non siamo riusciti a inviare la richiesta. Riprova tra poco oppure chiamaci allo {PHONE_LABEL}.
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="fi-btn-sheen group relative inline-flex min-h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#102936] px-8 py-3 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#1D4E67] disabled:cursor-wait disabled:opacity-70 sm:justify-self-start"
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          {sending ? (
            <>
              <Loader2 size={20} strokeWidth={1.5} className="animate-spin" aria-hidden="true" />
              Invio in corso…
            </>
          ) : (
            <>
              Invia la richiesta
              <ArrowRight size={20} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </>
          )}
        </span>
      </button>
      <p className="text-sm font-light text-[#102936]/70">I campi contrassegnati con * sono obbligatori.</p>
    </form>
  );
}

function Contact() {
  const rows = [
    { icon: Phone, label: 'Telefono', value: PHONE_LABEL, href: PHONE_HREF },
    { icon: Mail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: MapPin, label: 'Sede', value: `${ADDRESS_LINE_1}, ${ADDRESS_LINE_2}`, href: MAPS_HREF },
  ];
  return (
    <section id="contatti" className="scroll-mt-24 bg-white pb-20 text-[#102936] lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Contatti</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Raccontaci il tuo progetto. Al resto pensiamo noi.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[#102936]/80 lg:text-lg">
              Compila il modulo o chiamaci: i nostri professionisti ti rispondono e ti indicano da dove partire.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="relative h-full rounded-2xl border border-[#102936]/10 bg-white p-6 shadow-[0_40px_100px_-40px_rgba(16,41,54,0.35)] sm:p-10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <aside
              aria-label="Contatti diretti"
              className="fi-dark relative isolate flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#102936] to-[#1D4E67] p-8 text-white shadow-[0_40px_100px_-40px_rgba(16,41,54,0.6)] sm:p-10"
            >
              <Ribbons id="ct" className="pointer-events-none absolute -bottom-32 -right-32 -z-10 w-[420px] opacity-20" />
              <h3 className="text-2xl font-bold tracking-tight">Preferisci parlarci subito?</h3>
              <ul className="mt-8 space-y-4">
                {rows.map((r) => (
                  <li key={r.label}>
                    <a
                      href={r.href}
                      {...(r.label === 'Sede' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition duration-300 hover:border-[#FFE400]/50 hover:bg-white/10"
                    >
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFE400] text-[#102936]">
                        <r.icon size={20} strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{r.label}</span>
                        <span className="block break-words text-lg font-semibold">{r.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-base font-light leading-relaxed text-white/80">
                Finimpresa opera in collaborazione con CNA Modena. Primo appuntamento gratuito per i soci CNA.
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ────────────────────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="fi-dark relative isolate overflow-hidden bg-[#102936] pb-28 pt-16 text-white sm:pb-16 lg:pt-20">
      <Ribbons id="ft" className="pointer-events-none absolute -right-40 -top-24 -z-10 w-[520px] opacity-[0.09]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <a href="#top" aria-label="Finimpresa, torna all’inizio" className="inline-flex rounded-2xl bg-white px-5 py-3">
            <img src={LOGO_SRC} alt="Finimpresa" width="100" height="40" className="h-10 w-auto" />
          </a>
          <p className="mt-6 max-w-xs text-base font-light leading-relaxed text-white/80">
            Società di mediazione creditizia a Modena, al fianco delle imprese del territorio.
          </p>
        </div>

        <div className="lg:col-span-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFE400]">Contatti</h2>
          <ul className="mt-5 space-y-3 text-base font-light text-white/85">
            <li>
              <a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#FFE400]">
                {ADDRESS_LINE_1}, {ADDRESS_LINE_2}
              </a>
            </li>
            <li>
              Tel. <a href={PHONE_HREF} className="font-semibold transition-colors hover:text-[#FFE400]">+39 {PHONE_LABEL}</a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-[#FFE400]">{EMAIL}</a>
            </li>
            <li>
              PEC: <a href="mailto:finimpresa@cert.cna.it" className="transition-colors hover:text-[#FFE400]">finimpresa@cert.cna.it</a>
            </li>
            <li>
              Reclami: <a href="mailto:reclami@finimpresa.it" className="transition-colors hover:text-[#FFE400]">reclami@finimpresa.it</a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFE400]">Dati societari</h2>
          <ul className="mt-5 space-y-3 text-base font-light text-white/85">
            <li>Partita IVA 03318550369</li>
            <li>Capitale sociale € 51.000 i.v.</li>
            <li>REA MO 376984, Registro Imprese di Modena</li>
            <li>Mediatore creditizio iscritto all’OAM al n. M306</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-4 border-t border-white/10 px-6 pt-8 text-sm font-light text-white/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {year} Finimpresa. Tutti i diritti riservati.</p>
        <ul className="flex gap-6">
          <li>
            <a href={PRIVACY_HREF} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 transition-colors hover:text-[#FFE400]">
              Privacy
            </a>
          </li>
          <li>
            <a href={COOKIE_HREF} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 transition-colors hover:text-[#FFE400]">
              Cookie
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

/* Barra contatti fissa su mobile: telefono ed email sempre a un tocco */
function MobileBar() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 rounded-full border border-[#102936]/10 bg-white p-2 shadow-[0_20px_50px_-12px_rgba(16,41,54,0.5)] sm:hidden">
      <a href={PHONE_HREF} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#102936] text-base font-semibold text-white">
        <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
        Chiama
      </a>
      <a href="#contatti" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FFE400] text-base font-semibold text-[#102936]">
        <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
        Scrivici
      </a>
    </div>
  );
}

/* ── Pagina ────────────────────────────────────────────────────────────── */
export default function FinimpresaHome() {
  useEffect(() => {
    // Josefin Sans (300/400/600/700): se la pagina ospite non lo carica già, lo aggiunge qui.
    if (!document.querySelector('link[href*="Josefin+Sans"]')) {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&display=swap';
      document.head.appendChild(l);
    }
  }, []);

  return (
    <div className="fi min-h-screen overflow-x-clip bg-white text-[#102936]">
      <style>{CSS}</style>
      <a
        href="#servizi"
        className="sr-only z-[60] rounded-full bg-[#FFE400] px-6 py-3 font-semibold text-[#102936] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Vai ai contenuti
      </a>
      <Header />
      <main>
        <Hero />
        <Services />
        <div className="bg-white">
          <Slant fill="#102936" />
        </div>
        <Audience />
        <Contact />
      </main>
      <div className="bg-white">
        <Slant fill="#102936" />
      </div>
      <Footer />
      <MobileBar />
    </div>
  );
}
