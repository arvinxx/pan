import React, { FC, useCallback, useState } from 'react';
import { ErrorBoundary, Footer } from '@/components';
import { uuid } from '@/utils';
import Handsontable from 'handsontable';
import { useSelector, useDispatch } from 'dva';

import useUndo from '@/hooks/useUndo';

import styles from './style.less';
import { TableConfig } from '@/pages/table/data';
import { sendMsg } from '@/services';
import { ConnectState, Loading, TableModelState } from '@/models/connect';
import DataArea from '@/pages/table/components/DataArea';
import Config from '@/pages/table/components/Config';

declare global {
  interface Window {
    hotTableInstance: Handsontable;
  }
}

const TablePage: FC = () => {
  const dispatch = useDispatch();
  const table = useSelector<ConnectState, TableModelState>(
    (state) => state.table
  );
  const { config } = table;

  const loading = useSelector<ConnectState, boolean>(
    (state) => state.loading.models.table
  );

  const [state, setState] = useState({
    tableHistory: [],
  });

  const onRetry = () => {
    window.location.reload();
  };

  const {
    set: setConfig,
    reset: resetConfig,
    undo,
    redo,
    canUndo,
    canRedo,
    present,
  } = useUndo(config, 50);

  const handleGenerate = () => {
    // 通知 Sketch 生成表格
    sendMsg('TABLE_GENERATE', table);
  };

  const onApplyHistory = (storedConfig: TableConfig) => {
    const newConfig = { ...storedConfig, id: uuid() };
    // handleConfig(newConfig);
  };

  const onClearHistory = (type: string) => {
    sendMsg('TABLE_CLEAR_HISTORY', type);
  };

  const { tableHistory } = state;

  return (
    <ErrorBoundary onRetry={onRetry}>
      <div className={styles.container}>
        <div className={styles.main}>
          <DataArea />
        </div>
        <div className={styles.side}>
          <Config />
        </div>
      </div>
      <Footer
        config={config}
        onApplyHistory={onApplyHistory}
        onClearHistory={onClearHistory}
        canRedo={canRedo}
        canUndo={canUndo}
        redo={redo}
        undo={undo}
        resetConfig={resetConfig}
        handleGenerate={handleGenerate}
        history={tableHistory}
      />
    </ErrorBoundary>
  );
};

export default TablePage;
