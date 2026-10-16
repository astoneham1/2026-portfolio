import type { RefObject } from 'react';

export const TABS = [
  { id: 'intro', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;

export type TabId = (typeof TABS)[number]['id'];

export type SectionRef = RefObject<HTMLElement | null>;
export type SectionRefs = Record<TabId, SectionRef>;

export const isTabId = (id: string): id is TabId => TABS.some(tab => tab.id === id);
