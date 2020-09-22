import { message } from 'sketch/ui';
import { documentContext, isBase64ImageString } from '@/sketch/utils';
import {
  getImageFromClipboard,
  getTextFromClipboard,
} from '@/sketch/function/clipboard';
import { Image, UI } from 'sketch';
import { Pattern, ShapeType, Style } from 'sketch/dom';

/**
 * 将 Base64 粘贴为 Image
 */
export const pasteAsImage = () => {
  // 获取 base64 字符串
  const str = getTextFromClipboard();
  const base64 = isBase64ImageString(str);

  if (!base64) {
    message('不符合Base64规范😶');
    return;
  }

  // 生成图片

  const imageLayer = new Image({
    image: { base64 },
  });
  const { page } = documentContext();
  page.layers.push(imageLayer);
};

/**
 * 从 base64 字符串 生成图片的 NSData
 * @param str
 */
export const getImageDataFromBase64String = (str: string): NSData => {
  const base64 = isBase64ImageString(str);

  if (!base64) {
    message('不符合Base64规范😶');
    return;
  }

  return NSData.alloc().initWithBase64EncodedString_options(
    NSString.stringWithString(base64),
    NSDataBase64DecodingIgnoreUnknownCharacters
  );
};

/**
 * 粘贴为图片填充
 */
export const pasteImageToLayer = (layer: ShapeType) => {
  const text = getTextFromClipboard();

  let imageLayer;

  if (!isBase64ImageString(text)) {
    const image = getImageFromClipboard();

    if (!image) {
      UI.message('剪切板没有图片😶');
      return;
    }

    imageLayer = new Image({
      image,
    });
  } else {
    const base64 = isBase64ImageString(text);

    // 生成图片源
    imageLayer = new Image({ image: { base64 } });
  }

  const fills = (layer as ShapeType).style.fills;

  const fillPattern: Pattern = {
    patternType: Style.PatternFillType.Fit,
    image: imageLayer.image,
    tileScale: 1,
  };
  if (fills.length === 0) {
    fills.push({
      fillType: Style.FillType.Pattern,
      enabled: true,
      pattern: fillPattern,
    });
  } else {
    fills.pop();
    fills.push({
      fillType: Style.FillType.Pattern,
      enabled: true,
      pattern: fillPattern,
    });
  }
};
