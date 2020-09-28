import { defineConfig } from 'umi';
import { resolve } from 'path';
import routes from './routes';

import chainWebpack from './webpack';

const isDev = process.env.NODE_ENV === 'development';
const config = defineConfig({
  dynamicImport: {
    loading: '@/components/PageLoading',
  },
  devtool: isDev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
  outputPath: `../../dist/renderer`,
  alias: {
    '@/common': resolve(__dirname, '../../common'),
    '@/bridge': resolve(__dirname, '../../bridge'),
    theme: resolve(__dirname, '../theme'),
  },
  locale: {
    default: 'zh-CN',
  },
  routes,
  ignoreMomentLocale: true,
  history: { type: isDev ? 'hash' : 'browser' },
  exportStatic: { htmlSuffix: !isDev, dynamicRoot: true },
  chainWebpack,
});

export default config;
