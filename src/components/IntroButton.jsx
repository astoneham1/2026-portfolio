import { ArrowUpRight } from 'lucide-react';

export const IntroButton = ({ href, label, icon }) => (
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
