import { useEffect, useCallback } from 'react';

const useHotKeysForUndo = (undoHandler: Function, redoHandler: Function) => {
  const handler = useCallback(
    (e) => {
      const Z = 90;
      if (e.keyCode === Z && e.metaKey && !e.shiftKey) {
        undoHandler();
      } else if (e.keyCode === Z && e.metaKey && e.shiftKey) {
        redoHandler();
      }
    },
    [undoHandler, redoHandler],
  );
  useEffect(() => {
    const canUseDOM = !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    );
    if (!canUseDOM) {
      console.error('Window is not defined');
      return null;
    }
    document.addEventListener('keydown', handler);

    return () => {
      window.document.removeEventListener('keydown', handler);
    };
  }, [undoHandler, redoHandler]);
};

export default useHotKeysForUndo;
