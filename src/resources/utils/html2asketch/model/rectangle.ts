import Base, { BaseInitParams } from './base';

interface RectangleInitArgs extends BaseInitParams {
  width: number;
  height: number;
  cornerRadius?: any;
}
class Rectangle extends Base {
  private _width: number;
  private _height: number;
  private _cornerRadius: any | undefined;
  private _x: number = 0;
  private _y: number = 0;

  constructor({
    x,
    y,
    width,
    height,
    cornerRadius = { topLeft: 0, bottomLeft: 0, topRight: 0, bottomRight: 0 },
    id,
  }: RectangleInitArgs) {
    super({ id });
    this._class = 'rectangle';
    this._width = width;
    this._height = height;
    this._cornerRadius = cornerRadius;
    this.setPosition({ x, y });
  }

  setPosition({ x, y }) {
    this._x = x;
    this._y = y;
  }
  toJSON() {
    const obj = super.toJSON();

    console.log(obj);
    obj.frame = {
      _class: 'rect',
      constrainProportions: false,
      height: this._height,
      width: this._width,
      x: this._x,
      y: this._y,
    };
    console.log(obj);

    obj.path = {
      _class: 'path',
      isClosed: true,
      pointRadiusBehaviour: 1,
      points: [
        {
          _class: 'curvePoint',
          cornerRadius: this._cornerRadius.topLeft,
          curveFrom: '{0, 0}',
          curveMode: 1,
          curveTo: '{0, 0}',
          hasCurveFrom: false,
          hasCurveTo: false,
          point: '{0, 0}',
        },
        {
          _class: 'curvePoint',
          cornerRadius: this._cornerRadius.topRight,
          curveFrom: '{1, 0}',
          curveMode: 1,
          curveTo: '{1, 0}',
          hasCurveFrom: false,
          hasCurveTo: false,
          point: '{1, 0}',
        },
        {
          _class: 'curvePoint',
          cornerRadius: this._cornerRadius.bottomRight,
          curveFrom: '{1, 1}',
          curveMode: 1,
          curveTo: '{1, 1}',
          hasCurveFrom: false,
          hasCurveTo: false,
          point: '{1, 1}',
        },
        {
          _class: 'curvePoint',
          cornerRadius: this._cornerRadius.bottomLeft,
          curveFrom: '{0, 1}',
          curveMode: 1,
          curveTo: '{0, 1}',
          hasCurveFrom: false,
          hasCurveTo: false,
          point: '{0, 1}',
        },
      ],
    };

    obj.hasConvertedToNewRoundCorners = true;
    obj.fixedRadius = 0;
    obj.edited = false;
    obj.booleanOperation = -1;

    return obj;
  }
}

export default Rectangle;
