import { AllLayers, Page, Selection } from 'sketch/dom';
import { Document } from 'sketch';
/**
 * 是否是Shape
 * @param layer
 */

export const isShapeLayer = (layer: AllLayers) =>
  layer.type === 'Shape' || layer.type === 'ShapePath';

/**
 * 获取当前文档的相关上下文
 * @return {document , page , selection}
 */
export const documentContext = (): {
  document: Document;
  selection: Selection;
  page: Page;
} => {
  const document = Document.getSelectedDocument();

  const selection = document.selectedLayers;
  const page = document.selectedPage;
  return { document, selection, page };
};
