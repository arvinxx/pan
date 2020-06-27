import BrowserWindow from 'sketch-module-web-view';
import { UI } from 'sketch';
import { getWinURL } from '@/sketch/utils/windows';
import { getNativeLayer } from '@/sketch/modules/sketchJson';
import { channel } from '@/bridge';
import { winIdentifier } from './index';

let browserWindow: BrowserWindow = null;

const testFieldWindow = () => {
  browserWindow = new BrowserWindow({
    alwaysOnTop: true,
    identifier: winIdentifier.TEST_FIELD,
    width: 240,
    height: 300,
    title: '测试场',
    show: false,
    resizable: false,
    hidesOnDeactivate: false,
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

  webContents.on(channel.TEST_FIELD, (data) => {
    const page = context.document.currentPage();

    if (data.length) {
      data
        // 将layer 转为原生 layer
        .map(getNativeLayer)
        // 添加到图层里
        .forEach((layer) => layer && page.addLayer(layer));
    }

    console.log('添加成功');
  });
  browserWindow.loadURL(getWinURL('test'));
  return browserWindow;
};

export default testFieldWindow;
