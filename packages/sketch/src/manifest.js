const name = `🍳Pan ${process.env.NODE_ENV === 'development' ? ' DEV' : ''}`;

const baseIdentifier = 'com.arvinxx.pan';

module.exports = {
  compatibleVersion: 3,
  bundleVersion: 1,
  icon: 'logo.png',
  name,
  homepage: 'https://www.yuque.com/design-engineering/pan',
  commands: [
    {
      name: '插件信息',
      identifier: baseIdentifier + '.system-info',
      script: './app.ts',
      handler: 'systemInfo',
    },
    {
      name: '交换位置',
      identifier: baseIdentifier + '.swap-position',
      script: './app.ts',
      shortcut: 'ctrl shift s',
      handler: 'swapPosition',
    },
    {
      name: '交换文本',
      identifier: baseIdentifier + '.swap-text',
      script: './app.ts',
      shortcut: 'ctrl shift t',
      handler: 'swapText',
    },
    {
      name: '选择父级',
      identifier: baseIdentifier + '.select-parent',
      script: './app.ts',
      shortcut: 'ctrl alt q',
      handler: 'selectParent',
    },
    {
      name: '查找替换',
      identifier: baseIdentifier + '.win.replace',
      script: './app.ts',
      shortcut: 'ctrl k',
      handler: 'replaceWin',
    },
    {
      name: '批量从画板创建Symbols',
      identifier: baseIdentifier + '.create-symbols',
      shortcut: 'ctrl shift b',
      script: './app.ts',
      handler: 'batchCreateSymbols',
    },
    {
      name: '生成画板描述',
      identifier: baseIdentifier + '.artboard-description',
      script: './app.ts',
      handler: 'artboardOverview',
    },
    {
      name: '快速复制文本',
      identifier: baseIdentifier + '.super-paste.copy-text',
      handler: 'fastCopyText',
      shortcut: 'ctrl shift c',
      script: './app.ts',
      icon: 'icons/copy-text.png',
      description: '将文本快速复制到剪切板(不需要点进去哦!)',
    },
    {
      name: '超级粘贴',
      identifier: baseIdentifier + '.super-paste.paste',
      handler: 'superPaste',
      shortcut: 'ctrl shift v',
      script: './app.ts',
      icon: 'icons/paste-text.png',
      description: '将剪贴板中的数据赋予给图层或插入 sketch JSON对象',
    },
    {
      name: '快捷编辑文本',
      identifier: baseIdentifier + '.fast-edit.text',
      handler: 'fastEditText',
      shortcut: 'command ctrl t',
      script: './app.ts',
    },
  ],
  menu: {
    title: name,
    items: [
      {
        title: '交换',
        items: [
          baseIdentifier + '.swap-position',
          baseIdentifier + '.swap-text',
        ],
      },
      '-',
      {
        title: '画板',
        items: [
          baseIdentifier + '.create-symbols',
          '-',
          baseIdentifier + '.artboard-description',
        ],
      },
      '-',
      {
        title: '快捷编辑',
        items: [baseIdentifier + '.fast-edit.text'],
      },
      '-',
      {
        title: '画板',
        items: [
          baseIdentifier + '.create-symbols',
          '-',
          baseIdentifier + '.artboard-description',
        ],
      },
      '-',
      baseIdentifier + '.select-parent',
      '-',
      {
        title: '超级粘贴',
        items: [
          baseIdentifier + '.super-paste.paste',
          '-',
          baseIdentifier + '.super-paste.copy-text',
        ],
      },
      '-',
      baseIdentifier + '.system-info',
    ],
  },
};
