module.exports = {
  compatibleVersion: 3,
  bundleVersion: 1,
  icon: 'icons/logo.png',
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
      shortcut: 'ctrl opt shift b',
      script: './app.ts',
      handler: 'createSymbols',
    },
    {
      name: '自定义名称创建',
      identifier: 'com.arvinxx.pan.create-custom-symbols',
      shortcut: 'ctrl opt shift c',
      script: './app.ts',
      handler: 'createCustomSymbols',
    },
    {
      name: '自定义文件夹创建',
      identifier: 'com.arvinxx.pan.create-custom-folders',
      shortcut: 'ctrl opt shift f',
      script: './app.ts',
      handler: 'createCustomSymbolWithFolder',
    },
  ],
  menu: {
    title: '\uD83C\uDF73Pan',
    items: [
      // 'com.arvinxx.pan.win.replace',
      '-',
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
      'com.arvinxx.pan.system-info',
    ],
  },
};
