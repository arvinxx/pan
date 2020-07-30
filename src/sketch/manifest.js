const name = `🍳Pan ${process.env.NODE_ENV === 'development' ? ' DEV' : ''}`;

module.exports = {
  compatibleVersion: 3,
  bundleVersion: 1,
  icon: 'logo.png',
  name,
  homepage: 'https://www.yuque.com/design-engineering/pan',
  commands: [
    {
      name: '插件信息',
      identifier: 'com.arvinxx.pan.system-info',
      script: './app.ts',
      handler: 'systemInfo',
    },
    {
      name: '交换位置',
      identifier: 'com.arvinxx.pan.swap-position',
      script: './app.ts',
      shortcut: 'ctrl shift s',
      handler: 'swapPosition',
    },
    {
      name: '交换文本',
      identifier: 'com.arvinxx.pan.swap-text',
      script: './app.ts',
      shortcut: 'ctrl shift t',
      handler: 'swapText',
    },
    {
      name: '查找替换',
      identifier: 'com.arvinxx.pan.win.replace',
      script: './app.ts',
      shortcut: 'ctrl k',
      handler: 'replaceWin',
    },
    {
      name: '批量创建Symbols',
      identifier: 'com.arvinxx.pan.create-symbols',
      shortcut: 'ctrl shift b',
      script: './app.ts',
      handler: 'createSymbols',
    },
    {
      name: '快速复制文本',
      identifier: 'com.arvinxx.pan.super-paste.copy-text',
      handler: 'fastCopyText',
      shortcut: 'ctrl shift c',
      script: './app.ts',
      icon: 'icons/copy-text.png',
      description: '将文本快速复制到剪切板(不需要点进去哦!)',
    },
    {
      name: '超级粘贴',
      identifier: 'com.arvinxx.pan.super-paste.paste',
      handler: 'superPaste',
      shortcut: 'ctrl shift v',
      script: './app.ts',
      icon: 'icons/paste-text.png',
      description: '将剪贴板中的数据赋予给图层',
    },
    {
      name: '粘贴 JSON 为 Sketch',
      identifier: 'com.arvinxx.pan.super-paste.paste-sketch',
      handler: 'pasteAsSketch',
      shortcut: 'ctrl alt v',
      script: './app.ts',
      icon: 'icons/paste-text.png',
      description: '粘贴 Sketch 对象',
    },
  ],
  menu: {
    title: name,
    items: [
      {
        title: '交换',
        items: ['com.arvinxx.pan.swap-position', 'com.arvinxx.pan.swap-text'],
      },
      '-',
      {
        title: 'Symbols',
        items: [
          'com.arvinxx.pan.create-symbols',
          // 'com.arvinxx.pan.create-custom-symbols',
          // 'com.arvinxx.pan.create-custom-folders',
        ],
      },
      '-',
      {
        title: '超级粘贴',
        items: [
          'com.arvinxx.pan.super-paste.paste-sketch',
          '-',
          'com.arvinxx.pan.super-paste.paste',
          '-',
          'com.arvinxx.pan.super-paste.copy-text',
        ],
      },
      '-',
      'com.arvinxx.pan.system-info',
    ],
  },
};
