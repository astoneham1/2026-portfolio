import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Sun, Moon, Monitor, Github, Linkedin, FileText } from 'lucide-react';

// Static data moved outside to prevent re-creation on render
const TABS = [
  { id: 'intro', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Tech Stack' },
];

const App = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const [theme, setTheme] = useState('system');
  const [systemDark, setSystemDark] = useState(false);

  // Listen to system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemDark(mediaQuery.matches);

    const listener = (e) => setSystemDark(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Determine if dark mode should be actively rendered
  const isDark = theme === 'dark' || (theme === 'system' && systemDark);

  // Inject dark class directly into the HTML root for Safari/Chrome compatibility
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Cycle through themes
  const cycleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  // Track section positions for navbar highlight
  const sectionRefs = {
    intro: useRef(null),
    about: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
  };

  // Update activeTab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 200; // Distance from top to consider section active
      
      const offsets = Object.entries(sectionRefs).map(([id, ref]) => {
        if (!ref.current) return { id, offset: Infinity };
        const rect = ref.current.getBoundingClientRect();
        const offset = rect.top + scrollY;
        return { id, offset };
      });
      
      // Find the section whose offset is closest to current scroll position
      const active = offsets.reduce((closest, current) => {
        const closestDist = closest.offset - scrollY;
        const currentDist = current.offset - scrollY;
        return Math.abs(currentDist) < Math.abs(closestDist) ? current : closest;
      });
      
      setActiveTab(active.id);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Bubble highlight logic ---
  const tabRefs = useRef([]);
  const navBarRef = useRef(null);
  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (!tabRefs.current || !navBarRef.current) return;
    const idx = TABS.findIndex(tab => tab.id === activeTab);
    const node = tabRefs.current[idx];
    const navNode = navBarRef.current;
    if (node && navNode) {
      const { left: tabLeft, width } = node.getBoundingClientRect();
      const { left: navLeft } = navNode.getBoundingClientRect();
      let left = tabLeft - navLeft;
      setBubbleStyle({
        left,
        width,
      });
    }
  }, [activeTab, tabRefs, navBarRef]);

  // Scroll to section on navbar click
  const handleNavClick = (id) => {
    if (id === 'intro') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const ref = sectionRefs[id];
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-600 dark:text-zinc-400 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 transition-colors duration-300 flex flex-col relative overflow-hidden">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Theme Toggle Button */}
      <button
        onClick={cycleTheme}
        className="absolute top-6 right-6 z-50 p-3 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md backdrop-saturate-150 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 active:scale-95 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 cursor-pointer"
        aria-label="Toggle theme"
        title={`Theme: ${theme}`}
      >
        {theme === 'system' && <Monitor size={18} className="animate-in fade-in zoom-in duration-300" />}
        {theme === 'light' && <Sun size={18} className="animate-in fade-in zoom-in duration-300" />}
        {theme === 'dark' && <Moon size={18} className="animate-in fade-in zoom-in duration-300" />}
      </button>

      {/* Dynamic Content Area */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 pt-24 pb-32 flex flex-col relative z-10 space-y-32">
        {/* All sections rendered in order, continuous scroll */}
        <section id="intro" ref={sectionRefs.intro} className="flex flex-col justify-center flex-1 min-h-[80vh]">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tighter mb-4 animate-[fadeBlurIn_0.8s_ease-out_forwards]">
            Alessandro Stoneham.
          </h1>
          <p className="text-lg sm:text-xl font-medium text-zinc-500 dark:text-zinc-400 opacity-0 animate-[fadeBlurIn_0.8s_ease-out_forwards_150ms]">
            Computer Science Student <span className="text-zinc-300 dark:text-zinc-700 mx-1">/</span> Developer
          </p>
          <div className="mt-10 flex flex-wrap gap-4 opacity-0 animate-[fadeBlurIn_0.8s_ease-out_forwards_300ms]">
            <IntroButton href="https://linkedin.com/in/yourprofile" label="LinkedIn" icon={<Linkedin size={16} />} />
            <IntroButton href="https://github.com/yourusername" label="GitHub" icon={<Github size={16} />} />
            <IntroButton href="/cv.pdf" label="CV" icon={<FileText size={16} />} />
          </div>
        </section>

        <section id="about" ref={sectionRefs.about} className="flex flex-col flex-1 space-y-12 min-h-[80vh]">
          <div className="animate-[fadeBlurIn_0.6s_ease-out_forwards]">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-6">About Me</h2>
            <div className="space-y-6 text-base sm:text-lg leading-relaxed opacity-0 animate-[fadeBlurIn_0.6s_ease-out_forwards_100ms]">
              <p>
                I'm a 19-year-old developer studying Computer Science at the University of St. Andrews. 
                I have a long-standing passion for coding, breaking ideas down, and learning by building.
              </p>
              <p>
                Recently, I've been spending my time with <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Java & Spring</span> on the backend, 
                while exploring <span className="text-zinc-900 dark:text-zinc-100 font-semibold">React & TypeScript</span> on the frontend.
              </p>
            </div>
          </div>
          <div className="space-y-5 pt-2 opacity-0 animate-[fadeBlurIn_0.6s_ease-out_forwards_200ms]">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">Currently Studying</h3>
            <ul className="space-y-3 text-base text-zinc-500 dark:text-zinc-400">
              <li className="flex gap-3 items-center"><span className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></span> Data structures & algorithms</li>
              <li className="flex gap-3 items-center"><span className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></span> Grammars & state machines</li>
              <li className="flex gap-3 items-center"><span className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></span> Client–server architecture & networks</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-8 pt-4 opacity-0 animate-[fadeBlurIn_0.6s_ease-out_forwards_300ms]">
            <SocialLink href="mailto:me@alexstoneham.co.uk" label="Email" />
            <SocialLink href="https://github.com/yourusername" label="GitHub" />
            <SocialLink href="https://linkedin.com/in/yourprofile" label="LinkedIn" />
          </div>
        </section>

        <section id="projects" ref={sectionRefs.projects} className="flex flex-col flex-1 space-y-10 min-h-[80vh]">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight animate-[fadeBlurIn_0.6s_ease-out_forwards]">Selected Projects</h2>
          <div className="flex flex-col gap-4 group opacity-0 animate-[fadeBlurIn_0.6s_ease-out_forwards_150ms]">
            <ProjectItem 
              title="Nonograms Puzzle"
              description="A fully functional GUI puzzle game featuring checking and solving logic."
              tags="Java, Swing, JSON"
              link="#"
            />
            <ProjectItem 
              title="Breakout Game"
              description="An arcade-style game with multiple levels, power-ups, and a custom progression system."
              tags="Java, Processing"
              link="#"
            />
            <ProjectItem 
              title="EAFC 24 Pack Opener"
              description="Lightweight app to pack cards, build drafts, and play endless minigames."
              tags="Livecode, SQLite"
              link="#"
            />
            <ProjectItem 
              title="Siege Clip Hub"
              description="A centralized archive for organizing gameplay clips spanning several years."
              tags="HTML, CSS"
              link="#"
            />
          </div>
        </section>

        <section id="skills" ref={sectionRefs.skills} className="flex flex-col flex-1 space-y-10 min-h-[80vh]">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight animate-[fadeBlurIn_0.6s_ease-out_forwards]">Technical Arsenal</h2>
          <div className="flex flex-col gap-8 opacity-0 animate-[fadeBlurIn_0.6s_ease-out_forwards_150ms]">
            <SkillRow category="Languages" skills="Java, TypeScript, JavaScript, Python, Lua" />
            <SkillRow category="Frontend" skills="React, Tailwind CSS, HTML, CSS, Swing" />
            <SkillRow category="Backend" skills="Spring Boot, Node.js" />
            <SkillRow category="Databases" skills="PostgreSQL, MySQL, MongoDB, SQLite" />
          </div>
        </section>
      </main>

      {/* Floating Bottom Navbar */}
      <nav className="fixed bottom-8 inset-x-0 z-[100] pointer-events-none flex justify-center px-6">
        <div
          ref={navBarRef}
          className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl backdrop-saturate-150 border border-zinc-200/50 dark:border-zinc-800/50 rounded-full shadow-2xl pointer-events-auto select-none overflow-hidden relative"
        >
          {/* Apple-style liquid glass animated highlight background */}
          <div
            className="absolute top-0 h-full z-0 transition-all duration-500"
            style={{
              left: bubbleStyle.left,
              width: bubbleStyle.width,
              background: isDark
                ? 'linear-gradient(135deg,rgba(255,255,255,0.18) 60%,rgba(200,200,255,0.10) 100%)'
                : 'linear-gradient(135deg,rgba(255,255,255,0.45) 60%,rgba(200,200,255,0.18) 100%)',
              backdropFilter: 'blur(24px) saturate(180%) brightness(1.18) contrast(1.12)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%) brightness(1.18) contrast(1.12)',
              borderRadius: '9999px',
              border: isDark
                ? '1.5px solid rgba(255,255,255,0.22)'
                : '1.5px solid rgba(180,180,255,0.18)',
              boxShadow: isDark
                ? '0 6px 32px 0 rgba(0,0,0,0.22), 0 0 0 2px rgba(255,255,255,0.12)'
                : '0 6px 32px 0 rgba(0,0,0,0.10), 0 0 0 2px rgba(180,180,255,0.10)',
              opacity: 0.98,
              transition: 'left 0.5s cubic-bezier(.4,1,.7,1.2), width 0.5s cubic-bezier(.4,1,.7,1.2), background 0.3s',
              pointerEvents: 'none',
            }}
          />
          {TABS.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={el => tabRefs.current[idx] = el}
                onClick={() => handleNavClick(tab.id)}
                className={`
                  relative px-5 py-2.5 rounded-full text-sm font-semibold 
                  transition-all duration-200 outline-none cursor-pointer
                  focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600
                  z-10
                  ${isActive 
                    ? 'text-zinc-900 dark:text-zinc-100'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }
                  group
                `}
                style={{ background: 'transparent' }}
              >
                <span
                  className={`
                    relative z-20 transition-all duration-300
                    ${isActive ? 'font-extrabold scale-105' : ''}
                    group-hover:-translate-y-1 group-hover:scale-110
                  `}
                  style={{
                    transitionProperty: 'color,transform',
                  }}
                >
                  {tab.label}
                </span>
                {/* Animated underline for active tab */}
                <span
                  className={`
                    absolute left-1/2 -translate-x-1/2 bottom-1 h-1 w-6 rounded-full
                    bg-zinc-900 dark:bg-white transition-all duration-300
                    ${isActive ? 'opacity-80 scale-x-100' : 'opacity-0 scale-x-50'}
                  `}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Custom Keyframes for smooth tab switching and staggers */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeBlurIn {
          0% { opacity: 0; filter: blur(8px); transform: translateY(16px); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
      `}} />

    </div>
  );
};

/* --- Minimal Reusable Components --- */

const IntroButton = ({ href, label, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-zinc-900 text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-colors duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 shadow-sm hover:shadow-lg cursor-pointer"
  >
    {icon && <span className="transition-transform duration-300 group-hover:-rotate-12">{icon}</span>}
    {label}
    <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
  </a>
);

const SocialLink = ({ href, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group flex items-center gap-2 text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 decoration-zinc-300 dark:decoration-zinc-700 underline-offset-8 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 rounded-sm cursor-pointer"
  >
    {label}
    <ArrowUpRight size={16} className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
  </a>
);

const ProjectItem = ({ title, description, tags, link }) => (
  // Add group-hover:opacity-50 and hover:opacity-100 for fade effect
  <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6 w-full transition-all duration-300 group-hover:opacity-50 hover:opacity-100 p-4 -mx-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/40 border border-transparent hover:border-zinc-200/50 dark:hover:border-zinc-800/50">
    <div className="flex-1 space-y-2">
      {/* Add group to <a> for icon animation */}
      <a 
        href={link} 
        className="group text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 w-fit hover:underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 rounded-sm cursor-pointer"
      >
        {title}
        {/* Use group-hover for icon */}
        <ArrowUpRight size={16} className="text-zinc-400 opacity-0 -translate-y-2 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:rotate-12" />
      </a>
      {/* Use group-hover for description */}
      <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed transition-colors duration-300 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
        {description}
      </p>
    </div>
    <div className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500 sm:text-right pt-2 sm:pt-0">
      {tags}
    </div>
  </div>
);

const SkillRow = ({ category, skills }) => (
  <div className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 border-b border-zinc-100 dark:border-zinc-800/50 pb-5 last:border-0 last:pb-0 transition-colors duration-300 hover:border-zinc-300 dark:hover:border-zinc-700">
    <span className="w-28 text-base font-bold text-zinc-900 dark:text-zinc-100 transition-transform duration-300 group-hover:translate-x-2">{category}</span>
    <span className="text-base text-zinc-500 dark:text-zinc-400 flex-1 leading-relaxed transition-colors duration-300 group-hover:text-zinc-800 dark:group-hover:text-zinc-200">{skills}</span>
  </div>
);

export default App;