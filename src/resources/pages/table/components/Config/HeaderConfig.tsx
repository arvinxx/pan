import React, { ChangeEvent, FC, useCallback, useEffect, useRef } from 'react';
import ButtonGroup from './ButtonGroup';
import {
  // message,
  Button,
  Radio,
  Checkbox,
  Switch,
  Row,
  Col,
  Input,
  Space,
  InputNumber,
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
  const setColumnConfig = (field: string, value: any) => {
    dispatch({
      type: 'table/handleColumnConfig',
      payload: {
        dataIndex: column.dataIndex,
        field,
        value,
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
        <Row gutter={[8, 12]}>
          <Col span={6}>文本</Col>
          <Col span={18}>
            <Input
              ref={titleInput}
              autoFocus={index > -1}
              value={column && column.title}
              onChange={(e) => {
                setColumnConfig('title', e.target.value);
              }}
            />
          </Col>
          <Col span={6}>列宽</Col>
          <Col span={18}>
            <InputNumber
              name="width"
              step={10}
              value={column.width}
              onChange={(value) => {
                setColumnConfig('width', value);
              }}
            />
          </Col>
          <Col span={6}>对齐</Col>
          <Col span={18}>
            <Radio.Group
              onChange={(e) => {
                setColumnConfig('align', e.target.value);
              }}
              defaultValue={'left'}
              value={column.align}
            >
              <Radio className={styles.radio} value={'left'}>
                左
              </Radio>
              <Radio className={styles.radio} value={'center'}>
                中
              </Radio>
              <Radio className={styles.radio} value={'right'}>
                右
              </Radio>
            </Radio.Group>
          </Col>
          <Col span={6}>固定列</Col>
          <Col span={18}>
            <Switch
              checked={column.fixed}
              onChange={(checked) => {
                console.log(checked);
                setColumnConfig('fixed', checked);
              }}
            />
          </Col>
          <Col span={6}>自动省略</Col>
          <Col span={18}>
            <Switch
              checked={column.ellipsis}
              onChange={(checked) => {
                console.log(checked);
                setColumnConfig('ellipsis', checked);
              }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HeaderConfig;
