import { SizeType } from 'antd/lib/config-provider/SizeContext';

export interface TableConfig {
  bordered: boolean;
  checkable: boolean;
  expandable: boolean;
  footer: boolean;
  size: SizeType;
  title: boolean;
  widthValue: number;
  /**
   * 加载中
   */
  loading: boolean;
  /**
   * 是否显示 header
   */
  showHeader: boolean;
}

export interface TableModelType {
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
  /**
   * 标题
   */
  titleText: string;
  /**
   * 页脚
   */
  footerText: string;
}
