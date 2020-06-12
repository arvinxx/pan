import { defineConfig } from 'umi';
import { resolve } from 'path';
import theme from './theme/variables';

const isDev = process.env.NODE_ENV === 'development';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  outputPath: `../../dist`,
  alias: {
    '@/common': resolve(__dirname, '../common'),
    theme: resolve(__dirname, './theme'),
  },
  locale: {
    // default: 'zh-CN',
  },
  theme,
  history: { type: isDev ? 'hash' : 'browser' },
  exportStatic: { htmlSuffix: true, dynamicRoot: true },
});
