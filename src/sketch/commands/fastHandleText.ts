import { Document, UI } from 'sketch';
import { AllLayers } from 'sketch/dom';

const document = Document.getSelectedDocument();

/**
 * 复制文本
 **/
const copyText = (text: string) => {
  const pasteboard = NSPasteboard.generalPasteboard();
  pasteboard.clearContents();
  pasteboard.writeObjects([text]);

  UI.message('复制成功!');
};
/**
 * 获取粘贴文本
 **/
const getTextFromPasteboard = (): string => {
  const pasteboard = NSPasteboard.generalPasteboard();
  return pasteboard.stringForType(NSPasteboardTypeString).toString();
};

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
    copyText(layer.text);
    return;
  }

  // Symbol对象
  if (layer.type === 'SymbolInstance') {
    // 找出所有可编辑的 Text 文本
    const overrides = layer.overrides.filter(
      (o) => o.editable && o.property === 'stringValue'
    );

    if (overrides.length === 1) {
      copyText(overrides[0].value as string);
      return;
    } else {
      // 找出选中的
      const override = overrides.filter((o) => o.selected);
      if (override.length === 1) {
        copyText(override[0].value as string);
        return;
      }
    }
  }

  UI.message('请选择一个包含文本的图层对象😶');
};
/**
 * 快速粘贴文本到图层对象
 * @see https://www.yuque.com/design-engineering/pan/fast-text
 **/
export const fastPasteText = () => {
  const selection = document.selectedLayers;

  /**
   * 递归粘贴文本
   **/
  const pasteTextToLayer = (layer: AllLayers) => {
    if (layer.type === 'Text') {
      // 复制文本
      layer.text = getTextFromPasteboard();
      return;
    }

    // Symbol对象
    if (layer.type === 'SymbolInstance') {
      // 如果有选中,那么只粘贴这个 override
      const overrides = layer.overrides.filter((o) => o.selected);

      console.log(layer.overrides.filter((o) => o.editable));
      if (overrides.length > 0) {
        const selectedOverride = overrides[0];
        if (overrides[0].property === 'stringValue') {
          overrides[0].value = getTextFromPasteboard();
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
              text.value = getTextFromPasteboard();
            });
          }
        }
      } else {
        // 如果没有选中,批量替换override
        layer.overrides
          .filter((o) => o.editable && o.property === 'stringValue')
          .forEach((override) => {
            override.value = getTextFromPasteboard();
          });
      }
      return;
    }

    // 开始递归
    if (
      // 必须要有 Layer
      !(
        layer.type === 'Image' ||
        layer.type === 'ShapePath' ||
        layer.type === 'HotSpot'
      ) &&
      layer.layers.length > 0
    ) {
      layer.layers.forEach(pasteTextToLayer);
    }
  };

  try {
    selection.forEach(pasteTextToLayer);
  } catch (e) {
    UI.message('剪切板中似乎没有文本😶');
  }
};
