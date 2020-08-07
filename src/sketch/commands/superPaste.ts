import { Document, UI, Image } from 'sketch';
import { AllLayers, ShapeType, Style, Types } from 'sketch/dom';
import { pasteAsSketch } from '../function/pasteAsSketch';

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
 * 获取粘贴的图片
 **/
const getImageFromPasteboard = (): NSImage | undefined => {
  const pasteboard = NSPasteboard.generalPasteboard();

  const imgData = pasteboard.dataForType(NSPasteboardTypePNG);
  const imgTiffData = pasteboard.dataForType(NSPasteboardTypeTIFF);

  if (imgData || imgTiffData) {
    if (imgData) {
      return NSImage.alloc().initWithData(imgData);
    }
    if (imgTiffData) {
      return NSImage.alloc().initWithData(imgTiffData);
    }
  }
};

/**
 * 粘贴为图片填充
 */
export const pasteImageToLayer = (layer: ShapeType) => {
  const image = getImageFromPasteboard();

  if (!image) {
    UI.message('剪切板没有图片😶');
    return;
  }
  const fills = (layer as ShapeType).style.fills;

  const imageLayer = new Image({
    image,
  });

  if (fills.length === 0) {
    fills.push({
      fill: Style.FillType.Pattern,
      enabled: true,
      pattern: {
        patternType: 'Fill',
        image: imageLayer.image,
        tileScale: 1,
      },
    });
  } else {
    fills.pop();
    fills.push({
      fill: Style.FillType.Pattern,
      enabled: true,
      pattern: {
        patternType: 'Fill',
        image: imageLayer.image,
        tileScale: 1,
      },
    });
  }
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
 * 超级粘贴方法
 **/
const superPasteToLayer = (layer: AllLayers) => {
  switch (layer.type) {
    // 文本对象
    case Types.Text:
      // 复制文本
      layer.text = getTextFromPasteboard();
      return;
    // Symbol对象
    case Types.SymbolInstance:
      // 如果有选中,那么只粘贴这个 override
      const overrides = layer.overrides.filter((o) => o.selected);
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
      }
      // 如果没有选中,批量替换override
      else {
        layer.overrides
          .filter((o) => o.editable && o.property === 'stringValue')
          .forEach((override) => {
            override.value = getTextFromPasteboard();
          });
      }
      return;

    // 图层对象
    // 粘贴图片
    case Types.Shape:
    case Types.ShapePath:
      const image = getImageFromPasteboard();

      if (!image) {
        UI.message('剪切板没有图片😶');
        return;
      }
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
      UI.message('剪切板中似乎没有文本😶');
    }
  } else {
    pasteAsSketch();
  }
};
