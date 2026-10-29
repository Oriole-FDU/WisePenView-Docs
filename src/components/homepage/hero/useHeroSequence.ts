import {useEffect, useMemo, useRef, useState} from 'react';

import {heroPhases, type HeroStage} from './heroScenario';

export function useHeroSequence() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const progressRef = useRef(0);
  const [manualPaused, setManualPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const paused = manualPaused || interactionPaused;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    const phase = heroPhases[phaseIndex];
    const startedAt = performance.now() - progressRef.current * phase.duration;
    const tick = () => {
      const nextProgress = Math.min(1, (performance.now() - startedAt) / phase.duration);
      progressRef.current = nextProgress;
      setPhaseProgress(nextProgress);
      if (nextProgress >= 1) {
        progressRef.current = 0;
        setPhaseIndex((current) => (current + 1) % heroPhases.length);
        setPhaseProgress(0);
      }
    };

    const timer = window.setInterval(tick, 32);
    tick();
    return () => window.clearInterval(timer);
  }, [paused, phaseIndex, reducedMotion]);

  const resolvedPhaseIndex = reducedMotion ? heroPhases.length - 1 : phaseIndex;
  const phase = heroPhases[resolvedPhaseIndex];
  const stage = phase.stage as HeroStage;

  const firstPhaseByStage = useMemo(
    () => heroPhases.map((_, index) => index).filter((index) => heroPhases.findIndex((item) => item.stage === heroPhases[index].stage) === index),
    [],
  );

  const setStage = (target: HeroStage) => {
    const targetIndex = heroPhases.findIndex((item) => item.stage === target);
    if (targetIndex < 0) return;
    progressRef.current = 0;
    setPhaseIndex(targetIndex);
    setPhaseProgress(0);
  };

  return {
    phase: phase.id,
    phaseProgress: reducedMotion ? 1 : phaseProgress,
    stage,
    paused,
    manualPaused,
    reducedMotion,
    firstPhaseByStage,
    setStage,
    togglePaused: () => setManualPaused((value) => !value),
    pauseInteraction: () => setInteractionPaused(true),
    resumeInteraction: () => setInteractionPaused(false),
  };
}
