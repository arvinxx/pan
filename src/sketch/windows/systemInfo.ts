import BrowserWindow from 'sketch-module-web-view';
import { getWinURL } from '@/sketch/utils/windows';
import { winIdentifier } from './index';

let browserWindow: BrowserWindow = null;

const systemInfoWindow = () => {
  browserWindow = new BrowserWindow({
    alwaysOnTop: true,
    identifier: winIdentifier.SYSTEM_INFO,
    width: 240,
    height: 300,
    title: '插件信息',
    show: false,
    resizable: false,
    hidesOnDeactivate: false,
  });

  browserWindow.once('ready-to-show', () => {
    browserWindow.show();
  });

  browserWindow.loadURL(getWinURL('systemInfo'));
  return browserWindow;
};

export default systemInfoWindow;
