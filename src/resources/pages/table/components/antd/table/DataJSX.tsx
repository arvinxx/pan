import React, { useRef, useCallback, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import { Table } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import { defaultData } from './defaultProps';

const expandedRowRender = () => <p>我是 description</p>;
const defaultTitle = () => '表格标题';
const defaultFooter = () => '表格页脚';

const Data = React.memo(props => {
  const { tableProps = {}, preview, onDataChange, dataForHandsontable } = props;
  const hotTableComponent = useRef();
  const onCellEdit = useCallback(
    (changed, source) => {
      if (source === 'loadData') {
        return;
      }

      setTimeout(() => onDataChange(), 0);
    },
    [onDataChange],
  );

  const onCreate = useCallback(
    (index, amount, source) => {
      if (source === 'loadData') {
        return;
      }

      setTimeout(() => onDataChange(), 0);
    },
    [onDataChange],
  );

  const onRemove = useCallback(
    (index, amount, physicalRows, source) => {
      if (source === 'loadData') {
        return;
      }

      setTimeout(() => onDataChange(), 0);
    },
    [onDataChange],
  );

  const onResize = useCallback(() => {
    setTimeout(() => onDataChange(), 0);
  }, [onDataChange]);

  useEffect(() => {
    if (hotTableComponent.current) {
      window.hotTableInstance = hotTableComponent.current.hotInstance;
    }
  }, []);

  useEffect(() => {
    const data = dataForHandsontable ? cloneDeep(dataForHandsontable) : cloneDeep(defaultData);
    window.hotTableInstance.loadData(data);
  }, [dataForHandsontable]);

  let { widthValue = 600 } = tableProps;

  if (widthValue < 0) {
    widthValue = 600;
  }

  const { title, footer, checkable, bordered, expandable, size, ...restTableProps } = tableProps;

  const contextMenu = [
    'row_above',
    'row_below',
    'col_left',
    'col_right',
    'remove_row',
    'remove_col',
    'copy',
    'cut',
  ];

  return (
    <div
      style={{
        overflow: 'auto',
        maxWidth: 'calc(100vw - 342px)',
      }}
    >
      <div
        style={{
          display: !preview ? 'none' : 'block',
          height: 510,
        }}
      >
        <div style={{ width: widthValue }}>
          <Table
            className="preview-table"
            pagination={false}
            bordered={bordered}
            title={title ? defaultTitle : null}
            footer={footer ? defaultFooter : null}
            expandedRowRender={expandable ? expandedRowRender : null}
            rowSelection={checkable ? {} : null}
            size={size}
            showHeader
            {...restTableProps}
          />
        </div>
      </div>
      <div
        style={
          preview
            ? {
                position: 'absolute',
                visibility: 'hidden', // 使用 display: none 会造成奇怪的列头渲染丢失问题
              }
            : null
        }
      >
        <HotTable
          ref={hotTableComponent}
          root="hot"
          manualColumnResize
          afterColumnResize={onResize}
          colHeaders
          rowHeaders
          height={492}
          stretchH="all"
          afterChange={onCellEdit}
          afterRemoveCol={onRemove}
          afterRemoveRow={onRemove}
          afterCreateCol={onCreate}
          afterCreateRow={onCreate}
          contextMenu={contextMenu}
          licenseKey="non-commercial-and-evaluation"
          language="zh-CN"
        />
      </div>
    </div>
  );
});

export default Data;
