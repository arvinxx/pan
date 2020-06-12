import React, { useState, FC } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import Config from './Config';
import Preview from './Preview';
import DataArea from './DataArea';
import AntD from './antd';
import transformTableProps from '../common/transformTableProps';
import styles from './style.less';
import { TableConfig } from '@/pages/table/data';

interface TableConfigPaneProps {
  config: any;
  onChange: any;
  current?: 'table';
}
const TableConfigPane: FC<TableConfigPaneProps> = ({
  config,
  onChange,
  current = 'table',
}) => {
  const [preview, setPreview] = useState(false);

  const getTableProps = () => {
    return config
      ? {
          ...config.config,
          ...config.componentData,
        }
      : {};
  };

  const onTableConfigChange = (tableConfig: TableConfig) => {
    onChange({
      ...config,
      config: tableConfig,
    });
  };

  const onDataChange = () => {
    const dataForHandsontable = cloneDeep(window.hotTableInstance.getData());
    const componentData = transformTableProps();
    onChange({
      ...config,
      dataForHandsontable,
      componentData,
    });
  };

  const onPreviewChange = () => {
    setPreview(!preview);
  };

  const { ConfigJSX, PreviewJSX, DataJSX } = AntD;

  const previewNode = (
    <Preview
      PreviewComponent={PreviewJSX}
      preview={preview}
      config={config && config.config}
      key="preview"
      large={!DataJSX}
      onPreviewChange={onPreviewChange}
    />
  );

  // 配置、预览、数据 三块布局
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {DataJSX ? (
          <DataArea
            DataComponent={DataJSX}
            dataForHandsontable={config && config.dataForHandsontable}
            tableProps={getTableProps()}
            onDataChange={onDataChange}
            preview={preview}
          />
        ) : (
          previewNode
        )}
      </div>
      <div className={styles.side}>
        <Config
          ConfigComponent={ConfigJSX}
          config={config && config.config}
          current={current}
          onChange={onTableConfigChange}
        />
        {DataJSX ? previewNode : null}
      </div>
    </div>
  );
};

export default TableConfigPane;
