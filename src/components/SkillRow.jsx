export const SkillRow = ({ category, skills }) => {
  const skillList = Array.isArray(skills)
    ? skills
    : (typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : []);

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 border-b border-zinc-100 dark:border-zinc-800/50 pb-5 last:border-0 last:pb-0 transition-colors duration-300">
      <span className="w-28 text-base font-bold text-zinc-900 dark:text-zinc-100 shrink-0 transition-transform duration-300 group-hover:translate-x-1">
        {category}
      </span>
      <div className="flex flex-wrap gap-2 flex-1">
        {skillList.map((skill, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-xs font-mono font-medium rounded-lg bg-zinc-100/60 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-md transition-all duration-200 hover:bg-white dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-105"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

