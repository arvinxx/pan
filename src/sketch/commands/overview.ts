const generateOverview = (context: SketchContext) => {
  let doc = context.document;
  const artboards = context.selection as NSArray<MSArtboardGroup>;
  const count = artboards.count();
  if (count <= 0) {
    context.document.showMessage('请选择至少一个画板😶');
    return;
  }

  let MinX;
  let MaxX;
  let MinY;
  let MaxY;
  let MaxYH;
  let MaxXW;

  // 初始值全部赋为 artboards 第一项的对应值
  MinX = MaxX = artboards[0].frame().x();
  MinY = MaxY = artboards[0].frame().y();
  MaxXW = artboards[0].frame().width();
  MaxYH = artboards[0].frame().height();

  // 获取最大边框宽度
  for (let i = 0; i < count; i++) {
    let x = artboards[i].frame().x();
    let y = artboards[i].frame().y();
    let w = artboards[i].frame().width();
    let h = artboards[i].frame().height();

    if (x < MinX) MinX = x;
    if (x > MaxX) MaxX = x;
    if (y < MinY) MinY = y;
    if (y > MaxY) MaxY = y;
    if (w > MaxXW) MaxXW = w;
    if (h > MaxYH) MaxYH = h;
  }
  // 创建切片
  let height = MaxY + MaxYH - MinY + 200;
  let width = MaxX + MaxXW - MinX + 200;

  const newSlice = MSSliceLayer.new();
  const newSliceName = doc.currentPage().name() + ' 总览';

  newSlice.setName(newSliceName);

  // 添加切片
  const frame = newSlice.frame();
  frame.setX(MinX - 100);
  frame.setY(MinY - 100);
  frame.setWidth(width);
  frame.setHeight(height);
  doc.currentPage().addLayer(newSlice);

  //创建画板标题
  for (let i = 0; i < artboards.count(); i++) {
    const artboard = artboards[i];
    // @ts-ignore
    let title = MSTextLayer.alloc().initWithFrame_(NSMakeRect(0, 0, 100, 100));
    // 设置字体大小
    title.setFontSize(20);

    const titleFrame = title.frame();
    title.setStringValue(artboard.name());
    title.setName(artboard.name());
    title.adjustFrameToFit();
    // 位置
    titleFrame.setX(artboard.frame().x());
    titleFrame.setY(artboard.frame().y() + artboard.frame().height() + 10);

    doc.currentPage().addLayer(title); // 添加画板标题
    MSLayerMovement.moveToBack([title]); // 挪到最后
  }
  // 切片挪到底部
  MSLayerMovement.moveToBack([newSlice]);
};

export default generateOverview;
