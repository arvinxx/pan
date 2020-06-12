import React from 'react';
import {
  // message,
  Radio,
  Checkbox,
  Input,
  Row,
  Col,
} from 'antd';

import defaultProps from './defaultProps';

const Config = props => {
  const { title, footer, checkable, bordered, expandable, size, widthValue, onChangeField } = props;

  return (
    <div>
      <div className="sep-title">表格尺寸</div>
      <Radio.Group name="size" onChange={onChangeField} value={size}>
        <Radio className="vertical-radio" value="default">
          默认尺寸
        </Radio>
        <Radio className="vertical-radio" value="middle">
          中等
        </Radio>
        <Radio className="vertical-radio" value="small">
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
            maxLength="25"
            name="widthValue"
            value={widthValue}
            onChange={onChangeField}
          />
        </Col>
      </Row>

      <div className="sep-title">属性</div>
      <Checkbox checked={title} name="title" onChange={onChangeField}>
        标题
      </Checkbox>
      <Checkbox checked={checkable} name="checkable" onChange={onChangeField}>
        多选框
      </Checkbox>
      <Checkbox checked={bordered} name="bordered" onChange={onChangeField}>
        列边框
      </Checkbox>
      <Checkbox checked={expandable} name="expandable" onChange={onChangeField}>
        折叠/收起
      </Checkbox>
      <Checkbox checked={footer} name="footer" onChange={onChangeField}>
        页脚
      </Checkbox>
    </div>
  );
};

Config.defaultProps = defaultProps;

export default Config;
