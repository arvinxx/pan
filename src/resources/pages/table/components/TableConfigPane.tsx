import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import ConfigArea from './areas/ConfigArea';
import PreviewArea from './areas/PreviewArea';
import DataArea from './areas/DataArea';
import AntD from './antd';
import transformTableProps from '../common/transformTableProps';

export default class TableConfigPane extends React.PureComponent {
  state = {
    preview: false,
  };

  getTableProps() {
    const { config } = this.props;

    return {
      ...config.config,
      ...config.componentData,
    };
  }

  onTableConfigChange = (tableConfig) => {
    const { onChange, config } = this.props;
    onChange({
      ...config,
      config: tableConfig,
    });
  };

  onDataChange = () => {
    const { onChange, config } = this.props;
    const dataForHandsontable = cloneDeep(window.hotTableInstance.getData());
    const componentData = transformTableProps();
    onChange({
      ...config,
      dataForHandsontable,
      componentData,
    });
  };

  onPreviewChange = () => {
    const { preview } = this.state;
    this.setState({
      preview: !preview,
    });
  };

  render() {
    const { current = 'table', config } = this.props;
    const { preview } = this.state;
    const { ConfigJSX, PreviewJSX, DataJSX } = AntD[current];

    const previewNode = (
      <PreviewArea
        PreviewComponent={PreviewJSX}
        preview={preview}
        config={config.config}
        key="preview"
        large={!DataJSX}
        onPreviewChange={this.onPreviewChange}
      />
    );

    // 配置、预览、数据 三块布局
    return (
      <div className="areas-container">
        <div className="vertical-zone-main">
          {DataJSX ? (
            <DataArea
              DataComponent={DataJSX}
              dataForHandsontable={config.dataForHandsontable}
              tableProps={this.getTableProps()}
              onDataChange={this.onDataChange}
              preview={preview}
            />
          ) : (
            previewNode
          )}
        </div>
        <div className="vertical-zone-side">
          <ConfigArea
            ConfigComponent={ConfigJSX}
            config={config.config}
            current={current}
            onChange={this.onTableConfigChange}
          />
          {DataJSX ? previewNode : null}
        </div>
      </div>
    );
  }
}
