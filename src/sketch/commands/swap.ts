import { Document } from 'sketch';
import { ChildLayer } from 'sketch/dom';
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

  let x = layer1.frame.x;
  let y = layer1.frame.y;

  const artboard1 = layer1.getParentArtboard();
  const artboard2 = layer2.getParentArtboard();
  if (
    // 都不在画板里
    (!artboard1 && !artboard2) ||
    // 都在画板里且画板相同
    (!!artboard1 && !!artboard2 && artboard1.id === artboard2.id)
  ) {
    console.log('都在画板里 或都不在画板里');
    // layer1 在 layer 2 右侧
    if (x > layer2.frame.x) {
      // 将 layer2 的 left 设置为 layer1 的 left
      // 将 layer2 的 right 设为 layer1 的 right
      layer1.frame.x = layer2.frame.x;
      layer2.frame.x = x + layer1.frame.width - layer2.frame.width;
    } else {
      x = layer2.frame.x;

      layer2.frame.x = layer1.frame.x;
      layer1.frame.x = x + layer2.frame.width - layer1.frame.width;
    }

    // layer1 在 layer 2 下方
    if (y > layer2.frame.y) {
      // 将 layer2 的 left 设置为 layer1 的 left
      // 将 layer2 的 right 设为 layer1 的 right
      layer1.frame.y = layer2.frame.y;
      layer2.frame.y = y + layer1.frame.height - layer2.frame.height;
    } else {
      y = layer2.frame.y;

      layer2.frame.y = layer1.frame.y;
      layer1.frame.y = y + layer2.frame.height - layer1.frame.height;
    }
  } else if (artboard1 && !artboard2) {
    let x = layer2.frame.x;
    let y = layer2.frame.y;
    // 将图层外的对象挪到图层内,并对齐
    artboard1.layers.push(layer2 as ChildLayer);
    layer2.frame.x = layer1.frame.x;
    layer2.frame.y = layer1.frame.y;

    document.selectedPage.layers.push(layer1 as ChildLayer);

    layer1.frame.x = x;
    layer1.frame.y = y;
  } else if (artboard2 && !artboard1) {
    let x = layer1.frame.x;
    let y = layer1.frame.y;
    // 将图层外的对象挪到图层内,并对齐
    artboard2.layers.push(layer1 as ChildLayer);
    layer1.frame.x = layer2.frame.x;
    layer1.frame.y = layer2.frame.y;

    document.selectedPage.layers.push(layer2 as ChildLayer);

    layer2.frame.x = x;
    layer2.frame.y = y;
  } else {
    console.log('两个不同画布');
  }
};

/**
 * 交换文字
 **/
export const swapText = (context: SketchContext) => {
  // Setup
  const doc = context.document;
  // const selection = context.selection;
  const selectionHasTextLayer = false;
  // const strings = [];

  const objects = context.selection as NSArray<MSRectangleShape>;
  if (objects.count() != 2) {
    doc.showMessage('请选择两个图层😶');
    return;
  }
  //
  // let layer;
  // let loop = selection.objectEnumerator();
  //
  // selection.forEach((layer) => {
  //   if (layer.class() === 'MSTextLayer') {
  //     selectionHasTextLayer = true;
  //
  //     // Collect stringslis
  //     strings.push(layer.stringValue());
  //   }
  // });
  //
  // // Check strings
  // if (strings.length == 2) {
  //   let i = strings.length - 1;
  //   loop = selection.objectEnumerator();
  //   while ((layer = loop.nextObject())) {
  //     layer.setStringValue(strings[i]);
  //     i--;
  //   }
  //
  //   // Finish
  //   doc.showMessage('文本交换完毕');
  // } else {
  //   // No text layers selected
  //   doc.showMessage('请选择两个图层😶');
  // }

  // No text layers selected
  if (!selectionHasTextLayer) {
    doc.showMessage('选中的图层没有文本');
  }
};
