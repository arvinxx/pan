import { fromSJSON } from '../modules/SketchJSON';
import { getTextFromPasteboard } from '../function/pasteboard';
import { fromNative, Document, UI } from 'sketch';
import { AllLayers, ChildLayer } from 'sketch/dom';
import SketchFormat from '@sketch-hq/sketch-file-format-ts';

const adjustFrame = (layer: AllLayers) => {
  switch (layer.type) {
    case 'Image':
    case 'ShapePath':
    case 'Artboard':
      break;
    case 'Group':
    case 'Page':
    case 'Shape':
    case 'SymbolMaster':
      if (layer.layers && layer.layers.length !== 0) {
        layer.layers.forEach(adjustFrame);
      } else {
        layer.adjustToFit();
      }
  }
};
/**
 * 复制 JSON 为 Sketch 图层
 **/
export const pasteAsSketch = () => {
  const text = getTextFromPasteboard();
  try {
    const json: SketchFormat.AnyObject = JSON.parse(text);

    if (!json._class) {
      UI.message('不是有效的 Sketch JSON 对象😶');
      return;
    }
    const nativeLayer = fromSJSON(json);
    const layer = fromNative(nativeLayer) as ChildLayer;

    adjustFrame(layer);
    Document.getSelectedDocument().selectedPage.layers.push(layer);
  } catch (e) {
    const { message } = e;
    console.log(message);

    if (<string>message.includes('JSON Parse error: Unexpected identifier')) {
      UI.message('不是有效的 Sketch JSON 对象😶');
    } else {
      UI.message(e);
    }
  }
};
