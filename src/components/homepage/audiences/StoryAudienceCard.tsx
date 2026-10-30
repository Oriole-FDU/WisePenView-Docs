import type {ReactNode} from 'react';
import {ArrowRight, Check, Clock3} from 'lucide-react';

import type {StoryAudience} from './audienceContent';
import {BrowserPlaceholder} from './BrowserPlaceholder';
import styles from './StoryAudienceCard.module.css';

interface StoryAudienceCardProps {
  audience: StoryAudience;
  activeStoryIndex: number;
  onStorySelect: (storyIndex: number) => void;
}

export function StoryAudienceCard({audience, activeStoryIndex, onStorySelect}: StoryAudienceCardProps): ReactNode {
  const activeStory = audience.stories[activeStoryIndex] ?? audience.stories[0];
  const activeStoryNumber = String(audience.stories.indexOf(activeStory) + 1).padStart(2, '0');

  return (
    <article className={styles.card} data-audience={audience.id}>
      <header className={styles.header}>
        <p><span>{audience.number}</span>{audience.role}</p>
        <h2 key={`${activeStory.id}-title`}>{activeStory.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
        <div key={`${activeStory.id}-summary`}>{activeStory.summary}</div>
      </header>

      <div className={styles.storyLayout}>
        <div className={styles.storyList} role="tablist" aria-label={`${audience.role}用户故事`}>
          {audience.stories.map((story, index) => {
            const active = story.id === activeStory.id;
            return (
              <button
                type="button"
                role="tab"
                aria-selected={active}
                className={active ? styles.storyActive : undefined}
                onClick={() => onStorySelect(index)}
                key={story.id}
              >
                <span className={styles.storySummary}>
                  <span className={styles.storyNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.storyLabel}>{story.label}</span>
                  {story.status === 'coming-soon' ? <small><Clock3 />Coming Soon</small> : <ArrowRight />}
                </span>
                <span className={styles.storyExpanded} aria-hidden={!active}>
                  <span className={styles.storyExpandedInner}>
                    <span className={styles.storyDescription}>{story.detail}</span>
                    <span className={styles.storyOutcomes}>
                      {story.outcomes.map((outcome) => <span key={outcome}><Check />{outcome}</span>)}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.storyVisual} role="tabpanel">
          <BrowserPlaceholder audience={audience.role} storyNumber={activeStoryNumber} />
        </div>
      </div>
    </article>
  );
}
