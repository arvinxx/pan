import BrowserWindow from 'sketch-module-web-view';
import { UI } from 'sketch';
import { getWinURL } from '@/sketch/utils/windows';
import { channel } from '@/bridge';
import { generateTable } from '@/sketch/utils/table';
import { TableModelType } from 'typings/data/table';
import { winIdentifier } from '@/sketch/windows/index';

const tableWindows = () => {
  const browserWindow = new BrowserWindow({
    identifier: winIdentifier.TABLE,
    title: '表格生成',
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
    // UI.message('UI loaded!');
  });

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', (s: any) => {
    UI.message(s);
    webContents
      .executeJavaScript(`result(${JSON.stringify(s)})`)
      .catch(console.error);
  });

  webContents.on(channel.TABLE_GENERATE, (data: string) => {
    const table: TableModelType = JSON.parse(data);
    const success = generateTable(table);
    if (success) {
      browserWindow.close();
    }
  });
  browserWindow.loadURL(getWinURL('table'));
};

export default tableWindows;
