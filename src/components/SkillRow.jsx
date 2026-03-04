export const SkillRow = ({ category, skills }) => (
  <div className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 border-b border-zinc-100 dark:border-zinc-800/50 pb-5 last:border-0 last:pb-0 transition-colors duration-300 hover:border-zinc-300 dark:hover:border-zinc-700">
    <span className="w-28 text-base font-bold text-zinc-900 dark:text-zinc-100 transition-transform duration-300 group-hover:translate-x-2">{category}</span>
    <span className="text-base text-zinc-500 dark:text-zinc-400 flex-1 leading-relaxed transition-colors duration-300 group-hover:text-zinc-800 dark:group-hover:text-zinc-200">{skills}</span>
  </div>
);
