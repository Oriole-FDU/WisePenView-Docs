import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {ArrowRight, Check, Github} from 'lucide-react';

import {TypewriterTerm} from './TypewriterTerm';
import styles from './WisePenHero.module.css';
import {WisePenProductDemo} from './WisePenProductDemo';

const knowledgeSpaces = ['Notion', 'Obsidian', '语雀', '飞书'] as const;
const agentWorkspaces = ['OpenCode', 'Codex', 'WorkBuddy', 'Hermes'] as const;

export function WisePenHero(): ReactNode {
  return (
    <section className={styles.heroLab}>
      <div className={styles.heroBackdrop} aria-hidden="true" />
      <div className={styles.heroCopy}>
        <div className={styles.heroTagline}><span />让每一次学习与思考，持续生长</div>
        <h1>
          <span>可能是<span className={styles.heroHighlight}>最易用</span>的</span>
          <span>高校 AI 教学研平台</span>
        </h1>
        <p>
          WisePen 是“开源版 <TypewriterTerm words={knowledgeSpaces} minWidth="5.8em" /> + 专为教学研设计的 <TypewriterTerm words={agentWorkspaces} minWidth="6.7em" />”。它将师生的笔记、课件、资料、录播、Skill 与 Agent 组织在同一个知识工作空间，让 Agent 辅助学生学习、帮助教师改进教学，并支持师生科研。
        </p>
        <div className={styles.heroProofs}><span><Check />支持高校私域部署</span><span><Check />教育与科研免费</span><span><Check />二次开发友好</span></div>
        <div className={styles.heroActions}>
          <a className={styles.primaryAction} href="https://wisepen.oriole.cn/">即刻在线体验 <ArrowRight /></a>
        </div>
        <div className={styles.heroLinks}><a href="https://github.com/Oriole-FDU/WisePen"><Github />GitHub</a><Link to="/docs/">使用文档</Link></div>
      </div>
      <div className={styles.demoAnchor} id="product-demo"><WisePenProductDemo /></div>
    </section>
  );
}
