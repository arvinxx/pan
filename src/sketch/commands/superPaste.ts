import { UI } from 'sketch';
import { AllLayers, Types } from 'sketch/dom';
import { isBase64ImageString } from '@pan/utils';
import { documentContext } from '../utils';
import {
  pasteAsSketch,
  pasteAsImage,
  pasteImageToLayer,
  getTextFromClipboard,
  copyTextToClipboard,
} from '../function';

const { document } = documentContext();

/**
 * 快速复制文本
 * @see https://www.yuque.com/design-engineering/pan/fast-text
 **/
export const fastCopyText = () => {
  const selection = document.selectedLayers;

  if (selection.length !== 1) {
    UI.message('请选择一个图层对象😶');
    return;
  }

  const layer = selection.layers[0];

  // 文本图层
  if (layer.type === 'Text') {
    // 复制文本
    copyTextToClipboard(layer.text);
    return;
  }

  // Symbol对象
  if (layer.type === 'SymbolInstance') {
    // 找出所有可编辑的 Text 文本
    const overrides = layer.overrides.filter(
      (o) => o.editable && o.property === 'stringValue'
    );

    if (overrides.length === 1) {
      copyTextToClipboard(overrides[0].value as string);
      return;
    } else {
      // 找出选中的
      const override = overrides.filter((o) => o.selected);
      if (override.length === 1) {
        copyTextToClipboard(override[0].value as string);
        return;
      }
    }
  }

  UI.message('请选择一个包含文本的图层对象😶');
};

/**
 * 超级粘贴方法
 **/
const superPasteToLayer = (layer: AllLayers) => {
  switch (layer.type) {
    // 文本对象
    case Types.Text:
      // 复制文本
      layer.text = getTextFromClipboard();
      return;
    // Symbol对象
    case Types.SymbolInstance:
      // 如果有选中,那么只粘贴这个 override
      const overrides = layer.overrides.filter((o) => o.selected);
      if (overrides.length > 0) {
        const selectedOverride = overrides[0];
        if (overrides[0].property === 'stringValue') {
          overrides[0].value = getTextFromClipboard();
        }
        // 针对 嵌套 symbol 需要有特别的方式拿到关联的文本
        else if (selectedOverride.property === 'symbolID') {
          const symbolId = selectedOverride.path;

          const textOverrides = layer.overrides.filter(
            (o) =>
              o.editable &&
              o.path.includes(symbolId) &&
              o.property === 'stringValue'
          );

          if (textOverrides.length > 0) {
            textOverrides.forEach((text) => {
              text.value = getTextFromClipboard();
            });
          }
        }
      }
      // 如果没有选中,批量替换override
      else {
        layer.overrides
          .filter((o) => o.editable && o.property === 'stringValue')
          .forEach((override) => {
            override.value = getTextFromClipboard();
          });
      }
      return;

    // 图层对象
    // 粘贴图片
    case Types.Shape:
    case Types.ShapePath:
      pasteImageToLayer(layer);
      return;
  }

  // 开始递归
  if (
    // 必须要有 Layer
    !(
      layer.type === 'Image' ||
      layer.type === 'HotSpot' ||
      layer.type === 'Slice'
    ) &&
    layer.layers &&
    layer.layers.length > 0
  ) {
    layer.layers.forEach(superPasteToLayer);
  }
};

/**
 * 超级粘贴
 * @see https://www.yuque.com/design-engineering/pan/super-paste
 **/
export const superPaste = () => {
  const selection = document.selectedLayers;

  if (selection.length !== 0) {
    try {
      selection.forEach(superPasteToLayer);
    } catch (e) {
      console.log(e);
      UI.message('剪切板中似乎没有文本😶');
    }
  } else {
    const text = getTextFromClipboard();

    try {
      if (JSON.parse(text)) {
        // 粘贴为 Sketch
        pasteAsSketch();
      }
    } catch (e) {
      if (isBase64ImageString(text)) {
        // 判断是否是 图片格式
        pasteAsImage();
      }
    }
  }
};
