import BrowserWindow from 'sketch-module-web-view';
import { UI } from 'sketch';
import { getWinURL } from '@/sketch/utils/windows';
import { channel } from '@/bridge';

import { winIdentifier } from '@/sketch/windows/index';

import { getNativeLayer } from '@/sketch/modules/sketchJson';

const tableWindows = () => {
  const browserWindow = new BrowserWindow({
    identifier: winIdentifier.TABLE,
    title: '表格生成',
    show: false,
    hidesOnDeactivate: false,
  });

  const threadDictionary = NSThread.mainThread().threadDictionary();

  threadDictionary[winIdentifier.TABLE] = browserWindow;

  // only show the window when the page has loaded to avoid a white flash
  browserWindow.once('ready-to-show', () => {
    browserWindow.show();
  });

  const webContents = browserWindow.webContents;

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    // UI.message('UI loaded!');
  });

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', (s: any) => {
    UI.message(s);
    webContents
      .executeJavaScript(`result(${JSON.stringify(s)})`)
      .catch(console.error);
  });

  webContents.on(channel.TABLE_GENERATE_FROM_JSON, (data) => {
    const page = context.document.currentPage();

    if (data.length) {
      data
        // 将layer 转为原生 layer
        .map(getNativeLayer)
        // 添加到图层里
        .forEach((layer) => layer && page.addLayer(layer));
    } else {
      page.addLayer(getNativeLayer(data));

      data.layers
        .map(getNativeLayer)
        .forEach((layer) => layer && page.addLayer(layer));
    }
  });

  browserWindow.loadURL(getWinURL('table'));
};

export default tableWindows;
