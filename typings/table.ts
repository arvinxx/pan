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

export interface TableModel {
  /**
   * 表格列头
   */
  columns: any[];
  /**
   * 数据源
   */
  dataSource: any[];
  /**
   * 表格控制选项
   */
  config: TableConfig;
}
