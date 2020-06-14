import { DvaModel, Reducer, Effect } from '@/models/connect';
import { TableModelType } from 'typings/table';
import update from 'immutability-helper';

import transformTableProps from '@/pages/table/components/Table/transformTableProps';

export interface TableModelState extends TableModelType {
  activeHeaders: string[];
  activeCells: string[];
}
export interface TableModelStore extends DvaModel<TableModelState> {
  namespace: 'table';
  state: TableModelState;
  effects: {};
  reducers: {
    save: Reducer<TableModelState>;
    saveConfig: Reducer<TableModelState>;
    handleHeaderText: Reducer<TableModelState>;
    handleActiveHeaders: Reducer<TableModelState>;
    addActiveCells: Reducer<TableModelState>;
  };
}

// 生成初始化表格数据
const { dataSource, columns } = transformTableProps();

const TableModel: TableModelStore = {
  namespace: 'table',
  state: {
    titleText: '表格标题',
    footerText: '表格页脚',
    activeCells: [],
    activeHeaders: [],
    columns: [
      {
        title: 'Header 1',
        dataIndex: 'Header 1',
        key: 'Header 1',
        width: 120,
        style: {},
      },
      {
        title: 'Header 2',
        dataIndex: 'Header 2',
        key: 'Header 2',
        width: 120,
        style: {},
      },
      {
        title: 'Header 3',
        dataIndex: 'Header 3',
        key: 'Header 3',
        width: 120,
        style: {},
      },
      {
        title: 'Header 4',
        dataIndex: 'Header 4',
        key: 'Header 4',
        width: 120,
        style: {},
      },
      {
        title: 'Header 5',
        dataIndex: 'Header 5',
        key: 'Header 5',
        width: 120,
        style: {},
      },
    ],
    dataSource,
    config: {
      title: false,
      footer: false,
      checkable: false,
      bordered: false,
      expandable: false,
      loading: false,
      showHeader: true,
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
    handleActiveHeaders(state, { payload }) {
      const activeHeaders = state.activeHeaders;

      if (activeHeaders.includes(payload.key)) {
        return {
          ...state,
          activeHeaders: activeHeaders.filter((key) => key !== payload.key),
        };
      }
      return {
        ...state,
        activeHeaders: update(activeHeaders, { $push: [payload.key] }),
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
  },
};
export default TableModel;
