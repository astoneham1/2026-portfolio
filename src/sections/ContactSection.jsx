import { Mail, Linkedin, Github, ArrowUpRight, MapPin } from 'lucide-react';

export const ContactSection = ({ sectionRefs }) => (
  <section id="contact" ref={sectionRefs.contact} className="flex flex-col justify-center flex-1 space-y-8 min-h-[60vh]">
    <div className="animate-[fadeBlurIn_0.6s_ease-out_forwards]">
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">Let's Connect</h2>
      <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed opacity-0 animate-[fadeBlurIn_0.6s_ease-out_forwards_100ms]">
        I'm always open to new projects, collaborations, and conversations. Reach out and let's build something great together.
      </p>
    </div>
    <div className="flex flex-col sm:flex-row gap-4 pt-4 opacity-0 animate-[fadeBlurIn_0.6s_ease-out_forwards_200ms]">
      <a
        href="mailto:me@alexstoneham.co.uk"
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 cursor-pointer"
      >
        <Mail size={18} />
        Email Me
        <ArrowUpRight size={16} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
      </a>
      <a
        href="https://linkedin.com/in/alexstoneham"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 font-semibold transition-all duration-200 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 cursor-pointer"
      >
        <Linkedin size={18} />
        LinkedIn
        <ArrowUpRight size={16} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
      </a>
      <a
        href="https://github.com/astoneham1"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 font-semibold transition-all duration-200 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 cursor-pointer"
      >
        <Github size={18} />
        GitHub
        <ArrowUpRight size={16} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
      </a>
    </div>
    <div className="flex items-center gap-2 pt-4 opacity-0 animate-[fadeBlurIn_0.6s_ease-out_forwards_300ms]">
      <MapPin size={18} className="text-zinc-500 dark:text-zinc-400" />
      <span className="text-base text-zinc-500 dark:text-zinc-400">Edinburgh & St. Andrews, GB</span>
    </div>
  </section>
);
