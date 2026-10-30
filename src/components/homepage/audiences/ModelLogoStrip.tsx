import type {ComponentType, ReactNode, SVGProps} from 'react';
import claudeLogo from '@lobehub/icons-static-svg/icons/claude.svg';
import deepSeekLogo from '@lobehub/icons-static-svg/icons/deepseek.svg';
import doubaoLogo from '@lobehub/icons-static-svg/icons/doubao.svg';
import geminiLogo from '@lobehub/icons-static-svg/icons/gemini.svg';
import openAiLogo from '@lobehub/icons-static-svg/icons/openai.svg';
import qwenLogo from '@lobehub/icons-static-svg/icons/qwen.svg';

import styles from './ModelLogoStrip.module.css';

type Logo = ComponentType<SVGProps<SVGSVGElement>>;

const models: readonly {name: string; Logo: Logo}[] = [
  {name: 'OpenAI', Logo: openAiLogo},
  {name: 'Claude', Logo: claudeLogo},
  {name: 'Gemini', Logo: geminiLogo},
  {name: 'Qwen', Logo: qwenLogo},
  {name: 'DeepSeek', Logo: deepSeekLogo},
  {name: 'Doubao', Logo: doubaoLogo},
];

export function ModelLogoStrip(): ReactNode {
  return (
    <div className={styles.viewport} aria-label="可接入的主流模型">
      <div className={styles.grid}>
        {models.slice(0, 3).map(({name, Logo}) => (
          <div className={styles.logoCell} key={name}><Logo /><span>{name}</span></div>
        ))}
        <div className={styles.messageCell}><strong>支持主流大模型的接入</strong><span>兼容多种模型协议</span></div>
        {models.slice(3).map(({name, Logo}) => (
          <div className={styles.logoCell} key={name}><Logo /><span>{name}</span></div>
        ))}
      </div>
    </div>
  );
}
