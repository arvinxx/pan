import { EffectsCommandMap, Subscription, AnyAction } from 'dva';

import { TableModelState } from '@/pages/table/model';

export { TableModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean };
  models: {
    table: boolean;
  };
}

export interface ConnectState {
  table: TableModelState;
  loading: Loading;
  router: { location: Location };
}

export { EffectsCommandMap, Subscription };

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S,
  action: A
) => S;

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & {
    select: <T>(func: (state: ConnectState) => T) => T;
  }
) => void;

export type Action<P = any, C = (payload: P) => void> = {
  type: string;
  payload?: P;
  callback?: C;
  meta?: {
    mixpanel?: any;
  };
  [key: string]: any;
};

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export interface DispatchProps {
  dispatch: Dispatch;
}

export interface DvaModel<S> {
  namespace?: string;
  state: S;
  reducers: {
    save: Reducer<S>;
  };
  effects?: { [key: string]: Effect };
  subscriptions?: { [key: string]: Subscription };
}
