/**
 * 交换两个物体位置
 */
export const swapPosition = (context: SketchContext) => {
  const objects = context.selection as NSArray<MSRectangleShape>;
  if (objects.count() != 2) {
    context.document.showMessage('请选择两个物体😶');
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
