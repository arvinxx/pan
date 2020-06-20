import { ChannelType } from '@/bridge/channel';
// import { isWebviewPresent, sendToWebview } from 'sketch-module-web-view/remote';

/**
 * 向 webview 发送消息
 * @param {BrowserWindow} window 指令的窗口
 * @param {ChannelType} channel 通信信道
 * @param {*} data 需要发送的数据
 */
export const sendMsgToWebView = async (
  window: BrowserWindow,
  channel: ChannelType,
  data?: any
) => {
  const args = `'${channel}'${data ? `,'${JSON.stringify(data)}'` : ''}`;
  const func = `onReceiveEndMsg(${args})`;
  return await window.webContents.executeJavaScript(func);
};
//
// /**
//  * Sketch 端向三方 webview 发送信息
//  * @param {String} identifier webview 标志符
//  * @param {ChannelType} channel 通信信道
//  * @param {*} data 需要发送的数据
//  */
// export const sendMsgToThirdWebView = (
//   identifier: string,
//   channel: ChannelType,
//   data?: any
// ) => {
//   if (isWebviewPresent(identifier)) {
//     const args = `'${channel}'${data ? `,'${JSON.stringify(data)}'` : ''}`;
//     const func = `onReceiveEndMsg(${args})`;
//     sendToWebview(identifier, func);
//   }
// };
