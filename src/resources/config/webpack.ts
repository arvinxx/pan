import IWebpackChainConfig from 'webpack-chain';

export default (config: IWebpackChainConfig) => {
  config.module.rule('ts-in-node_modules').include.clear();

  return config;
};
