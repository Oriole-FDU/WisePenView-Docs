import type {ReactNode} from 'react';
import {Pause, Play} from 'lucide-react';

import {BrowserFrame} from '../shared/BrowserFrame';
import {heroStages, type HeroStage} from './heroScenario';
import styles from './WisePenProductDemo.module.css';
import {DEMO_HEIGHT, DEMO_WIDTH, useDemoScale} from './useDemoScale';
import {useHeroSequence} from './useHeroSequence';
import {WisePenAgentPanel} from './WisePenAgentPanel';
import {WisePenNote} from './WisePenNote';
import {WisePenSidebar} from './WisePenSidebar';

export function WisePenProductDemo(): ReactNode {
  const sequence = useHeroSequence();
  const {viewportRef, scale} = useDemoScale();

  const selectStage = (stage: HeroStage) => {
    sequence.setStage(stage);
  };

  return (
    <div className={styles.demoRegion}>
      <div className={styles.demoInteractionArea}>
        <BrowserFrame>
          <div className={styles.productViewport} ref={viewportRef}>
            <div
              className={styles.productCanvas}
              data-stage={sequence.stage}
              data-phase={sequence.phase}
              data-panel-open={sequence.phase !== 'reading' ? 'true' : 'false'}
              style={{width: DEMO_WIDTH, height: DEMO_HEIGHT, transform: `scale(${scale})`}}
            >
              <WisePenSidebar />
              <WisePenNote phase={sequence.phase} progress={sequence.phaseProgress} />
              <WisePenAgentPanel phase={sequence.phase} progress={sequence.phaseProgress} />
            </div>
          </div>
        </BrowserFrame>
      </div>

      <div className={styles.sequenceControls} aria-label="演示步骤">
        <button type="button" className={styles.playButton} onClick={sequence.togglePaused} aria-label={sequence.manualPaused ? '继续播放演示' : '暂停演示'}>
          {sequence.manualPaused ? <Play /> : <Pause />}
        </button>
        <div className={styles.stageButtons}>
          {heroStages.map((item, index) => (
            <button
              type="button"
              className={sequence.stage === index ? styles.stageActive : undefined}
              onClick={() => selectStage(index as HeroStage)}
              key={item.label}
              aria-current={sequence.stage === index ? 'step' : undefined}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item.label}</strong>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
