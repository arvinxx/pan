import { defineConfig } from 'umi';
import { resolve } from 'path';
import theme from '../theme/variables';
import chainWebpack from './webpack';

const isDev = process.env.NODE_ENV === 'development';
const config = defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  devtool: isDev ? 'source-map' : 'cheap-eval-source-map',
  outputPath: `../../dist`,
  alias: {
    '@/common': resolve(__dirname, '../../common'),
    '@/bridge': resolve(__dirname, '../../bridge'),
    theme: resolve(__dirname, '../theme'),
  },
  locale: {
    default: 'zh-CN',
  },
  theme,
  history: { type: isDev ? 'hash' : 'browser' },
  exportStatic: { htmlSuffix: true, dynamicRoot: true },
  chainWebpack,
});

export default config;
