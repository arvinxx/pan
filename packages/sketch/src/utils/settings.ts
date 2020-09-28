import { Settings } from 'sketch';

/**
 * 读取配置
 * @param {String} key
 */
export const getSettings = <T = any>(key: string): T => {
  const settings = Settings.settingForKey(key);
  if (settings) return JSON.parse(settings);
  else return settings;
};

/**
 * 设置配置
 * @param {String} key
 * @param {*} value
 */
export const setSettings = <T = any>(key: string, value: T): void => {
  Settings.setSettingForKey(key, JSON.stringify(value));
};
