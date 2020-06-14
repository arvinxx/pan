import React, { FC, SyntheticEvent, useState } from 'react';
import { Input, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ConnectState, TableModelState } from '@/models/connect';
import { ResizeCallbackData } from 'react-resizable';
import classnames from 'classnames';
import { useClickAway } from '@umijs/hooks';

import ResizeableHeader from './ResizeableHeader';
import EditableCell from './EditableCell';

import styles from './index.less';

const expandedRowRender = () => <p>我是 description</p>;

interface ColType {
  width: number;
}
const Data: FC = () => {
  const dispatch = useDispatch();
  const [activeHeader, setActiveHeader] = useState('');
  const [activeCells, setActiveCells] = useState<string[]>([]);
  const table = useSelector<ConnectState, TableModelState>(
    (state) => state.table
  );
  const { config, columns, dataSource, footerText, titleText } = table;
  const ref = useClickAway(() => {
    setActiveHeader('');
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

  const defaultTitle = () =>
    title ? <EditableCell field={'titleText'} text={titleText} /> : undefined;
  const defaultFooter = () =>
    footer ? (
      <EditableCell field={'footerText'} text={footerText} />
    ) : (
      undefined
    );

  return (
    <div style={{ width: widthValue > 0 ? widthValue : 600 }} ref={ref}>
      <Table
        columns={columns.map((col, index) => ({
          ...col,
          onHeaderCell: (column) => ({
            ...col,
            // @ts-ignore
            width: column.width,
            onResize: handleResize(index),
            className: classnames({
              [styles.activeHeader]: activeHeader === column.key,
              [styles.header]: true,
            }),
            onClick: () => {
              setActiveHeader(column.key);
            },
          }),
          render: (text, record, index) => {
            const cellKey: string = text.key;
            return activeCells.includes(cellKey) ? (
              <Input
                size={'small'}
                defaultValue={text.content}
                onMouseLeave={() => {
                  setActiveCells(
                    activeCells.filter((cell) => cell !== cellKey)
                  );
                }}
                onBlur={() => {
                  console.log(activeCells);
                  console.log(activeCells.filter((cell) => cell !== cellKey));
                  setActiveCells(
                    activeCells.filter((cell) => cell !== cellKey)
                  );
                }}
              />
            ) : (
              <div
                onMouseEnter={() => {
                  setActiveCells([...activeCells, text!.key]);
                }}
              >
                {text.content}
              </div>
            );
          },
        }))}
        components={{
          header: {
            cell: ResizeableHeader,
          },
        }}
        dataSource={dataSource}
        rowKey={'dataIndex'}
        className={styles.preview}
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
