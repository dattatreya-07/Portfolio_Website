import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, ExternalLink, Github, Linkedin, Mail, Menu, Moon, Sun, X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Analytics } from '@vercel/analytics/react';

const queryClient = new QueryClient();

const projects = [
  {
    number: '01',
    title: 'FinVault Pro',
    kicker: 'Advanced Financial Systems Ecosystem',
    description: 'A desktop platform bringing option pricing, financial scoring, reporting, security, and certification learning into one considered system.',
    tags: ['Python / Tkinter', 'Oracle 21c XE', 'Black-Scholes', 'ReportLab'],
    details: [],
  },
  {
    number: '02',
    title: 'FinanceX',
    kicker: 'Gamified Multilingual Stock Market Education',
    description: 'A bilingual Tamil/English learning platform that turns market concepts into animated lessons, adaptive quizzes, and streak-based practice.',
    tags: ['MERN stack', 'Google Gemini API', 'Tamil + English'],
    details: [],
  },
  {
    number: '03',
    title: 'MEPCO Attendance ERP',
    kicker: 'Academic Management Framework',
    description: 'A Java-based attendance system with a Swing GUI and relational database backend, designed around the practical rhythms of academic administration.',
    tags: ['Java 11', 'Swing GUI', 'Relational DB'],
    details: [],
  },
  {
    number: '04',
    title: 'Steel Shed CAD Project',
    kicker: 'Structural Design & Fabrication Deliverables',
    description: 'Full structural CAD, DXF, and BOM deliverables for a 120×100 ft industrial shed with Pratt trusses, created for a family fabrication business.',
    tags: ['CAD / DXF', 'BOM', 'Pratt trusses'],
    details: [],
  },
  {
    number: '05',
    title: 'NumisAI',
    kicker: 'AI-Powered Collectible Identification & Social Collection Platform',
    status: 'In process',
    description: 'A full-stack platform for identifying coins, stamps, and antiques through AI-powered image recognition, returning country, year, denomination, material, rarity score, and estimated market value in real time.',
    tags: ['React', 'TanStack Start', 'FastAPI', 'Lovable Cloud', 'PostgreSQL', 'Computer Vision', 'LLM Integration'],
    details: [
      'Architected an Instagram-style social collection layer with public profiles, followers, item feeds, role-based access control, and row-level security across 15+ relational tables.',
      'Built a per-user AI assistant scoped to individual collection data with server-side LLM integration and strict data-isolation guarantees between users.',
      'Implemented automated Excel valuation reports with Python/openpyxl, formula-driven category and portfolio-total calculations, badges, leaderboards, and a secure peer-to-peer trade flow with reputation scoring.',
      'Addressed privacy risks around net-worth visibility and PII exposure through server-side data bucketing and scoped access policies.',
    ],
  },
  {
    number: '06',
    title: 'AI-Powered Personal Wealth Advisor',
    kicker: 'LLM-Driven Portfolio Management & Research Analyst Platform',
    status: 'Planned extension',
    description: 'An LLM-driven portfolio management and research analyst platform that aggregates net worth across asset classes, tracks financial goals with compounding-based projections, and grounds portfolio conversations in a user’s real data.',
    tags: ['MERN stack', 'Google Gemini', 'Claude API', 'Portfolio Analytics'],
    details: [
      'The planned final-year extension of the Semester 5 FinanceX project, reusing its authentication system and database patterns to build a fuller research-analyst-style platform.',
      'Includes an AI chat assistant for portfolio and company-analysis questions, plus a ticker-search module combining LLM-based news sentiment scoring with basic fundamentals.',
      'Designed to bring financial goals, long-term projections, and multi-asset net-worth tracking into one research-oriented workspace.',
    ],
  },
];

const certifications = [
  ['NISM Series XV: Research Analyst Certification', 'In progress'],
  ['NPTEL Blockchain and its Applications', 'IIT Kharagpur · Elite'],
  ['NPTEL Programming in Modern C++', 'Grade B+'],
  ['IEEE English for Technical Professionals', 'Professional development'],
  ['Hindi Praveshika', 'Central Hindi Directorate'],
  ['Tamil Nadu Typewriting, Sub-Junior Level', 'First Class'],
];

const technicalSkills = ['Python', 'C / C++', 'JavaScript', 'HTML / CSS', 'SQL', 'React', 'Node.js', 'MongoDB', 'Data Analysis', 'Generative AI'];
const financialSkills = ['Quantitative Research', 'Equity Research', 'Portfolio Management', 'Market Research'];
const navItems = [
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Projects', 'projects'],
  ['Credentials', 'credentials'],
  ['Philosophy', 'philosophy'],
  ['Contact', 'contact'],
];

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ number, eyebrow, title, description }: { number: string; eyebrow: string; title: React.ReactNode; description?: string }) {
  return (
    <div className="section-heading">
      <div>
        <span className="section-number">{number}</span>
        <div className="eyebrow mt-4">{eyebrow}</div>
      </div>
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}

function Header({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="topbar">
      <div className="content-wrap topbar-inner">
        <a className="brand-mark" href="#top" aria-label="Back to top" data-testid="link-brand">
          <span className="brand-symbol">DMK</span>
          <span className="brand-text">Dattatreya M K</span>
        </a>
        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map(([label, target]) => (
            <a className="nav-link" href={`#${target}`} key={target} onClick={() => setMenuOpen(false)} data-testid={`link-nav-${target}`}>{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} data-testid="button-theme-toggle">
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} data-testid="button-menu-toggle">
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const printResume = () => window.print();
  return (
    <section className="hero" id="top">
      <div className="content-wrap hero-grid">
        <Reveal>
          <div className="eyebrow">Portfolio / 2025—26</div>
          <h1>Dattatreya<br /><em>M K</em></h1>
          <p className="hero-intro">CSE undergraduate building at the intersection of software engineering and financial markets.</p>
          <div className="hero-meta">Aspiring Fintech Analyst&nbsp; · &nbsp;Full Stack Developer&nbsp; · &nbsp;Quantitative Finance</div>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects" data-testid="button-view-projects">View Projects <ArrowDown size={14} /></a>
            <button className="button" type="button" onClick={printResume} data-testid="button-download-resume">Download Resume <ArrowDown size={14} /></button>
            <a className="button button-quiet" href="#contact" data-testid="button-contact-me">Contact Me <ArrowUpRight size={14} /></a>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="hero-art">
          <div className="orbit" aria-hidden="true" />
          <div className="portrait-frame" aria-label="Monogram portrait for Dattatreya M K">
            <div className="portrait-initials">D<br />M</div>
            <div className="portrait-caption"><span>CS / FIN</span><span>01—08</span></div>
          </div>
          <div className="hero-note"><strong>Current direction</strong>Learning how good systems behave when code meets capital.</div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section-pad section-rule" id="about">
      <div className="content-wrap">
        <Reveal><SectionHeading number="01" eyebrow="About" title={<>A technical mind with a <em className="font-display">long horizon.</em></>} description="The work sits between building useful software and asking better questions of financial systems." /></Reveal>
        <div className="about-grid">
          <Reveal delay={0.08}><div className="about-copy">I am pursuing a <span className="highlight">B.E. Computer Science Engineering</span> at Mepco Schlenk Engineering College, Sivakasi (2024–2028), with a CGPA of 8.45. I combine technical development skills with hands-on investing experience across Indian (NSE/BSE) and US (NYSE/NASDAQ) equities since December 2025.</div></Reveal>
          <Reveal delay={0.16}><dl className="detail-list">
            <div className="detail-row"><dt>Education</dt><dd>Mepco Schlenk Engineering College, Sivakasi</dd></div>
            <div className="detail-row"><dt>Focus</dt><dd>Fintech engineering · quantitative analysis · research</dd></div>
            <div className="detail-row"><dt>Internship</dt><dd>GenAI internship at SK Tech Forge — prompt engineering and automated text/image projects</dd></div>
            <div className="detail-row"><dt>Certification</dt><dd>NISM Series XV (Research Analyst), in progress</dd></div>
          </dl></Reveal>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section-pad section-rule" id="skills">
      <div className="content-wrap">
        <Reveal><SectionHeading number="02" eyebrow="Skills" title={<>Tools for the <em className="font-display">next question.</em></>} /></Reveal>
        <div className="skills-layout">
          <Reveal delay={0.08}><p className="skills-intro">A practical toolkit spanning interfaces, systems, data, and the discipline required to read a market without rushing to a conclusion.</p></Reveal>
          <Reveal delay={0.16}><div>
            <div className="skill-group"><h3>01 / Technical</h3><div className="skill-pills">{technicalSkills.map((skill) => <span className="skill-pill" key={skill} data-testid={`skill-technical-${skill.toLowerCase().replace(/[^a-z]/g, '-')}`}>{skill}</span>)}</div></div>
            <div className="skill-group"><h3>02 / Financial</h3><div className="skill-pills">{financialSkills.map((skill) => <span className="skill-pill" key={skill}>{skill}</span>)}</div></div>
          </div></Reveal>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section-pad section-rule" id="projects">
      <div className="content-wrap">
        <Reveal><SectionHeading number="03" eyebrow="Selected work" title={<>Projects that make ideas <em className="font-display">concrete.</em></>} description="Each project is an exercise in translating a real-world need into a system that can be understood, used, and improved." /></Reveal>
        <div className="project-grid">
          {projects.map((project, index) => <Reveal key={project.title} delay={index * 0.07} className="contents">
            <article className="project-card" data-testid={`card-project-${project.number}`}>
              <div className="project-kicker">{project.number} / {project.kicker}</div>
              {project.status && <div className="project-status">{project.status}</div>}
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              {project.details.length > 0 && <div className="project-details">{project.details.map((detail) => <p key={detail}>{detail}</p>)}</div>}
              <div className="project-footer"><div className="tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><a className="project-link" href="#contact" aria-label={`Ask about ${project.title}`} data-testid={`link-project-${project.number}`}>Repository <ExternalLink size={12} /></a></div>
            </article>
          </Reveal>)}
        </div>
        <p className="mt-5 text-xs font-mono-ui text-muted-foreground">GitHub repositories are being prepared — ask for a walkthrough or code sample.</p>
      </div>
    </section>
  );
}

function Credentials() {
  return (
    <section className="section-pad section-rule" id="credentials">
      <div className="content-wrap">
        <Reveal><SectionHeading number="04" eyebrow="Credentials" title={<>Proof of <em className="font-display">curiosity.</em></>} /></Reveal>
        <div className="credentials-grid">
          <Reveal delay={0.08}><div className="cert-list">{certifications.map(([name, meta], index) => <div className="cert-item" key={name} data-testid={`certification-${index}`}><span className="cert-index">0{index + 1}</span><span className="cert-name">{name}</span><span className="cert-meta">{meta}</span></div>)}</div></Reveal>
          <Reveal delay={0.16}><aside className="achievement-card"><div className="achievement-symbol">↗</div><div className="eyebrow">Achievement</div><h3>Mepco Management Scholarship Award</h3><p>Merit scholarship of ₹10,000, awarded in consecutive academic years for maintaining top-tier academic standing.</p></aside></Reveal>
        </div>
      </div>
    </section>
  );
}

function CompoundingChart() {
  return (
    <div className="chart-wrap" aria-label="Illustrative compound growth chart, not personal financial data">
      <div className="chart-head"><span className="chart-label">Illustrative compounding</span><span className="chart-context">20+ year horizon</span></div>
      <svg className="chart" viewBox="0 0 600 240" role="img" aria-label="An illustrative curve rising gradually then accelerating over time">
        <line className="chart-gridline" x1="38" y1="190" x2="580" y2="190" /><line className="chart-gridline" x1="38" y1="120" x2="580" y2="120" /><line className="chart-gridline" x1="38" y1="50" x2="580" y2="50" />
        <path className="chart-area" d="M38 190 C130 188 188 180 240 162 C320 135 350 112 405 93 C462 73 490 39 580 21 L580 190 Z" />
        <path className="chart-line" d="M38 190 C130 188 188 180 240 162 C320 135 350 112 405 93 C462 73 490 39 580 21" />
        <text className="chart-axis" x="38" y="212">TODAY</text><text className="chart-axis" x="525" y="212">YEAR 20+</text>
        <text className="chart-axis" x="42" y="181">BASE</text><text className="chart-axis" x="42" y="42">VALUE</text>
      </svg>
      <div className="chart-caption">A conceptual illustration of time doing the heavy lifting — not a forecast or personal financial data.</div>
    </div>
  );
}

function Philosophy() {
  return (
    <section className="section-pad philosophy" id="philosophy">
      <div className="content-wrap">
        <Reveal><SectionHeading number="05" eyebrow="Investment philosophy" title={<>Practicing what I <em className="font-display">study.</em></>} description="The patience required to understand a business is close to the patience required to build a good system." /></Reveal>
        <div className="philosophy-grid">
          <Reveal delay={0.08}><div><div className="philosophy-copy">Active long-term investor across Indian and US equities since December 2025, following a disciplined <em>buy-and-hold</em> approach with a 20+ year horizon.</div><p className="philosophy-note">This is genuine investing experience, not a performance claim. I am interested in the research process: understanding durable advantages, weighing uncertainty, and letting time remain part of the thesis.</p></div></Reveal>
          <Reveal delay={0.16}><CompoundingChart /></Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState('');
  const submitContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '');
    const email = String(form.get('email') || '');
    const message = String(form.get('message') || '');
    if (!name || !email || !message) { setStatus('Please complete all three fields.'); return; }
    window.location.href = `mailto:mkdattatreya07@gmail.com?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\nReply to: ${email}`)}`;
    setStatus('Opening your email client…');
  };
  return (
    <section className="section-pad section-rule" id="contact">
      <div className="content-wrap">
        <div className="contact-grid">
          <Reveal><div className="eyebrow">06 / Contact</div><h2 className="contact-heading">Let’s talk about <em>what’s next.</em></h2><p className="contact-copy">For a role, a research conversation, or a thoughtful critique of a project, the best way to reach me is by email.</p><a className="contact-email" href="mailto:mkdattatreya07@gmail.com" data-testid="link-email"><Mail size={14} className="inline mr-2" />mkdattatreya07@gmail.com</a><div className="social-links"><a className="social-link" href="https://github.com/dattatreya-07" target="_blank" rel="noreferrer" data-testid="link-github"><Github size={14} /> GitHub</a><a className="social-link" href="https://linkedin.com/in/dattatreya-mk" target="_blank" rel="noreferrer" data-testid="link-linkedin"><Linkedin size={14} /> LinkedIn</a><a className="social-link" href="https://leetcode.com/u/Dattatreya_MK" target="_blank" rel="noreferrer" data-testid="link-leetcode"><Check size={14} /> LeetCode</a></div></Reveal>
          <Reveal delay={0.12}><form className="contact-form" onSubmit={submitContact} data-testid="form-contact"><div className="field"><label htmlFor="name">Name</label><input id="name" name="name" placeholder="Your name" autoComplete="name" data-testid="input-contact-name" /></div><div className="field"><label htmlFor="email">Email</label><input id="email" type="email" name="email" placeholder="you@example.com" autoComplete="email" data-testid="input-contact-email" /></div><div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" placeholder="A few words to begin…" rows={4} data-testid="input-contact-message" /></div><div className="flex items-center justify-between gap-4"><span className="form-status" aria-live="polite">{status}</span><button className="button button-primary" type="submit" data-testid="button-send-message">Open email draft <ArrowUpRight size={14} /></button></div></form></Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="footer"><div className="content-wrap footer-inner"><span className="footer-copy">© {new Date().getFullYear()} Dattatreya M K</span><div className="footer-links">{navItems.map(([label, target]) => <a className="footer-link" href={`#${target}`} key={target} data-testid={`link-footer-${target}`}>{label}</a>)}</div><a className="back-top" href="#top" data-testid="link-back-top">Back to top ↑</a></div></footer>;
}

function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  useEffect(() => {
    const stored = localStorage.getItem('portfolio-theme') as 'dark' | 'light' | null;
    if (stored) setTheme(stored);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);
  return <div className="portfolio-shell"><Header theme={theme} onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} /><main><Hero /><About /><Skills /><Projects /><Credentials /><Philosophy /><Contact /></main><Footer /></div>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><Home /><Toaster /></TooltipProvider><Analytics /></QueryClientProvider>;
}

export default App;
