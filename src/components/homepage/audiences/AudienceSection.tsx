import type {ReactNode} from 'react';

import {SchoolAudienceCard} from './SchoolAudienceCard';
import {StoryAudienceCard} from './StoryAudienceCard';
import {storyAudiences} from './audienceContent';
import styles from './AudienceSection.module.css';
import {useAudienceRail} from './useAudienceRail';

const audienceLabels = ['学生', '教师', '学校'] as const;
const storyCounts = [3, 3, 1] as const;

export function AudienceSection(): ReactNode {
  const rail = useAudienceRail(storyCounts);

  return (
    <section className={styles.section} id="audiences" aria-label="WisePen 为谁服务">
      <div className={styles.railSection} ref={rail.sectionRef}>
        <div className={styles.sticky}>
          <div className={styles.railHeader}>
            <div>
              <p>为学生、教师与学校而设计</p>
              <h2>从日常学习和教学开始，让有价值的过程持续生长。</h2>
            </div>
            <nav aria-label="受众卡片">
              {audienceLabels.map((label, index) => (
                <button
                  type="button"
                  className={rail.activeAudienceIndex === index ? styles.navActive : undefined}
                  onClick={() => rail.goToAudience(index)}
                  key={label}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>{label}
                </button>
              ))}
            </nav>
          </div>

          <div
            className={styles.viewport}
            ref={rail.viewportRef}
            onScroll={(event) => {
              if (window.matchMedia('(max-width: 900px)').matches) {
                const target = event.currentTarget;
                const card = target.querySelector('article');
                if (card) rail.setActiveAudienceIndex(Math.round(target.scrollLeft / (card.getBoundingClientRect().width + 20)));
              }
            }}
          >
            <div className={styles.track} ref={rail.trackRef} style={{transform: `translate3d(${rail.translateX}px, 0, 0)`}}>
              {storyAudiences.map((audience, index) => (
                <StoryAudienceCard
                  audience={audience}
                  activeStoryIndex={rail.storyIndexes[index] ?? 0}
                  onStorySelect={(storyIndex) => rail.goToStory(index, storyIndex)}
                  key={audience.id}
                />
              ))}
              <SchoolAudienceCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
