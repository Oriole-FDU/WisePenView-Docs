import type {ReactNode} from 'react';
import {LockKeyhole} from 'lucide-react';

import styles from './BrowserFrame.module.css';

interface BrowserFrameProps {
  children: ReactNode;
}

export function BrowserFrame({children}: BrowserFrameProps): ReactNode {
  return (
    <div className={styles.browserFrame}>
      <div className={styles.browserChrome} aria-hidden="true">
        <div className={styles.windowDots}><span /><span /><span /></div>
        <div className={styles.addressBar}><LockKeyhole /><span>wisepen.oriole.cn</span></div>
        <div className={styles.chromeSpacer} />
      </div>
      <div className={styles.browserBody}>{children}</div>
    </div>
  );
}
