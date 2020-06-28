// taken from https://github.com/airbnb/react-sketchapp/blob/master/src/jsonUtils/hacksForJSONImpl.js
import { TextAlignment } from 'sketch-constants';
import { makeColorFromCSS } from './utils';
import toSJSON from '../toSJSON';
import findFont from './findFont';

export interface TextStyle {
  color: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  lineHeight: number;
  textDecoration: string;
  textAlign: string;
  fontStyle: string;
  textTransform?: string;
  letterSpacing?: number;
}

interface TextNode {
  content: string;
  textStyles: TextStyle;
}

const TEXT_ALIGN = {
  auto: TextAlignment.Left,
  left: TextAlignment.Left,
  right: TextAlignment.Right,
  center: TextAlignment.Center,
  justify: TextAlignment.Justified,
};

const TEXT_DECORATION_UNDERLINE = {
  none: 0,
  underline: 1,
  double: 9,
};

const TEXT_DECORATION_LINETHROUGH = {
  none: 0,
  'line-through': 1,
};

// this doesn't exist in constants
const TEXT_TRANSFORM = {
  uppercase: 1,
  lowercase: 2,
  initial: 0,
  inherit: 0,
  none: 0,
  capitalize: 0,
};

function makeParagraphStyle(textStyle) {
  const pStyle = NSMutableParagraphStyle.alloc().init();

  if (textStyle.lineHeight !== undefined) {
    pStyle.minimumLineHeight = textStyle.lineHeight;
    pStyle.lineHeightMultiple = 1.0;
    pStyle.maximumLineHeight = textStyle.lineHeight;
  }

  if (textStyle.textAlign) {
    pStyle.alignment = TEXT_ALIGN[textStyle.textAlign];
  }

  return pStyle;
}

// This shouldn't need to call into Sketch, but it does currently, which is bad for perf :(
function createStringAttributes(textStyles: TextStyle) {
  const font = findFont(textStyles);

  const attribs = {
    MSAttributedStringFontAttribute: font.fontDescriptor(),
    NSFont: font,
    NSParagraphStyle: makeParagraphStyle(textStyles),
    NSUnderline: TEXT_DECORATION_UNDERLINE[textStyles.textDecoration] || 0,
    NSStrikethrough:
      TEXT_DECORATION_LINETHROUGH[textStyles.textDecoration] || 0,
    MSAttributedStringColorAttribute: makeColorFromCSS(
      textStyles.color || 'black'
    ),
  };

  if (textStyles.letterSpacing !== undefined) {
    attribs.NSKern = textStyles.letterSpacing;
  }

  if (textStyles.textTransform !== undefined) {
    attribs.MSAttributedStringTextTransformAttribute =
      TEXT_TRANSFORM[textStyles.textTransform] * 1;
  }

  return attribs;
}

function createAttributedString(textNode: TextNode) {
  const { content, textStyles } = textNode;

  const attribs = createStringAttributes(textStyles);
  let result = null;

  try {
    result = NSAttributedString.attributedStringWithString_attributes_(
      content,
      attribs
    );
  } catch (e) {
    console.log(`Failed to create attributed string: ${e}`);
  }

  return result;
}

function makeEncodedAttributedString(textNodes: TextNode[]) {
  const fullStr = NSMutableAttributedString.alloc().init();

  textNodes.forEach((textNode) => {
    const newString = createAttributedString(textNode);

    if (newString !== null) {
      fullStr.appendAttributedString(newString);
    }
  });

  const encodedAttribStr = MSAttributedString.encodeAttributedString(fullStr);

  const msAttribStr = MSAttributedString.alloc().initWithEncodedAttributedString(
    encodedAttribStr
  );

  return toSJSON(msAttribStr);
}

export function fixTextLayer(layer) {
  layer.attributedString = makeEncodedAttributedString([
    { content: layer.text, textStyles: layer.style },
  ]);

  delete layer.style;
  delete layer.text;
}
