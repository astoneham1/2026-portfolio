import { useEffect, useState, useRef } from 'react';
import { TABS } from '../constants/tabs';

export const useScrollNavigation = (sectionRefs) => {
  const [activeTab, setActiveTab] = useState('intro');
  const tabRefs = useRef([]);
  const navBarRef = useRef(null);
  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const targetY = scrollY + 180; // Header top threshold

      const offsets = Object.entries(sectionRefs).map(([id, ref]) => {
        if (!ref.current) return { id, offset: Infinity };
        const rect = ref.current.getBoundingClientRect();
        const offset = rect.top + scrollY;
        return { id, offset };
      });

      const active = offsets.reduce((closest, current) => {
        const currentDist = Math.abs(current.offset - targetY);
        const closestDist = Math.abs(closest.offset - targetY);
        return currentDist < closestDist ? current : closest;
      });

      setActiveTab(active.id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRefs]);

  useEffect(() => {
    if (!tabRefs.current || !navBarRef.current) return;
    const idx = TABS.findIndex(tab => tab.id === activeTab);
    const node = tabRefs.current[idx];
    const navNode = navBarRef.current;
    if (node && navNode) {
      const { left: tabLeft, width } = node.getBoundingClientRect();
      const { left: navLeft } = navNode.getBoundingClientRect();
      let left = tabLeft - navLeft;
      setBubbleStyle({
        left,
        width,
      });
    }
  }, [activeTab]);

  const handleNavClick = (id) => {
    if (id === 'intro') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const ref = sectionRefs[id];
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return { activeTab, tabRefs, navBarRef, bubbleStyle, handleNavClick };
};
