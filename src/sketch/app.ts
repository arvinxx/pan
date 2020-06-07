import { homeWin, replaceWin } from '@/sketch/windows';
import {
  systemInfo as systemInfoCmd,
  swapPosition as swapPositionCmd,
  // swapStyle as swapStyleCmd,
} from '@/sketch/commands';

/**
 * hello 方法
 */
export const systemInfo = systemInfoCmd;

export const swapPosition = swapPositionCmd;
// export const swapStyle = swapStyleCmd;

export const home = () => {
  console.log('启动 home 窗口');
  homeWin();
};
export const replace = () => {
  console.log('启动 replace 窗口');
  replaceWin();
};
