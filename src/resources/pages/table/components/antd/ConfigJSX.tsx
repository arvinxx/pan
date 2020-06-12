import React, { ChangeEvent, FC } from 'react';
import {
  // message,
  Radio,
  Checkbox,
  Input,
  Row,
  Col,
} from 'antd';
import styles from './index.less';

import defaultProps from './defaultProps';
import { RadioChangeEvent } from 'antd/lib/radio/interface';

interface ConfigProps {
  title: boolean;
  footer: boolean;
  checkable: boolean;
  bordered: boolean;
  expandable: boolean;
  size: string;
  widthValue: number;
  onChangeField: (e: any) => void;
}
const Config: FC<ConfigProps> = ({
  title,
  footer,
  checkable,
  bordered,
  expandable,
  size,
  widthValue,
  onChangeField,
}) => {
  return (
    <div>
      <div className={styles.sep}>表格尺寸</div>
      <Radio.Group name="size" onChange={onChangeField} value={size}>
        <Radio className={styles.radio} value="default">
          默认尺寸
        </Radio>
        <Radio className={styles.radio} value="middle">
          中等
        </Radio>
        <Radio className={styles.radio} value="small">
          小
        </Radio>
      </Radio.Group>

      <Row>
        <Col offset={0} span={7} style={{ lineHeight: '30px' }}>
          导出宽度
        </Col>
        <Col offset={2} span={15}>
          <Input
            style={{
              width: 130,
            }}
            type="tel"
            placeholder="800"
            suffix="px"
            maxLength={25}
            name="widthValue"
            value={widthValue}
            onChange={onChangeField}
          />
        </Col>
      </Row>

      <div className={styles.sep}>属性</div>
      <Checkbox
        className={styles.checkBox}
        checked={title}
        name="title"
        onChange={onChangeField}
      >
        标题
      </Checkbox>
      <Checkbox
        className={styles.checkBox}
        checked={checkable}
        name="checkable"
        onChange={onChangeField}
      >
        多选框
      </Checkbox>
      <Checkbox
        className={styles.checkBox}
        checked={bordered}
        name="bordered"
        onChange={onChangeField}
      >
        列边框
      </Checkbox>
      <Checkbox
        className={styles.checkBox}
        checked={expandable}
        name="expandable"
        onChange={onChangeField}
      >
        折叠/收起
      </Checkbox>
      <Checkbox
        className={styles.checkBox}
        checked={footer}
        name="footer"
        onChange={onChangeField}
      >
        页脚
      </Checkbox>
    </div>
  );
};

Config.defaultProps = defaultProps;

export default Config;
