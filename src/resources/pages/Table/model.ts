import { DvaModel, Reducer, Effect } from '@/models/connect';
import { TableModelType } from 'typings/data/table';
import update from 'immutability-helper';

import transformTableProps from '@/pages/Table/components/Table/transformTableProps';

export interface TableModelState extends TableModelType {
  activeHeader: string;
  activeCells: string[];
  focusedCellKey: string;
  activeTabKey: string;
  codeComment: {
    // 表格注释
    table: boolean;
    // 列注释
    columns: boolean;
    // 代码源
    dataSource: boolean;
  };
  tableWidth: 'auto' | 'fixed';
}
export interface TableModelStore extends DvaModel<TableModelState> {
  namespace: 'table';
  state: TableModelState;
  effects: {};
  reducers: {
    save: Reducer<TableModelState>;
    saveConfig: Reducer<TableModelState>;
    switchCodeComment: Reducer<TableModelState>;
    handleHeaderText: Reducer<TableModelState>;
    handleColumnConfig: Reducer<TableModelState>;
    addActiveCells: Reducer<TableModelState>;
    removeActiveCells: Reducer<TableModelState>;
  };
}

// 生成初始化表格数据
const { dataSource, columns } = transformTableProps();

const TableModel: TableModelStore = {
  namespace: 'table',
  state: {
    activeTabKey: 'table',
    activeCells: [],
    activeHeader: '',
    focusedCellKey: '',
    columns: [
      {
        title: 'Header 1',
        dataIndex: 'Header 1',
        key: 'Header 1',
        width: 120,
        style: {},
        align: 'left',
      },
      {
        title: 'Header 2',
        dataIndex: 'Header 2',
        key: 'Header 2',
        width: 120,
        style: {},
        align: 'left',
      },
      {
        title: 'Header 3',
        dataIndex: 'Header 3',
        key: 'Header 3',
        width: 120,
        style: {},
        align: 'left',
      },
      {
        title: 'Header 4',
        dataIndex: 'Header 4',
        key: 'Header 4',
        width: 120,
        style: {},
        align: 'left',
      },
      {
        title: 'Header 5',
        dataIndex: 'Header 5',
        key: 'Header 5',
        width: 120,
        style: {},
        align: 'left',
      },
    ],
    dataSource,
    config: {
      title: false,
      titleText: '表格标题',
      footerText: '表格页脚',
      footer: false,
      checkable: false,
      bordered: false,
      expandable: false,
      loading: false,
      showHeader: true,
      size: 'large',
      widthValue: 600,
      hasData: true,
    },
    tableWidth: 'auto',
    codeComment: {
      table: true,
      columns: true,
      dataSource: true,
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
    switchCodeComment(state, { payload }) {
      return { ...state, codeComment: { ...state.codeComment, ...payload } };
    },
    handleHeaderText(state, { payload }) {
      const index = state.columns.findIndex(
        (col) => col.dataIndex === payload.dataIndex
      );
      return {
        ...state,
        columns: update(state.columns, {
          [index]: {
            title: {
              $set: payload.text,
            },
          },
        }),
      };
    },
    handleColumnConfig(state, { payload }) {
      const index = state.columns.findIndex(
        (col) => col.dataIndex === payload.dataIndex
      );
      const { field, value } = payload;
      return {
        ...state,
        columns: update(state.columns, {
          [index]: {
            [field]: { $set: value },
          },
        }),
      };
    },
    addActiveCells(state, { payload }) {
      if (state.activeCells.includes(payload.key)) {
        return state;
      }
      return {
        ...state,
        activeCells: update(state.activeCells, { $push: [payload.key] }),
      };
    },
    removeActiveCells(state, { payload }) {
      return {
        ...state,
        activeCells: state.activeCells.filter((cell) => cell !== payload.key),
      };
    },
  },
};
export default TableModel;
