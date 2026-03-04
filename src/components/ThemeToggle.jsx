import { Sun, Moon, Monitor } from 'lucide-react';

export const ThemeToggle = ({ theme, cycleTheme }) => (
  <button
    onClick={cycleTheme}
    className="fixed top-6 right-6 z-50 p-3 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md backdrop-saturate-150 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 active:scale-95 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 cursor-pointer"
    aria-label="Toggle theme"
    title={`Theme: ${theme}`}
  >
    {theme === 'system' && <Monitor size={18} className="animate-in fade-in zoom-in duration-300" />}
    {theme === 'light' && <Sun size={18} className="animate-in fade-in zoom-in duration-300" />}
    {theme === 'dark' && <Moon size={18} className="animate-in fade-in zoom-in duration-300" />}
  </button>
);
