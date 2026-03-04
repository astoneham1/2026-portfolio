import { TABS } from '../constants/tabs';

export const Navbar = ({ activeTab, navBarRef, tabRefs, bubbleStyle, isDark, handleNavClick }) => (
  // 1. Changed px-6 to px-2 sm:px-6 to give the nav more breathing room on mobile
  <nav className="fixed bottom-8 inset-x-0 z-[100] pointer-events-none flex justify-center px-2 sm:px-6">
    <div
      ref={navBarRef}
      // 2. Slightly reduced the mobile gap from gap-1.5 to gap-1
      className="flex items-center gap-1 sm:gap-2 p-1.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl backdrop-saturate-150 border border-zinc-200/50 dark:border-zinc-800/50 rounded-full shadow-2xl pointer-events-auto select-none overflow-hidden relative"
    >
      <div
        className="absolute top-0 h-full z-0 transition-all duration-500"
        style={{
          left: bubbleStyle.left,
          width: bubbleStyle.width,
          background: isDark
            ? 'linear-gradient(135deg,rgba(255,255,255,0.18) 60%,rgba(200,200,255,0.10) 100%)'
            : 'linear-gradient(135deg,rgba(255,255,255,0.45) 60%,rgba(200,200,255,0.18) 100%)',
          backdropFilter: 'blur(24px) saturate(180%) brightness(1.18) contrast(1.12)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%) brightness(1.18) contrast(1.12)',
          borderRadius: '9999px',
          border: isDark
            ? '1.5px solid rgba(255,255,255,0.22)'
            : '1.5px solid rgba(180,180,255,0.18)',
          boxShadow: isDark
            ? '0 6px 32px 0 rgba(0,0,0,0.22), 0 0 0 2px rgba(255,255,255,0.12)'
            : '0 6px 32px 0 rgba(0,0,0,0.10), 0 0 0 2px rgba(180,180,255,0.10)',
          opacity: 0.98,
          transition: 'left 0.5s cubic-bezier(.4,1,.7,1.2), width 0.5s cubic-bezier(.4,1,.7,1.2), background 0.3s',
          pointerEvents: 'none',
        }}
      />
      {TABS.map((tab, idx) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            ref={el => tabRefs.current[idx] = el}
            onClick={() => handleNavClick(tab.id)}
            className={`
              /* 3. Responsive padding, text size, and added whitespace-nowrap */
              relative px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold 
              transition-all duration-200 outline-none cursor-pointer
              focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600
              z-10 whitespace-nowrap
              ${isActive 
                ? 'text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }
              group
            `}
            style={{ background: 'transparent' }}
          >
            <span
              className={`
                relative z-20 transition-all duration-300 inline-block
                ${isActive ? 'font-extrabold scale-105' : ''}
                group-hover:-translate-y-1 group-hover:scale-110
              `}
            >
              {tab.label}
            </span>
            <span
              className={`
                absolute left-1/2 -translate-x-1/2 bottom-1 h-1 w-4 sm:w-6 rounded-full
                bg-zinc-900 dark:bg-white transition-all duration-300
                ${isActive ? 'opacity-80 scale-x-100' : 'opacity-0 scale-x-50'}
              `}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  </nav>
);