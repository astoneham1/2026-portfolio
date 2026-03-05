import { Linkedin, Github, FileText } from 'lucide-react';
import { IntroButton } from '../components/IntroButton';

export const IntroSection = ({ sectionRefs }) => (
  <section id="intro" ref={sectionRefs.intro} className="flex flex-col justify-center flex-1 min-h-[80vh] max-w-4xl mx-auto w-full -mt-12">
    <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
      {/* Profile Image */}
      <div className="flex-shrink-0 opacity-0 animate-[fadeBlurIn_0.8s_ease-out_forwards]">
        <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center overflow-hidden border-2 border-zinc-300 dark:border-zinc-700 shadow-lg">
          <img 
            src="/IMG_3915.jpeg" 
            alt="Alexander Stoneham" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Text Content */}
      <div className="flex-1">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tighter mb-4 animate-[fadeBlurIn_0.8s_ease-out_forwards]">
          Alexander Stoneham.
        </h1>
        <p className="text-lg sm:text-xl font-medium text-zinc-500 dark:text-zinc-400 opacity-0 animate-[fadeBlurIn_0.8s_ease-out_forwards_150ms]">
          Computer Science Student <span className="text-zinc-300 dark:text-zinc-700 mx-1">/</span> Developer
        </p>
        <div className="mt-10 flex flex-wrap gap-4 opacity-0 animate-[fadeBlurIn_0.8s_ease-out_forwards_300ms]">
          <IntroButton href="https://linkedin.com/in/alexstoneham" label="LinkedIn" icon={<Linkedin size={16} />} />
          <IntroButton href="https://github.com/astoneham1" label="GitHub" icon={<Github size={16} />} />
          <IntroButton href="/cv.pdf" label="CV" icon={<FileText size={16} />} />
        </div>
      </div>
    </div>
  </section>
);
