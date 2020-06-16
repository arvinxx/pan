import React, { FC, useCallback } from 'react';
import { Row, Col, Input, Space } from 'antd';
import styles from '../style.less';

import { useDispatch, useSelector } from 'react-redux';
import { ConnectState, TableModelState } from '@/models/connect';
import { useIntl } from 'umi';

const CellConfig: FC = () => {
  const dispatch = useDispatch();
  const { config, focusedCellKey, activeHeader, columns } = useSelector<
    ConnectState,
    TableModelState
  >((state) => state.table);
  const { formatMessage } = useIntl();

  return (
    <div>
      <div className={styles.title}>
        {formatMessage({ id: 'page.table.element.cell' })}
      </div>
      <div>
        <Row gutter={8}>
          <Col style={{ lineHeight: '30px' }}>文本</Col>
          <Col>
            <Input />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CellConfig;
