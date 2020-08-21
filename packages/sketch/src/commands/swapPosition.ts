import { Document, UI } from 'sketch';
import { AllLayers, Artboard, ChildLayer, Group, Page } from 'sketch/dom';

const getAbsRectX = (layer: AllLayers) => {
  return layer.sketchObject.absoluteRect().x();
};

/**
 * 相同坐标系之内进行变换
 */
const swapXYWithSame = (layer1: AllLayers, layer2: AllLayers) => {
  //需要获取绝对坐标来确认谁在谁左边
  const layer1Abs = layer1.sketchObject.absoluteRect();
  const layer2Abs = layer2.sketchObject.absoluteRect();

  const layer1AbsX = layer1Abs.x();
  const layer2AbsX = layer2Abs.x();
  const layer1AbsRight = layer1Abs.x() + layer1Abs.width();
  const layer2AbsRight = layer2Abs.x() + layer2Abs.width();
  let x;
  let y;
  let isXSwapped = true;

  if (
    // 左对齐
    layer1AbsX !== layer2AbsX &&
    // 右对齐
    layer1AbsRight !== layer2AbsRight &&
    // 除掉一些特殊情况
    !(
      // case1  layer1 左边比 layer2 大 但是右边比 layer2 小
      (
        (layer1AbsX > layer2AbsX && layer1AbsRight < layer2AbsRight) ||
        // case2  layer1 左边比 layer2 大 但是右边比 layer2 小
        (layer2AbsX > layer1AbsX && layer2AbsRight < layer1AbsRight)
      )
    )
  ) {
    // layer1 在 layer 2 右侧
    if (layer1AbsX > layer2AbsX) {
      x = layer1.frame.x;
      // 将 layer2 的 left 设置为 layer1 的 left
      layer1.frame.x = layer2.frame.x;
      // 将 layer2 的 right 设为 layer1 的 right
      layer2.frame.x = x + layer1.frame.width - layer2.frame.width;
    }
    // layer1 在 layer 2 左侧
    else {
      x = layer2.frame.x;

      layer2.frame.x = layer1.frame.x;
      layer1.frame.x = x + layer2.frame.width - layer1.frame.width;
    }
  } else {
    isXSwapped = false;
  }
  // layer1 在 layer 2 下方
  if (layer1Abs.y() > layer2Abs.y()) {
    y = layer1.frame.y;
    // 将 layer1 的 top 设置为 layer2 的 top
    // 将 layer2 的 bottom 设为 layer1 的 bottom
    layer1.frame.y = layer2.frame.y;
    layer2.frame.y = y + layer1.frame.height - layer2.frame.height;
  } else {
    y = layer2.frame.y;

    layer2.frame.y = layer1.frame.y;
    layer1.frame.y = y + layer2.frame.height - layer1.frame.height;
  }

  return { isXSwapped };
};

/**
 * 交换两个物体位置
 */
export const swapPosition = (context: SketchContext) => {
  const document = Document.getSelectedDocument();
  const selection = document.selectedLayers;
  if (selection.length != 2) {
    context.document.showMessage('请选择两个图层😶');
    return;
  }

  const layers = selection.layers;

  const layer1 = layers[0];
  const layer2 = layers[1];

  const parent1 = layer1.parent as Group | Page | Artboard;
  const parent2 = layer2.parent as Group | Page | Artboard;
  const { isXSwapped } = swapXYWithSame(layer1, layer2);

  // 在同一个父级里,意味着基础坐标系一致
  // 不需要做别的
  if (parent1.type === parent2.type && parent1.id === parent2.id) {
    return;
  }
  // 否则坐标系不一致,需要调整坐标系
  // 方式是调整图层位置

  // 首先要看下是否交换过X坐标
  // 如果没交换过需要将两者的 x 都换成绝对坐标
  if (!isXSwapped) {
    const layer1AbsX = getAbsRectX(layer1);
    const layer2AbsX = getAbsRectX(layer2);

    // 不等则说明这个 layer 父级是 Group 或者 Artboard
    if (layer1.parent.type !== 'Page') {
      layer1.frame.x = layer1AbsX;
    } else {
      layer1.frame.x = layer1AbsX - getAbsRectX(parent2);
    }
    if (layer2.parent.type !== 'Page') {
      layer2.frame.x = layer2AbsX;
    } else {
      layer2.frame.x = layer2AbsX - getAbsRectX(parent1);
    }
  }

  parent1.layers.push(layer2 as ChildLayer);
  parent2.layers.push(layer1 as ChildLayer);

  if (parent1.type !== 'Artboard') {
    // 更新图层 frame
    parent1.adjustToFit();
  }
  if (parent2.type !== 'Artboard') {
    // 更新图层 frame
    parent2.adjustToFit();
  }
};

/**
 * 交换文字
 **/
export const swapText = () => {
  const document = Document.getSelectedDocument();
  const selection = document.selectedLayers;
  if (selection.length != 2) {
    UI.message('请选择两个图层😶');
    return;
  }
  const layer1 = selection.layers[0];
  const layer2 = selection.layers[1];
  if (layer1.type !== 'Text' || layer2.type !== 'Text') {
    UI.message('选中的图层没有都包含文本😶');
    return;
  }
  const tempText = layer1.text;

  layer1.text = layer2.text;
  layer2.text = tempText;
};
