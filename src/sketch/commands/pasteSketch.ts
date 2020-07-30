import { fromSJSON } from 'from-sketch-json';
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
 * 将单个 JSON 转换为 Sketch 对象
 * @param layer
 */
const transformToSketch = (layer: SketchFormat.AnyObject) => {
  if (!layer._class) {
    UI.message('不是有效的 Sketch JSON 对象😶');
    return;
  }
  const nativeLayer = fromSJSON(layer);
  const sketchObj = fromNative(nativeLayer) as ChildLayer;

  adjustFrame(sketchObj);
  Document.getSelectedDocument().selectedPage.layers.push(sketchObj);
};

/**
 * 复制 JSON 为 Sketch 图层
 **/
export const pasteAsSketch = () => {
  const text = getTextFromPasteboard();
  try {
    const json: SketchFormat.AnyObject | SketchFormat.AnyObject[] = JSON.parse(
      text
    );
    if (json instanceof Array) {
      for (const obj of json) {
        transformToSketch(obj);
      }
    } else {
      transformToSketch(json);
    }
  } catch (e) {
    const { message } = e;
    console.log(message);

    if (<string>message.includes('JSON Parse error: Unexpected identifier')) {
      UI.message('[pasteAsSketch]不是有效的 Sketch JSON 对象😶');
    } else {
      UI.message(e);
    }
  }
};
