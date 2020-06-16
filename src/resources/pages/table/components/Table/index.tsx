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
    footerText,
    titleText,
    activeCells,
    activeHeader,
    focusedCellKey,
  } = table;
  const ref = useClickAway(() => {
    // dispatch({ type: 'table/save', payload: { activeHeader: '' } });
  });
  const {
    title,
    footer,
    checkable,
    bordered,
    expandable,
    size,
    widthValue,
    loading,
    showHeader,
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
    <div style={{ width: widthValue > 0 ? widthValue : '100%' }} ref={ref}>
      <Table
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
                payload: { activeHeader: column.key },
              });
            },
          }),
          // 单元格控制
          onCell: (items) => {
            const item = items[col!.dataIndex];
            return {
              onMouseLeave: () => {
                dispatch({
                  type: 'table/removeActiveCells',
                  payload: { key: item.key },
                });
              },
              onMouseEnter: () => {
                dispatch({
                  type: 'table/addActiveCells',
                  payload: { key: item.key },
                });
              },
            };
          },

          render: (text) => {
            const cellKey: string = text.key;
            return activeCells.includes(cellKey) ||
              focusedCellKey === cellKey ? (
              <Input
                size={'small'}
                defaultValue={text.content}
                // 当点击时 激活该单元格
                onFocus={() => {
                  dispatch({
                    type: 'table/save',
                    payload: { focusedCellKey: cellKey },
                  });
                }}
                onBlur={() => {
                  // dispatch({
                  //   type: 'table/save',
                  //   payload: { focusedCellKey: '' },
                  // });
                }}
              />
            ) : (
              <div style={{ height: 24 }}>{text.content}</div>
            );
          },
        }))}
        components={{
          header: {
            cell: TableHeader,
          },
        }}
        dataSource={dataSource}
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
