import { UI } from 'sketch';

/**
 * 获取粘贴文本
 **/
export const getTextFromClipboard = (): string => {
  const pasteboard = NSPasteboard.generalPasteboard();
  return pasteboard.stringForType(NSPasteboardTypeString).toString();
};

/**
 * 复制文本
 **/
export const copyTextToClipboard = (text: string) => {
  const pasteboard = NSPasteboard.generalPasteboard();
  pasteboard.clearContents();
  pasteboard.writeObjects([text]);

  UI.message('复制成功!');
};

/**
 * 获取粘贴的图片
 **/
export const getImageFromClipboard = (): NSImage | undefined => {
  const pasteboard = NSPasteboard.generalPasteboard();

  console.log(pasteboard);
  const imgData = pasteboard.dataForType(NSPasteboardTypePNG);
  console.log(imgData);
  const imgTiffData = pasteboard.dataForType(NSPasteboardTypeTIFF);
  console.log(imgTiffData);

  if (imgData || imgTiffData) {
    if (imgData) {
      return NSImage.alloc().initWithData(imgData);
    }
    if (imgTiffData) {
      return NSImage.alloc().initWithData(imgTiffData);
    }
  }
};
