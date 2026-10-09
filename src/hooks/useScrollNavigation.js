import { useCallback, useEffect, useRef, useState } from 'react';
import { TABS } from '../constants/tabs';

// A section counts as "current" when its top is closest to this far below the viewport top
const ACTIVE_LINE_OFFSET = 180;
// A programmatic scroll is considered finished once no scroll event has fired for this long
const SETTLE_MS = 200;

const smoothBehavior = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';

const getHashTab = () => {
  const id = window.location.hash.slice(1);
  return TABS.some(tab => tab.id === id) ? id : null;
};

export const useScrollNavigation = (sectionRefs) => {
  const [activeTab, setActiveTab] = useState(() => getHashTab() ?? 'intro');
  const [isDragging, setIsDragging] = useState(false);

  const navBarRef = useRef(null);
  const bubbleRef = useRef(null);
  const tabRefs = useRef([]);

  // Mirrors of state for use inside event handlers and observers
  const activeTabRef = useRef(activeTab);
  const draggingRef = useRef(false);
  // True while a click/drag-initiated scroll is in flight, so scroll events don't fight the chosen tab
  const navigatingRef = useRef(false);
  const settleTimer = useRef(null);

  // The bubble is positioned straight on the DOM node: no re-render per drag move, no stale measurements
  const syncBubble = useCallback((animate = true) => {
    const bubble = bubbleRef.current;
    const node = tabRefs.current[TABS.findIndex(tab => tab.id === activeTabRef.current)];
    if (!bubble || !node) return;

    if (!animate) bubble.style.transition = 'none';
    bubble.style.width = `${node.offsetWidth}px`;
    bubble.style.transform = `translateX(${node.offsetLeft}px)`;
    if (!animate) {
      bubble.offsetWidth; // flush so the jump isn't animated once transitions are restored
      bubble.style.transition = '';
    }

    // Reveal (and enable transitions) only after the first placement, so it never animates in from 0
    if (bubble.dataset.ready !== 'true') {
      requestAnimationFrame(() => { bubble.dataset.ready = 'true'; });
    }
  }, []);

  const syncActiveFromScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const atBottom = scrollY > 0 && window.innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) {
      setActiveTab(TABS[TABS.length - 1].id);
      return;
    }

    const targetY = scrollY + ACTIVE_LINE_OFFSET;
    let closestId = TABS[0].id;
    let closestDist = Infinity;
    for (const { id } of TABS) {
      const node = sectionRefs[id]?.current;
      if (!node) continue;
      const dist = Math.abs(node.getBoundingClientRect().top + scrollY - targetY);
      if (dist < closestDist) {
        closestDist = dist;
        closestId = id;
      }
    }
    setActiveTab(closestId);
  }, [sectionRefs]);

  // (Re)start the "scroll has stopped" countdown; when it fires, hand control back to scroll tracking
  const armSettle = useCallback(() => {
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      navigatingRef.current = false;
      syncActiveFromScroll();
    }, SETTLE_MS);
  }, [syncActiveFromScroll]);

  useEffect(() => () => clearTimeout(settleTimer.current), []);

  // Track the section in view while the user scrolls
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (navigatingRef.current) {
        armSettle();
        return;
      }
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        syncActiveFromScroll();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [armSettle, syncActiveFromScroll]);

  // Keep the bubble on the active tab (unless the pointer is driving it)
  useEffect(() => {
    activeTabRef.current = activeTab;
    if (!isDragging) syncBubble();
  }, [activeTab, isDragging, syncBubble]);

  // Re-place the bubble, without animating, when the navbar's size changes (resize, font load)
  useEffect(() => {
    const nav = navBarRef.current;
    if (!nav) return;
    const resync = () => {
      if (!draggingRef.current) syncBubble(false);
    };
    const observer = new ResizeObserver(resync);
    observer.observe(nav);
    document.fonts?.ready.then(resync);
    return () => observer.disconnect();
  }, [syncBubble]);

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
    const onHashChange = () => scrollToHash(smoothBehavior());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [sectionRefs]);

  const handleNavClick = useCallback((id) => {
    // Commit to the chosen tab immediately; scroll events are ignored until the scroll settles
    navigatingRef.current = true;
    setActiveTab(id);
    armSettle();

    if (id === 'intro') {
      window.scrollTo({ top: 0, behavior: smoothBehavior() });
    } else {
      sectionRefs[id]?.current?.scrollIntoView({ behavior: smoothBehavior(), block: 'start' });
    }
  }, [sectionRefs, armSettle]);

  // Slide the bubble to the pointer, interpolating between neighbouring tabs. Returns the nearest tab id.
  const dragBubbleTo = useCallback((clientX) => {
    const nav = navBarRef.current;
    const bubble = bubbleRef.current;
    if (!nav || !bubble) return activeTabRef.current;

    const pointerX = clientX - nav.getBoundingClientRect().left - nav.clientLeft;
    const tabs = TABS.map((tab, idx) => {
      const node = tabRefs.current[idx];
      return node && {
        id: tab.id,
        left: node.offsetLeft,
        width: node.offsetWidth,
        center: node.offsetLeft + node.offsetWidth / 2,
      };
    }).filter(Boolean);
    if (tabs.length === 0) return activeTabRef.current;

    const first = tabs[0];
    const last = tabs[tabs.length - 1];
    let left = first.left;
    let width = first.width;
    let nearest = first.id;

    if (pointerX >= last.center) {
      ({ left, width } = last);
      nearest = last.id;
    } else if (pointerX > first.center) {
      const i = tabs.findIndex((tab, idx) => idx < tabs.length - 1 && pointerX <= tabs[idx + 1].center);
      const from = tabs[i];
      const to = tabs[i + 1];
      const progress = (pointerX - from.center) / (to.center - from.center);
      left = from.left + (to.left - from.left) * progress;
      width = from.width + (to.width - from.width) * progress;
      nearest = progress < 0.5 ? from.id : to.id;
    }

    bubble.style.width = `${width}px`;
    bubble.style.transform = `translateX(${left}px)`;
    setActiveTab(nearest);
    return nearest;
  }, []);

  const endDrag = useCallback(() => {
    draggingRef.current = false;
    setIsDragging(false);
  }, []);

  // Pointer capture keeps move/up events coming to the navbar even when the pointer leaves it
  const dragHandlers = {
    onPointerDown: (e) => {
      if (e.button !== 0) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      draggingRef.current = true;
      setIsDragging(true);
      dragBubbleTo(e.clientX);
    },
    onPointerMove: (e) => {
      if (draggingRef.current) dragBubbleTo(e.clientX);
    },
    onPointerUp: (e) => {
      if (!draggingRef.current) return;
      const id = dragBubbleTo(e.clientX);
      endDrag();
      handleNavClick(id);
    },
    onPointerCancel: () => {
      if (!draggingRef.current) return;
      endDrag();
      syncActiveFromScroll(); // nothing was chosen, so go back to the section actually in view
    },
  };

  return {
    activeTab,
    isDragging,
    navBarRef,
    bubbleRef,
    tabRefs,
    handleNavClick,
    dragHandlers,
  };
};
