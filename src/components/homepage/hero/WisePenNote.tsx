import type {ReactNode} from 'react';
import {Bot, ChevronRight, Ellipsis, Folder, MessageSquareText, NotebookPen, PanelRight} from 'lucide-react';

import {heroScenario, type HeroPhase} from './heroScenario';
import styles from './WisePenNote.module.css';

interface WisePenNoteProps {
  phase: HeroPhase;
  progress: number;
}

const take = (text: string, progress: number) => text.slice(0, Math.ceil(text.length * progress));
const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function WisePenNote({phase, progress}: WisePenNoteProps): ReactNode {
  const editing = phase === 'streaming' || phase === 'reviewing';
  const accepted = phase === 'accepted';
  const agentOpen = phase !== 'reading';

  const renderRevision = (original: string, revised: string, index: number) => {
    const partProgress = phase === 'streaming' ? clamp(progress * 3 - index) : editing || accepted ? 1 : 0;
    const changed = editing && partProgress > 0;
    if (!changed && !accepted) return <p className={styles.originalText}>{original}</p>;
    return (
      <div className={changed ? styles.diffBlock : undefined}>
        {changed && <p className={styles.removedText}>{original}</p>}
        <p className={changed ? styles.addedText : styles.acceptedText}>
          {phase === 'streaming' ? take(revised, partProgress) : revised}
        </p>
      </div>
    );
  };

  return (
    <main className={styles.notePane}>
      <header className={styles.productTopbar}>
        <div className={styles.breadcrumbs}>
          <Folder /><span>个人云盘</span><ChevronRight />
          <span>论文研究</span><ChevronRight />
          <NotebookPen /><strong>{heroScenario.paperTitle}</strong>
        </div>
        <span className={styles.saveState}>{editing ? 'Agent 正在编辑' : '已自动保存'}</span>
        <button type="button" aria-label="更多"><Ellipsis /></button>
        <button type="button" aria-label="评论"><MessageSquareText /></button>
        <button type="button" className={agentOpen ? styles.topbarActive : undefined} aria-label="Agent"><Bot /></button>
        <button type="button" aria-label="互动"><PanelRight /></button>
      </header>

      <article className={styles.noteEditor}>
        {editing && (
          <div className={styles.diffToolbar}>
            <span>Agent 建议了 3 处修改</span>
            <div className={styles.reviewModes}><button type="button">仅原文</button><button type="button">仅新文</button><button type="button" className={styles.reviewModeActive}>对比</button></div>
            <button type="button" className={styles.rejectButton}>全部撤销</button>
            <button type="button" className={styles.acceptButton}>全部保留</button>
          </div>
        )}
        <div className={`${styles.noteArticle} ${styles.storyArticle} ${editing ? styles.noteArticleWithDiff : ''}`}>
          <h2>{heroScenario.noteTitle}</h2>
          <div className={styles.noteMeta}>
            <span className={styles.miniAvatar}>林</span><strong>{heroScenario.author}</strong><i /><span>{heroScenario.modifiedAt}</span>
          </div>

          <p>{heroScenario.introduction}</p>

          <h3>Agent 如何记住自己的生活？</h3>
          {renderRevision(heroScenario.memoryOriginal, heroScenario.memoryRevised, 0)}

          <h3>情人节派对是怎样发生的？</h3>
          {renderRevision(heroScenario.partyOriginal, heroScenario.partyRevised, 1)}

          <h3>这个实验能说明什么？</h3>
          {renderRevision(heroScenario.conclusionOriginal, heroScenario.conclusionRevised, 2)}
        </div>
      </article>
    </main>
  );
}
