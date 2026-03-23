import { ProjectItem } from '../components/ProjectItem';
import { ArrowUpRight } from 'lucide-react';

export const ProjectsSection = ({ sectionRefs }) => (
  <section id="projects" ref={sectionRefs.projects} className="flex flex-col flex-1 space-y-10 min-h-[80vh]">
    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight animate-[fadeBlurIn_0.6s_ease-out_forwards]">Selected Projects</h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 group opacity-0 animate-[fadeBlurIn_0.6s_ease-out_forwards_150ms]">
        <ProjectItem 
        title="Guess The Movie"
        description="Think you know movies? Test your knowledge with this interactive quiz game."
        tags="HTML, CSS, JavaScript"
        link="https://movies.alexstoneham.co.uk"
        index={0}
      />
      <ProjectItem 
        title="Breakle"
        description="If you're a mega fan of Prison Break, see if you can guess the character!"
        tags="HTML, CSS, JavaScript"
        link="https://breakle.alexstoneham.co.uk"
        index={1} // Adjusted index sequence slightly for smoother animations
      />
      <ProjectItem 
        title="Scottish Premiership Tracker"
        description="Take a look at how your favourite scottish team is performing this season, with detailed stats for teams, matches, and players"
        tags="Javascript, API"
        link="https://spfl.alexstoneham.co.uk"
        index={2}
      />
      <ProjectItem 
        title="EAFC24 Higher or Lower"
        description="Play a higher or lower game inspired by stats of cards from EAFC24"
        tags="Livecode"
        link="https://github.com/astoneham1/higherlower/releases/latest"
        index={3}
      />
    </div>

    <a
      href="https://projects.alexstoneham.co.uk"
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600 w-fit cursor-pointer"
    >
      View All Projects
      <ArrowUpRight size={18} className="transition-transform duration-300" />
    </a>
  </section>
);