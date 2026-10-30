import type {ReactNode} from 'react';
import Layout from '@theme/Layout';

import {AudienceSection} from '../components/homepage/audiences/AudienceSection';
import {ModelLogoStrip} from '../components/homepage/audiences/ModelLogoStrip';
import {WisePenHero} from '../components/homepage/hero/WisePenHero';

export default function HomePage(): ReactNode {
  return (
    <Layout
      title="WisePen — 高校 AI 教学研平台"
      description="WisePen 是面向高校教学、学习与科研的开源知识与 Agent 协作平台。"
      noFooter
    >
      <main>
        <WisePenHero />
        <ModelLogoStrip />
        <AudienceSection />
      </main>
    </Layout>
  );
}
