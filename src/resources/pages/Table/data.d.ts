import { SizeType } from 'antd/lib/config-provider/SizeContext';

export interface TableConfig {
  bordered: boolean;
  checkable: boolean;
  expandable: boolean;
  footer: boolean;
  size: SizeType;
  title: boolean;
  widthValue: number;
}
