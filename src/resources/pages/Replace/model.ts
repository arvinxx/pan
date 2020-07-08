import { DvaModel, Reducer, Effect } from '@/models/connect';

export interface ReplaceModelState extends ReplaceModel {}
export interface ReplaceModelStore extends DvaModel<ReplaceModelState> {
  state: ReplaceModelState;
  effects: {};
  reducers: {
    save: Reducer<ReplaceModelState>;
  };
}

const ReplaceModel: ReplaceModelStore = {
  namespace: 'replace',
  state: {
    findString: '',
    replaceString: '',
    document: false,
    regexActive: false,
    caseSensitive: false,
    wholeWord: false,
    count: 0,
  },
  effects: {},
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default ReplaceModel;
