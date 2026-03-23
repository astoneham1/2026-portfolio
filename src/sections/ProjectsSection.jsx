import { ProjectItem } from '../components/ProjectItem';
import { ArrowUpRight } from 'lucide-react';

export const ProjectsSection = ({ sectionRefs }) => (
  <section id="projects" ref={sectionRefs.projects} className="flex flex-col flex-1 space-y-10 min-h-[80vh]">
    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight animate-[fadeBlurIn_0.6s_ease-out_forwards]">Selected Projects</h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 group opacity-0 animate-[fadeBlurIn_0.6s_ease-out_forwards_150ms]">
      <ProjectItem 
        title="EAFC24 Higher or Lower"
        description="A higher or lower game using the stats of gold cards in EA's FC24. Save your score and compete with your friends to top the leaderboard."
        tags="Livecode, SQLite"
        link="https://github.com/astoneham1/higherlower/releases/latest"
        index={0}
      />
      <ProjectItem 
        title="Breakle"
        description="If you're a mega fan of Prison Break, this character guessing with over 100 characters from all 5 seasons is perfect for you!"
        tags="HTML, CSS, JavaScript"
        link="https://breakle.alexstoneham.co.uk"
        index={1}
      />
      <ProjectItem 
        title="Scottish Prem Tracker"
        description="Take a look at your favourite Scottish Premiership teams' recent form, games in years gone by, and how they compare to the rest of the league with this live site."
        tags="Javascript, API"
        link="https://spfl.alexstoneham.co.uk"
        index={2}
      />
      <ProjectItem 
        title="Guess The Movie"
        description="Think you know movies? Test your knowledge with this interactive quiz game that uses not so helpful descriptions."
        tags="HTML, CSS, JavaScript"
        link="https://movies.alexstoneham.co.uk"
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