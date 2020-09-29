import { message } from 'sketch/ui';
import { sendMsgToWebView } from '@pan/bridge';
import { systemInfoWin } from '../windows';
import { getSketchVersion } from '../utils';

declare global {
  namespace NodeJS {
    interface ProcessVersions {
      plugin: string;
      sketch: string;
    }
    interface Process {
      type: string;
    }
  }
}

/**
 * 输出插件基本信息
 */
export const systemInfo = () => {
  const win = systemInfoWin();
  const plugin = process.versions.plugin;
  const env = process.env.NODE_ENV;
  const platform = process.type;
  const sketch = getSketchVersion();
  console.info('=======System Info=======');
  console.info(`开发环境: ${env}`);
  console.info(`Plugin 版本: ${plugin}`);
  console.info(`插件平台: ${platform}`);
  console.info(`Sketch 版本: ${sketch}`);
  console.info('=======System End=======');
  message('️查看系统信息⚙️');

  sendMsgToWebView(win, 'GLOBAL_SYSTEM_INFO', {
    env,
    plugin,
    sketch,
    platform,
  });
};
