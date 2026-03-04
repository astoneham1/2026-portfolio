import { SocialLink } from '../components/SocialLink';
import { SkillRow } from '../components/SkillRow';

export const AboutSection = ({ sectionRefs }) => (
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
    <div className="space-y-5 pt-2 opacity-0 animate-[fadeBlurIn_0.6s_ease-out_forwards_300ms]">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">Tech Stack</h3>
      <div className="flex flex-col gap-6">
        <SkillRow category="Languages" skills="Java, TypeScript, JavaScript, Python, Lua" />
        <SkillRow category="Frontend" skills="React, Tailwind CSS, HTML, CSS, Swing" />
        <SkillRow category="Backend" skills="Spring Boot, Node.js" />
        <SkillRow category="Databases" skills="PostgreSQL, MySQL, MongoDB, SQLite" />
      </div>
    </div>
  </section>
);
