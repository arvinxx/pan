import React, { FC, useCallback, useState } from 'react';
import { ErrorBoundary, Footer } from '@/components';
import { Collapse, Tabs } from 'antd';
import { uuid } from '@/utils';
import { useSelector, useDispatch } from 'dva';
import useUndo from '@/hooks/useUndo';
import { TableConfig } from 'typings/data/table';
import { nodeTreeToSketchGroup } from '@/utils/html2asketch';

import { ConnectState, Loading, TableModelState } from '@/models/connect';
import DataArea from './components/DataArea';
import ProCode from './components/ProCode';
import Config from './components/Config';
import { generateTable, generateTableFromJSON } from './service';

import styles from './style.less';
import { sendRawMsgToEnd } from '@/bridge';

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
    const el = document.getElementById('x-table');

    if (el) {
      const group = nodeTreeToSketchGroup(el);
      console.log(group);
      sendRawMsgToEnd('TABLE_GENERATE_FROM_JSON', group);
    }
  };

  const onApplyHistory = (storedConfig: TableConfig) => {
    const newConfig = { ...storedConfig, id: uuid() };
    // handleConfig(newConfig);
  };

  const onClearHistory = (type: string) => {
    // sendMsg('TABLE_CLEAR_HISTORY', type);
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
