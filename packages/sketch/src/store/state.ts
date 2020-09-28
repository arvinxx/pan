export const stateKey = {
  //******** Sketch全局变量 *********//
  // Sketch 调整微调间距
  nudgeDistanceSmall: 'nudgeDistanceSmall',

  // 画板说明 字体大小
  PAN_ARTBOARD_DESCRIPTION_FONT_SIZE: 'PAN_ARTBOARD_DESCRIPTION_FONT_SIZE',

  // 画板说明图层
  PAN_ARTBOARD_DESCRIPTION: 'PAN_ARTBOARD_DESCRIPTION',
};

export type StateKeyType = keyof typeof stateKey;
