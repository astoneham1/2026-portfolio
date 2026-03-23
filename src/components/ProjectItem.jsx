import { ArrowUpRight } from 'lucide-react';

export const ProjectItem = ({ title, description, tags, link, index }) => (
  <div 
    className="flex flex-col gap-4 w-full h-full transition-all duration-300 group-hover:opacity-50 hover:opacity-100 p-5 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/40 border border-transparent hover:border-zinc-200/50 dark:hover:border-zinc-800/50 opacity-0 animate-[slideInUp_0.6s_ease-out_forwards]"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="flex-1 space-y-2">
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 w-fit hover:underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 rounded-sm cursor-pointer"
      >
        {title}
        <ArrowUpRight size={16} className="text-zinc-400 opacity-0 -translate-y-2 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:rotate-12" />
      </a>
      <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed transition-colors duration-300 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
        {description}
      </p>
    </div>
    {/* mt-auto pushes the tags to the bottom of the card */}
    <div className="text-xs font-mono font-medium text-zinc-400 dark:text-zinc-500 mt-auto">
      {tags}
    </div>
  </div>
);