import BrowserWindow from 'sketch-module-web-view';
import { UI } from 'sketch';
import { getWinURL } from '@/sketch/utils/windows';

const homeWindows = () => {
  const browserWindow = new BrowserWindow({
    identifier: 'homeWin.webview',
    width: 240,
    height: 180,
    show: false,
    hidesOnDeactivate: false,
  });

  // only show the window when the page has loaded to avoid a white flash
  browserWindow.once('ready-to-show', () => {
    browserWindow.show();
  });

  const webContents = browserWindow.webContents;

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    UI.message('UI loaded!');
  });

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', (s: any) => {
    UI.message(s);
    webContents
      .executeJavaScript(`result(${JSON.stringify(s)})`)
      .catch(console.error);
  });

  browserWindow.loadURL(getWinURL('home'));
};

export default homeWindows;
