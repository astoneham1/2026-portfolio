import { SkillRow } from '../components/SkillRow';

export const SkillsSection = ({ sectionRefs }) => (
  <section id="skills" ref={sectionRefs.skills} className="flex flex-col flex-1 space-y-10 min-h-[80vh]">
    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight animate-[fadeBlurIn_0.6s_ease-out_forwards]">Technical Arsenal</h2>
    <div className="flex flex-col gap-8 opacity-0 animate-[fadeBlurIn_0.6s_ease-out_forwards_150ms]">
      <SkillRow category="Languages" skills="Java, TypeScript, JavaScript, Python, Lua" />
      <SkillRow category="Frontend" skills="React, Tailwind CSS, HTML, CSS, Swing" />
      <SkillRow category="Backend" skills="Spring Boot, Node.js" />
      <SkillRow category="Databases" skills="PostgreSQL, MySQL, MongoDB, SQLite" />
    </div>
  </section>
);
