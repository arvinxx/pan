import React, { FC, useCallback, useState } from 'react';

import Handsontable from 'handsontable';
import { useSelector, useDispatch } from 'dva';

import { ConnectState, Loading, TableModelState } from '@/models/connect';
import { Col, Row } from 'antd';
import Code from './Code';
import { tableString, dataSourceString, columnsString } from './codeString';

declare global {
  interface Window {
    hotTableInstance: Handsontable;
  }
}

const ProCode: FC = () => {
  const dispatch = useDispatch();
  const table = useSelector<ConnectState, TableModelState>(
    (state) => state.table
  );
  const { config, columns, dataSource, codeComment } = table;

  return (
    <Row gutter={24} justify={'space-between'}>
      <Col span={12}>
        <Code
          title={'Table表格代码'}
          language={'jsx'}
          code={tableString(config, codeComment.table)}
          type={'table'}
        />
        <Code
          title={'Columns列代码'}
          code={columnsString(columns)}
          type={'columns'}
        />
      </Col>
      <Col span={12}>
        <Code
          title={'测试数据'}
          code={dataSourceString(dataSource)}
          type={'dataSource'}
        />
      </Col>
    </Row>
  );
};

export default ProCode;
