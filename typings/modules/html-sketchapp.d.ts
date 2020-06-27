declare module '@brainly/html-sketchapp' {
  import FileFormat from '@sketch-hq/sketch-file-format-ts';

  interface Options {
    addArtboard: boolean;
    artboardName: string;
  }
  /**
   * 将 html 导出为 Sketch Page 元素
   * @param {HTMLElement} node html 节点
   * @param {Options} options 参数
   * @return {FileFormat.Page} 返回 Sketch 的 Page 页面
   */

  export const nodeTreeToSketchPage: (
    node: HTMLElement,
    options?: Options
  ) => FileFormat.Page;
  export const nodeToSketchLayers: (
    node: HTMLElement,
    options?: Options
  ) => FileFormat.AnyLayer[];

  export const nodeTreeToSketchGroup: (
    node: HTMLElement,
    options?: Options
  ) => FileFormat.Group;
}
