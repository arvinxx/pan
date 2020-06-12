import { ChannelType } from '@/common/channel';

/**
 * 向 sketch 进程发消息
 * @param {ChannelType} channel 信道
 * @param {*} data 发送信息
 */
export const sendMsg = (channel: ChannelType, data?: any) => {
  window.postMessage(channel, JSON.stringify(data));
};

