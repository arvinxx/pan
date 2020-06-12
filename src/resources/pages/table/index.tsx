import React from 'react';
import { message } from 'antd';
import emitter from '../common/event';
import ErrorBoundary from '../common/ErrorBoundary';
import transformTableProps from '../common/transformTableProps';

import Table from './components/Table';
import uuid from '../utils/uuid';

import pluginCall from '../sketchCall';
import yo from '../yo';
import '../webCall';
import './index.less';

window.pluginCall = pluginCall;
window.Kitchen = {};
window.Kitchen.AntD = {};
const exportSVG = window.ChartShaper.exporter.exportSvgCode;
const LangMap = {
  en_us: 'en-US',
  zh_cn: 'zh-CN',
};

class DPL extends React.PureComponent {
  state = {
    router: 'guide',
    loading: false,
    config: null,
    tableHistory: [],
  };

  componentDidMount() {
    // 声明一个自定义事件
    // 在组件装载完成以后
    // 至于这里的整体结构为什么要用 事件 ？
    // 因为虽然打破了 react 单项流的原则，但是直达，在当前场景下可以提高编码速度
    emitter.addListener('complete', this.onComplete);
    emitter.addListener('error', this.onError);
    emitter.addListener('syncGenerateHistory', this.updateGenerateHistory);
  }

  // 组件销毁前移除事件监听
  componentWillUnmount() {
    emitter.removeListener('complete', this.onComplete);
    emitter.removeListener('error', this.onError);
    emitter.removeListener('syncGenerateHistory', this.updateGenerateHistory);
  }

  updateGenerateHistory = (type, generateHistory) => {
    const historyField = type === 'CHART' ? 'chartHistory' : 'tableHistory';
    this.setState({
      [historyField]: generateHistory,
    });
  };

  onComplete = () => {
    this.setState({
      loading: false,
    });
  };

  onError = (msg) => {
    message.error(`${window.ks_i18n['An error occurred, info:']}${msg}`);
    this.setState({
      loading: false,
    });
  };

  onReset = () => {
    const { config } = this.state;
    this.setState({
      config: {
        category: config.category,
        id: config.id,
      },
    });
  };

  onBack = () => {
    this.setState({
      router: 'guide',
      config: null,
    });
  };

  onChange = (config) => {
    this.setState({ config });
  };

  onRetry = () => {
    window.location.reload();
  };

  onSelectChartType = (type) => {
    const { trackData } = this.props;
    const config = {
      id: uuid(),
      ...window.ChartShaper.getDemoConfigById(type),
    };
    this.setState({
      router: 'chart',
      config,
    });
    if (window.Tracert) {
      window.Tracert.click('chartShaper.editChart', {
        UUID: trackData.cnzzUUID,
        type: config.configs.type,
      });
      window.EI_USE = 0;
      window.startTime = new Date();
    }
  };

  onInitTable = () => {
    const { trackData } = this.props;
    this.setState({
      router: 'table',
      config: { category: 'table' },
    });
    if (window.Tracert) {
      window.Tracert.click('chartShaper.editTable', {
        UUID: trackData.cnzzUUID,
        type: 'table',
      });
      window.EI_USE = 0;
      window.startTime = new Date();
    }
  };

  onGenerate = (config) => {
    const { trackData } = this.props;
    const { track } = this.context;
    let generateConfig = config;
    track({
      action: `生成组件-${
        config.category ? config.category : config.configs.type
      }`,
    });
    if (window.Tracert) {
      window.Tracert.click('chartShaper.generate', {
        UUID: trackData.cnzzUUID,
        type: config.category ? config.category : config.configs.type,
        duration: new Date() - window.startTime,
        EI_USE: window.EI_USE,
      });
    }

    if (
      config.category === 'table' &&
      (!config.componentData || !config.dataForHandsontable)
    ) {
      const dataForHandsontable = window.hotTableInstance.getData();
      const componentData = transformTableProps();
      generateConfig = {
        ...config,
        dataForHandsontable,
        componentData,
      };
    }

    this.setState({
      loading: true,
      config: generateConfig,
    });

    if (config.category === 'table') {
      // 通知 Sketch 生成表格
      pluginCall('generate', [
        {
          config: generateConfig,
        },
      ]);
    }
  };

  onApplyHistory = (storedConfig) => {
    const { trackData } = this.props;
    const newConfig = { ...storedConfig, id: uuid() };
    this.setState({ config: newConfig });
    if (window.Tracert) {
      window.Tracert.click('chartShaper.history', {
        UUID: trackData.cnzzUUID,
        type: storedConfig.category
          ? storedConfig.category
          : storedConfig.configs.type,
      });
      window.EI_USE = 0;
      window.startTime = new Date();
    }
  };

  onClearHistory = (type) => {
    pluginCall('clearGenerateHistory', [type]);
  };

  renderPage() {
    const { config, loading, tableHistory } = this.state;

    return (
      <Table
        config={config}
        onChange={this.onChange}
        loading={loading}
        onReset={this.onReset}
        onBack={this.onBack}
        onGenerate={this.onGenerate}
        history={tableHistory}
        onApplyHistory={this.onApplyHistory}
        onClearHistory={this.onClearHistory}
      />
    );
  }

  render() {
    return (
      <ErrorBoundary onRetry={this.onRetry}>{this.renderPage()}</ErrorBoundary>
    );
  }
}
