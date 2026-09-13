import { useEffect, useState } from 'react';

declare global {
  interface Window {
    /** Set by the inline preloader in index.html the moment it starts fading. */
    __loaded?: boolean;
  }
}

/**
 * True once the boot overlay has handed the screen over.
 *
 * Entrance animations that are worth watching should wait on this: they mount
 * long before the overlay clears, so without the gate they play to nobody.
 * Falls back to `true` when there is no overlay at all (dev HMR, a build that
 * stripped it), so nothing can get stuck unmounted.
 */
export default function useAppLoaded() {
  const [loaded, setLoaded] = useState(
    () => !!window.__loaded || !document.getElementById('preloader')
  );

  useEffect(() => {
    if (loaded) return;
    const onLoaded = () => setLoaded(true);
    window.addEventListener('app:loaded', onLoaded);
    return () => window.removeEventListener('app:loaded', onLoaded);
  }, [loaded]);

  return loaded;
}
