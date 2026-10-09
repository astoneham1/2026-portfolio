import { useEffect, useState, useRef, useCallback } from 'react';
import { TABS } from '../constants/tabs';

const getHashTab = () => {
  const id = window.location.hash.slice(1);
  return TABS.some(tab => tab.id === id) ? id : null;
};

export const useScrollNavigation = (sectionRefs) => {
  const [activeTab, setActiveTab] = useState(() => getHashTab() ?? 'intro');
  const [isDragging, setIsDragging] = useState(false);

  const tabRefs = useRef([]);
  const navBarRef = useRef(null);
  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0 });

  // Get discrete position for a tab ID
  const getTabStyle = useCallback((tabId) => {
    if (!tabRefs.current || !navBarRef.current) return null;
    const idx = TABS.findIndex(tab => tab.id === tabId);
    const node = tabRefs.current[idx];
    const navNode = navBarRef.current;
    if (node && navNode) {
      const { left: tabLeft, width } = node.getBoundingClientRect();
      const { left: navLeft } = navNode.getBoundingClientRect();
      return {
        left: tabLeft - navLeft,
        width,
      };
    }
    return null;
  }, []);

  // Update active tab on window scroll (only when not dragging)
  useEffect(() => {
    if (isDragging) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const targetY = scrollY + 180;

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
  }, [sectionRefs, isDragging]);

  // Reflect the active section in the URL hash (replaceState keeps history clean)
  useEffect(() => {
    if (isDragging) return;
    const hash = activeTab === 'intro' ? '' : `#${activeTab}`;
    if (window.location.hash === hash) return;
    try {
      window.history.replaceState(null, '', window.location.pathname + window.location.search + hash);
    } catch {
      // replaceState can be rate limited (Safari); the URL is a nicety, so ignore
    }
  }, [activeTab, isDragging]);

  // Jump to the linked section on first load, and follow manual hash edits
  useEffect(() => {
    const scrollToHash = (behavior) => {
      const id = getHashTab();
      if (!id || id === 'intro') return;
      sectionRefs[id]?.current?.scrollIntoView({ behavior, block: 'start' });
    };

    // On Back/Forward the browser restores the exact scroll position; don't override it
    const navType = performance.getEntriesByType('navigation')[0]?.type;
    if (navType !== 'back_forward') scrollToHash('instant');
    const onHashChange = () => scrollToHash('smooth');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
    // sectionRefs holds stable ref objects; run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update bubble position when activeTab changes (when not dragging)
  useEffect(() => {
    if (isDragging) return;
    const style = getTabStyle(activeTab);
    if (style) {
      setBubbleStyle(style);
    }
  }, [activeTab, getTabStyle, isDragging]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!isDragging) {
        const style = getTabStyle(activeTab);
        if (style) setBubbleStyle(style);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab, getTabStyle, isDragging]);

  // Continuous fluid interpolation calculation during dragging
  const updateDragBubble = useCallback((clientX) => {
    if (!navBarRef.current || !tabRefs.current) return activeTab;

    const navNode = navBarRef.current;
    const navRect = navNode.getBoundingClientRect();
    const pointerX = clientX - navRect.left;

    const tabGeometries = TABS.map((tab, idx) => {
      const node = tabRefs.current[idx];
      if (!node) return null;
      const { left: tabLeft, width } = node.getBoundingClientRect();
      const relLeft = tabLeft - navRect.left;
      const centerX = relLeft + width / 2;
      return { id: tab.id, left: relLeft, width, centerX };
    }).filter(Boolean);

    if (tabGeometries.length === 0) return activeTab;

    let targetLeft = tabGeometries[0].left;
    let targetWidth = tabGeometries[0].width;
    let closestTabId = tabGeometries[0].id;

    if (pointerX <= tabGeometries[0].centerX) {
      targetLeft = tabGeometries[0].left;
      targetWidth = tabGeometries[0].width;
      closestTabId = tabGeometries[0].id;
    } else if (pointerX >= tabGeometries[tabGeometries.length - 1].centerX) {
      const last = tabGeometries[tabGeometries.length - 1];
      targetLeft = last.left;
      targetWidth = last.width;
      closestTabId = last.id;
    } else {
      for (let i = 0; i < tabGeometries.length - 1; i++) {
        const current = tabGeometries[i];
        const next = tabGeometries[i + 1];

        if (pointerX >= current.centerX && pointerX <= next.centerX) {
          const progress = (pointerX - current.centerX) / (next.centerX - current.centerX);
          targetLeft = current.left + (next.left - current.left) * progress;
          targetWidth = current.width + (next.width - current.width) * progress;
          closestTabId = progress < 0.5 ? current.id : next.id;
          break;
        }
      }
    }

    setBubbleStyle({ left: targetLeft, width: targetWidth });
    setActiveTab(closestTabId);
    return closestTabId;
  }, [activeTab]);

  const handleNavClick = useCallback((id) => {
    if (id === 'intro') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const ref = sectionRefs[id];
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [sectionRefs]);

  const onPointerDown = useCallback((e) => {
    setIsDragging(true);
    updateDragBubble(e.clientX);
  }, [updateDragBubble]);

  useEffect(() => {
    if (!isDragging) return;

    let releaseTabId = activeTab;

    const onPointerMove = (e) => {
      releaseTabId = updateDragBubble(e.clientX);
    };

    const onPointerUp = (e) => {
      if (e) {
        releaseTabId = updateDragBubble(e.clientX);
      }
      setIsDragging(false);
      handleNavClick(releaseTabId);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [isDragging, updateDragBubble, handleNavClick, activeTab]);

  return {
    activeTab,
    tabRefs,
    navBarRef,
    bubbleStyle,
    handleNavClick,
    onPointerDown,
    isDragging,
  };
};


