import { Artboard, Group, Slice, Text, SymbolMaster } from 'sketch/dom';
import { getInputFromUser, INPUT_TYPE, message } from 'sketch/ui';
import { documentContext } from '../utils';
import { getGlobalData, getLayerData, setLayerData } from '../store/settings';

/**
 * 生成画板预览
 */
export const artboardOverview = () => {
  const { page, selection: artboards } = documentContext();

  if (artboards.length === 0) {
    message('选区中没有画板😶');
    return;
  }
  page.layers.forEach((layer) => {
    const isDescription =
      getLayerData(layer, 'PAN_ARTBOARD_DESCRIPTION') === '1';
    if (isDescription) {
      layer.remove();
    }
  });

  let MinX;
  let MaxX;
  let MinY;
  let MaxY;
  let MaxYH;
  let MaxXW;

  const firstArtboard = artboards.layers[0];
  // 初始值全部赋为 artboards第一项的对应值
  MinX = MaxX = firstArtboard.frame.x;
  MinY = MaxY = firstArtboard.frame.y;
  MaxXW = firstArtboard.frame.width;
  MaxYH = firstArtboard.frame.height;
  // 获取最大宽高
  for (let i = 0; i < artboards.length; i++) {
    const artboard = artboards.layers[i];

    let x = artboard.frame.x;
    let y = artboard.frame.y;
    let w = artboard.frame.width;
    let h = artboard.frame.height;

    if (x < MinX) MinX = x;
    if (x > MaxX) MaxX = x;
    if (y < MinY) MinY = y;
    if (y > MaxY) MaxY = y;
    if (w > MaxXW) MaxXW = w;
    if (h > MaxYH) MaxYH = h;
  }

  const group = new Group();
  group.name = '📋 画板切片·文本组';
  group.locked = true;
  setLayerData(group, 'PAN_ARTBOARD_DESCRIPTION', '1');
  page.layers.push(group);

  // create 切片
  const height = MaxY + MaxYH - MinY + 200;
  const width = MaxX + MaxXW - MinX + 200;
  const slice = new Slice();
  slice.name = '📋 画板切片·' + page.name;
  const frame = slice.frame;
  frame.x = MinX - 100;
  frame.y = MinY - 100;
  frame.width = width;
  frame.height = height;
  page.layers.push(slice);

  setLayerData(slice, 'PAN_ARTBOARD_DESCRIPTION', '1');

  let fontSize = getGlobalData('PAN_ARTBOARD_DESCRIPTION_FONT_SIZE');
  if (!fontSize) {
    getInputFromUser(
      '生成画板描述',
      { description: '请输入字号大小', type: INPUT_TYPE.string },
      (err, text) => {
        if (err) {
          message('出错了😶');
        }
        fontSize = Number(text) || 16;
      }
    );
  }
  // create artboards title
  for (let i = 0; i < artboards.length; i++) {
    const artboard = artboards.layers[i];

    const title = new Text({
      text: artboard.name,
      name: artboard.name,
      style: {
        fontSize,
        fontFamily: 'PingFang SC',
        textColor: '#262626',
      },
    });
    title.style.borders = [];

    const titleFrame = title.frame;
    title.adjustToFit();
    titleFrame.x = artboard.frame.x;
    titleFrame.y = artboard.frame.y - title.frame.height - 10;
    group.layers.push(title);
    setLayerData(title, 'PAN_ARTBOARD_DESCRIPTION', '1');
  }
  group.adjustToFit();

  slice.moveToBack();
};

/**
 * 批量创建 Symbol
 **/
export const batchCreateSymbols = () => {
  const { document, selection } = documentContext();
  selection.forEach((layer) => {
    // 如果是画板,直接创建
    let artboard: Artboard;
    if (layer.type === 'Artboard') {
      artboard = layer;
    } else {
      artboard = new Artboard({
        name: layer.name,
        frame: layer.frame,
        layers: [layer],
        parent: document.selectedPage,
      });
      layer.frame.x = 0;
      layer.frame.y = 0;
    }
    SymbolMaster.fromArtboard(artboard);
  });
};
