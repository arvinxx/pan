import { Settings } from 'sketch';

/**
 * 读取配置
 * @param {String} key
 */
export const getSettings = <T = any>(key: string): T => {
  return JSON.parse(Settings.settingForKey(key));
};

/**
 * 设置配置
 * @param {String} key
 * @param {*} value
 */
export const setSettings = <T = any>(key: string, value: T): void => {
  Settings.setSettingForKey(key, JSON.stringify(value));
};
