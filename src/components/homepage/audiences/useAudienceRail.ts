import {useEffect, useMemo, useRef, useState} from 'react';

const MOBILE_QUERY = '(max-width: 900px)';
const REDUCE_QUERY = '(prefers-reduced-motion: reduce)';

interface RailStop {
  audienceIndex: number;
  storyIndex: number;
}

export function useAudienceRail(storyCounts: readonly number[]) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeAudienceIndex, setActiveAudienceIndex] = useState(0);
  const [storyIndexes, setStoryIndexes] = useState(() => storyCounts.map(() => 0));
  const [translateX, setTranslateX] = useState(0);

  const timeline = useMemo<RailStop[]>(
    () => storyCounts.flatMap((count, audienceIndex) =>
      Array.from({length: count}, (_, storyIndex) => ({audienceIndex, storyIndex})),
    ),
    [storyCounts],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return undefined;

    const mobile = window.matchMedia(MOBILE_QUERY);
    const reduceMotion = window.matchMedia(REDUCE_QUERY);
    let frame = 0;
    let stepDistance = 480;
    let cardOffsets: number[] = [];

    const disabled = () => mobile.matches || reduceMotion.matches;

    const measure = () => {
      if (disabled()) {
        section.style.height = '';
        setTranslateX(0);
        return;
      }
      const cards = Array.from(track.children) as HTMLElement[];
      const firstCard = cards[0];
      const firstOffset = firstCard?.offsetLeft ?? 0;
      cardOffsets = cards.map((card) => card.offsetLeft - firstOffset);

      const lastCard = cards.at(-1);
      if (lastCard && cardOffsets.length > 1) {
        const rightInset = Number.parseFloat(window.getComputedStyle(track).paddingRight) || firstOffset;
        const rightAlignedOffset = lastCard.offsetLeft + lastCard.offsetWidth - (viewport.clientWidth - rightInset);
        cardOffsets[cardOffsets.length - 1] = Math.max(0, rightAlignedOffset);
      }

      stepDistance = Math.max(420, Math.min(620, window.innerHeight * 0.62));
      section.style.height = `${window.innerHeight + (timeline.length - 1) * stepDistance}px`;
    };

    const update = () => {
      if (disabled()) return;
      const rect = section.getBoundingClientRect();
      const rawStep = Math.max(0, Math.min(timeline.length - 1, -rect.top / stepDistance));
      const stop = timeline[Math.round(rawStep)];
      if (!stop) return;

      setActiveAudienceIndex(stop.audienceIndex);
      setStoryIndexes((current) => {
        if (current[stop.audienceIndex] === stop.storyIndex) return current;
        const next = [...current];
        next[stop.audienceIndex] = stop.storyIndex;
        return next;
      });

      const previousStep = Math.floor(rawStep);
      const nextStep = Math.ceil(rawStep);
      const previousAudience = timeline[previousStep]?.audienceIndex ?? stop.audienceIndex;
      const nextAudience = timeline[nextStep]?.audienceIndex ?? previousAudience;
      const progress = rawStep - previousStep;
      const easedProgress = progress * progress * (3 - 2 * progress);
      const previousOffset = cardOffsets[previousAudience] ?? 0;
      const nextOffset = cardOffsets[nextAudience] ?? previousOffset;
      setTranslateX(-(previousOffset + (nextOffset - previousOffset) * easedProgress));
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };
    const onResize = () => { measure(); update(); };

    measure();
    update();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onResize);
    mobile.addEventListener('change', onResize);
    reduceMotion.addEventListener('change', onResize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      mobile.removeEventListener('change', onResize);
      reduceMotion.removeEventListener('change', onResize);
      section.style.height = '';
    };
  }, [timeline]);

  const scrollToStop = (audienceIndex: number, storyIndex: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const mobile = window.matchMedia(MOBILE_QUERY).matches;
    const reduceMotion = window.matchMedia(REDUCE_QUERY).matches;
    if (mobile || reduceMotion) {
      setActiveAudienceIndex(audienceIndex);
      setStoryIndexes((current) => current.map((value, index) => index === audienceIndex ? storyIndex : value));
      trackRef.current?.children[audienceIndex]?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      return;
    }
    const stopIndex = timeline.findIndex((stop) => stop.audienceIndex === audienceIndex && stop.storyIndex === storyIndex);
    if (stopIndex < 0) return;
    const top = window.scrollY + section.getBoundingClientRect().top;
    const scrollable = section.offsetHeight - window.innerHeight;
    window.scrollTo({top: top + scrollable * stopIndex / Math.max(1, timeline.length - 1), behavior: 'smooth'});
  };

  const goToAudience = (audienceIndex: number) => scrollToStop(audienceIndex, 0);

  return {
    sectionRef,
    viewportRef,
    trackRef,
    translateX,
    activeAudienceIndex,
    storyIndexes,
    setActiveAudienceIndex,
    goToAudience,
    goToStory: scrollToStop,
  };
}
