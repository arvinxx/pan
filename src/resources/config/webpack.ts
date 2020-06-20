import IWebpackChainConfig from 'webpack-chain';

// const isDev = process.env.NODE_ENV === 'development';

export default (config: IWebpackChainConfig) => {
  config.module.rule('ts-in-node_modules').include.clear();
  return config;
};
