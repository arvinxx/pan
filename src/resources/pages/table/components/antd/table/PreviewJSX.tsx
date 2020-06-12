import React from 'react';
import { Table } from 'antd';

import defaultProps from './defaultProps';

const placeholderJSX = ({ width }) => (
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

const data = [];
for (let i = 1; i <= 3; i += 1) {
  data.push({
    key: i,
    name: placeholderJSX({ width: 60 }),
    age: placeholderJSX({ width: 180 }),
    address: placeholderJSX({ width: 60 }),
  });
}

const expandedRowRender = record => <p>{record.description}</p>;
const defaultTitle = () => 'Here is title';
const showHeader = true;
const defaultFooter = () => 'Here is footer';

const Preview = props => {
  const { title, footer, checkable, bordered, expandable, size } = props;

  return (
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
        title={title ? defaultTitle : null}
        footer={footer ? defaultFooter : null}
        expandedRowRender={expandable ? expandedRowRender : null}
        rowSelection={checkable ? {} : null}
        columns={columns}
        dataSource={data}
        size={size}
        showHeader={showHeader}
      />
    </div>
  );
};

Preview.defaultProps = defaultProps;

export default Preview;
