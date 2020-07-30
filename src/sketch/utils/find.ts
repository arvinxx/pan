import { AllLayers } from 'sketch/dom';
/**
 * 是否是Shape
 * @param layer
 */

export const isShapeLayer = (layer: AllLayers) =>
  layer.type === 'Shape' || layer.type === 'ShapePath';
