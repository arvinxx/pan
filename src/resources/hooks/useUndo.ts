/**
 * 使用了数组的length来简化操作，因此stack一直是在引用上做修改，在外部如果要使用stack的话要注意
 */
import { useReducer, useCallback, useEffect } from 'react';

const UNDO = 'UNDO';
const REDO = 'REDO';
const SET = 'SET';
const RESET = 'RESET';

const initialState = {
  limit: 100,
  stack: [],
  present: -1,
};

const reducer = (state, action) => {
  const { stack, present, limit } = state;

  switch (action.type) {
    case UNDO: {
      if (action.callback) {
        action.callback(stack[present - 1]);
      }
      return {
        stack,
        present: present - 1,
        limit,
      };
    }

    case REDO: {
      if (action.callback) {
        action.callback(stack[present + 1]);
      }
      return {
        stack,
        present: present + 1,
        limit,
      };
    }

    case SET: {
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
    }

    case RESET: {
      return {
        stack: [action.origin],
        present: 0,
        limit,
      };
    }

    default:
      return state;
  }
};

const useUndo = (initial, limit, board) => {
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
  const set = useCallback(item => dispatch({ type: SET, item }), [dispatch]);
  const reset = useCallback(
    origin => {
      dispatch({ type: RESET, origin });
      board.current.reset(origin);
    },
    [dispatch],
  );

  const present = state.stack[state.present];
  return { set, reset, undo, redo, canUndo, canRedo, present };
};

export default useUndo;
