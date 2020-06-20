import BrowserWindow from 'sketch-module-web-view';
import { UI } from 'sketch';
import { getWinURL } from '@/sketch/utils/windows';
import { winIdentifier } from './index';

let browserWindow: BrowserWindow = null;

const toolbarWindow = (options?) => {
  browserWindow = new BrowserWindow({
    ...options,
    alwaysOnTop: true,
    // frame: false,
    identifier: winIdentifier.TOOLBAR,
    width: 80,
    show: true,
    resizable: false,
    hidesOnDeactivate: false,
    vibrancy: 'sidebar',
  });

  // only show the window when the page has loaded to avoid a white flash
  browserWindow.once('ready-to-show', () => {
    browserWindow.show();
  });

  const webContents = browserWindow.webContents;

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', (s: any) => {
    UI.message(s);
    webContents
      .executeJavaScript(`result(${JSON.stringify(s)})`)
      .catch(console.error);
  });

  browserWindow.loadURL(getWinURL('toolbar'));
  return browserWindow;
};

export default toolbarWindow;
