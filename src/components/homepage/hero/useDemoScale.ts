import {useEffect, useRef, useState} from 'react';

export const DEMO_WIDTH = 1440;
export const DEMO_HEIGHT = 820;

export function useDemoScale() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const update = () => setScale(viewport.clientWidth / DEMO_WIDTH);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  return {viewportRef, scale};
}
