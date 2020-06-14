import { Table } from 'antd';

import { DvaModel, Reducer, Effect } from '@/models/connect';
import { TableConfig } from './data';
import transformTableProps from '@/pages/table/components/Table/transformTableProps';

export interface TableModelState {
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

export interface TableModelStore extends DvaModel<TableModelState> {
  namespace: 'table';
  state: TableModelState;
  effects: {};
  reducers: {
    save: Reducer<TableModelState>;
    saveConfig: Reducer<TableModelState>;
  };
}

// 生成初始化表格数据
const { dataSource, columns } = transformTableProps();

const TableModel: TableModelStore = {
  namespace: 'table',
  state: {
    columns,
    dataSource,
    config: {
      title: false,
      footer: false,
      checkable: false,
      bordered: false,
      expandable: false,
      size: 'large',
      widthValue: 600,
    },
  },
  effects: {},
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveConfig(state, { payload }) {
      return { ...state, config: { ...state.config, ...payload } };
    },
  },
};
export default TableModel;
