/**
 * 交换两个物体位置
 */
export const swapPosition = (context: SketchContext) => {
  const objects = context.selection as NSArray<MSRectangleShape>;
  if (objects.count() != 2) {
    context.document.showMessage('请选择两个图层😶');
    return;
  }

  const oneMid: CGPoint = objects[0].absolutePosition();
  const twoMid: CGPoint = objects[1].absolutePosition();

  const oneArtboard = objects[0].parentArtboard();
  const twoArtboard = objects[1].parentArtboard();

  // 如果有存在画板不一致 需要进行坐标变换
  if (oneArtboard && !twoArtboard) {
    // 将 one 移出画板
    oneArtboard.removeLayer(objects[0]);
    context.document.currentPage().addLayer(objects[0]);
    // 将 two 移入画板
    oneArtboard.addLayer(objects[1]);
    context.document.currentPage().removeLayer(objects[1]);
  }

  if (!oneArtboard && twoArtboard) {
    // 将 one 移入画板
    twoArtboard.removeLayer(objects[1]);
    context.document.currentPage().addLayer(objects[1]);
    // 将 two 移出画板
    twoArtboard.addLayer(objects[0]);
    context.document.currentPage().removeLayer(objects[0]);
  }

  objects[1].setAbsolutePosition(oneMid);
  objects[0].setAbsolutePosition(twoMid);
};

/**
 * 交换文字
 **/
export const swapText = (context: SketchContext) => {
  // Setup
  const doc = context.document;
  const selection = context.selection;
  const selectionHasTextLayer = false;
  const strings = [];

  const objects = context.selection as NSArray<MSRectangleShape>;
  if (objects.count() != 2) {
    doc.showMessage('请选择两个图层😶');
    return;
  }

  let layer;
  let loop = selection.objectEnumerator();

  selection.forEach((layer) => {
    if (layer.class() === 'MSTextLayer') {
      selectionHasTextLayer = true;

      // Collect stringslis
      strings.push(layer.stringValue());
    }
  });

  // Check strings
  if (strings.length == 2) {
    let i = strings.length - 1;
    loop = selection.objectEnumerator();
    while ((layer = loop.nextObject())) {
      layer.setStringValue(strings[i]);
      i--;
    }

    // Finish
    doc.showMessage('文本交换完毕');
  } else {
    // No text layers selected
    doc.showMessage('请选择两个图层😶');
  }

  // No text layers selected
  if (!selectionHasTextLayer) {
    doc.showMessage('选中的图层没有文本');
  }
};
