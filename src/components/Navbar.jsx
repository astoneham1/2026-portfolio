import { useEffect } from 'react';
import { TABS } from '../constants/tabs';

// Displacement map for the bubble's lens effect: red/green channels encode how far to shift
// the backdrop horizontally/vertically, strongest at the edges and neutral (128) in the middle
const REFRACTION_MAP = `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' preserveAspectRatio='none'>
<defs>
<linearGradient id='x' x1='0' x2='1' y1='0' y2='0'><stop offset='0' stop-color='rgb(196,0,0)'/><stop offset='.25' stop-color='rgb(128,0,0)'/><stop offset='.75' stop-color='rgb(128,0,0)'/><stop offset='1' stop-color='rgb(60,0,0)'/></linearGradient>
<linearGradient id='y' x1='0' x2='0' y1='0' y2='1'><stop offset='0' stop-color='rgb(0,196,0)'/><stop offset='.3' stop-color='rgb(0,128,0)'/><stop offset='.7' stop-color='rgb(0,128,0)'/><stop offset='1' stop-color='rgb(0,60,0)'/></linearGradient>
</defs>
<rect width='100' height='100' fill='black'/>
<rect width='100' height='100' fill='url(#x)'/>
<rect width='100' height='100' fill='url(#y)' style='mix-blend-mode:screen'/>
</svg>`;

export const Navbar = ({ activeTab, isDragging, navBarRef, bubbleRef, tabRefs, handleNavClick, dragHandlers }) => {
  // backdrop-filter: url(#svg) only works in Chromium; flag it so CSS can opt in to the refraction
  useEffect(() => {
    if ('userAgentData' in navigator) document.documentElement.dataset.glassRefract = '';
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="fixed bottom-8 inset-x-0 z-100 pointer-events-none flex justify-center px-2 sm:px-6"
    >
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <filter id="nav-glass-refract" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feImage
            href={`data:image/svg+xml,${encodeURIComponent(REFRACTION_MAP)}`}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            result="map"
          />
          <feDisplacementMap in="SourceGraphic" in2="map" scale="28" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* No filter/opacity on this element: it would become a backdrop root and hide the page from the bubble's glass */}
      <div
        ref={navBarRef}
        {...dragHandlers}
        className={`relative flex items-center gap-1 sm:gap-2 p-1.5 rounded-full pointer-events-auto select-none touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <div aria-hidden="true" className="glass-pill absolute inset-0 rounded-full" />
        <div
          ref={bubbleRef}
          aria-hidden="true"
          className={`glass-bubble absolute left-0 inset-y-1.5 rounded-full pointer-events-none opacity-0 data-[ready=true]:opacity-100 ${
            isDragging
              ? ''
              : 'data-[ready=true]:transition-[transform,width] duration-500 ease-[cubic-bezier(.4,1,.7,1.2)]'
          }`}
        />

        {TABS.map((tab, idx) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[idx] = el; }}
              // Pointer taps are handled by the drag handlers; this covers keyboard / assistive tech (detail === 0)
              onClick={(e) => { if (e.detail === 0) handleNavClick(tab.id); }}
              aria-label={`Navigate to ${tab.label} section`}
              aria-current={isActive ? 'location' : undefined}
              className={`
                group relative px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-semibold
                transition-colors duration-200 outline-none cursor-pointer whitespace-nowrap
                focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-600
                ${isActive
                  ? 'text-zinc-900 dark:text-zinc-100'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }
              `}
            >
              <span
                className={`inline-block transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110 ${isActive ? 'scale-105' : ''}`}
              >
                {tab.label}
              </span>
              <span
                className={`
                  absolute left-1/2 -translate-x-1/2 bottom-0.5 sm:bottom-1 h-0.75 sm:h-1 w-4 sm:w-6 rounded-full
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
};
