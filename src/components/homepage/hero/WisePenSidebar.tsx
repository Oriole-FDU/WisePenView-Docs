import type {ReactNode} from 'react';
import {
  Bell,
  BookOpen,
  Bot,
  CalendarCheck2,
  ChevronDown,
  FileText,
  Folder,
  MessageSquare,
  MessageSquarePlus,
  NotebookPen,
  PanelLeftClose,
  Search,
  Settings,
  Users,
  Wrench,
} from 'lucide-react';

import {heroScenario} from './heroScenario';
import styles from './WisePenSidebar.module.css';

const primaryItems = [
  {label: '新建对话', Icon: MessageSquarePlus, selected: false},
  {label: '新建笔记', Icon: NotebookPen, selected: false},
  {label: '我的云盘', Icon: Folder, selected: true},
  {label: '我的小组', Icon: Users, selected: false},
  {label: '消息通知', Icon: Bell, selected: false},
] as const;

function ResourceIcon({kind}: {kind: string}): ReactNode {
  if (kind === 'paper') return <FileText />;
  if (kind === 'skill') return <Wrench />;
  return <NotebookPen />;
}

export function WisePenSidebar(): ReactNode {
  return (
    <aside className={styles.sidebar}>
      <header className={styles.sidebarHeader}>
        <div className={styles.brand}><img src="/img/logo.svg" alt="" /><strong>WisePen</strong></div>
        <button type="button" aria-label="收起侧栏"><PanelLeftClose /></button>
      </header>

      <nav className={styles.primaryNav} aria-label="WisePen 主导航">
        {primaryItems.map(({label, Icon, ...item}) => (
          <div className={item.selected ? styles.primarySelected : undefined} key={label}>
            <Icon /><span>{label}</span>
          </div>
        ))}
      </nav>

      <div className={styles.sidebarDivider} />
      <div className={styles.resourceToolbar}>
        <div className={styles.resourceTabs}>
          <span><MessageSquare /></span>
          <span className={styles.resourceTabActive}><Folder />文件</span>
          <span><BookOpen /></span>
        </div>
        <Search />
      </div>

      <div className={styles.treeHeading}><ChevronDown /><Folder /><span>论文研究</span></div>
      <div className={styles.resourceTree}>
        {heroScenario.resourceItems.map((item, index) => (
          <div className={index === 1 ? styles.treeItemSelected : undefined} key={item.label}>
            <ResourceIcon kind={item.kind} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <footer className={styles.sidebarFooter}>
        <div className={styles.avatar}>林</div>
        <div className={styles.profileInfo}><strong>林同学</strong><small>学生</small></div>
        <div className={styles.profileActions}>
          <button type="button" aria-label="签到"><CalendarCheck2 /></button>
          <button type="button" aria-label="设置"><Settings /></button>
        </div>
      </footer>
    </aside>
  );
}
