import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const links = [
  {to: '/docs/intro', label: '文档总览', desc: '了解站点边界和阅读路径。'},
  {to: '/docs/getting-started/site-map', label: '站点地图', desc: '确认内容应该放在哪个位置。'},
  {to: '/docs/getting-started/local-development', label: '本地开发', desc: '启动、预览和构建文档站。'},
  {to: '/docs/contributing/content-style', label: '写作规范', desc: '保持文档口吻和结构一致。'},
];

export default function Home(): ReactNode {
  return (
    <Layout title="WisePen 文档" description="WisePenView 与 WisePenView-Portal 文档站">
      <main className={styles.page}>
        <section className={styles.header}>
          <p className={styles.kicker}>WisePen Docs</p>
          <h1>WisePen 文档</h1>
          <p className={styles.description}>
            这里先放文档站的基础结构。具体产品说明、开发说明和截图，之后按目录逐步补充。
          </p>
        </section>

        <section className={styles.linkList} aria-label="文档入口">
          {links.map((item) => (
            <Link className={styles.linkItem} to={item.to} key={item.to}>
              <span>{item.label}</span>
              <small>{item.desc}</small>
            </Link>
          ))}
        </section>
      </main>
    </Layout>
  );
}
