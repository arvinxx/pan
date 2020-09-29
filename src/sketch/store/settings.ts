import { Settings } from 'sketch';
import { AllLayers, Types, Document } from 'sketch/dom';
import { StateKeyType } from './state';

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

/**
 * 设置配置
 * @param layer 图层
 * @param {String} key
 * @param value
 */
export const setLayerData = <T = any>(
  layer: AllLayers | Document,
  key: StateKeyType,
  value: T
): void => {
  switch (layer.type) {
    case Types.Document:
      Settings.setDocumentSettingForKey(layer, key, JSON.stringify(value));
      break;
    default:
      Settings.setLayerSettingForKey(layer, key, JSON.stringify(value));
  }
};
/**
 * 读取配置
 * @param layer 图层
 * @param {String} key
 */
export const getLayerData = <T = any>(
  layer: AllLayers | Document,
  key: StateKeyType
): T => {
  let data;
  switch (layer.type) {
    case Types.Document:
      data = Settings.documentSettingForKey(layer, key);
      if (data) return JSON.parse(data);
      else return data;

    default:
      data = Settings.layerSettingForKey(layer, key);
      if (data) return JSON.parse(data);
      else return data;
  }
};

/**
 * 设置全局值
 * @param {String} key
 * @param value
 */
export const setGlobalData = <T = any>(key: StateKeyType, value: T): void => {
  Settings.setGlobalSettingForKey(key, JSON.stringify(value));
};
/**
 * 设置全局值
 * @param {String} key
 * @param value
 */
export const setRawGlobalData = <T = any>(
  key: StateKeyType,
  value: T
): void => {
  Settings.setGlobalSettingForKey(key, value);
};

/**
 * 读取全局值
 * @param {String} key
 */
export const getGlobalData = <T = any>(key: StateKeyType): T => {
  let data = Settings.globalSettingForKey(key);
  if (data) return JSON.parse(data);
  else return data;
};
