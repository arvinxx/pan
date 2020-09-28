/**
 * 获取粘贴文本
 **/
export const getTextFromPasteboard = (): string => {
  const pasteboard = NSPasteboard.generalPasteboard();
  return pasteboard.stringForType(NSPasteboardTypeString).toString();
};
