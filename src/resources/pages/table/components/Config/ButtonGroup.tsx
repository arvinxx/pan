import React, { FC, MouseEventHandler } from 'react';
import { Button, Col, Row, Space } from 'antd';
import { LeftOutlined, RedoOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

interface ButtonGroupProps {
  onBack?: MouseEventHandler<HTMLElement>;
  onReset?: MouseEventHandler<HTMLElement>;
}
const ButtonGroup: FC<ButtonGroupProps> = ({ onBack, onReset }) => {
  const dispatch = useDispatch();

  return (
    <Row justify={'space-between'}>
      <Col>
        <Button
          onClick={onBack}
          icon={<LeftOutlined />}
          size={'small'}
          type={'text'}
        >
          返回
        </Button>
      </Col>
      <Col>
        <Button
          onClick={onReset}
          icon={<RedoOutlined />}
          type={'link'}
          size={'small'}
          // style={{ marginRight: 2 }}
        >
          重置
        </Button>
        {/*<Button onClick={onBack} type={'primary'} size={'small'}>*/}
        {/*  确定*/}
        {/*</Button>*/}
      </Col>
    </Row>
  );
};

export default ButtonGroup;
