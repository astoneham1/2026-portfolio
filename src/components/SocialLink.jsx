import { ArrowUpRight } from 'lucide-react';

export const SocialLink = ({ href, label }) => (
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
