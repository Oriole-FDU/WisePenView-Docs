import type {ReactNode} from 'react';
import {
  ArrowUp,
  Bot,
  BotOff,
  Brain,
  Check,
  ChevronDown,
  Folder,
  History,
  Mic,
  Plus,
  Settings,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';

import {heroScenario, type HeroPhase} from './heroScenario';
import {ProviderLogo} from './ProviderLogo';
import styles from './WisePenAgentPanel.module.css';

interface WisePenAgentPanelProps {
  phase: HeroPhase;
  progress: number;
}

const phaseOrder: HeroPhase[] = [
  'reading', 'opening', 'agent-picker', 'model-picker', 'typing',
  'thinking', 'tracing', 'streaming', 'reviewing', 'accepted',
];
const after = (phase: HeroPhase, target: HeroPhase) => phaseOrder.indexOf(phase) >= phaseOrder.indexOf(target);
const take = (text: string, progress: number) => text.slice(0, Math.ceil(text.length * progress));

function AgentPicker(): ReactNode {
  return (
    <div className={`${styles.pickerPopover} ${styles.agentPicker}`}>
      <strong>Agent</strong>
      <div><BotOff /><span>无 Agent</span></div>
      <div className={styles.pickerSelected}><Bot /><span>论文阅读助手</span><Check /></div>
      <div><Bot /><span>课程材料整理助手</span></div>
      <hr />
      <div><Folder /><span>从组内选择</span></div>
    </div>
  );
}

function ModelPicker(): ReactNode {
  const models = [
    ['Qwen 3.7 Max', 'qwen3.7-max'],
    ['Qwen 3.7 Plus', 'qwen3.7-plus'],
    ['GPT 5.6 Sol', 'gpt-5.6-sol'],
    ['GPT 5.6 Terra', 'gpt-5.6-terra'],
    ['GPT 5.5', 'gpt-5.5'],
  ];
  return (
    <div className={`${styles.pickerPopover} ${styles.modelPicker}`}>
      <strong>模型</strong>
      {models.map(([name, id], index) => (
        <div className={index === 2 ? styles.pickerSelected : undefined} key={id}>
          <ProviderLogo provider={name.startsWith('Qwen') ? 'qwen' : 'openai'} size={16} />
          <span>
            <span className={styles.modelNameLine}><b>{name}</b>{index < 2 && <em>免费</em>}</span>
            <small>{id}</small>
          </span>
          {index === 2 && <Check />}
        </div>
      ))}
    </div>
  );
}

function ProcessTrace({phase, progress}: WisePenAgentPanelProps): ReactNode {
  const steps = [
    {label: `已加载 Skill：${heroScenario.firstSkill}`, kind: 'skill'},
    {label: '已调用工具：读取当前笔记', kind: 'tool'},
    {label: `已调用工具：读取云盘资源 ${heroScenario.paperFile}`, kind: 'tool'},
    {label: `已加载 Skill：${heroScenario.secondSkill}`, kind: 'skill'},
    {label: '已调用工具：修改当前笔记', kind: 'tool'},
  ] as const;
  const complete = after(phase, 'streaming');
  const active = Math.min(steps.length - 1, Math.floor(progress * steps.length));
  const visible = complete ? steps : steps.slice(0, active + 1);
  return (
    <div className={styles.processTrace}>
      <button type="button"><Brain /><span>{complete ? '已完成 5 个步骤' : '正在思考'}</span><ChevronDown /></button>
      <div className={styles.traceDetails}>
        {visible.map((step) => <span key={step.label}>{step.kind === 'skill' ? <Sparkles /> : <Wrench />}{step.label}</span>)}
      </div>
    </div>
  );
}

export function WisePenAgentPanel({phase, progress}: WisePenAgentPanelProps): ReactNode {
  const panelOpen = phase !== 'reading';
  const typing = phase === 'typing';
  const sent = after(phase, 'thinking');
  const selectedAgent = after(phase, 'model-picker');
  const selectedModel = after(phase, 'typing');
  const response = heroScenario.finalResponse;
  const streamedResponse = phase === 'streaming' ? take(response, progress) : after(phase, 'reviewing') ? response : '';

  return (
    <aside className={styles.agentPane} data-open={panelOpen ? 'true' : 'false'} aria-hidden={!panelOpen}>
      <header className={styles.agentHeader}>
        <strong>新对话</strong>
        <div className={styles.agentHeaderActions}><button type="button"><Plus /></button><button type="button"><History /></button><button type="button"><X /></button></div>
      </header>

      <div className={styles.conversation}>
        {panelOpen && !sent && (
          <div className={styles.chatWelcome}>
            <img src="/img/logo.svg" alt="" />
            <strong>林同学，今天想做点什么？</strong>
          </div>
        )}
        {sent && <div className={styles.userMessage}><div className={styles.userPrompt}>{heroScenario.prompt}</div></div>}
        {sent && (
          <div className={styles.assistantMessage}>
            <div className={styles.assistantHeader}><span className={styles.modelAvatar}><ProviderLogo provider="openai" size={15} /></span><strong>AI 助手</strong></div>
            <div className={styles.assistantBody}>
              {phase === 'thinking' && <div className={styles.thinkingStatus}><Brain /><span>正在思考…</span><i /><i /><i /></div>}
              {after(phase, 'tracing') && <ProcessTrace phase={phase} progress={progress} />}
              {streamedResponse && <p className={styles.streamingText}>{streamedResponse}<span className={phase === 'streaming' ? styles.streamCursor : undefined} /></p>}
              {phase === 'accepted' && <p>修改已经应用回当前笔记。</p>}
            </div>
          </div>
        )}
      </div>

      <div className={styles.agentComposer}>
        <div className={styles.inputCard}>
          <div className={`${styles.composerText} ${typing ? styles.composerTextActive : ''}`}>{typing ? take(heroScenario.prompt, progress) : sent ? '' : '今天能帮你做些什么？'}</div>
          <div className={styles.inputToolbar}>
            <div className={styles.toolbarLeft}>
              <button type="button" aria-label="添加"><Plus size={18} /></button>
              <span className={styles.agentPickerAnchor}>
                <button type="button" className={selectedAgent ? styles.toolbarSelected : undefined} aria-label="选择 Agent">{selectedAgent ? <Bot size={17} /> : <BotOff size={17} />}</button>
                {phase === 'agent-picker' && <AgentPicker />}
              </span>
              <button type="button" aria-label="Skills 与工具"><Settings size={17} /></button>
            </div>
            <div className={styles.toolbarRight}>
              <span className={styles.modelPickerAnchor}>
                <button type="button" className={selectedModel ? styles.toolbarSelected : undefined} aria-label="选择模型"><ProviderLogo provider="openai" size={16} /></button>
                {phase === 'model-picker' && <ModelPicker />}
              </span>
              <button type="button" aria-label="语音输入"><Mic size={17} /></button>
              <button type="button" className={`${styles.sendButton} ${typing ? styles.sendButtonReady : ''}`} aria-label="发送"><ArrowUp size={18} /></button>
            </div>
          </div>
        </div>
        <small>AI 内容仅供参考，请仔细甄别</small>
      </div>
    </aside>
  );
}
