export const heroScenario = {
  paperTitle: 'Generative Agents',
  paperFile: 'Generative Agents.pdf',
  noteTitle: '25 个 AI 住进虚拟小镇后，会形成“社会”吗？',
  author: '林同学',
  modifiedAt: '最后修改于 2 分钟前',
  prompt: '请对照云盘中的原论文，检查这篇笔记对记忆机制、情人节派对和实验结论的描述。纠正不准确的表述，并保留值得讨论的细节。',
  firstSkill: '论文事实核查',
  secondSkill: '研究笔记修订',
  introduction:
    '研究者构建了一个名为 Smallville 的虚拟小镇，并将 25 个由大语言模型驱动的角色放入其中。每个角色都有自己的身份、日程和社会关系，可以在小镇中生活、对话和相互影响。',
  memoryOriginal:
    '每个 Agent 会把自己经历过的全部事件都放进上下文，然后根据完整的历史记录决定下一步行动。',
  memoryRevised:
    '每个 Agent 都维护一条持续增长的 Memory Stream。系统根据近期程度、重要性和当前任务相关性检索记忆，再利用这些记忆形成更高层反思，并支持后续规划。',
  partyOriginal:
    '在没有任何人工设定的情况下，镇上的 Agent 自发决定举办一场情人节派对。',
  partyRevised:
    '情人节派对并非完全凭空出现：研究者先向 Isabella Rodriguez 写入举办派对的意图；随后，邀请传播、约会邀请和其他 Agent 的日程调整则通过记忆、对话与规划逐步发生。',
  conclusionOriginal:
    '实验说明这些 Agent 已经能够理解他人的情绪，并在虚拟环境中形成真实的社会关系。',
  conclusionRevised:
    '实验表明，记忆、反思和规划机制能让 Agent 在受控环境中表现出更连贯、可信的社会行为；但这不能证明它们具有人类式理解、情绪体验或真实社会关系。',
  finalResponse:
    '已根据原论文完成事实核查，共形成 3 处修改：补充记忆、反思与规划机制；澄清情人节派对的初始意图由研究者写入；收敛“形成真实社会关系”的过度结论。',
  resourceItems: [
    {kind: 'paper', label: 'Generative Agents.pdf'},
    {kind: 'note', label: '虚拟小镇实验笔记'},
    {kind: 'note', label: 'Memory Stream 摘录'},
    {kind: 'skill', label: '论文事实核查'},
  ],
} as const;

export const heroStages = [
  {label: '阅读笔记', shortLabel: '笔记'},
  {label: '配置 Agent', shortLabel: '配置'},
  {label: '输入任务', shortLabel: '输入'},
  {label: '思考与调用', shortLabel: '思考'},
  {label: '流式修改', shortLabel: '修改'},
  {label: '人工确认', shortLabel: '确认'},
] as const;

export type HeroStage = 0 | 1 | 2 | 3 | 4 | 5;

export const heroPhases = [
  {id: 'reading', duration: 1200, stage: 0},
  {id: 'opening', duration: 450, stage: 1},
  {id: 'agent-picker', duration: 1200, stage: 1},
  {id: 'model-picker', duration: 1400, stage: 1},
  {id: 'typing', duration: 2200, stage: 2},
  {id: 'thinking', duration: 1300, stage: 3},
  {id: 'tracing', duration: 4200, stage: 3},
  {id: 'streaming', duration: 4500, stage: 4},
  {id: 'reviewing', duration: 1800, stage: 5},
  {id: 'accepted', duration: 1200, stage: 5},
] as const;

export type HeroPhase = (typeof heroPhases)[number]['id'];
