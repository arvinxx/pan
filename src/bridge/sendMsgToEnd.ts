import { ChannelType } from '@/bridge/channel';

/**
 * 向端发消息
 * @param {ChannelType} channel 信道
 * @param {*} data 发送信息
 */
export const sendMsgToEnd = (channel: ChannelType, data?: any) => {
  window.postMessage(channel, JSON.stringify(data));
};
