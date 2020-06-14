import React, { FC, SyntheticEvent } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ConnectState, TableModelState } from '@/models/connect';
import { ResizeCallbackData } from 'react-resizable';
import ResizeableTitle from './ResizeableTitle';

import styles from './index.less';

const expandedRowRender = () => <p>我是 description</p>;
const defaultTitle = () => '表格标题';
const defaultFooter = () => '表格页脚';

interface ColType {
  width: number;
}
const Data: FC = () => {
  const dispatch = useDispatch();
  const table = useSelector<ConnectState, TableModelState>(
    (state) => state.table
  );
  const { config, columns, dataSource } = table;

  const {
    title,
    footer,
    checkable,
    bordered,
    expandable,
    size,
    widthValue,
  } = config;

  const handleResize = (index: number) => (
    e: SyntheticEvent,
    { size }: ResizeCallbackData
  ) => {
    const nextColumns = [...columns];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };

    dispatch({
      type: 'table/save',
      payload: {
        columns: nextColumns,
      },
    });
  };

  return (
    <div style={{ width: widthValue > 0 ? widthValue : 600 }}>
      <Table<ColType>
        columns={columns.map((col, index) => ({
          ...col,
          onHeaderCell: (column) => ({
            width: column.width,
            onResize: handleResize(index),
          }),
        }))}
        components={{ header: { cell: ResizeableTitle } }}
        dataSource={dataSource}
        rowKey={'key'}
        className={styles.preview}
        pagination={false}
        bordered={bordered}
        title={title ? defaultTitle : undefined}
        footer={footer ? defaultFooter : undefined}
        expandedRowRender={expandable ? expandedRowRender : undefined}
        rowSelection={checkable ? {} : undefined}
        size={size}
        showHeader
      />
    </div>
  );
};

export default Data;
