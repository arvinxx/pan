import Base, { BaseInitParams } from './base';
import { RESIZING_CONSTRAINTS } from '../helpers/utils';

interface TextInitParams extends BaseInitParams {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  style: any;
  multiline: boolean;
}
class Text extends Base {
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;
  private _text: string;
  private _multiline: boolean;

  constructor({
    x,
    y,
    width,
    height,
    text,
    style,
    multiline,
    id,
  }: TextInitParams) {
    super({ id });
    this._class = 'text';
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._text = text;
    this._name = text;
    this._style = style;
    this._multiline = multiline;
    this.setResizingConstraint(RESIZING_CONSTRAINTS.HEIGHT);
  }

  toJSON() {
    const obj = super.toJSON();

    obj.frame = {
      _class: 'rect',
      constrainProportions: false,
      height: this._height,
      width: this._width,
      x: this._x,
      y: this._y,
    };

    obj.text = this._text;
    obj.style = this._style.toJSON();

    // text nodes don't have child layers
    delete obj.layers;

    obj.automaticallyDrawOnUnderlyingPath = false;
    obj.dontSynchroniseWithSymbol = false;
    obj.lineSpacingBehaviour = 2;
    // 1 - width is set to Fixed
    // 0 - width is set to Auto - this helps us avoid issues with browser setting too small width causing line to break
    obj.textBehaviour = this._multiline ? 1 : 0;

    return obj;
  }
}

export default Text;
