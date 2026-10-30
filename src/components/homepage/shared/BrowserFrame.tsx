import type {CSSProperties, ReactNode} from 'react';
import {LockKeyhole} from 'lucide-react';

import styles from './BrowserFrame.module.css';

interface BrowserFrameProps {
  children?: ReactNode;
  address?: string;
  aspectRatio?: CSSProperties['aspectRatio'];
  className?: string;
}

export function BrowserFrame({
  children,
  address = 'wisepen.oriole.cn',
  aspectRatio = '1440 / 820',
  className,
}: BrowserFrameProps): ReactNode {
  return (
    <div className={`${styles.frame} ${className ?? ''}`}>
      <div className={styles.chrome} aria-hidden="true">
        <div className={styles.dots}><span /><span /><span /></div>
        <div className={styles.address}><LockKeyhole /><span>{address}</span></div>
        <div />
      </div>
      <div className={styles.body} style={{aspectRatio}}>{children}</div>
    </div>
  );
}
