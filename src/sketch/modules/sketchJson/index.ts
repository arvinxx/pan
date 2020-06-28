import FileFormat from '@sketch-hq/sketch-file-format-ts';

import { fixTextLayer } from './helpers/fixFont';
import fixImageFillsInLayer from './helpers/fixImageFill';
import fixBitmap from './helpers/fixBitmap';
import fixSVGLayer from './helpers/fixSVG';
import fromSJSON from './fromSJSON';

/**
 * 将 JSON 图层转为 原生图层
 * @param layer
 */
export const getNativeLayer = (layer): FileFormat.AnyLayer => {
  // debug
  console.log('Processing ' + layer.name + ' (' + layer._class + ')');

  if (layer._class === 'text') {
    fixTextLayer(layer);
  } else if (layer._class === 'svg') {
    fixSVGLayer(layer);
  } else if (layer._class === 'bitmap') {
    fixBitmap(layer);
  } else {
    fixImageFillsInLayer(layer);
  }

  // Create native object for the current layer, ignore the children for now
  // this alows us to catch and ignore failing layers and finish the import
  const children = layer.layers;
  let nativeObj = null;

  layer.layers = [];

  try {
    nativeObj = fromSJSON(layer);
  } catch (e) {
    console.log(`Layer failed to import: ${layer.name}`);
    return null;
  }

  // Get native object for all child layers and append them to the current object
  if (children && children.length && children.length > 0) {
    children.forEach((child) => {
      const nativeChild = getNativeLayer(child);

      if (nativeChild) {
        nativeObj.addLayer(nativeChild);
      }
    });
  }

  return nativeObj;
};
