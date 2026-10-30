import type {ReactNode} from 'react';

import {BrowserFrame} from '../shared/BrowserFrame';
import styles from './BrowserPlaceholder.module.css';

interface BrowserPlaceholderProps {
  audience: string;
  storyNumber: string;
}

export function BrowserPlaceholder({audience, storyNumber}: BrowserPlaceholderProps): ReactNode {
  const title = `${audience}-${storyNumber}-演示`;

  return (
    <BrowserFrame className={styles.frame} aspectRatio="16 / 10">
      <div className={styles.blank} aria-label={`${title}占位`}>
        <strong>{title}</strong>
        <span>Coming Soon</span>
      </div>
    </BrowserFrame>
  );
}
