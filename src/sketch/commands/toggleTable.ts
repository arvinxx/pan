import { tableWin } from '@/sketch/windows';
import { Settings, Document } from 'sketch';

import { sendMsgToWebView } from '@/bridge';

/**
 * 输出插件基本信息
 */
export default () => {
  const win = tableWin();
  // context.document.showMessage('️打开表格️');
  // 只选中了

  const selection = Document.getSelectedDocument().selectedLayers;
  if (selection.length === 1) {
    const group = selection.layers[0];
    const data = Settings.layerSettingForKey(group, 'TABLE_DATA');

    // 如果有
    if (data) {
      sendMsgToWebView(win, 'TABLE_FROM_LAYER_DATA', data);
      Settings.setSessionVariable('PAN_ACTIVE_TABLE', group.id);
    }
  }
};
