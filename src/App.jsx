import React, { useRef } from 'react';
import { useTheme } from './hooks/useTheme';
import { useScrollNavigation } from './hooks/useScrollNavigation';
import { ThemeToggle } from './components/ThemeToggle';
import { Navbar } from './components/Navbar';
import { IntroSection } from './sections/IntroSection';
import { AboutSection } from './sections/AboutSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ContactSection } from './sections/ContactSection';

const App = () => {
  const { theme, isDark, cycleTheme } = useTheme();

  const sectionRefs = {
    intro: useRef(null),
    about: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  const { activeTab, tabRefs, navBarRef, bubbleStyle, handleNavClick } = useScrollNavigation(sectionRefs);

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-600 dark:text-zinc-400 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 transition-colors duration-300 flex flex-col relative overflow-hidden">
      
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px]"></div>
     
      <ThemeToggle theme={theme} cycleTheme={cycleTheme} />

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 pt-24 pb-32 flex flex-col relative z-10 space-y-32">
        <IntroSection sectionRefs={sectionRefs} />
        <AboutSection sectionRefs={sectionRefs} />
        <ProjectsSection sectionRefs={sectionRefs} />
        <ContactSection sectionRefs={sectionRefs} />
      </main>

      <Navbar 
        activeTab={activeTab}
        navBarRef={navBarRef}
        tabRefs={tabRefs}
        bubbleStyle={bubbleStyle}
        isDark={isDark}
        handleNavClick={handleNavClick}
      />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeBlurIn {
          0% { opacity: 0; filter: blur(8px); transform: translateY(16px); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default App;