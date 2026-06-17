'use client';

import { useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  const getSnapshot = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    // Return a consistent value for server rendering
    // This prevents hydration mismatches
    return false;
  };

  const subscribe = (callback: () => void) => {
    if (typeof window === 'undefined') {
      return () => {};
    }

    const mediaQuery = window.matchMedia(query);

    mediaQuery.addEventListener('change', callback);

    return () => {
      mediaQuery.removeEventListener('change', callback);
    };
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}