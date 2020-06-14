import React, { FC } from 'react';
import { Table } from 'antd';

import { useSelector } from 'react-redux';
import { ConnectState, TableModelState } from '@/models/connect';
import styles from './style.less';
import { useIntl } from 'umi';

const placeholderJSX = ({ width }: { width: number }) => (
  <div
    style={{
      height: 4,
      width: width || '100%',
      background: '#e4e4e4',
    }}
  />
);

const columns = [
  {
    title: placeholderJSX({ width: 60 }),
    dataIndex: 'name',
    key: 'name',
    // width: 140,
    // render: text => <a href="#">{text}</a>,
  },
  {
    title: placeholderJSX({ width: 180 }),
    dataIndex: 'age',
    key: 'age',
    // width: 140,
  },
  {
    title: placeholderJSX({ width: 60 }),
    dataIndex: 'address',
    key: 'address',
  },
];

const data: any[] = [];
for (let i = 1; i <= 3; i += 1) {
  data.push({
    key: i,
    name: placeholderJSX({ width: 60 }),
    age: placeholderJSX({ width: 180 }),
    address: placeholderJSX({ width: 60 }),
  });
}

const expandedRowRender = (record: { description: string }) => (
  <p>{record.description}</p>
);
const defaultTitle = () => 'Here is title';
const showHeader = true;
const defaultFooter = () => 'Here is footer';

const Preview: FC = () => {
  const table = useSelector<ConnectState, TableModelState>(
    (state) => state.table
  );
  const { formatMessage } = useIntl();

  const {
    config,
    // columns, dataSource
  } = table;

  const { title, footer, checkable, bordered, expandable, size } = config;

  return (
    <div>
      <div className={styles.preview}>
        <div className={styles.title}>
          {formatMessage({
            id: 'page.table.preview-area.preview',
          })}
        </div>
        <div
          style={{
            width: 200,
            height: 160,
          }}
        >
          <Table
            style={{
              transform: 'scale(0.4)',
              transformOrigin: '0 0',
              width: 500,
            }}
            pagination={false}
            bordered={bordered}
            title={title ? defaultTitle : undefined}
            footer={footer ? defaultFooter : undefined}
            expandedRowRender={expandable ? expandedRowRender : undefined}
            rowSelection={checkable ? {} : undefined}
            columns={columns}
            dataSource={data}
            size={size}
            showHeader={showHeader}
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;
