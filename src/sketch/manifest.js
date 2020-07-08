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
  ],
  menu: {
    title: '\uD83C\uDF73Pan',
    items: [
      'com.arvinxx.pan.win.replace',
      '-',
      {
        title: '交换',
        items: ['com.arvinxx.pan.swap-position', 'com.arvinxx.pan.swap-text'],
      },
      '-',
      'com.arvinxx.pan.system-info',
    ],
  },
};
