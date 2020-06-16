import React, { ChangeEvent, FC, useCallback, useEffect, useRef } from 'react';
import ButtonGroup from './ButtonGroup';
import {
  // message,
  Button,
  Radio,
  Checkbox,
  InputNumber,
  Row,
  Col,
  Input,
  Space,
} from 'antd';
import styles from './style.less';

import { useDispatch, useSelector } from 'react-redux';
import { ConnectState, TableModelState } from '@/models/connect';
import { useIntl } from 'umi';

const HeaderConfig: FC = () => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { activeHeader, columns } = useSelector<ConnectState, TableModelState>(
    (state) => state.table
  );
  const titleInput = useRef<Input>(null);
  const index = columns.findIndex((col) => col.key === activeHeader);
  const column = columns[index];

  /**
   * 修改表头
   **/
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'table/handleHeaderText',
      payload: {
        text: e.target.value,
        dataIndex: column.dataIndex,
      },
    });
  };
  // 每次切换 index 时,自动聚焦标题
  useEffect(() => {
    if (titleInput.current) {
      titleInput.current.focus();
    }
  }, [index]);
  return (
    <div>
      <div className={styles.title}>
        {formatMessage({ id: 'page.table.element.header' })}
      </div>
      <div>
        <Row gutter={8}>
          <Col span={6} style={{ lineHeight: '30px' }}>
            文本
          </Col>
          <Col span={18}>
            <Input
              ref={titleInput}
              autoFocus={index > -1}
              value={column && column.title}
              onChange={handleText}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HeaderConfig;
