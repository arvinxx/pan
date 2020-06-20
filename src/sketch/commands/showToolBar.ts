import { winIdentifier } from '@/sketch/windows';

/**
 * Sketch 窗口标识符
 */
const viewIdentifier = {
  CANVAS: 'view_canvas',
};

/**
 * insertSidePanel 插入侧边栏
 * @param {*} toolbar
 * @param {*} identifier 窗口 id
 * @param {*} isInsert
 */
const toggleSidePanel = (toolbar, identifier: string, isInsert = false) => {
  // documentWindow 对应 NSWindow 相当于整个 App 的进程
  // contentView 是 App 下的 N 个窗口
  const contentView = context.document.documentWindow().contentView();

  // 最顶层的窗口对象
  const stageView = contentView.subviews().objectAtIndex(0);

  let views = stageView.subviews();

  // 判断是否有已经存在的窗口 id
  const isExistId =
    isInsert ||
    views.findIndex(
      (view: NSView) => String(view.identifier()) === identifier
    ) > -1;

  let isShow = false;

  // 无法使用 array 的场景方法处理,所以使用循环
  const finalViews: any = [];
  views.forEach((view) => {
    if (isExistId) {
      // 过滤已存在对象
      if (String(view.identifier()) !== identifier) finalViews.push(view);
    } else {
      finalViews.push(view);
      // 插入在 Canvas 对象后面
      if (String(view.identifier()) === viewIdentifier.CANVAS) {
        finalViews.push(toolbar);
        isShow = true;
      }
    }
  });
  stageView.setSubviews(finalViews);
  // stageView.adjustSubviews();

  context.document.showMessage(`${isShow ? '️显示' : '隐藏'} Toolbar⚙️`);
};
/**
 * 输出插件基本信息
 */
export default () => {
  // 持久化这个脚本
  // COScript.currentCOScript().setShouldKeepAround(true);

  const threadDictionary = NSThread.mainThread().threadDictionary();

  const toolbar = NSStackView.alloc().initWithFrame<NSStackView>(
    NSMakeRect(0, 0, 40, 0)
  );
  toolbar.setIdentifier(winIdentifier.TOOLBAR);
  toolbar.setBackgroundColor(NSColor.windowBackgroundColor());

  // toolbar.setFlipped(true);
  // toolbar.orientation = 0;

  // TODO: threadDictionary 用来干什么?
  threadDictionary[winIdentifier.TOOLBAR] = toolbar;

  toggleSidePanel(toolbar, winIdentifier.TOOLBAR);
};
