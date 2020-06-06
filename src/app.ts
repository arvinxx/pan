import { homeWin } from '@/sketch/windows';
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

export const panel = () => {
  console.log('启动 home 窗口');
  homeWin();
};
