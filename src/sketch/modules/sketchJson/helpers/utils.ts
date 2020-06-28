import normalizeColor from 'normalize-css-color';
import murmurHash from 'murmur2js';

const safeToLower = (input) => {
  if (typeof input === 'string') {
    return input.toLowerCase();
  }

  return input;
};

// Takes colors as CSS hex, name, rgb, rgba, hsl or hsla
export const makeColorFromCSS = (input, alpha = 1) => {
  const nullableColor = normalizeColor(safeToLower(input));
  const colorInt = nullableColor === null ? 0x00000000 : nullableColor;
  const { r, g, b, a } = normalizeColor.rgba(colorInt);

  return {
    _class: 'color',
    red: r / 255,
    green: g / 255,
    blue: b / 255,
    alpha: a * alpha,
  };
};

export function replaceProperties(dest, src) {
  for (const prop in dest) {
    if (dest.hasOwnProperty(prop)) {
      delete dest[prop];
    }
  }

  for (const prop in src) {
    if (src.hasOwnProperty(prop)) {
      dest[prop] = src[prop];
    }
  }
}

export const sortObjectKeys = (obj) => {
  const keys = Object.keys(obj).sort();

  return keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
};

/**
 * hash style 对象
 */
export const hashStyle = (obj: Object): string => {
  return obj ? murmurHash(JSON.stringify(sortObjectKeys(obj))) : '0';
};
