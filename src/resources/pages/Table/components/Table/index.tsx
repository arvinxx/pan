import React, { FC, SyntheticEvent, useState } from 'react';
import { Input, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ConnectState, TableModelState } from '@/models/connect';
import { ResizeCallbackData } from 'react-resizable';
import classnames from 'classnames';
import { useClickAway } from '@umijs/hooks';

import TableHeader from './TableHeader';
import EditableCell from './EditableCell';

import styles from './index.less';

const expandedRowRender = () => <p>我是 description</p>;

interface ColType {
  width: number;
}
const Data: FC = () => {
  const dispatch = useDispatch();
  // const [activeCells, setActiveCells] = useState<string[]>([]);
  const table = useSelector<ConnectState, TableModelState>(
    (state) => state.table
  );
  const {
    config,
    columns,
    dataSource,
    tableWidth,
    // activeCells,
    activeHeader,
    focusedCellKey,
  } = table;
  const ref = useClickAway(() => {
    // dispatch({ type: 'table/save', payload: { activeHeader: '' } });
  });
  const {
    title,
    footer,
    footerText,
    titleText,
    checkable,
    bordered,
    expandable,
    size,
    widthValue,
    loading,
    showHeader,
    hasData,
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
    <div
      style={{ width: tableWidth !== 'auto' ? widthValue : undefined }}
      ref={ref}
    >
      <Table
        // @ts-ignore
        columns={columns.map((col, index) => ({
          ...col,

          // header 单元格控制
          onHeaderCell: (column) => ({
            ...col,
            active: activeHeader === column.key,
            // @ts-ignore
            width: column.width,
            onResize: handleResize(index),
            className: classnames({
              [styles.activeHeader]: activeHeader === column.key,
              [styles.header]: true,
            }),
            onClick: () => {
              dispatch({
                type: 'table/save',
                payload: { activeHeader: column.key, focusedCellKey: '' },
              });
            },
            onKeyDown: (e) => {
              console.log(e);
            },
          }),
          // 单元格控制
          onCell: (items) => {
            const item = items[col!.dataIndex];
            return {
              className: {
                [styles.activeHeader]: focusedCellKey === item.key,
                [styles.header]: true,
              },
              onClick: () => {
                dispatch({
                  type: 'table/save',
                  payload: { focusedCellKey: item.key, activeHeader: '' },
                });
              },
            };
          },

          render: (text) => <div>{text.content}</div>,
        }))}
        components={{
          header: {
            cell: TableHeader,
          },
        }}
        dataSource={hasData ? dataSource : undefined}
        rowKey={'dataIndex'}
        pagination={false}
        bordered={bordered}
        loading={loading}
        title={
          title
            ? () => <EditableCell field={'titleText'} text={titleText} />
            : undefined
        }
        footer={
          footer
            ? () => <EditableCell field={'footerText'} text={footerText} />
            : undefined
        }
        expandedRowRender={expandable ? expandedRowRender : undefined}
        rowSelection={checkable ? {} : undefined}
        size={size}
        showHeader={showHeader}
      />
    </div>
  );
};

export default Data;
