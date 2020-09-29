/**
 * 判断是否是 Base64Image 字符串
 *
 * 如果是 则返回可以用的字符串
 *
 * 否则返回空
 * @param str
 */
export const isBase64ImageString = (str: string): string => {
  const reg = /data:image\/.*;base64,(.*)/;
  const group = reg.exec(str);

  if (!group) {
    return;
  }
  return group[1];
};
