import { useEffect, useState, useSyncExternalStore } from 'react';

const DARK_QUERY = '(prefers-color-scheme: dark)';

const subscribeToSystemTheme = (onChange) => {
  const query = window.matchMedia(DARK_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};

const getSystemTheme = () => (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light');

// The prerendered HTML has no way of knowing the visitor's system theme
const getServerTheme = () => 'light';

export const useTheme = () => {
  // The theme follows the system until the toggle is used; the choice lasts for this page view only
  const systemTheme = useSyncExternalStore(subscribeToSystemTheme, getSystemTheme, getServerTheme);
  const [override, setOverride] = useState(null);
  const theme = override ?? systemTheme;
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const cycleTheme = () => setOverride(isDark ? 'light' : 'dark');

  return { theme, isDark, cycleTheme };
};
