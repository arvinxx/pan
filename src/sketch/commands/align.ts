/**
 * 左对齐
 */
export const alignToLeft = (context: SketchContext) => {
  const objects = context.selection as NSArray<MSRectangleShape>;
  if (objects.count() === 0) {
    context.document.showMessage('请先选择物体😶');
    return;
  }
  const objectOne = objects[0].frame();
  const objectTwo = objects[1].frame();

  const oneMid = objectOne.mid();
  const twoMid = objectTwo.mid();


  objectTwo.setMid(oneMid);
  objectOne.setMid(twoMid);
};
