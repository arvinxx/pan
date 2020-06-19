import React, { FC, useCallback, useState } from 'react';
import { ErrorBoundary, Footer } from '@/components';
import { Collapse, Tabs, Tooltip } from 'antd';

import { uuid } from '@/utils';
import Handsontable from 'handsontable';
import { useSelector, useDispatch } from 'dva';
import useUndo from '@/hooks/useUndo';
import { TableConfig } from 'typings/table';
import { sendMsg } from '@/services';
import { ConnectState, Loading, TableModelState } from '@/models/connect';
import DataArea from './components/DataArea';
import ProCode from './components/ProCode';
import Config from './components/Config';

import styles from './style.less';
import Table from '@/pages/table/components/Table';
import ProTable from '@ant-design/pro-table';

declare global {
  interface Window {
    hotTableInstance: Handsontable;
  }
}

const { Panel } = Collapse;
const { TabPane } = Tabs;
const TablePage: FC = () => {
  const dispatch = useDispatch();
  const table = useSelector<ConnectState, TableModelState>(
    (state) => state.table
  );
  const { config, activeTabKey } = table;

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
        <div className={styles.left}>
          <Tabs
            className={styles.header}
            onChange={(activeTabKey) => {
              dispatch({ type: 'table/save', payload: { activeTabKey } });
            }}
            activeKey={activeTabKey}
          >
            <TabPane key={'table'} tab={'Table表格'} />
            <TabPane key={'pro-table'} tab={'ProTable 高级表格'} />

            <TabPane key={'form'} disabled tab={'Form 表单'} />
          </Tabs>
          <div className={styles.main}>
            <Collapse bordered defaultActiveKey={['preview', 'code']}>
              <Panel key={'preview'} header={'预览'}>
                <DataArea />
              </Panel>
              <Panel key={'code'} header={'代码'}>
                <ProCode />
              </Panel>
            </Collapse>
          </div>
        </div>
        <div className={styles.side}>
          <Config />
        </div>
      </div>
      <div className={styles.footer}>
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
      </div>
    </ErrorBoundary>
  );
};

export default TablePage;
