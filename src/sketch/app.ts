import { homeWin, replaceWin, tableWin } from '@/sketch/windows';
import {
  swapPosition as swapPositionCmd,
  swapText as swapTextCmd,
  overview as OverViewCmd,
} from '@/sketch/commands';

export const swapPosition = swapPositionCmd;

export const artboardOverview = OverViewCmd;

export const swapText = swapTextCmd;
// export const swapStyle = swapStyleCmd;

export const home = () => {
  console.log('启动 home 窗口');
  homeWin();
};
export const replace = () => {
  console.log('启动 replace 窗口');
  replaceWin();
};

export const table = () => {
  console.log('启动 table 窗口');
  tableWin();
};
