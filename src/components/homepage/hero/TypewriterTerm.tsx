import type {ReactNode} from 'react';
import {useEffect, useState} from 'react';

import styles from './TypewriterTerm.module.css';

interface TypewriterTermProps {
  words: readonly string[];
  minWidth: string;
}

type TypewriterPhase = 'hold' | 'delete' | 'type';

export function TypewriterTerm({words, minWidth}: TypewriterTermProps): ReactNode {
  const [wordIndex, setWordIndex] = useState(0);
  const [length, setLength] = useState(words[0]?.length ?? 0);
  const [phase, setPhase] = useState<TypewriterPhase>('hold');
  const [reducedMotion, setReducedMotion] = useState(false);
  const word = words[wordIndex] ?? '';

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion || words.length < 2) return undefined;

    const delay = phase === 'hold' ? 1450 : phase === 'delete' ? 42 : 86;
    const timer = window.setTimeout(() => {
      if (phase === 'hold') {
        setPhase('delete');
        return;
      }
      if (phase === 'delete') {
        if (length > 0) {
          setLength((current) => current - 1);
          return;
        }
        const nextIndex = (wordIndex + 1) % words.length;
        setWordIndex(nextIndex);
        setPhase('type');
        return;
      }
      if (length < word.length) {
        setLength((current) => current + 1);
        return;
      }
      setPhase('hold');
    }, delay);

    return () => window.clearTimeout(timer);
  }, [length, phase, reducedMotion, word, wordIndex, words]);

  return (
    <span className={styles.slot} style={{minWidth}} aria-label={words.join('、')}>
      <span aria-hidden="true">{word.slice(0, length) || '\u00a0'}</span>
      <i className={styles.caret} aria-hidden="true" />
    </span>
  );
}
