import { EventEmitter } from 'events';

/**
 * @file 注册全局方法，供 Native 插件端调用
 */

type NotifyProgress = <T extends Function>(
  result: {
    percent: number;
    fail: boolean;
    success: boolean;
    message: string;
  },
  handler: T
) => false | ReturnType<T>;

declare global {
  interface Window {
    notifyProgress: NotifyProgress;
    printInWebConsole: any;
  }
}

/**
 * 插件向 WebView 通知上传进度的方法
 * @param {Object} result - 结果对象
 * @param {number} result.percent - 进度百分比
 * @param {boolean} result.fail - 是否失败
 * @param {boolean} result.success - 是否成功
 * @param {string} result.message - 额外信息
 * @param {Function} handler - 操作方法
 */
export const notifyProgress: NotifyProgress = (result, handler) =>
  handler && handler(result);

window.notifyProgress = notifyProgress;

// /**
//  * 插件向 WebView 通知错误（失败）的方法
//  * @param {Error} err - 异常实例
//  * @param {String} err.message - 错误信息
//  */
// window.notifyError = err => {
//   console.error(err);
//   this.setState({
//     hasError: true,
//   });
// }
window.printInWebConsole = (data: any, msg: string) => {
  console.log(`🔶 logW: ${msg}`);
  console.log(data);
};
