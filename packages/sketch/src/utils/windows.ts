import { isDev } from '@pan/utils';

/**
 * 根据开发环境生成加载路径
 * @param {String} win  窗口名称
 */
export const getWinURL = (win: string) => {
  // 这样的做法能够使得每个页面都是单页面
  // 不需要切换路由
  const devUrl = `http://localhost:8110/#/${win}.html`;
  const prodUrl = `../Resources/${win}.html`;

  return isDev ? devUrl : prodUrl;
};
