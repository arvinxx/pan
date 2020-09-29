import { UI } from 'sketch';
import { SymbolInstance, Text } from 'sketch/dom';

import { documentContext } from '@/sketch/utils';

import { getInputFromUser, INPUT_TYPE } from 'sketch/ui';

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
  ) as (Text | SymbolInstance)[];
  if (textLayers.length === 0) {
    UI.message('请选择文本图层对象😶');
    return;
  }

  let initialValue = '';
  if (textLayers.length === 1) {
    const layer = textLayers[0];
    if (layer.type === 'Text') {
      initialValue = layer.text;
    }
    // TODO 添加初始化单个 SymbolInstance 文本的能力

    if (layer.type === 'SymbolInstance') {
      layer.overrides
        .filter((o) => o.editable && o.property === 'stringValue')
        .forEach((override) => {
          console.log(override);
          if (override.value) {
            initialValue = override.value as string;
          } else {
            initialValue = (override.affectedLayer as Text).text;
          }
        });
    }
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
      description: '请在下方编辑文本。编辑完成后, 点击 OK 或按下回车即可',
      type: INPUT_TYPE.string,
      initialValue,
    },
    (err, input) => {
      if (err) {
        text = initialValue ? initialValue : '';
      } else {
        text = input.toString();
      }
    }
  );
  return text;
};
