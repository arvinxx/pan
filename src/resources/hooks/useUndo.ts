/**
 * 使用了数组的length来简化操作，因此stack一直是在引用上做修改，在外部如果要使用stack的话要注意
 */
import { useReducer, useCallback, useEffect } from 'react';
import { TableConfig } from '@/pages/table/data';

const UNDO = 'UNDO';
const REDO = 'REDO';
const SET = 'SET';
const RESET = 'RESET';

export interface Action {
  type: 'UNDO' | 'REDO' | 'SET' | 'RESET';
  item?: any;
  callback?: Function;
  origin?: TableConfig;
}

export interface HistoryState {
  limit: number;
  present: number;
  stack: TableConfig[];
}

const initialState: HistoryState = {
  limit: 100,
  stack: [],
  present: -1,
};

const reducer = (state: HistoryState, action: Action): HistoryState => {
  const { stack, present, limit } = state;
  console.log(state, action);
  switch (action.type) {
    // 撤销
    case UNDO:
      if (action.callback) {
        action.callback(stack[present - 1]);
      }
      return {
        stack,
        present: present - 1,
        limit,
      };

    // 重做
    case REDO:
      if (action.callback) {
        action.callback(stack[present + 1]);
      }
      return {
        stack,
        present: present + 1,
        limit,
      };

    // 设置
    case SET:
      const { item } = action;

      if (item === stack[present]) {
        return state;
      }

      if (state.present < state.stack.length - 1) {
        // 调整stack长度
        stack.length = present + 1;
      }
      stack.push(item);
      let newPresent = present + 1;

      // 限制stack长度
      if (stack.length > limit) {
        const exceed = stack.length - limit;

        if (exceed === 1) {
          stack.shift();
        } else {
          stack.splice(0, exceed);
        }

        newPresent -= exceed;
      }

      return {
        stack,
        present: newPresent,
        limit,
      };

    // 重置
    case RESET:
      return <HistoryState>{
        stack: [action.origin],
        present: 0,
        limit,
      };

    default:
      return state;
  }
};

const useUndo = (
  initial: TableConfig | undefined,
  limit: number,
  board?: any
): {
  /**
   * 设置
   */
  set: any;
  /**
   * 重置
   */
  reset: any;
  /**
   * 撤销
   */
  undo: any;
  /**
   * 重做
   */
  redo: any;
  canUndo: any;
  canRedo: any;
  present: TableConfig;
} => {
  let definedState = {};
  if (initial !== undefined) {
    definedState = {
      stack: [initial],
      present: 0,
    };
  }
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...definedState,
    limit,
  });

  useEffect(() => {
    dispatch({ type: RESET, origin: initial });
  }, [initial]);

  const canUndo = state.present >= 1;
  const canRedo = state.present < state.stack.length - 1;
  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: UNDO, callback: board.current.reset });
    }
  }, [canUndo, dispatch]);
  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: REDO, callback: board.current.reset });
    }
  }, [canRedo, dispatch]);
  const set = useCallback((item) => dispatch({ type: SET, item }), [dispatch]);
  const reset = useCallback(
    (origin) => {
      dispatch({ type: RESET, origin });
      board.current.reset(origin);
    },
    [dispatch]
  );

  const present = state.stack[state.present];
  return { set, reset, undo, redo, canUndo, canRedo, present };
};

export default useUndo;
