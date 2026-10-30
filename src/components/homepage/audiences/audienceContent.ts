export interface AudienceStory {
  id: string;
  label: string;
  title: string;
  summary: string;
  detail: string;
  outcomes: readonly string[];
  status?: 'coming-soon';
}

export interface StoryAudience {
  id: 'student' | 'teacher';
  number: string;
  role: string;
  stories: readonly AudienceStory[];
}

export const storyAudiences: readonly StoryAudience[] = [
  {
    id: 'student',
    number: '01',
    role: '学生',
    stories: [
      {
        id: 'research',
        label: '前沿追踪',
        title: '科研前沿怎么跟？\n用 WisePen！',
        summary:
          '告诉 Agent：整理最近一周 arXiv 上 GUI Agent 领域的最新论文。WisePen 自动检索相关工作，将原文保存到云盘，并按研究问题、方法和结论梳理成研究笔记。',
        detail:
          '林同学正在调研 GUI Agent。他向 Agent 提出要求：“帮我整理最近一周 arXiv 上 GUI Agent 领域的最新论文。”Agent 搜索并筛选相关工作，将 PDF 保存到指定云盘文件夹，再读取全文并整理成带来源的研究笔记。',
        outcomes: ['自动检索最新论文', '原文保存到云盘', '生成研究笔记'],
      },
      {
        id: 'group-work',
        label: '小组作业',
        title: '小组作业怎么写？\n用 WisePen！',
        summary:
          '新建课程小组，将作业论文加入协作空间。组员分别负责资料调研、方法分析、实验整理和报告写作，在同一份内容中协作、批注和汇总。',
        detail:
          '林同学创建课程小组并加入本次作业论文。四名成员分别查找资料、分析方法、整理实验和撰写报告，围绕同一份内容实时编辑、互相批注；Agent 则读取已授权的小组资源，帮助检查结构、引用和遗漏。',
        outcomes: ['按任务分工协作', '围绕内容互相批注', '共同完成最终版本'],
      },
      {
        id: 'marketplace',
        label: '资源集市',
        title: '期末资料怎么找？\n用 WisePen！',
        summary:
          '期末考试临近，在资源集市中搜索本课程的复习笔记、知识图谱、练习和答疑 Agent，查看评价后购买，并直接保存到自己的云盘文件夹。',
        detail:
          '林同学在资源集市中搜索本课程的期末资料，查看资源介绍、预览和其他同学的评价，购买合适的复习笔记和练习后保存到个人文件夹，再按自己的计划继续批注、整理和复习。',
        outcomes: ['搜索课程资料', '查看评价与预览', '购买并保存到云盘'],
        status: 'coming-soon',
      },
    ],
  },
  {
    id: 'teacher',
    number: '02',
    role: '教师',
    stories: [
      {
        id: 'interactive-courseware',
        label: '交互式课件',
        title: '抽象知识怎么教？\n用 WisePen！',
        summary:
          '数学老师上传已有课件，告诉 Agent 想要演示的复杂概念。WisePen 根据课程内容生成带动画、参数控制和即时练习的互动网页。',
        detail:
          '陈老师准备讲解一个难以通过静态公式说明的数学概念。他上传课程 PPT，请 Agent 生成一段可逐步播放的动态图示。Agent 读取定义和例题，在 Sandbox 中生成动画，并将结果保存为课程 WebApp。',
        outcomes: ['复用已有课程 PPT', '生成动态图示', '保存为互动课件'],
      },
      {
        id: 'review',
        label: '作业评阅',
        title: '学生作业怎么评？\n用 WisePen！',
        summary:
          '教师先完整评阅一份作业，将评分标准、批注方式和常见问题沉淀为 Skill，再让 Agent 按同一方法初步评阅其余作业，由教师最终确认。',
        detail:
          '陈老师先人工评阅一份代表性作业，对具体文字进行批注，并说明评分标准和修改建议。随后，他将这套评阅方法整理成课程 Skill。Agent 使用该 Skill 初步检查其他作业，教师再逐份审核和确认反馈。',
        outcomes: ['示范一次评阅方法', '沉淀为课程 Skill', 'Agent 初评、教师确认'],
      },
      {
        id: 'dashboard',
        label: '交互看板',
        title: '学生哪里没学会？\n用 WisePen！',
        summary:
          '在权限与隐私边界内，汇总学生与课程资料、练习和 AI 的互动，帮助教师发现反复出现的疑问、修改和错误。',
        detail:
          '陈老师打开课程交互看板，查看班级在课件、笔记、练习和 Agent 中形成的聚合反馈。他发现多个学生反复询问同一概念，并在练习中出现相似错误，于是调整下一次课堂讲解和课后材料。',
        outcomes: ['发现共性困难', '理解学习反馈', '动态改进教学'],
        status: 'coming-soon',
      },
    ],
  },
] as const;
