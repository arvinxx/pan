/**
 * 生成 table
 */
import { TableModelType } from 'typings/data/table';
import generateComponentLayer from '../modules/antd';

export const generateTable = (table: TableModelType): boolean => {
  const doc = context.document;
  try {
    const { columns, config, dataSource } = table;

    // Step 1: 寻找选中的图层
    const selections = doc
      .documentData()
      .selectedLayers()
      .layers();

    if (selections.length > 1) {
      throw Error('Please do not select multiple layers at the same time');
    }

    // 默认添加到当前画板或 page 下
    let parentLayer = doc.currentPage().currentArtboard() || doc.currentPage();
    const currentPage = doc.currentPage();

    if (selections.length === 1) {
      const selectionClass = `${selections.firstObject().class()}`;
      const parentGroup = selections.firstObject().parentGroup();
      const parentClass = `${parentGroup && parentGroup.class()}`;
      /**
       * 仅有以下图层类可以添加子图层组
       */
      if (
        selectionClass === 'MSLayerGroup' ||
        selectionClass === 'MSArtboardGroup' ||
        selectionClass === 'MSSymbolMaster'
      ) {
        parentLayer = selections.firstObject();
      } else if (
        parentClass === 'MSLayerGroup' ||
        parentClass === 'MSArtboardGroup' ||
        parentClass === 'MSSymbolMaster'
      ) {
        parentLayer = parentGroup;
      }
    }

    // Step 2: 创建图层组
    let layer;

    layer = generateComponentLayer({
      ...config,
      dataSource,
      columns,
    });

    if (!layer || !layer.select_byExtendingSelection) {
      throw Error('Layer generation failed! Please try again');
    }

    if (!parentLayer.addLayers) {
      doc.showMessage('不支持在此节点中插入图层');
      return false;
    }

    // Step 3: 插入~~~ 啊啊啊啊啊啊啊

    if (parentLayer === currentPage) {
      const layerBounds = layer.optimalBoundingBox();

      let contentDrawView = doc.contentDrawView();

      const middle = contentDrawView.centerForScalingInAbsoluteCoordinates();
      const frameX = parseInt(
        String(middle.x - layerBounds.size.width / 2),
        10
      );
      const frameY = parseInt(
        String(middle.y - layerBounds.size.height / 2),
        10
      );

      layer.parent = parentLayer;
      layer.frame().x = frameX;
      layer.frame().y = frameY;
    }

    parentLayer.addLayers([layer]);
    doc.setCurrentPage(currentPage);

    // Step 4: 选中生成的图层并居中
    layer.select_byExtendingSelection(true, false);

    if (
      doc &&
      doc.currentContentViewController &&
      doc.currentContentViewController() &&
      doc.currentContentViewController().contentDrawView
    ) {
      doc
        .currentContentViewController()
        .contentDrawView()
        .centerRect(layer.absoluteRect().rect());
    }

    doc.showMessage('图层生成成功!');

    if (!selections.length) {
      doc.showMessage('The generated layer has been added to current page');
    }
    return true;
  } catch (e) {
    doc.showMessage(e);
  }
};
