import { documentContext } from '../utils';
import { message } from 'sketch/ui';

/**
 * 选择父级
 */
export const selectParent = () => {
  const { selection } = documentContext();
  if (selection.length !== 1) {
    message('😶请选择一个图层');
    return;
  }
  const selectLayer = selection.layers[0];

  if (selectLayer.parent.type === 'Group') {
    selectLayer.parent.sketchObject.select_byExtendingSelection(true, false);
  } else {
    message('😶父级不是Group');
  }
};
