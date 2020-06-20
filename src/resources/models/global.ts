import { DvaModel, Reducer, Effect } from '@/models/connect';

import update from 'immutability-helper';

import transformTableProps from '@/pages/table/components/Table/transformTableProps';

export interface GlobalModelState {
  sketch?: string;
  plugin: string;
}
export interface GlobalModelStore extends DvaModel<GlobalModelState> {
  state: GlobalModelState;
  effects: {};
  reducers: {
    save: Reducer<GlobalModelState>;
  };
}

// 生成初始化表格数据
const { dataSource, columns } = transformTableProps();

const GlobalModel: GlobalModelStore = {
  state: {
    plugin: '',
    sketch: '',
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
export default GlobalModel;
