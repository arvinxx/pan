import { UI } from 'sketch';
import { Text } from 'sketch/dom';

import { documentContext } from '@/sketch/utils';

import { getInputFromUser, INPUT_TYPE, message } from 'sketch/ui';

/**
 * 通过弹窗
 * 快捷编辑文本
 **/
export const fastEditText = () => {
  const { selection } = documentContext();

  const layers = selection.layers;
  // 判断一下至少包含一个文本图层
  const textLayers = layers.filter((l) =>
    ['Text', 'SymbolInstance'].includes(l.type)
  ) as Text[];
  if (textLayers.length === 0) {
    UI.message('请选择文本图层对象😶');
    return;
  }

  let initialValue = '';
  if (textLayers.length === 1) {
    initialValue = textLayers[0].text;
  }

  const text = getTextInModal(initialValue);

  layers.forEach((layer) => {
    // 文本图层
    if (layer.type === 'Text') {
      layer.text = text;
    }
    if (layer.type === 'SymbolInstance') {
      // Symbol对象
      // 如果有选中,那么只粘贴这个 override
      const overrides = layer.overrides.filter((o) => o.selected);
      if (overrides.length > 0) {
        const selectedOverride = overrides[0];
        if (overrides[0].property === 'stringValue') {
          overrides[0].value = text;
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
            textOverrides.forEach((override) => {
              override.value = text;
            });
          }
        }
      }
      // 如果没有选中,批量替换override
      else {
        layer.overrides
          .filter((o) => o.editable && o.property === 'stringValue')
          .forEach((override) => {
            override.value = text;
          });
      }
      return;
    }
  });
};

/**
 * 打开输入文本的弹窗
 * @param initialValue
 */
const getTextInModal = (initialValue) => {
  let text = '';
  getInputFromUser(
    '快捷编辑文本',
    {
      description: '请输入文本, 点击 OK 即可快速修改',
      type: INPUT_TYPE.string,
      initialValue,
    },
    (err, input) => {
      if (err) {
        message('出错了😶');
        return '';
      }
      text = input.toString();
    }
  );
  return text;
};
