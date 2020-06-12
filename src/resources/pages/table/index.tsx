import React, { FC, useCallback, useState } from 'react';
import { message } from 'antd';
import { ErrorBoundary, Footer } from '@/components';
import { event as emitter, uuid } from '@/utils';
import transformTableProps from './common/transformTableProps';
import Handsontable from 'handsontable';

import useUndo from '@/hooks/useUndo';
import TableConfigPane from './components/TableConfigPane';

import styles from './style.less';
import { TableConfig } from '@/pages/table/data';
import { sendMsg } from '@/services';
import { HotTable } from '@handsontable/react';

declare global {
  interface Window {
    hotTableInstance: Handsontable;
  }
}

const TablePage: FC = () => {
  const [state, setState] = useState({
    tableHistory: [],
  });
  const [loading, setLoading] = useState(false);
  const [config, handleConfig] = useState<TableConfig | undefined>();
  console.log(config);
  // componentDidMount() {
  //   // 声明一个自定义事件
  //   // 在组件装载完成以后
  //   // 至于这里的整体结构为什么要用 事件 ？
  //   // 因为虽然打破了 react 单项流的原则，但是直达，在当前场景下可以提高编码速度
  //   emitter.addListener('complete', this.onComplete);
  //   emitter.addListener('error', this.onError);
  //   emitter.addListener('syncGenerateHistory', this.updateGenerateHistory);
  // }
  //
  // // 组件销毁前移除事件监听
  // componentWillUnmount() {
  //   emitter.removeListener('complete', this.onComplete);
  //   emitter.removeListener('error', this.onError);
  //   emitter.removeListener('syncGenerateHistory', this.updateGenerateHistory);
  // }
  //
  // updateGenerateHistory = (generateHistory) => {
  //   this.setState({
  //     tableHistory: generateHistory,
  //   });
  // };
  //
  // onComplete = () => {
  //   this.setState({
  //     loading: false,
  //   });
  // };

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

  const handleChange = useCallback(
    (c) => {
      setConfig(c);
    },
    [setConfig]
  );

  const onChange = (config: TableConfig) => {
    handleConfig(config);
  };

  const onGenerate = (config: TableConfig) => {
    let generateConfig = config;

    if (!config.componentData || !config.dataForHandsontable) {
      const dataForHandsontable = window.hotTableInstance.getData();
      const componentData = transformTableProps();
      generateConfig = {
        ...config,
        dataForHandsontable,
        componentData,
      };
    }

    setLoading(true);
    handleConfig(generateConfig);

    // 通知 Sketch 生成表格
    sendMsg('TABLE_GENERATE', [
      {
        config: generateConfig,
      },
    ]);
  };

  const handleGenerate = useCallback(() => {
    onGenerate(present);
  }, [onGenerate, present]);

  const onApplyHistory = (storedConfig: TableConfig) => {
    const newConfig = { ...storedConfig, id: uuid() };
    handleConfig(newConfig);
  };

  const onClearHistory = (type: string) => {
    sendMsg('TABLE_CLEAR_HISTORY', type);
  };

  const { tableHistory } = state;

  return (
    <ErrorBoundary onRetry={onRetry}>
      <div className={styles.table}>
        <TableConfigPane config={present} onChange={handleChange} />
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
