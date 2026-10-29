import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'WisePen',
  tagline: '让每一次学习与思考，持续生长',
  favicon: 'img/logo.svg',

  future: {
    v4: true,
    faster: false,
  },

  url: 'https://home.wisepen.oriole.cn',
  baseUrl: '/',
  organizationName: 'Oriole Studio',
  projectName: 'WisePenView-Docs',
  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: false,
      disableSwitch: true,
    },
    navbar: {
      title: 'WisePen',
      logo: {
        alt: 'WisePen Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/',
          label: '产品',
          position: 'left',
          activeBaseRegex: '^/$',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档',
        },
        {
          href: 'https://github.com/Oriole-FDU/WisePen',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://wisepen.oriole.cn/',
          label: '在线体验',
          position: 'right',
          className: 'navbar-try-button',
        },
      ],
    },
    footer: {
      style: 'light',
      copyright: `Copyright © ${new Date().getFullYear()} Oriole Studio.`,
    },
    prism: {
      theme: prismThemes.github,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
