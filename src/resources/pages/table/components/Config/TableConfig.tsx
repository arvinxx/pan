import React, { FC, useCallback } from 'react';
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
import styles from '../style.less';

import { useDispatch, useSelector } from 'react-redux';
import { ConnectState, TableModelState } from '@/models/connect';
import { useIntl } from 'umi';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const TableConfig: FC = () => {
  const dispatch = useDispatch();
  const { config } = useSelector<ConnectState, TableModelState>(
    (state) => state.table
  );
  const { formatMessage } = useIntl();

  const {
    bordered,
    checkable,
    expandable,
    footer,
    size,
    title,
    widthValue,
    loading,
    showHeader,
    hasData,
  } = config;

  const handleCheckbox = (key: string) => (e: CheckboxChangeEvent) => {
    dispatch({
      type: 'table/saveConfig',
      payload: { [key]: e.target.checked },
    });
  };

  return (
    <div>
      <div className={styles.title}>
        {formatMessage({ id: 'page.table.element.table' })}
      </div>
      <div>
        <div className={styles.sep}>表格尺寸</div>
        <Radio.Group
          name="size"
          onChange={(e) => {
            dispatch({
              type: 'table/saveConfig',
              payload: { size: e.target.value },
            });
          }}
          value={size}
        >
          <Radio className={styles.radio} value="large">
            大（默认）
          </Radio>
          <Radio className={styles.radio} value="middle">
            中等
          </Radio>
          <Radio className={styles.radio} value="small">
            小
          </Radio>
        </Radio.Group>
        <Row gutter={8}>
          <Col style={{ lineHeight: '30px' }}>导出宽度</Col>
          <Col>
            <InputNumber
              style={{
                width: 130,
              }}
              step={10}
              type="tel"
              placeholder="800"
              maxLength={25}
              name="widthValue"
              value={widthValue}
              onChange={(value) => {
                dispatch({
                  type: 'table/saveConfig',
                  payload: { widthValue: value },
                });
              }}
            />
          </Col>
        </Row>
        <div className={styles.sep}>属性</div>
        <Checkbox
          className={styles.checkBox}
          checked={showHeader}
          name="showHeader"
          onChange={handleCheckbox('showHeader')}
        >
          表头
        </Checkbox>
        <Checkbox
          className={styles.checkBox}
          checked={title}
          name="title"
          onChange={handleCheckbox('title')}
        >
          标题
        </Checkbox>
        <Checkbox
          className={styles.checkBox}
          checked={checkable}
          name="checkable"
          onChange={handleCheckbox('checkable')}
        >
          多选框
        </Checkbox>
        <Checkbox
          className={styles.checkBox}
          checked={bordered}
          name="bordered"
          onChange={handleCheckbox('bordered')}
        >
          列边框
        </Checkbox>
        <Checkbox
          className={styles.checkBox}
          checked={expandable}
          name="expandable"
          onChange={handleCheckbox('expandable')}
        >
          折叠/收起
        </Checkbox>
        <Checkbox
          className={styles.checkBox}
          checked={footer}
          name="footer"
          onChange={handleCheckbox('footer')}
        >
          页脚
        </Checkbox>
        <Checkbox
          className={styles.checkBox}
          checked={loading}
          name="loading"
          onChange={handleCheckbox('loading')}
        >
          加载中
        </Checkbox>
        <Checkbox
          className={styles.checkBox}
          checked={hasData}
          name="hasData"
          onChange={handleCheckbox('hasData')}
        >
          显示数据
        </Checkbox>
      </div>
    </div>
  );
};

export default TableConfig;
