import { SizeType } from 'antd/lib/config-provider/SizeContext';

export interface TableConfig {
  bordered: boolean;
  checkable: boolean;
  expandable: boolean;
  footer: boolean;
  /**
   * 大小
   **/
  size: SizeType;
  title: boolean;
  /**
   * 标题
   */
  titleText: string;
  /**
   * 页脚
   */
  footerText: string;

  widthValue: string;
  /**
   * 加载中
   */
  loading: boolean;
  /**
   * 是否显示 header
   */
  showHeader: boolean;
  /**
   * 是否显示数据
   **/
  hasData: boolean;
}

export interface TableModelType {
  /**
   * 表格列头
   */
  columns: ColumnType[];
  /**
   * 数据源
   */
  dataSource: any[];
  /**
   * 表格控制选项
   */
  config: TableConfig;
}

export interface ColumnType {
  /**
   *
   **/
  title: string;

  dataIndex: string;
  key: string;
  /**
   * 表宽
   **/
  width: number;
  style?: any;
  align: 'left' | 'center' | 'right';
  ellipsis?: boolean;
}
