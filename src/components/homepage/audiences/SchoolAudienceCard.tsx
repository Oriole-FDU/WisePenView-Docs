import type {ReactNode} from 'react';

import styles from './SchoolAudienceCard.module.css';

const positions = [
  {
    title: '教学平台，不该只是给旧系统加上 AI',
    description: '在传统系统旁增加一个聊天框，并不会自然形成新的教学方式。WisePen 从笔记、课件、协作和 Agent 这些日常工作重新开始。',
    emphasis: undefined,
  },
  {
    title: '教学上下文，不该继续散落在校外工具',
    emphasis: '模型可以替换，教学上下文不能重来。',
    description: '学生的提问、教师的反馈、内容的修订和协作关系，一旦脱离学校的身份、资源和权限体系，就很难重新拼回。',
  },
  {
    title: '学校选择的平台，也应该让师生真正愿意使用',
    description: '学校能否长期掌握平台很重要，清楚、顺手的日常体验同样重要。只有师生愿意持续使用，教学上下文才会自然形成。',
    emphasis: undefined,
  },
] as const;

export function SchoolAudienceCard(): ReactNode {
  return (
    <article className={styles.card}>
      <p className={styles.kicker}><span>03</span>学校</p>
      <div className={styles.positionGrid}>
        {positions.map(({title, description, emphasis}) => (
          <section key={title}>
            <h2>{title}</h2>
            {emphasis && <strong>{emphasis}</strong>}
            <p>{description}</p>
          </section>
        ))}
      </div>

      <div className={styles.openSourceStatement}>
        WisePen <strong>开源</strong>，面向<strong>教育与科研免费</strong>，支持高校<strong>私域部署和二次开发</strong>。核心系统、教学数据、知识资源与模型配置由学校自主掌握。
      </div>

      <div className={styles.adopters}>
        <span>这些高校正在使用或接入 WisePen</span>
        <img src="/img/fudan-logo.png" alt="复旦大学" />
        <i />
        <strong>更多高校正在接入</strong>
      </div>
    </article>
  );
}
