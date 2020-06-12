export default function uuid(prefix = 'u') {
  return `${prefix}${'-xxxx-xxx'.replace(/x/g, () =>
    // eslint-disable-next-line no-bitwise
    ((Math.random() * 16) | (0 & 0x3)).toString(16)
  )}`;
}
