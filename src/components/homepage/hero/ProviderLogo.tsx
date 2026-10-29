import type {ReactNode} from 'react';
import openAiLogo from '@lobehub/icons-static-svg/icons/openai.svg';
import qwenLogo from '@lobehub/icons-static-svg/icons/qwen.svg';

import styles from './ProviderLogo.module.css';

export function ProviderLogo({provider, size = 18}: {provider: 'openai' | 'qwen'; size?: number}): ReactNode {
  const Logo = provider === 'qwen' ? qwenLogo : openAiLogo;
  return <Logo className={styles.providerLogo} style={{width: size, height: size}} aria-hidden="true" />;
}
